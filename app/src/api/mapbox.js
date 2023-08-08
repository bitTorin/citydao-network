import axios from "axios";

export default async (req, res) => {
  console.log(`${process.env.MAPBOX}`)
  const URL = `https://api.i.require.keys/?&api_key=${process.env.MAPBOX}`;
  const response = await axios.get(URL);
  res.status(200).json({ data: response.data })
}