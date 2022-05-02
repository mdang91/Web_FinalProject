import { HomeIntroductionImg, House01Img, House02Img, House03Img, House04Img } from "../../shared/constant/image-getter";
import { BsSignpostFill } from "react-icons/bs";
import { ImHome2 } from "react-icons/im";
import { RiBuildingFill } from "react-icons/ri";
import './HomePage.scss';

const HomePage = () => {
    return (
        <>
            <div className='banner-introduction-container'>
                <div className="left-container">
                    <img className='banner-intro-img' alt='intro-img' src={HomeIntroductionImg} />
                </div>
                <div className='right-container'>
                    <div className="banner-intro-title">Find your Residence Home</div>
                    <div className="banner-intro-description">Let us help you inspire your dream house</div>
                </div>
            </div>

            <div className="company-introduction-container">
                <div className="company-intro-title">Who are we?</div>
                <div className="company-intro-description">Nearly 41% of people who visited Zillow and/or Trulia in the past 12 months are planning to buy and/or sell a home in the next 12 months. So we are here to choose the best home for you and family.</div>
                <img className="company-intro-img" alt="company-intro-img" src={House01Img} />
            </div>

            <div className="service-container">
                <div className="service-header">Our Services</div>
                <div className="service-card-container">
                    <div className="service-card">
                        <div className="service-img-container">
                            <img className="service-img" alt="service-img" src={House02Img} />
                            <div className="service-title">Buy a House</div>
                            <div className="service-description">Over 1 million+ homes for sale available on the website, we can match you with a house you will want to call home.</div>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="service-img-container">
                            <img className="service-img" alt="service-img" src={House03Img} />
                            <div className="service-title">Sell a House</div>
                            <div className="service-description">Over 1 million+ slots for sale available on the website, we can match you with a place you will want to sell home.</div>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="service-img-container">
                            <img className="service-img" alt="service-img" src={House04Img} />
                            <div className="service-title">Rent a House</div>
                            <div className="service-description">Over 1 million+ homes for rent available on the website, we can match you with a house you will want to call home.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="why-choose-container">
                <div className="why-choose-header">Why Choose Us?</div>
                <div className="reason-container">
                    <div className="reason-card">
                        <BsSignpostFill className="reason-icon" />
                        <div className="reason-title">41% to buy or sell</div>
                        <div className="reason-description">Nearly 41% of people who visited Zillow and/or Trulia in the past 12 months are planning to buy and/or sell a home in the next 12 months.</div>
                    </div>
                    <div className="reason-card">
                        <ImHome2 className="reason-icon" />
                        <div className="reason-title">194 million</div>
                        <div className="reason-description">More than 194 million average monthly unique users visited Zillow Group brands’ mobile apps and websites in Q2 2019.</div>
                    </div>
                    <div className="reason-card">
                        <RiBuildingFill className="reason-icon" />
                        <div className="reason-title">Most visited rental network</div>
                        <div className="reason-description">Dream Land is the most visited rental network.</div>
                    </div>
                </div>
            </div>

            <div className="join-us-container">
                <div className="join-us-title">Join us now for more details !!!</div>
                <button className="btn btn-secondary join-btn">Join now</button>
            </div>
        </>
    );
};

export default HomePage;