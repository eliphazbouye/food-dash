import request from "supertest";
import { prisma } from "../src/lib/prisma";
import { server } from "../src";

const customer = {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@mail.so",
    password: "123four",
}

beforeEach(async () => {
    await prisma.$transaction([
        prisma.customer.deleteMany(),
    ])
})

describe("POST /customer/auth", () => {
    it("responds with json new customer signup", async () => {
        const { status, body } = await request(server)
            .post("/api/v1/customer/auth/signup")
            .send(customer);

        expect(status).toBe(200)
        expect(body).toStrictEqual({
            message: 'Account successfully created!'
        })
    })
});
