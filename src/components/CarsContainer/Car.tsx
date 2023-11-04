import {FC} from 'react';
import {ICar} from "../../interfaces/carInterface";
import {ISetState} from "../../types/ISetState";
import {useNavigate} from "react-router-dom";
import {carService} from "../../services/carService";

interface IProps {
    trigger: () => void,
    car: ICar,
    setCarForUpdate: ISetState<ICar>
}

const Car: FC<IProps> = ({trigger, car, setCarForUpdate}) => {
    const {id, brand, price, year} = car;

    const navigate = useNavigate();

    const deleteCar = async (id: number) => {
        await carService.deleteById(id);
        trigger();
    }

    return (
        <div style={{border: '1px solid', margin: '5px 0'}}>
            <div>id: {id}</div>
            <div>brand: {brand}</div>
            <div>price: {price}</div>
            <div>year: {year}</div>
            <button onClick={() => setCarForUpdate(car)}>update</button>
            <button onClick={() => deleteCar(id)}>delete</button>
            <button onClick={() => navigate('select', {state: {car}})}>select</button>
        </div>
    );
};

export {
    Car
}