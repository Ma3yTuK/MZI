import { bigint } from "typeson-registry";
import * as helpers from "./helper_functions.js";


const BITS_IN_BYTE = 8;
const RESERVED_BITS = 64;
const BLOCK_SIZE = 512;
const BYTE_WITH_FIRST_BIT_SET = 128;
const BYTE_WITH_EVERY_BIT_SET = 255;
const WORD_SIZE = 32;
const WORD_COUNT = 80;

const K1 = new Uint8Array([0x5A, 0x82, 0x79, 0x99]);
const K2 = new Uint8Array([0x6E, 0xD9, 0xEB, 0xA1]);
const K3 = new Uint8Array([0x8F, 0x1B, 0xBC, 0xDC]);
const K4 = new Uint8Array([0xCA, 0x62, 0xC1, 0xD6]);


const A_init = new Uint8Array([0x67, 0x45, 0x23, 0x01]);
const B_init = new Uint8Array([0xEF, 0xCD, 0xAB, 0x89]);
const C_init = new Uint8Array([0x98, 0xBA, 0xDC, 0xFE]);
const D_init = new Uint8Array([0x10, 0x32, 0x54, 0x76]);
const E_init = new Uint8Array([0xC3, 0xD2, 0xE1, 0xF0]);



//////GLOBALS
let A;
let B;
let C;
let D;
let E;
let a;
let b;
let c;
let d;
let e;



function prepare_message(message) {
    let message_length = message.length * BITS_IN_BYTE;
    let last_block_size = message_length % BLOCK_SIZE;
    let padding_length = BLOCK_SIZE - last_block_size;
    let reserved_value = helpers.genValue(message_length);

    let result;
    
    if (last_block_size > BLOCK_SIZE - RESERVED_BITS - 1) {
        result = new Uint8Array([...message, ...new Uint8Array((BLOCK_SIZE + padding_length) / BITS_IN_BYTE - reserved_value.length), ...reserved_value]);
    } else {
        result = new Uint8Array([...message, ...new Uint8Array(padding_length / BITS_IN_BYTE - reserved_value.length), ...reserved_value]);
    }
    
    result[message.length] = BYTE_WITH_FIRST_BIT_SET;
    
    return result;
}


function F1(m, l, k) {
    let part1 = helpers.valueAND(m, l);
    let part2 = helpers.valueAND(helpers.valueNEG(m), k);

    return helpers.valueOR(part1, part2);
}


function F2(m, l, k) {
    return helpers.valueXOR(helpers.valueXOR(m, l), k);
}


function F3(m, l, k) {
    let part1 = helpers.valueAND(m, l);
    let part2 = helpers.valueAND(m, k);
    let part3 = helpers.valueAND(l, k);

    return helpers.valueXOR(helpers.valueXOR(part1, part2), part3);
}


function F4 (m, l, k) { 
    return F2(m, l, k);
}


function hash_iteration(W, t) {
    let tmp = helpers.valueSum(helpers.shiftLeft(a, 5, true), e);

    if (t < 20)
        tmp = helpers.valueSum(tmp, helpers.valueSum(F1(b, c, d), K1));
    else if (t < 40)
        tmp = helpers.valueSum(tmp, helpers.valueSum(F2(b, c, d), K2));
    else if (t < 60)
        tmp = helpers.valueSum(tmp, helpers.valueSum(F3(b, c, d), K3));
    else
        tmp = helpers.valueSum(tmp, helpers.valueSum(F4(b, c, d), K4));

    tmp = helpers.valueSum(tmp, W);
    
    e = d;
    d = c;
    c = helpers.shiftLeft(b, 30, true);
    b = a;
    a = tmp.slice(-WORD_SIZE / BITS_IN_BYTE);
}


export function hash(message) {
    let prepared_message = prepare_message(message);

    A = A_init;
    B = B_init;
    C = C_init;
    D = D_init;
    E = E_init;

    for (let i = 0; i < prepared_message.length; i += BLOCK_SIZE / BITS_IN_BYTE) {
        a = A;
        b = B;
        c = C;
        d = D;
        e = E;

        let block = prepared_message.slice(i, i + BLOCK_SIZE / BITS_IN_BYTE);
        let W = [];

        for (let i = 0; i < block.length; i += WORD_SIZE / BITS_IN_BYTE) {
            W.push(block.slice(i, i + WORD_SIZE / BITS_IN_BYTE));
            hash_iteration(W[W.length - 1], W.length - 1);
        }
        
        while (W.length < WORD_COUNT) {
            let new_word = helpers.valueXOR(helpers.valueXOR(helpers.valueXOR(W[W.length - 3], W[W.length - 8]), W[W.length - 14]), W[W.length - 16]);
            W.push(helpers.shiftLeft(new_word, 1, true));
            hash_iteration(W[W.length - 1], W.length - 1);
        }

        A = helpers.valueSum(A, a).slice(-WORD_SIZE / BITS_IN_BYTE);
        B = helpers.valueSum(B, b).slice(-WORD_SIZE / BITS_IN_BYTE);
        C = helpers.valueSum(C, c).slice(-WORD_SIZE / BITS_IN_BYTE);
        D = helpers.valueSum(D, d).slice(-WORD_SIZE / BITS_IN_BYTE);
        E = helpers.valueSum(E, e).slice(-WORD_SIZE / BITS_IN_BYTE);
    }

    return new Uint8Array([...A, ...B, ...C, ...D, ...E]);
}