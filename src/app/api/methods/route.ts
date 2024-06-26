import { getFakerMethods } from "@/lib/mock";

export async function POST() {
  return new Response(JSON.stringify(getFakerMethods()));
}
