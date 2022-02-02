import { useGetUsersQuery, useAddNewUserMutation } from "../../api/apiSlice";
import { useState, useRef  } from "react";
import styles from './AddNewUserForm.module.css';


export const AddNewUserForm = ({ displayed, setDisplayed, setRightSided }) => {

    const [ name, setName ] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [bs, setBs] = useState('');

    const [ addNewUser, { isLoading } ] = useAddNewUserMutation();
    const canSave = [name, userName, email] && !isLoading;
    const { data: users = [] } = useGetUsersQuery();
    const usersCount = users.length;

    const onSaveUserClicked = async () => {
        if (canSave) {
            try{
                await addNewUser({id: usersCount + 1, name, userName, email, street:'', suite:'', city:'', zipCode:'', phone:'', website:'',
                companyName:'', catchPhrase:'', bs:''});
                setName('');
                setUserName('');
                setEmail('');
                setStreet('');
                setSuite('');
                setCity('');
                setZipCode('');
                setPhone('');
                setWebsite('')
                setCompanyName('');
                setCatchPhrase('');
                setBs('');
            } catch (e) {
                console.error('Failed to save user', e)
            }
        }
    }

    const addUserElement = useRef();
    if (addUserElement.current) {
        if (displayed) {
            addUserElement.current.className = styles.add_user_section_visible;
        } 
    }

    const closeAddUser = () => {
        addUserElement.current.className = styles.add_user_section;
        setDisplayed(false);
        setRightSided(false);
    }
    

    return (
        <section ref={addUserElement} className={styles.add_user_section}>
            <button onClick={closeAddUser} className={styles.closebtn}>&times;</button>
            <h3>Add new user:</h3>
            <form className={styles.add_user_form}>
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
                    <button type="button" onClick={onSaveUserClicked} disabled={!canSave}>Save user</button>
                </div>
            </form>
        </section>
    )
}

