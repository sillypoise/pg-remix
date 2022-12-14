import { Configuration, FrontendApi } from "@ory/client";

const apiBaseUrlInternal = process.env["KRATOS_PUBLIC_URL"];

let kratos = new FrontendApi(
    new Configuration({
        basePath: apiBaseUrlInternal,
    })
);

export { kratos };
