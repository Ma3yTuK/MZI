#pragma once

#include <napi.h>

#include "encoder.hpp"
#include "format.hpp"

namespace nodeJpeg {

	Napi::Value encode(const Napi::CallbackInfo& info);

}
