// Puzzle functionality for secret.html page
document.addEventListener('DOMContentLoaded', function() {
  const puzzleContainer = document.getElementById('puzzleContainer');
  const puzzleMessage = document.getElementById('puzzleMessage');
  const puzzleComplete = document.getElementById('puzzleComplete');
  
  let puzzleInitialized = false;
  let completedPieces = 0;
  const totalPieces = 4; // 2x2 puzzle (easier)
  
  // Heart puzzle image URL
  const heartImageUrl = 'https://images.pexels.com/photos/894751/pexels-photo-894751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  // Initialize puzzle
  window.initializePuzzle = function() {
    if (puzzleInitialized) return;
    
    // Create puzzle pieces
    createPuzzlePieces();
    
    puzzleInitialized = true;
  };
  
  // Create puzzle pieces
  function createPuzzlePieces() {
    const pieceSize = 150; // Larger piece size
    const rowsAndCols = Math.sqrt(totalPieces);
    
    // Create puzzle pieces with random placement
    for (let i = 0; i < rowsAndCols; i++) {
      for (let j = 0; j < rowsAndCols; j++) {
        createPuzzlePiece(i, j, pieceSize, rowsAndCols);
      }
    }
  }
  
  // Create individual puzzle piece
  function createPuzzlePiece(row, col, pieceSize, rowsAndCols) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    
    // Set correct position data attributes
    piece.dataset.correctRow = row;
    piece.dataset.correctCol = col;
    
    // Calculate correct position
    const correctTop = row * pieceSize;
    const correctLeft = col * pieceSize;
    
    // Set random initial position (within constraints)
    const randomTop = Math.random() * (300 - pieceSize);
    const randomLeft = Math.random() * (300 - pieceSize);
    
    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.top = `${randomTop}px`;
    piece.style.left = `${randomLeft}px`;
    
    // Set background image position to show correct part of the heart
    piece.style.backgroundImage = `url(${heartImageUrl})`;
    piece.style.backgroundSize = `${pieceSize * rowsAndCols}px ${pieceSize * rowsAndCols}px`;
    piece.style.backgroundPosition = `-${correctLeft}px -${correctTop}px`;
    piece.style.backgroundColor = '#ffebee'; // Light pink background for visibility
    piece.style.border = '2px solid #d23669'; // Border for visibility
    
    // Make piece draggable
    piece.draggable = true;
    
    // Add event listeners for drag and drop
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);
    
    // Add click listener for mobile
    piece.addEventListener('click', function() {
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
      } else {
        // Deselect any other selected pieces
        document.querySelectorAll('.puzzle-piece.selected').forEach(p => {
          p.classList.remove('selected');
        });
        this.classList.add('selected');
      }
    });
    
    puzzleContainer.appendChild(piece);
  }
  
  // Drag start handler
  function dragStart(e) {
    this.classList.add('dragging');
    // Store the mouse offset relative to the piece
    this.dataset.offsetX = e.clientX - this.getBoundingClientRect().left;
    this.dataset.offsetY = e.clientY - this.getBoundingClientRect().top;
  }
  
  // Drag end handler
  function dragEnd(e) {
    this.classList.remove('dragging');
    
    // Calculate new position
    const containerRect = puzzleContainer.getBoundingClientRect();
    const offsetX = parseFloat(this.dataset.offsetX) || 0;
    const offsetY = parseFloat(this.dataset.offsetY) || 0;
    
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;
    
    // Keep within container bounds
    const pieceSize = parseInt(this.style.width);
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - pieceSize));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - pieceSize));
    
    this.style.left = `${newLeft}px`;
    this.style.top = `${newTop}px`;
    
    // Check if piece is in correct position
    checkPiecePosition(this, pieceSize);
  }
  
  // Check if a piece is in the correct position
  function checkPiecePosition(piece, pieceSize) {
    const correctRow = parseInt(piece.dataset.correctRow);
    const correctCol = parseInt(piece.dataset.correctCol);
    
    const correctTop = correctRow * pieceSize;
    const correctLeft = correctCol * pieceSize;
    
    const currentTop = parseInt(piece.style.top);
    const currentLeft = parseInt(piece.style.left);
    
    // Tolerance for positioning (makes it easier to complete)
    const tolerance = pieceSize / 3; // Increased tolerance
    
    if (
      Math.abs(currentTop - correctTop) < tolerance &&
      Math.abs(currentLeft - correctLeft) < tolerance
    ) {
      // Snap to correct position
      piece.style.top = `${correctTop}px`;
      piece.style.left = `${correctLeft}px`;
      
      // Disable dragging once in correct position
      piece.draggable = false;
      piece.classList.add('correct');
      
      // Remove event listeners
      piece.removeEventListener('dragstart', dragStart);
      piece.removeEventListener('dragend', dragEnd);
      
      // Add to completed count
      if (!piece.dataset.counted) {
        completedPieces++;
        piece.dataset.counted = 'true';
        
        // Update message as pieces are completed
        updatePuzzleMessage(completedPieces);
        
        // Check if puzzle is complete
        if (completedPieces === totalPieces) {
          puzzleComplete.classList.remove('hidden');
          puzzleMessage.classList.add('hidden');
        }
      }
    }
  }
  
  // Update message as user makes progress
  function updatePuzzleMessage(completedCount) {
    let message = "";
    
    if (completedCount === 0) {
      message = "Drag each piece to its correct position. On mobile, tap a piece to select it, then tap where you want to place it.";
    } else if (completedCount < 2) {
      message = "That's perfect! Keep going...";
    } else if (completedCount < totalPieces) {
      message = "Almost there! Just one more piece...";
    }
    
    puzzleMessage.innerHTML = `<p>${message}</p>`;
  }
  
  // Handle clicks on puzzle container (for mobile)
  puzzleContainer.addEventListener('click', function(e) {
    if (e.target === puzzleContainer) {
      // If clicking container, move any selected piece to that location
      const selectedPiece = document.querySelector('.puzzle-piece.selected');
      if (selectedPiece) {
        const containerRect = puzzleContainer.getBoundingClientRect();
        const pieceSize = parseInt(selectedPiece.style.width);
        
        let newLeft = e.clientX - containerRect.left - pieceSize / 2;
        let newTop = e.clientY - containerRect.top - pieceSize / 2;
        
        // Keep within container bounds
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - pieceSize));
        newTop = Math.max(0, Math.min(newTop, containerRect.height - pieceSize));
        
        selectedPiece.style.left = `${newLeft}px`;
        selectedPiece.style.top = `${newTop}px`;
        
        // Check if piece is in correct position
        checkPiecePosition(selectedPiece, pieceSize);
        
        // Deselect the piece
        selectedPiece.classList.remove('selected');
      }
    }
  });
  
  // Initialize puzzle when section becomes visible
  const puzzleSection = document.getElementById('puzzleSection');
  const puzzleObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        if (puzzleSection.classList.contains('active') && !puzzleInitialized) {
          initializePuzzle();
        }
      }
    });
  });
  
  puzzleObserver.observe(puzzleSection, { attributes: true });
});