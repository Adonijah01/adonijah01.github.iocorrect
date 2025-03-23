---
title: "URL Shortener"
icon: fas fa-link
order: 4
---

<h1>URL Shortener</h1>
<p>Enter a long URL to shorten it:</p>

<input type="text" id="long-url" placeholder="Enter URL here..." style="width: 80%; padding: 5px;">
<button onclick="shortenURL()">Shorten</button>

<h3>Shortened URL:</h3>
<p id="short-url"></p>

<script src="{{ '/assets/js/url-shortener.js' | relative_url }}"></script>
