import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import store from "./storage";
import theme from "./theme";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
