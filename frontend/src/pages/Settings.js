import React from 'react';
import ThemeToggle from '../components/ThemeToggle';
import ReactPlayer from 'react-player';

// Короткая запись компонента - стрелочная функция
const Settings = () => {

    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            <h1>Настройки</h1>
            <p>Здесь будут настройки пользователя...</p>

            <div className="row" style={{ marginBottom: '20px' }}>
                <div className="col-md-12">
                    <ThemeToggle />
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <iframe
                        width="600"
                        height="400"
                        src="https://www.youtube.com/embed/A--k4o5BDjY?autoplay=1" // Путь /embed/ + ID видео
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="col-md-4">
                    <iframe
                        width="600"
                        height="400"
                        src="https://www.youtube.com/embed/tAGnKpE4NCI?" // Путь /embed/ + ID видео
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="col-md-4">
                    <iframe
                        width="600"
                        height="400"
                        src="https://www.youtube.com/embed/9KKqFjCpPL4?" // Путь /embed/ + ID видео
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>


        </div>
    );
};

export default Settings;