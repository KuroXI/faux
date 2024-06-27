import { faker } from "@faker-js/faker";
import { deprecatedMethods, filteredCategory, specialDataType } from "./constant";

interface FakerCategory {
  [method: string]: () => any;
}

interface Faker {
  [category: string]: FakerCategory;
}

export const getFakerMethods = () => {
  const result: { [category: string]: string[] } = { "": specialDataType };

  Object.keys(faker)
    .filter((category) => !filteredCategory.includes(category))
    .forEach((category) => {
      Object.keys(faker[category as keyof typeof faker])
        .filter((method) => !deprecatedMethods.includes(`${category}.${method}`))
        .forEach((method) => {
          if (typeof (faker as unknown as Faker)[category][method] === "function") {
            if (!result[category]) {
              result[category] = [];
            }

            result[category].push(method);
          }
        });
    });

  return Object.keys(result)
    .map((v) => ({
      category: v,
      methods: result[v].sort((a, b) => (a > b ? 1 : -1)),
    }))
    .sort((a, b) => (a.category > b.category ? 1 : -1));
};

export const generateMockData = (key: string) => {
  if (deprecatedMethods.includes(key)) return `${key} is a deprecated method`;

  const [category, method] = key.split(".");

  if (
    category &&
    method &&
    (faker as unknown as Faker)[category] &&
    typeof (faker as unknown as Faker)[category][method] === "function"
  ) {
    return (faker as unknown as Faker)[category][method]();
  }
};

export const transformObject = (object: any, count: number = 1): any => {
  const transform = (obj: any): any => {
    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string" && value.includes(".")) {
        result[key] = generateMockData(value);
      } else if (typeof value === "object" && value !== null) {
        if ("total" in value && "data" in value && typeof value.data === "object") {
          result[key] = faker.helpers.multiple(() => transform(value.data), {
            count: value.total as number,
          });
        } else if ("total" in value && "data" in value && typeof value.data === "string") {
          result[key] = faker.helpers.multiple(() => generateMockData(value.data as string), {
            count: value.total as number,
          });
        } else {
          result[key] = transform(value);
        }
      } else {
        result[key] = value;
      }
    }

    return result;
  };

  return count > 1 ? faker.helpers.multiple(() => transform(object), { count }) : transform(object);
};
