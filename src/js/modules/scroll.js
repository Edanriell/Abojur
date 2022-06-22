/* eslint-disable max-len */
function scroll({ mainContainer }) {
	const container = document.querySelector(mainContainer);
	const btn = createBtn();

	function createBtn() {
		const button = document.createElement("a");
		button.setAttribute("href", "#up");
		button.classList.add("pageup");
		button.innerHTML = `
      <svg class="pageup__up" viewBox="0 0 26 26" fill="#343235" xmlns="http://www.w3.org/2000/svg">
        <path 
		fill-rule="evenodd" 
		clip-rule="evenodd" 
		d="M26 0H0V26H26V0ZM4.6593 17.7519L13.1233 10.33L21.5873 17.7519L22.9059 16.2481L13.7826 8.24813L13.1233 7.67L12.464 8.24813L3.3407 16.2481L4.6593 17.7519Z"
		fill="#343235"/>
      </svg>
    `;
		return button;
	}

	container.appendChild(btn);

	window.addEventListener("scroll", () => {
		if (document.documentElement.scrollTop > 2400 && !btn.classList.contains("btnUp-fadeIn")) {
			btn.classList.add("btnUp-fadeIn");
			btn.classList.remove("btnUp-fadeOut");
		} else if (
			document.documentElement.scrollTop < 2400 &&
			btn.classList.contains("btnUp-fadeIn")
		) {
			btn.classList.remove("btnUp-fadeIn");
			btn.classList.add("btnUp-fadeOut");
		}
	});

	const triggerBtn = document.querySelector(".pageup");
	const speed = 0.01;

	triggerBtn.addEventListener("click", function (event) {
		event.preventDefault();

		const widthTop = document.documentElement.scrollTop;
		const { hash } = this;
		const toBlock = document.querySelector(hash).getBoundingClientRect().top;
		console.log(document.querySelector(hash));
		let start = null;

		requestAnimationFrame(step);

		function step(time) {
			if (start === null) {
				start = time;
			}

			const progress = time - start;
			const r =
				toBlock < 0
					? Math.max(widthTop - progress / speed, widthTop + toBlock)
					: Math.min(widthTop + progress / speed, widthTop + toBlock);

			document.documentElement.scrollTo(0, r);

			if (r !== widthTop + toBlock) {
				requestAnimationFrame(step);
			} else {
				// eslint-disable-next-line no-restricted-globals
				location.hash = hash;
			}
		}
	});
}

export default scroll;
