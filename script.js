// Keep videos playing smoothly on mobile
document.querySelectorAll("video").forEach(video => {
  video.addEventListener("canplay", () => {
    video.play().catch(() => {});
  });
});
