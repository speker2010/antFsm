import Vector from "./Vector";

export default class VectorHelper {
    static getLength(vector) {
        let length = 0;
        length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        return length;
    }

    static getDirection(from, to) {
        // from - to
        return new Vector({
            x: to.x - from.x,
            y: to.y - from.y
        });
    }

    static getNormal(vector) {
        let length = VectorHelper.getLength(vector);

        return new Vector({
            x: vector.x / length,
            y: vector.y / length
        })
    }

    static add(a, b) {
        return new Vector({
            x: a.x + b.x,
            y: a.y + b.y
        });
    }

    static addScalar(vector, scalar) {
        return new Vector({
            x: vector.x * scalar,
            y: vector.y * scalar
        })
    }

    static scalaerAddTwoVectors(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    static angleAcrosVectors(a, b) {
        let aNormal = VectorHelper.getNormal(a);
        let bNormal = VectorHelper.getNormal(b);
        let ab = VectorHelper.scalaerAddTwoVectors(aNormal, bNormal);
        window.angleRaw = ab;
        let angleRad = Math.acos(ab);

        return (angleRad * 180) / Math.PI;
    }

    static rotate90(vector) {
        return new Vector({
            x: vector.y,
            y: vector.x * -1
        });
    }

    static rotate270(vector) {
        let rotated90 = VectorHelper.rotate90(vector);
        return VectorHelper.addScalar(rotated90, -1);
    }
}