import * as ts from "typeson";
import * as ts_r from "typeson-registry";
import * as fs from "fs";


const typeson = new ts.Typeson().register(ts_r.builtin);


const BITS_IN_BYTE = 8;
const SHUFFLES = 10;
const MAX_BYTE = 255;



export function allignBuffer(message, mod, for_size = 4) {
    let old_size = message.length;
    let new_size = Math.ceil(Math.ceil((old_size + for_size) * BITS_IN_BYTE / mod) * mod / BITS_IN_BYTE);

    let result = new Uint8Array(new_size);

    for (let i = 0; i < old_size; i++) {
        result[for_size + i] = message[i];
    }

    while(for_size > 0 && new_size > 0) {
        result[for_size - 1] = old_size & MAX_BYTE;
        for_size--;
        old_size >>= BITS_IN_BYTE;
    }

    return result;
}


export function deAllignBuffer(message, for_size = 4) {
    let new_length = 0;

    for (let i = 0; i < for_size; i++)
        new_length = (new_length << BITS_IN_BYTE) + message[i];

    return message.slice(for_size, for_size + new_length);
}


export function writeObjectToFile(obj, file) {
    fs.writeFileSync(file, typeson.stringify(obj));
}


export function readObjectFromFile(file) {
    return typeson.parse(fs.readFileSync(file));
}


function smallShiftLeft(bytes, shift, fill = false) {
    if (shift > BITS_IN_BYTE) {
        throw new Error('Invalid shift');
    }

    const ones = 0b11111111;
    const bits_not_remembered = BITS_IN_BYTE - shift;
    const remembered_bits = (ones << bits_not_remembered) & ones;
    
    let tmp = 0;

    for (let i = bytes.length - 1; i >= 0; i--) {
        let new_byte = (bytes[i] << shift) | tmp;
        tmp = (bytes[i] & remembered_bits) >> bits_not_remembered;
        bytes[i] = new_byte;
    }

    if (fill)
        bytes[bytes.length - 1] |= tmp;
}


function resize(value, size) {
    let byte_size = Math.ceil(size / BITS_IN_BYTE);
    let result = new Uint8Array([...new Array(byte_size - value.length).fill(0), ...value]);
    
    return shiftLeft(result, BITS_IN_BYTE - ((size - 1) % BITS_IN_BYTE + 1))
}


export function randomValue(size) {
    let byteSize = Math.ceil(size / BITS_IN_BYTE);

    let result = new Uint8Array(byteSize);

    for (let i = byteSize - 1; i > 0; i--) {
        result[i] = Math.floor(Math.random() * (1 << BITS_IN_BYTE));
    }

    result[0] = Math.floor(Math.random() * (1 << ((size - 1) % 8 + 1)));
    return result;
}


export function randomVals(mod, count, base = 0) {
    if (mod == 0 || count == 0) {
        return []
    }

    let current = Math.floor(Math.random() * mod);
    let lowsCount = Math.floor(count / 2);
    let upsCount = count - 1 - lowsCount;

    let lows = randomVals(current, lowsCount, base);
    upsCount += lowsCount - lows.length;

    let ups = randomVals(mod - current - 1, upsCount, base + current + 1);
    lowsCount += upsCount - ups.length;

    if (ups.length < upsCount) {
        lows = randomVals(current, lowsCount, base);
    }

    return [...lows, base + current, ...ups];
}


export function randomWithOnes(size, count) {
    let indexes = randomVals(size, count);
    let result = new Uint8Array(Math.ceil(size / BITS_IN_BYTE));

    for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * indexes.length);
        setBit(result, indexes[index]);
        indexes[index] = indexes[index.length - 1 - i];
    }

    return result;
}


export function multipleRandoms(size, count, mod, base = new Uint8Array([0])) {
    if (valueComp(mod, new Uint8Array([0])) == 0 || count == 0) {
        return [];
    }

    let current = valueDiv(randomValue(size), mod)[1];
    let lowerCount = Math.floor(count / 2);
    let upperCount = count - 1 - lowerCount;

    let lowers = multipleRandoms(size, lowerCount, current, base);
    upperCount += lowerCount - lowers.length;

    let tmp = valueSum(current, new Uint8Array([1]));

    let uppers = multipleRandoms(size, upperCount, valueSub(mod, tmp), valueSum(base, tmp));
    lowerCount += upperCount - uppers.length;

    if (uppers.length < upperCount) {
        lowers = multipleRandoms(size, lowerCount, current, base);
    }

    return [...lowers, resize(valueSum(base, current), size), ...uppers];
}


export function genEMatrix(size) {
    let byteSize = Math.ceil(size / BITS_IN_BYTE);
    let result = new Array(byteSize * BITS_IN_BYTE);
    
    for(let i = 0; i < size; i++) {
        result[i] = new Uint8Array(byteSize);
        setBit(result[i], i);
    }

    return result;
}


export function transpose(matrix, size1, size2) {
    let byteSize = Math.ceil(size2 / BITS_IN_BYTE);
    let result = new Array(byteSize * BITS_IN_BYTE);

    for (let i = 0; i < byteSize * BITS_IN_BYTE; i++) {
        result[i] = new Uint8Array(Math.ceil(size1 / BITS_IN_BYTE));
    }

    for (let i = 0; i < size1; i++) {
        let base = i % BITS_IN_BYTE;
        let byte = Math.floor(i / BITS_IN_BYTE);
        for (let j = 0; j < byteSize; j++) {
            let tmp = matrix[i][j];
            let bit = 1 << (BITS_IN_BYTE - 1);

            for (let k = 0; k < BITS_IN_BYTE; k++) {
                result[j * BITS_IN_BYTE + k][byte] |= ((tmp << k) & bit) >> base;
            }
        }
    }

    return result.slice(0, size2);
}


function countOnesByte(byte) {
    let result = 0;

    for (let i = 0; i < BITS_IN_BYTE; i++) {
        result += (byte >>> i) & 1
    }

    return result
}


export function countOnes(value, size) {
    let result = 0;

    let i;
    for (i = 0; i < Math.floor(size / BITS_IN_BYTE); i++) {
        result += countOnesByte(value[i]);
    }

    if (i < value.length) {
        result += countOnesByte(value[i] >> (BITS_IN_BYTE - size % BITS_IN_BYTE));
    }

    return result;
}


export function matrixMulVector(matrix, vector, size_m, size) {
    let byteSize = Math.ceil(size_m / BITS_IN_BYTE);
    let result = new Uint8Array(byteSize);

    for (let j = 0; j < byteSize; j++) {
        let byte = 0;
        for (let k = 0; k < BITS_IN_BYTE; k++) {
            byte <<= 1;
            if (j * BITS_IN_BYTE + k < size_m) {
                byte |= countOnes(valueAND(matrix[j * BITS_IN_BYTE + k], vector), size) % 2;
            }
        }
        result[j] = byte;
    }

    return result;
}


export function matrixMul(matrix1, matrix2, size1, size2, size3) {
    let byteSize = Math.ceil(size2 / BITS_IN_BYTE);
    let result = new Array(Math.ceil(size1 / BITS_IN_BYTE) * BITS_IN_BYTE);

    for (let i = 0; i < size1; i++) {
        result[i] = new Uint8Array(byteSize);
        for (let j = 0; j < byteSize; j++) {
            let byte = 0;
            for (let k = 0; k < BITS_IN_BYTE; k++) {
                byte <<= 1;
                if (j * BITS_IN_BYTE + k < size2) {
                    byte |= countOnes(valueAND(matrix1[i], matrix2[j * BITS_IN_BYTE + k]), size3) % 2;
                }
            }
            result[i][j] = byte;
        }
    }

    return result;
}


export function genBinaryMatrixP(size) {
    let byteSize = Math.ceil(size / BITS_IN_BYTE);
    let matrix = new Array(byteSize * BITS_IN_BYTE);

    let indexes = new Array(size).fill(0).map( (_, i) => i );

    for (let i = 0; i < size; i++) {
        let index = Math.floor(Math.random() * (size - i));
        matrix[i] = new Uint8Array(byteSize);
        setBit(matrix[i], indexes[index]);

        indexes[index] = indexes[indexes.length - 1 - i];
    }

    return matrix;
}


export function genDificultBinaryMatrixS(size) {
    let matrix = genEMatrix(Math.ceil(size / BITS_IN_BYTE) * BITS_IN_BYTE);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < SHUFFLES; j++) {
            let tmp = Math.floor(Math.random() * size);
            if (tmp != i) 
                matrix[i] = valueXOR(matrix[i], matrix[tmp]);
        }
    }

    return matrix;
}


export function shiftLeft(byt, shift, fill = false) {
    let byte_shift = Math.floor(shift / BITS_IN_BYTE);
    let bit_shift = shift % BITS_IN_BYTE;

    let bytes = new Uint8Array(byt);

    let firstBytes = new Uint8Array(bytes.slice(0, byte_shift));

    for (let i = byte_shift; i < bytes.length; i++) {
        bytes[i - byte_shift] = bytes[i];
    }

    for (let i = 0; i < byte_shift; i++) {
        if (fill) {
            bytes[bytes.length - byte_shift + i] = firstBytes[i];
        } else {
            bytes[bytes.length - byte_shift + i] = 0;
        }
    }

    smallShiftLeft(bytes, bit_shift, fill);

    return bytes;
}


function smallShiftRight(bytes, shift, fill = false) {
    if (shift >  BITS_IN_BYTE) {
        throw new Error('Invalid shift');
    }
    const ones = 0b11111111;
    const bits_not_remembered = BITS_IN_BYTE - shift;
    const remembered_bits = (ones >> bits_not_remembered) & ones;
    let tmp = 0;

    for (let i = 0; i < bytes.length; i++) {
        let new_byte = (bytes[i] >> shift) | tmp;
        tmp = (bytes[i] & remembered_bits) << bits_not_remembered;
        bytes[i] = new_byte;
    }

    if (fill)
        bytes[0] |= tmp;
}


export function shiftRight(byt, shift, fill = false) {
    let byte_shift = Math.floor(shift / BITS_IN_BYTE);
    let bit_shift = shift % BITS_IN_BYTE;

    let bytes = new Uint8Array(byt);

    let lastBytes = new Uint8Array(bytes.slice(bytes.length - byte_shift, bytes.length));

    for (let i = bytes.length - 1; i > byte_shift - 1; i--) {
        bytes[i] = bytes[i - byte_shift];
    }

    for (let i = 0; i < byte_shift; i++) {
        if (fill) {
            bytes[i] = lastBytes[i];
        } else {
            bytes[i] = 0;
        }
    }

    smallShiftRight(bytes, bit_shift, fill);

    return bytes;
}


export function setBit(value, pos) {
    value[Math.floor(pos / BITS_IN_BYTE)] |= 1 << (BITS_IN_BYTE - 1 - pos % BITS_IN_BYTE);
}


export function getBit(value, pos) {
    let posByte = Math.floor(pos / BITS_IN_BYTE);
    let posBit = pos % BITS_IN_BYTE;

    return (value[posByte] >> (BITS_IN_BYTE - 1 - posBit)) & 1
}


export function valueComp(value1, value2) {
    let i = 0;
    let j = 0;

    while(i < value1.length - 1 && value1[i] == 0) i++;
    while(j < value2.length - 1 && value2[j] == 0) j++;

    while(i < value1.length - 1 && j < value2.length - 1 && value1[i] == value2[j]) {
        i++;
        j++;
    }

    return (((value1.length - i) - (value2.length - j)) << BITS_IN_BYTE) + value1[i] - value2[j];
}


export function valueSum(value1, value2) {
    if (valueComp(value1, value2) < 0) {
        let tmp = value1;
        value1 = value2;
        value2 = tmp;
    }

    let result = new Uint8Array(value1.length);
    let acc = 0;
    let mod = 1 << BITS_IN_BYTE
    
    let i;
    for (i = 0; i < value2.length; i++) {
        acc = value1[value1.length - 1 - i] + value2[value2.length - 1 - i] + acc;
        result[result.length - 1 - i] = acc % mod;

        if (acc >= mod)
            acc = 1;
        else
            acc = 0;
    }

    while (i < value1.length) {
        acc += value1[value1.length - 1 - i];
        result[result.length - 1 - i] = (acc + mod) % mod;

        if (acc >= mod)
            acc = 1;
        else
            acc = 0;

        i++;
    }

    if (acc == 1) {
        if (i < result.length) {
            result[result.length - 1 - i] = 1;
        } else {
            result = new Uint8Array([1, ...result]);
        }
    }

    return result
}


export function valueSub(value1, value2, trunc = true) {
    if (valueComp(value1, value2) < 0) {
        let tmp = value1;
        value1 = value2;
        value2 = tmp;
    }

    let result = new Uint8Array(value1.length);
    let acc = 0;
    let mod = 1 << BITS_IN_BYTE

    let i;
    for (i = 0; i < value2.length; i++) {
        acc = value1[value1.length - 1 - i] - value2[value2.length - 1 - i] - acc;
        result[result.length - 1 - i] = (acc + mod) % mod;

        if (acc < 0)
            acc = 1;
        else
            acc = 0;
    }

    while (i < value1.length) {
        acc = value1[value1.length - 1 - i] - acc;
        result[result.length - 1 - i] = (acc + mod) % mod;

        if (acc < 0)
            acc = 1;
        else
            acc = 0;

        i++;
    }

    if (trunc) {
        i = 0;
        while(i < result.length && result[i++] == 0);
        result = result.subarray(i - 1, result.length);
    }

    return result
}


export function valueMul(value1, value2, trunc = true) {
    if (valueComp(value1, value2) < 0) {
        let tmp = value1;
        value1 = value2;
        value2 = tmp;
    }

    let result = new Uint8Array(value1.length + value2.length);
    let mod = 1 << BITS_IN_BYTE
    
    for (let i = 0; i < value2.length; i++) {
        let acc = 0;

        for (let j = 0; j < value1.length; j++) {
            acc = result[value1.length + value2.length - 1 - i - j] + value1[value1.length - 1 - j] * value2[value2.length - 1 - i] + acc;
            result[value1.length + value2.length - 1 - i - j] = acc % mod;
            acc = Math.floor(acc / mod);
        }
        
        for(let k = 0; acc > 0; k++) {
            acc = result[value2.length - 1 - i - k] + acc;
            result[value2.length - 1 - i - k] = acc % mod;
            acc = Math.floor(acc / mod);
        }
    }

    if (trunc) {
        let i = 0;
        while(i < result.length && result[i++] == 0);
        result = result.subarray(i - 1, result.length);
    }

    return result
}


function valueDivStep(value1, value2) {
    let i = 0;
    let j = 0;

    while(i < value1.length - 1 && value1[i] == 0) i++;
    while(i < value2.length - 1 && value2[j] == 0) j++;

    let shift;
    if (value1[i] < value2[j]) {
        shift = Math.floor(Math.log2(value2[j] / value1[i]));
        value1 = shiftLeft(value1, shift)
        shift = -shift;
    } else {
        shift = Math.floor(Math.log2(value1[i] / value2[j]));
        value2 = shiftLeft(value2, shift);
    }

    while (i < value1.length - 1 && j < value2.length - 1 && value1[i] == value2[j]) {
        i++;
        j++;
    }

    if (value1[i] < value2[j]) {
        shift--;
    }

    return shift + ((value1.length - i) - (value2.length - j)) * BITS_IN_BYTE;
}


export function gausF(matrix, size, size2) {
    let result = new Array(matrix.length);
    for (let i = 0; i < size2; i++) {
        result[i] = matrix[i].slice();
    }

    for(let j = 0, t = 0; t < size2 && j < size; j++) {
        let byte = Math.floor(j / BITS_IN_BYTE);
        let bit = 1 << (BITS_IN_BYTE - 1 - j % BITS_IN_BYTE);

        for (let k = t; k < size2; k++) {
            if (result[k][byte] & bit) {
                let tmp = result[t];
                result[t] = result[k];
                result[k] = tmp;
                for (let r = t + 1; r < size2; r++) {
                    if (result[r][byte] & bit) {
                        result[r] = valueXOR(result[r], result[t]);
                    }
                }
                t++;
                break;
            }
        }
    }

    return result;
}


export function gausB(matrix, size, size2) { // first columns then rows just because
    let result = new Array(matrix.length);
    for (let i = 0; i < size2; i++) {
        result[i] = matrix[i].slice();
    }

    for(let j = size - 1, t = size2 - 1; t >= 0 && j >= 0; j--) {
        let byte = Math.floor(j / BITS_IN_BYTE);
        let bit = 1 << (BITS_IN_BYTE - 1 - j % BITS_IN_BYTE);

        for (let k = t; k >= 0; k--) {
            if (result[k][byte] & bit) {
                let tmp = result[t];
                result[t] = result[k];
                result[k] = tmp;
                for (let r = t - 1; r >= 0; r--) {
                    if (result[r][byte] & bit) {
                        result[r] = valueXOR(result[r], result[t]);
                    }
                }
                t--;
                break;
            }
        }
    }

    return result;
}


export function inverseMatrix(matrix, size) {
    let e = genEMatrix(size);
    let connected = new Array(matrix.length);

    for (let i = 0; i < size; i++) {
        connected[i] = new Uint8Array([...matrix[i], ...e[i]]);
    }

    connected = gausF(connected, matrix[0].length * BITS_IN_BYTE + e[0].length * BITS_IN_BYTE, size);

    for (let i = 0; i < size; i++) {
        connected[i] = shiftLeft(connected[i], matrix[0].length * BITS_IN_BYTE, true);
    }

    connected = gausB(connected, matrix[0].length * BITS_IN_BYTE + e[0].length * BITS_IN_BYTE, size);

    for (let i = 0; i < size; i++) {
        connected[i] = connected[i].slice(0, e[0].length);
    }

    return connected;
}


export function findKernel(matrix, size1, size2) { // size2 must be bigger
    let identity = genEMatrix(size2);
    let result = new Array(size2 + size1);
    let i;

    for (i = 0; i < size1; i++) 
        result[i] = matrix[i].slice();

    for (let j = 0; j < size2; j++)
        result[i + j] = identity[j].slice();

    result = transpose(result, size1 + size2, size2);
    result = gausF(result, size1 + size2, size2);

    for (i = 0; i < size2 && countOnes(result[i], size1) > 0; i++);
    
    for (let j = 0; j + i < size2; j++)
        result[j] = shiftLeft(result[j + i], size1).slice(0, Math.ceil(size2 / BITS_IN_BYTE));

    return result.slice(0, size2 - i);
}


export function slau(matrix, size2, size, count, b = new Uint8Array(Math.ceil(matrix.length / BITS_IN_BYTE))) { // may be crap
    let gaussed = new Array(size2);

    for (let i = 0; i < gaussed.length; i++)
        gaussed[i] = new Uint8Array([...matrix[i], getBit(b, i)]);

    gaussed = gausB(gaussed, size, gaussed.length);
    let result = [new Uint8Array(Math.ceil(size / BITS_IN_BYTE))];
    let current_size = -1;

    for (let i = 0; i < gaussed.length; i++) {
        let current_sliced = gaussed[i].slice(0, gaussed[i].length - 1);
        let j;
        for (j = size - 1; j > current_size; j--)
            if (getBit(gaussed[i], j) == 1)
                break;
            
        if (j > current_size) {
            let tmp = j - current_size;

            let additional = multipleRandoms(size, Math.ceil(count / result.length), valuePow(genValue(2), genValue(tmp - 1)));
            let new_result = [];

            for (let l = 1; l < additional.length; l++) {
                additional[l] = shiftLeft(additional[l], size - j);
                for (let k = 0; k < result.length; k++) {
                    let new_val = valueXOR(result[k], additional[l]);
                    if (countOnes(valueAND(new_val, current_sliced), size) % 2 != gaussed[i][gaussed[i].length - 1]) {
                        setBit(new_val, j);
                    }
                    new_result.push(new_val);
                }
            }

            additional[0] = shiftLeft(additional[0], size - j);
            for (let k = 0; k < result.length; k++) {
                result[k] = valueXOR(result[k], additional[0]);
                if (countOnes(valueAND(result[k], current_sliced), size) % 2 != gaussed[i][gaussed[i].length - 1]) {
                    setBit(result[k], j);
                }
            }

            result = result.concat(new_result);

            current_size = j;
        }
    }

    //let test = matrixMul(result, matrix, result.length, matrix.length, size);

    return result.slice(0, count);
}


export function valueDiv(value1, value2) {
    if (valueComp(value1, value2) < 0 || valueComp(value1, new Uint8Array([0])) == 0 || valueComp(value2, new Uint8Array([0])) == 0) {
        return [0, value1];
    }

    let result = new Uint8Array(value1.length);

    while (valueComp(value1, value2) >= 0) {
        let tmp = valueDivStep(value1, value2);
        setBit(result, result.length * BITS_IN_BYTE - 1 - tmp);

        value1 = shiftLeft(valueSub(shiftRight(value1, tmp, true), value2, false), tmp, true);

    }

    let i;
    i = 0;
    while(i < result.length && result[i++] == 0);
    result = result.subarray(i - 1, result.length);
    i = 0;
    while(i < value1.length && value1[i++] == 0);
    value1 = value1.subarray(i - 1, value1.length);

    return [result, value1];
}


export function valuePow(value, pow, mod = new Uint8Array([0]), mul = valueMul, composit_div = valueDiv, def = new Uint8Array([1])) {
    if (valueComp(pow, new Uint8Array([0])) == 0)
        return def;

    let result = valuePow(composit_div(mul(value, value), mod)[1], shiftRight(pow, 1), mod, mul, composit_div, def);

    if (pow[pow.length - 1] & 1 == 1)
        result = composit_div(mul(result, value), mod)[1];

    return result
}


export function extendedEuclid(value1, value2, 
    sum = valueSum, mul = valueMul, 
    composit_div = valueDiv, 
    checker = (_, __, value) => valueComp(value, new Uint8Array([0])) == 0,
    a0 = new Uint8Array([1]),
    a1 = new Uint8Array([0]),
    b0 = new Uint8Array([0]),
    b1 = new Uint8Array([1])
) {
    let r0 = value1;
    let r1 = value2;
    let tmp;

    let i = 0;
    let div = composit_div(r0, r1);
    while (!checker(a1, b1, r1)) {
        r0 = r1;
        r1 = div[1];

        tmp = a1;
        a1 = sum(a0, mul(a1, div[0]));
        a0 = tmp;

        tmp = b1;
        b1 = sum(b0, mul(b1, div[0]));
        b0 = tmp;

        i++;
        div = composit_div(r0, r1);
    }

    return [r0, a0, b0, i, r1, a1, b1]; // b0 <= 0 and a0 >= 0 if i % 2 == 0 and i != 1
}


export function valueXOR(value1, value2) {
    if (value1.length != value2.length) {
        throw new Error('Invalid parameters');
    }

    let result = new Uint8Array(value1.length);

    for (let i = value1.length; i >= 0; i--) {
        result[i] = value1[i] ^ value2[i];
    }

    return result
}


export function valueAND(value1, value2) {
    if (value1.length != value2.length) {
        throw new Error('Invalid parameters');
    }

    let result = new Uint8Array(value1.length);

    for (let i = value1.length; i >= 0; i--) {
        result[i] = value1[i] & value2[i];
    }

    return result
}


export function mirrorBits(byt) {
    let byte = byt;
    for (let i = 0; i < BITS_IN_BYTE / 2; i++) {
        let diff = (BITS_IN_BYTE - i * 2 - 1);
        let tmp1 = byte & (0b00000001 << i);
        let tmp2 = byte & (0b10000000 >> i);
        let tmp = (tmp1 ^ (tmp2 >> diff)) | ((tmp1 << diff) ^ tmp2);
        byte ^= tmp
    }
    return byte;
}


export function mirrorBytes(val) {
    let value = new Uint8Array(val);
    for (let i = 0; i < Math.floor(value.length / 2); i++) {
        let tmp = value[i];
        value[i] = value[value.length - i - 1];
        value[value.length - i - 1] = tmp;
    }
    return value;
    //return val;
}


export function mirrorValue(val) {
    let value = mirrorBytes(val);

    for (let i = 0; i < value.length; i++) {
        value[i] = mirrorBits(value[i]);
    }

    return value;
}


export function genValue(number) {
    if (number == 0) {
        return new Uint8Array([0]);
    }
    let result = [];
    
    while (number > 0) {
        result.push(number & MAX_BYTE);
        number >>= BITS_IN_BYTE;
    }

    return new Uint8Array(result.reverse());
}
