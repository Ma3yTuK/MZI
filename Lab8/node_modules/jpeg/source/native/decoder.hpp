#pragma once

#include <cmath>

#include <napi.h>

extern "C" {
	#include <turbojpeg.h>
}

#include "format.hpp"
#include "image.hpp"

namespace nodeJpeg {

	class Decoder : public Napi::AsyncWorker {

		private:

			Format format;

			Image* image = nullptr;

			Napi::Promise::Deferred promise;

			Napi::Uint8Array source;

		public:

			Decoder(
				Napi::Env environment,
				Napi::Uint8Array source,
				Format format
			);

			~Decoder() override = default;

			void Execute() override;

			void OnError(const Napi::Error& error) override;

			void OnOK() override;

			Napi::Promise getPromise();

	};

}
