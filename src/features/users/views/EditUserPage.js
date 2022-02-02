import {  useParams } from 'react-router-dom';
import { CircularProgress, Box, Snackbar } from '@mui/material';
import styles from "./EditUserPage.module.css";
import { EditUserForm } from '../components/EditUserForm';

import { useGetUserQuery } from '../../api/apiSlice';


export const EditUserPage = () => {
    const { userId } = useParams();
    
    const { data, isFetching, isSuccess, isError, error } = useGetUserQuery(userId);
        
    if (isFetching) {
        return <div>
            <Box sx={{ display: "flex"}}>
                        <CircularProgress />
                    </Box>
        </div>
    } else if (isSuccess) {
        const userToEdit = data.entities[userId];
        return <EditUserForm user={userToEdit} userId={userId}></EditUserForm>
    } else if (isError) {
        <div>
            <Snackbar message={error.toString()} />
        </div>
    }
   
}