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
              <Route path="/daily-item" element={<DailyItemPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="/pokedex" element={<PokedexPage />}></Route>
              <Route path="/pokemon" element={<PokemonPage />}></Route>
              <Route path="/bag" element={<BagPage />}></Route>
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
