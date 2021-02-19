import {
    Polygon
} from './Polygon.js';

class App {
    constructor() {
        //canvas를사용하는이유 그래픽적인 요소 그리기 사용되는 html5 의 새로운 태그*/
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        //canvas의 그리기객체(속성/메소드 지원) : 기본적으로 2d로 정의되며, 위 요소를 사용하면 canvas에 2d 좌표로 위치를 지정할 수 있게 된다.*/
        this.ctx = this.canvas.getContext("2d");
        //읽기전용 속성 현재표시장치의 물리적 픽셀과 css픽셀의 비율을 반환하다.
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1; // 2

        window.addEventListener("resize", this.resize.bind(this), false);

        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener("pointerdown", this.onDown.bind(this), false);
        document.addEventListener("pointermove", this.onMove.bind(this), false);
        document.addEventListener("pointerup", this.onUp.bind(this), false);

        //비동기함수: 화면주사율에 맞춰 1초에 60~140번 실행
        this.animate();
        // window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        console.log("resize");
        this.stageWidth = document.body.clientWidth; //border + padding + width
        this.stageHeight = document.body.clientHeight; //border + padding + height

        console.log(
            `stageWidth = ${this.stageWidth}, stageHeight = ${this.stageHeight}, pixelRatio = ${this.pixelRatio}`
        );

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        //Polygon 위치, 크기, sides 설정
        const x = this.stageWidth / 2;
        const y = this.stageHeight / 2;
        // const y = this.stageHeight + this.stageHeight / 4;//y축으로 화면 아래까지 이동 윗부분만 노출
        const radius = this.stageHeight / 2; // 제수가 작을수로 Polygon전체 크기가 커짐.
        const sides = 12;
        console.log(`x = ${x}, y = ${y}, radius=${radius}, sides=${sides}`);
        this.Polygon = new Polygon(x, y, radius, sides);
    }

    animate() {
        //console.log("animate");
        window.requestAnimationFrame(this.animate.bind(this));

        //stageWidth * stageHeight만큼 rect제거 : 다시그리기 위해 이전 drawing 제거 ★
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92; //가속도 지정
        this.Polygon.animate(this.ctx, this.moveX);
    }

    onDown(e) {
        console.log("onDown");
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }
    /**
     * 좌우 이동값만 따져서 회전시킴
     * @param {*} e
     */
    onMove(e) {
        console.log("onMove");
        if (this.isDown) {
            //윈도우기준좌표 - 이벤트타겟기준좌표(최초pointdown좌표)
            this.moveX = -(e.clientX - this.offsetX);
            //오른쪽 이동 음수
            //왼쪽 이동 양수
            // console.log(
            //   `this.moveX = ${this.moveX},  e.clientX = ${e.clientX}, this.offsetX = ${this.offsetX}`
            // );
            this.offsetX = e.clientX; //이동한 값만큼 animate를 통해 반영되었으니, clientX로 갱신
        }
    }
    onUp(e) {
        console.log("onUp");
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
};