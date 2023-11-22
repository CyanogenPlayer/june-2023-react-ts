import {Link} from "react-router-dom";

import css from './Header.module.css'
import {useAppSelector} from "../../hooks";

const Header = () => {
    const {me} = useAppSelector(state => state.auth);

    return (
        <div className={css.Header}>
            {
                me ?
                    <div>{me.username} -- {new Date(me.last_login).toDateString()}</div>
                    :
                    <div>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
            }

        </div>
    );
};

export {
    Header
}