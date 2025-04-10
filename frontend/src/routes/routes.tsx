import FirstMockPage from "../features/pages/mock/FirstMockPage";
import { RouterType } from "../types/routersTypes";

export const routes: RouterType[] = [
    {
        path: '/',
        element: <FirstMockPage/>
    }
]