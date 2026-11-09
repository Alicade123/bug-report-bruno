class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 15 + 5; // Size between 5 and 20
    this.speedX = Math.random() * 3 - 1.5; // Random speed left or right
    this.speedY = Math.random() * 3 - 1.5; // Random speed up or down
    
    // Pick random colors
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  update(width, height) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Setup canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    // Create a lot of random particles
    this.particles = [];
    this.numberOfParticles = 150;

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    // Clear screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw all particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.canvas.width, this.canvas.height);
      this.particles[i].draw(this.ctx);
    }

    // Loop animation
    requestAnimationFrame(() => this.animate());
  }
}

// Start the system when the page loads
window.onload = () => {
  const system = new ParticleSystem();
  system.animate();
};
