import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { login, saveAuthToSessionStorage } from "../../services/user.service";
import { getUserFromLocalStorage } from "../../services/user.service";
import './LoginPage.scss';

const LoginPage = () => {
    const [apiMessage, setApiMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setApiMessage(null);
        const formResult = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        await login(formResult).then(result => {
            if (result.data.isSuccess) {
                saveAuthToSessionStorage(result.data.user);
                setApiMessage(result.data);
                window.location.assign('/dashboard');
            } else {
                setApiMessage(result.data);
            }
        });
    }

    useEffect(() => {
        const user = JSON.parse(getUserFromLocalStorage());
        if (user) {
            return <Navigate to='/dashboard' />
        }
    }, []);

    return (
        <>
            <div className="login-form-container">
                <div className="login-form">
                    <div className="form-title">Login</div>
                    <hr className='divider' />

                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="input-container">
                            <FaUser className="form-icon" />
                            <input className="input-field" type="text" placeholder="Username" name="username" required />
                        </div>

                        <div className="input-container">
                            <RiLockPasswordFill className="form-icon" />
                            <input className="input-field" type="password" placeholder="Password" name="password" required />
                        </div>

                        <div className="input-container">
                            <input className="input-field btn btn-primary" type="submit" value="Login" />
                        </div>

                        <div className="signup-link-container">
                            <Link className="signup-link" to={'/signup'}>I do not have any account | Sign up</Link>
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

export default LoginPage;