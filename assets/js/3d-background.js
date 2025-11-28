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
        this.renderer.domElement.style.zIndex = '-9999'; // Very low z-index
        this.renderer.domElement.style.pointerEvents = 'none';
        this.renderer.domElement.style.opacity = '0.3';
        
        // Add to body but ensure it's behind everything
        document.body.insertBefore(this.renderer.domElement, document.body.firstChild);
        
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
        
        // Education-themed subtle colors
        const colorPalette = [
            new THREE.Color(0x3a86ff), // Learning blue
            new THREE.Color(0x6366f1), // Wisdom indigo
            new THREE.Color(0x8b5cf6), // Knowledge purple
        ];
        
        // Only 200 particles (even fewer)
        for (let i = 0; i < 200; i++) {
            const radius = 120 + Math.random() * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            vertices.push(x, y, z);
            
            const color = colorPalette[i % 3];
            colors.push(color.r * 0.6, color.g * 0.6, color.b * 0.6);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.NormalBlending,
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
        this.mouseX = (event.clientX - window.innerWidth / 2) * 0.00005;
        this.mouseY = (event.clientY - window.innerHeight / 2) * 0.00005;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.particles) {
            this.particles.rotation.x += 0.0002;
            this.particles.rotation.y += 0.0003;
            
            this.particles.rotation.x += this.mouseY * 0.2;
            this.particles.rotation.y += this.mouseX * 0.2;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize with better checks
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile && !prefersReducedMotion) {
        // Wait for page to load completely
        window.addEventListener('load', function() {
            setTimeout(() => {
                try {
                    new ThreeJSBackground();
                } catch (error) {
                    console.log('3JS Background disabled due to performance considerations');
                }
            }, 500);
        });
    }
});