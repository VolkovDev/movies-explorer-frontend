import Auth from '../Auth/Auth';
import './Login.css';

const Login = ({ onLogoClick, onLogin }) => {
    return (
        <section className="login">
            <Auth
                onLogoClick={onLogoClick}
                handleSubmit={onLogin}
                captionText="Еще не зарегистированы?"
                route="/signup"
                greeting="Рады видеть!"
                isNameVisible={false}
                buttonText="Войти"
                navLinkText="Регистрация"
            />
        </section>
    );
};

export default Login;
