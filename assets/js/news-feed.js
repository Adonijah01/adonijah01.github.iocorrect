document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-feed");
    const ctfContainer = document.getElementById("ctf-feed");

    const feeds = [
        // General Cybersecurity News
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.securityweek.com/feed",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.scmagazine.com/rss.xml",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.infosecurity-magazine.com/rss/news/",
        
        // Data Breaches & Leaks
        "https://api.rss2json.com/v1/api.json?rss_url=https://haveibeenpwned.com/LatestBreaches/rss",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.databreaches.net/feed/",
        
        // DDoS Attacks & Threat Intelligence
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.akamai.com/blog.rss",
        "https://api.rss2json.com/v1/api.json?rss_url=https://blog.cloudflare.com/rss/",
        
        // Hacker Groups & Cybercrime
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cyberscoop.com/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://therecord.media/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://vx-underground.substack.com/feed",
        
        // Bitcoin Hacks & Cryptocurrency Security
        "https://api.rss2json.com/v1/api.json?rss_url=https://decrypt.co/feed",
        "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss/tag/hacks",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/",
        
        // Malware Analysis & Exploits
        "https://api.rss2json.com/v1/api.json?rss_url=https://malware.news/rss",
        "https://api.rss2json.com/v1/api.json?rss_url=https://blog.talosintelligence.com/feeds/posts/default",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.fireeye.com/blog/threat-research/_jcr_content.feed",
        
        // Zero-Day Vulnerabilities
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.zerodayinitiative.com/rss/upcoming/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.exploit-db.com/rss.xml"
    ];

    const ctfFeed = "https://ctftime.org/api/v1/events/?limit=10"; // Fetch upcoming CTFs

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

            allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            newsContainer.innerHTML = "<h2>Cybersecurity & Hacking News</h2>";

            allNews.slice(0, 15).forEach(article => {
                const articleId = encodeURIComponent(article.link);
                let isRead = localStorage.getItem(articleId) === "true";

                let newsItem = document.createElement("div");
                newsItem.style.transition = "opacity 0.3s ease-in-out";
                newsItem.innerHTML = `
                    <h3>
                        <a href="${article.link}" target="_blank" class="news-link" style="text-decoration: none; font-weight: bold;">${article.title}</a>
                        <span data-id="${articleId}" style="cursor: pointer; margin-left: 10px; color: ${isRead ? 'green' : 'red'};">
                            ${isRead ? '✅ Read' : '🔵 Unread'}
                        </span>
                    </h3>
                    <p>${article.description.slice(0, 150)}...</p>
                    <small>${new Date(article.pubDate).toLocaleDateString()}</small>
                    <hr>
                `;
                newsContainer.appendChild(newsItem);
            });

            document.querySelectorAll("span[data-id]").forEach(status => {
                status.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    const isNowRead = localStorage.getItem(id) !== "true";
                    localStorage.setItem(id, isNowRead);

                    this.textContent = isNowRead ? "✅ Read" : "🔵 Unread";
                    this.style.color = isNowRead ? "green" : "red";

                    this.parentElement.parentElement.style.opacity = "0.5";
                    setTimeout(() => this.parentElement.parentElement.style.opacity = "1", 300);
                });
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

            ctfData.forEach(event => {
                const eventId = encodeURIComponent(event.ctftime_url);
                let isRead = localStorage.getItem(eventId) === "true";

                let ctfItem = document.createElement("div");
                ctfItem.style.transition = "opacity 0.3s ease-in-out";
                ctfItem.innerHTML = `
                    <h3>
                        <a href="${event.ctftime_url}" target="_blank" style="text-decoration: none; font-weight: bold;">${event.title}</a>
                        <span data-id="${eventId}" style="cursor: pointer; margin-left: 10px; color: ${isRead ? 'green' : 'red'};">
                            ${isRead ? '✅ Read' : '🔵 Unread'}
                        </span>
                    </h3>
                    <p>Start: ${new Date(event.start).toLocaleString()}</p>
                    <p>End: ${new Date(event.finish).toLocaleString()}</p>
                    <hr>
                `;
                ctfContainer.appendChild(ctfItem);
            });

            document.querySelectorAll("span[data-id]").forEach(status => {
                status.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    const isNowRead = localStorage.getItem(id) !== "true";
                    localStorage.setItem(id, isNowRead);

                    this.textContent = isNowRead ? "✅ Read" : "🔵 Unread";
                    this.style.color = isNowRead ? "green" : "red";

                    this.parentElement.parentElement.style.opacity = "0.5";
                    setTimeout(() => this.parentElement.parentElement.style.opacity = "1", 300);
                });
            });

        } catch (error) {
            console.error("Error fetching CTFs:", error);
        }
    }

    fetchNews();
    fetchCTFs();
});
