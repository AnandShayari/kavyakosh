* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8f9fb;
  color: #222;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background: #111;
  color: #fff;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

header h1 {
  font-family: 'Playfair Display', serif;
}

nav a {
  color: #fff;
  margin-left: 20px;
  text-decoration: none;
}

section {
  padding: 100px 40px;
}

.hero {
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6));
  color: white;
  display: flex;
  align-items: center;
}

.hero h2 {
  font-size: 48px;
  font-family: 'Playfair Display', serif;
}

.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background: #fff;
  color: #000;
  text-decoration: none;
  border-radius: 6px;
}

#publishForm input,
#publishForm select,
#publishForm textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
}

#publishForm button {
  background: #111;
  color: white;
  padding: 12px 25px;
  border: none;
  cursor: pointer;
}

#worksContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  gap: 20px;
}

.work-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

#ai-chat {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 8px 25px rgba(0,0,0,.1);
}

#ai-chat textarea {
  width: 100%;
  padding: 14px;
  margin-bottom: 15px;
}

#ai-chat button {
  background: #4b2e83;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

#aiOutput {
  margin-top: 20px;
  background: #f4f3f1;
  padding: 15px;
  border-radius: 8px;
}

footer {
  background: #111;
  color: #ccc;
  text-align: center;
  padding: 20px;
}
