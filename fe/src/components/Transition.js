import { Transition } from 'react-transition-group';
import { useState } from "react";

const Fade = () => {
    const [inProp, setInProp] = useState(false);

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };

    return (
        <div>
            <Transition in={inProp} timeout={duration}>
                {state => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        I'm a fade Transition!
                    </div>
                )}
            </Transition>
            <button onClick={() => setInProp(!inProp)}>
            Click to Enter
            </button>
        </div>
        );
}

export default Fade