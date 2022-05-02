

import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { BsTagFill, BsTagsFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { ImFire } from "react-icons/im";
import { signUp } from "../../services/user.service";
import { Link, Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../services/user.service";
import './SignUpPage.scss';

const SignUpPage = () => {
    const [apiMessage, setApiMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setApiMessage(null);
        const formResult = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            role: e.target.role.value
        }
        await signUp(formResult).then(result => {
            setApiMessage(result.data);
        });
    }

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (user) {
            return <Navigate to='/dashboard' />
        }
    }, []);

    return (
        <>
            <div className="signup-form-container">
                <div className="signup-form">
                    <div className="form-title">Sign Up</div>
                    <div className="form-description">Please fill in this form to create an account</div>

                    <hr className='divider' />

                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="input-container">
                            <BsTagFill className="form-icon" />
                            <input className="input-field" type="text" placeholder="Firstname" name="firstname" required />
                        </div>

                        <div className="input-container">
                            <BsTagsFill className="form-icon" />
                            <input className="input-field" type="text" placeholder="Lastname" name="lastname" required />
                        </div>

                        <div className="input-container">
                            <FaUser className="form-icon" />
                            <input className="input-field" type="text" placeholder="Username" name="username" required />
                        </div>

                        <div className="input-container">
                            <SiMinutemailer className="form-icon" />
                            <input className="input-field" type="email" placeholder="Email Address" name="email" required />
                        </div>

                        <div className="input-container">
                            <RiLockPasswordFill className="form-icon" />
                            <input className="input-field" type="password" placeholder="Password" name="password" required />
                        </div>

                        <div className="input-container">
                            <ImFire className="form-icon" />
                            <select className="input-field" defaultValue={'buyer'} name="role">
                                <option value={'buyer'}>Buyer</option>
                                <option value={'seller'}>Seller</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <input className="input-field btn btn-primary" type="submit" value="Sign Up"/>
                        </div>

                        <div className="login-link-container">
                            <Link className="login-link" to={'/login'}>I already have an account | Login</Link>
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

export default SignUpPage;