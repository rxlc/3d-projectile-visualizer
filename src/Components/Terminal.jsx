import { useContext, useEffect, useState, useRef } from "react";
import { BTContext } from "../Contexts/BTContext";

import { Card, Input, Stack } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion'

import Message from './Message';

export default function Terminal() {
    const { btObject } = useContext(BTContext);
    const [command, setCommand] = useState('');

    const [response, setResponse] = useState([]);

    const [messages, setMessages] = useState([]);

    const [currentId, setCurrentId] = useState(0);

    const terminalStyle = {
        position: "absolute",
        top: "30%", 
        right: 0,
        zIndex: 16
    };

    const inputRef = useRef(null);

    useEffect(() => {
        if (messages.length > 7) {
            setMessages(messages.slice(0, -1));
        }
    }, [messages]);

    function addMessage(text, type) {
        setMessages((prevMessages) => [
          { text, type, id: assignId() },
          ...prevMessages,
        ]);
    };

    function assignId() {
        setCurrentId(currentId + 1);
        return currentId;
    }

    useEffect(() => {
        if (btObject) {
            btObject.serialCharacteristic.addEventListener('characteristicvaluechanged', read);
            addMessage(`Launcher connected. Device name: ${btObject.device.name}`, 'bt');
        }
    }, [btObject]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, []);

    function handleKeyPress(event) {
        if (event.key === '/') {
            event.preventDefault();
            inputRef.current.focus();
        } else if (event.key === 'Escape') {
            inputRef.current.blur();
        }
    }

    function handleEnter(event) {
        if (event.key === 'Enter' && command != '') write(command);
    };

    function processCommand(command) {
        command = command.split(' ');

        switch (command[0]) {
            case 'c':
                setMessages([]);
                addMessage('Terminal cleared.', '');
                return true;
            default:
                return false;
        }
    }

    function read() {
        let buffer = event.target.value.buffer;
        let view = new Uint8Array(buffer);
        let decodedMessage = String.fromCharCode.apply(null, view);

        setResponse((prevResponse) => [...prevResponse, decodedMessage]);
    }

    useEffect(() => {
        let responseString = response.join('');
        if (responseString.includes('xyz')) {
            addMessage(responseString.replace('xyz', ''), '');
            setResponse([]);
        }
    }, [response]);

    async function write(command) {
        setCommand('');

        if (processCommand(command)) return;

        if (!btObject) {
            addMessage('Launcher not connected.', 'error', assignId());
            return;
        }

        let commandInput = command;
        commandInput += '\n';

        let buffer = new ArrayBuffer(commandInput.length);
        let encodedMessage = new Uint8Array(buffer);

        for(let i=0; i<commandInput.length; i++){
            encodedMessage[i] = commandInput.charCodeAt(i);
        }
    
        await btObject.serialCharacteristic.writeValue(encodedMessage);
    }

    return (
        <Card style={terminalStyle} bgColor="transparent" width="260px" alignItems={"left"} mr="15px">
            <Input variant='flushed' placeholder="Input commands..." size="sm" borderColor={"gray"} color="gray.400"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleEnter}
                ref={inputRef}/>

            <AnimatePresence>
                <Stack spacing={1} mt="10px" alignItems={"flex-start"}>
                    {messages && messages.map((message) => (
                        <Message key={message.id} content={message}/>   
                    ))}
                </Stack>
            </AnimatePresence>
                        
        </Card>
    )
}