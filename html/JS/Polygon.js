const PI2 = Math.PI * 2;
const COLORS = [
    "#4b45ab",
    "#554fb8",
    "#605ac7",
    "#2a91a8",
    "#32a5bf",
    "#81b144",
    "#85b944",
    "#8fc549",
    "#e0af27",
    "#eeba2a",
    "#fec72e",
    "#bf342d",
    "#ca3931",
    "#d7423a"
];

export class Polygon {
    constructor(x, y, radius, sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }
    animate(ctx, moveX) {
        ctx.save(); // context 상태를 저장
        // ctx.fillStyle = "#f00";

        const angle = PI2 / this.sides; //n등분 - 360/n에 해당하는 값
        const angle2 = PI2 / 4;
        ctx.translate(this.x, this.y); // x, y축 이동. context는 상대값이므로 이를 기준으로 아래가 처리된다.

        this.rotate -= moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i); //기준각(angle * i)에 대한 cosine값
            const y = this.radius * Math.sin(angle * i); //기준각(angle * i)에 대한 sine값

            //모서리에 작은 원 만들기
            // ctx.beginPath();
            // ctx.arc(x, y, 30, 0, PI2, false);
            // ctx.fill();

            ctx.save();
            ctx.fillStyle = COLORS[i];
            ctx.translate(x, y);
            ctx.rotate((((360 / this.sides) * 1 + 45) * Math.PI) / 180);
            ctx.beginPath();
            //각각 사각형 만들기
            for (let j = 0; j < 4; j++) {
                const x2 = 120 * Math.cos(angle2 * j);
                const y2 = 120 * Math.sin(angle2 * j);
                j == 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore(); // 마지막 저장한 context상태로 복구
    }
}