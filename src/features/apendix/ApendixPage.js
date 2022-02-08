import { useEffect, useRef, useState, useContext } from "react";
import { useGetUsersQuery } from "../api/apiSlice";
import { UserPosts } from "./UserPosts";
import { CircularProgress, Box, Snackbar } from "@mui/material";
import classnames from "classnames/bind";
import styles from "./ApendixPage.module.css";
import { ActiveButtonContext } from "../../views/MainLayout";

export const ApendixPage = () => {
    const setActiveButton = useContext(ActiveButtonContext);
    useEffect(() => {
        setActiveButton('apendix');
    }, [setActiveButton])
    const { data, isFetching, isSuccess, isError, error } = useGetUsersQuery();
    const userSelection = useRef();
    const [selectedUserId, setSelectedUserId] = useState();
    const stickyDiv = useRef();
    let cx = classnames.bind(styles);

    useEffect(() => {
        const onScroll = () => {
            console.log('Scroling');
            console.log(stickyDiv.current);
            console.log(stickyDiv.current.className)
            console.log(window.scrollY);
            console.log(stickyDiv.current.offsetTop)
            console.log('parent:',stickyDiv.current.offsetParent)
             if (window.scrollY >= stickyDiv.current.offsetTop * 0.6) {
                stickyDiv.current.className = cx({ 
                    [styles.sticky_posts_header_container]: true,
                    [styles.posts_header_container]: false
                })    
            } else {
                stickyDiv.current.className = cx({
                    [styles.sticky_posts_header_container]: false,
                    [styles.posts_header_container]: true
                })
            }
            console.log(stickyDiv.className)
        }
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [stickyDiv, cx]);
    
    useEffect(() => {
        if (!isFetching) {
            userSelection.current.querySelectorAll('option')[0].setAttribute('selected', '');
            setSelectedUserId(userSelection.current.value);
        }
    },[isFetching])

    if (isFetching) {
        return <div>
            <Box sx={{ display: "flex"}}>
                <CircularProgress />
            </Box>
        </div>
    } else if (isSuccess) {
        return (<div className={styles.user_div} >
                    <div ref={stickyDiv} className={styles.posts_header_container}>
                        <div className={styles.posts_header}>
                            <label htmlFor="users">Select user: </label>
                            <select className={styles.user_select} 
                                ref={userSelection}
                                name="users" 
                                id="users" 
                                onChange={() => setSelectedUserId(userSelection.current.value)} >
                                {data.ids.map(id => <option key={id} value={id}>{data.entities[id].name}</option>)}
                            </select>
                            <h3>Posts:</h3>
                        </div>
                    </div>
                    {
                        selectedUserId? < UserPosts userId={selectedUserId}/> 
                        : <div>
                            <Box sx={{ display: "flex"}}>
                                <CircularProgress />
                            </Box>
                        </div>
                    }
                </div>)
    } else if (isError) {
        return <div>
                <Snackbar messsage={error.toString()} />
            </div>
    }
}