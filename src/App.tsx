import { Route, Routes } from "react-router-dom";
import { Chat, SignIn, RedirectPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectPage>
            <Chat />
          </RedirectPage>
        }
      />
      <Route
        path="/sign-in"
        element={
          <RedirectPage>
            <SignIn />
          </RedirectPage>
        }
      />
    </Routes>
  );
}

export default App;
