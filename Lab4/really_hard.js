import * as helpers from "./helper_functions.js";

const BITS_IN_BYTE = 8;
let every_val;
let every_val_index;
let g = [];
let Ls = [];


function generationHelper(m, result, i, count) {
    if (count == 0) {
        try {
            initialize(m, result);
            return result;
        } catch (e) {
            return null;
        }
    }

    while (i < m - count) {
        result ^= 1 << (m - i);

        let calculated = generationHelper(m, result, i + 1, count - 1);
        if (calculated !== null) {
            return calculated;
        }

        result ^= 1 << (m - i);
        i++;
    }

    return null;
}


export function selectBase(m) { // selects base by trying, may not work for some bases
    let max = 1 << m;
    let result = max | 1;

    for (let i = 1; i < m; i += 2) {
        let calculated = generationHelper(m, result, 1, i);
        if (calculated !== null) {
            return calculated;
        }
    }

    throw new Error("Cannot find base");
}


export function initialize(m, base) {
    let max = 1 << m;
    every_val = new Array(max - 1);
    every_val_index = new Array(max - 1);

    let val = 1;
    for (let i = 0; i < max - 1; i++) {
        if (val == every_val[0]) {
            throw new Error("Not this time");
        }
        every_val[i] = val;
        every_val_index[val] = i;

        val <<= 1;
        if (val >= max) {
            val ^= base;
        }
    }
}


function generationCompositHelper(m, ns, result, i, count) {
    if (count == 0)
        return rabin_irreducability_test(result, ns, m);
        
    while (i < result.length - count) {
        result[i] = 1;

        if (generationCompositHelper(m, ns, result, i + 1, count - 1)) {
            return true;
        }

        result[i] = 0;
        i++;
    }

    return false;
}


export function generateCompositBase(m, t) {
    let ks = get_prime_divisors(t);
    let ns = new Array(ks.length); // has to be sorted and ks has to end with 1
    let max = 1 << m;

    for (let i = 0; i < ks.length; i++) {
        ns[i] = t / ks[ks.length - i - 1];
    }

    let result = new Array(t + 1).fill(0);
    result[0] = 1;
    result[result.length - 1] = 1;

    for (let i = 1; i < t; i += 2) {
        let tmpResult = [...result]
        if (generationCompositHelper(m, ns, tmpResult, 1, i)) {
            return tmpResult;
        }
    }

    for (let i = 0; i < max; i++) {
        let tmpResult = [...result];
        for (let j = 0; j < max; j++) {
            tmpResult[tmpResult.length - 1] = j;
            tmpResult[tmpResult.length - 2] = i;
            if (rabin_irreducability_test(tmpResult, ns, m)) {
                return tmpResult;
            }
        }
    }

    throw new Error("Cannot find composit base");
}


export function generateVals(m, n) {
    let max = 1 << m;

    let vals = helpers.randomVals(max, n);
    let indexes = Array(n).fill(0).map( (_, i) => i );

    let Ls = new Array(n);
    let i;
    for (i = 0; i < n; i++) {
        let index = Math.floor(Math.random() * (indexes.length - i));
        Ls[i] = vals[indexes[index]];
        indexes[index] = indexes[indexes.length - 1 - i];
    }

    return Ls;
}


export function valsSumOrSub(val1, val2) {
    return val1 ^ val2;
}


export function valsMul(val1, val2) {
    if (val1 == 0 || val2 == 0)
        return 0;

    return every_val[(every_val_index[val1] + every_val_index[val2]) % every_val.length];
}


export function valsDiv(val1, val2) {
    if (val1 == 0 || val2 == 0)
        return 0;

    return every_val[(every_val_index[val1] + every_val.length - every_val_index[val2]) % every_val.length];
}


export function valsPow(val, pow) {
    if (pow == 0)
        return 1;

    if (val == 0)
        return 0;

    return every_val[every_val_index[val] * pow % every_val.length];
}


function extend(twoDArray, m) {
    let result = new Array(twoDArray.length * m).fill(0);
    let actual_size = Math.ceil(twoDArray[0].length / BITS_IN_BYTE);

    for (let i = 0; i < twoDArray.length; i++) {
        for (let k = 0; k < m; k++) {
            result[i * m + k] = new Uint8Array(actual_size);
            let right_shift = (m - 1 - k);

            for (let j = 0; j < twoDArray[0].length; j++) {
                let left_shift = BITS_IN_BYTE - 1 - j % BITS_IN_BYTE;
                let t = ((twoDArray[i][j] >> right_shift) & 1) << left_shift;
                result[i * m + k][Math.floor(j / BITS_IN_BYTE)] |= ((twoDArray[i][j] >> right_shift) & 1) << left_shift;
            }
        }
    }

    return result;
}


function getH(n, t) {
    let result = new Array(t);
    result[0] = new Array(n);

    for (let i = 0; i < n; i++) {
        result[0][i] = valsDiv(1, calculate(g, Ls[i]));
    }

    for (let i = 1; i < t; i++) {
        result[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            result[i][j] = valsMul(result[i-1][j], Ls[j]);
        }
    }

    return result;
}


function getHBin(m, n, t) {
    return extend(getH(n, t), m);
}


export function generateG(m, n, t) {
    return helpers.findKernel(getHBin(m, n, t), t * m, n); // i guessed kernel for H should be returned
}


function simplePolyMul(poly1, poly2) {
    if (poly1.length == 0 || poly2.length == 0) 
        return [];

    let result = new Array(poly1.length + poly2.length - 1);

    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            result[i + j] = valsSumOrSub(result[i + j], valsMul(poly1[i], poly2[j]));
        }
    }

    return result;
}


function simplePolySumOrSub(poly1, poly2) {
    if (poly1.length == 0 || poly2.length == 0) 
        return poly1.length > poly2.length ? [...poly1] : [...poly2];

    let adder, result;

    if (poly1.length > poly2.length) {
        result = new Array(...poly1);
        adder = poly2;
    } else {
        result = new Array(...poly2);
        adder = poly1;
    }

    for (let i = 0; i < adder.length; i++) {
        result[result.length - 1 - i] = valsSumOrSub(result[result.length - 1 - i], adder[adder.length - 1 - i]);
    }

    let i = 0;
    while (result[i] == 0) i++;

    return result.slice(i); // may break if i >= result.length
}


function simplePolyDiv(poly1, poly2) {
    if (poly1.length == 0 || poly2.length == 0 || poly1.length < poly2.length)
        return [[], poly1];

    let resultMod = poly1.slice(1, poly2.length);
    let result = new Array(poly1.length - poly2.length + 1);
    let first = poly1[0];
    
    for (let i = 0; i < result.length; i++) {
        result[i] = valsDiv(first, poly2[0]);
        resultMod[resultMod.length - 1] = poly1[i + resultMod.length];

        if (poly2.length > 1) {
            first = valsSumOrSub(resultMod[0], valsMul(poly2[1], result[i]));
        } else {
            if (i + 1 < poly1.length)
                first = poly1[i + 1];
            else
                first = 0;
        }

        for (let j = 0; j < resultMod.length - 1; j++) {
            resultMod[j] = valsSumOrSub(resultMod[j + 1], valsMul(poly2[j + 2], result[i]));
        }
    }

    resultMod = [first, ...resultMod.slice(0, resultMod.length - 1)];

    let i = 0;
    while (resultMod[i] == 0) i++;

    //let test = simplePolySumOrSub(simplePolyMul(result, poly2), resultMod.slice(i));

    return [result, resultMod.slice(i)]; // may break if i >= resultMod.length
}


function polyInverse(poly1) {
    let eu = helpers.extendedEuclid(g, poly1, simplePolySumOrSub, simplePolyMul, simplePolyDiv, (_, __, poly) => poly.length == 0, [1], [0], [0], [1]);
    return simplePolyMul(eu[2], [valsDiv(1, eu[0][0])]);
}


function polySqrt(poly, m) {
    let pow = helpers.valuePow(new Uint8Array([2]), helpers.genValue((g.length - 1) * m - 1));
    //let tmp = helpers.valuePow(poly, pow, g, simplePolyMul, simplePolyDiv, [1]);
    //let tmp1 = simplePolyDiv(simplePolyMul(tmp, tmp), g)[1];
    return helpers.valuePow(poly, pow, g, simplePolyMul, simplePolyDiv, [1]);
}


export function initialize_composit(new_g, new_Ls) {
    g = new_g;
    Ls = new_Ls;
}


function calculate(poly, x) {
    if (poly.length == 0)
        return 0;

    let result = 0;

    for (let i = 0; i < poly.length; i++) {
        result = valsSumOrSub(result, valsMul(valsPow(x, poly.length - 1 - i), poly[i]));
    }

    return result;
}


function genSyndrome(c) {
    let result = [];

    for (let i = 0; i < Ls.length; i++) {
        if (helpers.getBit(c, i) == 1) {
            let gLs = calculate(g, Ls[i]);
            let tmp = simplePolySumOrSub(g, [gLs]);
            tmp = simplePolyDiv(tmp, [1, Ls[i]])[0]; // not sure but should be devisible
            tmp = simplePolyMul(tmp, [valsDiv(1, gLs)]);
            result = simplePolySumOrSub(result, tmp);
            result = simplePolyDiv(result, g)[1];
        }
    }

    return result;
}


function genSyndrome1(c) {
    let result = [];

    for (let i = 0; i < Ls.length; i++) {
        if (helpers.getBit(c, i) == 1) {
            result = simplePolyDiv(simplePolySumOrSub(result, polyInverse(simplePolySumOrSub([Ls[i]], [1, 0]))), g)[1];
        }
    }

    return result;
}


export function patterson(c, m, t) {
    let S = genSyndrome(c);
    //let S1 = genSyndrome1(c);

    if (S.length == 0)
        return c;

    let T = polyInverse(S);
    let r = polySqrt(simplePolySumOrSub(T, [1, 0]), m);
    //let isS = simplePolyDiv(simplePolyMul(r, r), g)[1];

    let eu = helpers.extendedEuclid(g, r, simplePolySumOrSub, simplePolyMul, simplePolyDiv, (_, __, a) => a.length - 1 <= Math.floor(t / 2), [1], [], [], [1]); // condition is questionable

    let o = simplePolyMul(eu[4], eu[4]);
    o = simplePolySumOrSub(o, simplePolyMul([1, 0], simplePolyMul(eu[6], eu[6])));

    let e = new Uint8Array(c.length);
    for (let i = 0; i < Ls.length; i++) {
        if (calculate(o, Ls[i]) == 0) {
            helpers.setBit(e, i);
        }
    }

    //let Ss = genSyndrome(new Uint8Array([6, 0]));

    return helpers.valueXOR(c, e);
}


function get_prime_divisors(number) {
    let divisors = [1];
    let primes = [];
    let current_number = 2;
    
    while (number >= current_number) {
        for (let prime in primes) {
            if (current_number % prime == 0) {
                current_number++;
                continue;
            }
        }

        // here current_number is prime
        primes.push(current_number);

        if (number % current_number == 0) {
            divisors.push(current_number);
            while (number % current_number == 0)
                number /= current_number;
        } 
        current_number++;
    }

    return divisors;
}


function rabin_irreducability_test(P, ns, m) {
    let currentPoly = [1, 0];
    let currentMul = ns[0] * m;
    let j = 0;

    for (let i = 0; i < ns.length - 1; i++) {
        while (j < currentMul) {
            currentPoly = simplePolyDiv(simplePolyMul(currentPoly, currentPoly), P)[1];
            j++;
        }
        
        currentMul = ns[i + 1] * m;

        let h = simplePolySumOrSub(currentPoly, [1, 0]);
        let g = helpers.extendedEuclid(P, h, simplePolySumOrSub, simplePolyMul, simplePolyDiv, (_, __, poly) => poly.length == 0, [1], [0], [0], [1])[0];

        if (g.length != 1 || g[0] != 1) {
            return false;
        }
    }

    while (j < currentMul) {
        currentPoly = simplePolyDiv(simplePolyMul(currentPoly, currentPoly), P)[1];
        j++;
    }

    let g = simplePolySumOrSub(currentPoly, [1, 0]);

    if (g.length == 0)
        return true;
    return false;
}