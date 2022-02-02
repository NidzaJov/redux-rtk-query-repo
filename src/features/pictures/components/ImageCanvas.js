import { useRef, useEffect } from "react";
import photo from '../../../images/adelin-grigorescu-QfW03LEVtLU-unsplash.jpg';
import rLogo from '../../../images/logo192.png'

const ImageCanvas = ( {draw, height, width} ) => {
    const canvas = useRef();
    const image = useRef();
    const reactLogo = useRef();

    useEffect(() => {
        const context = canvas.current.getContext('2d');
        image.current.onload = () => {
            draw(context, image.current, reactLogo.current)
        }
    }, [draw])           
    
    return (
        <>
            <canvas 
                ref={canvas}
                width={width}
                height={height}/>
            <img src={photo} alt="canvasImage" ref={image} style={{display: 'none', width: 640, height: 426}}></img>
            <img src={rLogo} alt='logoImage' ref={reactLogo} style={{display: 'none', width: 10}} />
        </>
        
    )
}

export default ImageCanvas;