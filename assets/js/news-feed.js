document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-feed");

    const feeds = [
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews", // The Hacker News
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/", // Bleeping Computer
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml", // Dark Reading (Cybersecurity news)
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.securityweek.com/feed", // SecurityWeek
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.fsf.org/news/rss.xml", // Free Software Foundation (FSF)
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.linuxsecurity.com/rss/news_articles", // Linux Security News
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.csoonline.com/uk/index.rss", // CSO Online (Cloud & Network Security)
        "https://api.rss2json.com/v1/api.json?rss_url=https://threatpost.com/feed/", // ThreatPost
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.krebsonsecurity.com/feed/", // Krebs on Security
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cybersecurity-insiders.com/feed/", // Cybersecurity Insiders
        "https://api.rss2json.com/v1/api.json?rss_url=https://securityaffairs.com/wp-content/uploads/2016/11/feed" // Security Affairs
    ];

    async function fetchNews() {
        try {
            let allNews = [];
            for (const feed of feeds) {
                const response = await fetch(feed);
                const data = await response.json();
                if (data.items) {
                    allNews = allNews.concat(data.items);
                }
            }

            // Sort by latest date
            allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

            // Clear loading text
            newsContainer.innerHTML = "";

            // Display news articles (limit to 15)
            allNews.slice(0, 15).forEach(article => {
                let newsItem = document.createElement("div");
                newsItem.innerHTML = `
                    <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                    <p>${article.description.slice(0, 150)}...</p>
                    <small>${new Date(article.pubDate).toLocaleDateString()}</small>
                    <hr>
                `;
                newsContainer.appendChild(newsItem);
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        }
    }

    fetchNews();
});
