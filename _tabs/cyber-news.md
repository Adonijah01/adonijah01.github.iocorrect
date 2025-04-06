---
title: "Cybersecurity News"
icon: fas fa-newspaper
order: 3
---

<h1>Latest Cybersecurity & Hacking News</h1>
<div id="news-feed">
  <p>Loading news...</p>
</div>

<!-- Defer the script loading to avoid blocking page rendering -->
<script src="{{ '/assets/js/news-feed.js' | relative_url }}" defer></script>

<script>
  // Check if the news data is cached in localStorage
  const cachedData = localStorage.getItem('cybersecurityNews');

  if (cachedData) {
    // If cached data exists, use it immediately
    document.getElementById('news-feed').innerHTML = cachedData;
  } else {
    // If no cached data, fetch new data and cache it
    fetch('news-feed-url')  // Replace with actual news feed API URL
      .then(response => response.json())
      .then(data => {
        const newsContent = data.news; // Adjust based on your data structure
        document.getElementById('news-feed').innerHTML = newsContent;
        // Cache the news data for future visits
        localStorage.setItem('cybersecurityNews', newsContent);
      })
      .catch(error => {
        console.error('Error fetching news feed:', error);
        document.getElementById('news-feed').innerHTML = '<p>Failed to load news. Please try again later.</p>';
      });
  }
</script>
