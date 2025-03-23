document.addEventListener("DOMContentLoaded", function () {
    const newsFeed = document.getElementById("news-feed");
  
    // Array of RSS feed endpoints (using rss2json conversion)
    const feeds = [
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://threatpost.com/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://nakedsecurity.sophos.com/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml",
        // Darknet & Cybercrime
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.deepdotweb.com/feed/", 
        "https://api.rss2json.com/v1/api.json?rss_url=https://krebsonsecurity.com/feed/",
        // Bitcoin & Web3 Security
        "https://api.rss2json.com/v1/api.json?rss_url=https://bitcoinmagazine.com/.rss/full/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://decrypt.co/feed",
        // Bank Heists & Fraud
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.bankinfosecurity.com/rss_feeds.php?fid=2",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.finextra.com/rss/headlines.aspx"
    ];
  
    async function fetchNews() {
      let allNews = [];
      for (let feed of feeds) {
        try {
          const response = await fetch(feed);
          const data = await response.json();
          if (data.items) {
            allNews = allNews.concat(data.items);
          }
        } catch (error) {
          console.error("Error fetching from feed:", feed, error);
        }
      }
      // Sort by latest publication date (newest first)
      allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      displayNews(allNews.slice(0, 15)); // Show the top 15 articles
    }
  
    function displayNews(articles) {
      newsFeed.innerHTML = "";
      if (!articles.length) {
        newsFeed.innerHTML = "<p>⚠️ No news available at this time.</p>";
        return;
      }
      articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
          <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
          <p>${truncateText(article.description, 150)}</p>
          <small>${new Date(article.pubDate).toLocaleDateString()}</small>
          <hr>
        `;
        newsFeed.appendChild(newsItem);
      });
    }
  
    // Utility function to truncate long text descriptions
    function truncateText(text, length) {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    }
  
    fetchNews();
  });
  