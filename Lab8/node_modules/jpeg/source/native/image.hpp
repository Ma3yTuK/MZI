#pragma once

#include <cstdint>

#include "format.hpp"

namespace nodeJpeg {

	class Image {

		public:

			Image(
				Format format,
				uint32_t width,
				uint32_t height,
				uint64_t size
			);

			~Image();

			uint8_t* data = nullptr;

			Format format;

			uint32_t height = 0;

			uint64_t size = 0;

			uint32_t width = 0;

	};

}
