import Post from "../models/post.model.js";

export const generateRSSFeed = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(50);

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vamshi's Blog</title>
    <link>${baseUrl}</link>
    <description>Insights on technology, development, and innovation</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
`;

    posts.forEach((post) => {
      const postUrl = `${baseUrl}/post/${post.slug}`;
      const content = post.content.replace(/<[^>]*>/g, "").substring(0, 500);

      rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${content}...]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
    </item>`;
    });

    rss += `
  </channel>
</rss>`;

    res.set("Content-Type", "application/rss+xml");
    res.send(rss);
  } catch (error) {
    next(error);
  }
};
