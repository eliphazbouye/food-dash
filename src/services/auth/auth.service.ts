import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { HttpException } from "../../common/exceptions";
import { HttpStatus } from "../../common/enums";


const signIn = async (email: string, plainTextpassword: string) => {
    try {
        const customer = await prisma.customer.findUniqueOrThrow({
            where: { email: email },
        });

        const { password, ...customerInfo } = customer;
        const isMatch = await bcrypt.compare(plainTextpassword, password);

        if (!isMatch) {
            throw new Error('Password is incorrect!');
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
    } catch (err: any) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND)
    }
}

export const authService = { signIn }
