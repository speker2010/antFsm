import './scss/index.scss';
import Home from './Home';
import Game from './Game';
import AntFSM from "./AntFSM";
window.curTime = performance.now();
window.times = 0;
let game = new Game();
let home = new Home({
    x: 300,
    y: 300,
    width: 10,
    height: 10
});
let ant = new AntFSM({
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



