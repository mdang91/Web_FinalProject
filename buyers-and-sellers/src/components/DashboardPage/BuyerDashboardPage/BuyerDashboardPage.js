import { useEffect, useState } from 'react';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { getHomeListByUsername } from '../../../services/home.service';
import { getRangomImage } from '../../../shared/constant/image-getter';
import { BsCart, BsCartXFill } from 'react-icons/bs';
import './BuyerDashboardPage.scss';

const BuyerDashboardPage = () => {
    const [homeListData, setHomeListData] = useState([]);

    const onCardClickHandler = ((homeId) => {
        document.location.assign(`/home/detail?homeId=${homeId}`);
    });

    const onViewWishlistHandler = () => {
        document.location.assign('/home/wishlist');
    }
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
            <h1 className='page-title'>Buyer Dashboard</h1>
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
                                <div className='card-info-text'>{data.floorPlan} sqft</div>
                                <div className='card-info-text'>{data.bedroomNo} Bedroom{data.bedroomNo > 1 ? 's' : ''}</div>
                            </div>
                            <div className='card-info-row'>
                                <div className='card-info-text'>By {data.seller}</div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className='wishlist-card' onClick={() => onViewWishlistHandler()}>
                    <BsCart className='wishlist-icon' />
                </div>
            </div>
        </>
    );
};

export default BuyerDashboardPage;