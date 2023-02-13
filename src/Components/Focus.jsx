import React, {useState} from 'react'
import { Flex, Text, Button, HStack } from '@chakra-ui/react';

function Focus() {
    return (
        <Flex
            position="absolute"
            bottom="0"
            left="0"
            ml="2%"
            mb="12px"
            zIndex={1}
            gap="5px"
            flexDirection={"column"}   
        >   
            <Text color={"whiteAlpha.700"}>Focus:</Text>
            <HStack>
                <Button colorScheme='blue' variant='outline' height="30px" fontSize={"sm"}>
                    Launcher
                </Button>
                <Button colorScheme='red' variant='outline' height="30px" fontSize={"sm"}>
                    Target
                </Button>
            </HStack>
            <Button colorScheme='teal' variant='outline' height="30px" fontSize={"sm"}>
                All
            </Button>
        </Flex>
    )
}

export default Focus;