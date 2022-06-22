import "../sass/main.sass";

import accordion from "./modules/accordion";
import slider from "./modules/slider";
import cards from "./modules/cards";
import mainSlider from "./modules/mainSlider";
import gallery from "./modules/gallery";
import modalWindow from "./modules/modal";
import scroll from "./modules/scroll";
import formField from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
	accordion({
		accordionTriggerSelector: ".page-header__burger-menu__btn",
		accordionMenuContainer: ".page-header"
	});

	slider({
		sliderContainer: ".page-promo__slider",
		sliderWrapper: ".page-promo__slider__wrapper",
		sliderSlides: ".page-promo__slider__slide"
	});

	cards({
		requestTrigger: ".page-best-offers__btn",
		parentContainer: ".page-best-offers__container"
	});

	mainSlider({
		sliderWrapper: ".page-projects__slider__wrapper",
		sliderInner: ".page-projects__slider__inner",
		sliderSlides: ".page-projects__slider__slide",
		leftArrow: ".page-projects__slider__btnPrev",
		rightArrow: ".page-projects__slider__btnNext",
		slideDescription: ".page-projects__slider__slide__content"
	});

	gallery({
		images: ".page-collection__gallery__img img",
		mainContainer: "main"
	});

	modalWindow({
		modalTrigger: "[data-btn]",
		mainContainer: "main"
	});

	scroll({
		mainContainer: "main"
	});

	formField({
		formsSelector: "#form",
		isFormModal: false,
		databaseName: "requests"
	});
});
