// Letter functionality for secret.html page
document.addEventListener('DOMContentLoaded', function() {
  const letterText = document.querySelector('.letter-text');
  let letterInitialized = false;
  
  // Function to animate the letter text
  function animateLetter() {
    if (letterInitialized) return;
    
    const paragraphs = letterText.querySelectorAll('p');
    
    // Hide all paragraphs initially
    paragraphs.forEach(p => {
      p.style.opacity = '0';
      p.style.transform = 'translateY(20px)';
      p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Fade in paragraphs one by one
    paragraphs.forEach((p, index) => {
      setTimeout(() => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
      }, 300 * index);
    });
    
    letterInitialized = true;
  }
  
  // Show letter content when letter section becomes visible
  const letterSection = document.getElementById('letterSection');
  const letterObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        if (letterSection.classList.contains('active')) {
          animateLetter();
        }
      }
    });
  });
  
  letterObserver.observe(letterSection, { attributes: true });
});