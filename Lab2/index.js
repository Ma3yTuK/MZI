import * as cypher from "./don't_know_how_to_call_it.js"
import fs from 'fs';


const KEY = new Uint8Array( [ 
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001,
    0b01000001
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
        resultData = cypher.processData(inputData, KEY, false);
    } else if (mode === 'decrypt') {
        resultData = cypher.processData(inputData, KEY, true);
    } else {
        console.error('Invalid mode! Use "encrypt" or "decrypt".');
        process.exit(1);
    }

    // Write the result to the output file
    fs.writeFileSync(outputFile, Buffer.from(resultData));

    console.log(`${mode.charAt(0).toUpperCase() + mode.slice(1)}ion complete.`);
}

main();