import { useState } from "react";

const useInput = (
  defaultValue: string,
  validateFn: (value: string) => boolean
) => {
  const [input, setInput] = useState(defaultValue);

  const handleInputChange = (value: string) => setInput(value);

  const isError = !validateFn(input);

  return {
    input,
    handleInputChange,
    isError,
  };
};

export default useInput;
