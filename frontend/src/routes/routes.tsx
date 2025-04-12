import MainPage from "../features/mainPage/MainPage";
import MapPage from "../features/map/MapPage";
import FirstMockPage from "../features/pages/mock/FirstMockPage";
import { RouterType } from "../types/routersTypes";

export const routes: RouterType[] = [
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '/map',
        element: <MapPage/>
    },
]