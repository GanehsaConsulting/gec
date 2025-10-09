import { getSheetData } from "@/lib/googleSheets";
import {
  formatMasterData,
  formatSpecData,
  formatTableData,
  formatContentData,
  formatImagesData,
  groupProductData,
  getProduct,
  groupProductsWithVariants,
} from "@/lib/productHelpers";

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Slug is required",
        }), 
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Ambil data dari semua sheets
    const rawMasterData = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_MASTER
    );
    const rawSpec = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_SPEC
    );
    const rawTable = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_TABLE
    );
    const rawContent = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_CONTENT
    );
    const rawImages = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_IMAGES
    );

    // Format data menggunakan helpers
    const masterData = formatMasterData(rawMasterData);
    const spec = formatSpecData(rawSpec);
    const table = formatTableData(rawTable);
    const content = formatContentData(rawContent);
    const images = formatImagesData(rawImages);

    // Gabungkan semua data berdasarkan ID
    const products = groupProductData(masterData, spec, table, content, images);

    // Find product by slug (helper function sudah support slug dan ID)
    let product = getProduct(products, slug);
    
    if (!product) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Product not found",
          message: `No product found with slug: ${slug}`
        }), 
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if product is published
    if (!product.isPublished) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Product not available",
          message: "This product is not currently published"
        }), 
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ===== VARIANTS HANDLING =====
    let variants = [];
    let parentProduct = null;

    // Check if this product is a variant (has partOf)
    if (product.partOf && product.partOf !== '-' && product.partOf.trim() !== '') {
      // This is a variant, get the parent
      parentProduct = products.find(p => p.id === product.partOf);
      
      // Get all siblings (other variants with same parent)
      variants = products.filter(p => 
        p.partOf === product.partOf && 
        p.id !== product.id && 
        p.isPublished
      );
    } else {
      // This might be a parent, check if it has variants
      variants = products.filter(p => 
        p.partOf === product.id && 
        p.isPublished
      );
    }

    // ===== SUGGESTIONS (Related Products) =====
    // Get products from same division, exclude current product and its variants
    const variantIds = new Set([product.id, ...variants.map(v => v.id)]);
    if (parentProduct) variantIds.add(parentProduct.id);

    let suggestions = products.filter(p => 
      p.division === product.division &&
      !variantIds.has(p.id) &&
      p.isPublished &&
      // Exclude products that are variants of other products (only show parents)
      (!p.partOf || p.partOf === '-' || p.partOf.trim() === '')
    );

    // Prioritize priority products, then sort by name
    suggestions = suggestions
      .sort((a, b) => {
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
        return a.productName.localeCompare(b.productName);
      })
      .slice(0, 6); // Limit to 6 suggestions

    // If not enough suggestions from same division, add from other divisions
    if (suggestions.length < 4) {
      const additionalSuggestions = products.filter(p => 
        p.division !== product.division &&
        !variantIds.has(p.id) &&
        p.isPublished &&
        (!p.partOf || p.partOf === '-' || p.partOf.trim() === '')
      )
      .sort((a, b) => {
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
        return 0;
      })
      .slice(0, 6 - suggestions.length);

      suggestions = [...suggestions, ...additionalSuggestions];
    }

    return Response.json({
      success: true,
      data: {
        ...product,
        // Add parent info if this is a variant
        ...(parentProduct && { parentProduct }),
        // Add variants array (siblings or children)
        variants: variants.length > 0 ? variants : undefined,
        hasVariants: variants.length > 0,
        variantCount: variants.length,
      },
      suggestions: suggestions.map(p => ({
        id: p.id,
        productName: p.productName,
        slug: p.slug,
        division: p.division,
        productCategory: p.productCategory,
        imageUrl: p.imageUrl,
        descriptions: p.descriptions,
        isPriority: p.isPriority,
      })),
    });

  } catch (error) {
    console.error("Product detail API error:", error);
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