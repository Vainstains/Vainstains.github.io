/* Add some basic particles to the background. they should be behind all other elements. */

let particles = [];
let particleCount = 100;
let particleSize = 2;
let particleColor = '#ff0000';

function start() {
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        let sz = Math.random();
        particle.style.backgroundColor = "rgba(255,255,255,"+(0.9/(sz+2))*(sz*sz)*0.5+")";
        particle.style.width = particleSize + sz*3 + 'px';
        particle.style.height = particleSize + sz*3 + 'px';
        particle.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            direction: {
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1
            }
        });
    }
}
let time = Date.now();
let mx = 0, my = 0;
document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
});
function update() {
    let now = Date.now();
    let dt = now - time;
    time = now;
    dt /= 1000;
    for (let i = 0; i < particleCount; i++) {
        particles[i].x += particles[i].direction.x * dt * 15;
        particles[i].y += particles[i].direction.y * dt * 15;
        if (particles[i].x < 0) {
            particles[i].x += window.innerWidth;
        }
        if (particles[i].x > window.innerWidth) {
            particles[i].x -= window.innerWidth;
        }
        if (particles[i].y < 0) {
            particles[i].y += window.innerHeight;
        }
        if (particles[i].y > window.innerHeight) {
            particles[i].y -= window.innerHeight;
        }
        let dst = Math.sqrt(Math.pow(particles[i].x - mx, 2) + Math.pow(particles[i].y - my, 2));
        if (dst < 100) {
            particles[i].direction.x -= (mx - particles[i].x) / Math.pow(dst+0.01, 2) * dt * 900;
            particles[i].direction.y -= (my - particles[i].y) / Math.pow(dst+0.01, 2) * dt * 900;
        }
        let speed = Math.sqrt(Math.pow(particles[i].direction.x, 2) + Math.pow(particles[i].direction.y, 2));
        if (speed > 1) {
            particles[i].direction.x /= 1+dt;
            particles[i].direction.y /= 1+dt;
        }
        particles[i].element.style.left = particles[i].x + 'px';
        particles[i].element.style.top = particles[i].y + 'px';
    }
    requestAnimationFrame(update);
}
window.addEventListener('load', function () {
    start();
    update();
});