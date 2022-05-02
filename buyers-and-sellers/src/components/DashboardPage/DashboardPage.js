import { useEffect, useState } from 'react';
import { clearAuthInSessionStorage, getUserFromLocalStorage } from '../../services/user.service';
import SellerDashboardPage from './SellerDashboardPage/SellerDashboardPage';
import BuyerDashboardPage from './BuyerDashboardPage/BuyerDashboardPage';
import AdminDashboardPage from './AdminDashboardPage/AdminDashboardPage';

const DashboardPage = () => {
    const [correspondDashboardPage, setCorrespondDashboardPage] = useState(null);
    useEffect(() => {
        const user = JSON.parse(getUserFromLocalStorage());
        const userRole = user.role;
        assignToCorrespondDashboard(userRole);
    }, []);

    const assignToCorrespondDashboard = (userRole) => {
        switch (userRole) {
            case 'buyer':
                setCorrespondDashboardPage(<BuyerDashboardPage />);
                break;
            case 'seller':
                setCorrespondDashboardPage(<SellerDashboardPage />)
                break;
            case 'admin':
                setCorrespondDashboardPage(<AdminDashboardPage />)
                break;
            default:
                clearAuthInSessionStorage();
                window.location.assign('/login');
        }
    }

    return (
        <>
            {correspondDashboardPage}
            
        </>
    );
};

export default DashboardPage;