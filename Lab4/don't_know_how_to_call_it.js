import * as helpers from "./helper_functions.js";
import * as generation from "./really_hard.js";



let BITS_IN_BYTE = 8;


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


export function genKey(n, k, t) {
    // let H = [
    //     new Uint8Array([0b01010011, 0b01100000]),
    //     new Uint8Array([0b11100010, 0b01000000]),
    //     new Uint8Array([0b01001011, 0b10010000]),
    //     new Uint8Array([0b10111000, 0b01110000]),
    //     new Uint8Array([0b10000111, 0b01100000]),
    //     new Uint8Array([0b10011000, 0b10110000]),
    //     new Uint8Array([0b11101001, 0b10100000]),
    //     new Uint8Array([0b11101010, 0b11100000])
    // ]
    // helpers.matrixMul(helpers.findKernel(H, 8, 12), H, 4, 8, 12);

    let m = (n - k) / t;

    if (m != Math.floor(m)) {
        throw new Error("Invalid parameters");
    }

    let base = generation.selectBase(m); // should be random i guess, but i have no idea how to generate it

    generation.initialize(m, base);

    let Ls = generation.generateVals(m, n);
    let g = generation.generateCompositBase(m, t);
    generation.initialize_composit(g, Ls);
    
    let G_transposed = helpers.transpose(generation.generateG(m, n, t), k, n);
    
    let S = helpers.genDificultBinaryMatrixS(k);
    let S_inversed = helpers.inverseMatrix(S, k);

    let P_inversed = helpers.transpose(helpers.genBinaryMatrixP(n), n, n);

    let open_key = [helpers.matrixMul(helpers.matrixMul(S, G_transposed, k, n, k), P_inversed, k, n, n), t, k, n];
    let closed_key = [S_inversed, G_transposed, P_inversed, Ls, g, base, t, k, n];

    return [open_key, closed_key];
}


export function genKey1(n, k, t, keys) {
    // let H = [
    //     new Uint8Array([0b01010011, 0b01100000]),
    //     new Uint8Array([0b11100010, 0b01000000]),
    //     new Uint8Array([0b01001011, 0b10010000]),
    //     new Uint8Array([0b10111000, 0b01110000]),
    //     new Uint8Array([0b10000111, 0b01100000]),
    //     new Uint8Array([0b10011000, 0b10110000]),
    //     new Uint8Array([0b11101001, 0b10100000]),
    //     new Uint8Array([0b11101010, 0b11100000])
    // ]
    // helpers.matrixMul(helpers.findKernel(H, 8, 12), H, 4, 8, 12);

    let m = (n - k) / t;

    if (m != Math.floor(m)) {
        throw new Error("Invalid parameters");
    }

    let base = generation.selectBase(m); // should be random i guess, but i have no idea how to generate it

    generation.initialize(m, base);

    let Ls = generation.generateVals(m, n);
    let g = generation.generateCompositBase(m, t);
    generation.initialize_composit(g, Ls);
    
    let G_transposed = helpers.transpose(generation.generateG(m, n, t), k, n);
    
    let S = helpers.genDificultBinaryMatrixS(k);
    let S_inversed = helpers.inverseMatrix(S, k);

    let P_inversed = helpers.transpose(helpers.genBinaryMatrixP(n), n, n);
    //let open_key = [helpers.matrixMul(helpers.matrixMul(S, G_transposed, k, n, k), P_inversed, k, n, n), t, k, n];
    let open_key = [helpers.transpose(G_transposed, n, k), t, k, n];
    let closed_key = [helpers.genEMatrix(k), G_transposed, helpers.genEMatrix(n), Ls, g, base, t, k, n];

    return [open_key, closed_key]
}


export function test(open_key, closed_key, message) {
    let S_inversed = closed_key[0];
    let G_transposed = closed_key[1];
    let P_inversed = closed_key[2];
    let Ls = closed_key[3];
    let g = closed_key[4];
    let base = closed_key[5];
    let t = closed_key[6];
    let k = closed_key[7];
    let n = closed_key[8];

    let m = (n - k) / t;

    // FROM BOOK
    // t = 2;
    // n = 12;
    // k = 4;
    // base = generation.selectBase(m);
    // m = (n - k) / t;

    generation.initialize(m, base);
    
    //g = [1, generation.valsPow(2, 7), 1];
    // Ls = [
    //     generation.valsPow(2, 2),
    //     generation.valsPow(2, 3),
    //     generation.valsPow(2, 4),
    //     generation.valsPow(2, 5),
    //     generation.valsPow(2, 6),
    //     generation.valsPow(2, 7),
    //     generation.valsPow(2, 8),
    //     generation.valsPow(2, 9),
    //     generation.valsPow(2, 10),
    //     generation.valsPow(2, 11),
    //     generation.valsPow(2, 12),
    //     generation.valsPow(2, 13)
    // ]

    // Ls = generation.generateVals(m, n);
    // g = generation.generateCompositBase(m, t);

    generation.initialize_composit(g, Ls);

    //let G = generation.generateG(m, n, t);


    // message = new Uint8Array([0b10100000]);
    //let z = new Uint8Array([0b10000100, 0b00000000]);

    // let emessage1 = helpers.matrixMulVector(helpers.transpose(G, k, n), message, n, k);
    // let emessage2 = helpers.valueXOR(emessage1, z);
    // let emessage3 = generation.patterson(emessage2, m, t);
    // let emassage4 = helpers.slau(helpers.transpose(G, k, n), n, k, 1, emessage3)[0];


    /*let G = [
        new Uint8Array([0b00110000]),
        new Uint8Array([0b11110000]),
        new Uint8Array([0b11010000]),
        new Uint8Array([0b01100000]),
        new Uint8Array([0b11110000]),
        new Uint8Array([0b00010000]),
        new Uint8Array([0b10000000]),
        new Uint8Array([0b01010000]),
        new Uint8Array([0b01000000]),
        new Uint8Array([0b10000000]),
        new Uint8Array([0b00010000]),
        new Uint8Array([0b00100000])
    ]*/
    // let S = [
    //     new Uint8Array([0b10010000]),
    //     new Uint8Array([0b01010000]),
    //     new Uint8Array([0b01000000]),
    //     new Uint8Array([0b00110000])
    // ]
    // let P = [
    //     new Uint8Array([0b10000000, 0b00000000]),
    //     new Uint8Array([0b00100000, 0b00000000]),
    //     new Uint8Array([0b00000000, 0b10000000]),
    //     new Uint8Array([0b00000100, 0b00000000]),
    //     new Uint8Array([0b00001000, 0b00000000]),
    //     new Uint8Array([0b01000000, 0b00000000]),
    //     new Uint8Array([0b00010000, 0b00000000]),
    //     new Uint8Array([0b00000000, 0b00010000]),
    //     new Uint8Array([0b00000001, 0b00000000]),
    //     new Uint8Array([0b00000000, 0b01000000]),
    //     new Uint8Array([0b00000000, 0b00100000]),
    //     new Uint8Array([0b00000010, 0b00000000]),
    // ]

    // P_inversed = helpers.transpose(P, n, n);
    // S_inversed = helpers.inverseMatrix(S, k);
    
    // let S = helpers.genDificultBinaryMatrixS(k);
    // S_inversed = helpers.inverseMatrix(S, k);

    // P_inversed = helpers.transpose(helpers.genBinaryMatrixP(n), n, n);
    // G_transposed = helpers.transpose(G, k, n);

    let z = helpers.randomWithOnes(n, 0);


    let result = helpers.valueXOR(helpers.matrixMulVector(helpers.transpose(open_key[0], k, n), message, n, k), z);


    //generation.initialize(m, base);
    //generation.initialize_composit(g, Ls);

    message = helpers.matrixMulVector(helpers.transpose(P_inversed, n, n), result, n, n);
    message = generation.patterson(message, m, t);
    //message = new Uint8Array([0b11111110, 0b11100000]);
    message = helpers.slau(G_transposed, n, k, 1, message)[0];
    message = helpers.matrixMulVector(helpers.transpose(S_inversed, k, k), message, k, k);
    
    return message;
}


export function encrypt(message, open_key) {
    let t = open_key[1];
    let k = open_key[2];
    let n = open_key[3];

    let prepared_message = prepareMessage(helpers.allignBuffer(message, k), k);
    let z = helpers.randomWithOnes(n, t);

    let result = new Array(prepared_message.length);
    let M_transposed = helpers.transpose(open_key[0], k, n);

    for (let i = 0; i < prepared_message.length; i++) {
        result[i] = helpers.valueXOR(helpers.matrixMulVector(M_transposed, prepared_message[i], n, k), z);
    }

    return unprepareMessage(result, n);
}


export function decrypt(message, closed_key) {
    // let G = [
    //     new Uint8Array([0b00110000]),
    //     new Uint8Array([0b11110000]),
    //     new Uint8Array([0b11010000]),
    //     new Uint8Array([0b01100000]),
    //     new Uint8Array([0b11110000]),
    //     new Uint8Array([0b00010000]),
    //     new Uint8Array([0b10000000]),
    //     new Uint8Array([0b01010000]),
    //     new Uint8Array([0b01000000]),
    //     new Uint8Array([0b10000000]),
    //     new Uint8Array([0b00010000]),
    //     new Uint8Array([0b00100000])
    // ]
    // let b = new Uint8Array([0b11111110, 0b11100000]);
    // helpers.slau(G, 12, 4, 2, b);


    let S_inversed = closed_key[0];
    let G_transposed = closed_key[1];
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
        result[i] = generation.patterson(result[i], m, t);
        //result[i] = generation.patterson(prepared_message[i], m, t);
        result[i] = helpers.slau(G_transposed, n, k, 1, result[i])[0];
        result[i] = helpers.matrixMulVector(helpers.transpose(S_inversed, k, k), result[i], k, k);
    }

    return helpers.deAllignBuffer(unprepareMessage(result, k));
}