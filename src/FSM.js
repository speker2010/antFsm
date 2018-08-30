import Object from "./Object";

export default class FSM extends Object{
    constructor(params) {
        super(params);
        this.stack = [];
    }
}