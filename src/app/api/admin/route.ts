import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiEndpoint = searchParams.get("endpoint") || process.env.NEXT_PUBLIC_GOOGLE_SHEET_API;
  
  if (!apiEndpoint) {
    return NextResponse.json({ error: "Google Sheets API URL is not configured." }, { status: 400 });
  }
  try {
    const res = await fetch(apiEndpoint, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch from Google Sheets API: ${res.statusText}` }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to connect to Google Sheets API" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiEndpoint = searchParams.get("endpoint") || process.env.NEXT_PUBLIC_GOOGLE_SHEET_API;

  if (!apiEndpoint) {
    return NextResponse.json({ error: "Google Sheets API URL is not configured." }, { status: 400 });
  }
  try {
    const body = await request.json();
    console.log("Proxy POST Request Body:", body);
    
    // Call Google Sheets Apps Script Web App from Next.js server (bypassing CORS)
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      redirect: "follow"
    });
    
    const text = await res.text();
    console.log("Proxy Response Status:", res.status);
    console.log("Proxy Response Headers:", Object.fromEntries(res.headers.entries()));
    console.log("Proxy Response Text (first 500 chars):", text.substring(0, 500));
    
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch {
      // If it's not JSON, return it as a structured error so the client can display it
      return NextResponse.json({ error: "Non-JSON response from Google Script", details: text.substring(0, 500) }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: error.message || "Failed to process request on server" }, { status: 500 });
  }
}
