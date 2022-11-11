import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({ request }: LoaderArgs) {
    return json([
        { id: 1, author: "sillypoise", content: "my first post" },
        {
            id: 2,
            author: "sillypoise",
            content: "my segundo post",
        },
    ]);
}

export default function Posts() {
    let posts = useLoaderData<typeof loader>();

    return (
        <article className="center stack max-is-[50ch]">
            <h1 className="text-2">Posts page!</h1>
            <ul role="list">
                {posts.map((post) => (
                    <li key={post.id}>
                        <article className="box stack">
                            <p className="text-0">{post.content}</p>
                            <p className="text-00">By: {post.author}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </article>
    );
}
