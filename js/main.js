
import * as THREE from "three"
const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z=5
scene.add(camera)

const  light = new THREE.AmbientLight(0x101010,1.0)

scene.add(light)
const sunLight=new THREE.DirectionalLight(0xddddd,1.0)
sunLight.position.y=3
scene.add(sunLight)
const geometry =new THREE.BoxGeometry(1,1,1)
const material =new  THREE.MeshBasicMaterial({color:"blue"})

const cube = new THREE.Mesh(geometry,material)

scene.add(cube)


//create the floor plane
let floorTexture= new THREE.TextureLoader().load('img/floor.jpg')

let planeGeometry=new THREE.PlaneGeometry(100,100)
let planeMaterial=new THREE.MeshBasicMaterial({
    map:floorTexture,
})
let floorPlane= new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(floorPlane)


//add event listener and keys


document.addEventListener("keydown",onKeyDown,false)


function onKeyDown(event){
    let keycode=event.which;
    //right arrow key
    if(keycode===39){
        camera.translateX(-0.05)
    }
    //left arrow key
    else if (keycode===37){
        camera.translateX(0.05)
    }
    //up arrow key
    else if(keycode===38){
        camera.translateY(-0.05)
    }
    //down arrow key
    else if (keycode===40){
        camera.translateY(0.05)
    }
}



const renderer= new THREE.WebGLRenderer({antialias:true})//for smooth edge
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff,1)
document.body.appendChild(renderer.domElement)//add renderer to html
renderer.render(scene,camera)