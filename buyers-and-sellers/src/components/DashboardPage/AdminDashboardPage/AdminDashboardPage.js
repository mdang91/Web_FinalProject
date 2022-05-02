import { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser } from '../../../services/user.service';
import { FaPencilAlt } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import './AdminDashboardPage.scss';

const AdminDashboardPage = () => {
    const [userDataList, setUserDataList] = useState([]);

    const onEditClickHanlder = (userId) => {
        document.location.assign(`/admin/edit?userId=${userId}`);
    }

    const onDeleteClickHandler = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This action will also remove all related homes and wishlist.")) {
            const dataResponse = await deleteUser(userId);
            if (dataResponse.data.isSuccess) {
                window.alert(dataResponse.data.message)
                window.location.reload();
            } else {
                window.alert(dataResponse.data.message);
            }
        }
    }
    useEffect(() => {
        const fectAllUsers = async () => {
            const userData = await fetchAllUsers();
            setUserDataList(userData.data.user);
        }
        fectAllUsers();
    }, [])
    return (
        <>
            <h1 className='page-title'>Admin Dashboard</h1>
            {!userDataList.length && (
                <>
                    <div className='user-not-found'>No Data</div>
                </>
            )}
            <button className='btn btn-primary btn-add-user'>Add User</button>
            {userDataList.length && (
                <>
                    <div className='user-table-container'>
                        <table className='user-table'>
                            <thead className='table-head'>
                                <tr className='table-row'>
                                    <th className='table-head-cell'>ID</th>
                                    <th className='table-head-cell'>Username</th>
                                    <th className='table-head-cell'>Email</th>
                                    <th className='table-head-cell'>Firstname</th>
                                    <th className='table-head-cell'>Lastname</th>
                                    <th className='table-head-cell'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {userDataList.map((user) => (
                                    <tr className='table-row'>
                                        <td className='table-cell'>{user.id}</td>
                                        <td className='table-cell'>{user.username}</td>
                                        <td className='table-cell'>{user.email}</td>
                                        <td className='table-cell'>{user.firstname}</td>
                                        <td className='table-cell'>{user.lastname}</td>
                                        <td className='table-cell'>
                                            <button className='btn btn-secondary action-btn' onClick={() => onEditClickHanlder(user.id)}>
                                                <FaPencilAlt className='action-icon' />
                                            </button>
                                            <button className='btn btn-secondary action-btn' onClick={() => onDeleteClickHandler(user.id)}>
                                                <ImBin className='action-icon' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminDashboardPage;