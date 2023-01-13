const textContent = {
  english: {
    followUs: "Follow us",
    termsAndConditions: "Terms and Conditions",
    shareYourProject: "Do you want to share your project?",
    contactUs: "Contact us",
  },
  spanish: {
    followUs: "Seguinos en nuestras redes",
    termsAndConditions: "Términos y Condiciones",
    shareYourProject: "¿Querés compartirnos tu proyecto?",
    contactUs: "Contactanos",
  },
};

function getTextContent(language) {
  return textContent[language];
}

export default getTextContent;
