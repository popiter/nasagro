/* function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
}); */

new WOW().init();

// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll("[data-da]");
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute("data-da");
			if (daMove != "") {
				const daArray = daMove.split(",");
				const daPlace = daArray[1] ? daArray[1].trim() : "last";
				const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
				const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
				const daDestination = document.querySelector("." + daArray[0].trim());
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute("data-da-index", number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						parent: daElement.parentNode,
						index: indexInParent(daElement),
					};
					//Заполняем массив элементов
					daElementsArray[number] = {
						element: daElement,
						destination: document.querySelector("." + daArray[0].trim()),
						place: daPlace,
						breakpoint: daBreakpoint,
						type: daType,
					};
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(
				window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)")
			);
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === "first") {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === "last") {
						actualIndex = indexOfElements(daDestination)[
							indexOfElements(daDestination).length
						];
					}
					daDestination.insertBefore(
						daElement,
						daDestination.children[actualIndex]
					);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute("data-da-index");
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace["parent"];
		const indexPlace = originalPlace["index"];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute("data-da") == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1;
			} else {
				return 1;
			}
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1;
			} else {
				return -1;
			}
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
})();;
let sliderTopTwo = document.getElementById('slider2-top'),
	galleryThumbsTwo = document.getElementById('slider2-thumbs'),

	sliderTopOne = document.getElementById('slider1-top'),
	galleryThumbsOne = document.getElementById('slider1-thumbs'),

	sliderTopThree = document.getElementById('slider3-top'),
	galleryThumbsThree = document.getElementById('slider3-thumbs'),

	sliderTopFour = document.getElementById('slider4-top'),
	galleryThumbsFour = document.getElementById('slider4-thumbs');

if (sliderTopTwo) {
	var galleryThumbs = new Swiper(galleryThumbsTwo, {
		spaceBetween: 24,
		slidesPerView: 4,
		initialSlide: 1,
		allowSlideNext: false,
		allowSlidePrev: false,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
	});

	var galleryTop = new Swiper(sliderTopTwo, {
		initialSlide: 1,
		simulateTouch: false,
		thumbs: {
			swiper: galleryThumbs
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
} else if (sliderTopOne) {
	var galleryThumbs = new Swiper(galleryThumbsOne, {
		spaceBetween: 24,
		slidesPerView: 4,
		initialSlide: 0,
		allowSlideNext: false,
		allowSlidePrev: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
	});

	var galleryTop = new Swiper(sliderTopOne, {
		initialSlide: 0,
		simulateTouch: false,
		effect: 'fade',
		thumbs: {
			swiper: galleryThumbs
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
} else if (sliderTopThree) {
	var galleryThumbs = new Swiper(galleryThumbsThree, {
		spaceBetween: 24,
		slidesPerView: 4,
		initialSlide: 2,
		allowSlideNext: false,
		allowSlidePrev: false,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
	});

	var galleryTop = new Swiper(sliderTopThree, {
		initialSlide: 2,
		nested: true,
		simulateTouch: false,
		thumbs: {
			swiper: galleryThumbs
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
} else if (sliderTopFour) {
	var galleryThumbs = new Swiper(galleryThumbsFour, {
		spaceBetween: 24,
		slidesPerView: 4,
		initialSlide: 3,
		allowSlideNext: false,
		allowSlidePrev: false,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
	});

	var galleryTop = new Swiper(sliderTopFour, {
		initialSlide: 3,
		nested: true,
		simulateTouch: false,
		thumbs: {
			swiper: galleryThumbs
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
}
;
let sliderDescription = document.querySelector('.product__slidar');


if (sliderDescription) {
	var galleryThumbs = new Swiper('.product-thumbs', {
		spaceBetween: 8,
		slidesPerView: 6,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		breakpoints: {
			0: {
				slidesPerView: 3,
				spaceBetween: 4,
			},
			910: {
				slidesPerView: 6,
			},
		}
	});

	var galleryTop = new Swiper('.product-top', {
		spaceBetween: 10,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});
};
let selectSingle = document.querySelector('.__select');
let selectContent = document.querySelector('.__select__content');
let search = document.getElementById('search');
let city = [
	{ city: 'Могоча', id: 1 },
	{ city: 'Можайск', id: 2 },
	{ city: 'Москва', id: 3 },
	{ city: 'Можга', id: 4 },
	{ city: 'Красногорск', id: 5 },
	{ city: 'Балашиха', id: 6 },
	{ city: 'Тверь', id: 7 },
	{ city: 'Зеленоград', id: 8 },
	{ city: 'Бутово', id: 9 }
];


function sortCity(cities) {
	selectContent.innerHTML = ''
	for (const city of cities) {
		selectContent.innerHTML += `<input id="singleSelect${city.id}" class="__select__input" type="radio" name="singleSelect" />
		<label for="singleSelect${city.id}" class="__select__label">${city.city}</label>`
	}
}

search.addEventListener('input', () => {
	let sort = city;
	let reg = new RegExp(`${search.value}`, 'gi')
	sort = sort.filter(el => el.city.match(reg))
	sortCity(sort)
	selectContent = document.querySelector('.__select__content');
	if (selectContent.innerHTML == '') {
		selectContent.innerHTML = "Ничего не найдено"
		selectContent.style.color = '#fff'
		selectContent.style.padding = "16px 16px";
	} else {
		selectContent.style.padding = "";
	}

	selectSingleLabels = selectSingle.querySelectorAll('.__select__label');

	for (let i = 0; i < selectSingleLabels.length; i++) {
		selectSingleLabels[i].addEventListener('click', (evt) => {
			selectSingleTitle.textContent = evt.target.textContent;
			selectSingle.setAttribute('data-state', '');
		});
	}
})

sortCity(city)

let selectSingleTitle = selectSingle.querySelector('.__select__title');
let selectSingleLabels = selectSingle.querySelectorAll('.__select__label');

// Toggle menu
selectSingleTitle.addEventListener('click', () => {
	if ('active' === selectSingle.getAttribute('data-state')) {
		selectSingle.setAttribute('data-state', '');
	} else {
		selectSingle.setAttribute('data-state', 'active');
	}
});

// Close when click to option
for (let i = 0; i < selectSingleLabels.length; i++) {
	selectSingleLabels[i].addEventListener('click', (evt) => {
		selectSingleTitle.textContent = evt.target.textContent;
		selectSingle.setAttribute('data-state', '');
	});
};
let modal = () => {
	function bindModal(triggerSelect, modalSelect, overlaySelect, closeSelect, buttonSelect, successSelect) {
		let trigger = document.querySelectorAll(triggerSelect),
			modal = document.querySelector(modalSelect),
			close = document.querySelectorAll(closeSelect),
			overlay = document.querySelector(overlaySelect),
			button = document.getElementById(buttonSelect),
			success = document.querySelector(successSelect);

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault()
				}
				modal.classList.add('active')
				overlay.classList.add('modal__overlay__open')
			})
		});

		close.forEach(item => {
			item.addEventListener('click', () => {
				modal.classList.remove('active')
				overlay.classList.remove('modal__overlay__open')
				if (success.classList.contains('active')) {
					success.classList.remove('active')
				}
			})
		});

		modal.addEventListener('click', (e) => {
			if (e.target == button) {
				e.preventDefault()
				success.querySelector('.modal__title').innerHTML = `${e.currentTarget.querySelector('.modal__title').innerHTML}`
				modal.classList.remove('active')
				success.classList.add('active')
			}
		})

		overlay.addEventListener('click', () => {
			modal.classList.remove('active')
			overlay.classList.remove('modal__overlay__open')
			if (success.classList.contains('active')) {
				success.classList.remove('active')
			}
			// document.body.style.overflow = ''
			// document.body.style.margin = `0`
		})
	}

	let consultationButton = document.querySelector('.consultation__button');
	if (consultationButton) {
		bindModal(".consultation__button", '.modal__consultation', '.modal__overlay', '.modal__close', 'button__consultation', '.modal__success')
	}
	bindModal('.bell', '.modal__bell', '.modal__overlay', '.modal__close', 'button__bell', '.modal__success')
	bindModal('.calculate', '.modal__calculate', '.modal__overlay', '.modal__close', 'button__calculate', '.modal__success')
}
modal()

let selectSingleModal = document.querySelector('.modal__select');
let selectContentModal = document.querySelector('.modal__select__content');
let searchModal = document.getElementById('modalSearch');
let cityModal = [
	{ city: 'Могоча', idModal: 10 },
	{ city: 'Можайск', idModal: 20 },
	{ city: 'Москва', idModal: 30 },
	{ city: 'Можга', idModal: 40 },
	{ city: 'Красногорск', idModal: 50 },
	{ city: 'Балашиха', idModal: 60 },
	{ city: 'Тверь', idModal: 70 },
	{ city: 'Зеленоград', idModal: 80 },
	{ city: 'Бутово', idModal: 90 }
];


function sortCityModal(cities) {
	selectContentModal.innerHTML = ''
	for (const city of cities) {
		selectContentModal.innerHTML += `
		<input id="singleSelect${city.idModal}" class="modal__select__input" type="radio" name="singleSelect" />
		<label for="singleSelect${city.idModal}" class="modal__select__label">${city.city}</label>`
	}
}

searchModal.addEventListener('input', () => {
	let sort = cityModal;
	let reg = new RegExp(`${searchModal.value}`, 'gi')
	sort = sort.filter(el => el.city.match(reg))
	sortCityModal(sort)
	selectContentModal = document.querySelector('.modal__select__content');
	if (selectContentModal.innerHTML == '') {
		selectContentModal.innerHTML = "Ничего не найдено"
		selectContentModal.style.color = '#fff'
		selectContentModal.style.padding = "16px 16px";
	} else {
		selectContentModal.style.padding = "";
	}

	selectSingleLabelsModal = selectSingleModal.querySelectorAll('.modal__select__label');

	for (let i = 0; i < selectSingleLabelsModal.length; i++) {
		selectSingleLabelsModal[i].addEventListener('click', (evt) => {
			selectSingleTitleModal.textContent = evt.target.textContent;
			selectSingleModal.setAttribute('data-modal', '');
		});
	}
})

sortCityModal(cityModal)

let selectSingleTitleModal = selectSingleModal.querySelector('.modal__select__title');
let selectSingleLabelsModal = selectSingleModal.querySelectorAll('.modal__select__label');

// Toggle menu
selectSingleTitleModal.addEventListener('click', () => {
	if ('active' === selectSingleModal.getAttribute('data-modal')) {
		selectSingleModal.setAttribute('data-modal', '');
	} else {
		selectSingleModal.setAttribute('data-modal', 'active');
	}
});

// Close when click to option
for (let i = 0; i < selectSingleLabelsModal.length; i++) {
	selectSingleLabelsModal[i].addEventListener('click', (evt) => {
		selectSingleTitleModal.textContent = evt.target.textContent;
		selectSingleModal.setAttribute('data-modal', '');
	});
}

let appointment = document.querySelectorAll('.appointment')
if (appointment) {
	appointment.forEach(item => {
		item.addEventListener('input', () => {
			if (item.id == 'appointment-1') {
				document.querySelectorAll('.appointment__not__all').forEach(el => {
					el.checked = false
				});
			} else {
				document.getElementById('appointment-1').checked = false
			}
		})
	});
};

let more = document.querySelectorAll('.more');
if (more) {
	more.forEach(item => {
		item.addEventListener('click', () => {
			if (item.innerHTML == 'Свернуть') {
				item.innerHTML = 'Развернуть'
			} else {
				item.innerHTML = 'Свернуть'
			}
		})
	});
}

let btnScpoll = document.querySelector(".btnScpoll");

if (btnScpoll) {
	window.onscroll = function () {
		scrollFunction();
	};
}

function scrollFunction() {
	let btnScpoll = document.querySelector(".btnScpoll");
	let footer = document.querySelector('.footer');
	let footerTop = footer.offsetTop;
	let main = document.querySelector('.main')

	if (window.scrollY + 865 > footerTop) {
		main.style.position = 'relative'
		btnScpoll.style.display = 'block';
	} else {
		btnScpoll.style.display = 'none';
	}
}


var t;
function up() {
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	if (top > 0) {
		window.scrollBy(0, -150);
		t = setTimeout('up()', 10);
	} else clearTimeout(t);
	return false;
}

function burger() {
	let btnScpoll = document.querySelector(".btnScpoll"),
		burger = document.querySelector('.header__burger'),
		buttonCalc = document.querySelector('.button__calc'),
		menu = document.querySelector('.header__inner__menu');
	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		menu.classList.toggle('active');
		document.body.classList.toggle('lock')
		buttonCalc.classList.toggle('btn__active')

		if (btnScpoll) {
			btnScpoll.classList.toggle('btn__active')
		}
	})
}
burger()