import { getSheetData } from "@/lib/googleSheets";
import {
  formatMasterData,
  formatSpecData,
  formatTableData,
  formatContentData,
  formatImagesData,
  groupProductData,
} from "@/lib/productHelpers";

export async function GET(request) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const { searchParams } = new URL(request.url);
    
    // Query param untuk get by ID
    const id = searchParams.get('id');

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
    let products = groupProductData(masterData, spec, table, content, images);

    // Jika ada ID, return single product
    if (id) {
      const product = products.find(p => p.id === id);
      
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

      return Response.json({
        success: true,
        data: product,
      });
    }

    // Return semua products dengan detail lengkap
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