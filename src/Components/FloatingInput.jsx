import { useContext } from "react";
import { AngleContext } from "../Contexts/AngleContext";
import { VelContext } from "../Contexts/VelContext";

import {
    ChakraProvider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    extendTheme,
    Box
  } from "@chakra-ui/react";
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-30px)",
    opacity: 0.5
  };
  export const theme = extendTheme({
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      }
    }
  });
  
export default function FloatingInput({
    label,
    width,
    height,
    fontsize,
    helper,
    mode = 0
}) {

    const {setAngle} = useContext(AngleContext)
    const {setVel} = useContext(VelContext)

    function handleChange(event) {
      if (mode == 1) {
        setAngle(event.target.value)
      }
      if (mode == 2) {
        setVel(event.target.value)
      }
    }

    return (
        <ChakraProvider theme={theme}>
        <Box p={2} marginLeft="10px" marginY="10px">
            <FormControl variant="floating">
            <Input placeholder=" " width={width} height={height} onChange={(event) => handleChange(event)}/>
            <FormLabel fontSize={fontsize}>{label}</FormLabel>
            <FormHelperText fontSize={"xs"}>{helper}</FormHelperText>
            <FormErrorMessage></FormErrorMessage>
            </FormControl>
        </Box>
        </ChakraProvider>
    );
}