import React, {useContext, useEffect, useState} from 'react';
import { ExperienceContext } from '../Contexts/ExperienceContext';
import { ProjectilesContext } from '../Contexts/ProjectilesContext';
import { Card, Text, Divider } from '@chakra-ui/react';

function Result() {
  const experience = useContext(ExperienceContext);
  const {projectiles, setProjectiles} = useContext(ProjectilesContext);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    console.log(projectiles);
  }, [projectiles, updateCount]);

  useEffect(() => {
    document.addEventListener("updateProjectiles", () => {
      if (experience.experience) {
        setProjectiles(experience.experience.world.projectile.trajectories);
        setUpdateCount((count) => count + 1);
      }
    });
  }, [experience.experience, setProjectiles]);

    return (
        <div style={{
            position: "absolute",
            width: "100vw",
            height: '75vh',
            display: 'flex',
            flexFlow: "column",
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>   
                {projectiles.length > 0 ? (
                    <Card 
                        mr="2%"
                        width="15%"
                        bg="gray.800"
                        opacity={0.8}
                        zIndex={1}
                        color="white"
                        py="20px"
                        px="10px">
                            <Text ml="8px" fontSize="15px" my="4px">Vertical angle: {projectiles[projectiles.length-1].angleV}°</Text>
                            <Text ml="8px" fontSize="15px" my="4px">Horizontal angle: {projectiles[projectiles.length-1].angleH}°</Text>
                            <Divider my="3px" width="95%" alignSelf="center"/>
                            <Text ml="8px" fontSize="15px" my="4px">Inital velocity: {projectiles[projectiles.length-1].initVel} m/s</Text>
                            <Text ml="8px" fontSize="15px" my="4px">Time taken: {projectiles[projectiles.length-1].timeTaken}s</Text>
                    </Card>
                ) : null}
        </div>
    )
}

export default Result;
