document.addEventListener("DOMContentLoaded", () => {
  const publishForm = document.getElementById("publishForm");
  const worksContainer = document.getElementById("worksContainer");
  const filterLanguage = document.getElementById("filterLanguage");
  const filterGenre = document.getElementById("filterGenre");

  let works = JSON.parse(localStorage.getItem("kavyakoshWorks")) || [];

  function renderWorks() {
    worksContainer.innerHTML = "";

    const lang = filterLanguage.value;
    const genre = filterGenre.value;

    const filtered = works.filter(w =>
      (lang === "All" || w.language === lang) &&
      (genre === "All" || w.genre === genre)
    );

    if (filtered.length === 0) {
      worksContainer.innerHTML = "<p>No works found.</p>";
      return;
    }

    filtered.forEach(w => {
      const div = document.createElement("div");
      div.className = "work-card";
      div.innerHTML = `
        <h3>${w.title}</h3>
        <p><strong>${w.author}</strong></p>
        <p>${w.content}</p>
      `;
      worksContainer.appendChild(div);
    });
  }

  publishForm.addEventListener("submit", e => {
    e.preventDefault();

    works.push({
      title: title.value,
      author: author.value,
      language: language.value,
      genre: genre.value,
      content: content.value
    });

    localStorage.setItem("kavyakoshWorks", JSON.stringify(works));
    publishForm.reset();
    renderWorks();
  });

  filterLanguage.addEventListener("change", renderWorks);
  filterGenre.addEventListener("change", renderWorks);

  renderWorks();
});

/* ===============================
   AI CHAT (MOST STABLE VERSION)
================================ */

async function askAI() {
  const inputEl = document.getElementById("aiInput");
  const outputEl = document.getElementById("aiOutput");

  const prompt = inputEl.value.trim();

  if (!prompt) {
    outputEl.innerText = "Please write something first.";
    return;
  }

  outputEl.innerText = "Thinking...";

  try {
    const response = await fetch(
      "https://kavyakosh-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: prompt })
      }
    );

    if (!response.ok) {
      throw new Error("Server responded with error");
    }

    const data = await response.json();

    if (!data.reply) {
      throw new Error("Invalid response from server");
    }

    outputEl.innerText = data.reply;

  } catch (error) {
    console.error("AI Error:", error);
    outputEl.innerText =
      "Network error. Please try again after a few seconds.";
  }
}
