import React from "react";

const Header = () => {
    return (
    <header style={{ padding: "10px", background: "#cbe6f4", color: "#3d4859", textAlign: "center" }}>
        <h1
        style={{
            textShadow: "2px 2px 0 #fff, -2px -2px 0 #fff, -2px 2px 0 #fff, 2px -2px 0 #fff",
            fontSize: "3rem", 
            fontFamily: "'Poppins', sans-serif", 
            margin: "2", 
        }}
        >
        Weather Checker
        </h1>
    </header>
    );
};

export default Header;

