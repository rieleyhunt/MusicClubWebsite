import React from "react";
import "./TopBar.css";

const TopBar = ({ logo, buttons }) => {
    return (
        <div className="top-bar">
            <div className="logo">{logo}
                <div className="buttons-container">
                    {buttons.map((btn, index) => {
                        <button key={index} className = "button" onClick={btn.onClick}>
                            {btn.label}
                        </button>
                    })}
                </div>
            </div>
        </div>
    );
};

export default TopBar;