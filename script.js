document.addEventListener("click", (e) => {
  const link = e.target.closest("nav a");
  if (!link) return;

  // Let modifier-clicks (new tab, etc.) behave normally
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

  // Already at the top? Nothing to do.
  if (window.scrollY === 0) return;

  e.preventDefault();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  const go = () => { window.location.href = link.href; };

  if ("onscrollend" in window) {
    window.addEventListener("scrollend", go, { once: true });
  } else {
    setTimeout(go, 400);
  }
});