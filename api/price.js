export default async function handler(req, res) {
  const url = "https://www.homedepot.com/p/RYOBI-ONE-18V-Cordless-1-2-in-Drill-Driver-Kit-with-1-1-5-Ah-Battery-and-Charger-P215K/313315525";

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Return the first 500 characters so we can inspect the HTML
    res.status(200).json({
      preview: html.substring(0, 500)
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch HTML" });
  }
}
