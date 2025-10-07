import { getSheetData } from "@/lib/googleSheets";
import {
  formatMasterData,
  getPublishedProducts,
  getProduct,
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
    const debug = searchParams.get('debug') === 'true'; // Debug mode

    // Fetch master data
    const rawMasterData = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_MASTER
    );

    let products = formatMasterData(rawMasterData);

    // Get single product by ID or slug
    if (id || slug) {
      const identifier = id || slug;
      const product = getProduct(products, identifier);
      
      return Response.json({
        success: true,
        data: product || null,
      });
    }

    // Apply filters
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

    // Search
    if (search) {
      products = searchProducts(products, search, debug);
    }

    // Sort
    products = sortProducts(products, sortBy, order);

    // Paginate
    const result = paginateProducts(products, page, limit);

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