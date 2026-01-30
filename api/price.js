export default async function handler(req, res) {
  const url = "https://www.homedepot.com/p/RYOBI-ONE-18V-Cordless-1-2-in-Drill-Driver-Kit-with-1-1-5-Ah-Battery-and-Charger-P215K/313315525";

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Try multiple price patterns
    const patterns = [
      /"price"\s*:\s*"?(\d+\.\d{2})"?/,
      /"unitPrice"\s*:\s*"?(\d+\.\d{2})"?/,
      /"value"\s*:\s*"?(\d+\.\d{2})"?/,
      /"priceValue"\s*:\s*"?(\d+\.\d{2})"?/,
      /"formattedPrice"\s*:\s*"\$(\d+\.\d{2})"/
    ];

    let price = null;

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        price = match[1];
        break;
      }
    }

    if (!price) {
      return res.status(200).json({ price: null, message: "Price not found" });
    }

    res.status(200).json({
      product: "Ryobi 18V Drill Kit",
      price: price
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
