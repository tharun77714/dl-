import { NextRequest, NextResponse } from "next/server";
import { getPythonApiBaseUrl, getPythonApiHeaders } from "@/lib/python-api";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const response = await fetch(
      `${getPythonApiBaseUrl()}/api/smart-resume/generate`,
      {
        method: "POST",
        headers: getPythonApiHeaders(),
        body: formData,
      }
    );

    const text = await response.text();

    try {
      return NextResponse.json(JSON.parse(text), { status: response.status });
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: text || "Smart resume backend returned an invalid response.",
        },
        { status: response.status || 500 }
      );
    }
  } catch (error) {
    console.error("smart-resume proxy:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Could not reach Python API at ${getPythonApiBaseUrl()}.`,
      },
      { status: 503 }
    );
  }
}
