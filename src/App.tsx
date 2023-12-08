import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AppLayout from "./ui/appLayout";
import NewsPage from "./pages/NewsPage";
import HistoryPage from "./pages/HistoryPage";
import SeasonPage from "./pages/SeasonPage";
import PlayersListPage from "./pages/PlayersListPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import NewsReviewPage from "./pages/NewsReviewPage";
import CreateNewsPage from "./pages/CreateNewsPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import EditNews from "./features/news/EditNews";
import CreateMatchTable from "./pages/CreateMatchTable";
import EditMatchTable from "./pages/EditMatchTable";
import PlayerDetails from "./features/players/PlayerDetails";
import EditPlayer from "./features/players/CreateOrEditPlayer";
import EditPlayerPage from "./pages/EditPlayerPage";
import CreatePlayerPage from "./pages/CreatePlayerPage";
import AuthLayout from "./ui/AuthLayout";
import { useUser } from "./hooks/users/useUser";
import UpdateHistory from "./features/history/UpdateHistory";

export default function App() {
  const { authenticated } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:newsId" element={<NewsReviewPage />} />

          <Route path="/history" element={<HistoryPage />} />
          <Route path="/season" element={<SeasonPage />} />
          <Route path="/players" element={<PlayersListPage />} />
          {authenticated && (
            <>
              <Route path="/createNews" element={<CreateNewsPage />} />
              <Route path="/editNews/:editId" element={<EditNews />} />
              <Route path="/createMatch" element={<CreateMatchTable />} />
              <Route path="/edit/:tableId" element={<EditMatchTable />} />
              <Route
                path="/players/edit/:editId"
                element={<EditPlayerPage />}
              />
              <Route path="/players/create" element={<CreatePlayerPage />} />
              <Route
                path="/updateHistory/:historyId"
                element={<UpdateHistory />}
              />
            </>
          )}
          <Route
            path="/players/playersId/:playerId"
            element={<PlayerDetails />}
          />
          <Route path="/signin" element={<SigninPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
