(() => {
    const config = {
        //this.rad
        dotMinRad: 6,
        //MaxRad  
        dotMaxRad: 20,
        sphereRad: 350,
        bigDotRad: 35,
        mouseSize: 120,
        massFactor: 0.002,
        //red 마우스 커서  
        defColor: `rgba(255, 20, 147,1)`,

        smooth: 0.85,
    }

    const TWO_PI = 2 * Math.PI;
    //canvas 기법 
    const canvas = document.querySelector(`canvas`);
    //2d 활용예제
    const ctx = canvas.getContext(`2d`);

    let w, h, mouse, dots;

    class Dot {
        constructor(r) {
            this.pos = {
                x: mouse.x,
                y: mouse.y
            }
            this.vel = {
                x: 0,
                y: 0
            }
            this.rad = r || random(config.dotMinRad, config.dotMaxRad);
            this.mass = this.rad * config.massFactor;
            this.color = config.defColor;
        }

        draw(x, y) {
            //Pos 마우스 움직이는 x  
            this.pos.x = x || this.pos.x + this.vel.x;
            //Pos 마우스 움직이는 y 
            this.pos.y = y || this.pos.y + this.vel.y;
            createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
            createCircle(this.pos.x, this.pos.y, this.rad, false, config.defColor);
        }
    }

    function updateDots() {
        for (let i = 1; i < dots.length; i++) {
            let acc = {
                x: 0,
                y: 0
            }

            for (let j = 0; j < dots.length; j++) {
                if (i == j) continue;
                let [a, b] = [dots[i], dots[j]];

                let delta = {
                    x: b.pos.x - a.pos.x,
                    y: b.pos.y - a.pos.y
                }
                let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1;
                let force = (dist - config.sphereRad) / dist * b.mass;

                if (j == 0) {
                    let alpha = config.mouseSize / dist;
                    //색깔지정 deeppink
                    a.color = `rgba(255, 20, 147, ${alpha})`;

                    dist < config.mouseSize ? force = (dist - config.mouseSize) * b.mass : force = a.mass;
                }

                acc.x += delta.x * force;
                acc.y += delta.y * force;
            }

            dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;
            dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
        }

        dots.map(e => e == dots[0] ? e.draw(mouse.x, mouse.y) : e.draw());
    }

    function createCircle(x, y, rad, fill, color) {
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, TWO_PI);
        ctx.closePath();
        fill ? ctx.fill() : ctx.stroke();
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function init() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;

        mouse = {
            x: w / 2,
            y: h / 2,
            down: false
        }
        dots = [];

        dots.push(new Dot(config.bigDotRad));
    }

    function loop() {
        ctx.clearRect(0, 0, w, h);

        if (mouse.down) {
            dots.push(new Dot());
        }
        updateDots();
        //비동기함수 Canvans 기법
        //CSS의 transition으로 처리하기 어려운 애니메이션
        window.requestAnimationFrame(loop);
    }

    init();
    loop();

    function setPos({
        layerX,
        layerY
    }) {
        [mouse.x, mouse.y] = [layerX, layerY];
    }

    function isDown() {
        mouse.down = !mouse.down;
    }

    canvas.addEventListener(`mousemove`, setPos);
    window.addEventListener(`mousedown`, isDown);
    window.addEventListener(`mouseup`, isDown);
})();