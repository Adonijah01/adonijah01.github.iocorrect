document.addEventListener("DOMContentLoaded", function () {
    const isRetired = document.body.dataset.retired === "true";
    const retiredContent = document.getElementById("retired-content");
    const restrictedContent = document.getElementById("restricted-warning");
  
    if (isRetired) {
      retiredContent.style.display = "block";
      restrictedContent.style.display = "none";
    } else {
      retiredContent.style.display = "none";
      restrictedContent.style.display = "block";
    }
  });
  