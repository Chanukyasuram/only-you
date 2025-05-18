// Stargazing functionality for secret.html page
document.addEventListener('DOMContentLoaded', function() {
  const nightSky = document.getElementById('nightSky');
  const starMessage = document.getElementById('starMessage');
  let starsInitialized = false;
  
  // Star messages to display
  const starMessages = [
    "I thought distance would make me forget, but you're everywhere I turn...",
    "I don't want to bother/torture, just care...",
    "Hoping you're healthy and smiling as always...",
    "Your laughter is my favorite sound in the world...",
    "In a sky full of stars, you shine the brightest...",
    "My wish is to make you as happy as ever..."
  ];
  
  // Initialize stargazing experience
  window.initializeStars = function() {
    if (starsInitialized) return;
    
    // Create background stars
    for (let i = 0; i < 200; i++) {
      createBackgroundStar();
    }
    
    // Create clickable stars
    for (let i = 0; i < starMessages.length; i++) {
      createClickableStar(i);
    }
    
    starsInitialized = true;
  };
  
  // Create a background star
  function createBackgroundStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random position
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    
    // Random size
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random opacity
    star.style.opacity = Math.random() * 0.8 + 0.2;
    
    // Add twinkle animation with random duration
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    nightSky.appendChild(star);
  }
  
  // Create a clickable star
  function createClickableStar(index) {
    const star = document.createElement('div');
    star.classList.add('clickable-star');
    
    // Distribute stars evenly but with some randomness
    const section = 100 / (starMessages.length + 1);
    const sectionStart = section * (index + 1);
    
    const top = sectionStart - 15 + Math.random() * 30;
    const left = Math.random() * 70 + 15; // Keep stars within 15-85% of width
    
    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    
    // Set size larger than background stars
    const size = Math.random() * 10 + 15;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Set data attribute for message index
    star.dataset.messageIndex = index;
    
    // Add click event
    star.addEventListener('click', function() {
      const messageIndex = parseInt(this.dataset.messageIndex);
      showStarMessage(messageIndex);
      this.style.opacity = '0.4';
      this.style.boxShadow = 'none';
      this.style.cursor = 'default';
      this.style.pointerEvents = 'none';
      
      // Check if all stars are clicked
      checkAllStarsClicked();
    });
    
    nightSky.appendChild(star);
  }
  
  // Show message when star is clicked
  function showStarMessage(index) {
    starMessage.innerHTML = `<p class="star-wish">${starMessages[index]}</p>`;
    starMessage.style.opacity = '0';
    
    // Animate the message
    setTimeout(() => {
      starMessage.style.transition = 'opacity 1s ease';
      starMessage.style.opacity = '1';
    }, 100);
  }
  
  // Check if all stars are clicked
  function checkAllStarsClicked() {
    const clickableStars = document.querySelectorAll('.clickable-star');
    const allClicked = Array.from(clickableStars).every(star => {
      return star.style.pointerEvents === 'none';
    });
    
    if (allClicked) {
      // Show final message
      setTimeout(() => {
        starMessage.innerHTML = `
          <p class="star-final">All my wishes lead to one question...</p>
          <p class="star-final-question">Will you be my guiding star, Navya?</p>
        `;
        
        // Add styling to the final message
        const finalQuestion = document.querySelector('.star-final-question');
        if (finalQuestion) {
          finalQuestion.style.fontFamily = 'var(--font-heading)';
          finalQuestion.style.fontSize = '1.8rem';
          finalQuestion.style.color = 'var(--primary-color)';
          finalQuestion.style.marginTop = '1rem';
        }
      }, 1500);
    }
  }
  
  // Initialize stars when section becomes visible
  const starsSection = document.getElementById('starsSection');
  const starsObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        if (starsSection.classList.contains('active') && !starsInitialized) {
          initializeStars();
        }
      }
    });
  });
  
  starsObserver.observe(starsSection, { attributes: true });
});