---
title: "Cybersecurity News"
icon: fas fa-newspaper
order: 3
---

<h1 class="glitch">Latest Cybersecurity & Hacking News</h1>
<div id="news-container">
  <div id="news-feed">
    <p>Loading news...</p>
  </div>
</div>

<style>
  /* Container for the news widget */
  #news-container {
    max-width: 750px;
    margin: 20px auto;
    background: black;
    color: #00ff00;
    font-family: "Courier New", monospace;
    padding: 15px;
    border: 2px solid #00ff00;
    text-align: left;
    white-space: pre-wrap;
    max-height: 450px; /* Limit the container height */
    overflow-y: auto;  /* Enable vertical scrolling */
  }

  /* Hacker-style title */
  .glitch {
    text-transform: uppercase;
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
    text-align: center;
    margin-bottom: 10px;
  }

  /* Individual news item styling */
  .news-item {
    margin-bottom: 10px;
  }

  .news-item h3 {
    margin: 0;
  }

  .news-item a {
    color: #00ff00;
    text-decoration: none;
  }

  .news-item a:hover {
    text-decoration: underline;
  }

  .news-item p {
    margin: 5px 0;
  }
</style>

<script src="{{ '/assets/js/news-feed.js' | relative_url }}"></script>
