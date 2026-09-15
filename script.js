document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.querySelector(".hamburger, .menu-toggle, #hamburger");
	const navigation = document.querySelector("nav, .nav-menu, #nav-menu");

	if (hamburger && navigation) {
		hamburger.addEventListener("click", () => {
			const isOpen = navigation.classList.toggle("active");
			hamburger.classList.toggle("active", isOpen);
			hamburger.setAttribute("aria-expanded", String(isOpen));
		});
	}

	const contactForm = document.querySelector(".contact-form");

	if (contactForm) {
		contactForm.addEventListener("submit", (event) => {
			const nameField = contactForm.querySelector("#name");
			const emailField = contactForm.querySelector("#email");
			const messageField = contactForm.querySelector("#message");
			const missingFields = [];

			if (!nameField.value.trim()) missingFields.push("name");
			if (!emailField.value.trim()) missingFields.push("email address");
			if (!messageField.value.trim()) missingFields.push("message");

			if (!missingFields.length) return;

			event.preventDefault();
			alert(`Please enter your ${missingFields.join(", ")} before submitting the form.`);
			const firstEmptyField = [nameField, emailField, messageField].find((field) => !field.value.trim());
			firstEmptyField.focus();
		});
	}

	const categoryFilter = document.querySelector("#project-category");
	const projects = document.querySelectorAll(".projects-list li");

	if (categoryFilter && projects.length) {
		categoryFilter.addEventListener("change", () => {
			projects.forEach((project) => {
				const matchesCategory = categoryFilter.value === "all" || project.dataset.category === categoryFilter.value;
				project.hidden = !matchesCategory;
			});
		});
	}

	const lightbox = document.querySelector(".lightbox");
	const lightboxImage = document.querySelector(".lightbox-image");
	const lightboxTitle = document.querySelector("#lightbox-title");
	const lightboxDescription = document.querySelector("#lightbox-description");
	const lightboxClose = document.querySelector(".lightbox-close");
	const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
	let lastTrigger;

	if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription || !lightboxClose) return;

	const closeLightbox = () => {
		lightbox.hidden = true;
		document.body.classList.remove("lightbox-open");
		lastTrigger?.focus();
	};

	lightboxTriggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const image = trigger.querySelector("img");
			const project = trigger.closest("li");
			const title = project.querySelector("h3");

			lastTrigger = trigger;
			lightboxImage.src = image.src.replace("w=160", "w=1200");
			lightboxImage.alt = image.alt;
			lightboxTitle.textContent = title.textContent;
			lightboxDescription.textContent = project.dataset.description;
			lightbox.hidden = false;
			document.body.classList.add("lightbox-open");
			lightboxClose.focus();
		});
	});

	lightboxClose.addEventListener("click", closeLightbox);
	lightbox.addEventListener("click", (event) => {
		if (event.target === lightbox) closeLightbox();
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
	});
});
