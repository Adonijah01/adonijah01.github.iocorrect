document.addEventListener("DOMContentLoaded", function () {
    const certContainer = document.getElementById("certifications");

    // Manually added certifications
    const certifications = [
        {
            name: "CCNA: Introduction to Networks",
            issuer: "Cisco",
            image: "https://images.credly.com/size/80x80/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png"
        },
        {
            name: "Introduction to Cybersecurity",
            issuer: "Cisco",
            image: "https://images.credly.com/size/340x340/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png"
        },
        {
            name: "CCNA: Switching, Routing, and Wireless Essentials",
            issuer: "Cisco",
            image: "https://images.credly.com/size/80x80/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png"
        },
        {
            name: "CyberOps Associate",
            issuer: "Cisco",
            image: "https://images.credly.com/size/80x80/images/53f37f83-04a1-4935-9b1e-21a99cc6e1b2/CyberOpsAssoc.png"
        },
        {
            name: "Network Security",
            issuer: "Cisco",
            image: "https://images.credly.com/size/64x64/images/f7387386-553c-4be5-b3f3-077f78152f31/Network_Security.png"
        },
        {
            name: "Foundations of Operationalizing MITRE ATT&CK",
            issuer: "MITRE",
            image: "https://images.credly.com/size/64x64/images/466bf45d-c48d-46c3-a613-fd950d1dd9f9/Foundations_of_MITRE_ATT_CK_Badge.png"
        },
        {
            name: "CCNA: Enterprise Networking, Security, and Automation",
            issuer: "Cisco",
            image: "https://images.credly.com/size/340x340/images/0a6d331e-8abf-4272-a949-33f754569a76/CCNAENSA__1_.png"
        },
        {
            name: "AWS Academy Graduate - AWS",
            issuer: "AWS",
            image: "https://images.credly.com/size/64x64/images/73e4a58b-a8ef-41a3-a7db-9183dd269882/image.png"
        },
        {
            name: "Ethical Hacker",
            issuer: "EC-Council",
            image: "https://images.credly.com/size/64x64/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png"
        }
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
                    </div>
                </div>
            `;
            certContainer.appendChild(certDiv);
        });
    } else {
        certContainer.innerHTML = "<p>No certifications found.</p>";
    }
});
