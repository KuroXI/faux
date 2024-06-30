export const post = {
  name: "Post",
  fields: [
    {
      key: "id",
      value: "string.uuid",
    },
    {
      key: "user",
      value: "object",
      children: [
        {
          key: "id",
          value: "string.uuid",
        },
        {
          key: "username",
          value: "internet.userName",
        },
        {
          key: "fullName",
          value: "person.fullName",
        },
        {
          key: "avatar",
          value: "image.avatarGitHub",
        },
        {
          key: "followers",
          value: "number.int",
        },
      ],
    },
    {
      key: "content",
      value: "object",
      children: [
        {
          key: "content",
          value: "lorem.paragraphs",
        },
      ],
    },
    {
      key: "engagement",
      value: "object",
      children: [
        {
          key: "likes",
          value: "number.int",
        },
        {
          key: "shares",
          value: "number.int",
        },
      ],
    },
    {
      key: "timestamp",
      value: "date.recent",
    },
    {
      key: "comments",
      value: "arrayObject",
      children: [
        {
          key: "id",
          value: "string.uuid",
        },
        {
          key: "user",
          value: "object",
          children: [
            {
              key: "username",
              value: "internet.userName",
            },
            {
              key: "avatar",
              value: "image.avatarGitHub",
            },
          ],
        },
        {
          key: "content",
          value: "lorem.sentence",
        },
        {
          key: "likes",
          value: "number.int",
        },
        {
          key: "timestamp",
          value: "date.recent",
        },
      ],
      count: "5",
    },
  ],
};
