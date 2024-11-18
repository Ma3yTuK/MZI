#include <napi.h>

#include "decode.hpp"
#include "encode.hpp"
#include "format.hpp"

Napi::Object initialize(Napi::Env environment, Napi::Object exports) {
	exports["decode"] = Napi::Function::New(environment, nodeJpeg::decode);
	exports["encode"] = Napi::Function::New(environment, nodeJpeg::encode);
	Napi::Object format = Napi::Object::New(environment);
	format["rgba"] = Napi::Number::New(environment, nodeJpeg::Format::rgba);
	format["yuv"] = Napi::Number::New(environment, nodeJpeg::Format::yuv);
	exports["Format"] = format;
	return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, initialize)
