import './scss/index.scss';
import Home from './Home';
import Game from './Game';
import AntFinalStateMachine from "./AntFinalStateMachine";
window.curTime = performance.now();
window.times = 0;
let game = new Game();
let home = new Home({
    x: 5,
    y: 5,
    width: 10,
    height: 10
});
let ant = new AntFinalStateMachine({
    x: 4,
    y: 4,
    width: 4,
    height: 4
});

game.addObject(home);
game.addHome(home);
game.addObject(ant);
game.update();
game.draw();



