const container = document.getElementById("photo-container");
const photos = document.querySelectorAll(".photo");

// Initialize photos in the center, stacked randomly
function initializePhotos() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  photos.forEach(photo => {
    photo.style.left = `${containerWidth / 2}px`;
    photo.style.top = `${containerHeight / 2}px`;
    photo.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10}deg)`;
  });
}

// Drag functionality
photos.forEach(photo => {
  let isDragging = false;
  let offsetX, offsetY;

  // Function to handle drag start
  function startDrag(e) {
    isDragging = true;
    photo.style.zIndex = 1000;

    if (e.type === "mousedown") {
      offsetX = e.clientX - photo.offsetLeft;
      offsetY = e.clientY - photo.offsetTop;
    } else if (e.type === "touchstart") {
      offsetX = e.touches[0].clientX - photo.offsetLeft;
      offsetY = e.touches[0].clientY - photo.offsetTop;
    }
  }

  // Function to handle dragging
  function drag(e) {
    if (isDragging) {
      let clientX, clientY;

      if (e.type === "mousemove") {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      photo.style.left = `${clientX - offsetX}px`;
      photo.style.top = `${clientY - offsetY}px`;
    }
  }

  // Function to handle drag end
  function endDrag() {
    if (isDragging) {
      isDragging = false;
      photo.style.zIndex = "";
    }
  }

  // Event listeners for mouse and touch
  photo.addEventListener("mousedown", startDrag);
  photo.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
});

// Initialize on page load
window.onload = initializePhotos;
