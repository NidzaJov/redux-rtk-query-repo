import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPhotoQuery } from '../../api/apiSlice';
import Canvas from '../components/Canvas';
import ImageCanvas from '../components/ImageCanvas';
import { ImageSlider } from '../components/ImageSlider';
import { CircularProgress, Box, Snackbar } from '@mui/material';
import { useActiveButtonEffect } from '../../../customHooks/useActiveButtonEffect'

import  styles  from './SinglePicturePage.module.css'

export const SinglePicturePage = () => {
    useActiveButtonEffect('users')
    
    const { pictureId } = useParams();
    const {data, isFetching, isSuccess, isError, error } = useGetPhotoQuery(pictureId);
    const [photosIds, setPhotosIds] = useState([]);

    const draw = context => {
        context.fillStyle = '#ff6347'
        context.fillRect(0, 0, 150, 75);
        context.fileStyle = 'rgb(0, 0, 0)';
        context.moveTo(0, 0);
        context.lineTo(150, 75);
        context.stroke();
        context.beginPath();
        context.arc(75, 37, 20, 0, 2 * Math.PI);
        context.stroke();
    }

    const draw1 = context => {
        const gradient = context.createLinearGradient(0, 0, 200, 0);
        gradient.addColorStop(0, "green");
        gradient.addColorStop(1, "yellow");
        context.fillStyle = gradient;
        context.fillRect(20, 20, 200, 100);
        const radialGradient = context.createRadialGradient(75, 50, 5, 90, 60, 100);
        radialGradient.addColorStop(0, "blue");
        radialGradient.addColorStop(1, "violet");
        context.fillStyle = radialGradient;
        context.fillRect(230, 20, 150, 75);
    }

    const draw2 = context => {
        context.font = "30px Arial";
        context.fillText("Some Text", 30, 40);
        context.font = "30px Comic Sans MS";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("Are you looking at me?", 300, 75);
        
    }

    const draw3 = (context, image, patImage) => {
        context.drawImage(image, 0, 0);
        const gradient = context.createLinearGradient(0, 0, 640, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1", "red");
        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.strokeRect(0, 0, 800, 500);
        context.font = " 30px Verdana";
        context.strokeText("Big Smile!", 240, 240);
        var pat = context.createPattern(patImage, "repeat");
        context.rect(150, 270, 450, 150);
        context.fillStyle = pat;
        context.fill();
    }

    // get id of next picture or if current pisture is last (index is length-1), get id of first picture in that album
    const getNextId = (pictureId) => {
        if (photosIds) {
                const index = photosIds.indexOf(Number(pictureId))
            if (index === photosIds.length - 1) {
                return photosIds[0]
            } else {
                return photosIds[index + 1]
            }
        }
        
    }
    // get id of previous picture or if current pisture is first (index is 0), get id of last picture in that album
    const getPreviousId = (pictureId) => {
        if (photosIds) {
            const index = photosIds.indexOf(Number(pictureId))
            if (index === 0) {
                return photosIds[photosIds.length - 1]
            } else {
                return photosIds[index -1]
            }
        }
    }

    if (isFetching) {
        return <div>
                <Box sx={{ display: "flex"}}>
                    <CircularProgress />
                </Box>
            </div>
    } else if (isSuccess) {
        return (
            <div className={styles.image_container}>
            <div className={styles.numbertext}>{photosIds.indexOf(Number(pictureId)) + 1}/{photosIds.length}</div>
            <img src={data.entities[pictureId].url} alt="solo-entity" className={styles.picture}></img>
            <Link className={styles.prev} to={`/photos/${getPreviousId(pictureId)}`}>&#10094;</Link>
            <Link className={styles.next} to={`/photos/${getNextId(pictureId)}`}>&#10095;</Link>
            <div className={styles.caption_container}>
                <p id="caption">{data.entities[pictureId].title}</p>
            </div>
            <ImageSlider passPhotosIds={setPhotosIds} albumId={data.entities[pictureId].albumId} pictureId={pictureId}></ImageSlider>
            <div>
                <Canvas draw={draw} height={150} width={600}/>
                <Canvas draw={draw1} height={150} width={600} />
                <Canvas draw={draw2} height={150} width={600} />
                <ImageCanvas draw={draw3} height={426} width={640} />
            </div>
          </div>
        )
    } else if (isError) {
        return (
        <div>
            <Snackbar message={error.toString() } />
        </div>
        )
    }
}