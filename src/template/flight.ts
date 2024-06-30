export const flight = {
  name: "Flight",
  fields: [
    {
      key: "ticketNumber",
      value: "string.nanoid",
    },
    {
      key: "passenger",
      value: "object",
      children: [
        {
          key: "firstName",
          value: "person.firstName",
        },
        {
          key: "lastName",
          value: "person.lastName",
        },
      ],
    },
    {
      key: "flights",
      value: "object",
      children: [
        {
          key: "airline",
          value: "airline.airline",
        },
        {
          key: "departureAirport",
          value: "airline.airport",
        },
        {
          key: "arrivalAirport",
          value: "airline.airport",
        },
        {
          key: "departureTime",
          value: "date.recent",
        },
        {
          key: "arrivalTime",
          value: "date.soon",
        },
      ],
    },
    {
      key: "seat",
      value: "airline.seat",
    },
    {
      key: "price",
      value: "commerce.price",
    },
  ],
};
