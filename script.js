const stage = document.getElementById("stage");

// IMPORTANT: Put your exact filenames here from the Lilly folder.
// Keep uppercase/lowercase and punctuation exactly the same.
const lillyImages = [
  "Lilly/lilly-001.jpg",
  "Lilly/lilly-002.jpg",
  "Lilly/lilly-003.jpg",
  "Lilly/lilly-004.jpg",
  "Lilly/lilly-005.jpg",
  "Lilly/lilly-006.jpg",
  "Lilly/lilly-007.jpg",
  "Lilly/lilly-008.jpg",
  "Lilly/lilly-009.jpg",
  "Lilly/lilly-010.jpg",
  "Lilly/lilly-011.jpg",
  "Lilly/lilly-012.jpg",
  "Lilly/lilly-013.jpg",
  "Lilly/lilly-014.jpg",
  "Lilly/lilly-015.jpg",
  "Lilly/lilly-016.jpg",
  "Lilly/lilly-017.jpg",
  "Lilly/lilly-018.jpg",
  "Lilly/lilly-019.jpg",
  "Lilly/lilly-020.jpg",
  "Lilly/lilly-021.jpg",
  "Lilly/lilly-022.jpg",
  "Lilly/lilly-023.jpg",
  "Lilly/lilly-024.jpg",
  "Lilly/lilly-025.jpg",
  "Lilly/lilly-026.jpg",
  "Lilly/lilly-027.jpg",
  "Lilly/lilly-028.jpg",
  "Lilly/lilly-046.jpg",
  "Lilly/lilly-047.jpg",
  "Lilly/lilly-048.jpg",
  "Lilly/lilly-049.jpg",
  "Lilly/lilly-050.jpg",
  "Lilly/lilly-051.jpg",
  "Lilly/lilly-052.jpg",
  "Lilly/lilly-053.jpeg",
  "Lilly/lilly-054.jpeg",
  "Lilly/lilly-055.jpg",
  "Lilly/lilly-056.jpg",
  "Lilly/lilly-057.jpg",
  "Lilly/lilly-058.jpg",
  "Lilly/lilly-059.jpg",
  "Lilly/lilly-060.jpg",
  "Lilly/lilly-061.jpg",
  "Lilly/lilly-062.jpg",
  "Lilly/lilly-063.jpg",
  "Lilly/lilly-064.jpg",
  "Lilly/lilly-065.jpg",
  "Lilly/lilly-066.jpg",
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function normalizeImagePath(path) {
  // Encode spaces/parentheses so unusual filenames still load correctly.
  return encodeURI(path);
}

function addPhoto(images, x, y) {
  const img = document.createElement("img");
  img.src = normalizeImagePath(pickRandom(images));
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
  const images = lillyImages;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  addPhoto(images, centerX, centerY);

  window.addEventListener("click", (event) => {
    addPhoto(images, event.clientX, event.clientY);
  });
}

start();
