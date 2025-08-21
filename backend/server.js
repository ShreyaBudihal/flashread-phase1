import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

// Dummy News Data
const dummyNews = [
  {
    title: "AI Revolutionizes Healthcare",
    source: "Tech Daily",
    publishedAt: "2025-06-01",
    url: "https://example.com/ai-healthcare",
    description: "Artificial Intelligence is transforming patient care with faster diagnoses.",
    category: "Technology",
    country: "us",
  },
  {
    title: "Global Markets Rally as Inflation Cools",
    source: "Finance Times",
    publishedAt: "2025-06-02",
    url: "https://example.com/global-markets",
    description: "Stocks soar worldwide as new economic data signals cooling inflation.",
    category: "Business",
    country: "uk",
  },
  {
    title: "Election Results: New Leaders Emerge",
    source: "World News",
    publishedAt: "2025-06-03",
    url: "https://example.com/elections",
    description: "The latest elections bring fresh faces into political power.",
    category: "Politics",
    country: "in",
  },
];

// API route to fetch dummy news with filters
app.get("/api/news", (req, res) => {
  const { q, country, category, date } = req.query;

  let filteredNews = [...dummyNews];

  if (q) {
    filteredNews = filteredNews.filter(article =>
      article.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (country) {
    filteredNews = filteredNews.filter(article => article.country === country);
  }

  if (category) {
    filteredNews = filteredNews.filter(article => article.category.toLowerCase() === category.toLowerCase());
  }

  if (date) {
    filteredNews = filteredNews.filter(article => article.publishedAt === date);
  }

  res.json({ articles: filteredNews });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
