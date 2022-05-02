import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AmexImg, MastercardImg, VisaImg } from '../../shared/constant/image-getter';
import { deleteHome } from '../../services/home.service';
import './PaymentPage.scss';

const PaymentPage = () => {
    const [searchParams] = useSearchParams();
    const homeId = searchParams.get('homeId');

    const amexPattern = /^(?:3[47][0-9]{13})$/;
    const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastPattern = /^(?:5[1-5][0-9]{14})$/;

    const [isAmex, setIsAmex] = useState(false);
    const [isVisa, setIsVisa] = useState(false);
    const [isMastercard, setIsMastercard] = useState(false);

    const validateCardNumber = (cardValue) => {
        setIsAmex(amexPattern.test(cardValue) === true);
        setIsVisa(visaPattern.test(cardValue) === true);
        setIsMastercard(mastPattern.test(cardValue) === true);
    }

    const validateInputNumberOnly = (value) => {
        return value.replace(/[^\d]/,'');
    }

    const onCVVChange = (e) => {
        e.target.value = validateInputNumberOnly(e.target.value);
    }

    const onCardNumberChange = (e) => {
        e.target.value = validateInputNumberOnly(e.target.value);
        validateCardNumber(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const dataResponse = await deleteHome(homeId);
        if (dataResponse.data.isSuccess) {
            window.alert("Buy Successfully!");
            window.location.assign('/dashboard');
        } else {
            window.alert(dataResponse.data.message);
        }
    }

    return (
        <>
            <div className='credit-form-container'>
                <div className="heading">
                    <h1>Confirm Purchase</h1>
                </div>
                <div className='payment'>
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className='form-group customer'>
                            <label for="customer">Customer</label>
                            <input type="text" className="form-control" id="Customer" required />
                        </div>
                        <div className='form-group cvv'>
                            <label for="cvv">CVV</label>
                            <input type="text" className="form-control" id="cvv" maxlength="3" required onChange={(e) => onCVVChange(e)} />
                        </div>
                        <div className='form-group card-number'>
                            <label for="cardNumber">Card Number</label>
                            <input type="text" className="form-control" id="cardNumber" maxlength="16" required onChange={(e) => onCardNumberChange(e)} />
                        </div>
                        <div className='form-group expiration-date' id="expiration-date">
                            <label>Expiration Date</label>
                            <select>
                                <option value="01">January</option>
                                <option value="02">February </option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select>
                                <option value="23"> 2023</option>
                                <option value="24"> 2024</option>
                                <option value="25"> 2025</option>
                                <option value="26"> 2026</option>
                                <option value="27"> 2027</option>
                                <option value="28"> 2028</option>
                                <option value="29"> 2029</option>
                                <option value="30"> 2030</option>
                            </select>
                        </div>
                        <div className='form-group credit-cards' id="credit_cards">
                            <img className={`${!isAmex && (isVisa || isMastercard) ? 'transparent' : ''}`} alt='credit-card' src={AmexImg} id="amex" />
                            <img className={`${!isVisa && (isAmex || isMastercard) ? 'transparent' : ''}`} alt='credit-card' src={VisaImg} id="visa" />
                            <img className={`${!isMastercard && (isVisa || isAmex) ? 'transparent' : ''}`} alt='credit-card' src={MastercardImg} id="mastercard" />
                        </div>

                        <div class="form-group pay-now" id="pay-now">
                            <button type="submit" class="btn btn-primary" id="confirm-purchase">Confirm</button>
                        </div>
                    </form>

                    <h3>Test Credit Card numbers</h3>
                    <table className="ddata">
                        <header>
                            <tr>
                                <th scope="col">Amex</th>
                                <th scope="col">Visa</th>
                                <th scope="col">Mastercard</th>
                            </tr>
                        </header>
                        <tbody>
                            <tr>
                                <td> 344511112046512</td>
                                <td> 4188415419331299</td>
                                <td> 5121297817475606</td>
                            </tr>
                            <tr>
                                <td> 349208437315764</td>
                                <td> 4185126935301111</td>
                                <td> 5136028068398137</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;