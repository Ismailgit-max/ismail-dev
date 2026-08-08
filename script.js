// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    smoothMobile: false
});

// Sync GSAP with Locomotive Scroll
scroll.on("scroll", () => {
    document.querySelectorAll(".elem").forEach(elem => {
        elem.getBoundingClientRect();
    });
});

// Hero Landing Animation
function firstPageAnim() {
    const tl = gsap.timeline();

    tl.from("#nav", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut"
    })
    .to(".boundingelem", {
        y: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.15
    }, "-=0.5")
    .from("#herofooter", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut"
    }, "-=0.8");
}

// Custom Cursor & Squeeze Effect
let timeout;

function circleFollower() {
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", (e) => {
        clearTimeout(timeout);

        const xdiff = e.clientX - xprev;
        const ydiff = e.clientY - yprev;

        xscale = gsap.utils.clamp(0.8, 1.2, 1 + xdiff * 0.005);
        yscale = gsap.utils.clamp(0.8, 1.2, 1 + ydiff * 0.005);

        xprev = e.clientX;
        yprev = e.clientY;

        const circle = document.querySelector("#minicircle");
        circle.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(${xscale}, ${yscale})`;

        timeout = setTimeout(() => {
            circle.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(1, 1)`;
        }, 100);
    });
}

// Hover Image Reveal & Dynamic Rotation Effect
function imageHoverEffect() {
    document.querySelectorAll(".elem").forEach((elem) => {
        let rotate = 0;
        let diffrot = 0;

        const img = elem.querySelector("img");

        elem.addEventListener("mouseleave", () => {
            gsap.to(img, {
                opacity: 0,
                ease: "power3.out",
                duration: 0.4,
            });
        });

        elem.addEventListener("mousemove", (e) => {
            const bounds = elem.getBoundingClientRect();
            const relativeY = e.clientY - bounds.top;
            const relativeX = e.clientX - bounds.left;

            diffrot = e.clientX - rotate;
            rotate = e.clientX;

            gsap.to(img, {
                opacity: 1,
                ease: "power2.out",
                top: relativeY,
                left: relativeX,
                rotate: gsap.utils.clamp(-15, 15, diffrot * 0.4),
                duration: 0.3
            });
        });
    });
}

// Initialize All Effects
document.addEventListener("DOMContentLoaded", () => {
    firstPageAnim();
    circleFollower();
    imageHoverEffect();
});