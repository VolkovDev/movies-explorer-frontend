import Auth from '../Auth/Auth';
import './Login.css';

const Login = ({
    isBlocked,
    onLogin }) => {
    return (
        <section className="login">
            <Auth
                handleSubmit={onLogin}
                captionText="Еще не зарегистированы?"
                route="/signup"
                greeting="Рады видеть!"
                isNameVisible={false}
                buttonText="Войти"
                navLinkText="Регистрация"
                isBlocked={isBlocked}
            />
        </section>
    );
};

export default Login;
