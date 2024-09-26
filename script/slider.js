document.addEventListener("DOMContentLoaded", function () {
	function size(px) {
		const conversionFactor = 24;
		const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
		return (px / conversionFactor) * index;
	}

	let minWidthMobile = window.innerWidth < 1025 ? false : true;

	// Elements for current and total slide numbers
	const currentSlideElem = document.querySelector(".fraction__current");
	const totalSlideElem = document.querySelector(".fraction__total");

	function updateFractionPosition(index) {
		const subHeight = $(".offer__content .sub__container").eq(index).offset().top + $(".offer__content .sub__container").eq(index).outerHeight();
		$(".offer__fraction").css("top", `${subHeight + size(38)}px`);
	}

	// Функция для обновления слайдера, если он существует
	function updateSlider(sliderInstance, selector) {
		if (document.querySelector(selector)) {
			sliderInstance.update();
		}
	}

	let $mainSliderIndex = 0;
	// Initialize the slider
	const sliderMain = new Swiper(".swiper.main-slider", {
		pagination: {
			el: ".offer__pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".offer__btn__next",
			prevEl: ".offer__btn__prev",
		},
		slidesPerView: 1,
		initialSlide: 0,
		speed: 1300,
		parallax: true,
		spaceBetween: 1,
		loop: true,
		// On initialization and slide change, update the fraction
		on: {
			init: function () {
				// Set the total slides (for the loop mode, Swiper adds extra slides
				totalSlideElem.textContent = this.slides.length;
				currentSlideElem.textContent = this.realIndex + 1; // Swiper starts from 0 index
				$mainSliderIndex = this.realIndex;
				updateFractionPosition($mainSliderIndex);
			},
			slideChange: function () {
				currentSlideElem.textContent = this.realIndex + 1; // Update current slide number
				setTimeout(() => {
					$mainSliderIndex = this.realIndex;
					updateFractionPosition($mainSliderIndex);
				}, 200);
			},
		},
	});

	const partnersSlider = new Swiper(".swiper.partners__slider", {
		navigation: {
			nextEl: ".partners__btn__next",
			prevEl: ".partners__btn__prev",
		},
		slidesPerView: minWidthMobile ? 5 : "auto",
		speed: 1300,
		spaceBetween: minWidthMobile ? size(25) : 10,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	});

	function setEqualHeight() {
		const cards = document.querySelectorAll(".vacation__card");
		let maxHeight = 0;

		// Сброс высоты перед вычислением
		cards.forEach((card) => {
			card.style.height = "auto";
		});

		// Найдите максимальную высоту
		cards.forEach((card) => {
			if (card.offsetHeight > maxHeight) {
				maxHeight = card.offsetHeight;
			}
		});

		// Установите максимальную высоту для всех карточек
		cards.forEach((card) => {
			card.style.height = `${maxHeight}px`;
		});
	}

	window.addEventListener("load", setEqualHeight);

	const vacationsSlider = new Swiper(".swiper.vacations__slider", {
		navigation: {
			nextEl: ".vacations__btn__next",
			prevEl: ".vacations__btn__prev",
		},
		slidesPerView: minWidthMobile ? 4 : "auto",
		speed: 1300,
		spaceBetween: minWidthMobile ? size(20) : 10,
		on: {
			init: setEqualHeight,
			resize: setEqualHeight,
		},
	});

	window.addEventListener("resize", function () {
		minWidthMobile = window.innerWidth < 1025 ? false : true;
		updateFractionPosition($mainSliderIndex);
		updateSlider(vacationsSlider, ".swiper.vacations__slider");
		updateSlider(partnersSlider, ".swiper.partners__slider");
		updateSlider(sliderMain, ".swiper.main-slider");
	});
});
