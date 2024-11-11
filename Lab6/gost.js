import * as helpers from "./helper_functions.js";
import * as hasher from "./hash.js";


const BITS_IN_BYTE = 8;
const VALUE_SIZE = 512;
const BIG_UPPER_BORDER = 512;
const BIG_LOWER_BORDER = 508;
const SMALL_UPPER_BORDER = 256;
const SMALL_LOWER_BORDER = 254;


//////GLOBALS
let p;
let q;
let P;
let a;


function points_sum(point1, point2) {
    let r, r0;

    if (helpers.valueComp(point1[0], new Uint8Array([0])) == 0 && helpers.valueComp(point1[1], new Uint8Array([0])) == 0)
        return point2;

    if (helpers.valueComp(point2[0], new Uint8Array([0])) == 0 && helpers.valueComp(point2[1], new Uint8Array([0])) == 0)
        return point2;

    if (helpers.valueComp(point1[0], point2[0]) == 0) {
        r = helpers.valueDiv(helpers.valueSub(helpers.valueSum((point2[1] + p) - point1[1])), p)[1];
        r0 = helpers.valueDiv(helpers.valueSub(helpers.valueSum((point2[0] + p) - point1[0])), p)[1];
    } else {
        if (helpers.valueComp(helpers.valueDiv(helpers.valueSum(point1[1], point2[1]), p)[1], new Uint8Array([0])) == 0) {
            return [new Uint8Array([0]), new Uint8Array([0])];
        }

        r = helpers.valueDiv(helpers.valueSum(helpers.valueMul(helpers.valueMul(point1[0], point1[0]), helpers.genValue(3)), a), p)[1];
        r0 = helpers.valueDiv(helpers.valueMul(point1[1], helpers.genValue(2)), p)[1];
    }

    let lambd = helpers.valueDiv(helpers.valueMul(helpers.extendedEuclid(p, r0)[2], r), p)[1];

    let newX = helpers.valueSub(helpers.valueSub(helpers.valueMul(lambd, lambd), point1[0]), point2[0]);
    let newY = helpers.valueSub(helpers.valueMul(lambd, helpers.valueSub(point1[0], newX)), point1[1]);

    return [helpers.valueDiv(newX, p)[1], helpers.valueDiv(newY, p)];
}


function point_by_scalar(point, scalar) {
    if (helpers.valueComp(scalar, new Uint8Array([0])) == 0)
        return [new Uint8Array([0]), new Uint8Array([0])];

    let result = point_by_scalar(points_sum(point, point), helpers.shiftLeft(scalar, 1));

    if (scalar[scalar.length - 1] & 1 == 1) 
        result = points_sum(scalar, result);

    return result;
}


export function initialize(p_value, q_value, P_value, a_value) {
    p = p_value;
    q = q_value;
    P = P_value;
    a = a_value;
}


function generate_signature(m, d) {
    let e = new Uint8Array(VALUE_SIZE / BITS_IN_BYTE);

    if (helpers.valueComp(q, helpers.setBit(BLANK_VALUE.slice(), VALUE_SIZE - BIG_LOWER_BORDER)) > 0) {
        e = hasher.hash(m, true);
    } else {
        e = hasher.hash(m, false);
    }

    if (helpers.valueComp(e, new Uint8Array([0])) == 0) {
        e = new Uint8Array([1]);
    }

    let r = new Uint8Array([0]);
    let s = new Uint8Array([0]);

    while (helpers.valueComp(r, new Uint8Array([0])) == 0 || helpers.valueComp(s, new Uint8Array([0])) == 0) {
        let k = helpers.valueSum(helpers.valueDiv(helpers.randomValue(q.length * BITS_IN_BYTE), helpers.valueSub(q, new Uint8Array([1])))[1], new Uint8Array([1]));
        let C = point_by_scalar(P, k);
        r = helpers.valueDiv(C[0], q)[1];
        s = helpers.valueDiv(helpers.valueSum(helpers.valueMul(r, d), helpers.valueMul(k, e)), q)[1];
    }

    return new Uint8Array(...new Uint8Array(q.length - r.length), ...r, ...new Uint8Array(s.length - r.length), ...s);
}


function verify_signature(m, signature, Q) {
    let r = signature.slice(0, signature.length / 2);
    let s = signature.slice(signature.length / 2);

    if (helpers.valueComp(r, new Uint8Array([0])) == 0 || helpers.valueComp(s, new Uint8Array([0])) == 0 || helpers.valueComp(r, q) >= 0 || helpers.valueComp(s, q) >= 0) {
        return false;
    }

    let e = new Uint8Array(VALUE_SIZE / BITS_IN_BYTE);

    if (helpers.valueComp(q, helpers.setBit(BLANK_VALUE.slice(), VALUE_SIZE - BIG_LOWER_BORDER)) > 0) {
        e = hasher.hash(m, true);
    } else {
        e = hasher.hash(m, false);
    }

    if (helpers.valueComp(e, new Uint8Array([0])) == 0) {
        e = new Uint8Array([1]);
    }

    let v = helpers.extendedEuclid(q, e)[2];
    let z1 = helpers.valueDiv(helpers.valueMul(s, v), q)[1];
    let z2 = helpers.valueSub(q, helpers.valueDiv(helpers.valueMul(r, v), q)[1]);

    let C = points_sum(point_by_scalar(P, z1), point_by_scalar(Q, z2));

    return helpers.valueComp(r, helpers.valueDiv(C[0], q)[1]) == 0;
}