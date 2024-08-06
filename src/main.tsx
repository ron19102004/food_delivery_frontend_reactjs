import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import RouterPagesProvider from "./root/routes/config";
import AuthProvider from "./contexts/auth.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import RequestRoleProvider from "./contexts/request-role.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <ChakraProvider>
          <RequestRoleProvider>
            <RouterPagesProvider />
          </RequestRoleProvider>
        </ChakraProvider>
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
