// Add a blur effect to the entire page
document.body.style.filter = 'blur(5px)';
document.body.style.pointerEvents = 'none'; // Prevent clicks on the blurred content
document.body.style.transition = 'filter 0.5s ease';

// Create the overlay
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Darker background for better contrast
overlay.style.display = 'flex';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.zIndex = '9999'; // Ensure it appears above everything else
overlay.style.pointerEvents = 'auto'; // Allow clicks on the overlay

// Create a container for the buttons
const buttonContainer = document.createElement('div');
buttonContainer.style.textAlign = 'center';
buttonContainer.style.color = 'white';
buttonContainer.style.position = 'absolute'; // Position relative to the overlay
buttonContainer.style.zIndex = '10000'; // Higher than the overlay

// Add the question
const question = document.createElement('h1');
question.innerText = "What do you choose to do:";
question.style.fontFamily = 'Georgia, serif';
question.style.marginBottom = '20px';
buttonContainer.appendChild(question);

// Create the "Be Lazy" button
const beLazyButton = document.createElement('button');
beLazyButton.innerText = "Be Lazy 😜";
beLazyButton.style.padding = '15px 30px';
beLazyButton.style.margin = '10px';
beLazyButton.style.fontSize = '18px';
beLazyButton.style.cursor = 'pointer';
beLazyButton.style.backgroundColor = '#ff4747';
beLazyButton.style.border = 'none';
beLazyButton.style.borderRadius = '5px';
beLazyButton.style.color = 'white';
beLazyButton.style.transition = 'background-color 0.3s ease';
beLazyButton.onmouseover = () => beLazyButton.style.backgroundColor = '#ff7070';
beLazyButton.onmouseleave = () => beLazyButton.style.backgroundColor = '#ff4747';

// Create the "Study" button
const studyButton = document.createElement('button');
studyButton.innerText = "Study";
studyButton.style.padding = '15px 30px';
studyButton.style.margin = '10px';
studyButton.style.fontSize = '18px';
studyButton.style.cursor = 'pointer';
studyButton.style.backgroundColor = '#47ff47';
studyButton.style.border = 'none';
studyButton.style.borderRadius = '5px';
studyButton.style.color = 'white';
studyButton.style.transition = 'background-color 0.3s ease';
studyButton.onmouseover = () => studyButton.style.backgroundColor = '#70ff70';
studyButton.onmouseleave = () => studyButton.style.backgroundColor = '#47ff47';

// Append buttons to the container
buttonContainer.appendChild(beLazyButton);
buttonContainer.appendChild(studyButton);

// Add the button container to the overlay
overlay.appendChild(buttonContainer);

// Append the overlay to the body
document.body.appendChild(overlay);

// Add click event listeners
beLazyButton.addEventListener('click', () => {
    // Remove blur and overlay
    document.body.style.filter = 'none';
    document.body.style.pointerEvents = 'auto'; // Restore clicks on the body
    document.body.removeChild(overlay);
});

studyButton.addEventListener('click', () => {
    // Show the Pomodoro timer overlay and prevent access until timer finishes
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.remove();
        showPomodoroTimer();
    }, 500);
});

// Function to show the Pomodoro timer
function showPomodoroTimer() {
    // Pomodoro timer setup
    const pomodoroOverlay = document.createElement('div');
    pomodoroOverlay.style.position = 'fixed';
    pomodoroOverlay.style.top = '0';
    pomodoroOverlay.style.left = '0';
    pomodoroOverlay.style.width = '100%';
    pomodoroOverlay.style.height = '100%';
    pomodoroOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    pomodoroOverlay.style.color = 'white';
    pomodoroOverlay.style.display = 'flex';
    pomodoroOverlay.style.flexDirection = 'column';
    pomodoroOverlay.style.justifyContent = 'center';
    pomodoroOverlay.style.alignItems = 'center';
    pomodoroOverlay.style.zIndex = '9999';

    const timerHeading = document.createElement('h1');
    timerHeading.innerText = "Pomodoro Timer";
    timerHeading.style.fontFamily = 'Georgia, serif';
    pomodoroOverlay.appendChild(timerHeading);

    const timeDisplay = document.createElement('h2');
    timeDisplay.innerText = "25:00"; // Default 25 minutes
    timeDisplay.style.fontSize = '48px';
    pomodoroOverlay.appendChild(timeDisplay);

    // Append the Pomodoro overlay to the body
    document.body.appendChild(pomodoroOverlay);

    // Add Pomodoro timer functionality (basic for now)
    let time = 25 * 60;
    const timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeDisplay.innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        time--;
        
        if (time < 0) {
            clearInterval(timer);
            pomodoroOverlay.remove(); // Remove overlay once the timer finishes
            document.body.style.filter = 'none'; // Remove the blur and restore access
            document.body.style.pointerEvents = 'auto'; // Restore clicks on the body
        }
    }, 1000);
}
