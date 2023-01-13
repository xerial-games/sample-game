import router from "next/router";

const Header = ({ darkMode }) => {
  const headerClass = darkMode
    ? "header__darkHeader"
    : "header__header";

  const hyperlinkClass = darkMode
    ? "header__darkHyperlink"
    : "header__hyperlink";

  const logoutIcon = darkMode
    ? "/assets/logoutIcon.svg"
    : "/assets/whiteLogoutIcon.svg";

  function documentationTextContent(language) {
    if (language == "spanish") return "Documentación";
    if (language == "english") return "Documentation"
  }
  function goToHome() {
    router.push("/")
  }
  return (
    <header className={headerClass}>
      <img onClick={goToHome} className="header__logo" src="/assets/logo.png" alt="Xerial logo" />
      <div className="header__container">
        <a className={hyperlinkClass}>{documentationTextContent("spanish")}</a>
      </div>
    </header>
  );
};

export default Header;
