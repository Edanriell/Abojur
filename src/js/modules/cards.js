import { getResources } from "../services/requests";
import image0 from "../../img/cards/card1.png";
import image1 from "../../img/cards/card2.png";
import image2 from "../../img/cards/card3.png";

function cards({ requestTrigger, parentContainer }) {
	const imageArray = [image0, image1, image2, image0, image1, image2];
	const trigger = document.querySelector(requestTrigger);
	const container = document.querySelector(parentContainer);
	const defaultCard = "page-best-offers__product-card";
	const animationClass = "fade-in-bottom";

	let fetchedElements = 0;

	const createCard = response => {
		for (let i = 0; i < 3; i++) {
			const card = document.createElement("li");
			card.classList.add(defaultCard);
			card.classList.add(animationClass);
			const { id, imgAlt, name, price, pricePolitics, cardWidth, cardHeight } =
				response[fetchedElements];
			card.innerHTML = `
        <div class="page-best-offers__product-card__img">
          <img src="${findImage(id)}" width="${cardWidth}" height="${cardHeight}" alt="${imgAlt}">
        </div>
        <div class="page-best-offers__product-card__content">
          <h3 class="page-best-offers__product-card__content__product-name">${name}</h3>
          <p class="page-best-offers__product-card__content__product-price">от ${price} ₽</p>
          <p class="page-best-offers__product-card__content__product-price__about">
		  	<sup>*</sup>${pricePolitics}
		  </p>
          <a href="#" class="page-best-offers__product-card__content__product-order">заказать</a>
        </div>
        `;
			container.appendChild(card);
			fetchedElements++;
		}
	};

	const removeTrigger = () => {
		if (fetchedElements === 0 || fetchedElements > 5) {
			trigger.classList.add("fade-in-fwd-reverse");
			setTimeout(() => {
				trigger.remove();
			}, 250);
		}
	};

	const createError = error => {
		const errorMessage = document.createElement("div");
		errorMessage.classList.add("message", "error", "scale-in-center");
		errorMessage.innerHTML = `
    <p class="error__text">Ошибка</p>- ${error}
    `;
		document.querySelector(parentContainer).appendChild(errorMessage);
		setTimeout(() => {
			errorMessage.classList.remove("scale-in-center");
			errorMessage.classList.add("fade-out-right");
			setTimeout(() => {
				errorMessage.remove();
			}, 700);
		}, 8000);
	};

	trigger.addEventListener("click", () => {
		getResources("http://localhost:3000/bestOffers")
			.then(response => createCard(response))
			.then(removeTrigger)
			.catch(error => createError(error));
	});

	const findImage = id => {
		const image = imageArray.find((img, index) => index === id);
		return image;
	};
}

export default cards;
