import Object from "./Object";
import Vector from "./Vector";
export default class Home extends Object{
    constructor(params) {
        super(params);
        this.position = new Vector({
            x: params.x,
            y: params.y
        });
        this.width = params.width;
        this.height = params.height;
        this.color = params.color || '#000000';
    }

    draw() {
        let canvas = this.game.canvas;
        let canvasColor = canvas.fillCollor;
        canvas.fillCollor = this.color;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
        canvas.fillCollor = canvasColor;
    }

    update() {
        return;
    }
}