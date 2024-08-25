import { Bounce, toast } from "react-toastify";
import { getThemeFromStorage } from "../storage/localStorage";
import { Theme } from "../interfaces/context/theme.d";

const theme = getThemeFromStorage;

export function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred.";
}

export function showToastError(errorMessage: string) {
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme() ?? Theme.LIGHT,
    transition: Bounce
  });
}

export function showToastSuccess(message: string) {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme() ?? Theme.LIGHT,
    transition: Bounce
  });
}
