document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("aiBtn");

  btn.addEventListener("click", async () => {
    const input = document.getElementById("aiInput");
    const output = document.getElementById("aiOutput");

    const message = input.value.trim();
    if (!message) {
      output.textContent = "Enter a prompt first.";
      return;
    }

    output.textContent = "Generating...";

    try {
      const res = await fetch(
        "https://kavyakosh-backend.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      output.textContent = data.reply || "No response";

    } catch (err) {
      console.error(err);
      output.textContent = "❌ Network error";
    }
  });
});
