import { Link } from "@remix-run/react";

export default function Index() {
    return (
        <main>
            <article className="stack">
                <h1>Remix singles</h1>
                <p>
                    This is a project made to follow all the Remix Single's
                    lessons in{" "}
                    <a
                        href="https://www.youtube.com/watch?v=jd_bin5HPrw&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6"
                        target="_blank"
                        rel="noreferrer"
                    >
                        this youtube playlist
                    </a>
                    from the Remix youtube channel
                </p>

                <nav>
                    <ul>
                        <li>
                            <Link to="/newsletter-example">
                                Newsletter Example (covers many things!)
                            </Link>
                        </li>
                        <li>
                            <Link to="/loading-data">
                                Loading data into components
                            </Link>
                        </li>
                        <li>
                            <Link to="/data-mutation">Data mutations</Link>
                        </li>
                        <li>
                            <Link to="/multiple-forms-and-single-button-mutations">
                                Multiple Forms and Single Button Mutations
                            </Link>
                        </li>
                        <li>
                            <Link to="/pending-ui">Pending UI</Link>
                        </li>
                        <li>
                            <Link to="/clearing-inputs-after-submissions ">
                                Clearing inputs after submissions
                            </Link>
                        </li>
                    </ul>
                </nav>
            </article>
        </main>
    );
}
