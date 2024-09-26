(function ($) {
	$(document).ready(function () {
		let $minWidthMobile = window.innerWidth < 1050 ? false : true;
		let $flag = true;

		window.addEventListener("resize", function () {
			console.log("Window resized");
			$minWidthMobile = window.innerWidth < 1050 ? false : true;
		});
		function size(px) {
			const conversionFactor = 24;
			const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
			return (px / conversionFactor) * index;
		}

		//!Mobile Dropdown
		$(".dropdown-lang").click(function (event) {
			event.stopPropagation();
			$(this).toggleClass("active");
		});

		function getClassNames(element) {
			return $(element).prop("class"); // Правильный способ получения классов
		}

		function format_number(x) {
			return x.toString();
		}

		function counter($numbers) {
			if ($numbers.length > 0) {
				$numbers.each(function () {
					var $counter = $(this);
					var value = { val: parseInt($counter.text()) };

					// Function to start the animation
					function startAnimation() {
						gsap.from(value, {
							duration: 3,
							ease: "circ.out",
							val: 0,
							roundProps: "val",
							onUpdate: function () {
								$counter.text(format_number(value.val));
							},
						});
					}

					// Create an Intersection Observer instance
					var observer = new IntersectionObserver(
						function (entries) {
							if (entries[0].isIntersecting) {
								startAnimation();
								observer.disconnect(); // Stop observing after the animation starts
							}
						},
						{ threshold: 0.5 } // Adjust this value to determine when the animation should start
					);

					// Start observing the counter element
					observer.observe(this);
				});
			}
		}
		counter($(".nums .num"));
		//!base
		function hashto($hashLink) {
			$hashLink.on("click", function (event) {
				// Проверяем, есть ли хэш в атрибуте href
				if (this.hash !== "") {
					// Останавливаем стандартное поведение ссылки
					event.preventDefault();

					if ($(".mobile-menu").hasClass("active")) {
						$flag = false;
						$(".burger-btn__container").removeClass("active");
						$(".mobile-menu").removeClass("active");
						$("body").removeClass("overflow-hidden");
						setTimeout(() => {
							$flag = true;
						}, 500);
					}

					// Сохраняем хэш
					var hash = this.hash;
					const top = $(hash).offset().top;
					// Плавная прокрутка до элемента с соответствующим ID
					$("html, body").animate(
						{
							scrollTop: top,
						},
						800,
						function () {
							// Добавляем хэш в URL после завершения прокрутки
							window.location.hash = hash;
						}
					);
				}
			});
		}

		hashto($(".nav__item"));
		hashto($(".offer__link"));
		hashto($(".mobile-menu__item"));
		hashto($("header .contact-btn"));
		hashto($(".hope__btn"));
		hashto($(".numbers__btn"));

		//!mobile
		function burgerBtn($burgerBtn, $menu) {
			$burgerBtn.click(function () {
				if ($(this).hasClass("active") && $flag) {
					$flag = false;
					$(this).removeClass("active");
					$menu.removeClass("active");
					$("body").removeClass("overflow-hidden");
					setTimeout(() => {
						$flag = true;
					}, 500);
				} else if ($flag) {
					$flag = false;
					$(this).addClass("active");
					$menu.addClass("active");
					$("body").addClass("overflow-hidden");
					setTimeout(() => {
						$flag = true;
					}, 500);
				}
			});
		}
		burgerBtn($(".burger-btn__container"), $(".mobile-menu"));
	});
})(jQuery);
