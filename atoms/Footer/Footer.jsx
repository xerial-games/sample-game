import Link from "next/link";
import getTextContent from "./textContent";

const textContent = getTextContent("spanish");

const Footer = ({ darkMode }) => {
  function socialMediaToRender(whiteModeSocialMediaImg, darkModeSocialMediaImg) {
    if (darkMode) return darkModeSocialMediaImg;
    else return whiteModeSocialMediaImg;
  }

  function setClass(classForWhiteMode, classForDarkMode) {
    if (darkMode) return classForDarkMode;
    else return classForWhiteMode;
  }

  return (
    <footer className="footer__footer">
      <div className={setClass("footer__principalContainer", "footer__darkModePrincipalContainer")}>
        <div className="footer__container">
          <p className={setClass("footer__generalText", "footer__darkModeGeneralText")}>{textContent.followUs}</p>
          <div className="footer__socialMediasContainer">
            <Link href={"https://www.instagram.com/"} target={"_blank"}>
              <img src={socialMediaToRender("/assets/socialMedias/instagram.svg", "/assets/socialMedias/whiteInstagram.svg")} alt="Instagram" />
            </Link>
            <Link href={"https://twitter.com"} target={"_blank"}>
              <img src={socialMediaToRender("/assets/socialMedias/twitter.svg", "/assets/socialMedias/whiteTwitter.svg")} alt="Twitter" />
            </Link>
            <Link href={"https://www.youtube.com/"} target={"_blank"}>
              <img src={socialMediaToRender("/assets/socialMedias/youtube.svg", "/assets/socialMedias/whiteYoutube.svg")} alt="Youtube" />
            </Link>
            <Link href={"https://discord.com/"} target={"_blank"}>
              <img src={socialMediaToRender("/assets/socialMedias/discord.svg", "/assets/socialMedias/whiteDiscord.svg")} alt="Discord" />
            </Link>
          </div>
        </div>
        <div>
          <Link className="footer__hyperlink" href={""}>
            <p className={setClass("footer__generalText", "footer__darkModeGeneralText")}>{textContent.termsAndConditions}</p>
          </Link>
        </div>
        <div>
          <p className={setClass("footer__generalText", "footer__darkModeGeneralText")}>
            {textContent.shareYourProject}
          </p>
          <Link className="footer__hyperlink" href={""}>
            <p className={setClass("footer__generalText", "footer__darkModeGeneralText") + " footer__textRight"}>{textContent.contactUs}</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
