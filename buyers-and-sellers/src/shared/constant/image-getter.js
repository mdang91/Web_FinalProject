import LogoBrand from '../img/logo-brand.png';
import HomeIntroduction from '../img/home-introduction.png';
import House01 from '../img/house-01.png';
import House02 from '../img/house-02.png';
import House03 from '../img/house-03.png';
import House04 from '../img/house-04.png';
import House05 from '../img/house-05.png';
import House06 from '../img/house-06.png';
import Amex from '../img/amex.jpg';
import Mastercard from '../img/mastercard.jpg';
import Visa from '../img/visa.jpg';

export const LogoBrandImg = LogoBrand;
export const HomeIntroductionImg = HomeIntroduction;
export const House01Img = House01;
export const House02Img = House02;
export const House03Img = House03;
export const House04Img = House04;
export const House05Img = House05;
export const House06Img = House06;
export const AmexImg = Amex;
export const MastercardImg = Mastercard;
export const VisaImg = Visa;

export const getRangomImage = () => {
    const max = 6;
    const min = 1;
    const randomNumber = Math.floor(Math.random() * (max - min) + min) + 1;

    switch (randomNumber) {
        case 1:
            return House01Img;
        case 2:
            return House02Img;
        case 3:
            return House03Img;
        case 4:
            return House04Img;
        case 5:
            return House05Img;
        case 6:
            return House06Img;
        default:
            return House01Img;
    }
}
