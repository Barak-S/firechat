import { toast } from 'react-toastify';

const success = (message, toastId) => toast.success(message, { toastId });
const error = (message, toastId) => toast.error(message, { toastId });

const dismiss = (toastId) => toast.dismiss(toastId);

export const Toast = { success, error, dismiss };