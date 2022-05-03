import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHomeById } from '../../../services/home.service';
import { getRangomImage } from '../../../shared/constant/image-getter';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { deleteHome, addToWishList } from '../../../services/home.service';
import { MdPayments } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import { HiShoppingCart } from 'react-icons/hi';
import './HomeDetailPage.scss';

const HomeDetailPage = () => {
    const [homeData, setHomeData] = useState(null);
    const [userRole, setUserRole] = useState('');

    const [searchParams] = useSearchParams();
    const homeId = searchParams.get('homeId');

    const onEditBtnClickHandler = () => {
        document.location.assign(`/home/edit?homeId=${homeId}`);
    }

    const onDeleteBtnClickHandler = async () => {
        if (window.confirm("Are you sure you want to delete this home?")) {
            const dataResponse = await deleteHome(homeId);
            if (dataResponse.data.isSuccess) {
                window.alert(dataResponse.data.message)
                window.location.assign('/dashboard');
            } else {
                window.alert(dataResponse.data.message);
            }
        }
    }

    const onBuyBtnClickHandler = () => {
        document.location.assign(`/home/payment?homeId=${homeId}`);
    }

    const onAddToWishlist = async () => {
        const username = JSON.parse(getUserFromLocalStorage()).username;
        const dataResponse = await addToWishList(username, homeId);
        if (dataResponse.data.isSuccess) {
            window.alert(dataResponse.data.message)
            window.location.assign('/dashboard');
        } else {
            window.alert(dataResponse.data.message);
        }
    }

    useEffect(() => {
        const userRole = JSON.parse(getUserFromLocalStorage()).role;
        setUserRole(userRole);
        const fetchHomeDetailData = async () => {
            const dataResponse = await getHomeById(homeId);
            setHomeData(dataResponse.data.home);
        }
        fetchHomeDetailData();
    }, [homeId]);
    return (
        <>
            <div className='home-detail-container'>
                <h1 className='page-title'>Home Details</h1>
                {!homeData ? (
                    <div className='home-not-found'>No Data</div>
                ) : (
                    <>
                        <div className='home-info-container'>
                            <div className='home-info-img-container'>
                                <img alt="home-info-img" className='home-info-img' src={getRangomImage()} />
                            </div>
                            <div className='home-info-detail-container'>
                                {userRole === 'buyer' && (
                                    <div className='detail-row'>
                                        <div className='detail-label'>Posted by: &nbsp;</div>
                                        <div className='detail-value'>{homeData.seller}</div>
                                    </div>
                                )}
                                <div className='detail-row'>
                                    <div className='detail-label'>Location: &nbsp;</div>
                                    <div className='detail-value'>{homeData.location}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Age: &nbsp;</div>
                                    <div className='detail-value'>{homeData.age}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Floor Plan: &nbsp;</div>
                                    <div className='detail-value'>{homeData.floorPlan} sqft</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Number of Bedroom: &nbsp;</div>
                                    <div className='detail-value'>{homeData.bedroomNo}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Additional Facilities: &nbsp;</div>
                                    <div className='detail-value'>{homeData.additionalFacilities}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Have Garden: &nbsp;</div>
                                    <div className='detail-value'>{homeData.haveGarden ? 'Yes' : 'No'}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Have Parking: &nbsp;</div>
                                    <div className='detail-value'>{homeData.haveParking ? 'Yes' : 'No'}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Proximity Facilities: &nbsp;</div>
                                    <div className='detail-value'>{homeData.proximityFacilities}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Proximity Mainroad: &nbsp;</div>
                                    <div className='detail-value'>{homeData.proximityMainroad ? 'Yes' : 'No'}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Value: &nbsp;</div>
                                    <div className='detail-value'>${homeData.value}</div>
                                </div>
                                <div className='detail-row'>
                                    <div className='detail-label'>Tax: &nbsp;</div>
                                    <div className='detail-value'>${homeData.tax}</div>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <h1 className='section-title'>Action</h1>
                        <div className='action-btn-container'>
                            {userRole === 'buyer' && (
                                <>
                                    <button className='btn buy-btn' onClick={() => onBuyBtnClickHandler()}>
                                        <MdPayments className='icon-btn' />
                                    </button>
                                    <button className='btn cart-btn' onClick={() => onAddToWishlist()}>
                                        <HiShoppingCart className='icon-btn' />
                                    </button>
                                </>
                            )}
                            {userRole === 'seller' && (
                                <>
                                    <button className='btn edit-btn' onClick={() => onEditBtnClickHandler()}>
                                        <FaPencilAlt className='icon-btn' />
                                    </button>
                                    <button className='btn delete-btn' onClick={() => onDeleteBtnClickHandler()}>
                                        <ImBin className='icon-btn' />
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default HomeDetailPage;