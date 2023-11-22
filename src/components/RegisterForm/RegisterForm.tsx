import {SubmitHandler, useForm} from "react-hook-form";

import {IAuth} from "../../interfaces";
import {authService} from "../../services";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const [errors, setErrors] = useState<boolean>(null);
    const navigate = useNavigate();

    const registerUser: SubmitHandler<IAuth> = async (user) => {
        try {
            await authService.register(user)
            setErrors(false)
            navigate('/login')
        } catch (e) {
            setErrors(true)
        }
    }

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Register</button>
            {errors && <div>username already exists</div>}
        </form>
    );
};

export {
    RegisterForm
}