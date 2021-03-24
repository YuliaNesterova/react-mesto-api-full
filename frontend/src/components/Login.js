import React from 'react';
import { withRouter } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!email || !password) {
            return
        }
        props.onLogin(password, email);
    }

    React.useEffect(() => {
        if(props.loggedIn) {
            setEmail('');
            setPassword('');
        }
    }, [props.loggedIn])

    return (
        <section className="data data_type_login">
            <div className="data__container data__container_type_login">
                <h2 className="data__title data__header_type_login">Вход</h2>
                <form name="login-form" className="data__form data__form-type_login" onSubmit={handleSubmit}>
                    <input className="data__input data__input_type_register" placeholder="Email"
                           name="email" id="email" type="email"
                           value={email} onChange={handleEmailChange}
                           required/>
                    <input className="data__input data__input_type_register" placeholder="Пароль"
                           name="password" id="password" type="password"
                           value={password} onChange={handlePasswordChange}
                           required/>
                    <button type="submit" className="data__button data__button_type_login">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);
