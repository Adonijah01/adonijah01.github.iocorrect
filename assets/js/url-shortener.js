async function shortenURL() {
    let longUrl = document.getElementById("long-url").value;
    let resultElement = document.getElementById("short-url");

    if (!longUrl) {
        resultElement.innerHTML = "<p style='color:red;'>ERROR: No URL Entered.</p>";
        return;
    }

    try {
        let response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        let shortUrl = await response.text();

        // Ensure HTML rendering
        resultElement.innerHTML = `<a href="${shortUrl}" target="_blank" style="color: #00ff00; text-decoration: none;">${shortUrl}</a>`;
    } catch (error) {
        console.error("Error shortening URL:", error);
        resultElement.innerHTML = "<p style='color:red;'>SYSTEM FAILURE: Try Again.</p>";
    }
}
