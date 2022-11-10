import { useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
export async function loader() {
    let data = await fetch(
        "https://jsonplaceholder.typicode.com/users?id=3"
    ).then((res) => res.json());

    return { data };
}

export default function PageB() {
    let { data } = useLoaderData();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=""
            >
                <article className="center stack max-is-[50ch] cover">
                    <h2 className="text-3">B</h2>
                    <p>{JSON.stringify(data, null, 4)}</p>
                </article>
            </motion.div>
        </AnimatePresence>
    );
}
