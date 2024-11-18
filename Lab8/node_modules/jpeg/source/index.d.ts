declare namespace jpeg {

	/**
	 * @typedef Format
	 */
	enum Format { rgba, yuv }

	/**
	 * @typedef Image
	 */
	interface Image {
		data: Uint8ClampedArray;
		format: Format;
		height: number;
		width: number;
	}

	/**
	 * Decodes a JPEG image.
	 *
	 * @param {Buffer} data - A JPEG-encoded buffer.
	 * @param {Format} [format=Format.rgba] - The desired output format, either RGBA or YUV I420, defaults to RGBA.
	 * @returns {Promise<Image>} A promise resolving to the decoded image.
	 */
	function decode(data: Buffer, format?: Format): Promise<Image>;

	/**
	 * Encodes a raw image as JPEG.
	 *
	 * @param {Image} image - An image.
	 * @param {Number} [quality=90] - The desired output quality, between 0 and 100, defaults to 90.
	 * @returns {Promise<Buffer>} A promise resolving to the encoded buffer.
	 */
	function encode(image: Image, quality?: number): Promise<Buffer>;

}

export = jpeg;
