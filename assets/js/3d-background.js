// 3JS Animated Background
class ThreeJSBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.animate();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 50;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0); // Transparent background
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '-1';
        this.renderer.domElement.style.pointerEvents = 'none';
        
        document.body.appendChild(this.renderer.domElement);
        
        // Create particles
        this.createParticles();
        
        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        // Education-themed colors: soft blues, greens, and purples
        const colorPalette = [
            new THREE.Color(0x3a86ff), // Primary blue
            new THREE.Color(0x8338ec), // Secondary purple
            new THREE.Color(0x06d6a0), // Education green
            new THREE.Color(0x118ab2), // Learning blue
            new THREE.Color(0xffd166)  // Wisdom gold
        ];
        
        // Create 1500 particles
        for (let i = 0; i < 1500; i++) {
            // Random position in a sphere
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;
            
            vertices.push(x, y, z);
            
            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
        this.mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.particles) {
            // Gentle rotation
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
            
            // Mouse interaction
            this.particles.rotation.x += this.mouseY;
            this.particles.rotation.y += this.mouseX;
            
            // Pulsating effect
            const time = Date.now() * 0.001;
            this.particles.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on non-mobile devices for better performance
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        new ThreeJSBackground();
    }
});