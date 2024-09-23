const VALUE_SIZE = 4;
const SHIFT = 11;
const BITS_IN_BYTE = 8;
const X_SIZE = 8;


const K_TABLE = [
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ],
    [ 
        0b0000,
        0b0001,
        0b0010,
        0b0011,
        0b0100,
        0b0101,
        0b0110,
        0b0111,
        0b1000,
        0b1001,
        0b1010,
        0b1011,
        0b1100,
        0b1101,
        0b1110,
        0b1111
    ]
];


export let N = [ new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array(VALUE_SIZE), new Uint8Array([0b00000001, 0b00000001, 0b00000001, 0b00000001]), new Uint8Array([0b00000001, 0b00000001, 0b00000001, 0b00000100]) ];


function valueSum(value1, value2) {
    let result = new Uint8Array(VALUE_SIZE)
    let acc = 0;

    for (let i = VALUE_SIZE - 1; i >= 0; i--) {
        acc = value1[i] + value2[i] + acc;
        result[i] = acc % (1 << BITS_IN_BYTE);
        acc = Math.floor(acc / (1 << BITS_IN_BYTE));

        if (acc < 0)
            acc = 0;
    }

    return [result, acc]
}

function valueXOR(value1, value2) {
    let result = new Uint8Array(VALUE_SIZE)

    for (let i = VALUE_SIZE; i >= 0; i--) {
        result[i] = value1[i] ^ value2[i];
    }

    return result
}

function shiftLeft(bytes, shift) {
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

    bytes[bytes.length - 1] |= tmp;
}

function mirrorByte(byt) {
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

function mirrorValue(val) {
    let value = new Uint8Array(val);
    for (let i = 0; i < VALUE_SIZE / 2; i++) {
        let tmp = mirrorByte(value[i]);
        value[i] = mirrorByte(value[VALUE_SIZE - i - 1]);
        value[VALUE_SIZE - i - 1] = tmp;
    }
    return value;
    //return val;
}

export let CM = [
    function(value1, value2) {
        return valueSum(value1, value2)[0];
    },
    function(value1, value2) {
        return valueXOR(value1, value2);
    },
    function(value1, value2) {
        return valueSum(value1, value2)[0];
    },
    function(value1, value2) {
        let result = valueSum(value1, value2);
        
        if (result[1] > 0)
            return result[1] + 1

        return result[0];
    },
    function(value1, value2) {
        return (value1[VALUE_SIZE - 1] + value2[VALUE_SIZE - 1]) % 2;
    }
];

export function R(val) {
    let value = new Uint8Array(val);

    shiftLeft(value, (SHIFT - BITS_IN_BYTE));
    shiftLeft(value, BITS_IN_BYTE);

    return value;
}

export function K(val) {
    let value = new Uint8Array(val);

    const mod = (1 << (BITS_IN_BYTE / 2))

    for (let i = 0; i < VALUE_SIZE; i++) {
        value[i] = K_TABLE[i * 2][Math.floor(value[i] / mod)] * mod + K_TABLE[i * 2 + 1][value[i] % mod]
    }

    return value;
}

export function X(W) {
    let result = Array(X_SIZE);

    for (let i = 0; i < X_SIZE; i++) {
        result[i] = mirrorValue(W.slice(i, i + VALUE_SIZE));
    }

    return result;
}

export function N01(value) {
    N[0] = mirrorValue(value.slice(0, VALUE_SIZE))
    N[1] = mirrorValue(value.slice(VALUE_SIZE, VALUE_SIZE * 2));
}

export function T() {
    return new Uint8Array( [...mirrorValue(N[1]), ...mirrorValue(N[0])] );
}