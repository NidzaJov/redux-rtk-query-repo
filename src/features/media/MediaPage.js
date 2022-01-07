import { useEffect, useRef } from 'react'
import video from '../../videos/video_PBozovic.mp4';
import audio from '../../audio/file_example_MP3_1MG.mp3';
import dragImage from '../../images/pexels-shotkit-5355641.jpg';
import WebWorker from './demo_worker';
import WebWorkerBuilder from './WebWorkerBuilder';

export const MediaPage = () => {
    const myVideo = useRef();
    const myAudio = useRef();
    const div1 = useRef();
    const drag1 = useRef();
    const divToCopy = useRef();
    const inDivToCopyTo = useRef();
    const clickCounter = useRef();
    const result = useRef();

    useEffect(() => {
        console.log(myAudio.current)
        myAudio.current.currentTime = 10;
        myVideo.current.currentTime = 0;
    } , [])

        
    const playPause = () => {
        if (myVideo.current.paused) 
            myVideo.current.play()
        else
            myVideo.current.pause()
    }

    const makeBig = () => {
        myVideo.current.width = 560;
    }

    const makeSmall = () => {
        myVideo.current.width = 320;
    }

    const makeNormal = () => {
        myVideo.current.width = 420;
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const drop = (ev) => {
        ev.preventDefault();
        ev.target.appendChild(drag1.current)
    }

    const duplicate = () => {
        localStorage.setItem("divToCopy", divToCopy.current.innerHTML);
        console.log(inDivToCopyTo.current);
        console.log(localStorage);
        inDivToCopyTo.current.innerHTML = (localStorage.getItem("divToCopy"));
        localStorage.clear();
    }

    const localStorageCount = () => {
        if (sessionStorage.clickCount) {
            sessionStorage.clickCount = Number(sessionStorage.clickCount) + 1
        }
            else sessionStorage.clickCount = 1
        console.log(sessionStorage.clickCount);
        clickCounter.current.innerHTML = `You clicked button  ${sessionStorage.clickCount} time(s) in this sesion`
    }

    let w;

    function startWorker() {
        console.log(window.location.href)
        if (typeof(Worker) !== "undefined") {
            if (typeof(w) == "undefined") {
                w = new WebWorkerBuilder(WebWorker);
            }
            w.onmessage = function(event) {
                result.current.innerHTML = event.data;
            };
        } else {
            result.current.innerHTML = "Sorry, your browser not support Web Workers..."
        }
    }

    function stopWorker() {
        w.terminate();
        w = undefined
    }



    return (
        <div>
            <h2>Media Page</h2>
            <div>
                <button onClick={playPause}>Play/Pause</button>
                <button onClick={makeBig}>Big</button>
                <button onClick={makeSmall}>Small</button>
                <button onClick={makeNormal}>Normal</button>
                <br></br>
                <video width="320" height="240" ref={myVideo} controls>
                    <source src={video} type="video/mp4" ></source>
                    Sorry, but we can not play video
                </video>
            </div>
            <br />
            <div>
                <audio controls muted ref={myAudio}>
                    <source src={audio}  type="audio/mpeg"></source>
                    Your browser does not support the audio element
                </audio>
            </div>
            <br />
            <div ref={divToCopy}>
                <iframe title="Sunday Shining" width="420" height="315" src="https://www.youtube.com/embed/1-ORJddr0QY" ></iframe>
                <br></br>
                <button onClick={() => duplicate()}>Duplicate</button>
            </div>
            <br />
            <div>
                <div ref={div1} onDrop={(e) =>drop(e)} onDragOver={(e) => allowDrop(e)} style={{ width: "200px", height: "100px", border: "2px solid black"}}></div>
                <br />
                <img ref={drag1} src={dragImage} alt="sometext" draggable="true" onDragStart={(e) => drag(e)} style={{ width:"80px" }}  />
            </div>
            <div ref={inDivToCopyTo}>

            </div>
            <div>
                <button onClick={() => localStorageCount()}>Click</button>
                <br />
                <span ref={clickCounter}>You clicked button  0 time(s) in this sesion</span>
            </div>
            <div>
                <p>Count numbers: <output ref={result}></output></p>
                <button onClick={() => startWorker()} >Start Worker</button>
                <button onClick={() => stopWorker()}>Stop Worker</button>
            </div>
        </div>
    )
}