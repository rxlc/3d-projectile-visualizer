import { Card, Button, Text, VStack } from '@chakra-ui/react';
import { BTContext } from '../Contexts/BTContext';

import { useContext } from 'react';
import { useEffect } from 'react';

const serviceUUID = 0xFFE0;
const serialUUID = 0xFFE1;

let device;
let serialCharacteristic;

export default function Bluetooth() {
    const { btObject, setBtObject } = useContext(BTContext);

    const btStyle = {
        position: "absolute",
        top: 0, 
        left: 0,
        zIndex: 16
    };

    async function connect() {
        device = await navigator.bluetooth.requestDevice({
            filters: [{ 
                services: [serviceUUID]
            }],
        });
    
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(serviceUUID);
    
        serialCharacteristic = await service.getCharacteristic(serialUUID);
    
        await serialCharacteristic.startNotifications();

        setBtObject({
            serialCharacteristic,
            device
        });
    }

    function disconnect() {
        device.gatt.disconnect();
        setBtObject(null);
    }

    useEffect(() => { 
        console.log(btObject);
    }, [btObject]);

    return (
        <Card style={btStyle} ml="16px" mt="16px" bgColor="transparent">
            { !btObject ?
                <Button colorScheme='blue' width="120px" variant="outline" bgColor={"transparent"} size='md' onClick={() => connect()}>Connect</Button> 
                :
                <Button colorScheme='red' width="120px" variant="outline" bgColor={"transparent"} size='md' onClick={() => disconnect()}>Disconnect</Button>
            }     

            <VStack alignItems={"flex-start"} mt="10px">
                <Text color={"whiteAlpha.700"} fontSize={"sm"}>Device name: {btObject?.device.name}</Text>
                <Text color={"whiteAlpha.700"} fontSize={"sm"}>UUID: {btObject?.serialCharacteristic.uuid}</Text>
            </VStack>
        </Card>
    )
}
