const parallaxElements = document.querySelectorAll(".parallax");
let xValue = 0,
    yValue = 0,
    rotateDegree = 0;

const updateParallax = () => {
    parallaxElements.forEach((el) => {
        const speedx = parseFloat(el.dataset.speedx) || 0;
        const speedy = parseFloat(el.dataset.speedy) || 0;
        const speedz = parseFloat(el.dataset.speedz) || 0;
        const rotateSpeed = parseFloat(el.dataset.rotation) || 0;

        // Calculate zValue based on mouse position
        const isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        const zValue = (xValue * isInLeft * 0.1) * speedz;

        // Calculate scroll position
        const scrollPosition = window.scrollY;
        const translateX = scrollPosition * speedx + (-xValue * speedx);
        const translateY = scrollPosition * speedy + (yValue * speedy);

        // Apply transform
        el.style.transform = `
            perspective(2300px) 
            translateZ(${zValue}px) 
            translateX(calc(-50% + ${translateX}px)) 
            translateY(calc(-50% + ${translateY}px))
        `;
    });
};

// Mousemove event for parallax effect
window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    updateParallax();
});

// Scroll event for parallax effect
window.addEventListener('scroll', () => {
    updateParallax();
});