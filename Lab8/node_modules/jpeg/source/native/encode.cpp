#include "encode.hpp"

Napi::Value nodeJpeg::encode(const Napi::CallbackInfo& info) {
	if (!info.Length()) {
		Napi::Error::New(
			info.Env(),
			"[nodeJpeg::encode] At least one argument is required"
		).ThrowAsJavaScriptException();
		return info.Env().Null();
	}
	if (!info[0].IsObject()) {
		Napi::Error::New(
			info.Env(),
			"[nodeJpeg::decode] Argument is not an object"
		).ThrowAsJavaScriptException();
		return info.Env().Null();
	}
	auto encoder = new Encoder(
		info.Env(),
		info[0].As<Napi::Object>(),
		info.Length() >= 2 ? info[1].As<Napi::Number>().FloatValue() : 90
	);
	encoder->Queue();
	return encoder->getPromise();
}
