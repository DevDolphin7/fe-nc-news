import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UsernameProvider } from "./contexts/UsernameProvider";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UsernameProvider>
      <App />
    </UsernameProvider>
  </BrowserRouter>
);
