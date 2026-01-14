/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BASE */
body {
  font-family: 'Inter', sans-serif;
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

/* HERO */
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
}

/* VIDEO */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0,0,0,0.65),
    rgba(0,0,0,0.85)
  );
}

/* CONTENT */
.hero-content {
  position: absolute;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  max-width: 520px;
}

.hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 64px;
  line-height: 1.1;
  margin-bottom: 20px;
  animation: fadeUp 1.2s ease forwards;
}

.hero-content p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
  animation: fadeUp 1.6s ease forwards;
}

/* BUTTONS */
.primary-btn,
.secondary-btn {
  padding: 14px 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.primary-btn {
  background: #fff;
  color: #000;
}

.secondary-btn {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.5);
}

/* GLASS CARD */
.glass-card {
  position: absolute;
  right: 6%;
  bottom: 12%;
  width: 320px;
  padding: 25px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(18px);
  border-radius: 18px;
  z-index: 2;
  animation: fadeUp 2s ease forwards;
}

.glass-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  margin-bottom: 10px;
}

.glass-card p {
  font-size: 14px;
  opacity: 0.85;
  margin-bottom: 15px;
}

/* STATS */
.stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 40px 0;
  background: #111;
}

.stats div {
  text-align: center;
}

.stats strong {
  font-size: 26px;
  display: block;
}

.stats span {
  font-size: 14px;
  opacity: 0.7;
}

/* ANIMATION */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .hero-content {
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 0 20px;
  }

  .hero-content h1 {
    font-size: 38px;
  }

  .glass-card {
    display: none;
  }

  .stats {
    flex-direction: column;
    gap: 25px;
  }
}
