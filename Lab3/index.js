import * as cypher from "./don't_know_how_to_call_it.js"
import fs from 'fs';


function main() {
    const [,, mode, inputFile, outputFile, key1, key2] = process.argv;

    if (!mode || !inputFile || !outputFile || !key1 || key1.length % 2 != 0 || mode === "decrypt" && (!key2 || key2.length % 2 != 0)) {
        console.error('Usage: node cypher.js <encrypt|decrypt> <inputFile> <outputFile> <key|key1 key2>');
        process.exit(1);
    }

    // const mode = "encrypt";
    // const inputFile = "test.txt";
    // const outputFile = "test_result.txt";
    // const key1 = "01fffffffffffff7ffffffffffffb800000000000100000000000001"

    // const mode = "decrypt";
    // const inputFile = "test_result.txt";
    // const outputFile = "test.txt";
    // const key1 = "3ffffffffffffeffffffffffffff";
    // const key2 = "07ffffffffffffffffffffffffff";

    const inputData = fs.readFileSync(inputFile);

    let resultData;
    if (mode === 'encrypt') {
        resultData = cypher.encrypt(inputData, Buffer.from(key1, "hex"));
    } else if (mode === 'decrypt') {
        resultData = cypher.decrypt(inputData, [Buffer.from(key1, "hex"), Buffer.from(key2, "hex")]);
    } else {
        console.error('Invalid mode! Use "encrypt" or "decrypt".');
        process.exit(1);
    }

    if (resultData == null) {
        console.error('Key is not suitable');
        process.exit(1);
    }

    // Write the result to the output file
    fs.writeFileSync(outputFile, Buffer.from(resultData));

    console.log(`${mode.charAt(0).toUpperCase() + mode.slice(1)}ion complete.`);
}

main();