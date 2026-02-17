// Tab switching functionality
(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        // Function to show a specific tab
        function showTab(tabName) {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to selected button and content
            const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
            const selectedContent = document.getElementById(tabName);

            if (selectedButton && selectedContent) {
                selectedButton.classList.add('active');
                selectedContent.classList.add('active');
            }

            // Update URL hash without scrolling
            if (history.pushState) {
                history.pushState(null, null, '#' + tabName);
            } else {
                location.hash = '#' + tabName;
            }
        }

        // Add click event listeners to tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                showTab(tabName);
            });
        });

        // Handle initial page load with hash
        function handleInitialLoad() {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                showTab(hash);
            } else {
                showTab('about'); // Default tab
            }
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                showTab(hash);
            } else {
                showTab('about');
            }
        });

        // Initialize
        handleInitialLoad();
    });
})();
