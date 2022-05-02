import { useEffect, useState } from 'react';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { getBuyerWishList, removeHomeFromWishlist } from '../../../services/home.service';
import { getRangomImage } from '../../../shared/constant/image-getter';
import { BsCartXFill } from 'react-icons/bs';
import './WishlistPage.scss';

const WishlistPage = () => {
    const [homeListData, setHomeListData] = useState([]);

    const onCardClickHandler = ((homeId) => {
        document.location.assign(`/home/detail?homeId=${homeId}`);
    });

    const onRemoveCartClickHandler = (async (homeId) => {
        const username = JSON.parse(getUserFromLocalStorage()).username;
        if (window.confirm("Are you sure you want to remove this home from wishlist?")) {
            const dataResponse = await removeHomeFromWishlist(username, homeId);
            if (dataResponse.data.isSuccess) {
                window.alert(dataResponse.data.message)
                window.location.reload();
            } else {
                window.alert(dataResponse.data.message);
            }
        }
    });

    useEffect(() => {
        const username = JSON.parse(getUserFromLocalStorage()).username;
        const fetchHomeListData = async () => {
            const dataResponse = await getBuyerWishList(username);
            setHomeListData(dataResponse.data.home);
        }
        fetchHomeListData();
    }, []);
    return (
        <>
            <h1 className='page-title'>Buyer Wishlist</h1>
            <div className='seller-dashboard-container'>
                {!homeListData.length && (
                    <div className='home-not-found'>No Data</div>
                )}
                {homeListData.map((data) => (
                    <div className='home-card-container'>
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
                                <div className='card-info-row'>
                                    <div className='card-info-text'>By {data.seller}</div>
                                </div>
                            </div>
                        </div>
                        <button className='btn remove-cart-btn' onClick={() => onRemoveCartClickHandler(data.id)}>
                            <BsCartXFill className='remove-cart-icon' />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WishlistPage;