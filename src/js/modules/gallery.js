function gallery({ images, mainContainer }) {
	const allImages = document.querySelectorAll(images);
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

	const createModal = image => {
		const modal = document.createElement("div");
		document.body.style.overflow = "hidden";
		modal.classList.add("page-modal");
		const imgUrl = image.getAttribute("src");
		modal.innerHTML = `
    <div class="page-modal__dialog show-modal">
      <button class="page-modal__dialog__close">&#10006
	  	<span class="visually-hidden">Закрыть окно</span>
	  </button>
      <div class="page-modal__dialog__content">
        <img src="${imgUrl}" alt="" width="100%" height="100%">
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

		closeAndRemoveModal();
	};

	allImages.forEach(image => {
		image.addEventListener("click", () => {
			createModal(image);
		});
	});
}

export default gallery;
