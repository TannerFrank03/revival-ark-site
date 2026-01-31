(function () {
  const links = document.querySelectorAll(".nav-links a");
  const current = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("#")[0];
    const page = href.split("/").pop();
    if (page === current) a.classList.add("active");
    if (current === "index.html" && href === "index.html") a.classList.add("active");
  });
})();
