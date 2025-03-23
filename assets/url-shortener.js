async function shortenURL() {
    let longUrl = document.getElementById("long-url").value;
    let resultElement = document.getElementById("short-url");

    if (!longUrl) {
        resultElement.innerHTML = "<p style='color:red;'>Please enter a URL.</p>";
        return;
    }

    try {
        let response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        let shortUrl = await response.text();

        resultElement.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    } catch (error) {
        console.error("Error shortening URL:", error);
        resultElement.innerHTML = "<p style='color:red;'>Failed to shorten URL. Try again.</p>";
    }
}
