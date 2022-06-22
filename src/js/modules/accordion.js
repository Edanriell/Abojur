function accordion({ accordionTriggerSelector, accordionMenuContainer }) {
	const trigger = document.querySelector(accordionTriggerSelector);
	const triggerSvgElements = document.querySelectorAll(`${accordionTriggerSelector} svg`);
	const container = document.querySelector(accordionMenuContainer);

	let menuOpened = false;

	const openMenu = () => {
		container.style.height = "192px";
		menuOpened = true;
		createMenu();
		animateTrigger();
	};

	const closeMenu = () => {
		container.style.height = null;
		menuOpened = false;
		animateTrigger();
		container.removeChild(document.querySelector(".main-nav"));
	};

	function animateTrigger() {
		if (menuOpened) {
			triggerSvgElements[0].style.cssText = `
        transform: rotate(225deg);
        top: 15px;
      `;
			triggerSvgElements[1].style.cssText = `
        transform: scale(0);
      `;
			triggerSvgElements[2].style.cssText = `
        transform: rotate(-225deg);
        top: 15px;
      `;
		} else if (!menuOpened) {
			triggerSvgElements[0].style.cssText = `
        transform: none;
        top: 0;
      `;
			triggerSvgElements[1].style.cssText = `
        transform: scale(1);
      `;
			triggerSvgElements[2].style.cssText = `
        transform: none;
        top: 30px;
      `;
		}
	}

	function createMenu() {
		const menuItems = [
			{
				name: "О компании",
				id: "#about"
			},
			{
				name: "Предложения",
				id: "#offers"
			},
			{
				name: "Проекты",
				id: "#projects"
			},
			{
				name: "Миссия",
				id: "#mission"
			},
			{
				name: "Команда",
				id: "#team"
			},
			{
				name: "Коллекция",
				id: "#collection"
			},
			{
				name: "Обратная связь",
				id: "#feedback"
			}
		];

		const menuContainer = document.createElement("nav");
		menuContainer.classList.add("main-nav");
		const menu = document.createElement("ul");
		menu.classList.add("main-nav__items");

		menuItems.forEach(({ name, id }, idx) => {
			setTimeout(() => {
				const menuItem = document.createElement("li");
				menuItem.classList.add("main-nav__items__menu-item", "fade-in-bottom-accordion");
				menuItem.innerHTML = `
          <a href="${id}" class="main-nav__items__menu-item__link">${name}</a>
        `;
				menu.appendChild(menuItem);
			}, idx * 60);
		});
		menuContainer.appendChild(menu);

		container.appendChild(menuContainer);
	}

	trigger.addEventListener("click", () => {
		if (!menuOpened) {
			openMenu();
		} else if (menuOpened) {
			closeMenu();
		}
	});
}

export default accordion;
