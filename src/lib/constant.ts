import { getBaseURL } from "./utils";

export const viewCode = (json: any, count: string | null) => `const response = await fetch("${getBaseURL()}/api/mock", {
  method: "POST",
  body: JSON.stringify({
    count: ${count ? count : 1},
    data: ${JSON.stringify(json, null, 2).replace(/\n/g, "\n    ")}
  })
});`;

export const usageCode = `const response = await fetch("${getBaseURL()}/api/mock", {
  method: "POST",
  body: JSON.stringify({
    count: 1,
    data: {
      firstName: "person.firstName",
      lastName: "person.lastName"
    }
  })
});`;

export const specialDataType = ["array", "arrayObject", "object"];

export const filteredCategory = ["_randomizer", "helpers", "random"];

export const deprecatedMethods = [
  "company.bs",
  "company.bsAdjective",
  "company.bsBuzz",
  "company.bsNoun",
  "company.companySuffix",
  "company.suffixes",

  "datatype.array",
  "datatype.bigInt",
  "datatype.datetime",
  "datatype.float",
  "datatype.hexadecimal",
  "datatype.json",
  "datatype.number",
  "datatype.string",
  "datatype.uuid",

  "finance.account",
  "finance.mask",

  "git.shortSha",

  "image.abstact",
  "image.animals",
  "image.business",
  "image.cats",
  "image.city",
  "image.fashion",
  "image.food",
  "image.image",
  "image.imageUrl",
  "image.nature",
  "image.nightLife",
  "image.people",
  "image.sports",
  "image.technics",
  "image.transport",

  "internet.avatar",

  "location.cityName",
  "location.stateAbbr",
  "location.streetName",
  "location.zipCodeByState",

  "random.alpha",
  "random.alphaNumeric",
  "random.numeric",
  "random.word",
  "random.words",
];
