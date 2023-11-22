import {FC, PropsWithChildren, useRef, useState} from "react";

import {ICar} from "../../interfaces";
import {carService} from "../../services";

interface IProps extends PropsWithChildren {
    car: ICar
}

const Car: FC<IProps> = ({car}) => {
    const {id, brand, price, year, photo} = car;
    const fileInput = useRef<HTMLInputElement>();
    const [image, setImage] = useState<string>(null)

    const addPhoto = async (): Promise<void> => {
        const formData = new FormData();
        const file: Blob = fileInput.current.files[0]
        formData.append('photo', file)
        await carService.addPhoto(id, formData)
        setImage(URL.createObjectURL(file))
    }

    return (
        <div>
            <div>id: {id}</div>
            <div>brand: {brand}</div>
            <div>price: {price}</div>
            <div>year: {year}</div>
            <img
                src={photo || image || 'https://vashkluch.com.ua/images/no-image.png'}
                style={{cursor: photo || image ? 'default' : 'pointer'}}
                alt={brand}
                width={'200px'}
                onClick={() => fileInput.current.click()}
            />
            <input
                type='file'
                accept={'image/jpeg, image/png'}
                ref={fileInput}
                style={{display: 'none'}}
                disabled={!!photo || !!image}
                onChange={addPhoto}
            />
        </div>
    );
};

export {
    Car
}