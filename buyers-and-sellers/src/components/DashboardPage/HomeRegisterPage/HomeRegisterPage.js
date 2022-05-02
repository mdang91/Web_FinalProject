import { useState } from "react";
import { getUserFromLocalStorage } from "../../../services/user.service";
import { registerHome } from "../../../services/home.service";
import "./HomeRegisterPage.scss";

const HomeRegisterPage = () => {
    const [apiMessage, setApiMessage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setApiMessage(null);
        const user = JSON.parse(getUserFromLocalStorage());
        const formResult = {
            username: user.username,
            location: e.target.location.value,
            age: e.target.age.value,
            floorPlan: e.target.floorPlan.value,
            bedroomNo: e.target.bedroomNo.value,
            additionalFacilities: e.target.additionalFacilities.value,
            haveGarden: e.target.haveGarden.checked,
            haveParking: e.target.haveParking.checked,
            proximityFacilities: e.target.proximityFacilities.value,
            proximityMainroad: e.target.proximityMainroad.checked,
            value: e.target.value.value
        }
        
        await registerHome(formResult).then(result => {
            setApiMessage(result.data);
        })
    }
    return (
        <>
            <div className="register-form-container">
                <div className="register-form">
                    <div className="form-title">Home Register</div>
                    <hr className="divider" />

                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="input-container">
                            <label className="input-label">Location:</label>
                            <input className="input-field" type="text" placeholder="Location" name="location" required />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Age:</label>
                            <input className="input-field" type="number" placeholder="Age" name="age" required />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Floor plan:</label>
                            <input className="input-field" type="number" placeholder="Floor Plan" name="floorPlan" required />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Number of Bedroom:</label>
                            <input className="input-field" type="number" placeholder="Number of Bedroom" name="bedroomNo" required />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Additional Facilities:</label>
                            <textarea className="input-field" placeholder="Additional Facilities" name="additionalFacilities" required />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Have Garden:</label>
                            <input className="input-field" type="checkbox" name="haveGarden" />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Have Parking:</label>
                            <input className="input-field" type="checkbox" name="haveParking" />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Proximity Facilities:</label>
                            <textarea className="input-field" placeholder="Proximity Facilities" name="proximityFacilities" required />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Proximity Mainroad:</label>
                            <input className="input-field" type="checkbox" name="proximityMainroad" />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Value:</label>
                            <input className="input-field" type="number" placeholder="Value" name="value" required />
                        </div>

                        <div className="input-container">
                            <input className="input-field btn btn-primary" type="submit" value="Register" />
                        </div>

                        {apiMessage && (
                            <div className={`result-message ${apiMessage.isSuccess === true ? "success" : "error"}`}>{apiMessage.message}</div>
                        )}

                    </form>
                </div>
            </div>
        </>
    );
}

export default HomeRegisterPage;