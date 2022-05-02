import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { LogoBrandImg } from "../../shared/constant/image-getter";
import { clearAuthInSessionStorage, getUserFromLocalStorage } from '../../services/user.service';
import './NavBar.scss';

const NavBar = () => {
    const [user, setUser] = useState(null);

    const logoutHandler = () => {
        clearAuthInSessionStorage();
        document.location.assign('/');
    }

    useEffect(() => {
        const user = JSON.parse(getUserFromLocalStorage());
        setUser(user);
    }, []);

    return (
        <>
            <nav>
                <div className="nav-container">
                    <div className="nav-left">
                        <NavLink to="/">
                            <img className="img-logo-brand" alt="brand-logo" src={LogoBrandImg} />
                        </NavLink>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </div>
                    <div className="nav-right">
                        {!user ? (
                            <NavLink to="/login">
                                <button className="btn btn-secondary">Login</button>
                            </NavLink>
                        ) : (
                            <div className="welcome-message">Hi {`${user.firstname} ${user.lastname}`} |&nbsp;<div className="logout-option" onClick={() => logoutHandler()}>Log out</div></div>
                        )}

                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;