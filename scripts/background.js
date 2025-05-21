class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.speedMultiplier = Math.random() * 0.5 + 0.2; // Random speed between 0.2 and 0.7
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(canvas) {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX * this.speedMultiplier;
        this.y += this.directionY * this.speedMultiplier;

        this.draw(canvas.getContext('2d'));
    }
}

class ParticleAnimation {
    constructor(canvasId) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = canvasId;
        document.getElementById('background-animation').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 70;
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        this.init();
    }

    init() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Create particles
        for (let i = 0; i < this.numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * (this.canvas.width - size * 2);
            const y = Math.random() * (this.canvas.height - size * 2);
            const directionX = (Math.random() - 0.5) * 1;
            const directionY = (Math.random() - 0.5) * 1;
            const color = 'rgba(45, 90, 247, 0.3)';

            this.particles.push(new Particle(x, y, directionX, directionY, size, color));
        }

        this.animate();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let particle of this.particles) {
            particle.update(this.canvas);
        }

        this.connect();
    }

    connect() {
        const maxDistance = 200;
        const mouseMaxDistance = 150;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Particle to particle connection
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(45, 90, 247, ${0.2 - distance/1000})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }

                // Mouse interaction
                if (this.mouse.x && this.mouse.y) {
                    const mdx = this.particles[i].x - this.mouse.x;
                    const mdy = this.particles[i].y - this.mouse.y;
                    const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mouseDistance < mouseMaxDistance) {
                        // Particle to mouse connection
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(45, 90, 247, ${0.3 - mouseDistance/500})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.mouse.x, this.mouse.y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }
}

// Initialize animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation('particle-canvas');
}); 