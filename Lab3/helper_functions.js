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
    value[pos / BITS_IN_BYTE] |= 1 << (BITS_IN_BYTE - 1 - pos % BITS_IN_BYTE);
}


export function valueComp(value1, value2) {
    let i = 0;
    let j = 0;

    while(i < value1.length && value1[i] == 0) i++;
    while(j < value2.length && value2[j] == 0) j++;

    return (((value1.length - i) - (value2.length - j)) << BITS_IN_BYTE) + value1[i] - value2[j];
}


export function valueSum(value1, value2) {
    if (valueComp(value1, value2) < 0) {
        tmp = value1;
        value1 = value2;
        value2 = tmp;
    }

    let result = new Uint8Array(value1.length);
    let acc = 0;
    let mod = 1 << BITS_IN_BYTE
    
    let i;
    for (i = 0; i < result.length; i++) {
        acc = value1[value1.length - 1 - i] + value2[value2.length - 1 - i] + acc;
        result[result.length - 1 - i] = acc % mod;

        if (acc >= mod)
            acc = 1;
        else
            acc = 0;
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


export function valueSub(value1, value2) {
    if (valueComp(value1, value2) < 0) {
        throw new Error('Invalid args');
    }

    let result = new Uint8Array(value1.length);
    let acc = 0;
    let mod = 1 << BITS_IN_BYTE

    let i
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
    }

    return result
}


export function valueMul(value1, value2) {
    if (valueComp(value1, value2) < 0) {
        tmp = value1;
        value1 = value2;
        value2 = tmp;
    }

    let result = new Uint8Array(value1.length + value2.length);
    let acc = 0;
    let mod = 1 << BITS_IN_BYTE
    
    for (let i = 0; i < value2.length; i++) {
        let acc = 0;

        for (let j = 0; j < value1.length; j++) {
            acc = value1[value1.length - 1 - j] * value2[value2.length - 1 - i] + acc;
            result[value1.length + value2.length - 1 - i - j] += acc % mod;
            acc = Math.floor(acc, mod);
        }

        result[value2.length - 1 - i] += acc;
    }

    while(result.length > 1 && result[0] == 0) {
        result.shift();
    }

    return result
}


function valueDivStep(value1, value2, acc = 1) {
    let result = shiftLeft(value2, acc);

    if (valueComp(value1, result) < 0)
        return [value2, acc];

    result = valueDivStep(value1, result, acc * 2);

    let tmp = shiftLeft(result[0], acc);

    if (valueComp(value1, tmp) < 0)
        return result;
    
    return [tmp, result[1] + acc];
}


export function valueDiv(value1, value2) {
    if (valueComp(value1, value2) < 0) {
        throw new Error('Invalid args');
    }

    let result = new Uint8Array(value1.length);

    while (valueComp(value1, value2) >= 0) {
        let tmp = valueDivStep(value1, value2);
        setBit(result, result.length * BITS_IN_BYTE - tmp[1])        

        value1 = valueSub(value1, tmp[0]);
    }

    return result;
}


export function doMod(value, mod) {
    if (valueComp(value, mod) < 0) {
        throw new Error('Invalid args');
    }

    while (valueComp(value, mod) >= 0) {
        let tmp = valueDivStep(value, mod);
        value = valueSub(value, tmp[0]);
    }

    return value;
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