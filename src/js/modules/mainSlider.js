function mainSlider({
	sliderWrapper,
	sliderInner,
	sliderSlides,
	leftArrow,
	rightArrow,
	slideDescription
}) {
	const wrapper = document.querySelector(sliderWrapper);
	const slides = document.querySelectorAll(sliderSlides);
	const nextSlide = document.querySelector(rightArrow);
	const previousSlide = document.querySelector(leftArrow);
	const description = document.querySelectorAll(slideDescription);
	const { height } = window.getComputedStyle(wrapper);
	const inner = document.querySelector(sliderInner);

	let slideIndex = 1;
	let offset = 0;

	wrapper.style.position = "relative";
	wrapper.style.overflow = "hidden";

	inner.style.display = "flex";
	inner.style.flexDirection = "column";
	inner.style.height = `${100 * slides.length}%`;

	const clearStringFromLetters = string => {
		return +string.replace(/([^0-9])+/g, "");
	};

	const sliderSlideAnimationForward = () => {
		slides[slideIndex - 1].classList.add("slide-foward");

		if (slideIndex === 1) {
			slides[slides.length - 1].classList.remove("slide-foward");
		}

		if (
			slides[slideIndex - 2] &&
			slides[slideIndex - 2].classList.contains("slide-backwards")
		) {
			slides[slideIndex - 2].classList.remove("slide-backwards");
		} else if (
			slides[slideIndex - 2] &&
			slides[slideIndex - 2].classList.contains("slide-foward")
		) {
			slides[slideIndex - 2].classList.remove("slide-foward");
		}

		if (slides[slides.length - 1].classList.contains("slide-backwards")) {
			slides[slides.length - 1].classList.remove("slide-backwards");
		}
	};

	const sliderSlideAnimationBackward = () => {
		slides[slideIndex - 1].classList.add("slide-backwards");

		if (slideIndex === slides.length && slides[0].classList.contains("slide-foward")) {
			slides[0].classList.remove("slide-foward");
		}

		if (slideIndex === slides.length) {
			slides[0].classList.remove("slide-backwards");
		}

		if (slides[slideIndex] && slides[slideIndex].classList.contains("slide-foward")) {
			slides[slideIndex].classList.remove("slide-foward");
		} else if (slides[slideIndex] && slides[slideIndex].classList.contains("slide-backwards")) {
			slides[slideIndex].classList.remove("slide-backwards");
		}
	};

	const slideDescriptionAnimation = () => {
		if (slideIndex === 1) {
			description[0].classList.add("description-fade-up");
		} else {
			description[slideIndex - 1].classList.add("description-fade-up");
		}

		description.forEach((slideDesc, i) => {
			if (slides[i] === slides[slideIndex - 1]) {
				// eslint-disable-next-line no-useless-return
				return;
				// eslint-disable-next-line no-else-return
			} else if (slideDesc.classList.contains("description-fade-up")) {
				slideDesc.classList.remove("description-fade-up");
			}
		});
	};

	nextSlide.addEventListener("click", () => {
		if (offset === 0 || offset < clearStringFromLetters(height) * (slides.length - 1)) {
			slideIndex++;
			offset += clearStringFromLetters(height);
		} else if (offset === clearStringFromLetters(height) * (slides.length - 1)) {
			slideIndex = 1;
			offset = 0;
		}
		inner.style.transform = `translateY(-${offset}px)`;
		sliderSlideAnimationForward();
		slideDescriptionAnimation();
	});

	previousSlide.addEventListener("click", () => {
		if (offset <= clearStringFromLetters(height) * (slides.length - 1) && offset > 0) {
			slideIndex--;
			offset -= clearStringFromLetters(height);
		} else if (offset === 0) {
			slideIndex = slides.length;
			offset = clearStringFromLetters(height) * (slides.length - 1);
		}
		inner.style.transform = `translateY(${-offset}px)`;
		sliderSlideAnimationBackward();
		slideDescriptionAnimation();
	});
}

export default mainSlider;
