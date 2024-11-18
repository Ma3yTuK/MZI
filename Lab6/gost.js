import * as helpers from "./helper_functions.js";
import * as hasher from "./hash.js";


const BITS_IN_BYTE = 8;
const VALUE_SIZE = 512;
const BLANK_VALUE = new Uint8Array(VALUE_SIZE / BITS_IN_BYTE);
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
    //p = helpers.genValue(13);
    //a = helpers.genValue(1);

    if (helpers.valueComp(point1[0], new Uint8Array([0])) == 0 && helpers.valueComp(point1[1], new Uint8Array([0])) == 0)
        return point2;

    if (helpers.valueComp(point2[0], new Uint8Array([0])) == 0 && helpers.valueComp(point2[1], new Uint8Array([0])) == 0)
        return point1;

    if (helpers.valueComp(point1[0], point2[0]) != 0) {
        r = helpers.valueDiv(helpers.valueSub(helpers.valueSum(point2[1], p), point1[1]), p)[1];
        r0 = helpers.valueDiv(helpers.valueSub(helpers.valueSum(point2[0], p), point1[0]), p)[1];
    } else {
        if (helpers.valueComp(helpers.valueDiv(helpers.valueSum(point1[1], point2[1]), p)[1], new Uint8Array([0])) == 0) {
            return [new Uint8Array([0]), new Uint8Array([0])];
        }

        r = helpers.valueDiv(helpers.valueSum(helpers.valueMul(helpers.valueMul(point1[0], point1[0]), helpers.genValue(3)), a), p)[1];
        r0 = helpers.valueDiv(helpers.valueMul(point1[1], helpers.genValue(2)), p)[1];
    }

    let tmp = helpers.extendedEuclid(p, r0);

    if (tmp[3] % 2 == 0) {
        tmp = helpers.valueSub(p, tmp[2]);
    } else {
        tmp = tmp[2];
    }
    
    let lambd = helpers.valueDiv(helpers.valueMul(tmp, r), p)[1];

    let newX = helpers.valueDiv(helpers.valueSub(helpers.valueSum(helpers.valueSub(helpers.valueSum(helpers.valueMul(lambd, lambd), p), point1[0]), p), point2[0]), p)[1];
    let newY = helpers.valueSub(helpers.valueSum(helpers.valueMul(lambd, helpers.valueSub(helpers.valueSum(point1[0], p), newX)), p), point1[1]);

    return [newX, helpers.valueDiv(newY, p)[1]];
}


function point_by_scalar(point, scalar) {
    if (helpers.valueComp(scalar, new Uint8Array([0])) == 0)
        return [new Uint8Array([0]), new Uint8Array([0])];

    let result = point_by_scalar(points_sum(point, point), helpers.shiftRight(scalar, 1));

    if (scalar[scalar.length - 1] & 1 == 1) 
        result = points_sum(point, result);

    return result;
}


function initialize(p_value, q_value, P_value, a_value) {
    p = p_value;
    q = q_value;
    P = P_value;
    a = a_value;
}


export function genKey(p, P, q, a) {
    initialize(p, q, P, a);

    let d = helpers.valueSum(helpers.valueDiv(helpers.randomValue(q.length * BITS_IN_BYTE), helpers.valueSub(q, new Uint8Array([2])))[1], new Uint8Array([2]));
    //let d = Buffer.from("7a929ade789bb9be10ed359dd39a72c11b60961f49397eee1d19ce9891ec3b28", "hex");
    let Q = point_by_scalar(P, d);

    let open_key = [Q, p, P, q, a];
    let closed_key = [d, q, P, p, a];

    return [open_key, closed_key];
}


export function generate_signature(m, closed_key) {
    let d = closed_key[0];
    let q = closed_key[1];
    let P = closed_key[2];
    let p = closed_key[3];
    let a = closed_key[4];

    initialize(p, q, P, a);

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
        //k = Buffer.from("77105c9b20bcd3122823c8cf6fcc7b956de33814e95b7fe64fed924594dceab3", "hex");
        //e = Buffer.from("2dfbc1b372d89a1188c09c52e0eec61fce52032ab1022e8e67ece6672b043ee5", "hex");
        //k = helpers.genValue(4);
        //P = [helpers.genValue(1), helpers.genValue(4)];
        let C = point_by_scalar(P, k);
        //C = points_sum(P, P);
        //C = points_sum(C, P);
        //C = points_sum(C, P);
        r = helpers.valueDiv(C[0], q)[1];
        s = helpers.valueDiv(helpers.valueSum(helpers.valueMul(r, d), helpers.valueMul(k, e)), q)[1];
    }

    return new Uint8Array([...new Uint8Array(q.length - r.length), ...r, ...new Uint8Array(q.length - s.length), ...s]);
}


export function verify_signature(m, signature, open_key) {
    let Q = open_key[0];
    let p = open_key[1];
    let P = open_key[2];
    let q = open_key[3];
    let a = open_key[4];

    initialize(p, q, P, a);

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

    //e = Buffer.from("2dfbc1b372d89a1188c09c52e0eec61fce52032ab1022e8e67ece6672b043ee5", "hex");

    if (helpers.valueComp(e, new Uint8Array([0])) == 0) {
        e = new Uint8Array([1]);
    }

    let v = helpers.extendedEuclid(q, e);

    if (v[3] % 2 == 0) {
        v = helpers.valueSub(q, v[2]);
    } else {
        v = v[2];
    }

    let z1 = helpers.valueDiv(helpers.valueMul(s, v), q)[1];
    let z2 = helpers.valueSub(q, helpers.valueDiv(helpers.valueMul(r, v), q)[1]);

    let C = points_sum(point_by_scalar(P, z1), point_by_scalar(Q, z2));

    return helpers.valueComp(r, helpers.valueDiv(C[0], q)[1]) == 0;
}