const LanguageValue = {
  Russian: "ru",
  English: "en",
};

const NightModeValue = {
  Dark: "dark-mode",
};

const languageButton = document.querySelector(".language-button");
const nightModeButton = document.querySelector(".night-mode-button");

const changeLanguage = () => {
  const lang = document.documentElement.lang;

  switch (lang) {
    case LanguageValue.Russian: {
      document.documentElement.setAttribute("lang", LanguageValue.English);
      break;
    }
    case LanguageValue.English: {
      document.documentElement.setAttribute("lang", LanguageValue.Russian);
      break;
    }
  }
};

const changeNightMode = () => {
  const currentMode = document.body.classList.contains(NightModeValue.Dark);

  if (currentMode) {
    document.body.classList.remove(NightModeValue.Dark);
  } else {
    document.body.classList.add(NightModeValue.Dark);
  }
};

const onChangeLanguageButtonClickHandler = () => {
  changeLanguage();
};

const onNightModeButtonClickHandler = () => {
  changeNightMode();
};

if (languageButton) {
  languageButton.addEventListener("click", onChangeLanguageButtonClickHandler);
}

if (nightModeButton) {
  nightModeButton.addEventListener("click", onNightModeButtonClickHandler);
}
