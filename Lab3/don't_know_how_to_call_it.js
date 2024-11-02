import * as helpers from "./helper_functions.js";


let HEADER = new Uint8Array( [0b00000001] );
let NUMBER_OF_CHOICES = 4;



function checkPublicKey(m, publicKey) {
    if (helpers.valueComp(m, publicKey) >= 0) {
        throw new Error("Key is too small");
    } 
}


export function encrypt(m, publicKey) {
    m = new Uint8Array([...HEADER, ...m]);
    checkPublicKey(m, publicKey);
    return helpers.valueDiv(helpers.valueMul(m, m), publicKey)[1];
}


function checkPrivateKey(c, key, eu, n) {
    let modResult1 = helpers.valueDiv(key[0], new Uint8Array([4]))[1]
    let modResult2 = helpers.valueDiv(key[1], new Uint8Array([4]))[1]

    if (helpers.valueComp(modResult1, new Uint8Array([3])) != 0 || helpers.valueComp(modResult2, new Uint8Array([3])) != 0) {
        throw new Error("Private key parts are");
    }

    if (helpers.valueComp(eu[0], new Uint8Array([1])) != 0) {
        throw new Error("Key parts are not mutually prime");
    }

    if (helpers.valueComp(c, n) >= 0) {
        throw new Error("Key is too small");
    } 
}


export function decrypt(c, key) {
    if (helpers.valueComp(key[0], key[1]) < 0) {
        let tmp = key[0];
        key[0] = key[1];
        key[1] = tmp;
    }

    let n = helpers.valueMul(key[0], key[1]);
    let eu = helpers.extendedEuclid(key[0], key[1]);

    checkPrivateKey(c, key, eu, n);

    let mp = helpers.valuePow(c, helpers.valueDiv(helpers.valueSum(key[0], new Uint8Array([1])), new Uint8Array([4]))[0], key[0]);
    let mq = helpers.valuePow(c, helpers.valueDiv(helpers.valueSum(key[1], new Uint8Array([1])), new Uint8Array([4]))[0], key[1]);

    let rq = helpers.valueMul(helpers.valueMul(eu[2], key[1]), mp);
    let rp = helpers.valueMul(helpers.valueMul(eu[1], key[0]), mq);

    let r = new Array(NUMBER_OF_CHOICES);

    r[0] = helpers.valueDiv(helpers.valueSub(rq, rp), n)[1];
    r[1] = helpers.valueSub(n, r[0]);
    r[2] = helpers.valueDiv(helpers.valueSum(rp, rq), n)[1];
    r[3] = helpers.valueSub(n, r[2]);

    for (let i = 0; i < NUMBER_OF_CHOICES; i++) {
        let j;

        for (j = 0; j < HEADER.length; j++) {
            if (r[i][j] != HEADER[j]) {
                break;
            }
        }

        if (j == HEADER.length) {
            return r[i].subarray(j, r[i].length);
        }
    }

    return null;
}