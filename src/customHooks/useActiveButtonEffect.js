import { useContext, useEffect } from "react";
import { ActiveButtonContext } from "../views/MainLayout";

export const useActiveButtonEffect = (viewName) => {
    const setActiveButton = useContext(ActiveButtonContext);
    useEffect(() => {
        setActiveButton(viewName);
    }, [setActiveButton, viewName])
}

