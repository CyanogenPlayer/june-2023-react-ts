import React, {useState} from 'react';
import {Cars} from "../components/CarsContainer/Cars";
import {CarForm} from "../components/CarsContainer/CarForm";
import {ICar} from "../interfaces/carInterface";
import {Outlet} from "react-router-dom";

const CarsPage = () => {
    const [flag, setFlag] = useState<boolean>(null);
    const [carForUpdate, setCarForUpdate] = useState<ICar>(null);

    const trigger = () => {
        setFlag(prevState => !prevState)
    }

    return (
        <div>
            <CarForm trigger={trigger} carForUpdate={carForUpdate} setCarForUpdate={setCarForUpdate}/>
            <hr/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Cars flag={flag} trigger={trigger} setCarForUpdate={setCarForUpdate}/>
                <Outlet/>
            </div>
        </div>
    );
};

export default CarsPage;