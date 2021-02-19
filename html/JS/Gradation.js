const COROLS = [{
        r: 45,
        g: 74,
        b: 227
    }, //blue
    {
        r: 250,
        g: 255,
        b: 89
    }, //yellow
    {
        r: 255,
        g: 104,
        b: 248
    }, //purple
    {
        r: 44,
        g: 209,
        b: 252
    }, //skyblue
    {
        r: 54,
        g: 233,
        b: 84
    }, //green
];

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 1;
        this.particles = [];
        this.maxRadius = 90;
        this.minRadiis = 40;

        window.addEventListener('resize', this.resize.bond(this), false);
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.createParticles();
    }
    createParticles() {
        let curColor = 0;
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {

        }
    }
    animate() {

    }
}

window.onload = () => {
    new App();
}