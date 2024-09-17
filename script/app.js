(function ($) {
	let $minWidthMobile = window.innerWidth < 1050 ? false : true;

	window.addEventListener("resize", function () {
		$minWidthMobile = window.innerWidth < 1050 ? false : true;
	});
	$(document).ready(function () {
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

		//!numerical
	});
})(jQuery);
