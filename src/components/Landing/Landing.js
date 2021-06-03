import './Landing.css';

const Landing = () => {
    return (
        <section className="landing">
            <div className="landing__container">
                <div className="landing__container-text">
                    <h1 className="landing__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="landing__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="landing_button">Узнать больше</button>
                </div>
                <div className="landing__landing-logo"></div>
            </div>
        </section>
    );
}

export default Landing;
