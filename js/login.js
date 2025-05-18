// Login handling for the index.html page
document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('nameInput');
  const unlockBtn = document.getElementById('unlockBtn');
  const errorMessage = document.getElementById('errorMessage');
  
  // The correct name to unlock the diary
  const correctName = 'navya';
  
  // Function to check the input name
  function checkName() {
    const inputName = nameInput.value.trim().toLowerCase();
    
    if (inputName === correctName) {
      // Redirect to the secret page
      window.location.href = 'secret.html';
    } else {
      // Show error message with animation
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        errorMessage.classList.add('visible');
      }, 10);
      
      // Clear the input field
      nameInput.value = '';
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove('visible');
        setTimeout(() => {
          errorMessage.classList.add('hidden');
        }, 500);
      }, 3000);
    }
  }
  
  // Event listeners
  unlockBtn.addEventListener('click', checkName);
  
  nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      checkName();
    }
  });
});