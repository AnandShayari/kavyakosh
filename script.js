document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("publishForm");
  const worksContainer = document.getElementById("worksContainer");
  const filterLanguage = document.getElementById("filterLanguage");
  const filterGenre = document.getElementById("filterGenre");

  let works = JSON.parse(localStorage.getItem("kavyakoshWorks")) || [];

  function render() {
    worksContainer.innerHTML = "";
    const l = filterLanguage.value;
    const g = filterGenre.value;

    works.filter(w =>
      (l === "All" || w.language === l) &&
      (g === "All" || w.genre === g)
    ).forEach(w => {
      const div = document.createElement("div");
      div.className = "work-card";
      div.innerHTML = `<h3>${w.title}</h3><p>${w.author}</p><p>${w.content}</p>`;
      worksContainer.appendChild(div);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    works.push({
      title: title.value,
      author: author.value,
      language: language.value,
      genre: genre.value,
      content: content.value
    });
    localStorage.setItem("kavyakoshWorks", JSON.stringify(works));
    form.reset();
    render();
  });

  filterLanguage.onchange = render;
  filterGenre.onchange = render;
  render();
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
      mode: "cors",
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    output.innerText = data.reply;
  } catch (e) {
    output.innerText = "Network error.";
  }
}
