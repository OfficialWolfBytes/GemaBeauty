const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    })
})

// gallery carousel controls
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');

if (track && prevBtn && nextBtn) {
    const scrollBySlide = () => {
        const slide = track.querySelector('.slide');
        if (!slide) return 0;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        const width = slide.getBoundingClientRect().width + gap;
        return width;
    };
    prevBtn.addEventListener('click', () => {
        const amount = scrollBySlide();
        track.scrollBy({ left: -amount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        const amount = scrollBySlide();
        track.scrollBy({ left: amount, behavior: 'smooth' });
    });
    // optional: keyboard access
    prevBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') prevBtn.click(); });
    nextBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') nextBtn.click(); });
}

// review stack controls
const reviewStack = document.querySelector('.review-stack');
const prevReview = document.querySelector('.review-prev');
const nextReview = document.querySelector('.review-next');
const reviewItems = document.querySelectorAll('.review-item');
let currentReview = 0;

function updateReviewStack() {
    const total = reviewItems.length;
    reviewItems.forEach((item, idx) => {
        let diff = idx - currentReview;
        if (diff < 0) diff += total;
        if (diff === 0) item.setAttribute('data-state', 'center');
        else if (diff === 1) item.setAttribute('data-state', 'right');
        else if (diff === total - 1) item.setAttribute('data-state', 'left');
        else item.setAttribute('data-state', 'hidden');
    });
}

if (reviewStack && prevReview && nextReview && reviewItems.length) {
    updateReviewStack();
    nextReview.addEventListener('click', () => {
        currentReview = (currentReview + 1) % reviewItems.length;
        updateReviewStack();
    });
    prevReview.addEventListener('click', () => {
        currentReview = (currentReview - 1 + reviewItems.length) % reviewItems.length;
        updateReviewStack();
    });
    prevReview.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') prevReview.click(); });
    nextReview.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') nextReview.click(); });
}
