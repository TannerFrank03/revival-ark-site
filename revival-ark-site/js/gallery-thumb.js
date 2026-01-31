// js/gallery-thumbs.js
(function () {
  const images = window.GALLERY_IMAGES || [];
  const strip = document.getElementById("thumbStrip");

  const mainImg = document.getElementById("gvMainImg");
  const prevImg = document.getElementById("gvPrevImg");
  const nextImg = document.getElementById("gvNextImg");

  const prevBtn = document.querySelector(".gv-prev");
  const nextBtn = document.querySelector(".gv-next");

  if (!strip || !mainImg || images.length === 0) return;

  const basePath = "assets/images/";
  const MAX_THUMBS = 10;
  let index = 0;

  function srcFor(i) {
    const n = (i + images.length) % images.length;
    return basePath + images[n];
  }

  function renderThumbs() {
    strip.innerHTML = "";

    // ✅ only first 10 thumbnails
    images.slice(0, MAX_THUMBS).forEach((file, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb";
      btn.style.backgroundImage = `url(${basePath + file})`;
      btn.setAttribute("aria-label", `Thumbnail ${i + 1}`);
      btn.addEventListener("click", () => setIndex(i));
      strip.appendChild(btn);
    });
  }

  function highlightThumb() {
    const thumbs = strip.querySelectorAll(".thumb");
    thumbs.forEach((t, i) => t.classList.toggle("active", i === index));

    const active = thumbs[index];
    if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function updateViewer() {
    mainImg.src = srcFor(index);
    mainImg.alt = `Gallery image ${index + 1}`;

    if (prevImg) prevImg.src = srcFor(index - 1);
    if (nextImg) nextImg.src = srcFor(index + 1);

    highlightThumb();
  }

  function setIndex(i) {
    index = (i + images.length) % images.length;
    updateViewer();
  }

  prevBtn?.addEventListener("click", () => setIndex(index - 1));
  nextBtn?.addEventListener("click", () => setIndex(index + 1));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setIndex(index - 1);
    if (e.key === "ArrowRight") setIndex(index + 1);
  });

  renderThumbs();
  updateViewer();
})();
