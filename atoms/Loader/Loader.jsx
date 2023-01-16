const Loader = ({ text }) => {
  return (
    <div className="loader__principalContainer">
      <div className="loader__container">
        <div className="loader_loaderContainer">
          <img className="loader__loaderImage" src="/assets/loader.png" alt="loader" />
        </div>
        <h2 className="loader__title">{text}</h2>
      </div>
    </div>
  );
};

export default Loader;
