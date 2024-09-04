import { N, R, K, X, N01, CM, T } from "./don't_know_how_to_call_it.js"


const BLOCK_SIZE = 8;


function process(block, key, decypher = false) {
    let X_arr = X(key);
    N01(block);

    let value1, value2;

    if (decypher) {
        value1 = 1;
        value2 = 3;
    } else {
        value1 = 3;
        value2 = 1;
    }

    for (let i = 0; i < value1; i++) {
        for (let j = 0; j < 8; j++) {
            let tmp = N[0];
            N[0] = CM[1](R(K(CM[0](X_arr[j], N[0]))), N[1]);
            N[1] = tmp;
        }
    }

    for (let i = 0; i < value2; i++) {
        for (let j = 7; j >= 0; j--) {
            let tmp = N[0];
            N[0] = CM[1](R(K(CM[0](X_arr[j], N[0]))), N[1]);
            N[1] = tmp;
        }
    }

    return T();
}

function process_data(data, key, decypher = false) {
    let result = [];

    for (let i = 0; i < data.length; i += BLOCK_SIZE) {
        result = [ ...result, ...process(data.slice(i, i + BLOCK_SIZE), key, decypher) ];
    }

    return new Uint8Array(result);
}

export function cypher_data(data, key) {
    let length = data.length;
    let new_length = Math.floor(((length + 2) + BLOCK_SIZE - 1) / BLOCK_SIZE) * BLOCK_SIZE; 
    let new_data = [ Math.floor(length / 256), length % 256, ...data ];
    while (length + 2 < new_length) {
        new_data.push(0);
        length++;
    }
    return process_data(new Uint8Array(new_data), key);
}

export function decypher_data(data, key) {
    let new_data = process_data(data, key, true);
    let new_length = new_data[0] * 256 + new_data[1];
    return new_data.slice(2, 2 + new_length);
}