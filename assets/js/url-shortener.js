async function shortenURL() {
    let longUrl = document.getElementById("long-url").value;
    let resultElement = document.getElementById("short-url");

    if (!longUrl) {
        resultElement.innerHTML = "<p style='color:red;'>ERROR: No URL entered.</p>";
        return;
    }

    try {
        let response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        let shortUrl = await response.text();

        typeText(resultElement, `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`);
    } catch (error) {
        console.error("Error shortening URL:", error);
        resultElement.innerHTML = "<p style='color:red;'>SYSTEM FAILURE: Try Again.</p>";
    }
}

function typeText(element, text, speed = 50) {
    element.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}
