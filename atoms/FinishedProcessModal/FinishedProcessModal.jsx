const FinishedProcessModal = ({
  title,
  description,
  hyperlink,
  hyperlinkTextContent,
  buttonContent,
  buttonClick,
  titleCenter,
  textContentCenter,
  className
}) => {
  const titleClass = titleCenter ? "finished-process-modal__title finished-process-modal__textCenter" : "finished-process-modal__title";
  const textContentClass = textContentCenter ? "finished-process-modal__textContent finished-process-modal__textCenter" : "finished-process-modal__textContent";
  const containerBaseClass = "finished-process-modal__principalContainer ";
  const containerClass = !className ? containerBaseClass : containerBaseClass + className;

  return (
    <div className={containerClass}>
      <div className="finished-process-modal__container">
        <img
          className="finished-process-modal__okIcon"
          src="/assets/okIcon.svg"
          alt="Ok Icon"
        />
        <p className={titleClass}>{title}</p>
        <p className={textContentClass}>
          {description}
          {hyperlinkTextContent ? <a target="_blank" className="finished-process-modal__hyperlink" href={hyperlink}>{hyperlinkTextContent}</a> : ""}
        </p>
        <button
            className="finished-process-modal__buttonTransparentRose"
            onClick={buttonClick}>
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default FinishedProcessModal;
