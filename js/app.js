/**
 * Countdown to an Important Event
 * Wrapped in an IIFE so nothing leaks into the global scope.
 * Uses localStorage and regular <img> tags so the page works from file://.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "countdown-events";
  var LEGACY_STORAGE_KEY = "countdown-event";

  // Daily extras are chosen from the calendar day, so they stay the same all day.
  var FACTS = [
    "Honey found in ancient Egyptian tombs is still edible after thousands of years.",
    "Octopuses have three hearts, and two of them stop when they swim.",
    "A day on Venus is longer than a year on Venus.",
    "Bananas are berries, but strawberries are not.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Wombat poop is cube-shaped, which keeps it from rolling away.",
    "The Eiffel Tower can grow more than 15 centimeters in summer heat.",
    "A group of flamingos is called a flamboyance.",
    "Sharks are older than trees. They have been around for over 400 million years.",
    "Your brain uses about 20 percent of your body's energy.",
    "Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.",
    "Hot water can freeze faster than cold water. This is called the Mpemba effect.",
    "A teaspoon of neutron star material would weigh about a billion tons.",
    "Otters hold hands while they sleep so they do not drift apart.",
    "The shortest war in history lasted about 38 minutes.",
    "Some apples are made of 25 percent air, which is why they float.",
    "Butterflies taste with their feet.",
    "The inventor of the Pringles can is buried in one.",
    "A bolt of lightning is five times hotter than the surface of the Sun.",
    "Scotland's national animal is the unicorn.",
    "Cats cannot taste sweetness.",
    "There is a species of jellyfish that can theoretically live forever.",
    "The first computer bug was an actual moth found in a machine in 1947.",
    "A cloud can weigh more than a million pounds.",
    "Humans share about 60 percent of their DNA with bananas.",
    "The longest recorded flight of a chicken is 13 seconds.",
    "Venus is the only planet that rotates clockwise.",
    "A jiffy is an actual unit of time: 1/100th of a second.",
    "Koalas have fingerprints that look a lot like human fingerprints.",
    "The Great Wall of China is not visible from the Moon with the naked eye.",
    "An astronaut's footprint on the Moon could last 100 million years."
  ];

  var PHRASES = [
    "Time flies, but you are the pilot.",
    "Good things take time. Great things take a countdown.",
    "Patience is just excitement that learned manners.",
    "If waiting built muscles, you would be unbeatable by now.",
    "The best events are the ones you can barely sit still for.",
    "Do not watch the clock; make the minutes count... except today. Watch the clock.",
    "Almost there is still a pretty great place to be.",
    "Your future self is already smiling about this.",
    "Small days add up to big moments.",
    "Keep going. The cake, trip, or confetti is worth it.",
    "Today is a tiny chapter in a very good story.",
    "Hurry slowly. The fun is in the wait too.",
    "You cannot fast-forward a good memory, so enjoy the preview.",
    "Even countdown numbers need a coffee break. You do too.",
    "The calendar is not stalling. It is building suspense.",
    "Be the reason someone else looks forward to a date.",
    "Joy likes to arrive right on time.",
    "If it matters, it is allowed to take a while.",
    "Save a little wonder for the last few seconds.",
    "You are closer than yesterday. That counts.",
    "Let the waiting be gentle, not gloomy.",
    "A watched pot boils. A watched countdown sparkles.",
    "Collect calm now so you can spend it on the big day.",
    "The event is coming. So is your next good idea.",
    "Make the ordinary days feel like a warm-up act.",
    "Hope is a timer that never needs new batteries.",
    "One second at a time is a perfectly respectable plan.",
    "Your excitement is doing excellent cardio.",
    "Soon is a beautiful word. Use it kindly.",
    "The wait is not empty. It is practice for celebrating."
  ];

  // Curated photos (Unsplash) that still load from file:// because they are a normal image URL.
  var IMAGES = {
    birthday: [
      {
        src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=1200&q=80",
        alt: "Colorful birthday balloons against a bright sky",
        caption: "Balloons, cake energy, and a date circled in gold."
      },
      {
        src: "https://images.unsplash.com/photo-1464349095431-e9fe6c7c6720?auto=format&fit=crop&w=1200&q=80",
        alt: "A birthday cake with lit candles",
        caption: "Make a wish. The countdown is already doing it with you."
      },
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
        alt: "Party decorations hanging at a celebration",
        caption: "Confetti is just patience that exploded happily."
      }
    ],
    vacation: [
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        alt: "Tropical beach with clear blue water",
        caption: "Somewhere, a beach is already rehearsing your arrival."
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        alt: "Sunlight over mountain peaks",
        caption: "Adventure likes people who pack snacks and a countdown."
      },
      {
        src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        alt: "Open suitcase and travel accessories",
        caption: "Tickets, maps, and one very impatient suitcase."
      }
    ],
    newyear: [
      {
        src: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=80",
        alt: "Fireworks over a city at night",
        caption: "A sky full of sparks for a brand-new page."
      },
      {
        src: "https://images.unsplash.com/photo-1513279922550-7c4d6c21c5d0?auto=format&fit=crop&w=1200&q=80",
        alt: "Midnight celebration lights",
        caption: "Midnight is just noon with better lighting."
      },
      {
        src: "https://images.unsplash.com/photo-1483197452165-7abc4b248905?auto=format&fit=crop&w=1200&q=80",
        alt: "Sparkler held during a night celebration",
        caption: "Hold on. The year is warming up backstage."
      }
    ],
    custom: [
      {
        src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80",
        alt: "Starry night sky over a quiet landscape",
        caption: "Your date, your story, your piece of the sky."
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        alt: "A winding road through a scenic valley",
        caption: "Every custom event starts as a road worth taking.",
      },
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        alt: "Sunlight through a quiet forest",
        caption: "Some days glow a little louder than the rest."
      }
    ]
  };

  var els = {
    chips: document.querySelectorAll(".chip"),
    form: document.getElementById("event-form"),
    nameField: document.getElementById("name-field"),
    nameInput: document.getElementById("event-name"),
    dateInput: document.getElementById("event-date"),
    formError: document.getElementById("form-error"),
    emptyState: document.getElementById("empty-state"),
    timers: document.getElementById("timers"),
    timerCount: document.getElementById("timer-count"),
    timerTemplate: document.getElementById("timer-template"),
    fact: document.getElementById("daily-fact"),
    quote: document.getElementById("daily-quote"),
    image: document.getElementById("daily-image"),
    imageTitle: document.getElementById("daily-image-title"),
    imageCaption: document.getElementById("daily-image-caption"),
    photoFrame: document.querySelector(".photo-frame")
  };

  var pendingType = "custom";
  var events = [];
  var tickId = null;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function dayOfYear(date) {
    var start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - start) / 86400000);
  }

  function pickDaily(list, date) {
    return list[dayOfYear(date) % list.length];
  }

  function typeLabel(type) {
    if (type === "birthday") return "Birthday";
    if (type === "vacation") return "Vacation";
    if (type === "newyear") return "New Year";
    return "Custom event";
  }

  function nextNewYearDate() {
    var now = new Date();
    var year = now.getFullYear();
    // If this year's New Year midnight has already passed, aim at the next one.
    var candidate = new Date(year, 0, 1, 0, 0, 0, 0);
    if (now.getTime() >= candidate.getTime()) {
      candidate = new Date(year + 1, 0, 1, 0, 0, 0, 0);
    }
    return candidate;
  }

  function toDateInputValue(date) {
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate())
    );
  }

  // Parse YYYY-MM-DD as a local calendar date, not UTC.
  function parseLocalDate(value) {
    var parts = String(value).split("-");
    if (parts.length !== 3) return null;
    var year = Number(parts[0]);
    var month = Number(parts[1]);
    var day = Number(parts[2]);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  function formatNiceDate(date) {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function createId() {
    return "event-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
  }

  function normalizeEvent(saved) {
    if (!saved || !saved.name || !saved.date || !saved.type) return null;
    if (!parseLocalDate(saved.date)) return null;
    return {
      id: saved.id || createId(),
      name: saved.name,
      date: saved.date,
      type: saved.type
    };
  }

  function sortEvents(list) {
    return list.slice().sort(function (a, b) {
      return parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime();
    });
  }

  function loadEvents() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return sortEvents(parsed.map(normalizeEvent).filter(Boolean));
        }
      }

      // Keep a timer that was saved before multiple events were supported.
      var legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!legacyRaw) return [];
      var legacy = normalizeEvent(JSON.parse(legacyRaw));
      return legacy ? [legacy] : [];
    } catch (error) {
      return [];
    }
  }

  function saveEvents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function confirmAdd(event) {
    return window.confirm(
      "Add a countdown for \"" +
        event.name +
        "\" on " +
        formatNiceDate(parseLocalDate(event.date)) +
        "?"
    );
  }

  function showFormError(message) {
    els.formError.hidden = !message;
    els.formError.textContent = message || "";
  }

  function setActiveChip(type) {
    els.chips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.getAttribute("data-event-type") === type);
    });
  }

  function openForm(type) {
    pendingType = type;
    setActiveChip(type);
    els.form.classList.remove("is-hidden");
    showFormError("");

    var needsCustomName = type === "custom";
    els.nameField.style.display = needsCustomName ? "grid" : "none";
    els.nameInput.required = needsCustomName;

    if (type === "birthday") {
      els.nameInput.value = "Birthday";
      els.dateInput.value = "";
    } else if (type === "vacation") {
      els.nameInput.value = "Vacation";
      els.dateInput.value = "";
    } else if (type === "custom") {
      els.nameInput.value = "";
      els.dateInput.value = "";
    }
  }

  function hideForm() {
    els.form.classList.add("is-hidden");
    setActiveChip("");
  }

  function remainingParts(dateValue) {
    var target = parseLocalDate(dateValue);
    var diff = target.getTime() - Date.now();
    if (diff <= 0) {
      return { passed: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    var totalSeconds = Math.floor(diff / 1000);
    return {
      passed: false,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
  }

  function fillCountdown(card, event) {
    var parts = remainingParts(event.date);
    var countdown = card.querySelector("[data-role=\"countdown\"]");
    var passed = card.querySelector("[data-role=\"passed\"]");

    if (parts.passed) {
      countdown.hidden = true;
      passed.hidden = false;
      return;
    }

    countdown.hidden = false;
    passed.hidden = true;
    card.querySelector("[data-unit=\"days\"]").textContent = pad(parts.days);
    card.querySelector("[data-unit=\"hours\"]").textContent = pad(parts.hours);
    card.querySelector("[data-unit=\"minutes\"]").textContent = pad(parts.minutes);
    card.querySelector("[data-unit=\"seconds\"]").textContent = pad(parts.seconds);
  }

  function createTimerCard(event) {
    var card = els.timerTemplate.content.firstElementChild.cloneNode(true);
    card.setAttribute("data-timer-id", event.id);
    card.querySelector("[data-role=\"type\"]").textContent = typeLabel(event.type);
    card.querySelector("[data-role=\"title\"]").textContent = event.name;
    card.querySelector("[data-role=\"date\"]").textContent = formatNiceDate(parseLocalDate(event.date));
    card.querySelector(".remove-btn").setAttribute(
      "aria-label",
      "Remove countdown for " + event.name
    );
    fillCountdown(card, event);
    return card;
  }

  function renderTimers() {
    els.timers.innerHTML = "";

    if (!events.length) {
      els.emptyState.classList.remove("is-hidden");
      els.timerCount.textContent = "No countdowns yet";
      return;
    }

    els.emptyState.classList.add("is-hidden");
    els.timerCount.textContent =
      events.length === 1 ? "1 countdown" : events.length + " countdowns";

    events.forEach(function (event) {
      els.timers.appendChild(createTimerCard(event));
    });
  }

  function updateAllCountdowns() {
    events.forEach(function (event) {
      var card = els.timers.querySelector('[data-timer-id="' + event.id + '"]');
      if (card) fillCountdown(card, event);
    });
  }

  function featuredType() {
    var upcoming = events.find(function (event) {
      return !remainingParts(event.date).passed;
    });
    return (upcoming || events[0] || {}).type || "custom";
  }

  function addEvent(event) {
    if (!confirmAdd(event)) return;
    events.push(event);
    events = sortEvents(events);
    saveEvents();
    hideForm();
    renderTimers();
    renderDaily(featuredType());
  }

  function removeEvent(id) {
    var match = events.filter(function (event) {
      return event.id === id;
    })[0];
    if (!match) return;
    if (
      !window.confirm(
        "Remove the countdown for \"" + match.name + "\"? This cannot be undone."
      )
    ) {
      return;
    }

    events = events.filter(function (event) {
      return event.id !== id;
    });
    saveEvents();
    renderTimers();
    renderDaily(featuredType());
  }

  function renderDaily(type) {
    var today = new Date();
    var key = type && IMAGES[type] ? type : "custom";
    var image = pickDaily(IMAGES[key], today);

    els.fact.textContent = pickDaily(FACTS, today);
    els.quote.textContent = "\u201c" + pickDaily(PHRASES, today) + "\u201d";
    els.imageTitle.textContent = "Today's " + typeLabel(key).toLowerCase() + " view";
    els.imageCaption.textContent = image.caption;
    els.image.alt = image.alt;
    els.photoFrame.classList.remove("is-fallback");
    els.image.classList.remove("is-hidden");
    els.image.src = image.src;
  }

  function onImageError() {
    els.photoFrame.classList.add("is-fallback");
  }

  function onChipClick(event) {
    var type = event.currentTarget.getAttribute("data-event-type");

    if (type === "newyear") {
      addEvent({
        id: createId(),
        name: "New Year",
        date: toDateInputValue(nextNewYearDate()),
        type: "newyear"
      });
      return;
    }

    openForm(type);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    showFormError("");

    var name = els.nameInput.value.trim();
    var dateValue = els.dateInput.value;
    var date = parseLocalDate(dateValue);

    if (pendingType === "custom" && !name) {
      showFormError("Please enter a name for your custom event.");
      return;
    }
    if (!date) {
      showFormError("Please choose a date.");
      return;
    }

    if (pendingType === "birthday") name = "Birthday";
    if (pendingType === "vacation") name = "Vacation";

    addEvent({
      id: createId(),
      name: name,
      date: dateValue,
      type: pendingType
    });
  }

  function onTimersClick(event) {
    var button = event.target.closest(".remove-btn");
    if (!button) return;
    var card = button.closest("[data-timer-id]");
    if (card) removeEvent(card.getAttribute("data-timer-id"));
  }

  function start() {
    els.chips.forEach(function (chip) {
      chip.addEventListener("click", onChipClick);
    });
    els.form.addEventListener("submit", onFormSubmit);
    els.timers.addEventListener("click", onTimersClick);
    els.image.addEventListener("error", onImageError);

    events = loadEvents();
    saveEvents();
    renderTimers();
    renderDaily(featuredType());

    // Tick once per second so every timer stays accurate.
    tickId = window.setInterval(updateAllCountdowns, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
