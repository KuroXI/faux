# Faux API

Generate realistic mock data for your API testing and development needs.

## TO-DO

- [x] Dynamic fields to simulate JSON
- [x] Dynamic fields with nested objects
- [x] Support array object using [multiple](https://fakerjs.dev/api/helpers.html#multiple)
- [ ] Demonstration Template

## Usage

### Example Request

```ts
await fetch("http://localhost:3000/api/mock", {
  method: "POST",
  body: JSON.stringify({
    count: 1,
    data: {
      firstName: "person.firstName",
      lastName: "person.lastName",
    },
  }),
});
```

### Example Response

`count = 1`

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

`count > 1`

```json
[
  {
    "firstName": "John",
    "lastName": "Doe"
  },
  {
    "firstName": "Eleazar",
    "lastName": "Shields"
  }
]
```

## Acknowledgments

- [Faker.js](https://fakerjs.dev/)
