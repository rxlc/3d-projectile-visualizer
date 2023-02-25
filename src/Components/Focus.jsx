import React, {useContext, useState, useEffect} from 'react'
import { Flex, Text, Button, HStack } from '@chakra-ui/react';
import { ExperienceContext } from '../Contexts/ExperienceContext';

function Focus() {
    const experience = useContext(ExperienceContext);
    const [ar, setAr] = useState(false);

    useEffect(() => {
        document.addEventListener("stoppedAr", () => {
            experience.experience.camera.controls.autoRotate = false;
            setAr(false)
        })

        document.addEventListener("startAr", () => {
            experience.experience.camera.controls.autoRotate = true;
            setAr(true)
        })
    }, [experience])

    function focusOnTarget() {
        experience.experience.world.focus(experience.experience.world.target.instance)
    }

    function focusOnLauncher() {
        experience.experience.world.focus(experience.experience.world.launcher.instance)
    }

    function focusOnAll() {
        experience.experience.world.focus(experience.experience.world.centerObject)
    }

    function autoRotate() {
        if (ar) {
            experience.experience.camera.controls.autoRotate = false;
            setAr(false);
        } else {
            experience.experience.camera.controls.autoRotate = true;
            setAr(true);
        }
    }

    return (
        <Flex
            position="fixed"
            bottom="0"
            left="0"
            ml="2%"
            mb="0.3%"
            zIndex={1}
            gap="5px"
            flexDirection={"column"}   
        >   
            <Text color={"whiteAlpha.700"}>Focus:</Text>
            <HStack>
                <Button colorScheme='blue' variant='outline' height="30px" fontSize={"sm"} onClick={focusOnLauncher}>
                    Launcher
                </Button>
                <Button colorScheme='red' variant='outline' height="30px" fontSize={"sm"} onClick={focusOnTarget}>
                    Target
                </Button>
            </HStack>
            <Button colorScheme='teal' variant='outline' height="30px" fontSize={"sm"} onClick={focusOnAll}>
                All
            </Button>

            <Button colorScheme='orange' variant='outline' height="30px" mt='10px' _hover={""} bgColor={ar ? "white" : "transparent"} onClick={autoRotate} fontSize={"sm"}>
                Auto Rotate
            </Button>
        </Flex>
    )
}

export default Focus;