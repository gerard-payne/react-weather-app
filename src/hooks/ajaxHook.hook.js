import { useState, useEffect } from 'react';

const AjaxHook = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        }
        console.log('fetch', url);
        fetchData();
    }, [url]);

    return data;
};

export default AjaxHook;
