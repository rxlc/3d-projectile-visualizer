import React, {useContext, useEffect, useState} from 'react';
import { ExperienceContext } from '../Contexts/ExperienceContext';
import { ProjectilesContext } from '../Contexts/ProjectilesContext';
import { Card, Text, Divider, Flex, VStack, position } from '@chakra-ui/react';
import { AnimatePresence } from "framer-motion" 

import ProjectileCard from './ProjectileCard';

function Projectiles() {
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
        <Flex 
          position={"fixed"}
          flexDirection="column"
          right="0"
          width="16%"
          mr="10px"
          opacity={0.8}
          zIndex={1}>
          
          {/*{projectiles.length > 0 ? (
            <Card bg="gray.800" mr="3%" py="20px" px="10px" color="white">
              <Text ml="8px" fontSize="15px" my="4px">Vertical angle: {projectiles[0].angleV}°</Text>
              <Text ml="8px" fontSize="15px" my="4px">Horizontal angle: {projectiles[0].angleH}°</Text>
              <Divider my="3px" width="95%" alignSelf="center"/>
              <Text ml="8px" fontSize="15px" my="4px">Inital velocity: {projectiles[0].initVel} m/s</Text>
              <Text ml="8px" fontSize="15px" my="4px">Time taken: {projectiles[0].timeTaken}s</Text>
            </Card>
          ) : null}
          */}
          <Text color="white" fontSize={"18px"} ml="5px" opacity={projectiles.length > 0 ? 1 : 0} borderBottom="1px solid white" width="95%"
            style={{
              transition: 'opacity 0.3s ease-in-out',
          }}
          >Projectiles:</Text>
          <VStack w={400} spacing={3} mt="4px" height="200px">
            <AnimatePresence>
              {projectiles.map((projectile) => {
                return (
                  <ProjectileCard key={projectile.id} projectile={projectile}/>
                )
              })}
            </AnimatePresence>
          </VStack>
        </Flex>
    )
}

export default Projectiles;
