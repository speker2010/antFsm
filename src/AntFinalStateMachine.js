import FinalStateMachine from './FinalStateMachine';
import Vector from "./Vector";
import VectorHelper from "./VectorHelper";

export default class AntFinalStateMachine extends FinalStateMachine {
    constructor(params) {
        super(params);
        this.color = params.color || '#00ff00';
        this.fullColor = params.color || '#ff0000';
        this.curColor = this.color;
        this.position = new Vector({
            x: params.x,
            y: params.y
        });
        this.width = params.width;
        this.height = params.height;
        this.speed = 0;
        this.direction = new Vector({
            x: 0,
            y: 0
        });
        this.stack.push(this.findLeaf);
        this.angle = '';
    }

    findLeaf() {
        this.curColor = this.color;
        if (typeof this.closestLeaf === 'undefined') {
            this.closestLeaf = this.game.closestLeaf(this.position);
            if (this.closestLeaf === false) {
                this.closestLeaf = undefined;
                return;
            }
        }

        this.directionToGoalObj(this.closestLeaf.position);

        if (this.isDanger()) {
            this.speed = 0;
            this.stack.push(this.runAway);
            this.closestLeaf = undefined;
            return;
        }

        if (this.isOnObject()) {
            this.speed = 0;
            this.stack.pop();
            this.stack.push(this.goHome);
            this.game.deleteLeaf(this.closestLeaf);
            this.closestLeaf = undefined;
        }
    }

    isDanger() {
        let cursorPosition = this.game.cursorPosition;
        if (typeof cursorPosition === 'undefined') {
            return false;
        }
        let position = this.position;
        let isX = (cursorPosition.x - position.x < 10 ) && (cursorPosition.x - position.x > -10);
        let isY = (cursorPosition.y - position.y < 10) && (cursorPosition.y - position.y > -10);
        return isX && isY;
    }

    directionToGoalObj(obj) {
        this.goalObj = obj;
        let directionVector = VectorHelper.getDirection(this.position, this.goalObj);
        this.direction = VectorHelper.getNormal(directionVector);
        this.speed = 1;
    }

    isOnObject() {
        let result = false;

        let isX = (this.position.x -this.width/2 < this.goalObj.x) && (this.position.x + this.width/2 > this.goalObj.x);
        let isY = (this.position.y -this.height/2 < this.goalObj.y) && (this.position.y + this.height/2 > this.goalObj.y);
        return isX && isY;
    }

    runAway() {
        if(typeof this.game.cursorPosition === 'undefined') {
            this.stack.pop();
            this.speed = 0;
            this.runAwayPoint = undefined;
            return;
        }
        if (typeof this.runAwayPoint === 'undefined') {
            console.log('runawaypoint');
            this.runAwayPoint = this.getRunAwayDirection();
        }
        /*if (this.isDanger()) {
            console.log('is danger');
            this.runAwayPoint = this.getRunAwayDirection();
        }*/
        console.log(this.runAwayPoint);
        this.directionToGoalObj(this.runAwayPoint);

        if (this.isOnObject()) {
            this.stack.pop();
            this.speed = 0;
            this.runAwayPoint = undefined;
        }
    }

    getRunAwayDirection() {
        let antCursorDirection = VectorHelper.getDirection(this.position, this.game.cursorPosition);
        let angle = VectorHelper.angleAcrosVectors(this.direction, antCursorDirection);
        this.angle += "\n" + angle;
        console.log(this.angle);
        let newDirection;
        if (angle < 90) {
            newDirection = VectorHelper.rotate90(antCursorDirection);
            if (VectorHelper.scalaerAddTwoVectors(newDirection, this.direction) < 0) {
                newDirection = VectorHelper.addScalar(newDirection, -1);
            }
        } else {
            newDirection = this.direction;
        }
        let runAwayLength = VectorHelper.addScalar(newDirection, 100);
        return VectorHelper.add(this.position, newDirection);
    }

    goHome() {
        this.curColor = this.fullColor;
        this.directionToGoalObj(this.game.home.position);
        if (this.isOnObject()) {
            this.speed = 0;
            this.stack.pop();
            this.stack.push(this.findLeaf);
        }
    }

    update() {
        this.stack[this.stack.length - 1].call(this);
        let speedVector = VectorHelper.addScalar(this.direction, this.speed);
        this.position = VectorHelper.add(this.position, speedVector);
    }

    draw() {
        let canvas = this.game.canvas;
        let canvasColor = canvas.fillStyle;
        canvas.fillStyle = this.curColor;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.runAwayPoint) {
            canvas.fillStyle = '#0000ff';
            canvas.fillRect(this.runAwayPoint.x, this.runAwayPoint.y, 1, 1);
        }
        if (this.direction && this.game.cursorPosition) {
            let toPoint = VectorHelper.addScalar(this.direction, 10);
            toPoint = VectorHelper.add(this.position, toPoint);

            canvas.beginPath();
            canvas.moveTo(this.position.x, this.position.y);
            canvas.lineTo(toPoint.x, toPoint.y);
            canvas.stroke();

            canvas.beginPath();
            canvas.moveTo(this.position.x, this.position.y);
            canvas.lineTo(this.game.cursorPosition.x, this.game.cursorPosition.y);
            canvas.strokeStyle = '#ff0000';
            canvas.stroke();
        }
        if (this.game.cursorPosition) {
            let antCursorDirection = VectorHelper.getDirection(this.position, this.game.cursorPosition);
            let angle = VectorHelper.angleAcrosVectors(this.direction, antCursorDirection);
            canvas.font = 'italic 12px Arial';
            canvas.strokeText(angle + ' ' + window.angleRaw, 20, 100);
        }

        canvas.fillStyle = canvasColor;
    }
}