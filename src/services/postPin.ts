import { ref, set } from "firebase/database";
import { database } from "./firebase";

export interface PostPinResult {
  message: string;
  status: "success" | "error";
}

const postPin = async (pin: string): Promise<PostPinResult> => {
  try {
    await set(ref(database, "pin"), pin);

    const successData: PostPinResult = {
      message: "Data posted successfully with PIN: " + pin,
      status: "success",
    };
    return successData;
  } catch (error) {
    const errorData: PostPinResult = {
      message: "Error posting data: " + error,
      status: "error",
    };
    return errorData;
  }
};

export default postPin;
