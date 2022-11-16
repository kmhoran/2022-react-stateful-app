import axios from "axios";

export async function fetchRandomCatImage(): Promise<string> {
  const response = await axios(
    "https://cataas.com/cat?height=300&width=300&json=true"
  );
  console.log("GOT CAT RESPONSE:", response.data);
  return `https://cataas.com/cat/${response.data._id}`;
}
