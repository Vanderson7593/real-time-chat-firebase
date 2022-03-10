import { FC, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { authErrorSelector } from "../../redux/auth/auth.selectors";
import { useAppSelector } from "../../redux/hooks";
import "react-toastify/dist/ReactToastify.css";
import { channelRootSelector } from "../../redux/channels/channels.selectors";

const Toast: FC = () => {
  const authError = useAppSelector(authErrorSelector);
  const { errorMessage } = useAppSelector(channelRootSelector);
  const notify = () => toast.error(errorMessage || authError?.message);

  useEffect(() => {
    if (authError?.message) notify();
    //eslint-disable-next-line
  }, [authError, errorMessage]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Toast;
