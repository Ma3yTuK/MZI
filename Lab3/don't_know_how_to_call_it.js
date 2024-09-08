import * as helpers from "./helper_functions.js";


const VALUE_SIZE = 4;
const BITS_IN_BYTE = 8;
const X_SIZE = 4;
const TETTA_SIZE = 8;
const BLOCK_SIZE = 16;
const NUMBER_OF_ITERATIONS = 8;
let X = [ new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE) ];
let TETTA = [  new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE) ];
let E = new Uint8Array(VALUE_SIZE);

const H_TABLE = [
    new Uint8Array([0xB1, 0x94, 0xBA, 0xC8, 0x0A, 0x08, 0xF5, 0x3B, 0x36, 0x6D, 0x00, 0x8E, 0x58, 0x4A, 0x5D, 0xE4]),
    new Uint8Array([0x85, 0x04, 0xFA, 0x9D, 0x1B, 0xB6, 0xC7, 0xAC, 0x25, 0x2E, 0x72, 0xC2, 0x02, 0xFD, 0xCE, 0x0D]),
    new Uint8Array([0x5B, 0xE3, 0xD6, 0x12, 0x17, 0xB9, 0x61, 0x81, 0xFE, 0x67, 0x86, 0xAD, 0x71, 0x6B, 0x89, 0x0B]),
    new Uint8Array([0x5C, 0xB0, 0xC0, 0xFF, 0x33, 0xC3, 0x56, 0xB8, 0x35, 0xC4, 0x05, 0xAE, 0xD8, 0xE0, 0x7F, 0x99]),
    new Uint8Array([0xE1, 0x2B, 0xDC, 0x1A, 0xE2, 0x82, 0x57, 0xEC, 0x70, 0x3F, 0xCC, 0xF0, 0x95, 0xEE, 0x8D, 0xF1]),
    new Uint8Array([0xC1, 0xAB, 0x76, 0x38, 0x9F, 0xE6, 0x78, 0xCA, 0xF7, 0xC6, 0xF8, 0x60, 0xD5, 0xBB, 0x9C, 0x4F]),
    new Uint8Array([0xF3, 0x3C, 0x65, 0x7B, 0x63, 0x7C, 0x30, 0x6A, 0xDD, 0x4E, 0xA7, 0x79, 0x9E, 0xB2, 0x3D, 0x31]),
    new Uint8Array([0x3E, 0x98, 0xB5, 0x6E, 0x27, 0xD3, 0xBC, 0xCF, 0x59, 0x1E, 0x18, 0x1F, 0x4C, 0x5A, 0xB7, 0x93]),
    new Uint8Array([0xE9, 0xDE, 0xE7, 0x2C, 0x8F, 0x0C, 0x0F, 0xA6, 0x2D, 0xDB, 0x49, 0xF4, 0x6F, 0x73, 0x96, 0x47]),
    new Uint8Array([0x06, 0x07, 0x53, 0x16, 0xED, 0x24, 0x7A, 0x37, 0x39, 0xCB, 0xA3, 0x83, 0x03, 0xA9, 0x8B, 0xF6]),
    new Uint8Array([0x92, 0xBD, 0x9B, 0x1C, 0xE5, 0xD1, 0x41, 0x01, 0x54, 0x45, 0xFB, 0xC9, 0x5E, 0x4D, 0x0E, 0xF2]),
    new Uint8Array([0x68, 0x20, 0x80, 0xAA, 0x22, 0x7D, 0x64, 0x2F, 0x26, 0x87, 0xF9, 0x34, 0x90, 0x40, 0x55, 0x11]),
    new Uint8Array([0xBE, 0x32, 0x97, 0x13, 0x43, 0xFC, 0x9A, 0x48, 0xA0, 0x2A, 0x88, 0x5F, 0x19, 0x4B, 0x09, 0xA1]),
    new Uint8Array([0x7E, 0xCD, 0xA4, 0xD0, 0x15, 0x44, 0xAF, 0x8C, 0xA5, 0x84, 0x50, 0xBF, 0x66, 0xD2, 0xE8, 0x8A]),
    new Uint8Array([0xA2, 0xD7, 0x46, 0x52, 0x42, 0xA8, 0xDF, 0xB3, 0x69, 0x74, 0xC5, 0x51, 0xEB, 0x23, 0x29, 0x21]),
    new Uint8Array([0xD4, 0xEF, 0xD9, 0xB4, 0x3A, 0x62, 0x28, 0x75, 0x91, 0x14, 0x10, 0xEA, 0x77, 0x6C, 0xDA, 0x1D])
];


function fillX(block) {
    for (let i = 0; i < X_SIZE; i++) {
        for (let j = 0; j < VALUE_SIZE; j++) {
            X[i][j] = block[i * VALUE_SIZE + j];
        }
    }
}


function fillTETTA(key) {
    for (let i = 0; i < TETTA_SIZE; i++) {
        for (let j = 0; j < VALUE_SIZE; j++) {
            TETTA[i][j] = key[i * VALUE_SIZE + j];
        }
    }
}


function H(byte) {
    const mod = 1 << (BITS_IN_BYTE / 2);
    return H_TABLE[Math.floor(byte / mod)][byte % mod];
}


function ShLo(value, r) {
    return helpers.mirrorBytes(helpers.shiftRight(helpers.mirrorBytes(value), r))
}


function ShHi(value, r) {
    return helpers.mirrorBytes(helpers.shiftLeft(helpers.mirrorBytes(value), r))
}


function RotHi(value, r) {
    return helpers.valueXOR(ShHi(value, r), ShLo(value, value.length * BITS_IN_BYTE - r))
}


function G(value, r) {
    if (value.length != VALUE_SIZE) {
        throw new Error('Invalid parameter');
    }

    let result = new Uint8Array(VALUE_SIZE);

    for (let i = 0; i < VALUE_SIZE; i++) {
        result[i] = H(value[i]);
    }

    return RotHi(result, r);
}


function strangeSum(value1, value2) {
    return helpers.mirrorBytes(helpers.valueSum(helpers.mirrorBytes(value1), helpers.mirrorBytes(value2))[0]);
}


function strangeSub(value1, value2) {
    return helpers.mirrorBytes(helpers.valueSub(helpers.mirrorBytes(value1), helpers.mirrorBytes(value2))[0]);
}


function encryptBlock(block) {
    fillX(block);

    for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
        let I_AS_VALUE = new Uint8Array(VALUE_SIZE);
        I_AS_VALUE[I_AS_VALUE.length - 1] = i + 1;

        X[1] = helpers.valueXOR(X[1], G(strangeSum(X[0], TETTA[(7 * i) % 8]), 5));                                                  //1
        X[2] = helpers.valueXOR(X[2], G(strangeSum(X[3], TETTA[(7 * i + 1) % 8]), 21));                                             //2
        X[0] = strangeSub(X[0], G(strangeSum(X[1], TETTA[(7 * i + 2) % 8]), 13));                                                   //3
        E = helpers.valueXOR(G(strangeSum(strangeSum(X[1], X[2]), TETTA[(7 * i + 3) % 8]), 21), helpers.mirrorBytes(I_AS_VALUE));   //4
        X[1] = strangeSum(X[1], E);                                                                                                 //5
        X[2] = strangeSub(X[2], E);                                                                                                 //6
        X[3] = strangeSum(X[3], G(strangeSum(X[2], TETTA[(7 * i + 4) % 8]), 13));                                                   //7
        X[1] = helpers.valueXOR(X[1], G(strangeSum(X[0], TETTA[(7 * i + 5) % 8]), 21));                                             //8
        X[2] = helpers.valueXOR(X[2], G(strangeSum(X[3], TETTA[(7 * i + 6) % 8]), 5));                                              //9

        let tmp = X[2];
        X[2] = X[0];
        X[0] = X[1];
        X[1] = X[3];
        X[3] = tmp;
    }

    return new Uint8Array([...X[1], ...X[3], ...X[0], ...X[2]]);
}


function decryptBlock(block) {
    fillX(block);

    for (let i = NUMBER_OF_ITERATIONS - 1; i >= 0; i--) {
        let I_AS_VALUE = new Uint8Array(VALUE_SIZE);
        I_AS_VALUE[I_AS_VALUE.length - 1] = i + 1;

        X[1] = helpers.valueXOR(X[1], G(strangeSum(X[0], TETTA[(7 * i + 6) % 8]), 5));                                              //1
        X[2] = helpers.valueXOR(X[2], G(strangeSum(X[3], TETTA[(7 * i + 5) % 8]), 21));                                             //2
        X[0] = strangeSub(X[0], G(strangeSum(X[1], TETTA[(7 * i + 4) % 8]), 13));                                                   //3
        E = helpers.valueXOR(G(strangeSum(strangeSum(X[1], X[2]), TETTA[(7 * i + 3) % 8]), 21), helpers.mirrorBytes(I_AS_VALUE));   //4
        X[1] = strangeSum(X[1], E);                                                                                                 //5
        X[2] = strangeSub(X[2], E);                                                                                                 //6
        X[3] = strangeSum(X[3], G(strangeSum(X[2], TETTA[(7 * i + 2) % 8]), 13));                                                   //7
        X[1] = helpers.valueXOR(X[1], G(strangeSum(X[0], TETTA[(7 * i + 1) % 8]), 21));                                             //8
        X[2] = helpers.valueXOR(X[2], G(strangeSum(X[3], TETTA[(7 * i) % 8]), 5));                                                  //9

        let tmp = X[0];
        X[0] = X[2];
        X[2] = X[3];
        X[3] = X[1];
        X[1] = tmp;
    }

    return new Uint8Array([...X[2], ...X[0], ...X[3], ...X[1]]);
}


export function processData(data, key, decrypt = false) {
    if (data.length < BLOCK_SIZE) {
        throw new Error('Invalid parameters');
    }

    fillTETTA(key);
    
    let process;

    if (decrypt)
        process = decryptBlock;
    else
        process = encryptBlock;

    let result = [];

    for (let i = BLOCK_SIZE; i <= Math.floor(data.length / BLOCK_SIZE) * BLOCK_SIZE; i += BLOCK_SIZE) {
        result = [ ...result, ...process(data.slice(i - BLOCK_SIZE, i)) ];
    }

    let remains = data.length % BLOCK_SIZE;

    if (remains > 0) {
        let end = process([ ...data.slice(data.length - remains, data.length), ...result.slice(result.length - BLOCK_SIZE + remains, result.length) ]);
        result = [ ...result.slice(0, result.length - BLOCK_SIZE), ...end, ...result.slice(result.length - BLOCK_SIZE, result.length - BLOCK_SIZE + remains) ];
    }
    
    return new Uint8Array(result);
}