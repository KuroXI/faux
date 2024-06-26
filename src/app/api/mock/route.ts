import { getFakerMethods, transformObject } from "@/lib/mock";
import { NextResponse } from "next/server";

type BodyJSON = {
  count: number;
  data: JSON;
};

export async function POST(request: Request) {
  const { count, data } = (await request.json()) as BodyJSON;

  if (typeof data !== "object") {
    return NextResponse.json({ error: "Invalid JSON data provided" }, { status: 400 });
  }

  console.log(data);

  return new Response(JSON.stringify(transformObject(data, count)));
}

export async function GET() {
  return new Response(JSON.stringify(getFakerMethods()));
}
