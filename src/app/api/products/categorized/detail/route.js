import { getSheetData } from "@/lib/googleSheets";
import {
  formatMasterData,
  formatSpecData,
  formatTableData,
  formatContentData,
  formatImagesData,
  groupProductData,
  groupProductsWithVariants,
  getProductWithVariants,
} from "@/lib/productHelpers";

export async function GET(request) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const { searchParams } = new URL(request.url);
    
    // Query param untuk get by ID or slug
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

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

    // Gabungkan semua data berdasarkan ID (spec, table, content, images)
    let products = groupProductData(masterData, spec, table, content, images);

    // Jika ada ID atau slug, return single product with variants
    if (id || slug) {
      const identifier = id || slug;
      let product = getProductWithVariants(products, identifier);
      
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

      // Attach full detail to variants as well
      if (product.variants && product.variants.length > 0) {
        product.variants = product.variants.map(variant => {
          const fullVariant = products.find(p => p.id === variant.id);
          return fullVariant || variant;
        });
      }

      return Response.json({
        success: true,
        data: product,
      });
    }

    // Return semua products dengan detail lengkap dan grouped by variants
    products = groupProductsWithVariants(products);

    // Attach full detail to all variants
    products = products.map(product => {
      if (product.variants && product.variants.length > 0) {
        product.variants = product.variants.map(variant => {
          const fullVariant = products.find(p => p.id === variant.id) || variant;
          // Get the full details from original products array
          const originalProduct = masterData.find(m => m.id === variant.id);
          if (originalProduct) {
            const variantWithDetails = groupProductData(
              [originalProduct],
              spec.filter(s => s.id === variant.id),
              table.filter(t => t.id === variant.id),
              content.filter(c => c.id === variant.id),
              images.filter(i => i.productId === variant.id)
            )[0];
            return variantWithDetails || fullVariant;
          }
          return fullVariant;
        });
      }
      return product;
    });

    return Response.json({
      success: true,
      count: products.length,
      data: products,
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