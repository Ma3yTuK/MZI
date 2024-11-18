import * as cypher from "./don't_know_how_to_call_it.js"
import * as hf from "./helper_functions.js"
import fs, { existsSync } from 'fs';
import { StringDecoder } from 'string_decoder';


const BITS_IN_BYTE = 8;


function main() {
    let p = Buffer.from("8000000000000000000000000000000000000000000000000000000000000431", "hex");
    let q = Buffer.from("8000000000000000000000000000000150fe8a1892976154c59cfc193accf5b3", "hex");
    let a = Buffer.from("07", "hex");
    let P = [Buffer.from("02", "hex"), Buffer.from("08e2a8a0e65147d4bd6316030e16d19c85c97f0a9ca267122b96abbcea7e8fc8", "hex")];
    
    let keys = cypher.genKey(p, P, q, a);

    const inputFile = "test.txt";
    const outputFile1 = "encrypted.txt";
    const outputFile2 = "decrypted.txt";

    const inputData = fs.readFileSync(inputFile);

    fs.writeFileSync(outputFile1, cypher.encrypt(inputData, keys[0]));
    fs.writeFileSync(outputFile2, cypher.decrypt(fs.readFileSync(outputFile1), keys[1]));
    console.log("sucess");

    // const [,, mode, arg1, arg2, arg3, arg4, arg5] = process.argv;

    // if (mode === "generate") {

    //     const [n, k, t] = [parseInt(arg1), parseInt(arg2), parseInt(arg3)];

    //     if (isNaN(n) || isNaN(k) || isNaN(t)) {
    //         console.error("Invalid key parameters");
    //         return;
    //     }

    //     if (1 << ((n - k) / t) !== n) {
    //         console.error("Invalid key parameters");
    //         return;
    //     }

    //     const keys = cypher.genKey(n, k, t);

    //     try {
    //         hf.writeObjectToFile(keys[0], arg4);
    //     } catch (error) {
    //         console.error(`Cannot write to file ${outputFile}`);
    //         return;
    //     }

    //     try {
    //         hf.writeObjectToFile(keys[1], arg5);
    //     } catch (error) {
    //         console.error(`Cannot write to file ${outputFile}`);
    //         return;
    //     }
        
    //     console.log(`Keys generated successfully`);

    // } else if (mode === "encrypt" || mode === "decrypt") {
        
    //     const [inputFile, outputFile, keyFile] = [arg1, arg2, arg3];

    //     if (!existsSync(arg1) || !existsSync(arg3)) {
    //         console.error("Invalid arguments");
    //         return;
    //     }

    //     const inputData = fs.readFileSync(inputFile);
        
    //     let data;
        
    //     try {
    //         const key = hf.readObjectFromFile(keyFile);

    //         if (mode === "encrypt") {
    //             data = cypher.encrypt(inputData, key);
    //         } else {

    //             if (inputData.length * BITS_IN_BYTE % key[key.length - 1] !== 0) {
    //                 console.error(`Invalid input file`);
    //                 return;
    //             }

    //             data = cypher.decrypt(inputData, key);
    //         }

    //         //console.log(new StringDecoder('utf8').write(data));

    //     } catch (error) {
    //         console.error(`Invalid key format`);
    //         return;
    //     }

    //     try {
    //         fs.writeFileSync(outputFile, data);
    //     } catch (error) {
    //         console.error(`Cannot write to file ${outputFile}`);
    //         return;
    //     }

    //     console.log("Finished successfully");

    // } else {
    //     console.error("Invalid mode");
    //     return;
    // }
}

main();