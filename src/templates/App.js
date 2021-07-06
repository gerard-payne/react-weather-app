import React, { useState } from 'react';
import CitySelector from '../compnents/CitySelector';
import Weather from '../compnents/Weather';

function App() {
    const [state, setValue] = useState(0);

    const setLocation = (sLocation) => {
        setValue({ ...state, location: sLocation });
        return sLocation;
    };

    return (
        <div className="App">
            <CitySelector onSetLocation={setLocation}></CitySelector>

            {state.location && <Weather location={state.location}></Weather>}
        </div>
    );
}

export default App;
