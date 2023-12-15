import axios from "../ultils/axios";

export const getPaymentConfig = async () => {
  try {
    const result = await axios.get("payment/config");
    return result;
  } catch (error) {
    return error;
  }
};
