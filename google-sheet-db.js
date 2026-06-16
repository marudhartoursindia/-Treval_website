/**
 * GOOGLE APPS SCRIPT FOR MARUDHAR TOURS DATABASE CMS
 * 
 * Instructions:
 * 1. Open your Google Sheet ("travelwebsite" or any name).
 * 2. Click Extensions > Apps Script.
 * 3. Delete all code in Code.gs and paste this entire code.
 * 4. Click Save (💾).
 * 5. Run the "setupDatabase" function once by selecting it in the toolbar and clicking "Run".
 *    This will automatically create all tabs (packages, destinations, etc.) and write the correct headers.
 * 6. Deploy as Web App: Click Deploy > New deployment. Select type: Web app.
 *    Set "Execute as" to "Me", and "Who has access" to "Anyone".
 * 7. Copy the Web App URL and paste it in your Next.js project's .env file as NEXT_PUBLIC_GOOGLE_SHEET_API.
 */

const SECRET_TOKEN = "MarudharToursSecureToken2026"; // Must match your Next.js admin SECRET_TOKEN

// 1. Database Schema Definitions
const SCHEMAS = {
  packages: [
    "id", "slug", "title", "content", "excerpt", "featured_media_url",
    "duration", "price", "discount_price", "highlights", "overview",
    "day_wise_itinerary", "included_services", "excluded_services",
    "hotel_information", "transportation_information", "faq",
    "map_location", "booking_cta", "gallery_images", "destination_id",
    "categories_names", "seo_title", "seo_description"
  ],
  destinations: [
    "id", "slug", "title", "content", "excerpt", "featured_media_url",
    "gallery", "popular_attractions", "best_time_to_visit", "travel_tips"
  ],
  blogs: [
    "id", "slug", "title", "content", "excerpt", "featured_media_url",
    "date", "categories_names", "tags_names", "seo_title", "seo_description"
  ],
  testimonials: [
    "id", "title", "content", "rating", "location", "photo"
  ],
  faqs: [
    "id", "title", "answer", "category"
  ]
};

/**
 * Run this function once to set up all sheet tabs and correct headers.
 */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  Object.keys(SCHEMAS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      Logger.log(`Created sheet: ${sheetName}`);
    } else {
      Logger.log(`Sheet already exists: ${sheetName}`);
    }
    
    // Set headers in the first row
    const headers = SCHEMAS[sheetName];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers (bold text)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  });
  
  Logger.log("Database sheets initialized successfully!");
}

/**
 * Handle HTTP GET Requests (Retrieves data from all sheets)
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const result = {};

    Object.keys(SCHEMAS).forEach(sheetName => {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        result[sheetName] = [];
        return;
      }
      
      const data = sheet.getDataRange().getValues();
      if (data.length <= 1) {
        result[sheetName] = [];
        return;
      }

      const headers = data[0];
      const rows = data.slice(1);
      
      result[sheetName] = rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          let val = row[index];
          // Try parsing JSON structures or array strings
          if (typeof val === 'string' && (val.startsWith('[') || val.startsWith('{'))) {
            try {
              val = JSON.parse(val);
            } catch(err) {}
          } else if (typeof val === 'string' && val.includes('\n')) {
            val = val.split('\n').map(item => item.trim()).filter(Boolean);
          }
          obj[header] = val;
        });
        return obj;
      });
    });

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle HTTP POST Requests (Create, Update, Delete)
 */
function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    
    // Security check
    if (postData.token !== SECRET_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized access" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(postData.sheet);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: `Sheet tab '${postData.sheet}' not found` }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const action = postData.action; // create, update, delete
    const itemData = postData.data;

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];

    if (action === "create") {
      // Auto-increment ID if empty or not provided
      if (!itemData.id) {
        let maxId = 0;
        for (let i = 1; i < values.length; i++) {
          const id = Number(values[i][0]);
          if (id > maxId) maxId = id;
        }
        itemData.id = maxId + 1;
      }
      
      const newRow = headers.map(header => {
        let val = itemData[header];
        if (val === undefined || val === null) return "";
        if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        return val;
      });
      
      sheet.appendRow(newRow);
      return ContentService.createTextOutput(JSON.stringify({ success: true, id: itemData.id }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Find row index by matching ID column (column A / index 0)
    let targetRowIndex = -1;
    for (let i = 1; i < values.length; i++) {
      if (Number(values[i][0]) === Number(itemData.id)) {
        targetRowIndex = i + 1; // 1-indexed (including headers row)
        break;
      }
    }

    if (targetRowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({ error: `Record ID ${itemData.id} not found` }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "update") {
      const updatedRow = headers.map(header => {
        let val = itemData[header];
        if (val === undefined || val === null) return "";
        if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        return val;
      });
      sheet.getRange(targetRowIndex, 1, 1, headers.length).setValues([updatedRow]);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "delete") {
      sheet.deleteRow(targetRowIndex);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ error: `Unknown action: ${action}` }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
