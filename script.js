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
        if (circle) {
            circle.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(${xscale}, ${yscale})`;
        }

        timeout = setTimeout(() => {
            if (circle) {
                circle.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(1, 1)`;
            }
        }, 100);
    });
}

// Hover Image Reveal & Dynamic Rotation Effect
function imageHoverEffect() {
    document.querySelectorAll(".elem").forEach((elem) => {
        let rotate = 0;
        let diffrot = 0;

        const img = elem.querySelector("img");
        if (!img) return;

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

// Resume Modal Functionality
function initResumeModal() {
    const openBtns = document.querySelectorAll("#open-resume-btn, .open-resume-nav");
    const closeBtn = document.querySelector("#close-resume-btn");
    const modal = document.querySelector("#resume-modal");

    if (!modal) return;

    function openModal() {
        modal.classList.add("active");
        if (typeof scroll !== "undefined" && scroll) scroll.stop();
    }

    function closeModal() {
        modal.classList.remove("active");
        if (typeof scroll !== "undefined" && scroll) scroll.start();
    }

    openBtns.forEach(btn => {
        btn.addEventListener("click", openModal);
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

// Interactive Terminal Key Event Handler (called inline from HTML onkeydown)
function handleTerminalKey(event, input) {
    if (event.key === "Enter") {
        event.preventDefault();

        const body = document.querySelector("#terminal-body");
        if (!body) return;

        const val = input.value.trim().toLowerCase();
        input.value = "";

        if (val === "") return;

        const commands = {
            help: "Available commands: <span class='highlight'>about</span>, <span class='highlight'>skills</span>, <span class='highlight'>github</span>, <span class='highlight'>contact</span>, <span class='highlight'>clear</span>",
            about: "Mohammad Ismail Muddassir — Java Backend Developer & AI/ML Intern proficient in Spring Boot & REST APIs.",
            skills: "Core: Java, Spring Boot, MySQL, Python, REST APIs, Microservices, Git, Docker.",
            github: "Check out my repositories at <a href='https://github.com/Ismailgit-max' target='_blank' style='color:#8be9fd;'>github.com/Ismailgit-max</a>",
            contact: "Email: mdismail4ces@gmail.com | Location: Kalaburagi, Karnataka"
        };

        // Output user line
        const userLine = document.createElement("p");
        userLine.className = "term-line";
        userLine.innerHTML = `<span class="term-prompt">ismail@dev:~$</span> ${val}`;
        body.appendChild(userLine);

        // Process command
        if (val === "clear") {
            body.innerHTML = "";
        } else if (commands[val]) {
            const responseLine = document.createElement("p");
            responseLine.className = "term-line";
            responseLine.innerHTML = commands[val];
            body.appendChild(responseLine);
        } else {
            const errLine = document.createElement("p");
            errLine.className = "term-line";
            errLine.style.color = "#ff5555";
            errLine.textContent = `Command not recognized: '${val}'. Type 'help' for options.`;
            body.appendChild(errLine);
        }

        body.scrollTop = body.scrollHeight;
    }
}

// Initialize Terminal Focus Listener
function initTerminal() {
    const input = document.querySelector("#terminal-input");
    const container = document.querySelector(".terminal-container");

    if (container && input) {
        container.addEventListener("click", () => {
            input.focus();
        });
    }
}

// Initialize All Page Functions
document.addEventListener("DOMContentLoaded", () => {
    firstPageAnim();
    circleFollower();
    imageHoverEffect();
    initResumeModal();
    initTerminal();
});