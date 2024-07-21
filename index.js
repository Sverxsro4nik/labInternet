const sendForm = document.querySelector('form');

const burgerMenuSwitcher = document.querySelector('#menu__toggle');

if (burgerMenuSwitcher) {
	burgerMenuSwitcher.addEventListener('click', () => {
		if (burgerMenuSwitcher.checked) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'scroll';
		}
	});
}
sendForm.addEventListener('submit', event => {
	event.preventDefault();

	const formData = new FormData(sendForm);

	const name = formData.get('name');
	const phone = formData.get('phone');

	if (name && phone) {
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				phone,
			}),
		}).then(response => {
			if (response.ok) {
				sendForm.reset();
			}
		});
	}
});
const inputs = document.querySelectorAll('.sendForm__input input');
inputs.forEach(input => {
	input.addEventListener('blur', event => {
		if (event.target.value) {
			input.classList.add('is-valid');
		} else {
			input.classList.remove('is-valid');
		}
	});
});

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.review');

let currentSlide = 0;
const slideStep =
	window.screen.width <= 768 ? 0 : window.screen.width <= 1216 ? 1 : 2;
const prevBtn = document.querySelector('.reviews-list__btn--prev');
const nextBtn = document.querySelector('.reviews-list__btn--next');
const dots = document.querySelector('.dots');

const createDots = () => {
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('div');
		dot.setAttribute('data-slide-to', i);
		dot.addEventListener('click', event => {
			currentSlide = +event.target.dataset.slideTo;
			showSlide(currentSlide);
		});
		dot.classList.add('dot');
		dots.append(dot);
	}
};
createDots();

prevBtn.addEventListener('click', () => {
	currentSlide--;
	showSlide(currentSlide);
});
nextBtn.addEventListener('click', () => {
	currentSlide++;
	showSlide(currentSlide);
});

const showSlide = slideIndex => {
	let firstSlide = slideIndex;
	let lastSlide = slideIndex + slideStep;
	if (lastSlide > slides.length - 1 || firstSlide < 0) {
		return;
	}
	slides.forEach((slide, index) => {
		slide.style.display = 'none';
		if (index >= firstSlide && index <= lastSlide) {
			slide.style.display = 'block';
		}
	});
	Array.from(dots.children).forEach(dot => {
		dot.classList.remove('dot--active');
	});
	dots.children[currentSlide].classList.add('dot--active');
	if (currentSlide === 0) {
		prevBtn.disabled = true;
	} else {
		prevBtn.disabled = false;
	}

	if (currentSlide === slides.length - 1) {
		nextBtn.disabled = true;
	} else {
		nextBtn.disabled = false;
	}
};
showSlide(currentSlide);

const changeTitleSizeForMobile = () => {
	if (window.screen.width <= 767) {
		const mainTitle = document.querySelector('.title-1');
		mainTitle.classList.replace('title-1', 'title-4');
		const thirdTitle = document.querySelector('.title-3');
		thirdTitle.classList.replace('title-3', 'title-5');
		const titles = document.querySelectorAll('.title-2');
		titles.forEach(title => {
			title.classList.replace('title-2', 'title-4');
		});
	}
};
changeTitleSizeForMobile();
