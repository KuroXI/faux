export const product = {
  name: "Product",
  fields: [
    {
      key: "id",
      value: "string.uuid",
    },
    {
      key: "name",
      value: "commerce.productName",
    },
    {
      key: "description",
      value: "commerce.productDescription",
    },
    {
      key: "category",
      value: "commerce.department",
    },
    {
      key: "price",
      value: "commerce.price",
    },
    {
      key: "discountPercentage",
      value: "number.float",
    },
    {
      key: "stock",
      value: "number.int",
    },
    {
      key: "brand",
      value: "company.name",
    },
    {
      key: "images",
      value: "array",
      data: "image.url",
      count: "5",
    },
    {
      key: "ratings",
      value: "object",
      children: [
        {
          key: "average",
          value: "number.float",
        },
        {
          key: "count",
          value: "number.int",
        },
      ],
    },
    {
      key: "reviews",
      value: "arrayObject",
      children: [
        {
          key: "id",
          value: "string.uuid",
        },
        {
          key: "user",
          value: "person.fullName",
        },
        {
          key: "rating",
          value: "number.int",
        },
        {
          key: "comment",
          value: "lorem.sentence",
        },
        {
          key: "createdAt",
          value: "date.recent",
        },
      ],
      count: "5",
    },
    {
      key: "createdAt",
      value: "date.past",
    },
  ],
};
