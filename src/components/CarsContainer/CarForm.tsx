import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces/carInterface";
import {joiResolver} from "@hookform/resolvers/joi";
import {carValidator} from "../../validators/carValidator";
import {carService} from "../../services/carService";
import {ISetState} from "../../types/ISetState";

interface IProps {
    trigger: () => void,
    carForUpdate: ICar,
    setCarForUpdate: ISetState<ICar>
}

const CarForm: FC<IProps> = ({trigger, carForUpdate, setCarForUpdate}) => {
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<ICar>({
        mode: 'onBlur',
        resolver: joiResolver(carValidator)
    });

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand, {shouldValidate: true})
            setValue("price", carForUpdate.price, {shouldValidate: true})
            setValue('year', carForUpdate.year, {shouldValidate: true})
        }
    }, [carForUpdate, setValue]);

    const save: SubmitHandler<ICar> = async (car) => {
        if (!carForUpdate) {
            await carService.create(car);
        } else {
            await carService.updateById(carForUpdate.id, car);
            setCarForUpdate(null);
        }
        trigger();
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder={'brand'} {...register('brand')}/>
                <input type="text" placeholder={'price'} {...register('price')}/>
                <input type="text" placeholder={'year'} {...register('year')}/>
                <button disabled={!isValid}>save</button>
            </form>
            {errors.brand && <div>brand: {errors.brand.message}</div>}
            {errors.price && <div>price: {errors.price.message}</div>}
            {errors.year && <div>year: {errors.year.message}</div>}
        </div>

    );
};

export {
    CarForm
};