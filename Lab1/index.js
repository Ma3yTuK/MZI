import * as cypher from "./cypher.js"
import fs from 'fs';


const KEY = new Uint8Array( [ 
    0b00111010,
    0b01111111,
    0b11000001,
    0b10011011,
    0b11100010,
    0b00000101,
    0b10101101,
    0b01101100,
    0b11110000,
    0b00010100,
    0b00101110,
    0b10001000,
    0b10110111,
    0b01001101,
    0b00100011,
    0b01011001,
    0b10001010,
    0b11010011,
    0b00000001,
    0b01101111,
    0b10110100,
    0b10010000,
    0b00111110,
    0b01110111,
    0b11001001,
    0b00010010,
    0b10100101,
    0b01001000,
    0b11110110,
    0b01111101,
    0b00101011,
    0b11101110
] );


function main() {
    const [,, mode, inputFile, outputFile] = process.argv;

    if (!mode || !inputFile || !outputFile) {
        console.error('Usage: node cypher.js <encrypt|decrypt> <inputFile> <outputFile>');
        process.exit(1);
    }

    // const mode = "encrypt";
    // const inputFile = "test.txt";
    // const outputFile = "test_result.txt";

    // const mode = "decrypt";
    // const inputFile = "test_result.txt";
    // const outputFile = "test.txt";

    // Read the input file
    const inputData = fs.readFileSync(inputFile);

    let resultData;
    if (mode === 'encrypt') {
        resultData = cypher.cypher_data(inputData, KEY);
    } else if (mode === 'decrypt') {
        resultData = cypher.decypher_data(inputData, KEY);
    } else {
        console.error('Invalid mode! Use "encrypt" or "decrypt".');
        process.exit(1);
    }

    // Write the result to the output file
    fs.writeFileSync(outputFile, Buffer.from(resultData));

    console.log(`${mode.charAt(0).toUpperCase() + mode.slice(1)}ion complete.`);
}

main();