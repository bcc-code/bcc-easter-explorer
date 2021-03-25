// registering plugins for gsap
gsap.registerPlugin(Draggable);

// Global Variables
const _body = document.querySelector('body');
const _firstScreen = document.querySelector('.firstScreen');
const _secondScreen = document.querySelector('.secondScreen');
const _mapContainer = document.querySelector('.map');
const _gameResetBTN = document.querySelector('.reset');
const _cursor = document.querySelector('.cursor');
const _modal = document.querySelector('.modal');
const _modalContainer = document.querySelector('.modal__container');
const _languageSelect = document.getElementById('language-picker-select');


let taskJSON;

// Fetch data json
const language = async searchLanguage => {
    const res = await fetch('assets/data/' + searchLanguage + '/app.json');
    const data = await res.json();

    taskJSON = data;
};

const firstScreen = {
    init: async function () {

        const langCookie = readCookie('language');

        if (!langCookie) {
            gsap.to('.logo', { y: 0, opacity: 1, duration: 1 });
            gsap.to('.language-picker', { y: 0, opacity: 1, duration: 1 });
            gsap.to('.promo', { y: 0, opacity: 1, duration: 1 });

            _languageSelect.addEventListener('change', () => language(_languageSelect.value));

            document.querySelector('.language-picker-confirm').addEventListener('click', (event) => {
                createCookie('language', taskJSON.language, 1);
                _body.classList.add(taskJSON.language);
                gsap.to(_firstScreen, { autoAlpha: 0, onComplete: () => secondScreen.init() });
            });

        } else {

            gsap.to(_firstScreen, { autoAlpha: 0, onComplete: () => secondScreen.init() });

            const results = await fetch('assets/data/' + langCookie + '/app.json');
            const data = await results.json();

            taskJSON = data;

            gameCompleted.init();
        }
    },
}
const secondScreen = {
    init: function () {
        gsap.to(_gameResetBTN, { autoAlpha: 1 })

        const character = readCookie('character');

        if (character != null) {
            _body.classList.add(character);
            gsap.to(_secondScreen, { autoAlpha: 0 })
            gsap.to(_mapContainer, { autoAlpha: 1 })
        } else {
            gsap.to(_secondScreen, { autoAlpha: 1 })
            gsap.to(_mapContainer, { autoAlpha: 0 })
        }

        secondScreen.clickEvents();
    },

    clickEvents: function () {
        const button = document.querySelectorAll('.card__container');

        button.forEach(el => {
            el.addEventListener('click', e => {
                const character = e.target.closest('.card').classList.contains('boy') ? 'boy' : 'girl';
                _body.classList.add(character);
                createCookie('character', character, 1);

                gsap.to(_secondScreen, { autoAlpha: 0 })
                gsap.to(_mapContainer, { autoAlpha: 1 })
            });
        });

    }
}
const task = {
    template: {
        ID: '',
        country: '',
        type: '',
        audio: '',
        image: '',
        text: '',
        taskHeading: '',
        taskDescription: '',
        taskDescriptionInfo: '',
        taskHowToLabel: '',
        taskItems: [],
        taskImages: [],
        questionHeading: '',
        question: '',
        questions: [],
        questionOptions: [],
        extraText: '',
    },

    generateHTML: function (ID) {
        let total = taskJSON.countries.length;
        let thisStrings = taskJSON.strings;
        let thisCountry = taskJSON.countries.find(taskJSON => {
            return taskJSON.ID === ID;
        });

        thisCountry = Object.assign({}, task.template, thisCountry);

        const tasksCompleted = JSON.parse(readCookie('tasks_completed'));
        const currentIndex = tasksCompleted ? tasksCompleted.length + 1 : 1;

        if (thisCountry.type === "question") {
            return "<div class='box " + thisCountry.type + "'>" +
                "<div class='box__char'></div>" +
                "<div class='box__header'>" +
                "<div class='box__label'><span>" + thisCountry.country + "</span><span>" + currentIndex + "/" + total + "</span></div>" +
                audio() +
                "<div class='box__close'></div>" +
                "</div>" +
                "<div class='box__container'>" +
                "<div class='box__content'>" +
                "<h2>" + thisCountry.country + "</h2>" +
                "<img src='" + thisCountry.image + "' alt=''/>" +
                text() +
                "<span class='box__heading'>" + thisCountry.questionHeading + "</span>" +
                "<p>" + thisCountry.question + "</p>" +
                "<ul class='box__options'>" + options() + "</ul>" +
                "<ul class='box__questions'>" + questions() + "</ul>" +
                "</div>" +
                "<a href='javascript: void (0)' class='box__submit' id='" + thisCountry.ID + "'>" + thisStrings.complete + "</a>" +
                "</div>" +
                "</div>";
        } else {
            return "<div class='box " + thisCountry.type + "'>" +
                "<div class='box__char'></div>" +
                "<div class='box__header'>" +
                "<div class='box__label'><span>" + thisCountry.country + "</span><span>" + currentIndex + "/" + total + "</span></div>" +
                audio() +
                "<div class='box__close'></div>" +
                "</div>" +
                "<div class='box__container'>" +
                "<div class='box__content'>" +
                "<h2>" + thisCountry.country + "</h2>" +
                "<img src='" + thisCountry.image + "' alt=''/>" +
                text() +
                "<span class='box__heading'>" + thisCountry.taskHeading + "</span>" +
                "<p>" + thisCountry.taskDescription + "</p>" +
                "<p>" + thisCountry.taskDescriptionInfo + "</p>" +
                "<span class='box__heading'>" + thisCountry.taskHowToLabel + "</span>" +
                "<ul class='box__list'>" + list() + "</ul>" +
                "<p>" + thisCountry.extraText + "</p>" +
                "<div class='box__images'>" + images() + "</div>" +
                "</div>" +
                "<a href='javascript: void (0)' class='box__submit' id='" + thisCountry.ID + "'>" + thisStrings.complete + "</a>" +
                "</div>" +
                "</div>";
        }

        function text() {
            return thisCountry.text.map(function (item) {
                return "<p>" + item + "</p>";
            }).join("");
        }

        function options() {
            return thisCountry.questionOptions.map(function (item) {
                return "<li><label><input type='checkbox'/><div class='checkbox'></div>" + item + "</label></li>";
            }).join("");
        }

        function questions() {
            return thisCountry.questions.map(function (item) {
                return "<li>" + item + "<input type='text'/></li>";
            }).join("");
        }

        function list() {
            return thisCountry.taskItems.map(function (item) {
                return "<li>" + item + "</li>";
            }).join("");
        }

        function images() {
            return thisCountry.taskImages.map(function (item) {
                return "<img src='" + item + "' alt=''/>";
            }).join("");
        }

        function audio() {
            return "<div id='audio-container' class='box__audio'>" +
                "<audio controls src='" + thisCountry.audio + "'>" +
                "Your browser does not support the audio element." +
                "</audio>" +
                "<div class='play'>" +
                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 25'><path d='M19.875 10.078L3.375.328C2.015-.469 0 .328 0 2.25v19.5c0 1.781 1.875 2.86 3.375 1.969l16.5-9.75c1.453-.89 1.453-3 0-3.89z' /></svg>" +
                "</div>" +
                "<span class='label'>play audio</span>" +
                "</div > ";
        }

    },

    audioEvents: function () {

        const audioContainer = document.getElementById('audio-container');
        const audio = audioContainer.querySelector('audio');
        const audioBtn = audioContainer.querySelector('.play');
        const audioLabel = audioContainer.querySelector('.label');

        if (!audio.getAttribute('src').length > 0) return audioContainer.remove();

        audioBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                audioContainer.classList.add('playing');
                audioLabel.innerHTML = 'Pause audio'
            } else {
                audio.pause();
                audioContainer.classList.remove('playing');
                audioLabel.innerHTML = 'Play audio'
            }
        });
    },
}
const map = {

    closeModal: function () {
        _body.classList.remove('overlay');
        gsap.to(_modal, {
            autoAlpha: 0, display: 'none',
            onComplete: () => {
                _modal.setAttribute('class', 'modal');
                _modalContainer.innerHTML = '';
            }
        });

    },

    openModal: function (ID) {
        _modal.classList.add(ID);
        _modal.setAttribute('data-id', ID);
        _body.classList.add('overlay');

        _modalContainer.innerHTML = task.generateHTML(ID);

        gsap.to(_modal, { autoAlpha: 1, display: 'block' });
        task.audioEvents();

        document.querySelectorAll('.box__content > *:not(img)').forEach(el => {
            if (el.innerHTML === "") return el.remove();
        });

        let completedTasks = JSON.parse(readCookie('tasks_completed'));
        if (!completedTasks) completedTasks = new Array();
        if (completedTasks.includes(ID)) {
            document.getElementById(ID).classList.add('completed');
            _modal.classList.add('completed');
        }

    },

    clickEvents: function () {
        const countries = document.querySelectorAll('#map-area > g:not(#World)');

        let completedTasks = JSON.parse(readCookie('tasks_completed'));
        if (!completedTasks) completedTasks = new Array();

        completedTasks.forEach(el => {
            document.getElementById(el).classList.add('completed');
        });

        // Open Modal
        countries.forEach(path => {
            path.addEventListener('click', (event) => {
                map.openModal(event.target.getAttribute('class'));
            }, false);
        });

        // Close modal
        document.addEventListener('click', (event) => {
            if (!event.target.classList.contains('box__close')) return;
            map.closeModal();
        }, false);

        // Submit button
        document.addEventListener('click', (event) => {
            if (!event.target.classList.contains('box__submit')) return;
            event.preventDefault();

            let tasksCompleted = JSON.parse(readCookie('tasks_completed'));
            if (!tasksCompleted) tasksCompleted = new Array();
            tasksCompleted.push(event.target.getAttribute('id'));

            let uniqueCompletedTasks = tasksCompleted.filter((v, i, a) => a.indexOf(v) === i);
            createCookie('tasks_completed', JSON.stringify(uniqueCompletedTasks), 1);
            event.target.closest('.modal').classList.add('completed');
            document.getElementById(event.target.getAttribute('id')).classList.add('completed');

            // let answers = JSON.parse(readCookie('answers'));
            // if (!answers) answers = new Array();



            const inputs = document.querySelector('.box').querySelectorAll('input');
            const countryId = _modal.getAttribute("data-id");
            let answers = [];
            let arr = [];

            if (inputs.length > 0) {
                inputs.forEach((el, index) => answers.push(el.value));

                cookie.set('answers', JSON.stringify(answers));

                arr[countryId] = JSON.parse(cookie.get('answers'));

                cookie.set('answers', JSON.stringify(arr[countryId]));
            }



            map.closeModal();
            gameCompleted.init();

        }, false);

        // Checkboxes
        document.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() !== 'input') return;
            const siblings = getSiblings(event.target.closest('li'));
            siblings.map(el => el.querySelector('input').checked = false);
        });

    },

    zoomEffect: function () {
        const image = document.querySelector('#map-area');
        const container = image.parentElement;

        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const imageWidth = window.innerWidth;
        const imageHeight = window.innerHeight;

        let zoom = {
            value: 1,
            min: 1,
            max: 5,
            step: 1,
            factor: 1.1
        };

        if (_modal.offsetWidth > 0 && _modal.offsetHeight > 0) return;

        document.querySelector('#map-area').addEventListener("wheel", onWheel, { passive: false });
        gsap.set(image, { scale: zoom.value, transformOrigin: "left top" });

        let draggable = new Draggable(image, {
            cursor: "inherit",
            // throwProps: true,
            onDrag: onDrag,
            minimumMovement: 10,
            allowEventDefault: true,
            // overshootTolerance: 0
        });

        setBounds();

        function onDrag() {
            gsap.to(_cursor, { autoAlpha: 0 });
        }

        function onWheel(event) {

            event.preventDefault();

            const oldZoom = zoom.value;

            const wheel = event.deltaY / 100;

            if (wheel > 0) {
                zoom.value /= zoom.factor;
            } else {
                zoom.value *= zoom.factor;
            }

            zoom.value = clamp(zoom.value, zoom.min, zoom.max);

            changeZoom(zoom.value - oldZoom, event);
        }

        function changeZoom(zoomDelta, event) {

            let scale = gsap.getProperty(image, "scaleX");
            let x = gsap.getProperty(image, "x");
            let y = gsap.getProperty(image, "y");

            const rect = container.getBoundingClientRect();
            const globalX = event.clientX - rect.left;
            const globalY = event.clientY - rect.top;

            const localX = (globalX - x) / scale;
            const localY = (globalY - y) / scale;

            x += -(localX * zoomDelta);
            y += -(localY * zoomDelta);

            gsap.set(image, {
                scale: zoom.value,
                x: x,
                y: y,
            });

            setBounds();
        }

        function setBounds() {

            const dx = containerWidth - (imageWidth * zoom.value);
            const dy = containerHeight - (imageHeight * zoom.value);

            const width = containerWidth - dx * 2;
            const height = containerHeight - dy * 2;

            draggable.applyBounds({
                left: dx,
                top: dy,
                width: width,
                height: height
            });
        }

        function clamp(value, min, max) {
            return value < min ? min : (value > max ? max : value);
        }
    },

    init: function () {
        map.clickEvents();
        map.zoomEffect();
    }
}
const gameCompleted = {
    generateHTML: function (_this) {
        return "<div class='gameCompleted'>" +
            "<div class='gameCompleted__content'>" +
            "<span></span>" +
            "<h2>" + _this.completeHeading + "</h2>" +
            "<p>" + _this.completedText + "</p>" +
            "<a href='https://brunstad.tv/'>Brunstad TV</a>" +
            "</div>" +
            "</div>";

    },

    init: function () {
        let completedTasks = JSON.parse(readCookie('tasks_completed'));
        if (!completedTasks) completedTasks = new Array();

        if (completedTasks.length === taskJSON.countries.length) {
            _body.classList.add('completed');
            _body.insertAdjacentHTML('beforeend', gameCompleted.generateHTML(taskJSON.strings));

            gsap.to(_modal, { autoAlpha: 0 })
            gsap.to(document.querySelector('.gameCompleted'), { autoAlpha: 1, delay: .5 })
        }
    }
}

// Init

document.addEventListener("DOMContentLoaded", () => {

    // Cursor
    document.addEventListener('mousemove', (event) => {
        _cursor.setAttribute("style", "top: " + (event.pageY - 60) + "px; left: " + (event.pageX - 50) + "px");
    });

    // Game Reset
    _gameResetBTN.addEventListener('click', () => {
        eraseCookie('character');
        eraseCookie('tasks_completed');
        eraseCookie('language');
        location.reload();
        return false;
    }, false);

    firstScreen.init();
});

window.addEventListener('load', () => map.init());