#pragma once

#include <napi.h>

#include "decoder.hpp"
#include "format.hpp"

namespace nodeJpeg {

	Napi::Value decode(const Napi::CallbackInfo& info);

}
