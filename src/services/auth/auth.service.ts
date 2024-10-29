import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { HttpException } from "../../common/exceptions";
import { HttpStatus } from "../../common/enums";
import { Prisma } from "@prisma/client";


const signIn = async (email: string, plainTextpassword: string) => {
    const customer = await prisma.customer.findUniqueOrThrow({
        where: { email: email },
    });

    const { password, ...customerInfo } = customer;
    const isMatch = await bcrypt.compare(plainTextpassword, password);

    if (!isMatch) {
        throw new HttpException(`Password is incorrect!`, HttpStatus.BAD_REQUEST);
    }

    const payload = {
        sub: customerInfo.id,
        email: customerInfo.email,
    };

    const accessToken = jwt.sign(payload, String(process.env.JWT_SECRET), {
        expiresIn: "1h",
    });

    await prisma.customer.update({
        where: { id: payload.sub },
        data: { lastLogin: new Date().toISOString() },
    });

    return { access_token: accessToken };
}

const signUp = async (data: Prisma.CustomerCreateInput) => {
    const customerAlreadyExist = await prisma.customer.findUnique({
        where: { email: data.email },
    });

    if (customerAlreadyExist) {
        throw new HttpException(`This email has already connected to a account please Sign In!`,
            HttpStatus.BAD_REQUEST);
    }

    const passwordHashed = await bcrypt.hash(data.password, 10);

    await prisma.customer.create({ data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: passwordHashed
    } });
}

export const authService = { signIn, signUp }
