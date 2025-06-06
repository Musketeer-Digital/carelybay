import { toast, ToastOptions } from "react-toastify";

interface ToastStyles {
  success: ToastOptions["style"];
  error: ToastOptions["style"];
}

const toastStyles: ToastStyles = {
  success: {
    background: "#E8F5E9",
    color: "#2E7D32",
    borderRadius: "8px",
    fontSize: "14px",
  },
  error: {
    background: "#FFF0ED",
    color: "#FF3B2E",
    borderRadius: "8px",
    fontSize: "14px",
  },
};

export const showToast = (
  message: string,
  type: keyof ToastStyles = "success",
) => {
  toast[type](message, {
    style: toastStyles[type],
  });
};
