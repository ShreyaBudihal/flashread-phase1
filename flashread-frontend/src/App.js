import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [news, setNews] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    country: "",
    category: "",
    date: "",
  });

  // Fetch news from backend
  const fetchNews = async () => {
    try {
      const params = {};
      if (filters.q) params.q = filters.q;
      if (filters.country) params.country = filters.country;
      if (filters.category) params.category = filters.category;
      if (filters.date) params.date = filters.date;

      const res = await axios.get("http://localhost:5000/api/news", { params });
      setNews(res.data.articles);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNews(); // Load default news on page load
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    fetchNews();
  };

  const handleReset = () => {
    setFilters({ q: "", country: "", category: "", date: "" });
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📰 FlashRead</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Category</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Politics">Politics</option>
        </select>

        <select
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Country</option>
          <option value="us">USA</option>
          <option value="uk">UK</option>
          <option value="in">India</option>
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="text"
          name="q"
          value={filters.q}
          onChange={handleChange}
          placeholder="Search keyword..."
          className="p-2 border rounded w-48"
        />

        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow"
        >
          Reset
        </button>
      </div>

      {/* News Display */}
      {news.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {article.source} • {article.publishedAt}
              </p>
              <p className="text-gray-700 mb-3">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No news available. Try adjusting filters.
        </p>
      )}
    </div>
  );
}

export default App;
