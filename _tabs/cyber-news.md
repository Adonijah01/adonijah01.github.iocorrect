---
title: "Cybersecurity News"
icon: fas fa-newspaper
order: 3
---

<h1>Cybersecurity News & CTFs</h1>

<div style="display: flex; gap: 20px; cursor: pointer; font-size: 1.2em; padding-bottom: 10px; border-bottom: 2px solid #ccc;">
    <div id="news-tab" style="padding: 10px; border-radius: 5px; background: #007bff; color: white;">📰 Cybersecurity News</div>
    <div id="ctf-tab" style="padding: 10px; border-radius: 5px; background: #f8f9fa; color: black;">🎯 Upcoming CTFs</div>
</div>

<div id="news-feed"></div>
<div id="ctf-feed" style="display: none;"></div>

<script src="{{ '/assets/js/news-feed.js' | relative_url }}"></script>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const newsTab = document.getElementById("news-tab");
    const ctfTab = document.getElementById("ctf-tab");
    const newsFeed = document.getElementById("news-feed");
    const ctfFeed = document.getElementById("ctf-feed");

    newsTab.addEventListener("click", function () {
        newsFeed.style.display = "block";
        ctfFeed.style.display = "none";
        newsTab.style.background = "#007bff";
        newsTab.style.color = "white";
        ctfTab.style.background = "#f8f9fa";
        ctfTab.style.color = "black";
    });

    ctfTab.addEventListener("click", function () {
        newsFeed.style.display = "none";
        ctfFeed.style.display = "block";
        ctfTab.style.background = "#007bff";
        ctfTab.style.color = "white";
        newsTab.style.background = "#f8f9fa";
        newsTab.style.color = "black";
    });
});
</script>
