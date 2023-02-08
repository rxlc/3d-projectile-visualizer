import React, { useRef, useEffect } from "react";
import Experience from './Experience/Experience.js'

function ThreeScene() {
    const containerRef = useRef(null);

    useEffect(() => {
        const scene = new Experience(containerRef);
        scene.world.launch();
    }, [containerRef])

    return <div ref={containerRef} style={{ background: 'gray', width: window.innerWidth, height: window.innerHeight, position: "fixed", left: "0px", top: "0px" }} id="fcanvas"/>;
}

export default ThreeScene;

