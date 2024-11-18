#pragma once

#include <math.h>

#include <napi.h>

extern "C" {
	#include <turbojpeg.h>
}

#include "format.hpp"
#include "image.hpp"

namespace nodeJpeg {

	class Encoder : public Napi::AsyncWorker {

		private:

			uint8_t* buffer = nullptr;

			Napi::Promise::Deferred promise;

			float_t quality = 0;

			uint64_t size = 0;

			Image* image = nullptr;

		public:

			Encoder(
				Napi::Env environment,
				Napi::Object source,
				float_t quality
			);

			~Encoder() override;

			void Execute() override;

			void OnError(const Napi::Error& error) override;

			void OnOK() override;

			Napi::Promise getPromise();

	};

}
