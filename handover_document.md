# Project Handover Document: Marudhar Tours India

Welcome to the handover documentation for the **Marudhar Tours India** website. This document contains all the steps, files, and credentials required to set up, deploy, and customize the website for the production environment.

---

## 1. Environment Variables Configuration

Copy `.env.example` to `.env` (or `.env.production` in your hosting platform like Vercel, Netlify, or Hostinger) and update the following values:

```env
# Headless WordPress Backend URL (Leave blank to use sandbox mock data)
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-domain.com

# Frontend Site Domain URL (used for dynamic sitemaps and structured JSON-LD schemas)
NEXT_PUBLIC_SITE_URL=https://marudhartoursindia.com

# Formspree Endpoint for Contact & Custom package form inquiries
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id

# Google Sheets Web App Endpoint (for Serverless Admin Dashboard CMS)
NEXT_PUBLIC_GOOGLE_SHEET_API=https://script.google.com/macros/s/your_apps_script_id/exec
```

---

## 2. Branding & Contact Details Setup

To update the business's contact info, locate and edit the following files:

### Physical Address, Phone & Email
1. **Footer**: [Footer.tsx](file:///e:/claude/Treval_website/src/components/layout/Footer.tsx) (Lines 140-159)
   - Update address lines, phone link `tel:+919509599502`, and email `sonusingh1985@gmail.com`.
2. **Contact Page**: [page.tsx](file:///e:/claude/Treval_website/src/app/contact/page.tsx) (Lines 63-89)
   - Update physical location text, phone number, and support email.

### Instant Chat (WhatsApp)
- In [page.tsx](file:///e:/claude/Treval_website/src/app/contact/page.tsx) (Line 113), replace the phone number in `https://wa.me/919509599502` with the client's WhatsApp business number.

### Google Maps Location
- In [page.tsx](file:///e:/claude/Treval_website/src/app/contact/page.tsx) (Line 20-27), change the `src` attribute of the `<iframe>` component to the client's official office embed URL generated from Google Maps.

### Social Media Links
- In [seo.ts](file:///e:/claude/Treval_website/src/lib/seo.ts) (Lines 41-43) and [Footer.tsx](file:///e:/claude/Treval_website/src/components/layout/Footer.tsx) (Lines 43-65), replace the links for Instagram, Facebook, and Twitter with the client's official accounts.

---

## 3. Google Sheets Integration & Admin Portal

The website logs lead inquiries (from the Contact Form & Custom Package builder) into a Google Sheet and renders them in a private admin dashboard.

### Steps to set up:
1. Create a new **Google Sheet** in the client's Google Account.
2. In the Google Sheet, go to **Extensions > Apps Script**.
3. Delete any default code and paste the code from [google-sheet-db.js](file:///e:/claude/Treval_website/google-sheet-db.js).
4. **Secret Token Configuration**:
   - In the Apps Script, update `SECRET_TOKEN` to a secure, unique password.
   - In the website codebase, open [admin/page.tsx](file:///e:/claude/Treval_website/src/app/admin/page.tsx) (Line 10) and update `SECRET_TOKEN` to match the exact same value.
5. In the Apps Script editor, click **Deploy > New Deployment**.
   - **Select type**: Web app
   - **Execute as**: Me (your-email@gmail.com)
   - **Who has access**: Anyone
6. Copy the generated **Web App URL** and paste it under `NEXT_PUBLIC_GOOGLE_SHEET_API` in your `.env` file.

---

## 4. Headless WordPress Setup (Optional CMS)

If the client wants to manage packages and blog posts via WordPress:
1. Upload [headless-travel-cms.php](file:///e:/claude/Treval_website/headless-travel-cms.php) as a custom plugin to the client's WordPress site (`wp-content/plugins/`).
2. Activate the plugin inside the WordPress Admin Dashboard.
3. Configure the GraphQL / REST API endpoints and make sure they are accessible.
4. Set the WordPress URL in the environment variables (`NEXT_PUBLIC_WORDPRESS_URL`).

---

## 5. Deployment Instructions

This is a Next.js application. The fastest way to deploy it is via **Vercel**:
1. Connect the repository to Vercel.
2. Add the environment variables configured in Step 1.
3. Deploy. The site will automatically build and generate a dynamic sitemap based on the `NEXT_PUBLIC_SITE_URL`.
