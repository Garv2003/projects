import "./Sponsors.css";
import { useEffect } from "react";

const Sponsors = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
    addAnimation();
  }, []);

  return (
    <>
    <h2 className="TeamHead">
          Our Sponsors
        </h2>
      <p className="TeamSubHead">
        Check out our sponsors and support them.
      </p>
    <div>
      <div className="sp">
        <div className="scroller" data-direction="right" data-speed="fast">
          <div className="scroller__inner">
            <img src="https://assets.stickpng.com/thumbs/61309bc748f1e3000491018d.png" alt="" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Adidas_Logo_Grey.svg/1280px-Adidas_Logo_Grey.svg.png" alt="" />
            <img src="https://pngfre.com/wp-content/uploads/nike-logo-20-1-1024x1024.png" alt="" />
            <img src="https://assets.stickpng.com/images/62cc22d1150d5de9a3dad603.png" alt="" />
            <img src="https://raymetrics.com/wp-content/uploads/2021/01/5c7121203f8bb20f5623ca81_invision-logo-export-v1.png" alt="" />
            <img src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sponsors;
