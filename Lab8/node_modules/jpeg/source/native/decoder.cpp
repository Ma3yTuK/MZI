#include "decoder.hpp"

nodeJpeg::Decoder::Decoder(
	Napi::Env environment,
	Napi::Uint8Array source,
	Format format
) :
	Napi::AsyncWorker(environment),
	format(format),
	promise(Napi::Promise::Deferred::New(environment)),
	source(source)
{}

void nodeJpeg::Decoder::Execute() {
	tjhandle handle = tj3Init(TJINIT_DECOMPRESS);
	if (!handle) {
		SetError("[nodeJpeg::Decoder::Execute] Failed to initialize");
		return;
	}
	if (tj3DecompressHeader(
		handle,
		source.Data(),
		source.ByteLength()
	)) {
		SetError("[nodeJpeg::Decoder::Execute] Failed to read header");
		tj3Destroy(handle);
		return;
	};
	int32_t height = tj3Get(handle, TJPARAM_JPEGHEIGHT);
	int32_t width = tj3Get(handle, TJPARAM_JPEGWIDTH);
	if (format == Format::yuv) {
		int32_t colorspace = tj3Get(handle, TJPARAM_COLORSPACE);
		// TODO: Support other colorspaces
		if (colorspace != TJCS_YCbCr) {
			SetError("[nodeJpeg::Decoder::Execute] Input image colorspace is not YUV");
			tj3Destroy(handle);
			return;
		}
		int32_t subsampling = tj3Get(handle, TJPARAM_SUBSAMP);
		// TODO: Support other subsamplings
		if (subsampling != TJSAMP_420) {
			SetError("[nodeJpeg::Decoder::Execute] Input image subsampling is not 4:2:0");
			tj3Destroy(handle);
			return;
		}
		// TODO: Support odd dimensions
		height = (height + 1) & ~1;
		width = (width + 1) & ~1;
		uint64_t size = tj3YUVBufSize(width, 1, height, subsampling);
		image = new Image(Format::yuv, width, height, size);
		std::memset(image->data, 0, size);
		if (tj3DecompressToYUV8(
			handle,
			source.Data(),
			source.ByteLength(),
			image->data,
			1
		)) {
			SetError("[nodeJpeg::Decoder::Execute] Failed to decode");
			delete image;
		}
	} else if (format == Format::rgba) {
		uint32_t pitch = width * 4;
		uint64_t size = pitch * height;
		image = new Image(Format::rgba, width, height, size);
		if (tj3Decompress8(
			handle,
			source.Data(),
			source.ByteLength(),
			image->data,
			pitch,
			TJPF_RGBA
		)) {
			SetError("[nodeJpeg::Decoder::Execute] Failed to decode");
			delete image;
		}
	} else {
		SetError("[nodeJpeg::Decoder::Execute] Format is invalid");
	}
	tj3Destroy(handle);
}

void nodeJpeg::Decoder::OnError(const Napi::Error& error) {
	promise.Reject(error.Value());
}

void nodeJpeg::Decoder::OnOK() {
	Napi::Object output = Napi::Object::New(Env());
	output["data"] = Napi::Uint8Array::New(
		Env(),
		image->size,
		Napi::ArrayBuffer::New(
			Env(),
			image->data,
			image->size,
			[](Napi::Env, void*, void* image) {
				delete static_cast<Image*>(image);
			},
			image
		),
		0,
		napi_uint8_clamped_array
	);
	output["format"] = Napi::Number::New(Env(), image->format);
	output["height"] = Napi::Number::New(Env(), image->height);
	output["width"] = Napi::Number::New(Env(), image->width);
	promise.Resolve(output);
}

Napi::Promise nodeJpeg::Decoder::getPromise() {
	return promise.Promise();
}
