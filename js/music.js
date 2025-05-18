// Background music handling for all pages
document.addEventListener('DOMContentLoaded', function() {
  const music = document.getElementById('backgroundMusic');
  const toggleButton = document.getElementById('toggleAudio');
  let isMuted = true;
  
  // Update button appearance based on muted state
  function updateButtonState() {
    if (isMuted) {
      toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
      toggleButton.parentElement.classList.add('muted');
    } else {
      toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>`;
      toggleButton.parentElement.classList.remove('muted');
    }
  }
  
  // Toggle the music
  function toggleMusic() {
    if (isMuted) {
      music.volume = 0.5; // Set a comfortable volume level
      music.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
      isMuted = false;
    } else {
      music.pause();
      isMuted = true;
    }
    updateButtonState();
  }
  
  // Add click event listener to the toggle button
  toggleButton.addEventListener('click', toggleMusic);
  
  // Load the audio file
  music.load();
  
  // Initial button state
  updateButtonState();
});