document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-feed");

    const feeds = [
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/",
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml"
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
            newsContainer.innerHTML = "<h2>Cybersecurity News</h2>";

            allNews.slice(0, 10).forEach(article => {
                let isRead = localStorage.getItem(article.link) ? true : false;
                
                let newsItem = document.createElement("div");
                newsItem.innerHTML = `
                    <h3>
                        <a href="${article.link}" target="_blank" data-url="${article.link}" class="${isRead ? 'read' : 'unread'}">
                            ${article.title}
                        </a>
                        <span class="status">${isRead ? '✅ Read' : '🔵 Unread'}</span>
                    </h3>
                    <p>${article.description.slice(0, 150)}...</p>
                    <small>${new Date(article.pubDate).toLocaleDateString()}</small>
                    <hr>
                `;
                newsContainer.appendChild(newsItem);
            });

            document.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", function () {
                    localStorage.setItem(this.dataset.url, "read");
                    this.classList.add("read");
                    this.classList.remove("unread");
                    this.nextElementSibling.textContent = "✅ Read";
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
            let ctfContainer = document.createElement("div");
            ctfContainer.innerHTML = "<h2>Upcoming CTFs</h2>";
            
            ctfData.forEach(event => {
                let isRead = localStorage.getItem(event.ctftime_url) ? true : false;
                
                let ctfItem = document.createElement("div");
                ctfItem.innerHTML = `
                    <h3>
                        <a href="${event.ctftime_url}" target="_blank" data-url="${event.ctftime_url}" class="${isRead ? 'read' : 'unread'}">
                            ${event.title}
                        </a>
                        <span class="status">${isRead ? '✅ Read' : '🔵 Unread'}</span>
                    </h3>
                    <p>Start: ${new Date(event.start).toLocaleString()}</p>
                    <p>End: ${new Date(event.finish).toLocaleString()}</p>
                    <hr>
                `;
                ctfContainer.appendChild(ctfItem);
            });

            newsContainer.appendChild(ctfContainer);

            document.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", function () {
                    localStorage.setItem(this.dataset.url, "read");
                    this.classList.add("read");
                    this.classList.remove("unread");
                    this.nextElementSibling.textContent = "✅ Read";
                });
            });
        } catch (error) {
            console.error("Error fetching CTFs:", error);
        }
    }

    fetchNews();
    fetchCTFs();
});
