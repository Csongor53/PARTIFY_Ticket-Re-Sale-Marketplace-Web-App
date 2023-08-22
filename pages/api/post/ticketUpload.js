import formidable from "formidable";
import {uploadToBlobStream} from "@/services/uploadToBlobStream";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma"

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session.user.email) {
            return res
                .status(401)
                .json({message: "Please sign in."})
        }

        const form = formidable({multiples: true})
        form.parse(req, async (err, fields, files) => {
            if (err) console.error(err);
            // console.log(files.file.mimetype)
            // mimetype: 'image/jpeg',
            const { title, date, venue, price, description, sellerFirstName, sellerSurname } = fields;
            const fileUrl = await uploadToBlobStream(files.file)
            await prisma.ticket.create({
                data: {
                    userEmail: session.user.email,
                    title: title,
                    eventDate: new Date(date),
                    uploadDate: new Date(Date.now()),
                    venue: venue,
                    price: parseInt(price),
                    description: description,
                    firstName: sellerFirstName,
                    surname: sellerSurname,
                    fileUrl: fileUrl,
                    state: "public",
                    visible: true,
                }
            });
        })
        res.status(200).json({message: "File uploaded successfully"});

    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}