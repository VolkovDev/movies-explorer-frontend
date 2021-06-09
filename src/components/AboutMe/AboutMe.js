import './AboutMe.css';
import Data from '../Data/Data';
import photo from '../../images/profile_avatar.jpg';

const AboutMe = () => {
    return (
        <Data title="Студент" linkId="about" type="about">
            <div className="about">
                <h2 className="about__title">Андрей</h2>
                <p className="about__subtitle">Фронтенд-разработчик, 32 года</p>
                <p className="about__text">Я родился и живу в Москве, закончил факультет Логистики МГТУ. им Баумана. Я люблю слушать  классическую музыку, а ещё увлекаюсь бегом и велоспортом. Недавно начал кодить. С 2013 года работал в
                компании «Speech».
                После того, как прошёл курс по веб-разработке,  сменил место постоянной
                    работы. </p>
                <ul className="about__links">
                    <li>
                        <a className="about__link" href="https://www.facebook.com"
                            target="_blank" rel="noreferrer">Facebook</a>
                    </li>
                    <li>
                        <a className="about__link" href="https://github.com/Barrrsss"
                            target="_blank" rel="noreferrer">Github</a>
                    </li>
                </ul>
                <img className="about__photo" src={photo} alt="Фото студента." />
            </div>
        </Data>
    );
};

export default AboutMe;
