
function init(){
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x444444, 0.18);
    scene.physicallyCorrectLights = true;
    
    var sphere = getSphere(1);
    sphere.name = 'ball';
    var pointLight = getPointLight(2);

    pointLight.position.y = 5.5;


    sphere.position.y = 0;
    sphere.position.z = 0;
    sphere.position.x = 0;
      scene.add(sphere);

    scene.add(pointLight);

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    camera.position.z = 0;
    camera.position.y = 3;
    camera.position.x = 2;
    camera.lookAt(new THREE.Vector3(0,0,0,0));
    var renderer = new THREE.WebGLRenderer(
        {
        antialias: true
        }
    );

    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x444444);
    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera);
    
    return scene;
}

function getBox(w,h,d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshStandardMaterial({
        color: 0xcccccc
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );
        mesh.castShadow = true;
    return mesh;
}

function getSphere(r){
    var geometry = new THREE.SphereGeometry(r, 32, 32);
    var loader = new THREE.TextureLoader();

    var material = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.9
    });

    material.map = loader.load('baseball.jpg');
    material.bumpMap = loader.load('baseball.jpg');
    material.bumpScale = 0.002;
    
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    
    return mesh;
}

function getPlane(w,l){
    var geometry = new THREE.PlaneGeometry(w,l);
    var material = new THREE.MeshStandardMaterial({
        color: 0x777777,
        side: THREE.DoubleSide
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    return mesh;
}

function update(renderer, scene, camera){
    scene.getObjectByName('ball').rotation.y += 0.005;
    scene.getObjectByName('ball').rotation.x += 0.005;
    renderer.render(
        scene,
        camera
    );
    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    });
}

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}

function getSpotLight(intensity){
    var light = new THREE.SpotLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}

var scene = init();