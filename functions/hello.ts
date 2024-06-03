import { Handler } from "@netlify/functions";

interface Items {
  id: number;
  name: string;
}
const items: Items[] = [
  { id: 1, name: "john" },
  { id: 2, name: "susan" },
];
const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    // body: JSON.stringify(items),
    body: 'Hello World'
  };
};

export { handler };
