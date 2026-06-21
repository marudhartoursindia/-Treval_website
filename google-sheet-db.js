const SECRET_TOKEN = "MarudharToursSecureToken2026";

// ====== PASTE YOUR GOOGLE SHEET ID HERE ======
const SPREADSHEET_ID = "1JsZWZVX9YO-8c_AgxNdA_Zb02H8Vrhc7645CgeDCqZ4";

// ====== DATABASE SCHEMAS ======
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
    "date", "categories_names", "tags_names",
    "seo_title", "seo_description"
  ],

  testimonials: [
    "id", "title", "content", "rating", "location", "photo"
  ],

  faqs: [
    "id", "title", "answer", "category"
  ]
};

// ====== GET SPREADSHEET ======
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

// ====== INITIAL DATABASE SETUP ======
function setupDatabase() {
  const ss = getSpreadsheet();

  Object.keys(SCHEMAS).forEach(sheetName => {

    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    const headers = SCHEMAS[sheetName];

    sheet.clear();

    sheet
      .getRange(1, 1, 1, headers.length)
      .setValues([headers]);

    sheet
      .getRange(1, 1, 1, headers.length)
      .setFontWeight("bold");
  });

  Logger.log("Database initialized successfully.");
}

// ====== GET DATA ======
function doGet(e) {
  try {

    const ss = getSpreadsheet();

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

      result[sheetName] = data.slice(1).map(row => {

        const obj = {};

        headers.forEach((header, index) => {

          let value = row[index];

          if (
            typeof value === "string" &&
            (value.startsWith("[") || value.startsWith("{"))
          ) {
            try {
              value = JSON.parse(value);
            } catch (err) {}
          }

          obj[header] = value;
        });

        return obj;
      });
    });

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ====== POST DATA ======
function doPost(e) {
  try {

    const payload = JSON.parse(e.postData.contents);

    if (payload.token !== SECRET_TOKEN) {

      return ContentService
        .createTextOutput(
          JSON.stringify({
            success: false,
            error: "Unauthorized"
          })
        )
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = getSpreadsheet();

    const sheet = ss.getSheetByName(payload.sheet);

    if (!sheet) {

      return ContentService
        .createTextOutput(
          JSON.stringify({
            success: false,
            error: "Sheet not found"
          })
        )
        .setMimeType(ContentService.MimeType.JSON);
    }

    const values = sheet.getDataRange().getValues();

    const headers = values[0];

    const action = payload.action;

    const item = payload.data;

    // ===== CREATE =====
    if (action === "create") {

      if (!item.id) {

        let maxId = 0;

        for (let i = 1; i < values.length; i++) {

          const currentId = Number(values[i][0]);

          if (currentId > maxId) {
            maxId = currentId;
          }
        }

        item.id = maxId + 1;
      }

      const row = headers.map(header => {

        let value = item[header];

        if (value === undefined || value === null) {
          return "";
        }

        if (typeof value === "object") {
          return JSON.stringify(value);
        }

        return value;
      });

      sheet.appendRow(row);

      return ContentService
        .createTextOutput(
          JSON.stringify({
            success: true,
            id: item.id
          })
        )
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ===== FIND ROW =====
    let rowNumber = -1;

    for (let i = 1; i < values.length; i++) {
      const rowId = String(values[i][0]).trim();
      const itemId = String(item.id).trim();

      if (rowId === itemId || (Number(rowId) === Number(itemId) && !isNaN(Number(rowId)) && !isNaN(Number(itemId)))) {
        rowNumber = i + 1;
        break;
      }
    }

    if (rowNumber === -1) {

      return ContentService
        .createTextOutput(
          JSON.stringify({
            success: false,
            error: "Record not found"
          })
        )
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ===== UPDATE =====
    if (action === "update") {

      const updatedRow = headers.map(header => {

        let value = item[header];

        if (value === undefined || value === null) {
          return "";
        }

        if (typeof value === "object") {
          return JSON.stringify(value);
        }

        return value;
      });

      sheet
        .getRange(rowNumber, 1, 1, headers.length)
        .setValues([updatedRow]);

      return ContentService
        .createTextOutput(
          JSON.stringify({
            success: true
          })
        )
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ===== DELETE =====
    if (action === "delete") {

      sheet.deleteRow(rowNumber);

      return ContentService
        .createTextOutput(
          JSON.stringify({
            success: true
          })
        )
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: "Invalid action"
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}
