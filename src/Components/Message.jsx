import { Text, Card } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { memo } from 'react';

const Message = memo(({content}) => {
    const MotionCard = motion(Card)

    function returnColor() {
        if (content.type == "error") return "red.400";
        if (content.type == "bt") return "blue.400";

        return "gray.600";
    }

    return (
        <MotionCard 
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        exit={{ opacity: 0, y: 50 }}  
        transition={{ duration: 0.3 }}
        layout    
        bg="transparent" color="white" flexFlow={"row"} 
        alignItems="flex-end" justifyContent="space-between" cursor={"pointer"}
        >
            <Text fontSize={"13px"} color={returnColor()}>{content.text}</Text>
        </MotionCard>
    )

    },
    (next, prev) => next.content === prev.content
);

export default Message;