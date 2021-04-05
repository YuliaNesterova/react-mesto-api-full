import React from 'react';
import { withRouter } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailValidationMessage, setEmailValidationMessage] = React.useState('');
    const [passwordValidationMessage, setPasswordValidationMessage] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);
    const [isLoginFormValid, setIsLoginFormValid] = React.useState(true);

    function checkFormValidity() {
        if(isEmailValid && isPasswordValid) {
            setIsLoginFormValid(true);
        } else {
            setIsLoginFormValid(false);
        }
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setIsEmailValid(e.target.checkValidity());
        setEmailValidationMessage(e.target.validationMessage);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setIsPasswordValid(e.target.checkValidity());
        setPasswordValidationMessage(e.target.validationMessage);
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
                <form name="login-form" className="data__form data__form-type_login" onSubmit={handleSubmit} onChange={checkFormValidity}>
                    <input className={`data__input data__input_type_login ${isEmailValid ? '' : 'data__input_invalid'}`}
                           placeholder="Email"
                           name="email" id="email" type="email"
                           value={email} onChange={handleEmailChange}
                           required/>
                    <span className="data__input-error" id="email-input-error">{emailValidationMessage}</span>
                    <input className={`data__input data__input_type_login ${isPasswordValid ? '' : 'data__input_invalid'}`}
                           placeholder="Пароль"
                           name="password" id="password" type="password"
                           value={password} onChange={handlePasswordChange}
                           minLength={8}
                           required/>
                    <span className="data__input-error" id="password-input-error">{passwordValidationMessage}</span>
                    <button type="submit"
                            className={`data__button data__button_type_login ${isLoginFormValid ? '' : `data__button_inactive`}`}
                            disabled={!isLoginFormValid}>Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);
