import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { BsTagFill, BsTagsFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { ImFire } from "react-icons/im";
import { fetchUserById, updateUser } from "../../../services/user.service";
import { Link } from "react-router-dom";
import './AdminEditPage.scss';

const AdminEditPage = () => {
    const [apiMessage, setApiMessage] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isChangePassword, setIsChangePassword] = useState(false);

    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setApiMessage(null);
        const formResult = {
            userId: userId,
            username: e.target.username.value,
            password: isChangePassword ? e.target.password.value : '',
            email: e.target.email.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            role: e.target.role.value
        }
        await updateUser(formResult).then(result => {
            setApiMessage(result.data);
        });
    }

    const fillInForm = (user) => {
        setUsername(user.username);
        setEmail(user.email);
        setFirstname(user.firstname);
        setLastname(user.lastname);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userResponse = await fetchUserById(userId);
            fillInForm(userResponse.data.user);
        }

        fetchUser();
    }, []);

    return (
        <>
            <div className="edit-form-container">
                <div className="edit-form">
                    <div className="form-title">Edit User</div>

                    <hr className='divider' />

                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="input-container">
                            <BsTagFill className="form-icon" />
                            <input className="input-field" type="text" placeholder="Firstname" name="firstname" value={firstname} required onChange={(e) => setFirstname(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <BsTagsFill className="form-icon" />
                            <input className="input-field" type="text" placeholder="Lastname" name="lastname" value={lastname} required onChange={(e) => setLastname(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <FaUser className="form-icon" />
                            <input className="input-field" type="text" placeholder="Username" name="username" value={username} required onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <SiMinutemailer className="form-icon" />
                            <input className="input-field" type="email" placeholder="Email Address" name="email" value={email}  required onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <label className="form-icon">Change?</label>
                            <input className="input-field" type="checkbox" name="isChangePassword" value={isChangePassword} onChange={(e) => setIsChangePassword(e.target.checked)}/>
                        </div>

                        <div className="input-container">
                            <RiLockPasswordFill className="form-icon" />
                            <input className="input-field" type="password" placeholder="Password" name="password" value={password} disabled={!isChangePassword} required onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <ImFire className="form-icon" />
                            <select className="input-field" defaultValue={'buyer'} name="role" disabled>
                                <option value={'buyer'}>Buyer</option>
                                <option value={'seller'}>Seller</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <input className="input-field btn btn-primary" type="submit" value="Update"/>
                        </div>

                        {apiMessage && (
                            <div className={`result-message ${apiMessage.isSuccess === true ? 'success' : 'error'}`}>{apiMessage.message}</div>
                        )}

                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminEditPage;