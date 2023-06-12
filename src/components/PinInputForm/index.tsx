import React, { useState } from "react";
import {
  Button,
  Divider,
  HStack,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ReducerData } from "../../store/reducers";
import {
  CustomPinInput,
  CustomPinInputField,
} from "../library/ChakraCustomPinInput/src";
import postPin, { PostPinResult } from "../../services/postPin";
import { getRegExp } from "../../utils/converter";

const PinInputForm = () => {
  const toast = useToast();

  const pinInputConfigData = useSelector(
    (state: ReducerData) => state.pinInputConfig
  );
  const [pinInputValue, setPinInputValue] = useState("");
  const [isSecret, setIsSecret] = useBoolean();
  const [isSubmit, setIsSubmit] = useState(false);

  const submitPinData = async () => {
    setIsSubmit(true);

    const postPinResult: PostPinResult = await postPin(pinInputValue);
    toast({
      title: "Submit Pin Data Response",
      variant: "left-accent",
      position: "top-right",
      description: postPinResult.message,
      status: postPinResult.status,
      duration: 3000,
      isClosable: true,
    });

    setIsSubmit(false);
  };

  return (
    <>
      <HStack>
        <CustomPinInput
          pattern={getRegExp(pinInputConfigData.validatePattern)}
          autoFocus
          mask={isSecret}
          isDisabled={isSubmit}
          defaultValue={pinInputConfigData.defaultValue}
          onComplete={(value) => {
            setPinInputValue(value);

            if (pinInputConfigData.isEnableAutoSubmit) {
              submitPinData();
            }
          }}
        >
          <CustomPinInputField />
          <CustomPinInputField />
          <CustomPinInputField />
          <CustomPinInputField />
          <CustomPinInputField />
          <CustomPinInputField />
        </CustomPinInput>
      </HStack>

      {!pinInputConfigData.isEnableAutoSubmit && (
        <>
          <Button
            colorScheme="teal"
            variant="outline"
            className="my-5 w-48 uppercase"
            isDisabled={pinInputValue.length < 6 || isSubmit}
            onClick={submitPinData}
          >
            <span className="font-bold">Submit</span>
          </Button>
          <Divider />
        </>
      )}

      <div className="pt-5">
        <Button
          colorScheme={isSecret ? "teal" : "gray"}
          variant="solid"
          size="sm"
          onClick={setIsSecret.toggle}
          className="w-full"
        >
          Secret Mode: {isSecret ? "ENABLE" : "DISABLE"}
        </Button>
      </div>
    </>
  );
};

export default PinInputForm;
