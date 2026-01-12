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

async function askAI() {
  const input = document.getElementById("aiInput").value;
  const output = document.getElementById("aiOutput");

  if (!input.trim()) {
    output.innerText = "Please write something.";
    return;
  }

  output.innerText = "Thinking...";

  try {
    const res = await fetch("https://kavyakosh-backend.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    output.innerText = data.reply || "No response";
  } catch {
    output.innerText = "Network error.";
  }
}
