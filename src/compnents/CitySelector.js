import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import GooglePlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-google-places-autocomplete';
import './CitySelector.css';

CitySelector.propTypes = {
    onSetLocation: PropTypes.func
};

function CitySelector(props) {
    const API_KEY = 'https://developers.google.com/maps/documentation';

    const setLocation = (eEvent) => {
        geocodeByAddress(eEvent.value.description)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                props.onSetLocation({
                    ...eEvent.value,
                    lat: lat,
                    lng: lng
                });
            });
    };

    return (
        <Fragment>
            <GooglePlacesAutocomplete
                apiKey={API_KEY}
                selectProps={{
                    onChange: setLocation
                }}
            />
        </Fragment>
    );
}

export default CitySelector;
