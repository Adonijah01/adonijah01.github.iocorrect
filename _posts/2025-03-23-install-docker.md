---
title: "How to Install Docker on Windows and Linux"
date: 2025-03-23
categories: [Tutorials, DevOps]
tags: [docker, linux, windows, devops, wsl2, cloud, security]
author: "Your Name"
toc: true
comments: true
pin: false
---

Docker is a powerful tool for containerizing applications, making deployments easier and more efficient. This guide walks you through **installing Docker on Windows (WSL 2 Backend) and Linux**, including Docker Desktop for Windows.

---

## 🚀 Installing Docker on Windows (WSL 2 Backend)

### ✅ Step 1: Enable WSL 2 and Virtualization  
Before installing Docker, ensure **Windows Subsystem for Linux (WSL 2)** and **virtualization** are enabled.

```powershell
wsl --install
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2

👉 Restart your PC after running these commands.

✅ Step 2: Install Docker Desktop
Download Docker Desktop

Run the installer and ensure "Use WSL 2 instead of Hyper-V" is enabled.

Restart your PC.

Open Docker Desktop and verify installation with:

powershell
Copy
Edit
docker --version
🐧 Installing Docker on Linux
✅ Step 1: Update System Packages
Run the following command based on your Linux distribution:

Ubuntu/Debian:

bash
Copy
Edit
sudo apt update && sudo apt upgrade -y
CentOS/RHEL:

bash
Copy
Edit
sudo yum update -y
✅ Step 2: Install Required Dependencies
Ubuntu/Debian:

bash
Copy
Edit
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
CentOS/RHEL:

bash
Copy
Edit
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
✅ Step 3: Add Docker Repository
Ubuntu/Debian:

bash
Copy
Edit
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
CentOS/RHEL:

bash
Copy
Edit
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
✅ Step 4: Install Docker
Ubuntu/Debian:

bash
Copy
Edit
sudo apt install -y docker-ce docker-ce-cli containerd.io
CentOS/RHEL:

bash
Copy
Edit
sudo yum install -y docker-ce docker-ce-cli containerd.io
Arch Linux:

bash
Copy
Edit
sudo pacman -S docker
✅ Step 5: Start and Enable Docker
bash
Copy
Edit
sudo systemctl start docker
sudo systemctl enable docker
Verify installation:

bash
Copy
Edit
docker --version
Run a test container:

bash
Copy
Edit
sudo docker run hello-world
🚀 Run Docker Without sudo
bash
Copy
Edit
sudo usermod -aG docker $USER
Then log out and log back in.

📦 Install Docker Compose
For Linux:

bash
Copy
Edit
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
Verify installation:

bash
Copy
Edit
docker-compose --version
For Windows, Docker Compose is included in Docker Desktop.

🎯 Conclusion
By following these steps, you have successfully installed Docker on both Windows (WSL 2 Backend) and Linux. Now, you're ready to containerize your applications like a pro! 🚀🔥

🔗 Useful Links
Docker Official Website

Docker Documentation

Docker Hub