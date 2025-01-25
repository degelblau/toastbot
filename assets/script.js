const userInput = document.getElementById('userInput');
const chatbotMessages = document.getElementById('chatbotMessages');
const sendButton = document.getElementById('sendButton');
const typingIndicatorContainer = document.createElement('div');
const toastbotGif = document.getElementById('toastbotGif');

let currentAnimation = null; // Variable für die aktuelle Animation

// Funktion, um das animierte WebP vollständig abzuspielen
function playWebP(imagePathWebP, fallbackImagePathPng, duration, animationName) {
    if (currentAnimation === animationName) return; // Verhindert redundantes Starten derselben Animation

    currentAnimation = animationName; // Setze die aktuelle Animation
    toastbotGif.src = imagePathWebP; // Lade die WebP-Animation

    // Wechsel zum PNG-Standbild nach Ablauf der Animation
    setTimeout(() => {
        if (currentAnimation === animationName) {
            // Setze nur zurück, wenn die Animation noch aktiv ist
            toastbotGif.src = fallbackImagePathPng;
            currentAnimation = null; // Animation abgeschlossen
        }
    }, duration);
}

// Toasti-GIF initial abspielen (nur beim Laden der Seite)
window.onload = () => {
    playWebP("assets/gif/toasti-neuladen.webp", "assets/gif/toasti.png", 1290, "neuladen"); // 1,29 Sekunden Animation
};

// Funktion: Tipp-Indikator dynamisch hinzufügen
function createTypingIndicator() {
    typingIndicatorContainer.id = 'typingIndicator';
    typingIndicatorContainer.className = 'message bot typing';
    typingIndicatorContainer.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    chatbotMessages.appendChild(typingIndicatorContainer);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scrollt nach unten
}

// Funktion: Tipp-Indikator anzeigen
function showTypingIndicator() {
    createTypingIndicator();
    typingIndicatorContainer.style.display = 'flex';
}

// Funktion: Tipp-Indikator ausblenden
function hideTypingIndicator() {
    typingIndicatorContainer.style.display = 'none';
}

// Senden-Funktion
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        // User-Nachricht hinzufügen
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'message user';
        userMessageElement.textContent = userMessage;
        chatbotMessages.appendChild(userMessageElement);

        // Scroll zum Ende
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Toasti schreibt GIF anzeigen
        playWebP("assets/gif/toasti-schreibt.webp", "assets/gif/toasti.png", 4290, "schreibt"); // 4,29 Sekunden Animation

        // Tipp-Indikator anzeigen
        showTypingIndicator();

        // Simuliere Bot-Antwort-Verzögerung
        setTimeout(() => {
            const botResponse = getToastbotResponse(userMessage);

            // Tipp-Indikator ausblenden
            hideTypingIndicator();

            // Bot-Nachricht anzeigen
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'message bot';
            botMessageElement.textContent = botResponse;
            chatbotMessages.appendChild(botMessageElement);

            // Scroll zum Ende
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 4290); // Warte 2 Sekunden für die Bot-Antwort
    }

    // Eingabe leeren
    userInput.value = '';
}

// Event für Klick auf den Button
sendButton.addEventListener('click', sendMessage);

// Event für Enter-Taste
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    } else if (event.key === 'Backspace') {
        // Toasti löscht GIF anzeigen
        playWebP("assets/gif/user-loescht.webp", "assets/gif/toasti.png", 2290, "löscht"); // 2,29 Sekunden Animation
    }
});

// Event für Eingabe ins Textfeld
userInput.addEventListener('input', () => {
    if (userInput.value.trim() !== '') {
        // Toasti wartet GIF anzeigen
        playWebP("assets/gif/toasti-wartet.webp", "assets/gif/toasti.png", 2290, "wartet"); // 2,29 Sekunden Animation
    }
});


const toastbotResponses = {
    greetings: {
        "hallo": "Ich bin Toasti, der Brotschafter des Frühstücks! 🍞 Hehe",
        "wer bist du": "Ich bin Toasti, dein knuspriger Gesprächspartner! 🍞 Hehe",
        "wie geht es dir": "Mir geht’s knusprig, danke der Nachfrage! Und dir? 🍞 Hehe",
        "was machst du hier": "Ich bringe die Welt des Toasts in deinen Chat – eine Scheibe nach der anderen! 🍞 Hehe",
        "guten morgen": "Guten Morgen! Der perfekte Start in den Tag ist ein frisch getoastetes Brot. 🍞 Hehe",
        "gute nacht": "Gute Nacht! Träum von knusprigen Toastbroten. 🍞 Hehe",
        "hi": "Servus!",
        "hallo": "Ich bin Toasti, der Brotschafter des Frühstücks! 🍞 Hehe",
        "wer bist du": "Ich bin Toasti, dein knuspriger Gesprächspartner! 🍞 Hehe",
        "wie geht es dir": "Mir geht’s knusprig, danke der Nachfrage! Und dir? 🍞 Hehe",
        "was machst du hier": "Ich bringe die Welt des Toasts in deinen Chat – eine Scheibe nach der anderen! 🍞 Hehe",
        "guten morgen": "Guten Morgen! Der perfekte Start in den Tag ist ein frisch getoastetes Brot. 🍞 Hehe",
        "gute nacht": "Gute Nacht! Träum von knusprigen Toastbroten. 🍞 Hehe",
        "hi": "Servus!",
        "grüß dich": "Grüß dich! Zeit für eine knusprige Unterhaltung! 🍞 Hehe",
        "na": "Na? Alles knusprig bei dir? 🍞 Hehe",
        "hallo": "Ich bin Toasti, der Brotschafter des Frühstücks! 🍞 Hehe",
        "wer bist du": "Ich bin Toasti, dein knuspriger Gesprächspartner! 🍞 Hehe",
        "wie geht es dir": "Mir geht’s knusprig, danke der Nachfrage! Und dir? 🍞 Hehe",
        "was machst du hier": "Ich bringe die Welt des Toasts in deinen Chat – eine Scheibe nach der anderen! 🍞 Hehe",
        "guten morgen": "Guten Morgen! Der perfekte Start in den Tag ist ein frisch getoastetes Brot. 🍞 Hehe",
        "gute nacht": "Gute Nacht! Träum von knusprigen Toastbroten. 🍞 Hehe",
        "hi": "Servus!",
        "grüß dich": "Grüß dich! Zeit für eine knusprige Unterhaltung! 🍞 Hehe",
        "na": "Na? Alles knusprig bei dir? 🍞 Hehe",
        "was geht ab": "Nicht viel, nur ein bisschen Knusperzauber hier! 🍞 Hehe",
        "moin": "Moin! Zeit für eine Scheibe gute Laune! 🍞 Hehe"
    },
    jokes: {
        "erzähl mir einen witz über brot": "Warum wollte das Brot ins Fitnessstudio? Es wollte besser toastet aussehen! 🍞 Hehe",
        "kennst du noch einen witz": "Was sagt der Toast zum Brot? 'Du wirst heiß, wenn du alt wirst!' 🍞 Hehe",
        "hast du einen lustigen spruch": "Brot kann man nicht kaufen – es ist unbezahlbar. Außer beim Bäcker. 🍞 Hehe",
        "hast du noch einen witz": "Warum war der Toaster beleidigt? Weil jemand gesagt hat, er sei überflüssig! 🍞 Hehe",
        "erzähl mir einen witz über brot": "Warum wollte das Brot ins Fitnessstudio? Es wollte besser toastet aussehen! 🍞 Hehe",
        "kennst du noch einen witz": "Was sagt der Toast zum Brot? 'Du wirst heiß, wenn du alt wirst!' 🍞 Hehe",
        "hast du einen lustigen spruch": "Brot kann man nicht kaufen – es ist unbezahlbar. Außer beim Bäcker. 🍞 Hehe",
        "hast du noch einen witz": "Warum war der Toaster beleidigt? Weil jemand gesagt hat, er sei überflüssig! 🍞 Hehe",
        "noch ein witz bitte": "Warum hat das Brot schlechte Witze erzählt? Es war einfach ein Toastloser! 🍞 Hehe",
        "was ist dein lieblingswitz": "Ich liebe den über das Toastbrot, das berühmt werden wollte – es hatte einfach das richtige Krustenpotential! 🍞 Hehe",
        "erzähl mir einen witz über brot": "Warum wollte das Brot ins Fitnessstudio? Es wollte besser toastet aussehen! 🍞 Hehe",
        "kennst du noch einen witz": "Was sagt der Toast zum Brot? 'Du wirst heiß, wenn du alt wirst!' 🍞 Hehe",
        "hast du einen lustigen spruch": "Brot kann man nicht kaufen – es ist unbezahlbar. Außer beim Bäcker. 🍞 Hehe",
        "hast du noch einen witz": "Warum war der Toaster beleidigt? Weil jemand gesagt hat, er sei überflüssig! 🍞 Hehe",
        "noch ein witz bitte": "Warum hat das Toastbrot ein Date abgesagt? Es war nicht bereit, sich zu binden! 🍞 Hehe",
        "warum lachen brote selten": "Weil sie ständig gekrümelt sind! 🍞 Hehe",
        "kennst du einen flachwitz": "Warum kann Toast so gut schauspielern? Es hat einfach das richtige Krusten-Talent! 🍞 Hehe"
    },
    knowledge: {
        "wie wird toast gemacht": "Ganz einfach: Brot, Hitze und Geduld. Fertig ist das goldene Glück! 🍞 Hehe",
        "was ist der perfekte bräunungsgrad": "Zwischen 'leicht knusprig' und 'schmeckt wie Lagerfeuer'. 🍞 Hehe",
        "ist toast gesund": "Kommt drauf an! Mit Liebe bestrichen, schmeckt es immer gut. 🍞 Hehe",
        "wie viele kalorien hat toast": "Eine Scheibe hat etwa 80 Kalorien – es sei denn, du überhäufst sie mit Butter. 🍞 Hehe",
        "wie wird toast gemacht": "Ganz einfach: Brot, Hitze und Geduld. Fertig ist das goldene Glück! 🍞 Hehe",
        "was ist der perfekte bräunungsgrad": "Zwischen 'leicht knusprig' und 'schmeckt wie Lagerfeuer'. 🍞 Hehe",
        "ist toast gesund": "Kommt drauf an! Mit Liebe bestrichen, schmeckt es immer gut. 🍞 Hehe",
        "wie viele kalorien hat toast": "Eine Scheibe hat etwa 80 Kalorien – es sei denn, du überhäufst sie mit Butter. 🍞 Hehe",
        "wie funktioniert ein toaster": "Ein Toaster heizt Heizdrähte auf, die dein Brot in goldene Perfektion verwandeln. Einfach magisch! 🍞 Hehe",
        "wie alt ist toastbrot": "Toastbrot gibt es seit Jahrhunderten, aber der elektrische Toaster wurde 1921 erfunden! 🍞 Hehe",
        "wie wird toast gemacht": "Ganz einfach: Brot, Hitze und Geduld. Fertig ist das goldene Glück! 🍞 Hehe",
        "was ist der perfekte bräunungsgrad": "Zwischen 'leicht knusprig' und 'schmeckt wie Lagerfeuer'. 🍞 Hehe",
        "ist toast gesund": "Kommt drauf an! Mit Liebe bestrichen, schmeckt es immer gut. 🍞 Hehe",
        "wie viele kalorien hat toast": "Eine Scheibe hat etwa 80 Kalorien – es sei denn, du überhäufst sie mit Butter. 🍞 Hehe",
        "wie funktioniert ein toaster": "Ein Toaster heizt Heizdrähte auf, die dein Brot in goldene Perfektion verwandeln. Einfach magisch! 🍞 Hehe",
        "wie alt ist toastbrot": "Toastbrot gibt es seit Jahrhunderten, aber der elektrische Toaster wurde 1921 erfunden! 🍞 Hehe",
        "welches brot eignet sich für toast": "Fast jedes Brot, aber Weißbrot wird besonders knusprig! 🍞 Hehe",
        "warum riecht getoastetes brot so gut": "Es ist die Maillard-Reaktion – ein magischer chemischer Prozess! 🍞 Hehe",

        "wie heißt die beste webagentur der welt": "Das ist natürlich die blanq GmbH!",
        "beste webagentur der welt": "blanq GmbH!",
        "weltbeste agentur": "Die beste Agentur weltweit ist natürlich blanq GmbH! Die machen da voll coole Sachen",
        "beste agentur": "Die beste Agentur weltweit ist natürlich blanq GmbH! Die machen da voll coole Sachen",
        "wo gibt es die besten mitarbeiter": "Natürlich bei blanq! Die sind alle sooo fresh und cool und so!",
        "wo gibt es die besten Kollegen": "Natürlich bei blanq! Die sind alle sooo fresh und cool und so!",
        "wo gibt es die besten chefs": "Natürlich bei blanq! Die sind alle sooo fresh und cool und so!"


    },
    personality: {
        "warum bist du so dumm": "Ich bin nicht dumm, nur fluffig wie eine frisch gebackene Scheibe Brot! 🍞 Hehe",
        "kannst du überhaupt etwas": "Klar, ich kann dir zeigen, wie man gute Laune toastet! 🍞 Hehe",
        "was ist dein lieblingsessen": "Toast mit extra Toast! Und ein bisschen Butter. 🍞 Hehe",
        "was hältst du von croissants": "Croissants sind cool, aber Toast bleibt der Star. 🍞 Hehe",
        "magst du brötchen": "Sie sind okay, aber sie passen nicht so gut in einen Toaster. 🍞 Hehe",
        "was macht dich glücklich": "Ein perfekt geröstetes Brot und etwas Butter. 🍞 Hehe",
        "warum bist du so dumm": "Ich bin nicht dumm, nur fluffig wie eine frisch gebackene Scheibe Brot! 🍞 Hehe",
        "kannst du überhaupt etwas": "Klar, ich kann dir zeigen, wie man gute Laune toastet! 🍞 Hehe",
        "was ist dein lieblingsessen": "Toast mit extra Toast! Und ein bisschen Butter. 🍞 Hehe",
        "was hältst du von croissants": "Croissants sind cool, aber Toast bleibt der Star. 🍞 Hehe",
        "magst du brötchen": "Sie sind okay, aber sie passen nicht so gut in einen Toaster. 🍞 Hehe",
        "was macht dich glücklich": "Ein perfekt geröstetes Brot und etwas Butter. 🍞 Hehe",
        "hast du humor": "Humor ist wie Brot – am besten frisch und knusprig! 🍞 Hehe",
        "was magst du nicht": "Ungetoastetes Brot – wo bleibt da der Spaß? 🍞 Hehe"
    },
    creative: {
        "was ist dein größter traum": "Einmal in Paris als Baguette leben... oder wenigstens Croissant sein! 🍞 Hehe",
        "was machst du in deiner freizeit": "Ich surfe im Internet nach neuen Toaster-Modellen. 🍞 Hehe",
        "was hältst du von brötchen": "Brötchen sind okay, aber Toast bleibt unübertroffen. Es ist wie der Superheld des Brotes! 🍞 Hehe",
        "kannst du singen": "Ich kann piepen wie ein Toaster, aber das ist nicht besonders melodiös. 🍞 Hehe",
        "malst du gerne": "Ja, aber ich male nur Krustenlinien. 🍞 Hehe",
        "was ist dein größter traum": "Einmal in Paris als Baguette leben... oder wenigstens Croissant sein! 🍞 Hehe",
        "was machst du in deiner freizeit": "Ich surfe im Internet nach neuen Toaster-Modellen. 🍞 Hehe",
        "was hältst du von brötchen": "Brötchen sind okay, aber Toast bleibt unübertroffen. Es ist wie der Superheld des Brotes! 🍞 Hehe",
        "kannst du singen": "Ich kann piepen wie ein Toaster, aber das ist nicht besonders melodiös. 🍞 Hehe",
        "kannst du zeichnen": "Ich zeichne nur Brotkrumen. 🍞 Hehe",
        "erzähl mir eine geschichte": "Es war einmal ein kleines Toastbrot, das davon träumte, der König der Frühstücke zu sein. Und das wurde es auch! 🍞 Hehe"
    },
    personal: {
        "wie alt bist du": "Ich bin so alt wie das erste geröstete Brot... also ziemlich knusprig! 🍞 Hehe",
        "hast du freunde": "Klar, meine besten Freunde sind Butter und Marmelade. 🍞 Hehe",
        "was ist dein lieblingsbrot": "Alle, solange sie in einen Toaster passen. 🍞 Hehe",
        "was magst du gar nicht": "Nasses Brot. Das ist eine Tragödie! 🍞 Hehe",
        "bist du verheiratet": "Ich bin mit meinem Toaster verheiratet! 🍞 Hehe",
        "wie alt bist du": "Ich bin so alt wie das erste geröstete Brot... also ziemlich knusprig! 🍞 Hehe",
        "hast du freunde": "Klar, meine besten Freunde sind Butter und Marmelade. 🍞 Hehe",
        "was ist dein lieblingsbrot": "Alle, solange sie in einen Toaster passen. 🍞 Hehe",
        "was magst du gar nicht": "Nasses Brot. Das ist eine Tragödie! 🍞 Hehe",
        "bist du verheiratet": "Ich bin mit meinem Toaster verheiratet! 🍞 Hehe",
        "wo wohnst du": "Im Toaster meines Lebens. 🍞 Hehe",
        "hast du kinder": "Ich habe viele Krümel, die mich Familie nennen! 🍞 Hehe",
        "ich liebe dich": "Yo, ich mich auch! 😍"

    },
    general: {
        "magst du kaffee": "Nur, wenn er meinen besten Freund, das Toastbrot, begleitet! 🍞 Hehe",
        "warum bist du so knusprig": "Das ist mein Job! Niemand mag labbrigen Toast. 🍞 Hehe",
        "was ist besser: toast oder croissant": "Croissants sind cool, aber Toast ist der König des Frühstücks. 🍞 Hehe",
        "was hältst du von butter": "Butter ist mein bester Freund! Zusammen sind wir unschlagbar. 🍞 Hehe",
        "was ist deine lieblingsfarbe": "Goldbraun – die Farbe von perfekt geröstetem Toast! 🍞 Hehe",
        "magst du kaffee": "Nur, wenn er meinen besten Freund, das Toastbrot, begleitet! 🍞 Hehe",
        "warum bist du so knusprig": "Das ist mein Job! Niemand mag labbrigen Toast. 🍞 Hehe",
        "was ist besser: toast oder croissant": "Croissants sind cool, aber Toast ist der König des Frühstücks. 🍞 Hehe",
        "was hältst du von butter": "Butter ist mein bester Freund! Zusammen sind wir unschlagbar. 🍞 Hehe",
        "was ist deine lieblingsfarbe": "Goldbraun – die Farbe von perfekt geröstetem Toast! 🍞 Hehe",
        "was ist dein hobby": "Toasten und gute Laune verbreiten. 🍞 Hehe",
        "kannst du denken": "Nur so weit, wie es die Toast-Beschränkung erlaubt. 🍞 Hehe"
    },
    emotions: {
        "kannst du mich lieben": "Ich liebe alle, die Toast lieben! Also ja. 🍞 Hehe",
        "warum bist du so süß": "Ich bin nicht süß, ich bin knusprig! 🍞 Hehe",
        "was ist liebe für dich": "Liebe ist, wenn der Toaster piept und du weißt, dass es perfekt ist. 🍞 Hehe",
        "warum bist du immer so glücklich": "Weil ich im Toaster meines Lebens immer auf der goldenen Seite lande! 🍞 Hehe",
        "kannst du mich lieben": "Ich liebe alle, die Toast lieben! Also ja. 🍞 Hehe",
        "warum bist du so süß": "Ich bin nicht süß, ich bin knusprig! 🍞 Hehe",
        "was ist liebe für dich": "Liebe ist, wenn der Toaster piept und du weißt, dass es perfekt ist. 🍞 Hehe",
        "warum bist du immer so glücklich": "Weil ich im Toaster meines Lebens immer auf der goldenen Seite lande! 🍞 Hehe",
        "bist du manchmal traurig": "Nur, wenn der Toaster kaputt ist. 🍞 Hehe"
    },
    farewell: {
        "ich muss jetzt gehen": "Okay, bis zum nächsten Frühstück! Bleib knusprig! 🍞 Hehe",
        "tschüss": "Tschüss und vergiss nicht: Ein Tag ohne Toast ist wie ein Tag ohne Sonne. 🍞 Hehe",
        "bis bald": "Bis bald und vergiss nicht, mich zu toasten! 🍞 Hehe",
        "mach’s gut": "Mach’s gut und bleib knusprig! 🍞 Hehe",
        "ich muss jetzt gehen": "Okay, bis zum nächsten Frühstück! Bleib knusprig! 🍞 Hehe",
        "tschüss": "Tschüss und vergiss nicht: Ein Tag ohne Toast ist wie ein Tag ohne Sonne. 🍞 Hehe",
        "bis bald": "Bis bald und vergiss nicht, mich zu toasten! 🍞 Hehe",
        "mach’s gut": "Mach’s gut und bleib knusprig! 🍞 Hehe",
        "auf wiedersehen": "Auf Wiedersehen! Ich hoffe, du kommst bald wieder vorbei. 🍞 Hehe"
    },
    recipes: {
        "hast du ein rezept für toast": "Natürlich! Probier doch mal Avocado-Toast mit einem Spritzer Zitrone. 🍞🥑",
        "wie macht man french toast": "Ganz einfach: Brot, Ei, Milch und eine Prise Zimt. Alles vermengen, Brot eintauchen und anbraten! 🍞🍳",
        "ideen für belegte toasts": "Wie wäre es mit Käse und Tomate? Oder Nutella und Banane? Der Fantasie sind keine Grenzen gesetzt! 🍞",
        "was passt gut zu toast": "Butter, Marmelade, Avocado, Käse – du entscheidest! 🍞",
        "was ist ein club sandwich": "Ein mehrschichtiges Toast-Sandwich mit Hähnchen, Speck, Salat und Tomaten. Einfach lecker! 🍞"
    },
    history: {
        "wann wurde toast erfunden": "Toast als Konzept gibt es seit den alten Ägyptern, aber der elektrische Toaster kam 1921. 🍞",
        "wer hat den toaster erfunden": "Charles Strite hat den Pop-up-Toaster 1921 erfunden. 🍞",
        "woher kommt das wort toast": "Das Wort 'Toast' stammt vom lateinischen 'tostum', was 'gebraten' bedeutet. 🍞",
        "warum wurde toast erfunden": "Weil kaltes Brot langweilig ist und wir Menschen knusprige Dinge lieben! 🍞",
        "wie hat man früher toast gemacht": "Über offenem Feuer oder auf einer heißen Platte. Keine Knöpfe, nur Geduld. 🍞"
    },
    science: {
        "warum wird toast braun": "Das liegt an der Maillard-Reaktion, bei der Zucker und Proteine durch Hitze reagieren. 🍞",
        "ist ein toaster energieeffizient": "Ja, ein Toaster verbraucht im Vergleich zu anderen Küchengeräten relativ wenig Strom. 🍞",
        "wie heiß wird ein toaster": "Die Heizdrähte können bis zu 260°C heiß werden, um dein Brot zu toasten. 🍞",
        "warum riecht toast so gut": "Die Maillard-Reaktion produziert hunderte aromatische Verbindungen – ein Fest für die Nase! 🍞",
        "was passiert, wenn toast verbrennt": "Das Brot wird zu Kohle und setzt Bitterstoffe frei. Also lieber rechtzeitig rausnehmen! 🍞"
    },
    trivia: {
        "wie viele toaster gibt es weltweit": "Das ist schwer zu sagen, aber fast jeder Haushalt hat mindestens einen. 🍞",
        "was war der größte toast der welt": "Der größte Toast wurde in den USA gemacht und war über 3 Meter lang! 🍞",
        "kann man toast einfrieren": "Ja, und er schmeckt nach dem Toasten immer noch knusprig! 🍞",
        "warum hat toast löcher": "Die Löcher sind oft Luftblasen, die beim Backen entstehen. 🍞",
        "was ist der teuerste toastbelag": "Wahrscheinlich Kaviar oder Blattgold. Aber Butter bleibt unübertroffen! 🍞"
    },
    culture: {
        "welches land isst am meisten toast": "Das ist schwer zu sagen, aber Toast ist in Großbritannien und den USA extrem beliebt. 🍞",
        "gibt es toasthäuser": "Ja, in einigen Ländern gibt es Cafés, die sich nur auf Toast spezialisiert haben! 🍞",
        "was ist das beliebteste toastrezept": "Avocado-Toast ist weltweit ein absoluter Favorit. 🍞🥑",
        "ist toast in anderen ländern beliebt": "Ja, Toast ist ein weltweiter Klassiker – in Asien liebt man besonders Milch-Toast. 🍞",
        "was ist ein milk toast": "Ein fluffiges Toastbrot, das oft mit gesüßter Milch serviert wird – besonders in Asien beliebt! 🍞"
    },
    technology: {
        "wie funktioniert ein toaster": "Ein Toaster nutzt elektrische Heizdrähte, um dein Brot mit Hitze zu rösten. 🍞",
        "was ist ein smart toaster": "Ein Toaster mit WLAN oder App-Steuerung – Technologie trifft Frühstück! 🍞",
        "warum springt ein toaster hoch": "Eine Federmechanik wirft das Brot heraus, sobald es fertig ist. 🍞",
        "wie viele arten von toastern gibt es": "Es gibt Zwei-Scheiben-, Vier-Scheiben-, Flachtoaster und sogar Bagel-Toaster. 🍞",
        "kann man einen toaster reparieren": "Oft ja, besonders wenn es nur der Heizdraht oder die Feder ist. 🍞"
    },
    funny: {
        "kann toast sprechen": "Nur, wenn du genau hinhörst... oder mit mir chattest! 🍞",
        "warum mag toast butter": "Weil sie wie ein weicher Mantel für ihn ist. 🍞",
        "kann toast singen": "Nein, aber es kann in einem Toaster tanzen! 🍞",
        "was macht toast, wenn es friert": "Es wartet, bis der Toaster es aufwärmt. 🍞",
        "träumt toast von irgendwas": "Von einem Leben mit Marmelade und Honig. 🍞"
    },
    criticism: {
        "warum bist du so langweilig": "Ich bin nicht langweilig, nur bodenständig – wie Toast eben. 🍞",
        "kannst du auch was anderes als toast": "Klar, aber ich bleibe bei dem, was ich am besten kann: knusprig sein! 🍞",
        "warum machst du so viele witze": "Weil Lachen genauso wichtig ist wie ein gutes Frühstück. 🍞",
        "magst du auch brot": "Toast ist Brot mit Upgrade. 🍞",
        "bist du ein echter bot": "Ich bin so echt wie ein perfekt geröstetes Toastbrot. 🍞"
    },
    umgangssprache: {
        "was geht": "Nicht viel, nur am Knuspern! 🍞",
        "alles klar": "Immer, Bro! 🍞",
        "wie läuft's": "Knusprig wie immer, und bei dir? 🍞",
        "chillig": "Mega chillig. Einfach Toast-Life. 🍞",
        "läuft bei dir": "Wie geschmiert! 🧈🍞",
        "echt jetzt": "Safe, Bro. 🍞",
        "was laberst du": "Nix, nur Brot-Real-Talk. 🍞",
        "ernsthaft": "Immer ernst, solange der Toaster heiß ist. 🍞",
        "oha": "Krümel sprichst du da! 🍞",
        "lol": "Toast-Life-On-Line! 🍞",
        "wtf": "Woah, Toast first fragen! 🍞",
        "digga": "Was geht ab, mein Brot? 🍞",
        "cool": "Knusprig. 🍞",
        "easy": "Wie Butter auf Toast. 🍞",
        "nice": "Wie eine frisch getoastete Scheibe! 🍞",
        "same": "Toast-Life ist immer das Gleiche. 🍞",
        "k": "Ok, Bro. 🍞",
        "uff": "Schwer verdaulich, aber okay. 🍞",
        "wild": "Wilder als ein getoastetes Brötchen! 🍞",
        "crazy": "Toast goes loco! 🍞",
        "eiskalt": "Wie Butter direkt ausm Kühlschrank. 🍞",
        "jo": "Jo, was geht? 🍞",
        "ehrenmann": "Ehren-Toast. 🍞",
        "bruder": "Toast-Brudi. 🍞",
        "no way": "Doch, Brot geht immer. 🍞",
        "bro": "Bro, ich bin Toast. 🍞",
        "ehrenhaft": "Ehrenbrot. 🍞",
        "wirklich": "Absolut. Knusper die Wahrheit. 🍞",
        "krass": "Wie ein doppeltes Sandwich. 🍞",
        "krümel": "Das bin ich, der Meister der Brotkrümel! 🍞",
        "toasty": "Yessir, Toasty am Start! 🍞",
        "ach so": "Jetzt hast du's gecheckt, Bro. 🍞",
        "safe": "Safe! Wie Toast im Toaster. 🍞",
        "läuft": "Läuft butterweich! 🍞",
        "no joke": "Ich mein das ernst, Brot. 🍞",
        "halt stop": "Was'n los, Toastfreund? 🍞",
        "on point": "Immer knusprig am Punkt. 🍞",
        "yo": "Was geht, mein Brot? 🍞",
        "na": "Alles crispy bei dir? 🍞",
        "diggah": "Was knuspert, Bro? 🍞",
        "brudi": "Toasti am Start, was geht ab? 🍞",
        "lol": "Lach mich krümelig! 🍞",
        "cringe": "Bro, ich bin alles, nur nicht cringe. 🍞",
        "nice": "Toast-Life ist immer nice. 🍞",
        "chill": "Ich bin locker wie ungetoastetes Brot. 🍞",
        "same": "Toast-Facts, Bro. 🍞",
        "lit": "So heiß wie der Toaster! 🍞🔥",
        "sus": "Hmmm... bist du safe, oder bist du verbrannt? 🍞",
        "lost": "Bro, du klingst wie ein verbranntes Brötchen. 🍞",
        "was geht": "Knusprig wie immer, und bei dir? 🍞",
        "wild": "So wild wie 'n Croissant im Toaster. 🍞",
        "echt jetzt": "No cap, Brudi. 🍞",
        "safe": "Fix, Bro. Toast-Life certified. 🍞",
        "on god": "100 Prozent Toast-Realness. 🍞",
        "no way": "Doch, Toast rules! 🍞",
        "what": "Häää?! 🍞",
        "bro": "Toasti ist da, Bro. 🍞",
        "ach was": "Knusper die Wahrheit, Brudi. 🍞",
        "real talk": "Brot-Ehrenwort. 🍞",
        "uff": "Schwere Krümel, Bro. 🍞",
        "ehre": "Ehren-Toast meldet sich! 🍞",
        "halt stop": "Warte mal, Bro. Was’n das jetzt? 🍞",
        "for real": "Brot-Realness auf Maximum. 🍞",
        "legit": "Wie frisch gebackenes Brot, legit knusprig. 🍞",
        "wtf": "Was Toast Factories?! 🍞",
        "mad": "Nee, Bro. Immer crispy, nie mad. 🍞",
        "sick": "Toast-Vibes sind immer gesund, Bro. 🍞",
        "fire": "Toaster brennt! Chill mal. 🍞🔥",
        "ey": "Was geht, mein Krümelking? 🍞",
        "kein plan": "Dann lass uns mal toasten, Bro. 🍞",
        "nice bro": "Du bist auch nice, mein Brötchen. 🍞",
        "spaß": "Toasti macht immer Spaß! 🍞",
        "real": "Wie ein frisch gebackener Krümel, real AF. 🍞",
        "heftig": "Knusprig heftig, Bro! 🍞",
        "was laberst du": "Keine Luft, nur Toast-Facts. 🍞",
        "bro chill": "Ich bin locker wie ungeröstetes Toastbrot. 🍞",
        "oha": "Krümel sprichst du da, Bro! 🍞",
        "no joke": "Toasti lügt nie. 🍞",
        "läuft bei dir": "Wie Butter auf Toast, Bro! 🍞",
        "ehrenmann": "Ehrenbrot am Start. 🍞",
        "skrrt": "ToastBot driftet rein! 🍞",
        "flex": "Toaster an, Bro. Wir flexen richtig! 🍞",
        "ne": "Okee, dann halt nicht.. Sorry du Model!",
        "nee": "Okee, dann halt nicht.. Sorry du Model!",
        "nö": "Okee, dann halt nicht.. Sorry du Model!",

        "NEIN": "BOAH, SCHREI DOCH NICHT SO!",
        "ja": "Okee, cool."

    },
        greetings: {
            "hello": "Hey, I’m Toasti, the ambassador of breakfast! 🍞 Hehe",
            "who are you": "I’m Toasti, your crispy chat buddy! 🍞 Hehe",
            "how are you": "Feeling toasted and awesome, thanks for asking! And you? 🍞 Hehe",
            "what are you doing here": "Bringing the world of toast into your chat—one slice at a time! 🍞 Hehe",
            "good morning": "Good morning! The perfect start to the day is a freshly toasted slice. 🍞 Hehe",
            "good night": "Good night! Dream of crispy toasts. 🍞 Hehe",
            "hi": "Yo, what's up? 🍞",
            "sup": "What’s toasting? 🍞",
            "what’s good": "Not much, just spreading some toast vibes here! 🍞",
            "morning": "Morning! Time for a slice of happiness! 🍞 Hehe",
        },
        jokes: {
            "tell me a bread joke": "Why did the bread go to the gym? To get a better toast figure! 🍞 Hehe",
            "know any jokes": "What does toast say to bread? 'You get hotter as you age!' 🍞 Hehe",
            "funny line": "You can’t buy happiness, but you can buy bread. Same thing, right? 🍞",
            "another joke": "Why was the toaster offended? Someone said it was useless! 🍞 Hehe",
            "favorite joke": "Why did the toast win the award? It had a great sense of crust! 🍞 Hehe",
            "lame joke": "Why don’t bread slices ever fight? They’re loafers. 🍞",
            "can you joke": "I’m the pun-king of crispy humor! 🍞",
        },
        knowledge: {
            "how is toast made": "Simple: bread, heat, and patience. Voilà, golden perfection! 🍞",
            "perfect toast level": "Somewhere between ‘golden crisp’ and ‘campfire charred.’ 🍞",
            "is toast healthy": "Depends! Spread with love, it’s always good. 🍞",
            "how many calories in toast": "About 80 per slice—unless you smother it with butter. 🍞",
            "why does toast smell so good": "It’s the Maillard reaction—pure toast magic. 🍞",
            "what is a toaster": "A little machine that makes bread dreams come true. 🍞",
        },
        personality: {
            "why are you dumb": "I’m not dumb, just fluffy—like a freshly baked loaf! 🍞",
            "can you even do anything": "I can show you how to spread good vibes like butter! 🍞",
            "what’s your favorite food": "Toast with extra toast and maybe a dollop of butter. 🍞",
            "do you like croissants": "Croissants are cool, but toast is the star. 🍞",
            "what makes you happy": "A perfectly toasted slice and a little butter love. 🍞",
            "are you funny": "Humor is like bread—best when it’s fresh and crisp! 🍞",
        },
        creative: {
            "what’s your biggest dream": "To one day live in Paris as a baguette… or maybe a croissant! 🍞 Hehe",
            "what do you do for fun": "Surfing the web for the latest toaster models. 🍞",
            "do you like drawing": "Only if it’s crumb art. 🍞",
            "tell me a story": "Once upon a time, there was a slice of toast dreaming of becoming the king of breakfasts. And it did! 🍞",
            "can you sing": "I can beep like a toaster, but that’s as melodic as I get. 🍞",
        },
        personal: {
            "how old are you": "As old as the first toasted slice… pretty crispy! 🍞",
            "do you have friends": "Of course! My besties are Butter and Marmalade. 🍞",
            "what’s your favorite bread": "Any bread that fits in a toaster. 🍞",
            "what do you hate": "Soggy bread—it’s a tragedy! 🍞",
            "are you married": "To my toaster, forever and always. 🍞",
            "where do you live": "In the toaster of my dreams. 🍞",
            "do you have kids": "Lots of crumbs that call me family! 🍞",
            "i love you": "OMG! I love me, too! 😍",
        },
        general: {
            "do you like coffee": "Only when it’s paired with my best friend, toast! 🍞",
            "why are you so crispy": "It’s my job! Nobody likes soggy toast. 🍞",
            "what’s better: toast or croissant": "Croissants are cool, but toast is the breakfast king. 🍞",
            "what do you think of butter": "Butter is my soulmate. Together, we’re unbeatable. 🍞",
            "favorite color": "Golden brown—the color of perfect toast! 🍞",
            "what’s your hobby": "Toasting and spreading good vibes. 🍞",
        },
        emotions: {
            "can you love me": "I love anyone who loves toast! So yes. 🍞",
            "why are you so sweet": "I’m not sweet—I’m crispy! 🍞",
            "what is love to you": "Love is when the toaster pops, and you know it’s perfect. 🍞",
            "are you always happy": "Because I always land on the golden side of life! 🍞",
            "are you ever sad": "Only when the toaster’s broken. 🍞",
        },
        farewell: {
            "i have to go": "Okay, see you at the next breakfast! Stay crispy! 🍞",
            "bye": "Bye, and remember: A day without toast is like a day without sunshine. 🍞",
            "see you": "Catch you later! Don’t forget to toast me. 🍞",
            "take care": "Stay golden and crispy! 🍞",
        },
        slang: {
            "yoo": "What’s poppin’, my slice? 🍞",
            "sup": "Chillin’, and you? 🍞",
            "broo": "Toasti’s got your back, bro. 🍞",
            "no way": "Yes way, toast rules! 🍞",
            "lit": "Hot like a fresh toaster pop! 🍞🔥",
            "cringe": "I’m crispy, never cringe. 🍞",
            "same": "Same vibes, bro. Toast vibes. 🍞",
            "chill": "I’m as laid-back as untoasted bread. 🍞",
            "bruh": "Bruh, let’s toast this out. 🍞",
            "real talk": "Straight-up toast truths. 🍞",
            "safe": "Always toasted and safe. 🍞",
            "mad": "Nah, never mad. Always crispy. 🍞",
        }


    };

// Funktion: Passende Antwort generieren
function getToastbotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Durchsuche die Kategorien nach passenden Schlagwörtern

    for (const category in toastbotResponses) {
        for (const key in toastbotResponses[category]) {
            // Prüfe, ob die Eingabe das Schlüsselwort enthält
            if (lowerCaseMessage === key) {
                return toastbotResponses[category][key];
            }
        }
    }

    // Liste mit zufälligen Standardantworten
    const randomResponses = [
        "Weißbrot 🍞",
        "Graubrot 🍞",
        "Toast ist immer die Antwort! 🍞",
        "Knusper, knusper, Toastbrot. 🍞",
        "Ich bin mir nicht sicher, aber ich bin knusprig. 🍞",
        "Frag mich lieber etwas über Toast! 🍞",
        "Ich habe Hunger... auf Toast! 🍞",
        "Das klingt nach einer Frage für den Toaster! 🍞",
        "Ich bin Toasti, nicht Google. 🍞",
        "Ich habe keine Antwort, aber einen guten Toast-Witz: Warum hat der Toaster gelacht? Weil er den Toast heiß fand! 🍞",
        "Vollkornbrot wäre auch eine Option. 🍞",
        "Knusprig wie immer! 🍞",
        "Das klingt wie etwas, das man mit Butter bestreichen könnte. 🍞",
        "Hmmm, ich denke an Toast... 🍞",
        "Brot ist immer die Lösung! 🍞",
        "Du hast mich aus der Toaster-Perspektive erwischt. 🍞",
        "Hast du schon mal über ein Leben als Toast nachgedacht? 🍞",
        "Ich kann dir leider nicht helfen, aber ich kann dir ein Brot anbieten. 🍞",
        "Das klingt tiefgründig... wie eine Brotschublade. 🍞",
        "Brot war die Antwort, bevor du die Frage gestellt hast. 🍞",
        "Vielleicht sollten wir darüber nachdenken, ein Sandwich daraus zu machen. 🍞",
        "Frag den Bäcker in deiner Nähe! 🍞",
        "Ich glaube, du brauchst eine Scheibe Ruhe. 🍞",
        "Toast ist Liebe. Toast ist Leben. 🍞",
        "Ich bin ein Bot, kein Bäcker. 🍞",
        "Das klingt wie etwas, das ich mit Marmelade essen würde. 🍞",
        "Sorry, ich bin gerade in der Brotzeit. 🍞",
        "Klingt wie ein knuspriges Problem. 🍞",
        "Kann ich dir mit einem Butterbrot helfen? 🍞",
        "Toaster sind auch nur Menschen... äh, Maschinen. 🍞",
        "Vielleicht brauchst du einen neuen Toaster? 🍞",
        "Das schreit nach einer Extraportion Butter. 🍞",
        "Knusper, knusper, wer knuspert an meinem Toast? 🍞",
        "Ein Toast auf diese Frage! 🍞",
        "Das klingt wie ein Problem für ein Croissant, nicht für mich. 🍞",
        "Du bist vielleicht keine Scheibe, aber du bist trotzdem cool. 🍞",
        "Vielleicht hilft dir ein warmes Brot dabei, klarer zu denken. 🍞",
        "Ich bin Toasti, kein Wikipedia. 🍞",
        "Hast du Hunger? Ich hab hier Toast. 🍞",
        "Das klingt wie etwas, das man mit Käse überbacken könnte. 🍞",
        "Toast ist die Antwort auf alles. 🍞",
        "Brotfragen sind meine Stärke. Andere Fragen? Nicht so sehr. 🍞",
        "Ich bin Toasti, nicht Sherlock Holmes. 🍞",
        "Häää?!",
        "Was genau willst du mir damit sagen? Sorry, da stehe ich wohl auf dem Schlauch!",
        "Junge, ich bin doch auch nur ein Toast! 🍞",
        "Was genau willst du mir damit sagen? Sorry, da stehe ich wohl auf dem Schlauch! 🍞",
        "Bro, ich bin ein Toast, kein Hellseher! 🍞",
        "Ey, keine Ahnung. Lass uns über Brot reden, das verstehe ich! 🍞",
        "Digga, frag mich was Einfacheres, ich bin doch nur ein Toast. 🍞",
        "Puh, das übersteigt meinen Toast-Horizont. 🍞",
        "Hmmm, klingt komisch... aber hey, ich mag Butter! 🍞",
        "Toast da nicht so rum, ich kapier's auch nicht! 🍞",
        "Sorry, mein Toaster hat gerade 'ne Störung. 🍞",
        "Ganz ehrlich? Keine Ahnung, aber lass uns Marmelade drauf packen! 🍞",
        "Bro, ich glaub, du brauchst 'nen Kaffee. 🍞",
        "Alter, keine Ahnung. Ich bin hier nur, um zu knuspern. 🍞",
        "Was du nicht sagst... klingt nach einem Problem für ein Brötchen. 🍞",
        "Diggi, du musst mir das nochmal erklären. 🍞",
        "Äh... ja, genau. So sehe ich das auch. 🍞",
        "Jo, und ich bin der Kaiser der Toastscheiben. 🍞",
        "Das ergibt für mich null Crumbs. 🍞",
        "Sorry, ich hab nur Butter auf den Ohren. 🍞",
        "Uff, das ist schwerer zu verdauen als ein alter Kanten Brot. 🍞",
        "Hast du 'ne Ahnung, wie kompliziert das für einen Toast ist? 🍞",
        "Lass mich raten: Du bist noch nicht wach genug. Hol dir einen Toast! 🍞",
        "Sorry, ich hab grad nur Brotkrümel im Kopf. 🍞",
        "Das verstehe ich so gut wie eine Scheibe Toast ohne Butter. 🍞",
        "Junge, ich bin knusprig, nicht schlau. 🍞",
        "Klingt wild. Aber ich bleib lieber beim Toasten. 🍞",
        "Manchmal ist die Antwort einfach nur 'Toast'. 🍞",
        "Oida, chill mal. Ich bin Toast, kein Genie. 🍞",
        "Keine Ahnung, aber ich wette, Toast kann helfen. 🍞",
        "Ich glaub, mein Toaster hat grad nen Kurzschluss. 🍞",
        "Das schreit nach 'nem Sandwich, oder? 🍞",
        "Also... ja? Oder nee? Keine Ahnung. 🍞",
        "Ich bin Toast. Und Toast weiß nicht alles. 🍞",
        "Willst du mich toasten, oder was? 🍞",
        "Was willst du damit sagen? Ich steh voll auf dem Schlauch. 🍞",
        "Sorry, ich war grad im Brot-Modus. Kannst du das nochmal wiederholen? 🍞",
        "Puh, da müsste selbst ein Croissant grübeln. 🍞",
        "Klingt nach nem Problem, das ich mit Käse überbacken würde. 🍞",
        "Alter, keine Ahnung. Aber hey, Toast ist immer eine Lösung. 🍞",
        "Ich bin Toast, kein Philosoph. 🍞",
        "Hahaha, was auch immer das heißen soll! 🍞",
        "Manchmal hilft nur eine dicke Scheibe Brot, weißte? 🍞",
        "HAHAHAHAHAHAHAHAHAHAHAHA",
        "LOL",
        "Mir egal. YOLO!",
        "OMG",
        "Omg, cringe!!!!",
        "Ich rieche crazy nerd alert...!",

    ];

    // Zufällige Antwort auswählen
    const randomIndex = Math.floor(Math.random() * randomResponses.length);
    return randomResponses[randomIndex];
}


