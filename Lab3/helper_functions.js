const BITS_IN_BYTE = 8;



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


export function valueDiv(value1, value2, trunc1 = true, trunc2 = true) {
    if (valueComp(value1, value2) < 0 || valueComp(value1, new Uint8Array([0])) == 0 || valueComp(value2, new Uint8Array([0])) == 0) {
        return [0, value1];
    }

    let result = new Uint8Array(value1.length);

    while (valueComp(value1, value2) >= 0) {
        let tmp = valueDivStep(value1, value2);
        setBit(result, result.length * BITS_IN_BYTE - 1 - tmp);

        value1 = shiftLeft(valueSub(shiftRight(value1, tmp, true), value2, false), tmp, true);

    }

    if (trunc1) {
        let i = 0;
        while(i < result.length && result[i++] == 0);
        result = result.subarray(i - 1, result.length);
    }

    if (trunc2) {
        let i = 0;
        while(i < value1.length && value1[i++] == 0);
        value1 = value1.subarray(i - 1, value1.length);
    }

    return [result, value1];
}


export function valuePow(value, pow, mod) {
    if (valueComp(pow, new Uint8Array([1])) == 0)
        return value;

    let result = valuePow(valueDiv(valueMul(value, value), mod)[1], shiftRight(pow, 1), mod);

    if (pow[pow.length - 1] & 1 == 1)
        result = valueDiv(valueMul(result, value), mod)[1];

    return result
}


export function extendedEuclid(value1, value2) {
    let r0 = value1;
    let r1 = value2;
    let a0 = new Uint8Array([1]);
    let a1 = new Uint8Array([0]);
    let b0 = new Uint8Array([0]);
    let b1 = new Uint8Array([1]);
    let zero = new Uint8Array([0]);
    let tmp;

    let i = 0;
    let div = valueDiv(r0, r1);
    while (valueComp(r1, zero) != 0) {
        r0 = r1;
        r1 = div[1];

        tmp = a1;
        a1 = valueSum(a0, valueMul(a1, div[0]));
        a0 = tmp;

        tmp = b1;
        b1 = valueSum(b0, valueMul(b1, div[0]));
        b0 = tmp;

        i++;
        div = valueDiv(r0, r1);
    }

    return [r0, a0, b0, i]; // b0 <= 0 and a0 >= 0 if i % 2 == 0 and i != 1
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