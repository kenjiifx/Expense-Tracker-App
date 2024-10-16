// background.js

// Listen for tab updates to check if the URL is in the blocked list
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Retrieve the blocked websites from localStorage
    chrome.storage.local.get('blockedWebsites', (data) => {
        const blockedWebsites = data.blockedWebsites || [];

        // Check if the tab's URL is included in the blocked websites
        if (changeInfo.status === 'complete' && blockedWebsites.some(url => tab.url.includes(url))) {
            // Execute the content script to apply the blur and display the overlay
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            });
        }
    });
});
