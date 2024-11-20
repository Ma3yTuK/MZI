import { StringDecoder } from 'string_decoder';
import sharp from 'sharp';
import { Color } from 'color-core';
import * as fs from 'fs';


const SWAP_FIRST_ROW = 3;
const SWAP_FIRST_COL = 4;
const SWAP_SECOND_ROW = 4;
const SWAP_SECOND_COL = 3;
const THRESHOLD = 30;
const MODE = 3;


function allignBuffer(message, mod, for_size = 4) {
    let old_size = message.length;
    let new_size = Math.ceil(Math.ceil((old_size + for_size) * 8 / mod) * mod / 8);

    let result = new Uint8Array(new_size);

    for (let i = 0; i < old_size; i++) {
        result[for_size + i] = message[i];
    }

    while(for_size > 0 && new_size > 0) {
        result[for_size - 1] = old_size & 0b11111111;
        for_size--;
        old_size >>= 8;
    }

    return result;
}


function deAllignBuffer(message, for_size = 4) {
    let new_length = 0;

    for (let i = 0; i < for_size; i++)
        new_length = (new_length << 8) + message[i];

    return message.slice(for_size, for_size + new_length);
}


function do_dct(colors, meta) {
    let result = new Array(colors.length).fill(0);

    for (let i = 0; i < Math.floor(meta.height / 8) * 8; i++) {
        for (let j = 0; j < Math.floor(meta.width / 8) * 8; j++) {

            let ai = 1;
                    let aj = 1;

                    if (i % 8 == 0)
                        ai = Math.SQRT1_2

                    if (j % 8 == 0)
                        aj = Math.SQRT1_2

            for (let x = Math.floor(i / 8) * 8; x < Math.floor((i + 8) / 8) * 8; x++) {
                for (let y = Math.floor(j / 8) * 8; y < Math.floor((j + 8) / 8) * 8; y++) {
                    result[i * meta.width + j] += ai * aj / 4 * colors[x * meta.width + y].y * Math.cos((2 * (x % 8) + 1) * (i % 8) * Math.PI / 16) * Math.cos((2 * (y % 8) + 1) * (j % 8) * Math.PI / 16);
                }
            }
        }
    }

    return result;
}


function insertMessage(dct, message, meta) {
    if (Math.floor(meta.width / 8) * Math.floor(meta.height / 8) < message.length * 8) {
        throw new Error("Message is too big");
    }

    for (let i = 0; i < meta.height - 8; i += 8) {
        for (let j = 0; j < meta.width - 8; j += 8) {
            let first = dct[(i + SWAP_FIRST_ROW) * meta.width + j + SWAP_FIRST_COL];
            let second = dct[(i + SWAP_SECOND_ROW) * meta.width + j + SWAP_SECOND_COL];
            
            let bit = i / 8 * Math.floor((meta.width - 8) / 8) + j / 8;
            let bit_value = message[Math.floor(bit / 8)] & (0b10000000 >> (bit % 8));

            if (bit_value == 0) {
                let tmp = first;
                first = second;
                second = tmp;
            }

            let diff = second - first;
            let th = THRESHOLD;

            if (diff < th) {
                if (MODE == 3) {
                    second += (th - diff) / 2;
                    first -= th - diff - (th - diff) / 2;
                }
                if (MODE == 2) {
                    second += (th - diff);
                }
                if (MODE == 1) {
                    first -= (th - diff);
                }
            }

            if (bit_value == 0) {
                let tmp = second;
                second = first;
                first = tmp;
            }

            dct[(i + SWAP_FIRST_ROW) * meta.width + j + SWAP_FIRST_COL] = first;
            dct[(i + SWAP_SECOND_ROW) * meta.width + j + SWAP_SECOND_COL] = second;
        }
    }
}


function retrieveMessage(dct, meta) {
    let message = new Uint8Array(Math.floor(meta.width / 8) * Math.floor(meta.height / 8) / 8);

    for (let i = 0; i < meta.height - 8; i += 8) {
        for (let j = 0; j < meta.width - 8; j += 8) {
            let first = dct[(i + SWAP_FIRST_ROW) * meta.width + j + SWAP_FIRST_COL];
            let second = dct[(i + SWAP_SECOND_ROW) * meta.width + j + SWAP_SECOND_COL];
            
            let bit = i / 8 * Math.floor((meta.width - 8) / 8) + j / 8;
            if (first < second) {
                message[Math.floor(bit / 8)] |= 0b10000000 >> (bit % 8);
            }
        }
    }

    return message;
}


function inverse_dct(dct, colors, meta) {

    for (let x = 0; x < Math.floor(meta.height / 8) * 8; x++) {
        for (let y = 0; y < Math.floor(meta.width / 8) * 8; y++) {
            colors[x * meta.width + y].y = 0;

            for (let i = Math.floor(x / 8) * 8; i < Math.floor((x + 8) / 8) * 8; i++) {
                for (let j = Math.floor(y / 8) * 8; j < Math.floor((y + 8) / 8) * 8; j++) {
                    let ai = 1;
                    let aj = 1;

                    if (i % 8 == 0)
                        ai = Math.SQRT1_2

                    if (j % 8 == 0)
                        aj = Math.SQRT1_2

                    colors[x * meta.width + y].y += ai * aj / 4 * dct[i * meta.width + j] * Math.cos((2 * (x % 8) + 1) * (i % 8) * Math.PI / 16) * Math.cos((2 * (y % 8) + 1) * (j % 8) * Math.PI / 16);
                }
            }
        }
    }
}


async function steganography(file_path, message, output_path) {
    let image = sharp(file_path);

    let meta = await image.metadata();
    let raw_image = await image.raw().toBuffer();

    message = allignBuffer(message, message.length * 8 + 32);

    let color_array = [];

    for (let i = 0; i < raw_image.length; i+=3) {
        color_array.push(new Color({ r: raw_image[i], g: raw_image[i + 1], b: raw_image[i + 2] }).toYuv());
    }

    let dct = do_dct(color_array, meta);
    insertMessage(dct, message, meta);
    inverse_dct(dct, color_array, meta);

    for (let i = 0; i < raw_image.length; i+=3) {
        let rgb = new Color(color_array[Math.floor(i / 3)]).toRgb();
        raw_image[i] = rgb.r;
        raw_image[i + 1] = rgb.g;
        raw_image[i + 2] = rgb.b;
    }

    await sharp(raw_image, { raw: { width: meta.width, height: meta.height, channels: 3 } }).jpeg().toFile(output_path);
}


async function retrieve(file_path) {
    let image = sharp(file_path);

    let meta = await image.metadata();
    let raw_image = await image.raw().toBuffer();

    let color_array = [];

    for (let i = 0; i < raw_image.length; i+=3) {
        color_array.push(new Color({ r: raw_image[i], g: raw_image[i + 1], b: raw_image[i + 2] }).toYuv());
    }

    let dct = do_dct(color_array, meta);
    let message = deAllignBuffer(retrieveMessage(dct, meta));

    return message;
}



async function main() {
    const [,, mode, arg1, arg2, arg3] = process.argv;

    if (!fs.existsSync(arg1)) {
        console.error("Invalid arguments");
        return;
    }
    
    try {
        if (mode == "insert") {
            let m = fs.readFileSync(arg1);
    
            if (!fs.existsSync(arg2)) {
                console.error("Invalid arguments");
                return;
            }
    
            await steganography(arg2, m, arg3);
    
            console.log("Done!");
        } else if (mode == "retrieve") {
            fs.writeFileSync(arg2, await retrieve(arg1));
    
            console.log("Done!");
        } else {
            console.log("Invalid mode!");
        }
    } catch (e) {
        if (e.message == "Message is too big")
            console.log(e.message);
        else
            console.log("Something went wrong");
    }
}

main();