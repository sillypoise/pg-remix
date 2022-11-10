import { useState } from "react";
import {
    config,
    useTransition as useSpringTransition,
    animated,
} from "react-spring";

export default function PageA() {
    let [show, set] = useState(false);
    let transitions = useSpringTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay: 200,
        config: config.molasses,
        // onRest: () => set(!show),
    });

    return (
        <article className="center stack max-is-[50ch] cover">
            <h2 className="text-3">A</h2>
            <div className="box">AAA</div>
            <input
                type="checkbox"
                name=""
                id=""
                checked={show}
                onChange={() => set(!show)}
            />
            {transitions(
                (styles, item) =>
                    item && <animated.div style={styles}>😊</animated.div>
            )}
        </article>
    );
}
