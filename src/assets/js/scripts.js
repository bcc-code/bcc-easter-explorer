// registering plugins for gsap
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

document.addEventListener("DOMContentLoaded", function () {
    loadingScreen.init();
});

window.addEventListener('load', () => {
    map.init();
});

const taskJSON = [
    {
        language: 'no',
        countries: [
            {
                ID: 'AU',
                country: 'Australia',
                type: 'question',
                text: 'I Australia feires påsken om høsten, i motsetning til andre land på den nordlige halvkule, hvor påsken er om våren. Påsken er en av de viktigste markeringene i den kristne kalender, som markerer Jesu oppstandelse fra de døde. Det er en tid for å samle familien. På påskedag begynner dagen med en stor påskeeggjakt for alle barna og avsluttes med et påskemåltid som vanligvis består av stekt lam og stekte grønnsaker. Det er mange aktiviteter for barna i påsketiden, som for eksempel fargelegging og maling av påskeegg. En annen tradisjon er hot cross boller som du kan kjøpe i god tid før påske. Det er søte boller, fylt med krydder og tørket frukt og dekorert med et hvitt kors som representerer Jesu kors.',
                listLabel: 'Hvilken årstid er det i Australia når de feirer påske?',
                listItems: [
                    'Sommer',
                    'Vinter',
                    'Høst',
                    'Vår'
                ],
            },
            {
                ID: 'RU',
                country: 'Russland',
                type: 'question',
                text: [
                    'Påsken er den viktigste høytiden for de kristne etter julen. Det er mange påsketradisjoner og -ritualer. Feiringen foregår fra mars til mai, avhengig av hvilke datoer ferien faller på. Påsken er en familieferie. I påskehelgen drar man til kirken, for bønn og for å bli velsignet. Påsken er også en feiring med god mat og tradisjonelle retter. Som i mange andre land, er det også en tradisjon i Russland å male egg og dekorere dem. Det er forskjellige leker knyttet til dekorerte egg. Det er for eksempel en lek hvor barna tar et egg hver og slår sitt egg mot en annens egg, det egg som sprekker sist vinner.',
                    'Dekorerte egg blir også vanligvis gitt til venner og familie som et symbol på takknemlighet. Til påske baker man en spesiell kake som heter Kulich. Kaken Kulich er et symbol på at Jesus er med oss.'
                ],
                listLabel: 'Hva heter den spesielle kaken som man baker i Russland?',
            },

            {
                ID: 'IN',
                country: 'India',
                type: 'task',
                text: 'I India feires ikke påske som en nasjonal feiring, men for kristne er det en hellig begivenhet. I BCC Bangalore feires påsken med en fest. Historien om Jesu oppstandelse fortelles, og barna får sjokolade eller marsipanegg. I det siste har vi vært med på de aktivitetene som BCC har organisert, og fulgt med på sendingene for barn.',
                description: 'Lag din egen sjokolade',
                listLabel: 'Du trenger: hvit, lys eller mørk sjokolade, noe godt du vil ha på din sjokolade f.eks. dryss, sjokoladeegg – eller kanin, godteri mm.',
                listItems: [
                    'Få hjelp fra en voksen som kan smelte sjokoladen for deg og legg det på en plate med bakepapir.',
                    'Legg hva du liker på den smeltet sjokoladen.',
                    'Legg den ferdige sjokoladen i fryseren og la den avkjøle.'
                ],
                taskImages: ['./images/india.png']
            },

            {
                ID: 'ZA',
                country: 'Sør-Afrika',
                type: 'task',
                text: 'Påsken i Sør-Afrika foregår i vakkert høstvær som ikke er for varmt eller kaldt. Vi har også tradisjonen med å lage påske-egg-jakt, som i mange andre land. Påskeharen gjemmer eggene overalt, både inne i våre hus og ute i hagen. Det mest populære godteriet i påsken er et marshmallow-påskeegg og hot cross-boller. I kristne familier forteller man også historien om påsken og hvordan Jesu ble korsfestet og stod opp igjen for oss. Det er mange som tar ferie i påsken og er samlet med hele familien. Om søndagen lager vi en stor, nydelig påskemorgen-frokost med familiene våre. Noen familier leker også noe vi kaller "boeresport", det er blant annet «egg på en skje»-løp, sekkeløp etc',
                description: 'Lag en stafett hvor du skal løpe med ett egg på en skje',
            },

            {
                ID: 'US',
                country: 'USA',
                audio: './audio/test.mp3',
                type: 'task',
                image: './images/usa.png',
                text: 'I Amerika har vi mange morsomme måter å feire påsken på. Blant annet fyller vi mange fargerike plastegg med alle slags godterier og da er det noen som kler seg ut som den søte påskeharen og gjemmer disse eggene på alle mulige steder, for eksempel i trærne, i gresset, ja overalt. Etter at haren har gjemt eggene går vi på påskeeggjakt for å finne de. Etter at vi har funnet dem, spiser vi alt det deilige godteriet. Vi feirer også påsken med påskekurver, hvor vi fyller en kurv med leker og store sjokoladekaniner, sjokoladekyllinger og sjokoladeegg. Når vi har fylt disse kurvene, møter vi våre venner og gir kurvene til hverandre. Vi bruker også kurvene til alle eggene vi fant på påskeeggjakten. Men det viktigste vi gjør for å feire denne dagen, er å komme sammen og lese påskehistorien om Jesus, og spise sammen. Det er en morsom og festlig høytid.',
                description: 'Lag din egen mini-påskeeggkurv.',
                listLabel: 'Du trenger: toalettpapirruller, maling eller fargerikt papir, saks og lim.',
                listItems: [
                    'Først fargelegger du papirrullene eller limer litt fargerikt papir på dem.',
                    'Når de er tørre, skjærer du dem i to, eller i et sikksakk-mønster hvis du vil lage en gresskurv som på bildet.',
                    'Klipp en lang papirstrimmel og lim den på innsiden av toalettpapir-rullen slik at den blir en bue. Dette blir et håndtak.',
                    'For å dekorere de små påskeeggkurvene dine, kan du også klippe vinger og et nebb for kyllingene, lange ører for kaninene og blomster til gresset.'
                ]
            },

            {
                ID: 'IS',
                country: 'Israel',
                type: 'task',
                image: './images/usa.png',
                text: 'I Israel feirer man ikke påske, men noe som heter Pesach. Jødene feirer at de ble frie fra livet som slaver i Egypt, for mange, -mange hundre år siden. Familiene kommer sammen, spiser god mat, synger og ber. Det er også tradisjon å fortelle historier til barna fra den gangen jødene var slaver. En annen tradisjon under Pesach, er at man ikke skal spise brød som er hevet. Denne tradisjonen kommer fra den dagen jødene ble fridd ut, da hadde de ikke tid til å vente på at brødet skulle heve, fordi de måtte skynde seg ut av husene sine og følge Moses. Butikkene i Israel slutter å selge brød i hele 8 dager under denne høytiden. Istedenfor brød er det vanlig å spise et slags knekkebrød som heter “Matzah”.',
                description: 'Lage “Matzah” knekkebrød. Det kan være lurt å spørre foreldrene dine om hjelp.',
                listLabel: 'Dette trenger du for å lage “Matzah”:',
                listItems: [
                    '1 dl hvetemel',
                    '1 te skje salt',
                    '2 spiseskjeer med oliven olje',
                    '1,5 dl varmt vann'
                ],
                extraText: [
                    'Få hjelp av en voksen til å kjevle dem ut og steke dem'
                ]
            },

            {
                ID: 'NO',
                country: 'Norge',
                type: 'question',
                audio: './audio/test.mp3',
                text: 'Påsken er en høytid som feires av både kristne og jøder i Norge. Jødene minnes at de ble frie etter langvarig fangenskap i Egypt, mens kristne markerer at Jesus døde på korset og stod opp igjen den tredje dag. I norske kirker er det tradisjon for å synge salmen; "Påskemorgen slukker sorgen"- (skrevet av Nikolai Frederik Grundtvig i 1843), som vi også synger under påskestevnet på Brunstad. I barnehager og skoler feirer en med påskefrokost og påskeverksted, hvor barn maler og dekorerer egg og lager påskepynt med fjær osv. Noen har også opplevd at påskeharen har vært og gjemt påskeegg med godteri i huset eller ute i hagen. Mange norske familier tilbringer påskeferien på hytter i fjellet, hvor en gjerne går på skiturer og spiser kvikklunsj, sjokolade og appelsiner',
                listItems: [
                    'Hvem har skrevet salmen; "Påskemorgen slukker sorgen"?',
                    'Hva gjør påskeharen?',
                    'Hva pleier nordmenn å ha med som pausemat når de er på skitur i påsken?']
            },

            {
                ID: 'PE',
                country: 'Peru',
                audio: './audio/test.mp3',
                type: 'task',
                text: [
                    'Peru er delt i 3 store områder, med kyst, fjell og jungel. Allikevel har vi i hele Peru de samme påsketradisjonene. Vi lager i stand en festlig påsketid, spesielt for barna.',
                    'I påsken sender alle TV-kanaler fra Peru kun historier fra Bibelen og om Jesus, både til barna og voksne, alle dager i påsken.',
                    'På markedet kan en finne fisk og sjømat, fordi det er en tradisjon at på «lang-fredag» skal en kun spise fisk og ikke noe annet kjøtt.',
                    'Til dessert er det vanlig å lage forskjellige, gode desserter i mange farger. Barna elsker det! Spesielt «Lilla Mazamorra ,  arroz con leche». Det er en rosa dessert - nam nam !',
                    'I menigheten lager vi alltid påskeeggjakt for barna og barna kler seg ut som små kaniner! Det er veldig koselig!'],
                description: 'Lage en kaninørehatt',
                listLabel: 'Du trenger: Hvit og rosa papp, saks, lim og stiftemaskin.',
                listItems: [
                    'Bruk hvit og rosa papp til å kutte ut kaninøreformene: to hvite og to rosa, den rosa skal være litt mindre.',
                    'Lim de rosa ørene på de hvite ørene.',
                    'Lim ørene på en lang, hvit papp-stripe, mål slik at den passer til ditt hode, og stift endene sammen for å danne et hodebånd.'
                ],
                taskImages: ['./images/peru.png'],
            },

            {
                ID: 'CH',
                country: 'Kina',
                type: 'task',
                text: 'I Hong Kong er det vanlig å gå på påskeeggjakt i påsken. Vi lager panda-egg og gjemmer de i bambus-skogen. Vi leker at vi er veldig gode venner med pandaene i Kina, så vi går på påskeeggjakt sammen med pandaene, som ofte hjelper til med å finne mange egg.',
                description: 'Mal eller tegn et panda-egg.',
                listLabel: 'Du trenger: et kokt, avkjølt egg, svart og hvit tusj eller maling, malerpensel og vann til å rense penselen',
                extraText: 'Tegne en panda på egget: se eksempel',
                taskImages: [
                    './images/china.jpg',
                    './images/china2.jpg',
                    './images/china3.jpg'
                ]
            },

            {
                ID: 'PO',
                country: 'Polen',
                audio: './audio/test.mp3',
                type: 'question',
                text:
                    'Påskedag i Polen er en skikkelig vanndag og i noen familier, vekker foreldrene barna sine med å sprute vann på dem. Hele dagen leker barna med vann og bruker vanngevær og plast-egg full av vann. Sist på dagen er det en vannkamp, hvor folk sprøyter med vann på hverandre. Kanskje det er bedre å være inne denne dagen',
                listLabel: 'Hvordan vekker foreldrene sine barn på morgenen?',
                listItems: [
                    'Hiver av dem dyna',
                    'Spruter vann på dem',
                    'Med kyss'
                ]
            },

        ],
        strings: {
            complete: 'Ferdig',
            descHeading: 'Oppgave',
            listHeading: 'Hvordan lage de',
            questionHeading: 'Spørsmål',
            completeHeading: 'Spillet fullført',
            completedText: 'Gå til brunstadTv-appen og last opp bildet ditt',
            completedButtonSRC: 'https://brunstad.tv/live',
        }

    }
]

const task = {
    template: {
        ID: '',
        country: '',
        type: '',
        audio: '',
        image: '',
        text: '',
        description: '',
        listLabel: '',
        listItems: [],
        taskImages: [],
        extraText: ''
    },

    questionHTML: function (_this, _globalStrings, _totalTask) {

        const tasksCompleted = JSON.parse(readCookie('tasks_completed'));
        const currentIndex = tasksCompleted ? tasksCompleted.length + 1 : 1;

        function list() {
            return _this.listItems.map(function (item) {
                return "<li>" + item + "</li>";
            }).join("");
        }

        function audio() {
            return "<div id='audio-container'>" +
                "<audio controls src='" + _this.audio + "'>" +
                "Your browser does not support the audio element." +
                "</audio>" +
                "<div class='play'>" +
                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 25'><path d='M19.875 10.078L3.375.328C2.015-.469 0 .328 0 2.25v19.5c0 1.781 1.875 2.86 3.375 1.969l16.5-9.75c1.453-.89 1.453-3 0-3.89z' /></svg>" +
                "</div>" +
                "<span class='label'>play audio</span>" +
                "</div > ";
        }

        return "<div class='question'>" +
            "<div class='question__char'></div>" +
            "<div class='question__header'>" +
            "<div class='question__label'><span>" + _this.country + "</span><span>" + currentIndex + "/" + _totalTask + "</span></div>" +
            audio() +
            "<div class='modal__close'></div>" +
            "</div>" +
            "<div class='question__content'>" +
            "<h2>" + _this.country + "</h2>" +
            "<p>" + _this.text + "</p>" +
            "<span>" + _globalStrings.questionHeading + "</span>" +
            "<p>" + _this.listLabel + "</p>" +
            "<ol>" + list() + "</ol>" +
            "</div>" +
            "<a href='javascript:void(0)' class='submitBTN'  id='" + _this.ID + "'>" + _globalStrings.complete + "</a>" +
            "</div>";
    },

    taskHTML: function (_this, _globalStrings, _totalTask) {

        const tasksCompleted = JSON.parse(readCookie('tasks_completed'));
        const currentIndex = tasksCompleted ? tasksCompleted.length + 1 : 1;

        function list() {
            return _this.listItems.map(function (item) {
                return "<li>" + item + "</li>";
            }).join("");
        }

        function images() {
            return _this.taskImages.map(function (item) {
                return "<img src='" + item + "' alt=''/>";
            }).join("");
        }

        function audio() {
            return "<div id='audio-container'>" +
                "<audio controls src='" + _this.audio + "'>" +
                "Your browser does not support the audio element." +
                "</audio>" +
                "<div class='play'>" +
                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 25'><path d='M19.875 10.078L3.375.328C2.015-.469 0 .328 0 2.25v19.5c0 1.781 1.875 2.86 3.375 1.969l16.5-9.75c1.453-.89 1.453-3 0-3.89z' /></svg>" +
                "</div>" +
                "<span class='label'>play audio</span>" +
                "</div > ";
        }

        return "<div class='task'>" +
            "<div class='modal__close'></div>" +
            "<div class='task__label'><span>" + currentIndex + "/" + _totalTask + "</span></div>" +
            audio() +
            "<div class='task__content'>" +
            "<h2>" + _this.country + "</h2>" +
            "<img src='" + _this.image + "' alt=''/>" +
            "<p>" + _this.text + "</p>" +
            "<span>" + _globalStrings.descHeading + "</span>" +
            "<p>" + _this.description + "</p>" +
            "<span>" + _globalStrings.listHeading + "</span>" +
            "<p>" + _this.listLabel + "</p>" +
            "<ol>" + list() + "</ol>" +
            "<p>" + _this.extraText + "</p>" +
            "<div class='task__images'>" + images() + "</div>" +
            "<a href='javascript:void(0)' class='submitBTN' id='" + _this.ID + "'>" + _globalStrings.complete + "</a>" +
            "</div>" +
            "</div>";
    },

    audioEvents: function () {

        const audioContainer = document.getElementById('audio-container');
        const audio = audioContainer.querySelector('audio');
        const audioBtn = audioContainer.querySelector('.play');
        const audioLabel = audioContainer.querySelector('.label');

        if (!audio.getAttribute('src').length > 0) return audioContainer.remove();

        audioBtn.addEventListener('click', function () {
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

    init: function (ID) {
        const obj = taskJSON.filter(n => n.language === 'no');
        let total = obj[0].countries.length;
        let thisStrings = obj[0].strings;
        let thisCountry = obj[0].countries.find(obj => {
            return obj.ID === ID;
        });

        thisCountry = Object.assign({}, task.template, thisCountry);

        if (thisCountry.type === "question") {
            document.querySelector('.modal__content').innerHTML = task.questionHTML(thisCountry, thisStrings, total);
            document.querySelector('.modal').classList.add('question');
        } else {
            document.querySelector('.modal__content').innerHTML = task.taskHTML(thisCountry, thisStrings, total);
            document.querySelector('.modal').classList.add('task')
        }

    }
}

const map = {

    closeModal: function () {
        document.querySelector('body').classList.remove('overlay');

        gsap.to('.modal', {
            autoAlpha: 0,
            display: 'none',
            onComplete: () => {
                document.querySelector('.modal__content').innerHTML = '';
                document.querySelector('.modal').setAttribute('class', 'modal');
            }
        });

    },

    openModal: function (ID) {
        gsap.to('.modal', { autoAlpha: 1, display: 'block' });
        document.querySelector('.modal').classList.add(ID);
        document.querySelector('body').classList.add('overlay');

        task.init(ID);
        task.audioEvents();

        let completedTasks = JSON.parse(readCookie('tasks_completed'));
        if (!completedTasks) completedTasks = new Array();
        if (completedTasks.includes(ID)) {
            document.getElementById(ID).classList.add('completed');
            document.querySelector('.modal').classList.add('completed');
        }

    },

    eventListeners: function () {

        const countries = document.querySelectorAll('#map-area > g:not(#World)');

        let completedTasks = JSON.parse(readCookie('tasks_completed'));
        if (!completedTasks) completedTasks = new Array();

        completedTasks.forEach(el => {
            document.getElementById(el).classList.add('completed');
        });


        // Open Modal
        countries.forEach(path => {
            path.addEventListener('click', e => {
                map.openModal(e.target.getAttribute('class'));
            }, false);
        });

        // Close modal
        document.addEventListener('click', e => {
            if (!e.target.classList.contains('modal__close')) return;
            map.closeModal();
        }, false);

        // Submit button
        document.addEventListener('click', e => {
            if (!e.target.classList.contains('submitBTN')) return;
            e.preventDefault();

            let tasksCompleted = JSON.parse(readCookie('tasks_completed'));
            if (!tasksCompleted) tasksCompleted = new Array();
            tasksCompleted.push(e.target.getAttribute('id'));

            let uniqueCompletedTasks = tasksCompleted.filter((v, i, a) => a.indexOf(v) === i);
            createCookie('tasks_completed', JSON.stringify(uniqueCompletedTasks), 1);
            e.target.closest('.modal').classList.add('completed');
            document.getElementById(e.target.getAttribute('id')).classList.add('completed');

            map.completed();

        }, false);

        // Cursor
        document.addEventListener('mousemove', e => {
            document.querySelector('.cursor').setAttribute("style", "top: " + (e.pageY - 60) + "px; left: " + (e.pageX - 50) + "px");
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

        if (document.querySelector('.modal').offsetWidth > 0 && document.querySelector('.modal').offsetHeight > 0) return;

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
            gsap.to(document.querySelector('.cursor'), { autoAlpha: 0 });
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

    completed: function () {
        const obj = taskJSON.filter(n => n.language === 'no');
        let thisStrings = obj[0].strings;
        let tl = gsap.timeline();

        function completedHTML(_globalStrings) {
            return "<div class='gameCompleted'>" +
                "<div class='completed__content'>" +
                "<span></span>" +
                "<h2>" + _globalStrings.completeHeading + "</h2>" +
                "<p>" + _globalStrings.completedText + "</p>" +
                "<a href='" + _globalStrings.completedButtonSRC + "'>Brunstad TV</a>" +
                "</div>" +
                "</div>";
        }

        let completedTasks = JSON.parse(readCookie('tasks_completed'));
        if (completedTasks.length === taskJSON[0].countries.length) {
            document.querySelector('body').classList.add('completed');
            document.querySelector('body').insertAdjacentHTML('beforeend', completedHTML(thisStrings));

            tl
                .to(document.querySelector('.modal'), { autoAlpha: 0 })
                .to(document.querySelector('.gameCompleted'), { autoAlpha: 1, delay: 1 })

        }
    },

    init: function () {
        map.eventListeners();
        map.zoomEffect();

        map.completed();
    }

}

const charScreen = {
    clickEvents: function () {
        const button = document.querySelectorAll('.card__container');

        button.forEach(el => {
            el.addEventListener('click', e => {
                const character = e.target.closest('.card').classList.contains('boy') ? 'boy' : 'girl';
                document.querySelector('body').classList.add(character);
                createCookie('character', character, 1);

                var tl = gsap.timeline();

                tl
                    .to(document.querySelector('.character'), { autoAlpha: 0 })
                    .to(document.querySelector('.container'), { autoAlpha: 1 });
            });
        });

    },

    init: function () {
        this.clickEvents();

        const charPage = document.querySelector('.character');
        const mapPage = document.querySelector('.container');

        const character = readCookie('character');

        if (character != null) {
            document.querySelector('body').classList.add(character);

            let tl = gsap.timeline();

            tl
                .to(charPage, { autoAlpha: 0 })
                .to(mapPage, { autoAlpha: 1 });
        } else {
            let tl = gsap.timeline();

            tl
                .to(charPage, { autoAlpha: 1 })
                .to(mapPage, { autoAlpha: 0 });
        }
    }
}

const loadingScreen = {
    init: function () {
        const loader = document.querySelector('.loader');
        const loading = document.querySelector('.loading');
        let tl = gsap.timeline();

        tl
            .set(loading, { autoAlpha: 1 })
            .to(loader, { y: 0, opacity: 1, duration: 2 })
            .to(loading, {
                autoAlpha: 0, onComplete: (() => {
                    charScreen.init();
                })
            })


    }
}

// Helpers

// function listen(type, selector, callback) {
//     document.addEventListener(type, event => {
//         const target = event.target.closest(selector);

//         if (target) {
//             callback(event, target);
//         }
//     });
// }

function appendHTML(container, content) {
    const el = document.querySelector(container);
    el.innerHTML = content;
    return el;
};

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}