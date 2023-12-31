import React, { useState, useRef, useEffect } from "react";
import { links } from "../Assets/IconsLinks";
import "../Icons/Icons.css";
import ListCards from "../Cards/ListCards";

function Icons() {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const iconDivRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = 300;
    const container = iconDivRef.current;

    if (container) {
      const currentScroll = container.scrollLeft;
      if (direction === "left") {
        container.scrollLeft = Math.max(currentScroll - scrollAmount, 0);
      } else if (direction === "right") {
        container.scrollLeft = currentScroll + scrollAmount;
      }
    }
  };

  useEffect(() => {
    setSearchQuery(links[selectedFilter].label);
  }, [selectedFilter]);

  // console.log(searchQuery, "hello");

  return (
    <>
      
      <div className="icon-container">
        <div
          className="arrow-button left-arrow"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </div>
        <div className="icon-div" ref={iconDivRef}>
          {links.map((item, index) => (
            <div
              key={index}
              className={`icon-sub-div ${
                index === selectedFilter && "selected-box"
              }`}
              onClick={() => setSelectedFilter(index)}
            >
              <div className="link-image">{item.imgSrc}</div>
              <p
                className={`link-label ${
                  index === selectedFilter && "selected-label"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div
          className="arrow-button right-arrow"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </div>
      </div>
      <div>
        <ListCards searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default Icons;
