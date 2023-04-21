const LanguageValue = {
  Russian: "ru",
  English: "en",
};

const languageButton = document.querySelector(".language-button");

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

const onChangeLanguageButtonClickHandler = () => {
  changeLanguage();
};

if (languageButton) {
  languageButton.addEventListener("click", onChangeLanguageButtonClickHandler);
}
