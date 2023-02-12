import React, { useRef, useEffect, useContext } from "react";
import Experience from './Experience/Experience.js'
import { ExperienceContext } from "./Contexts/ExperienceContext";

function ThreeScene() {
    const containerRef = useRef(null);
    const { setExperience } = useContext(ExperienceContext);

    useEffect(() => {
        const experience = new Experience(containerRef);
        setExperience(experience);

    }, [containerRef, setExperience])

    return <div ref={containerRef} style={{ background: 'gray', width: window.innerWidth, height: window.innerHeight, position: "fixed", left: "0px", top: "0px" }} id="fcanvas"/>;
}

export default ThreeScene;

