export default async function handler(req, res) {
  const url = "https://www.homedepot.com/p/RYOBI-ONE-18V-Cordless-1-2-in-Drill-Driver-Kit-with-1-1-5-Ah-Battery-and-Charger-P215K/313315525";

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Look for a price pattern in the HTML
    const priceMatch = html.match(/"price"\s*:\s*"?(\d+\.\d{2})"?/);

    if (!priceMatch) {
      return res.status(200).json({ price: null, message: "Price not found" });
    }

    const price = priceMatch[1];

    res.status(200).json({
      product: "Ryobi 18V Drill Kit",
      price: price
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
