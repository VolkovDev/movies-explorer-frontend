import './Menu.css';
import Navigation from '../Navigation/Navigation';

const Menu = ({
  handleMenuClose,
  isOpen,
  handleByClickButtonSaveMovies,
  handleClickByMovies }) => {
  return (
    <section className={`menu ${isOpen && 'menu_open'}`}>
      <div className="menu__container">
        <button className="menu__close" onClick={handleMenuClose} />
        <Navigation
          handleByClickButtonSaveMovies={handleByClickButtonSaveMovies}
          handleClickByMovies={handleClickByMovies} />
      </div>
    </section>
  );
};

export default Menu;
