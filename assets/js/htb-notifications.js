document.addEventListener('DOMContentLoaded', function() {
  // Check for notifications every day
  setInterval(checkNotifications, 24 * 60 * 60 * 1000);
  checkNotifications(); // Also check immediately when page loads
});

function checkNotifications() {
  const notifications = JSON.parse(localStorage.getItem('htb_notifications') || '[]');
  const currentDate = new Date().toISOString().split('T')[0];
  
  notifications.forEach((notification, index) => {
    if (currentDate >= notification.retireDate) {
      // Send notification
      if (Notification.permission === 'granted') {
        new Notification('HTB Writeup Available!', {
          body: `The writeup for "${notification.title}" is now available!`,
          icon: 'https://www.hackthebox.com/images/logo-htb.svg'
        });
      }
      
      // Remove from notifications list
      notifications.splice(index, 1);
      localStorage.setItem('htb_notifications', JSON.stringify(notifications));
    }
  });
} 