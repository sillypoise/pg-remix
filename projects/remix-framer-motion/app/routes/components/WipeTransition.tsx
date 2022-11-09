import { useLocation } from "@remix-run/react";
import {
    AnimatePresence,
    motion,
    useIsPresent,
    usePresence,
} from "framer-motion";

export default function WipeTransition() {
    let location = useLocation();
    let isPresent = useIsPresent();

    return (
        <motion.div
            key={location.key}
            className="imposter inset-[0] transform-none bg-dark-tomato-8 z-10 cover"
            initial={{ scaleX: 1 }}
            animate={{
                scaleX: 0,
                transition: { duration: 0.5 },
            }}
            exit={{
                scaleX: 1,
                transition: { duration: 0.5 },
            }}
            style={{ originX: isPresent ? 0 : 1 }}
        >
            <h1>{isPresent ? "PRESENT" : "NOT PRESENT"}</h1>
        </motion.div>
    );
}
