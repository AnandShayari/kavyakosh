// Smooth text animation on load
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".hero-content h1");
  title.style.letterSpacing = "2px";
});

// Button demo interaction
document.querySelector(".primary-btn").addEventListener("click", () => {
  alert("✍️ Writing experience coming soon!");
});
