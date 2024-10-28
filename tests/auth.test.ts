import request from "supertest";
import { prisma } from "../src/lib/prisma";
import { server } from "../src";

let token = "";
const customer = {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@mail.so",
    password: "123four",
}

const customerSigninInfo = {
    email: "jdoe@mail.so",
    password: "123four",
}

describe("Auth Customer", () => {
    beforeAll(async () => {
        await prisma.$transaction([
            prisma.customer.deleteMany(),
        ])
    })

    describe("POST /auth/singup", () => {
        it("responds with json new customer signup", async () => {
            const { status, body } = await request(server)
                .post("/api/v1/auth/signup")
                .send(customer);

            expect(status).toBe(200)
            expect(body).toStrictEqual({
                message: 'Account successfully created!'
            })
        })

    });

    describe("POST auth/signin", () => {
        it("should return jwt token", async () => {
            const { status, body } = await request(server)
                .post("/api/v1/auth/signin")
                .send(customerSigninInfo);
            expect(status).toBe(200);

            token = body.access_token;
        });

        it("sould be able to get customer info", async () => {
            const { status } = await request(server)
                .get("/api/v1/customer/profile")
                .set("Authorization", `Bearer ${token}`)

            expect(status).toBe(200);
        })
    })
})
