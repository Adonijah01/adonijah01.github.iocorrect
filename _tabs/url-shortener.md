---
title: "URL Shortener"
icon: fas fa-terminal
order: 4
---

<style>
  body {
    background-color: black;
    color: #00ff00;
    font-family: "Courier New", monospace;
    text-align: center;
  }

  h1 {
    text-transform: uppercase;
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
  }

  #long-url {
    background-color: black;
    border: 1px solid #00ff00;
    color: #00ff00;
    padding: 10px;
    width: 80%;
    font-size: 16px;
  }

  button {
    background: #00ff00;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 0 5px #00ff00;
    transition: 0.3s;
  }

  button:hover {
    background: black;
    color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
  }

  #short-url a {
    color: #00ff00;
    font-weight: bold;
    text-decoration: none;
    text-shadow: 0 0 5px #00ff00;
  }

  #short-url a:hover {
    text-decoration: underline;
  }

  .glitch {
    position: relative;
    display: inline-block;
    animation: glitch 1s infinite;
  }

  @keyframes glitch {
    0% { transform: translate(2px, 0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0, 0); }
  }
</style>

<h1 class="glitch">URL Shortener</h1>
<p>Enter a long URL to shorten it:</p>

<input type="text" id="long-url" placeholder="Enter URL here...">
<button onclick="shortenURL()">Shorten</button>

<h3>Shortened URL:</h3>
<p id="short-url"></p>

<script src="{{ '/assets/js/url-shortener.js' | relative_url }}"></script>
