import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Field } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseURL() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function handleInputTextNumber(value: string) {
  let numericValue = value.replace(/[^0-9]/g, "");

  if (numericValue) {
    let num = parseInt(numericValue, 10);
    if (num < 1) {
      numericValue = "1";
    } else if (num > 1000) {
      numericValue = "1000";
    }
  }

  return numericValue;
}

export function parseMethodValue(category: string, method: string) {
  if (method === "object") return "object";
  if (method === "arrayObject") return "arrayObject";
  if (method === "array") return "array";

  return `${category}.${method}`;
}

export function buildJSON(fields: Field[]): Record<string, any> {
  const result: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.children && field.children.length > 0 && field.value === "object") {
      result[field.key] = buildJSON(field.children!);
    } else if (field.children && field.children.length > 0 && field.value === "arrayObject") {
      result[field.key] = {
        data: buildJSON(field.children!),
        total: field.count ? parseInt(field.count, 10) : 1,
      };
    } else if (field.value === "array") {
      result[field.key] = {
        data: field.data,
        total: field.count ? parseInt(field.count, 10) : 1,
      };
    } else {
      result[field.key] = field.value;
    }
  });

  return result;
}
