function slider({ sliderContainer, sliderWrapper, sliderSlides }) {
	const container = document.querySelector(sliderContainer);
	const wrapper = document.querySelector(sliderWrapper);
	const slides = document.querySelectorAll(sliderSlides);
	const windowHeight = window.getComputedStyle(wrapper).height;

	let slideIndex = 1;
	let offset = 0;

	container.style.position = "relative";
	container.style.overflow = "hidden";

	wrapper.style.display = "flex";
	wrapper.style.flexDirection = "column";
	wrapper.style.height = `${100 * slides.length}%`;
	// wrapper.style.transition = '2s all';

	const clearStringFromLetters = string => {
		return +string.replace(/([^0-9])+/g, "");
	};

	const sliderAnimations = () => {
		const currentSlide = slides[slideIndex - 1];
		const previousSlide = slides[slideIndex - 2];
		const nextSlide = slides[slideIndex];

		if (!currentSlide.classList.contains("fade-in-right")) {
			currentSlide.classList.add("fade-in-right");
			currentSlide.classList.remove("fade-out-right");
			if (slideIndex === 2 && previousSlide.classList.contains("fade-in-right")) {
				previousSlide.classList.remove("fade-in-right");
				previousSlide.classList.add("fade-out-right");
			} else if (slideIndex === 1 && nextSlide.classList.contains("fade-in-right")) {
				nextSlide.classList.remove("fade-in-right");
				nextSlide.classList.add("fade-out-right");
			}
		}
	};

	const changeSlide = (animationsDelay, transformDelay) => {
		if (offset === 0) {
			slideIndex++;
			offset += clearStringFromLetters(windowHeight);
			setTimeout(() => {
				sliderAnimations();
			}, animationsDelay);
			setTimeout(() => {
				wrapper.style.transform = `translateY(-${offset}px)`;
			}, transformDelay);
		} else if (offset === clearStringFromLetters(windowHeight)) {
			slideIndex = 1;
			offset = 0;
			setTimeout(() => {
				sliderAnimations();
			}, animationsDelay);
			setTimeout(() => {
				wrapper.style.transform = `translateY(${offset}px)`;
			}, transformDelay);
		}
	};

	const startSlider = () => {
		let runSlider = setInterval(() => changeSlide(900, 1400), 10000);

		const pauseBtn = document.createElement("i");
		pauseBtn.classList.add("page-promo__slider__slide__paused");

		const stopSlider = () => {
			clearInterval(runSlider);
		};

		container.addEventListener("mouseenter", () => {
			stopSlider();
			slides[slideIndex - 1].appendChild(pauseBtn);
			pauseBtn.classList.add("fade-in-fwd");
			if (pauseBtn.classList.contains("fade-in-fwd-reverse")) {
				pauseBtn.classList.remove("fade-in-fwd-reverse");
			}
		});

		container.addEventListener("mouseleave", () => {
			runSlider = setInterval(() => changeSlide(900, 1400), 10000);
			pauseBtn.classList.remove("fade-in-fwd");
			pauseBtn.classList.add("fade-in-fwd-reverse");
			setTimeout(() => {
				slides[slideIndex - 1].removeChild(pauseBtn);
			}, 250);
		});
	};

	startSlider();
}

export default slider;
