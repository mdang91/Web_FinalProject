import { useEffect, useState } from 'react';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { getHomeListByUsername } from '../../../services/home.service';
import { getRangomImage } from '../../../shared/constant/image-getter';
import { HiPlus } from 'react-icons/hi';
import './SellerDashboardPage.scss';

const SellerDashboardPage = () => {
    const [homeListData, setHomeListData] = useState([]);

    const onRegisterHandler = () => {
        document.location.assign('/home/register');
    };

    const onCardClickHandler = ((homeId) => {
        document.location.assign(`/home/detail?homeId=${homeId}`);
    });

    useEffect(() => {
        const username = JSON.parse(getUserFromLocalStorage()).username;
        const fetchHomeListData = async () => {
            const dataResponse = await getHomeListByUsername(username);
            setHomeListData(dataResponse.data.home);
        }
        fetchHomeListData();
    }, []);
    return (
        <>
            <h1 className='page-title'>Seller Dashboard</h1>
            <div className='seller-dashboard-container'>
                {homeListData.map((data) => (
                    <div className='home-card' onClick={() => onCardClickHandler(data.id)}>
                        <div className='card-img-container'>
                            <img alt='home-img' className='card-img' src={getRangomImage()} />
                        </div>
                        <div className='card-info-container'>
                            <div className='card-info-row'>
                                <div className='card-info-title'>{data.location}</div>
                                <div className='card-info-price'>${data.value}</div>
                            </div>
                            <div className='card-info-row'>
                                <div className='card-info-text'>{data.floorPlan} ㎡</div>
                                <div className='card-info-text'>{data.bedroomNo} Bedroom{data.bedroomNo > 1 ? 's' : ''}</div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className='register-card' onClick={() => onRegisterHandler()}>
                    <HiPlus className='register-icon' />
                </div>
            </div>
        </>
    );
};

export default SellerDashboardPage;