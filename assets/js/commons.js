/* Common JS functions */

// Theme mode
document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      const currentMode = document.documentElement.getAttribute('data-mode');
      const newMode = currentMode === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-mode', newMode);
      localStorage.setItem('theme', newMode);
    });
  }
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      // Add search functionality here
    });
  }
});

// Responsive navigation
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-visible');
    });
  }
}); 