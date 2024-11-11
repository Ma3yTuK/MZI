import * as helpers from "./helper_functions.js";
import * as hasher from "./hash.js";


const BITS_IN_BYTE = 8;


//////GLOBALS
let p;
let a;


export function points_sum(point1, point2) {
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


export function point_by_scalar(point, scalar) {
    if (helpers.valueComp(scalar, new Uint8Array([0])) == 0)
        return [new Uint8Array([0]), new Uint8Array([0])];

    let result = point_by_scalar(points_sum(point, point), helpers.shiftLeft(scalar, 1));

    if (scalar[scalar.length - 1] & 1 == 1) 
        result = points_sum(scalar, result);

    return result;
}


export function initialize(p_value, a_value) {
    p = p_value;
    a = a_value;
}