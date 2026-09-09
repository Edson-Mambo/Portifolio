const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--delay', `${Math.min((entry.target.dataset.index || 0) * 70, 420)}ms`);
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item, index) => {
    item.dataset.index = index % 7;
    observer.observe(item);
  });
}

document.querySelectorAll('.tag').forEach((tag, index) => {
  tag.style.setProperty('--tag-delay', `${Math.min(index * 35, 280)}ms`);
});

document.querySelectorAll('.links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.links a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});
