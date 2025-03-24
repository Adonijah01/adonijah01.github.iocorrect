document.addEventListener("DOMContentLoaded", function () {
    const certContainer = document.getElementById("certifications");

    // Manually add certifications (Credly does NOT allow public API access)
    const certifications = [
        {
            name: "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
            issuer: "Microsoft",
            image: "https://images.credly.com/size/110x110/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png",
            link: "https://www.credly.com/badges/YOUR_CERT_ID"
        },
        {
            name: "AWS Certified Security – Specialty",
            issuer: "Amazon Web Services",
            image: "https://images.credly.com/size/110x110/images/ANOTHER_IMAGE_ID/image.png",
            link: "https://www.credly.com/badges/ANOTHER_CERT_ID"
        }
        // Add more certifications here
    ];

    if (certifications.length > 0) {
        certContainer.innerHTML = ""; // Clear loading text
        certifications.forEach(cert => {
            let certDiv = document.createElement("div");
            certDiv.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <img src="${cert.image}" alt="${cert.name}" style="width: 80px; height: 80px; border-radius: 8px; margin-right: 10px;">
                    <div>
                        <h4>${cert.name}</h4>
                        <p>Issued by: ${cert.issuer}</p>
                        <a href="${cert.link}" target="_blank">View Certification</a>
                    </div>
                </div>
            `;
            certContainer.appendChild(certDiv);
        });
    } else {
        certContainer.innerHTML = "<p>No certifications found.</p>";
    }
});
