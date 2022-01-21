import { useEffect, useRef, useState } from "react";
import { useGetUsersQuery } from "../api/apiSlice";
import { UserPosts } from "./UserPosts";
import classnames from "classnames/bind";
import styles from "./ApendixPage.module.css";

export const ApendixPage = () => {
    const { data, isFetching } = useGetUsersQuery();
    const userSelection = useRef();
    const [selectedUserId, setSelectedUserId] = useState();
    
    useEffect(() => {
        if (!isFetching) {
            userSelection.current.querySelectorAll('option')[0].setAttribute('selected', '');
            setSelectedUserId(userSelection.current.value);
        }
    },[isFetching])

    let cx = classnames.bind(styles);
    const stickyDiv = useRef();
    document.body.onscroll = () => {
        console.log('Scroling');
        console.log(stickyDiv.current);
        console.log(stickyDiv.current.className)
        console.log(window.scrollY);
        console.log(stickyDiv.current.offsetTop)
        console.log(stickyDiv.current.offsetParent)
         if (window.scrollY >= stickyDiv.current.offsetTop) {
            stickyDiv.current.className = cx({ [styles.sticky]: true})    
        } else {
            stickyDiv.current.className = cx({[styles.sticky]: false})
        }
        console.log(stickyDiv.className)
    }

    return (
        <div className={styles.apendix_div}>
            <h2>User</h2>
            {isFetching ? <div>Users fetching...</div> :
            <div className={styles.user_div} >
                <div ref={stickyDiv}>
                    <label htmlFor="users">Select user:</label>
                    <select className={styles.user_select} 
                        ref={userSelection}
                        name="users" 
                        id="users" 
                        onChange={() => setSelectedUserId(userSelection.current.value)} >
                        {data.ids.map(id => <option key={id} value={id}>{data.entities[id].name}</option>)}
                    </select>
                    <h3>Posts:</h3>
                </div>
                
                {
                    selectedUserId? < UserPosts userId={selectedUserId}/> : <div>Posts loading...</div>
                }
                
            </div>
            }
        </div>
    )
}