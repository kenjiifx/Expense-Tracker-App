let workTime = 25 * 60;
let breakTime = 5 * 60;
let isWorkSession = true;
let intervalId = null;

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('stop-btn').addEventListener('click', stopTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('add-btn').addEventListener('click', addWebsite);

document.addEventListener('DOMContentLoaded', loadBlockedWebsites);

// Show Pomodoro timer if visiting a blocked website
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
        const blockedSites = result.blockedSites;
        blockedSites.forEach((site) => {
            if (tabs[0].url.includes(site)) {
                // Automatically show timer when on blocked site
                document.querySelector('.container').style.display = 'block';
                startTimer();
            }
        });
    });
});

function startTimer() {
    if (!intervalId) {
        intervalId = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    stopTimer();
    workTime = 25 * 60;
    updateDisplay(workTime);
}

function updateTimer() {
    let timeLeft = isWorkSession ? workTime : breakTime;
    timeLeft--;
    if (timeLeft <= 0) {
        isWorkSession = !isWorkSession;
        notifyUser(isWorkSession ? "Work Session Started" : "Break Started");
        timeLeft = isWorkSession ? workTime : breakTime;
    }
    if (isWorkSession) {
        workTime = timeLeft;
    } else {
        breakTime = timeLeft;
    }
    updateDisplay(timeLeft);
}

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function addWebsite() {
    const website = document.getElementById('add-website').value;
    if (website) {
        saveWebsite(website);
        document.getElementById('add-website').value = '';
    }
}

function saveWebsite(website) {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
        const blockedSites = result.blockedSites;
        blockedSites.push(website);
        chrome.storage.local.set({ blockedSites }, loadBlockedWebsites);
    });
}

function loadBlockedWebsites() {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
        const blockedSites = result.blockedSites;
        const list = document.getElementById('blocked-sites-list');
        list.innerHTML = '';
        blockedSites.forEach((site, index) => {
            const li = document.createElement('li');
            li.textContent = site;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => removeWebsite(index));
            li.appendChild(removeBtn);
            list.appendChild(li);
        });
    });
}

function removeWebsite(index) {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
        const blockedSites = result.blockedSites;
        blockedSites.splice(index, 1);
        chrome.storage.local.set({ blockedSites }, loadBlockedWebsites);
    });
}

function notifyUser(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Productivity Timer",
        message: message
    });
}
