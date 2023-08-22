import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res
                .status(401)
                .json({message: "Please signin."})
        }

        const body = req.body

        const result = await prisma.user.update({
            where: {email: session?.user?.email},
            data: {
                accComplete: new Date(),
                firstName: body.name,
                surname: body.surname,
                // age: body.age,
                gender: body.gender,
                iban: body.iban,
                phone: body.phone,
            }
        })
        res.status(200).json(result)
    }
}