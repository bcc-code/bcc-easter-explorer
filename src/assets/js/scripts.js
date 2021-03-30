// registering plugins for gsap
gsap.registerPlugin(Draggable);

gsap.config({
    nullTargetWarn: false,
});

// Global Variables
const _body = document.querySelector('body');
const _firstScreen = document.querySelector('.firstScreen');
const _secondScreen = document.querySelector('.secondScreen');
const _mapContainer = document.querySelector('.map');
const _cursor = document.querySelector('.cursor');
const _modal = document.querySelector('.modal');
const _modalContainer = document.querySelector('.modal__container');
const _languageSelect = document.getElementById('language-picker-select');
const _gameResetBTN = document.querySelector('.reset');
const _startGameBTN = document.querySelector('.language-picker-confirm');
const _secondScreenHeading = document.querySelector('.secondScreen h2');

let taskJSON;

// Fetch data json
function getData(language) {
    return new Promise((resolve, reject) => {
        fetch('assets/data/' + language + '/app.json')
            .then(res => res.json())
            .then((data) => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            });
    })
}

const firstScreen = {
    init: async function () {

        const langCookie = readCookie('language');

        if (!langCookie) {
            gsap.to('.logo', { y: 0, opacity: 1, duration: 1 });
            gsap.to('.language-picker', { y: 0, opacity: 1, duration: 1 });
            gsap.to('.promo', { y: 0, opacity: 1, duration: 1 });

            _languageSelect.addEventListener('change', () => {
                getData(_languageSelect.value)
                    .then(data => {
                        taskJSON = data;
                        _startGameBTN.innerHTML = taskJSON.strings.startGameBTN;
                        _gameResetBTN.innerHTML = taskJSON.strings.resetGameBTN;
                        _secondScreenHeading.innerHTML = taskJSON.strings.characterChoiceHeading;
                    })
                    .catch(err => {
                        console.log('err', err)
                    })

            });

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

            _gameResetBTN.innerHTML = taskJSON.strings.resetGameBTN;
            gameCompleted.init();
        }
    },
}
const secondScreen = {
    init: function () {

        const character = readCookie('character');

        if (character != null) {
            _body.classList.add(character);
            gsap.to(_secondScreen, { autoAlpha: 0 })
            gsap.to(_mapContainer, { autoAlpha: 1 })
            gsap.to(_gameResetBTN, { autoAlpha: 1 })
        } else {
            gsap.to(_secondScreen, { autoAlpha: 1 })
            gsap.to(_gameResetBTN, { autoAlpha: 0 })
            gsap.to(_mapContainer, { autoAlpha: 0 })
        }

        secondScreen.clickEvents();
    },

    clickEvents: function () {
        const button = document.querySelectorAll('.card__container');

        button.forEach(el => {
            el.addEventListener('click', (event) => {
                const character = event.target.closest('.card').classList.contains('boy') ? 'boy' : 'girl';
                _body.classList.add(character);
                createCookie('character', character, 1);

                gsap.to(_secondScreen, { autoAlpha: 0 })
                gsap.to(_mapContainer, { autoAlpha: 1 })
                gsap.to(_gameResetBTN, { autoAlpha: 1 })
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
            return thisCountry.text.map(item => {
                return "<p>" + item + "</p>";
            }).join("");
        }

        function options() {
            return thisCountry.questionOptions.map((item, index) => {
                return "<li><label><input type='checkbox' value='" + index + "'/><div class='checkbox'></div>" + item + "</label></li>";
            }).join("");
        }

        function questions() {
            return thisCountry.questions.map(item => {
                return "<li>" + item + "<input type='text'/></li>";
            }).join("");
        }

        function list() {
            return thisCountry.taskItems.map(item => {
                return "<li>" + item + "</li>";
            }).join("");
        }

        function images() {
            return thisCountry.taskImages.map(item => {
                return "<img src='" + item + "' alt=''/>";
            }).join("");
        }

        function audio() {
            return "<div id='audio-container' class='box__audio'>" +
                "<audio src='" + thisCountry.audio + "' preload='metadata'>" +
                "Your browser does not support the audio element." +
                "</audio>" +
                "<button class='play' id='play-icon'><i></i></button>" +
                "<span id='current-time' class='time'>0:00</span>" +
                "<input type='range' id='seek-slider' max='100' value='0'></input>" +
                "<span id='duration' class='time'>0:00</span>" +
                "</div > ";
        }

    },

    audioEvents: function () {

        const playIconContainer = document.getElementById('play-icon');
        const audioPlayerContainer = document.getElementById('audio-container');
        const seekSlider = document.getElementById('seek-slider');
        let playState = 'play';

        playIconContainer.addEventListener('click', () => {
            if (playState === 'play') {
                audio.play();
                audioPlayerContainer.classList.add('playing');
                backgroundMusic.mute();
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                audio.pause();
                audioPlayerContainer.classList.remove('playing');
                backgroundMusic.unmute();
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        });

        const showRangeProgress = (rangeInput) => {
            if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
            else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        }

        seekSlider.addEventListener('input', (e) => {
            showRangeProgress(e.target);
        });

        /** Implementation of the functionality of the audio player */

        const audio = document.querySelector('audio');
        const durationContainer = document.getElementById('duration');
        const currentTimeContainer = document.getElementById('current-time');
        let raf = null;

        const calculateTime = (secs) => {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        }

        const displayDuration = () => {
            durationContainer.textContent = calculateTime(audio.duration);
        }

        const setSliderMax = () => {
            seekSlider.max = Math.floor(audio.duration);
        }

        const displayBufferedAmount = () => {
            if (audio.onprogress) {
                const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
                audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
            }
        }

        const whilePlaying = () => {
            seekSlider.value = Math.floor(audio.currentTime);
            currentTimeContainer.textContent = calculateTime(seekSlider.value);
            audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
            raf = requestAnimationFrame(whilePlaying);
        }

        if (audio.readyState > 0) {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        } else {
            audio.addEventListener('loadedmetadata', () => {
                displayDuration();
                setSliderMax();
                displayBufferedAmount();
            });
        }

        audio.addEventListener('progress', displayBufferedAmount);

        seekSlider.addEventListener('input', () => {
            currentTimeContainer.textContent = calculateTime(seekSlider.value);
            if (!audio.paused) {
                cancelAnimationFrame(raf);
            }
        });

        seekSlider.addEventListener('change', () => {
            audio.currentTime = seekSlider.value;
            if (!audio.paused) {
                requestAnimationFrame(whilePlaying);
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

                let textInput = document.querySelector('.box__container').querySelectorAll('input[type=text]');
                let radioInput = document.querySelector('.box__container').querySelectorAll('input[type=checkbox]');
                const countryId = _modal.getAttribute("data-id");

                let answers = JSON.parse(readCookie('answers'));
                if (!answers) answers = new Array();


                if (textInput.length > 0) {
                    answers.forEach(item => {
                        item = JSON.parse(item);
                        item.values = JSON.parse(item.values);

                        if (item.country === countryId) {
                            item.values.forEach((value, index) => {
                                textInput[index].value = value;
                            })
                        };
                    })
                } else if (radioInput.length > 0) {
                    answers.forEach(item => {
                        item = JSON.parse(item);
                        if (item.country === countryId) {
                            radioInput[item.values].checked = true;
                        };
                    })
                }

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


            let textInput = document.querySelector('.box__container').querySelectorAll('input[type=text]');
            let radioInput = document.querySelector('.box__container').querySelectorAll('input[type=checkbox]');
            const countryId = _modal.getAttribute("data-id");

            let answers = JSON.parse(readCookie('answers'));
            if (!answers) answers = new Array();

            let arr = [];

            answers = answers.filter(answer => JSON.parse(answer).country !== countryId);

            if (textInput.length > 0) {

                textInput.forEach(el => arr.push(el.value));
                answers.push(
                    JSON.stringify({
                        "country": countryId,
                        "values": JSON.stringify(arr)
                    })
                )
                createCookie('answers', JSON.stringify(answers), 1);

            } else if (radioInput.length > 0) {

                let selectedValue;
                radioInput.forEach(el => { if (el.checked) selectedValue = el.value });
                answers.push(
                    JSON.stringify({
                        "country": countryId,
                        "values": selectedValue
                    })
                )
                createCookie('answers', JSON.stringify(answers), 1);
            }

            map.closeModal();
            gameCompleted.init();

        }, false);

        // Checkboxes
        document.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() !== 'input[type=text]') return;
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
const backgroundMusic = {
    muteIconContainer: document.getElementById('mute-icon'),
    audioPlayer: document.getElementById('background-audio'),
    muteState: 'unmute',

    init: function () {
        let scope = this;

        scope.audioPlayer.volume = 0.02;
        scope.clickEvents();
    },

    clickEvents: function () {
        let scope = this;
        scope.muteIconContainer.addEventListener('click', () => {
            if (scope.muteState === 'unmute') {
                scope.mute();
            } else {
                scope.unmute();
            }
        });
    },

    mute: function () {
        let scope = this;
        scope.audioPlayer.muted = true;
        scope.audioPlayer.parentElement.classList.add('muted');
        scope.muteState = 'mute';
    },

    unmute: function () {
        let scope = this;
        scope.audioPlayer.muted = false;
        scope.audioPlayer.parentElement.classList.remove('muted');
        scope.muteState = 'unmute';
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
        eraseCookie('answers');
        location.reload();
        return false;
    }, false);

    firstScreen.init();
    backgroundMusic.init();
});

window.addEventListener('load', () => map.init());