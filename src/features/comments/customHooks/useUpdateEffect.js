import { useEffect, useRef } from "react";

export const useUpdateEffect = (callback, dependancies) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if(firstRenderRef.current) {
            console.log(firstRenderRef.current)
            firstRenderRef.current = false;
            return
        }

        return callback();
    }, [dependancies, callback])
}