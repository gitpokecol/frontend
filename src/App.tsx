import { BrowserRouter, Route, Routes } from "react-router-dom";
import Background from "./component/Background";
import NaviBar from "./component/Navibar";
import LoginPage from "./page/LoginPage";
import { Stack } from "@mui/material";
import PokedexPage from "./page/PokedexPage";
import PokemonPage from "./page/PokemonPage";
import ProfilePage from "./page/ProfilePage";
import NotFoundPage from "./page/NotFoundPage";
import { RecoilRoot } from "recoil";
import AuthCallbackPage from "./page/AuthCallbackPage";
import DailyItemPage from "./page/DailyItemPage";
import RootPage from "./page/RootPage";
import BagPage from "./page/BagPage";
import { SnackbarProvider } from "notistack";
import RequireAuth from "./component/RequireAuth";

function App() {
  return (
    <Stack direction="column" height="100dvh" width="100dwh">
      <RecoilRoot>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <BrowserRouter>
            <NaviBar />
            <Background />
            <Routes>
              <Route path="/" element={<RootPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route
                path="/daily-item"
                element={
                  <RequireAuth>
                    <DailyItemPage />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/pokedex"
                element={
                  <RequireAuth>
                    <PokedexPage />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/pokemon"
                element={
                  <RequireAuth>
                    <PokemonPage />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/bag"
                element={
                  <RequireAuth>
                    <BagPage />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/auth-callback"
                element={<AuthCallbackPage />}
              ></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </RecoilRoot>
    </Stack>
  );
}

export default App;
