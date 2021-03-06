import React, { useState, useEffect, useRef } from "react";
import Images from "../Images/Images";
import SideMenu from "../SideMenu/SideMenu";
import "./Menu.scss";

const Menu = ({t}) => {
  const [triggerMenu, setTriggerMenu] = useState(false);
  const [showIcon, setShowIcon] = useState(0);
  const [smallScreen, setSmallScreen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const imgPosition = ref.current.getBoundingClientRect().top;
    const scrollHandler = () => {
      const pageScroll = window.scrollY + window.innerHeight;
      pageScroll > imgPosition ? setTriggerMenu(true) : setTriggerMenu(false);
    };

    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const calcPageWidth = () => {
    window.innerWidth <= 900 ? setSmallScreen(true) : setSmallScreen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", calcPageWidth);
    calcPageWidth();
    return () => window.removeEventListener("resize", calcPageWidth);
  }, []);

  return (
    <React.Fragment>
      <div className={triggerMenu ? "menu-container" : ""}>
        <SideMenu
          triggerMenu={triggerMenu}
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          smallScreen={smallScreen}
          setSmallScreen={setSmallScreen}
          t={t}
        />
        <Images
          ref={ref}
          triggerMenu={triggerMenu}
          showIcon={showIcon}
          smallScreen={smallScreen}
        />
      </div>
    </React.Fragment>
  );
};

export default Menu;
