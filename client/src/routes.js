import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Platform from "./pages/Platform";
import TournamentPage from "./pages/TrntPage";
import Profile from "./pages/Profile"
import ProfilePage from "./pages/ProfilePage";
import { ADMIN_ROUTE, LOGIN_ROUTE, PLATFORM_ROUTE, REGISTRATION_ROUTE, TOURNAMENT_ROUTE, PROFILE_ROUTE } from "./utils/consts";


export const authRoute = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoute = [
    {
        path: PLATFORM_ROUTE,
        Component: Platform
    },
    {
        path: TOURNAMENT_ROUTE + '/:id',
        Component: TournamentPage
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: PROFILE_ROUTE + '/:id',
        Component: ProfilePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]