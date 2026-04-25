const isNestedPage = window.location.pathname.includes("/pages/");

const routes = {
  home: isNestedPage ? "../index.html" : "./index.html",
  search: isNestedPage ? "./search-result.html" : "./pages/search-result.html",
  room: isNestedPage ? "./room-detail.html" : "./pages/room-detail.html",
};

const navigate = (target) => {
  window.location.href = target;
};

const bindClick = (selectors, action, options = {}) => {
  const list = Array.isArray(selectors) ? selectors : [selectors];

  list.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (options.pointer !== false) {
        element.style.cursor = "pointer";
      }

      element.addEventListener("click", (event) => {
        if (options.preventDefault !== false) {
          event.preventDefault();
        }

        action(event, element);
      });
    });
  });
};

const scrollToSelector = (selector) => {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const padNumber = (value) => String(value).padStart(2, "0");

const formatSearchDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const formatDateRange = (checkIn, checkOut) => {
  const start = formatSearchDate(checkIn);
  const end = formatSearchDate(checkOut);

  if (!start || !end) {
    return "Select dates";
  }

  return `${start} - ${end}`;
};

const formatTravelerSummary = (adults, rooms) => {
  const adultCount = Number(adults) || 1;
  const roomCount = Number(rooms) || 1;
  const adultLabel = adultCount === 1 ? "Adult" : "Adults";
  const roomLabel = roomCount === 1 ? "Room" : "Rooms";

  return `${adultCount} ${adultLabel}, ${roomCount} ${roomLabel}`;
};

const formatShortDateRange = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return "Select dates";
  }

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(start);

  return `${month} ${start.getDate()} - ${month} ${end.getDate()}`;
};

const initializeCountdown = () => {
  const hoursNode = document.querySelector('[data-countdown-unit="hours"]');
  const minutesNode = document.querySelector('[data-countdown-unit="minutes"]');
  const secondsNode = document.querySelector('[data-countdown-unit="seconds"]');

  if (!hoursNode || !minutesNode || !secondsNode) {
    return;
  }

  let remainingSeconds =
    (Number(hoursNode.textContent.trim()) || 0) * 3600 +
    (Number(minutesNode.textContent.trim()) || 0) * 60 +
    (Number(secondsNode.textContent.trim()) || 0);

  const renderCountdown = () => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    hoursNode.textContent = padNumber(hours);
    minutesNode.textContent = padNumber(minutes);
    secondsNode.textContent = padNumber(seconds);
  };

  renderCountdown();

  if (remainingSeconds <= 0) {
    return;
  }

  window.setInterval(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    remainingSeconds -= 1;
    renderCountdown();
  }, 1000);
};

const initializeSearchSummaryMockup = () => {
  const summaryBar = document.querySelector(
    ".search-result-thq-section-search-summary-bar-elm"
  );
  const panel = document.querySelector(".search-result-thq-search-summary-popover");
  const triggers = document.querySelectorAll("[data-search-trigger]");

  if (!summaryBar || !panel || triggers.length === 0) {
    return;
  }

  const destinationText = document.querySelector(".search-result-thq-text-elm101");
  const dateText = document.querySelector(".search-result-thq-text-elm103");
  const travelerText = document.querySelector(".search-result-thq-text-elm105");
  const destinationInput = panel.querySelector(
    ".search-result-thq-search-summary-destination"
  );
  const checkInInput = panel.querySelector(
    ".search-result-thq-search-summary-checkin"
  );
  const checkOutInput = panel.querySelector(
    ".search-result-thq-search-summary-checkout"
  );
  const adultsInput = panel.querySelector(".search-result-thq-search-summary-adults");
  const roomsInput = panel.querySelector(".search-result-thq-search-summary-rooms");
  const applyButton = panel.querySelector(".search-result-thq-search-summary-apply");
  const resetButton = panel.querySelector(".search-result-thq-search-summary-reset");
  const closeButton = panel.querySelector(".search-result-thq-search-summary-close");

  const defaults = {
    destination: destinationInput?.value || "Bali, Indonesia",
    checkIn: checkInInput?.value || "2024-10-12",
    checkOut: checkOutInput?.value || "2024-10-19",
    adults: adultsInput?.value || "2",
    rooms: roomsInput?.value || "1",
  };

  const openPanel = (focusSelector) => {
    panel.hidden = false;

    const focusTarget = focusSelector ? panel.querySelector(focusSelector) : null;
    if (focusTarget) {
      focusTarget.focus();
    }
  };

  const closePanel = () => {
    panel.hidden = true;
  };

  const syncSummary = () => {
    if (destinationText && destinationInput) {
      destinationText.textContent = destinationInput.value;
    }

    if (dateText && checkInInput && checkOutInput) {
      dateText.textContent = formatDateRange(
        checkInInput.value,
        checkOutInput.value
      );
    }

    if (travelerText && adultsInput && roomsInput) {
      travelerText.textContent = formatTravelerSummary(
        adultsInput.value,
        roomsInput.value
      );
    }
  };

  const resetSummary = () => {
    if (destinationInput) destinationInput.value = defaults.destination;
    if (checkInInput) checkInInput.value = defaults.checkIn;
    if (checkOutInput) checkOutInput.value = defaults.checkOut;
    if (adultsInput) adultsInput.value = defaults.adults;
    if (roomsInput) roomsInput.value = defaults.rooms;
    syncSummary();
  };

  syncSummary();

  triggers.forEach((trigger) => {
    const focusMap = {
      destination: ".search-result-thq-search-summary-destination",
      dates: ".search-result-thq-search-summary-checkin",
      travelers: ".search-result-thq-search-summary-adults",
      summary: ".search-result-thq-search-summary-destination",
    };

    const openForTrigger = () => {
      openPanel(focusMap[trigger.dataset.searchTrigger]);
    };

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openForTrigger();
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openForTrigger();
      }
    });
  });

  applyButton?.addEventListener("click", () => {
    if (checkInInput && checkOutInput && checkInInput.value > checkOutInput.value) {
      checkOutInput.value = checkInInput.value;
    }

    syncSummary();
    closePanel();
  });

  resetButton?.addEventListener("click", resetSummary);
  closeButton?.addEventListener("click", closePanel);

  [checkInInput, checkOutInput].forEach((input) => {
    input?.addEventListener("change", () => {
      if (checkInInput && checkOutInput && checkInInput.value > checkOutInput.value) {
        checkOutInput.value = checkInInput.value;
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (
      panel.hidden ||
      summaryBar.contains(event.target) ||
      panel.contains(event.target)
    ) {
      return;
    }

    closePanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      closePanel();
    }
  });
};

const initializeSearchFiltersMockup = () => {
  const filterPanel = document.querySelector(
    ".search-result-thq-background-border-shadow-elm"
  );

  if (!filterPanel) {
    return;
  }

  const optionSelectors = [
    ".search-result-thq-label-elm12",
    ".search-result-thq-label-elm13",
    ".search-result-thq-label-elm14",
    ".search-result-thq-label-elm15",
    ".search-result-thq-label-elm17",
    ".search-result-thq-label-elm18",
    ".search-result-thq-label-elm20",
    ".search-result-thq-label-elm21",
    ".search-result-thq-label-elm22",
    ".search-result-thq-label-elm23",
    ".search-result-thq-label-elm24",
    ".search-result-thq-label-elm25",
    ".search-result-thq-label-elm27",
    ".search-result-thq-label-elm28",
    ".search-result-thq-label-elm29",
    ".search-result-thq-label-elm31",
    ".search-result-thq-label-elm32",
    ".search-result-thq-label-elm33",
    ".search-result-thq-label-elm34",
    ".search-result-thq-label-elm36",
    ".search-result-thq-label-elm37",
    ".search-result-thq-label-elm38",
  ];

  optionSelectors.forEach((selector) => {
    filterPanel.querySelectorAll(selector).forEach((option, index) => {
      option.classList.add("search-result-thq-filter-option");

      if (option.querySelector(".search-result-thq-filter-checkbox")) {
        return;
      }

      const legacyImage = option.querySelector('img[class*="search-result-thq-input-elm"]');
      if (legacyImage) {
        legacyImage.classList.add("search-result-thq-filter-input-image");
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "search-result-thq-filter-checkbox";
      checkbox.tabIndex = 0;

      // Preserve a bit of visual intent from the exported mockup.
      if (
        selector === ".search-result-thq-label-elm12" ||
        selector === ".search-result-thq-label-elm17"
      ) {
        checkbox.checked = true;
      }

      option.insertBefore(checkbox, option.firstChild);
      option.addEventListener("click", (event) => {
        if (event.target === checkbox) {
          return;
        }

        checkbox.checked = !checkbox.checked;
      });

      option.dataset.filterIndex = String(index);
    });
  });

  const priceTrack = filterPanel.querySelector(".search-result-thq-input-elm10");
  const leftPrice = filterPanel.querySelector(".search-result-thq-text-elm109");
  const rightPrice = filterPanel.querySelector(".search-result-thq-text-elm110");
  const legacyThumb = filterPanel.querySelector(".search-result-thq-container-elm115");

  if (priceTrack && !priceTrack.querySelector(".search-result-thq-price-slider")) {
    if (legacyThumb) {
      legacyThumb.style.display = "none";
    }

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1000";
    slider.value = "1000";
    slider.className = "search-result-thq-price-slider";

    const updateSlider = () => {
      const current = Number(slider.value);
      const fill = (current / 1000) * 100;
      slider.style.background = `linear-gradient(90deg, #2563eb 0%, #2563eb ${fill}%, #e1e2eb ${fill}%, #e1e2eb 100%)`;

      if (leftPrice) {
        leftPrice.textContent = "$0";
      }

      if (rightPrice) {
        rightPrice.textContent = current >= 1000 ? "$1000+" : `$${current}`;
      }
    };

    slider.addEventListener("input", updateSlider);
    updateSlider();
    priceTrack.appendChild(slider);
  }
};

const initializeHomeSearchMockup = () => {
  const searchBar = document.querySelector(".home-page-thq-search-bar-integrated-elm");
  const panel = document.querySelector(".home-page-thq-search-summary-popover");
  const triggers = document.querySelectorAll("[data-home-search-trigger]");

  if (!searchBar || !panel || triggers.length === 0) {
    return;
  }

  const destinationText = document.querySelector(".home-page-thq-text-elm30");
  const dateText = document.querySelector(".home-page-thq-text-elm31");
  const destinationInput = panel.querySelector(
    ".home-page-thq-search-summary-destination"
  );
  const checkInInput = panel.querySelector(
    ".home-page-thq-search-summary-checkin"
  );
  const checkOutInput = panel.querySelector(
    ".home-page-thq-search-summary-checkout"
  );
  const guestsInput = panel.querySelector(".home-page-thq-search-summary-guests");
  const applyButton = panel.querySelector(".home-page-thq-search-summary-apply");
  const resetButton = panel.querySelector(".home-page-thq-search-summary-reset");
  const closeButton = panel.querySelector(".home-page-thq-search-summary-close");

  const defaults = {
    destination: "Bali, Indonesia",
    checkIn: "2024-10-12",
    checkOut: "2024-10-18",
    guests: "2 travelers",
  };

  if (destinationInput) destinationInput.value = defaults.destination;

  const syncSummary = () => {
    if (destinationText && destinationInput) {
      destinationText.textContent = destinationInput.value || "Where to next?";
    }

    if (dateText && checkInInput && checkOutInput) {
      const range = formatShortDateRange(checkInInput.value, checkOutInput.value);
      const guestSuffix = guestsInput?.value ? ` · ${guestsInput.value}` : "";
      dateText.textContent = `${range}${guestSuffix}`;
    }
  };

  const openPanel = (focusSelector) => {
    panel.hidden = false;
    const focusTarget = focusSelector ? panel.querySelector(focusSelector) : null;
    if (focusTarget) {
      focusTarget.focus();
    }
  };

  const closePanel = () => {
    panel.hidden = true;
  };

  const resetPanel = () => {
    if (destinationInput) destinationInput.value = defaults.destination;
    if (checkInInput) checkInInput.value = defaults.checkIn;
    if (checkOutInput) checkOutInput.value = defaults.checkOut;
    if (guestsInput) guestsInput.value = defaults.guests;
    syncSummary();
  };

  syncSummary();

  triggers.forEach((trigger) => {
    const focusMap = {
      destination: ".home-page-thq-search-summary-destination",
      dates: ".home-page-thq-search-summary-checkin",
      summary: ".home-page-thq-search-summary-destination",
    };

    const openForTrigger = () => openPanel(focusMap[trigger.dataset.homeSearchTrigger]);

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openForTrigger();
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openForTrigger();
      }
    });
  });

  [checkInInput, checkOutInput].forEach((input) => {
    input?.addEventListener("change", () => {
      if (checkInInput && checkOutInput && checkInInput.value > checkOutInput.value) {
        checkOutInput.value = checkInInput.value;
      }
    });
  });

  applyButton?.addEventListener("click", () => {
    if (checkInInput && checkOutInput && checkInInput.value > checkOutInput.value) {
      checkOutInput.value = checkInInput.value;
    }

    syncSummary();
    closePanel();
    navigate(routes.search);
  });

  resetButton?.addEventListener("click", resetPanel);
  closeButton?.addEventListener("click", closePanel);

  document.addEventListener("click", (event) => {
    if (
      panel.hidden ||
      searchBar.contains(event.target) ||
      panel.contains(event.target)
    ) {
      return;
    }

    closePanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      closePanel();
    }
  });
};

const initializeTrendingDestinationsLinks = () => {
  const trendingContainer = document.querySelector(".home-page-thq-container-elm37");

  if (!trendingContainer) {
    return;
  }

  const cardSelectors = [
    ".home-page-thq-bangkok-elm",
    ".home-page-thq-tokyo-elm",
    ".home-page-thq-paris-elm",
    ".home-page-thq-london-elm",
  ].join(", ");

  trendingContainer.addEventListener("click", (event) => {
    const card = event.target.closest(cardSelectors);

    if (!card) {
      return;
    }

    event.preventDefault();
    navigate(routes.search);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".home-page-container1");
  const isSearchResults = document.querySelector(".search-result-container1");
  const isRoomDetail = document.querySelector(".room-detail-container1");

  if (isHomePage) {
    initializeHomeSearchMockup();
    initializeTrendingDestinationsLinks();

    bindClick(
      [
        ".home-page-thq-link-elm19",
        ".home-page-thq-button-elm2",
        ".home-page-thq-button-elm3",
      ],
      () => navigate(routes.search)
    );

    bindClick(
      [".home-page-thq-text-elm80", ".home-page-thq-link-elm20"],
      () => navigate(routes.home)
    );

    bindClick(
      [".home-page-thq-button-elm4"],
      () => {
        const message = document.querySelector(".home-page-thq-text-elm79");
        if (message) {
          message.textContent =
            "Thanks for subscribing. Travel deals will be sent to your inbox.";
        }
      }
    );
  }

  if (isSearchResults) {
    initializeCountdown();
    initializeSearchSummaryMockup();
    initializeSearchFiltersMockup();

    bindClick(
      [
        ".search-result-thq-button-elm12",
        ".search-result-thq-button-elm13",
        ".search-result-thq-button-elm14",
        ".search-result-thq-button-elm15",
        ".search-result-thq-button-elm16",
        ".search-result-thq-button-elm17",
        ".search-result-thq-deal1-elm",
        ".search-result-thq-deal2-elm",
        ".search-result-thq-deal3-elm",
        ".search-result-thq-article-hotel-card1-elm",
      ],
      () => navigate(routes.room)
    );

    bindClick(
      [
        ".search-result-thq-text-elm216",
        ".search-result-thq-link-elm19",
      ],
      () => navigate(routes.home)
    );

    bindClick(
      [".search-result-thq-button-elm11"],
      () => scrollToSelector(".search-result-thq-section-search-summary-bar-elm")
    );
  }

  if (isRoomDetail) {
    bindClick(
      [
        ".room-detail-thq-link-elm10",
        ".room-detail-thq-text-elm100",
        ".room-detail-thq-text-elm205",
        ".room-detail-thq-link-elm16",
      ],
      () => navigate(routes.home)
    );

    bindClick(
      [
        ".room-detail-thq-link-elm11",
        ".room-detail-thq-link-elm12",
        ".room-detail-thq-text-elm101",
        ".room-detail-thq-text-elm102",
      ],
      () => navigate(routes.search)
    );

    bindClick(
      [
        ".room-detail-thq-button-elm12",
        ".room-detail-thq-button-elm14",
        ".room-detail-thq-button-elm15",
        ".room-detail-thq-button-elm16",
        ".room-detail-thq-link-elm13",
        ".room-detail-thq-link-elm14",
        ".room-detail-thq-link-elm15",
      ],
      () => scrollToSelector(".room-detail-thq-room-selection-section-elm")
    );

    bindClick(
      [".room-detail-thq-button-elm13", ".room-detail-thq-button-elm17"],
      () => scrollToSelector(".room-detail-thq-guest-reviews-section-elm")
    );
  }
});
