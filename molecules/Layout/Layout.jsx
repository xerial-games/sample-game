import Footer from "atoms/Footer/Footer";
import Header from "atoms/Header/Header";

const Layout = ({ children, darkMode }) => {
  function setClass(classForWhiteMode, classForDarkMode) {
    if (darkMode) return classForDarkMode;
    else return classForWhiteMode;
  }

  return (
    <div>
      <Header darkMode={darkMode}/>
      <div className={setClass("layout__boxBackground", "layout__darkBoxBackground")}>
        {children}
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Layout;
