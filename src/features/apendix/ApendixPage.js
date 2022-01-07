import { useEffect, useRef, useState } from "react";
import { useGetUsersQuery } from "../api/apiSlice";
import { UserPosts } from "./UserPosts";
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

    

    return (
        <div className={styles.apendix_div}>
            <h2>User</h2>
            {isFetching ? <div>Users fetching</div> :
            <div className={styles.user_div}>
                <label htmlFor="users">Select user:</label>
                <select className={styles.user_select} name="users" id="users" ref={userSelection} onChange={() => setSelectedUserId(userSelection.current.value)} >
                    {data.ids.map(id => <option key={id} value={id}>{data.entities[id].name}</option>)}
                </select>
                <h3>Posts:</h3>
                {
                    selectedUserId? < UserPosts userId={selectedUserId}/> : <div>Posts loading...</div>
                }
                
            </div>
            }
        </div>
    )
}