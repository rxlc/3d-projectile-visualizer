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

    return <div ref={containerRef} id="fcanvas"/>;
}

export default ThreeScene;

