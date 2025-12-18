const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let particles = [];
const QUANTITY = 150;

function windowResizeHandler() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", windowResizeHandler);

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createParticles() {
    particles = [];

    for (let i = 0; i < QUANTITY; i++) {
        particles.push({
            x: mouseX,
            y: mouseY,
            size: Math.random() * 2 + 1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        p.x += (mouseX - p.x) * 0.05;
        p.y += (mouseY - p.y) * 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    requestAnimationFrame(animateParticles);
}

windowResizeHandler();
createParticles();
animateParticles();
