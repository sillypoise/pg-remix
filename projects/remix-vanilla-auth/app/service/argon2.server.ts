import argon2 from "argon2";

async function validateCredentials(hash: string, password: string) {
    try {
        if (await argon2.verify(hash, password)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("error verifying a2", error);
    }
}

async function hashPassword(password: string) {
    try {
        let hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        console.log("a2 error", error);
    }
}

export { hashPassword, validateCredentials };
