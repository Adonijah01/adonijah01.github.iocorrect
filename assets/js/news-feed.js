document.addEventListener("DOMContentLoaded", async function () {
    const newsContainer = document.getElementById("news-feed");
    const ctfContainer = document.getElementById("ctf-feed");

    const feeds = [
        "https://feeds.feedburner.com/TheHackersNews",
        "https://www.bleepingcomputer.com/feed/",
        "https://www.darkreading.com/rss.xml",
        "https://www.securityweek.com/feed",
        "https://www.scmagazine.com/rss.xml",
        "https://www.infosecurity-magazine.com/rss/news/",
        "https://haveibeenpwned.com/LatestBreaches/rss",
        "https://www.databreaches.net/feed/",
        "https://blog.cloudflare.com/rss/",
        "https://vx-underground.substack.com/feed",
        "https://cointelegraph.com/rss/tag/hacks",
        "https://www.exploit-db.com/rss.xml"
    ];

    const ctfFeed = "https://ctftime.org/api/v1/events/?limit=10";

    async function fetchRSS(url) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            return new window.DOMParser().parseFromString(data.contents, "text/xml");
        } catch (error) {
            console.error(`Error fetching RSS for ${url}:`, error);
            return null;
        }
    }

    async function fetchNews() {
        try {
            let allNews = [];
            
            for (const feed of feeds) {
                const xmlData = await fetchRSS(feed);
                if (!xmlData) continue;

                const items = xmlData.querySelectorAll("item");
                items.forEach(item => {
                    allNews.push({
                        title: item.querySelector("title").textContent,
                        link: item.querySelector("link").textContent,
                        description: item.querySelector("description").textContent.slice(0, 150) + "...",
                        pubDate: new Date(item.querySelector("pubDate").textContent)
                    });
                });
            }

            allNews.sort((a, b) => b.pubDate - a.pubDate);
            newsContainer.innerHTML = "<h2>Cybersecurity & Hacking News</h2>";

            if (allNews.length === 0) {
                newsContainer.innerHTML += "<p>No recent news found.</p>";
                return;
            }

            allNews.slice(0, 15).forEach(article => {
                let newsItem = document.createElement("div");
                newsItem.innerHTML = `
                    <h3>
                        <a href="${article.link}" target="_blank" style="text-decoration: none; font-weight: bold;">${article.title}</a>
                    </h3>
                    <p>${article.description}</p>
                    <small>${article.pubDate.toLocaleDateString()}</small>
                    <hr>
                `;
                newsContainer.appendChild(newsItem);
            });

        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        }
    }

    async function fetchCTFs() {
        try {
            const response = await fetch(ctfFeed);
            const ctfData = await response.json();

            ctfContainer.innerHTML = "<h2>Upcoming CTFs</h2>";

            if (!Array.isArray(ctfData) || ctfData.length === 0) {
                ctfContainer.innerHTML += "<p>No upcoming CTFs found.</p>";
                return;
            }

            ctfData.forEach(event => {
                let ctfItem = document.createElement("div");
                ctfItem.innerHTML = `
                    <h3>
                        <a href="${event.ctftime_url}" target="_blank" style="text-decoration: none; font-weight: bold;">${event.title}</a>
                    </h3>
                    <p>Start: ${new Date(event.start).toLocaleString()}</p>
                    <p>End: ${new Date(event.finish).toLocaleString()}</p>
                    <hr>
                `;
                ctfContainer.appendChild(ctfItem);
            });

        } catch (error) {
            console.error("Error fetching CTFs:", error);
            ctfContainer.innerHTML = "<p>Failed to load CTFs. Please try again later.</p>";
        }
    }

    fetchNews();
    fetchCTFs();
});
