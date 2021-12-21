import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserQuery, useEditUserMutation } from '../api/apiSlice';


export const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();  

    const { data, isFetching } = useGetUserQuery(userId);

    const EditUserForm = ({ user }) => {
        const [ name, setName ] = useState(user.name?? '');
        const [userName, setUserName] = useState(user.username?? '');
        const [email, setEmail] = useState(user.email?? '');
        const [street, setStreet] = useState(user.address.street?? '');
        const [suite, setSuite] = useState(user.address.suite?? '');
        const [city, setCity] = useState(user.address.city?? '');
        const [zipCode, setZipCode] = useState(user.address.zipcode?? '');
        const [phone, setPhone] = useState(user.phone?? '');
        const [website, setWebsite] = useState(user.website?? '');
        const [companyName, setCompanyName] = useState(user.company.name?? '');
        const [catchPhrase, setCatchPhrase] = useState(user.company.catchPhrase?? '');
        const [bs, setBs] = useState(user.company.bs?? '');            

        const [ updateUser, { isLoading: isItLoading }] = useEditUserMutation();
        const onSaveUserClicked = async () => {
            if (name && userName && email) {
                await updateUser({
                    id: userId,
                    name: name,
                    userName: userName,
                    email: email,
                    address: {
                        street: street,
                        suite: suite,
                        city: city,
                        zipcode: zipCode
                    },
                    phone: phone,
                    website: website,
                    company: {
                        name: companyName,
                        catchPhrase: catchPhrase,
                        bs: bs
                    }
                });
                navigate(`/users/${userId}`)
            }
        }  

        return (<section>
            <h3>Edit user:</h3>
            <form className="add-user-form">
                <label htmlFor="name">
                    Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="userName">
                UserName: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </label>
                <label htmlFor="email">
                E-mail: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <h4>Adress:</h4>
                <label htmlFor="street">
                Street: <input type="text" value={street} onChange={(e) => setStreet(e.target.value)}/>
                </label>
                <label htmlFor="suite">
                Suite: <input type="text" value={suite} onChange={(e) => setSuite(e.target.value)}/>
                </label>
                <label htmlFor="city">
                City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                </label>
                <label htmlFor="zipcode">
                Zip code: <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                </label>
                <label htmlFor="phone">
                Phone: <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </label>
                <label htmlFor="website">
                Website: <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                </label>
                <h4>Company:</h4>
                <label htmlFor="companyName">
                Company name: <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                </label>
                <label htmlFor="catchPhrase">
                Company catch-phrase: <textarea value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)}/>
                </label>
                <label htmlFor="bs">
                Bs: <input type="text" value={bs} onChange={(e) => setBs(e.target.value)}/>
                </label>

                <div>
                    <button type="button" onClick={onSaveUserClicked} disabled={isItLoading}>Save user</button>
                </div>
            </form>
        </section>
        )
    }
        
    if (isFetching) {
        return <div>Loading...</div>
    }
    else {
        const userToEdit = data.entities[userId];
        return <EditUserForm user={userToEdit}></EditUserForm>
    }
   
}