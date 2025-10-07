import { getSheetData } from "@/lib/googleSheets";
import {
  formatMasterData,
  getPublishedProducts,
  groupProductsWithVariants,
  getProductWithVariants,
  searchProducts,
  sortProducts,
  paginateProducts,
  filterByPriceRange,
  getProductsByCategory,
  getProductsByDivision,
  getPriorityProducts,
} from "@/lib/productHelpers";

export async function GET(request) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const { searchParams } = new URL(request.url);
    
    // Query params
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const division = searchParams.get('division');
    const search = searchParams.get('search') || searchParams.get('q');
    const sortBy = searchParams.get('sortBy') || 'id';
    const order = searchParams.get('order') || 'asc';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : null;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : null;
    const debug = searchParams.get('debug') === 'true';

    // Fetch master data
    const rawMasterData = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_MASTER
    );

    let products = formatMasterData(rawMasterData);

    // Get single product with variants by ID or slug (simplified)
    if (id || slug) {
      const identifier = id || slug;
      const product = getProductWithVariants(products, identifier);
      
      if (!product) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: "Product not found",
          }), 
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Simplify response - only return specified fields
      const simplified = {
        id: product.id,
        division: product.division,
        productName: product.productName,
        slug: product.slug,
        partOf: product.partOf,
        productCategory: product.productCategory,
        hasVariants: product.hasVariants,
        variantCount: product.variantCount,
        variants: product.variants.map(v => ({
          id: v.id,
          division: v.division,
          productName: v.productName,
          slug: v.slug,
          partOf: v.partOf,
          productCategory: v.productCategory,
        }))
      };

      return Response.json({
        success: true,
        data: simplified,
      });
    }

    // Apply filters (before grouping variants)
    if (published === 'true') {
      products = getPublishedProducts(products);
    }

    if (priority === 'true') {
      products = getPriorityProducts(products);
    }

    if (category) {
      products = getProductsByCategory(products, category);
    }

    if (division) {
      products = getProductsByDivision(products, division);
    }

    // Price range filter
    if (minPrice !== null || maxPrice !== null) {
      products = filterByPriceRange(products, minPrice, maxPrice);
    }

    // Group products with their variants BEFORE search
    products = groupProductsWithVariants(products);

    // Search (after grouping - search in parent, keep variants)
    if (search) {
      products = searchProducts(products, search, debug);
    }

    // Sort
    products = sortProducts(products, sortBy, order);

    // Simplify all products - only return specified fields
    const simplified = products.map(product => ({
      id: product.id,
      division: product.division,
      productName: product.productName,
      slug: product.slug,
      partOf: product.partOf,
      productCategory: product.productCategory,
      hasVariants: product.hasVariants,
      variantCount: product.variantCount,
      variants: product.variants.map(v => ({
        id: v.id,
        division: v.division,
        productName: v.productName,
        slug: v.slug,
        partOf: v.partOf,
        productCategory: v.productCategory,
      }))
    }));

    // Paginate
    const result = paginateProducts(simplified, page, limit);

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Sheets API error:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: error.toString() 
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}