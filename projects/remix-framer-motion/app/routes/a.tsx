import WipeTransition from "./components/WipeTransition";

export default function PageA() {
    return (
        <main className="mlb-l bg-dark-pink-8">
            <WipeTransition />
            <article className="center stack max-is-[50ch] cover">
                <h2 className="text-3">A</h2>
            </article>
        </main>
    );
}
