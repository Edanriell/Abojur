import { postData } from "../services/requests";
import spinner from "../../img/spinner.svg";

function formField({ formsSelector, isFormModal, databaseName }) {
	const forms = document.querySelectorAll(formsSelector);
	const modal = isFormModal;
	const database = databaseName;

	const messages = {
		loading: spinner,
		success: "Данные отправленны",
		failure: "Что-то пошло не так..."
	};

	forms.forEach(form => {
		bindPostData(form, modal, database);
	});

	function bindPostData(form, modalWindow) {
		form.addEventListener("submit", e => {
			e.preventDefault();

			displayLoader(form, modalWindow);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(`http://localhost:3000/${database}`, json)
				.then(data => {
					console.log(data);
					if (!modalWindow) displayMessage(form, messages.success);
					document.querySelector(".loader").remove();
				})
				.catch(err => {
					console.log(err);
					if (!modalWindow) displayMessage(form, messages.failure);
					document.querySelector(".loader").remove();
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function displayLoader(form, modalWindow) {
		const loaderImg = document.createElement("img");
		loaderImg.classList.add("loader");
		loaderImg.src = messages.loading;
		if (!modalWindow) {
			loaderImg.style.cssText = `
        position: absolute;
        height: 52px;
        top: 620px;
        left: 52%;
      `;
		} else {
			loaderImg.style.cssText = `
        position: absolute;
        height: 52px;
        top: 454px;
        left: 280px;
      `;
		}
		form.insertAdjacentElement("afterend", loaderImg);
	}

	function displayMessage(form, messageText) {
		const message = document.createElement("p");
		message.innerText = messageText;
		message.style.cssText = `
      position: absolute;
      height: 52px;
      top: 672px;
      left: 32%;
      color: #FFF;
    `;
		form.insertAdjacentElement("afterend", message);
	}

	fetch("http://localhost:3000/requests")
		.then(data => data.json())
		.then(res => console.log(res));
}

export default formField;
