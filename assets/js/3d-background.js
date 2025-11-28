// 3JS Subtle Education-themed Background
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
        this.camera.position.z = 80;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '-1';
        this.renderer.domElement.style.pointerEvents = 'none';
        this.renderer.domElement.style.opacity = '0.4'; // More subtle
        
        document.body.appendChild(this.renderer.domElement);
        
        // Create subtle particles
        this.createEducationParticles();
        
        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    createEducationParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        // Education-themed subtle colors: soft blues and gentle purples
        const colorPalette = [
            new THREE.Color(0x3a86ff), // Learning blue
            new THREE.Color(0x6366f1), // Wisdom indigo
            new THREE.Color(0x8b5cf6), // Knowledge purple
            new THREE.Color(0x06d6a0), // Growth green
            new THREE.Color(0x0ea5e9)  // Clarity sky blue
        ];
        
        // Only 300 particles (reduced from 1500)
        for (let i = 0; i < 300; i++) {
            // Spread particles more evenly
            const radius = 100 + Math.random() * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            vertices.push(x, y, z);
            
            // Use softer, more consistent colors
            const color = colorPalette[i % 3]; // Use only first 3 colors for consistency
            colors.push(color.r * 0.7, color.g * 0.7, color.b * 0.7); // Dimmed colors
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 1.5, // Smaller particles
            vertexColors: true,
            transparent: true,
            opacity: 0.3, // More transparent
            blending: THREE.NormalBlending, // Less intense blending
            sizeAttenuation: true
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
        // Very subtle mouse interaction
        this.mouseX = (event.clientX - window.innerWidth / 2) * 0.0001;
        this.mouseY = (event.clientY - window.innerHeight / 2) * 0.0001;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.particles) {
            // Very slow, gentle rotation
            this.particles.rotation.x += 0.0003;
            this.particles.rotation.y += 0.0005;
            
            // Minimal mouse interaction
            this.particles.rotation.x += this.mouseY * 0.3;
            this.particles.rotation.y += this.mouseX * 0.3;
            
            // Remove pulsing effect for more stability
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    // Clean up method
    destroy() {
        if (this.renderer && this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
    }
}

// Initialize with performance check
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only initialize on non-mobile devices and if user doesn't prefer reduced motion
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !prefersReducedMotion) {
        setTimeout(() => {
            new ThreeJSBackground();
        }, 1000); // Delay start for better page load
    }
});