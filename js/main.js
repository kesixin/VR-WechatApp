import * as THREE from './libs/three.min.js'
// import * as Bmob from './libs/bmob.js'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
var startX, endX, startY, endY; 
var that;
var isVrMove = false;

/* 物体 */
var scene;
const R_BALL = 50;
var vrSphere;

export default class main {
    constructor() {
        that = this;

        scene = new THREE.Scene();
      var url ="http://oqd4wfzmy.bkt.clouddn.com//vr/pic/room2048.jpeg";
        this.drawBall(url)

        
        
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0,0,0)
        scene.add(this.camera);
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true 
        });
        this.renderer.shadowMapEnabled = true;  

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.start()

        wx.onTouchStart(function(e){
          isVrMove = false;
          if(e.touches.length > 0) {
            console.log(vrSphere.rotation.y + ":" + vrSphere.rotation.x);
            var touch = e.changedTouches[0];

            startX = touch.clientX;
            startY = touch.clientY;
            isVrMove = true
          }
        })
        wx.onTouchMove(function (e) {
          if (e.touches.length > 0) {
            var touch = e.changedTouches[0];

            endX = touch.clientX;
            endY = touch.clientY;
            var x = endX - startX;
            var y = endY - startY;

            if (isVrMove){
              var moveObject = vrSphere
              moveObject.rotation.y = moveObject.rotation.y - x * 0.003;
              moveObject.rotation.x = moveObject.rotation.x - y * 0.003;
              // 判断是否超出范围
              if (moveObject.rotation.x < -1) {
                moveObject.rotation.x = -1;
              } else if (moveObject.rotation.x > 1) {
                moveObject.rotation.x = 1;
              }
              if (moveObject.rotation.y > Math.PI * 2) {
                moveObject.rotation.y -= Math.PI * 2;
              } else if (moveObject.rotation.y < 0){
                moveObject.rotation.y += Math.PI * 2;
              }
            }
            startX = endX;
            startY = endY; 
          }
        })

        window.requestAnimationFrame(this.loop.bind(this), canvas);
    }
    start() {
    }
    drawBall(url){
      var segemnt = 32, rings = 32;
      var geometry = new THREE.SphereGeometry(R_BALL, segemnt, rings);
      // 加载纹理贴图

      var texture = new THREE.TextureLoader().load(url);
      var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
      vrSphere = new THREE.Mesh(geometry, material);
      vrSphere.name = "vrball"
      vrSphere.position.set(0,0,0)
      scene.add(vrSphere);
    }
    update() {
    }
    loop() {
        this.update()
        this.renderer.render(scene, this.camera);
        window.requestAnimationFrame(this.loop.bind(this), canvas);
    }
}

