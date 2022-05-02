import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { updateHome, getHomeById } from "../../../services/home.service";
import "./HomeEditPage.scss";

const HomeEditPage = () => {
    const [apiMessage, setApiMessage] = useState(null);

    const [location, setLocation] = useState('');
    const [age, setAge] = useState(0);
    const [floorPlan, setFloorPlan] = useState(0);
    const [bedroomNo, setBedroomNo] = useState(0);
    const [additionalFacilities, setAdditionalFacilities] = useState('');
    const [haveGarden, setHaveGarden] = useState(false);
    const [haveParking, setHaveParking] = useState(false);
    const [proximityFacilities, setProximityFacilities] = useState('');
    const [proximityMainroad, setProximityMainroad] = useState(false);
    const [value, setValue] = useState(0);
    
    const [searchParams] = useSearchParams();
    const homeId = searchParams.get('homeId');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setApiMessage(null);
        const formResult = {
            homeId: homeId,
            location: e.target.location.value,
            age: e.target.age.value,
            floorPlan: e.target.floorPlan.value,
            bedroomNo: e.target.bedroomNo.value,
            additionalFacilities: e.target.additionalFacilities.value,
            haveGarden: e.target.haveGarden.checked,
            haveParking: e.target.haveParking.checked,
            proximityFacilities: e.target.proximityFacilities.value,
            proximityMainroad: e.target.proximityMainroad.checked,
            value: e.target.value.value,
            tax: value * 0.07
        }
        
        await updateHome(formResult).then(result => {
            setApiMessage(result.data);
        })
    }

    const fillInForm = (data) => {
        setLocation(data.location);
        setAge(data.age);
        setFloorPlan(data.floorPlan);
        setBedroomNo(data.bedroomNo);
        setAdditionalFacilities(data.additionalFacilities);
        setHaveGarden(data.haveGarden);
        setHaveParking(data.haveParking);
        setProximityFacilities(data.proximityFacilities);
        setProximityMainroad(data.proximityMainroad);
        setValue(data.value);
    }

    useEffect(() => {
        const fetchHomeDetailData = async () => {
            const dataResponse = await getHomeById(homeId);
            fillInForm(dataResponse.data.home);
        }
        fetchHomeDetailData();
    }, [homeId]);
    return (
        <>
            <div className="register-form-container">
                <div className="register-form">
                    <div className="form-title">Home Edit</div>
                    <hr className="divider" />

                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="input-container">
                            <label className="input-label">Location:</label>
                            <input className="input-field" type="text" placeholder="Location" name="location" value={location} required onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Age:</label>
                            <input className="input-field" type="number" placeholder="Age" name="age" value={age} required  onChange={(e) => setAge(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Floor plan:</label>
                            <input className="input-field" type="number" placeholder="Floor Plan" name="floorPlan" value={floorPlan} required onChange={(e) => setFloorPlan(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Number of Bedroom:</label>
                            <input className="input-field" type="number" placeholder="Number of Bedroom" name="bedroomNo" value={bedroomNo} required onChange={(e) => setBedroomNo(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Additional Facilities:</label>
                            <textarea className="input-field" placeholder="Additional Facilities" name="additionalFacilities" value={additionalFacilities} required onChange={(e) => setAdditionalFacilities(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Have Garden:</label>
                            <input className="input-field" type="checkbox" name="haveGarden" checked={haveGarden} onChange={(e) => setHaveGarden(e.target.checked)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Have Parking:</label>
                            <input className="input-field" type="checkbox" name="haveParking" checked={haveParking} onChange={(e) => setHaveParking(e.target.checked)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Proximity Facilities:</label>
                            <textarea className="input-field" placeholder="Proximity Facilities" name="proximityFacilities" value={proximityFacilities} required onChange={(e) => setProximityFacilities(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Proximity Mainroad:</label>
                            <input className="input-field" type="checkbox" name="proximityMainroad" checked={proximityMainroad} onChange={(e) => setProximityMainroad(e.target.checked)} />
                        </div>

                        <div className="input-container">
                            <label className="input-label">Value:</label>
                            <input className="input-field" type="number" placeholder="Value" name="value" value={value} required onChange={(e) => setValue(e.target.value)} />
                        </div>

                        <div className="input-container">
                            <input className="input-field btn btn-primary" type="submit" value="Update" />
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

export default HomeEditPage;