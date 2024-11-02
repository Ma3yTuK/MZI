import * as helpers from "./helper_functions.js";
import * as generation from "./really_hard.js";



let BITS_IN_BYTE = 8;


function prepareMessage(message, k) { // here message mod k = 0
    let block_size = Math.ceil(k / BITS_IN_BYTE);
    let i;
    let result = [];

    for (i = 0; i < message.length * BITS_IN_BYTE; i += k) {
        let starting_byte = Math.floor(i / BITS_IN_BYTE);
        let ending_byte = Math.ceil((i + k) / BITS_IN_BYTE);

        let block = helpers.shiftLeft(message.slice(starting_byte, ending_byte + 1), i % BITS_IN_BYTE);
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


export function genKey(n, k, t) {
    let m = (n - k) / t;

    if (m != Math.floor(m)) {
        throw new Error("Invalid parameters");
    }

    let base = generation.selectBase(m); // should be random i guess, but i have no idea how to generate it

    generation.initialize(m, base);

    let Ls = generation.generateVals(m, n);
    let g = generation.generateCompositBase(m, t);
    generation.initialize_composit(g, Ls);
    
    let G = generation.generateG(m, n, t);
    
    let S = helpers.genDificultBinaryMatrixS(k);
    let S_inversed = helpers.inverseMatrix(S, k);

    let P_inversed = helpers.transpose(helpers.genBinaryMatrixP(n), n, n);

    let open_key = [helpers.matrixMul(helpers.matrixMul(S, helpers.transpose(G, k, n), k, n, k), P_inversed, k, n, n), t, k, n];
    let closed_key = [S_inversed, G, P_inversed, Ls, g, base, t, k, n];

    return [open_key, closed_key];
}


export function encrypt(message, open_key) {
    let t = open_key[1];
    let k = open_key[2];
    let n = open_key[3];

    let prepared_message = prepareMessage(helpers.allignBuffer(message), k);
    let z = helpers.randomWithOnes(n, t);

    let result = new Array(prepared_message.length);
    let M_transposed = helpers.transpose(open_key[0], k, n);

    for (let i = 0; i < prepared_message.length; i++) {
        result[i] = helpers.valueXOR(helpers.matrixMulVector(M_transposed, prepared_message[i], n, k), z);
    }

    return unprepareMessage(result, n);
}


export function decrypt(message, closed_key) {
    let S_inversed = closed_key[0];
    let G = closed_key[1];
    let P_inversed = closed_key[2];
    let Ls = closed_key[3];
    let g = closed_key[4];
    let base = closed_key[5];
    let t = closed_key[6];
    let k = closed_key[7];
    let n = closed_key[8];

    let m = (n - k) / t;

    generation.initialize(m, base);
    generation.initialize_composit(g, Ls);

    let prepared_message = prepareMessage(message, n);
    let result = new Array(prepared_message.length);

    for (let i = 0; i < prepared_message.length; i++) {
        result[i] = helpers.matrixMulVector(helpers.transpose(P_inversed, n, n), prepared_message[i], n, n);
        result[i] = generation.patterson(result[i], m);
        result[i] = helpers.slau(G, k, 1, result[i]);
        result[i] = helpers.matrixMulVector(helpers.transpose(S_inversed, k, k), result[i], k, k);
    }

    return helpers.deAllignBuffer(unprepareMessage(result, k));
}