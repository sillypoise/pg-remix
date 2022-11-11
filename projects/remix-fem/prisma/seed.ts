import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

async function seed() {
    let email = "silly@poise.com";

    // cleanup existing db
    await prisma.user.delete({ where: { email } }).catch(() => {});
    let posts = [
        { id: 1, author: "sillypoise", content: "my first post" },
        {
            id: 2,
            author: "sillypoise",
            content: "my segundo post",
        },
    ];
    for (let post of posts) {
        await prisma.post.upsert({
            where: { id: post.id },
            update: post,
            create: post,
        });
    }
    console.log(`Database has been seeded: 🌱`);
}

seed();
