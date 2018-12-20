import Object from "./Object";

export default class FinalStateMachine extends Object{
    constructor(params) {
        super(params);
        this.stack = [];
    }
}