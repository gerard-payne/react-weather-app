import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import Carousel from './Carousel';
import AjaxHook from '../hooks/ajaxHook.hook';
import './Weather.css';

Weather.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        structured_formatting: PropTypes.shape({
            main_text: PropTypes.string
        })
    })
};

function Weather(props) {
    const API_KEY = 'https://home.openweathermap.org/users/sign_in';
    const { location } = props;
    const URL = `https://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,hourly&units=metric&lat=${location.lat}&lon=${location.lng}&appid=${API_KEY}`;
    const result = AjaxHook(URL);

    return (
        <Fragment>
            <h1>Weather in {location?.structured_formatting?.main_text}</h1>

            {result?.alerts && (
                <Carousel>
                    {result.alerts.map((alert) => {
                        return (
                            <div className="alert" key={alert.Index}>
                                <h1>{alert.event}</h1>
                                <h2>
                                    <Moment unix format="dddd DD MMMM YYYY">
                                        {alert.start}
                                    </Moment>
                                    &nbsp; until &nbsp;
                                    <Moment unix format="dddd DD MMMM YYYY">
                                        {alert.end}
                                    </Moment>
                                </h2>
                                <h3>{alert.sender_name}</h3>
                                <p>{alert.description}</p>
                            </div>
                        );
                    })}
                </Carousel>
            )}

            <ul className="weather">
                {result?.daily?.map((result) => {
                    return (
                        <li className="daily" key={result.dt}>
                            <h1>
                                <Moment unix format="dddd">
                                    {result.dt}
                                </Moment>
                            </h1>
                            <h2>
                                <Moment unix format="DD MMMM YYYY">
                                    {result.dt}
                                </Moment>
                            </h2>
                            <h3>{Math.round(result.temp.day)}°C</h3>
                            <img
                                className="img-fluid"
                                alt={result.weather[0].main}
                                src={`https://openweathermap.org/img/w/${result.weather[0].icon}.png`}
                            />
                            <p>{result.weather[0].description}</p>
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}

export default Weather;
