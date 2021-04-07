import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailValidationMessage, setEmailValidationMessage] = React.useState('');
    const [passwordValidationMessage, setPasswordValidationMessage] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);
    const [isRegisterFormValid, setIsRegisterFormValid] = React.useState(true);

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

        props.onRegister(password, email);
    }

    React.useEffect(() => {
        if(props.isRegisterSuccess) {
            setEmail('');
            setPassword('');
        }
    }, [props.isRegisterSuccess]);

    React.useEffect(() => {
        function checkFormValidity() {
            if(isEmailValid && isPasswordValid) {
                setIsRegisterFormValid(true);
            } else {
                setIsRegisterFormValid(false);
            }
        }
        checkFormValidity();
    }, [email, password, isEmailValid, isPasswordValid]);

    return (
        <section className="data data_type_register">
            <div className="data__container data__container_type_register">
                <h2 className="data__title data__header_type_register">Регистрация</h2>
                <form name="register-form" className="data__form data__form-type_register" onSubmit={handleSubmit}>
                    <input className={`data__input data__input_type_register ${isEmailValid ? '' : 'data__input_invalid'}`} placeholder="Email"
                           name="email" id="email" type="email"
                           value={email} onChange={handleEmailChange}
                           required/>
                    <span className="data__input-error" id="email-input-error">{emailValidationMessage}</span>
                    <input className={`data__input data__input_type_register ${isPasswordValid ? '' : 'data__input_invalid'}`} placeholder="Пароль"
                           name="password" id="password" type="password"
                           value={password} onChange={handlePasswordChange}
                           minLength={8}
                           required/>
                    <span className="data__input-error" id="password-input-error">{passwordValidationMessage}</span>
                    <button type="submit" className={`data__button data__button_type_register ${isRegisterFormValid ? '' : `data__button_inactive`}`}
                            disabled={!isRegisterFormValid}>Зарегистрироваться</button>
                </form>
                <h3 className="data__subtitle">Уже зарегистрированы?
                    <Link className="data__link" to="/sign-in" onClick={props.handleLoginActive}> Войти</Link></h3>
            </div>
        </section>
    )
}

export default withRouter(Register);
