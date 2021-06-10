import './Footer.css';

const Footer = ({ pathOne }) => {

  return (
    <footer
      className={`footer
      ${(pathOne === '/signin' || pathOne === '/signup') && 'footer_invisible'}`}>
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm</p>
        <div className="footer__info">
          <p className="footer__date">&copy; <span id="year">2021</span></p>
          <ul className="footer__links">
            <li className="footer__item">
              <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com/VolkovDev" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://www.facebook.com/profile.php?id=100007415280646" target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
