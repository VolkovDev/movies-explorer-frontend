import './Main.css';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Landing from '../Landing/Landing';
import AboutProject from '../AboutProject/AboutProject';


const Main = () => {
    return (
        <div>
            <Landing />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </div>
    );
};

export default Main;
