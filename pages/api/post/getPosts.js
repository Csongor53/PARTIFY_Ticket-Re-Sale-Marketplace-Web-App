import prisma from "@/lib/prisma"

export default async function handler(req, res) {
    if (req.method === "GET") {
        const data = await prisma.ticket.findMany({
            /*include: {
                user: true
            },*/
            where: {
                visible: true,
            },
            orderBy: {
                eventDate: "desc",
            },
        })
        return res.status(200).json(data)
    }
}