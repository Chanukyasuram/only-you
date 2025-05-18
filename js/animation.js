// Animation handling for the index.html page
document.addEventListener('DOMContentLoaded', function() {
  // Load the diary animation
  const diaryAnimation = document.getElementById('diary-animation');
  const openDiaryBtn = document.getElementById('openDiary');
  const content = document.getElementById('content');
  
  // Initialize Lottie animation
  const animation = lottie.loadAnimation({
    container: diaryAnimation,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/animations/diary.json',
  });
  
  // When the animation is loaded, show the open button
  animation.addEventListener('DOMLoaded', function() {
    openDiaryBtn.classList.add('visible');
  });
  
  // Handle opening the diary
  openDiaryBtn.addEventListener('click', function() {
    // Hide the open button
    openDiaryBtn.style.display = 'none';
    
    // Play the animation
    animation.play();
    
    // When the animation completes, show the content
    animation.addEventListener('complete', function() {
      // Hide the diary animation container
      diaryAnimation.parentElement.style.display = 'none';
      
      // Show and animate in the content
      content.classList.remove('hidden');
      setTimeout(() => {
        content.classList.add('visible');
      }, 100);
    });
  });
});