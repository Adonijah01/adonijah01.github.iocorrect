document.addEventListener("DOMContentLoaded", function () {
    const certContainer = document.getElementById("certifications");

    // Replace `your_credly_username` with your actual Credly username
    const credlyAPI = "https://www.credly.com/users/adonijah-kiplimo/badges.json";

    async function fetchCertifications() {
        try {
            const response = await fetch(credlyAPI);
            const data = await response.json();

            if (data.data.length > 0) {
                certContainer.innerHTML = ""; // Clear the loading text
                data.data.forEach(cert => {
                    let certDiv = document.createElement("div");
                    certDiv.innerHTML = `
                        <div style="display: flex; align-items: center; margin-bottom: 15px;">
                            <img src="${cert.badge_template.image_url}" alt="${cert.badge_template.name}" style="width: 80px; height: 80px; border-radius: 8px; margin-right: 10px;">
                            <div>
                                <h4>${cert.badge_template.name}</h4>
                                <p>Issued by: ${cert.badge_template.issuer.name}</p>
                                <a href="https://www.credly.com/badges/${cert.id}" target="_blank">View Certification</a>
                            </div>
                        </div>
                    `;
                    certContainer.appendChild(certDiv);
                });
            } else {
                certContainer.innerHTML = "<p>No certifications found.</p>";
            }
        } catch (error) {
            console.error("Error fetching certifications:", error);
            certContainer.innerHTML = "<p>Failed to load certifications. Please try again later.</p>";
        }
    }

    fetchCertifications();
});
