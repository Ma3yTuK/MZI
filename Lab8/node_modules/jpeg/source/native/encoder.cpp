#include "encoder.hpp"

nodeJpeg::Encoder::Encoder(
	Napi::Env environment,
	Napi::Object source,
	float_t quality
) :
	Napi::AsyncWorker(environment),
	promise(Napi::Promise::Deferred::New(environment)),
	quality(quality)
{
	auto data = source.Get("data").As<Napi::Uint8Array>();
	image = new Image(
		static_cast<Format>(source.Get("format").As<Napi::Number>().Int32Value()),
		source.Get("width").As<Napi::Number>().Uint32Value(),
		source.Get("height").As<Napi::Number>().Uint32Value(),
		data.ByteLength()
	);
	std::memcpy(image->data, data.Data(), data.ByteLength());
}

nodeJpeg::Encoder::~Encoder() {
	delete image;
}

void nodeJpeg::Encoder::Execute() {
	tjhandle handle = tj3Init(TJINIT_COMPRESS);
	if (!handle) {
		SetError("[nodeJpeg::Encoder::Execute] Failed to initialize");
		return;
	}
	tj3Set(handle, TJPARAM_QUALITY, quality);
	tj3Set(handle, TJPARAM_SUBSAMP, TJSAMP_420);
	if (image->format == Format::rgba) {
		if (tj3Compress8(
			handle,
			image->data,
			image->width,
			image->width * 4,
			image->height,
			TJPF_RGBA,
			&buffer,
			reinterpret_cast<size_t*>(&size)
		)) {
			SetError("[nodeJpeg::Encoder::Execute] Failed to encode");
		}
	} else if (image->format == Format::yuv) {
		if (tj3CompressFromYUV8(
			handle,
			image->data,
			image->width,
			1,
			image->height,
			&buffer,
			reinterpret_cast<size_t*>(&size)
		)) {
			SetError("[nodeJpeg::Encoder::Execute] Failed to encode");
		}
	} else {
		SetError("[nodeJpeg::Encoder::Execute] Format is invalid");
	}
	tj3Destroy(handle);
}

void nodeJpeg::Encoder::OnError(const Napi::Error& error) {
	promise.Reject(error.Value());
}

void nodeJpeg::Encoder::OnOK() {
	promise.Resolve(Napi::Buffer<uint8_t>::New(
		Env(),
		buffer,
		size,
		[](Napi::Env, void* data) {
			tj3Free(static_cast<unsigned char*>(data));
		}
	));
}

Napi::Promise nodeJpeg::Encoder::getPromise() {
	return promise.Promise();
}
