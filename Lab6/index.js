import * as hf from "./helper_functions.js"
import fs, { existsSync } from 'fs';
import { StringDecoder } from 'string_decoder';
import * as ghost from "./gost.js";


const BITS_IN_BYTE = 8;


function main() {
    //let p = Buffer.from("8000000000000000000000000000000000000000000000000000000000000431", "hex");
    //let q = Buffer.from("8000000000000000000000000000000150fe8a1892976154c59cfc193accf5b3", "hex");
    //let a = Buffer.from("07", "hex");
    //let P = [Buffer.from("02", "hex"), Buffer.from("08e2a8a0e65147d4bd6316030e16d19c85c97f0a9ca267122b96abbcea7e8fc8", "hex")];
    // let message = Buffer.from("Something", "hex");

    //let keys = ghost.genKey(p, P, q, a);
    // let result = ghost.generate_signature(message, keys[1]);
    // result = ghost.verify_signature(message, result, keys[0]);
    // console.log(result);

    const [,, mode, arg1, arg2, arg3, arg4, arg5, arg6, arg7] = process.argv;

    if (mode === "generate") {    
        let keys;

        try {
            const [p, q, a, P1, P2] = [Buffer.from(arg1, "hex"), Buffer.from(arg2, "hex"), Buffer.from(arg3, "hex"), Buffer.from(arg4, "hex"), Buffer.from(arg5, "hex")];
            let P = [P1, P2];

            keys = ghost.genKey(p, P, q, a);
        } catch(error) {
            console.log("Invalid parameters")
        }

        try {
            hf.writeObjectToFile(keys[0], arg6);
        } catch (error) {
            console.error(`Cannot write to file ${arg6}`);
            return;
        }

        try {
            hf.writeObjectToFile(keys[1], arg7);
        } catch (error) {
            console.error(`Cannot write to file ${arg7}`);
            return;
        }
        
        console.log(`Keys generated successfully`);

    } else if (mode === "sign" || mode === "check") {
        
        const [firstFile, secondFile, keyFile] = [arg1, arg2, arg3];

        if (!existsSync(arg1) || !existsSync(arg3) || (mode == "check" && !existsSync(arg2))) {
            console.error("Invalid arguments");
            return;
        }

        const message = fs.readFileSync(firstFile);
        let result;
        
        try {
            const key = hf.readObjectFromFile(keyFile);

            if (mode === "sign") {
                result = ghost.generate_signature(message, key);
            } else {
                result = ghost.verify_signature(message, fs.readFileSync(secondFile), key);
            }

            //console.log(new StringDecoder('utf8').write(data));

        } catch (error) {
            console.error("Invalid arguments");;
            return;
        }

        if (mode == "sign") {
            try {
                fs.writeFileSync(secondFile, result);
            } catch (error) {
                console.error(`Cannot write to file ${secondFile}`);
                return;
            }
        } else {
            if (result) {
                console.log("Verification successfull");
                return;
            } else {
                console.log("Verification is not successfull");
                return;
            }
        }

        console.log("Finished successfully");

    } else {
        console.error("Invalid mode");
        return;
    }
}

main();