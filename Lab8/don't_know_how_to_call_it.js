import * as helpers from "./helper_functions.js";
import * as elliptic from "./elliptic.js";



let BITS_IN_BYTE = 8;


export function genKey(p, P, q, a) {
    elliptic.initialize(p, a);

    let d = helpers.valueSum(helpers.valueDiv(helpers.randomValue(q.length * BITS_IN_BYTE), helpers.valueSub(q, new Uint8Array([2])))[1], new Uint8Array([2]));
    let Q = elliptic.point_by_scalar(P, d);

    let open_key = [Q, p, P, q, a];
    let closed_key = [d, q, p, a];

    return [open_key, closed_key];
}


function prepareMessage(message, k) { // here message mod k = 0
    let block_size = Math.ceil(k / BITS_IN_BYTE);
    let i;
    let result = [];

    for (i = 0; i < message.length * BITS_IN_BYTE - k + 1; i += k) {
        let starting_byte = Math.floor(i / BITS_IN_BYTE);
        let ending_byte = Math.ceil((i + k) / BITS_IN_BYTE);

        let block = helpers.shiftLeft(message.slice(starting_byte, ending_byte), i % BITS_IN_BYTE);
        result.push(block.slice(0, block_size));
    }

    return result;
}


function unprepareMessage(message, k) { // message mod k = 0
    let result = new Uint8Array(Math.ceil(message.length * k / BITS_IN_BYTE));

    for (let i = 0; i < message.length; i++) {
        let block = helpers.shiftRight(message[i], i * k % BITS_IN_BYTE);
        for (let j = 0; j < block.length; j++) {
            result[Math.floor(i * k / BITS_IN_BYTE) + j] |= block[j]; 
        }
    }

    return result;
}


export function encrypt(message, open_key) {
    let Q = open_key[0];
    let p = open_key[1];
    let P = open_key[2];
    let q = open_key[3];
    let a = open_key[4];

    elliptic.initialize(p, a);

    let message_block_size = helpers.getRealSize(q) - 1;

    let prepared_message = prepareMessage(helpers.allignBuffer(message, message_block_size), message_block_size);

    let result_suffix = [new Uint8Array([0]), new Uint8Array([0])];
    let add = new Uint8Array([0]);
    let result = new Array(prepared_message.length);

    while (helpers.valueComp(add, new Uint8Array([0])) == 0 || (helpers.valueComp(result_suffix[0], new Uint8Array([0])) == 0 && helpers.valueComp(result_suffix[1], new Uint8Array([0])) == 0)) {
        let k = helpers.valueSum(helpers.valueDiv(helpers.randomValue(q.length * BITS_IN_BYTE), helpers.valueSub(q, new Uint8Array([1])))[1], new Uint8Array([1]));
        result_suffix = elliptic.point_by_scalar(P, k)
        add = helpers.valueDiv(elliptic.point_by_scalar(Q, k)[0], q)[1];
    }

    for (let i = 0; i < prepared_message.length; i++) {
        result[i] = helpers.resizeVal(helpers.valueDiv(helpers.valueSum(helpers.truncateValue(prepared_message[i]), add), q)[1], helpers.getRealSize(q));
    }

    return new Uint8Array([...unprepareMessage(result, helpers.getRealSize(q)), ...helpers.resizeVal(result_suffix[0], helpers.getRealSize(p)), ...helpers.resizeVal(result_suffix[1], helpers.getRealSize(p))]);
}


export function decrypt(message, closed_key) {
    let d = closed_key[0];
    let q = closed_key[1];
    let p = closed_key[2];
    let a = closed_key[3];

    elliptic.initialize(p, a);

    let suffix_value_size = Math.ceil(helpers.getRealSize(p) / BITS_IN_BYTE);
    let suffix_point = [helpers.truncateValue(message.slice(-suffix_value_size)), helpers.truncateValue(message.slice(-suffix_value_size * 2, -suffix_value_size))];
    let prepared_message = prepareMessage(message.slice(0, -suffix_value_size * 2), helpers.getRealSize(q));

    let result = new Array(prepared_message.length);

    for (let i = 0; i < prepared_message.length; i++) {
        result[i] = helpers.valueDiv(helpers.valueSub(helpers.valueSum(helpers.truncateValue(result[i]), q), elliptic.point_by_scalar(suffix_point, d)[0]), q)[0];
    }

    let result_block_size = helpers.getRealSize(q) - 1;

    return helpers.deAllignBuffer(unprepareMessage(result, result_block_size));
}