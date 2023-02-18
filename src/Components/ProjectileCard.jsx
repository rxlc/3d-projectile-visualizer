import React, {memo} from 'react';
import { Text, Divider, Flex } from '@chakra-ui/react';
import { motion } from "framer-motion" 

const ProjectileCard = memo(({projectile}) => {
        const MotionFlex = motion(Flex);

        return (
            <MotionFlex bg="gray.800" height="65px" color="white" width="75%" key={projectile.id} display="flex" flexDirection={'row'} alignSelf="flex-start" p="12px" borderRadius={"3px"} whileHover={{ opacity: 0.7, cursor: 'pointer'}}
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                exit={{ opacity: 0, y: 50 }}  
                layout                  
            >
                <Flex flexDirection={"column"} width="120px">
                <Text fontSize="10px" color="gray.300">Target position:</Text>
                <Text fontSize="14px" mt="1px">x: {projectile.targetPos.x} y: {projectile.targetPos.y} z: {projectile.targetPos.z}</Text>
                </Flex>
                <Divider orientation="vertical" mx="8px"/>
                <Flex flexDirection={"column"} width="40px">
                <Text fontSize="10px" color="gray.300">Angle:</Text>
                <Text fontSize="16px" mt="1px">{projectile.angleV}°</Text>
                </Flex>
                <Divider orientation="vertical" mx="8px"/>
                <Flex flexDirection={"column"} width="70px">
                <Text fontSize="10px" color="gray.300">Velocity:</Text>
                <Text fontSize="16px" mt="1px">{projectile.initVel} m/s</Text>
                </Flex>
            </MotionFlex>
        )
    },
    (next, prev) => next.projectile === prev.projectile
);

export default ProjectileCard
