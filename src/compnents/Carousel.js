import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import './Carousel.css';

Carousel.propTypes = {
    children: PropTypes.element
};

function Carousel(props) {
    const slideshow = useRef();
    const timer = useRef();

    useEffect(() => {
        const scroller = slideshow.current;
        timer.current = setInterval(() => {
            // the scroller's width x number of slides (-2 = -1 because Arrays, -1 original frame)
            let scrollLimit =
                scroller.offsetWidth * (scroller.childNodes.length - 2);
            if (scroller.scrollLeft < scrollLimit) {
                slideshow.current.scrollBy(scroller.offsetWidth, 0);
            } else {
                scroller.scrollTo(0, 0);
            }
            return ;
        }, 3000);
        return scroller;
    }, []);

    return (
        <div id="carousel" ref={slideshow}>
            {props.children}
        </div>
    );
}

export default Carousel;
