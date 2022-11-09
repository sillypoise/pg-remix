import { useLocation } from "@remix-run/react";
import {
    AnimatePresence,
    motion,
    useIsPresent,
    usePresence,
} from "framer-motion";

export default function WipeTransition() {
    let isPresent = useIsPresent();

    return (
        <motion.div
            className="imposter inset-[0] transform-none bg-dark-gray-11 z-10 cover"
            initial={{ scaleX: 1 }}
            animate={{
                scaleX: 0,
                transition: { duration: 0.5, ease: "circOut" },
            }}
            exit={{
                scaleX: 1,
                transition: { duration: 0.5, ease: "circIn" },
            }}
            style={{ originX: isPresent ? 0 : 1 }}
        ></motion.div>
    );
}
