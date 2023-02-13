import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import './scrollButton.css'

const ScrollButton = () => {

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled >= 100) {
      setVisible(true);
    } else if (scrolled < 100) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="btnGoTo" onClick={scrollToTop}>
      <FontAwesomeIcon
        icon={faChevronUp}
        style={{ display: visible ? "inline" : "none" }}
      />
    </div>
  );
};

export default ScrollButton;
