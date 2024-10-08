import * as THREE from "three";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5); // Adjusted position to look down at the floor
camera.lookAt(0, 0, 0); // Look at the origin

// Ambient light and directional light
const light = new THREE.AmbientLight(0x404040, 1.0); // Soft ambient light
scene.add(light);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.0); // Directional light
sunLight.position.set(0, 5, 10); // Position the light to illuminate the scene
scene.add(sunLight);

// Cube geometry (just to visualize something else in the scene)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "blue" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5; // Raise the cube a bit above the floor
scene.add(cube);

// Create the floor plane
let floorTexture = new THREE.TextureLoader().load('img/floor.jpg');
let planeGeometry = new THREE.PlaneGeometry(100, 100);
let planeMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal (XZ plane)
floorPlane.position.y = 0; // Set y-position
scene.add(floorPlane);

// Add keydown event listener for camera movement
document.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event) {
    let keycode = event.which;
    // Right arrow key
    if (keycode === 39) {
        camera.translateX(-0.05);
    }
    // Left arrow key
    else if (keycode === 37) {
        camera.translateX(0.05);
    }
    // Up arrow key
    else if (keycode === 40) {
        camera.translateY(-0.05);
    }
    // Down arrow key
    else if (keycode === 38) {
        camera.translateY(0.05);
    }
}

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

// Animation loop for rendering
function animate() {
    requestAnimationFrame(animate);

    // Render the scene
    renderer.render(scene, camera);
}

animate(); // Start the animation loop
