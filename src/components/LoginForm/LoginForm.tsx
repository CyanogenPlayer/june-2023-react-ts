import {SubmitHandler, useForm} from "react-hook-form";

import {IAuth} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const {errors} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginUser: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled') {
            navigate('/cars')
        }
    }

    return (
        <form onSubmit={handleSubmit(loginUser)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>
            {errors && <div>Username or password is incorrect</div>}
        </form>
    );
};

export {
    LoginForm
}