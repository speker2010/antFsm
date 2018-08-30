export default class Vector {
    constructor(params) {
        if (typeof params.x === 'undefined' || typeof params.y === 'undefined') {
            throw 'Не верно переданы параметры';
        }
        this.x = params.x;
        this.y = params.y;
    }

    isNull() {
        return this.x === 0 && this.y === 0;
    }
}