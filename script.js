const stage = document.getElementById("stage");

// Fallback list: edit these if your server does not expose directory listings.
const manualLillyImages = [
  "Lilly/1.jpg",
  "Lilly/2.jpg",
  "Lilly/3.jpg",
  "Lilly/4.jpg",
  "Lilly/5.jpg",
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function fileLooksLikeImage(path) {
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(path);
}

async function getLillyImages() {
  try {
    const response = await fetch("Lilly/");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const links = [...doc.querySelectorAll("a")].map((a) => a.getAttribute("href") || "");
    const images = links
      .filter(fileLooksLikeImage)
      .map((name) => `Lilly/${name.replace(/^\.?\//, "")}`);

    if (images.length > 0) {
      return [...new Set(images)];
    }
  } catch (error) {
    // Ignore and use fallback list.
  }

  return manualLillyImages;
}

function addPhoto(images, x, y) {
  const img = document.createElement("img");
  img.src = pickRandom(images);
  img.alt = "Lilly photo";
  img.className = "flower";

  const width = randomBetween(120, 360);
  const rotation = randomBetween(-18, 18);
  const jitterX = randomBetween(-70, 70);
  const jitterY = randomBetween(-70, 70);

  img.style.width = `${width}px`;
  img.style.left = `${Math.max(0, x + jitterX - width / 2)}px`;
  img.style.top = `${Math.max(0, y + jitterY - width / 3)}px`;
  img.style.transform = `rotate(${rotation}deg)`;
  img.style.zIndex = String(Date.now());

  stage.appendChild(img);
}

async function start() {
  const images = await getLillyImages();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  addPhoto(images, centerX, centerY);

  window.addEventListener("click", (event) => {
    addPhoto(images, event.clientX, event.clientY);
  });
}

start();
