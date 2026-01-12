document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // PUBLISH & LIBRARY LOGIC
  // ===============================

  const publishForm = document.getElementById("publishForm");
  const worksContainer = document.getElementById("worksContainer");
  const filterLanguage = document.getElementById("filterLanguage");
  const filterGenre = document.getElementById("filterGenre");

  let works = JSON.parse(localStorage.getItem("kavyakoshWorks")) || [];

  function renderWorks() {
    worksContainer.innerHTML = "";

    const lang = filterLanguage.value;
    const genre = filterGenre.value;

    const filteredWorks = works.filter(work => {
      return (lang === "All" || work.language === lang) &&
             (genre === "All" || work.genre === genre);
    });

    if (filteredWorks.length === 0) {
      worksContainer.innerHTML = "<p>No works found.</p>";
      return;
    }

    filteredWorks.forEach(work => {
      const div = document.createElement("div");
      div.className = "work-card";
      div.innerHTML = `
        <h3>${work.title}</h3>
        <p><strong>Author:</strong> ${work.author}</p>
        <p><strong>Language:</strong> ${work.language}</p>
        <p><strong>Genre:</strong> ${work.genre}</p>
        <p>${work.content}</p>
      `;
      worksContainer.appendChild(div);
    });
  }

  if (publishForm) {
    publishForm.addEventListener("submit", e => {
      e.preventDefault();

      const newWork = {
        title: document.getElementById("title").value.trim(),
        author: document.getElementById("author").value.trim(),
        language: document.getElementById("language").value,
        genre: document.getElementById("genre").value,
        content: document.getElementById("content").value.trim()
      };

      works.push(newWork);
      localStorage.setItem("kavyakoshWorks", JSON.stringify(works));

      publishForm.reset();
      renderWorks();
    });
  }

  if (filterLanguage) filterLanguage.addEventListener("change", renderWorks);
  if (filterGenre) filterGenre.addEventListener("change", renderWorks);

  renderWorks();

  // ===============================
  // AI CHAT LOGIC (BLENDED)
  // ===============================

  const aiBtn = document.getElementById("aiBtn");
  const aiInput = document.getElementById("aiInput");
  const aiOutput = document.getElementById("aiOutput");

  if (aiBtn) {
    aiBtn.addEventListener("click", async () => {
      const message = aiInput.value.trim();

      if (!message) {
        aiOutput.innerText = "Please write something first.";
        return;
      }

      aiOutput.innerText = "Kavyakosh AI is thinking... ✨";

      try {
        const response = await fetch(
          "https://kavyakosh-backend.vercel.app/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          }
        );

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data = await response.json();

        if (data.reply) {
          aiOutput.innerText = data.reply;
        } else {
          aiOutput.innerText = "AI did not return a response.";
        }

      } catch (error) {
        console.error("AI Error:", error);
        aiOutput.innerText = "Network error. Please try again.";
      }
    });
  }

});
