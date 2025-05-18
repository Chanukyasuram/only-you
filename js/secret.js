// Main script for secret.html page
document.addEventListener('DOMContentLoaded', function() {
  const letterCard = document.getElementById('letterCard');
  const starsCard = document.getElementById('starsCard');
  const puzzleCard = document.getElementById('puzzleCard');
  
  const letterSection = document.getElementById('letterSection');
  const starsSection = document.getElementById('starsSection');
  const puzzleSection = document.getElementById('puzzleSection');
  
  const backButtons = document.querySelectorAll('.back-btn');
  
  // Function to show a section
  function showSection(section) {
    // Hide all sections first
    letterSection.classList.add('hidden');
    starsSection.classList.add('hidden');
    puzzleSection.classList.add('hidden');
    
    // Remove active class
    letterSection.classList.remove('active');
    starsSection.classList.remove('active');
    puzzleSection.classList.remove('active');
    
    // Show the selected section
    section.classList.remove('hidden');
    
    // Add active class with a slight delay for animation
    setTimeout(() => {
      section.classList.add('active');
    }, 10);
  }
  
  // Event listeners for cards
  letterCard.addEventListener('click', function() {
    showSection(letterSection);
  });
  
  starsCard.addEventListener('click', function() {
    showSection(starsSection);
    // Initialize stars if not already done
    if (typeof initializeStars === 'function' && !starsInitialized) {
      initializeStars();
    }
  });
  
  puzzleCard.addEventListener('click', function() {
    showSection(puzzleSection);
    // Initialize puzzle if not already done
    if (typeof initializePuzzle === 'function' && !puzzleInitialized) {
      initializePuzzle();
    }
  });
  
  // Event listeners for back buttons
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = this.parentElement;
      section.classList.remove('active');
      
      // Hide the section after animation completes
      setTimeout(() => {
        section.classList.add('hidden');
      }, 500);
    });
  });
});