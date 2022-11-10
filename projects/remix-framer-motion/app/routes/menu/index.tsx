import { Link, Links } from "@remix-run/react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// This issue is explored here: https://github.com/radix-ui/primitives/issues/1061
// think it's best to stick with css animatinos -__-

export default function MenuIndex() {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger
                className="bg-[color:var(--background)] | debug"
                onClick={() => setIsOpen(!isOpen)}
            >
                OpenMenu
            </Dialog.Trigger>
            <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                    <Dialog.Portal forceMount>
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                                className="fixed bg-dark-sky-8 inset-[0] z-10"
                            >
                                <div className="center stack items-center">
                                    <nav className="mbs-2xl nav">
                                        <ul role="list" className="stack ">
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Dialog.Close
                                                    className="bg-transparent"
                                                    onClick={() =>
                                                        setIsOpen(!open)
                                                    }
                                                >
                                                    X
                                                </Dialog.Close>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                ) : null}
            </AnimatePresence>
        </Dialog.Root>
    );
}
