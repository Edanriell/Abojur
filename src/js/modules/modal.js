/* eslint-disable max-len */
import form from "./forms";

function modalWindow({ modalTrigger, mainContainer }) {
	const trigger = document.querySelectorAll(modalTrigger);
	const container = document.querySelector(mainContainer);
	const scroll = calcScroll();

	function calcScroll() {
		const div = document.createElement("div");

		div.style.width = "50px";
		div.style.height = "50px";
		div.style.overflowY = "scroll";
		div.style.visibility = "hidden";

		document.body.appendChild(div);
		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	const createModal = () => {
		const modal = document.createElement("div");
		document.body.style.overflow = "hidden";
		modal.classList.add("page-modal");
		modal.innerHTML = `
    <div class="page-modal__dialog show-modal">
      <button class="page-modal__dialog__close">&#10006
	  <span class="visually-hidden">Закрыть окно</span></button>
      <div class="page-modal__dialog__content page-modal__dialog__content__white">
        <p 
		class="page-feedback__paragraph page-feedback__paragraph-modal">Оставьте свои контакты. Менеджер перезвонит вам в ближайшее время и ответит на все ваши вопросы.</p>
        <form id="form-modal" class="page-feedback__feedback-form page-feedback__feedback-form__modal" method="POST" action="#">
          <div class="page-feedback__feedback-form__name">
            <label for="name" class="visually-hidden">Ваше имя</label>
            <input class="page-feedback__feedback-form__name__name-input page-feedback__feedback-form__name__name-input-modal" type="text" name="name" id="name" placeholder="Ваше имя" required>
          </div>
          <div class="page-feedback__feedback-form__phone">
            <label for="phone" class="visually-hidden">Введите телефон</label>
            <input class="page-feedback__feedback-form__phone__phone-input page-feedback__feedback-form__phone__phone-input-modal" type="tel" id="phone" name="phone" placeholder="Введите телефон" required>
          </div>
          <div class="page-feedback__feedback-form__feedback">
            <button class="page-feedback__feedback-form__feedback-btn page-feedback__feedback-form__feedback-btn-modal" type="submit">Оставить заявку</button>
          </div>
        </form>
      </div>
    </div>
    `;
		container.appendChild(modal);
		document.body.style.marginRight = `${scroll}px`;
		const closeAndRemoveModal = () => {
			const dialog = document.querySelector(".page-modal__dialog");

			document.querySelector(".page-modal__dialog__close").addEventListener("click", () => {
				dialog.classList.remove("show-modal");
				dialog.classList.add("hide-modal");
				setTimeout(() => {
					container.removeChild(modal);
					document.body.style.overflow = null;
					document.body.style.marginRight = "0px";
				}, 200);
			});
			document.querySelector(".page-modal").addEventListener("click", e => {
				if (e.target === modal) {
					dialog.classList.remove("show-modal");
					dialog.classList.add("hide-modal");
					setTimeout(() => {
						container.removeChild(modal);
						document.body.style.overflow = null;
						document.body.style.marginRight = "0px";
					}, 200);
				}
			});
		};
		form({
			formsSelector: "#form-modal",
			isFormModal: true,
			databaseName: "requests-modal"
		});
		closeAndRemoveModal();
	};

	trigger.forEach(btn => {
		btn.addEventListener("click", () => {
			createModal();
		});
	});
}

export default modalWindow;
