export default class Object {
    constructor() {

    }

    addGame(game) {
        this.game = game;
    }

    draw() {
        console.log('Object draw');
    }

    update() {
        console.log('Object update');
    }
}