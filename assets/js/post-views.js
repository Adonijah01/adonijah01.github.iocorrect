document.addEventListener('DOMContentLoaded', function() {
    // Function to update views count
    function updateViewsCount() {
        const viewsElement = document.querySelector('.views-count');
        if (!viewsElement) return;

        // Get the current page path
        const path = window.location.pathname;
        
        // Use GoatCounter's API to get the views count
        fetch(`https://${window.goatcounter.count_url}/api/v0/stats?path=${encodeURIComponent(path)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.stats && data.stats[0]) {
                    const views = data.stats[0].count;
                    viewsElement.textContent = `${views} views`;
                } else {
                    viewsElement.textContent = '0 views';
                }
            })
            .catch(error => {
                console.error('Error fetching views:', error);
                viewsElement.textContent = 'Error loading views';
            });
    }

    // Update views count when the page loads
    updateViewsCount();

    // Update views count every 5 minutes
    setInterval(updateViewsCount, 300000);
}); 