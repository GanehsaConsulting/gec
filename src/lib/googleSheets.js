import { google } from "googleapis";
import { JWT } from "google-auth-library";

// Parse private key dengan benar
const parsePrivateKey = (key, keyBase64) => {
  // Prioritas 1: Pakai base64 jika ada
  if (keyBase64) {
    return Buffer.from(keyBase64, 'base64').toString('utf-8');
  }
  
  if (!key) return '';
  
  // Jika sudah ada newline sebenarnya, return as is
  if (key.includes('\n')) return key;
  
  // Jika pakai \\n literal, replace jadi newline
  return key.replace(/\\n/g, '\n');
};

// Initialize JWT client (recommended way)
const getAuthClient = () => {
  const privateKey = parsePrivateKey(
    process.env.GOOGLE_PRIVATE_KEY,
    process.env.GOOGLE_PRIVATE_KEY_BASE64
  );

  return new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
};

export async function getSheetData(sheetId, range) {
  try {
    const authClient = getAuthClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const headers = rows[0];
    return rows.slice(1).map((row) => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = row[index] || "";
      });
      return item;
    });
  } catch (error) {
    console.error(`Error fetching sheet data for range ${range}:`, error);
    throw error;
  }
}