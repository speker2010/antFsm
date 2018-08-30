import Leaf from "./Leaf";
import VectorHelper from "./VectorHelper";

export default class Game {
    constructor() {
        let canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        this.canvasElem = canvas;
        this.canvas = canvas.getContext('2d');
        document.body.appendChild(canvas);
        this.objects = [];
        let button = document.createElement('button');
        button.innerText = 'Старт';
        document.body.appendChild(button);
        this.leafs = [];
        let loop = this.loop.bind(this);
        canvas.addEventListener('click', (e) => {
            this.addLeaf(e);
        });
        button.addEventListener('click', (e) => {
            requestAnimationFrame(loop);
        });
        canvas.addEventListener('mousemove', (e) => {
            this.cursorPosition = this.getCursorPosition(e);
        });
        canvas.addEventListener('mouseout', () => {
            this.cursorPosition = undefined;
        });
    }

    loop(time) {
        let loop = this.loop.bind(this);
        if (window.times++ < 20) {
            requestAnimationFrame(loop);
            return;
        }
        window.times = 0;
        this.clear();
        this.update();
        this.draw();
        /*timer = new Date() - startTime;
        if (timer - time < 70) {
        } else {
            time = timer;
            gameTime++;
            update();
            draw();
        }*/
        requestAnimationFrame(loop);
    }

    clear() {
        let width = this.canvasElem.width;
        let height = this.canvasElem.height;
        let canvasColor = this.canvas.fillStyle;
        this.canvas.fillStyle = '#ffffff';
        this.canvas.fillRect(0, 0, width, height);
        this.canvas.fillStyle = canvasColor;
    }

    getCanvasCoords() {
        if (!this.canvasCoords) {
            let canvasCoords = Game.getCoords(this.canvasElem);
            this.canvasCoords = canvasCoords;
        }
        return this.canvasCoords;
    }

    getCursorPosition(e) {
        let canvasCoords = this.getCanvasCoords();

        let x = e.pageX - canvasCoords.left;
        let y = e.pageY - canvasCoords.top;
        return {
            x: x,
            y: y
        };
    }

    addLeaf(e) {

        let leaf = new Leaf(this.getCursorPosition(e));
        leaf.addGame(this);

        this.leafs.push(leaf);
    }

    closestLeaf(position) {
        if (this.leafs.length === 0) {
            return false;
        }
        let sortedLeafs = this.leafs.sort((a, b) => {
            let aDirection = VectorHelper.getDirection(position, a.position);
            let bDirection = VectorHelper.getDirection(position, b.position);
            let aLength = VectorHelper.getLength(aDirection);
            let bLength = VectorHelper.getLength(bDirection);
            console.log(aLength, bLength, 'lengths');
            return aLength - bLength;
        });
        console.log(sortedLeafs, 'sortLeafs');
        return sortedLeafs[0];
    }

    deleteLeaf(leaf) {
        let index = this.leafs.indexOf(leaf);
        console.log(leaf === this.leafs[0], this.leafs, this.leafs.indexOf(this.leafs[0]));
        if (~index) {
            this.leafs.splice(index, 1);
        } else {
            console.log(leaf);
            throw 'Не найден листок';
        }
    }

    addObject(object) {
        object.addGame(this);
        this.objects.push(object);
    }

    addHome(home) {
        this.home = home;
    }

    update() {
        this.objects.forEach((object, index) => {
            object.update();
        });
    }

    draw() {
        this.objects.forEach((object, index) => {
            object.draw();
        });
        this.leafs.forEach((object, index) => {
            object.draw();
        });
    }

    static getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}