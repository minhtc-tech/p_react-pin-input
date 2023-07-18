import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { ReducerData } from "../../store/reducers";
import { useDispatch } from "react-redux";
import { getRegExp } from "../../utils/converter";
import {
  RESET_DEFAULT,
  UPDATE_VALUE,
} from "../../store/reducers/pinInputConfigReducer";

const ConfigModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const pinInputConfigData = useSelector(
    (state: ReducerData) => state.pinInputConfig
  );

  const [isEnableAutoSubmit, setIsEnableAutoSubmit] = useState(false);
  const {
    input: regexInput,
    handleInputChange: handleRegexInputChange,
    isError: isRegexError,
  } = useInput(pinInputConfigData.validatePattern.toString(), (value) => {
    try {
      getRegExp(value);

      return value.startsWith("/") && value.endsWith("/");
    } catch {
      return false;
    }
  });
  const {
    input: defaultValueInput,
    handleInputChange: handleDefaultValueInputChange,
    isError: isDefaultValueError,
  } = useInput(
    pinInputConfigData.defaultValue,
    (value) =>
      value.length === 0 ||
      (!isRegexError &&
        value
          .split("")
          .every((character) => getRegExp(regexInput).test(character)) &&
        value.length === 6)
  );

  useEffect(() => {
    handleRegexInputChange(pinInputConfigData.validatePattern);
    handleDefaultValueInputChange(pinInputConfigData.defaultValue);
    setIsEnableAutoSubmit(pinInputConfigData.isEnableAutoSubmit);

    // eslint-disable-next-line
  }, [pinInputConfigData]);

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="green"
        size="sm"
        className="w-full py-5"
      >
        Configuration Panel
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Configuration Panel</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={isRegexError} isRequired className="pb-6">
              <FormLabel>Regex</FormLabel>
              <Input
                type="text"
                value={regexInput}
                onChange={(event) => {
                  handleRegexInputChange(event.target.value.trim());
                }}
              />

              {!isRegexError ? (
                <FormHelperText>
                  A regex for Pin Input to validate each character:{" "}
                  <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions"
                    color="green"
                    className="font-bold"
                    target="_blank"
                  >
                    /[a-z]/
                  </Link>
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  Note: Please do not include flags, the regex must start and
                  end with '/' character
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={isDefaultValueError}>
              <FormLabel>
                Default value{" "}
                <Tag size="sm" colorScheme="green" className="ml-1 mt-1">
                  Optional
                </Tag>
              </FormLabel>
              <Input
                type="text"
                value={defaultValueInput}
                onChange={(event) => {
                  handleDefaultValueInputChange(event.target.value.trim());
                }}
                maxLength={6}
              />

              {!isDefaultValueError ? (
                <FormHelperText>
                  Enter a value that match the regex above with 6 characters
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  Enter a value that match the regex above with 6 characters
                </FormErrorMessage>
              )}
            </FormControl>

            <label htmlFor="auto-submit-pin-input" className="block pb-4 pt-8">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable auto submit Pin Input?</FormLabel>
                <Switch
                  id="auto-submit-pin-input"
                  colorScheme="green"
                  size="lg"
                  isChecked={isEnableAutoSubmit}
                  onChange={() => {
                    setIsEnableAutoSubmit(!isEnableAutoSubmit);
                  }}
                />
              </FormControl>
            </label>
          </ModalBody>

          <Divider />

          <ModalFooter>
            <Button
              onClick={() => {
                dispatch({ type: RESET_DEFAULT });
                onClose();
              }}
              colorScheme="red"
              variant="outline"
              className="mr-3"
            >
              Reset to default
            </Button>

            <Button onClick={onClose} colorScheme="gray" className="mr-3">
              Cancel
            </Button>

            <Button
              colorScheme="green"
              isDisabled={isDefaultValueError || isRegexError}
              onClick={() => {
                dispatch({
                  type: UPDATE_VALUE,
                  value: {
                    validatePattern: regexInput,
                    defaultValue: defaultValueInput,
                    isEnableAutoSubmit: isEnableAutoSubmit,
                  },
                });
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfigModal;
