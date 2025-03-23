document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-feed");

    const feeds = [
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/"
    ];

    async function fetchNews() {
        try {
            let allNews = [];
            for (const feed of feeds) {
                const response = await fetch(feed);
                const data = await response.json();
                allNews = allNews.concat(data.items);
            }

            // Sort by latest date
            allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

            // Clear loading text
            newsContainer.innerHTML = "";

            // Display news articles (limit to 10)
            allNews.slice(0, 10).forEach(article => {
                let newsItem = document.createElement("div");
                newsItem.innerHTML = `
                    <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                    <p>${article.description}</p>
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
