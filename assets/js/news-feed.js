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
            newsContainer.innerHTML = "";

            allNews.slice(0, 10).forEach(article => {
                let newsItem = document.createElement("div");
                let readStatus = localStorage.getItem(article.link) ? "read" : "unread";
                
                newsItem.innerHTML = `
                    <h3 class="${readStatus}">
                        <a href="${article.link}" target="_blank" data-url="${article.link}">${article.title}</a>
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
                    this.parentElement.classList.add("read");
                    this.parentElement.classList.remove("unread");
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
                let ctfItem = document.createElement("div");
                let ctfStatus = localStorage.getItem(event.ctftime_url) ? "read" : "unread";

                ctfItem.innerHTML = `
                    <h3 class="${ctfStatus}">
                        <a href="${event.ctftime_url}" target="_blank" data-url="${event.ctftime_url}">${event.title}</a>
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
                    this.parentElement.classList.add("read");
                    this.parentElement.classList.remove("unread");
                });
            });
        } catch (error) {
            console.error("Error fetching CTFs:", error);
        }
    }

    fetchNews();
    fetchCTFs();
});
