import { getSheetData } from "@/lib/googleSheets";
import {
  formatMasterData,
  getPublishedProducts,
  groupProductsWithVariants,
  getProductsByDivision,
} from "@/lib/productHelpers";

export async function GET(request) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const { searchParams } = new URL(request.url);
    
    // Query params
    const published = searchParams.get('published');

    // Fetch master data
    const rawMasterData = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_MASTER
    );

    let products = formatMasterData(rawMasterData);

    // Apply filters
    if (published === 'true') {
      products = getPublishedProducts(products);
    }

    // Group products with their variants
  products = groupProductsWithVariants(products);

    // Group products by division
    const divisions = {};
    
    products.forEach(product => {
      const divisionName = product.division || 'Uncategorized';
      
      if (!divisions[divisionName]) {
        divisions[divisionName] = {
          division: divisionName,
          products: []
        };
      }
      
      divisions[divisionName].products.push(product);
    });

    // Convert to array format
    const result = Object.values(divisions);

    return Response.json({
      success: true,
      data: result,
      total: result.length,
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

