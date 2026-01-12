async function askAI() {
  const input = document.getElementById("aiInput");
  const output = document.getElementById("aiOutput");

  const message = input.value.trim();

  if (!message) {
    output.innerText = "Please enter a prompt.";
    return;
  }

  output.innerText = "Generating...";

  try {
    const res = await fetch(
      "https://kavyakosh-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      }
    );

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text);
    }

    const data = JSON.parse(text);
    output.innerText = data.reply || "No response";

  } catch (err) {
    console.error(err);
    output.innerText =
      "❌ Network error.\n\n" +
      "Open DevTools → Console → copy error.";
  }
}
