import Object from "./Object";
import Vector from "./Vector";

export default class Leaf extends Object{
    constructor(params) {
        super(params);
        this.color = params.color || '#ff0000';
        this.position = new Vector({
            x: params.x,
            y: params.y
        });
        this.width = 2;
        this.height = 2;
    }

    draw() {
        let canvas = this.game.canvas;
        let canvasColor = canvas.fillStyle;
        canvas.fillStyle = this.color;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
        canvas.fillStyle = canvasColor;
    }
}