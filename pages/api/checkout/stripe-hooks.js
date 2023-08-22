const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import prisma from "@/lib/prisma";
import { buffer } from 'micro'

// stripe listen --forward-to localhost:3000/api/checkout/stripe-hooks
export const config = {
    api: {
        bodyParser: false,
    },
}
// Stripe Webhook event:  payment_intent.succeeded { ticketIds: '11' }
// Stripe Webhook event:  payment_intent.created { ticketIds: '11' }
// Stripe Webhook event:  checkout.session.completed {}
// Stripe Webhook event:  charge.succeeded { ticketIds: '11' }

export default async function handler(req, res){
    const signature = req.headers["stripe-signature"];
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;

    const reqBuffer = await buffer(req);

    let event
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
    console.log("------------------Stripe Webhook event: ", event.type, event.data.object.metadata)

    let ticketIds
    if(event.data.object.metadata.ticketIds){
        // console.log('true')
        const stringTicketIds = event.data.object.metadata.ticketIds.split(',')
        ticketIds = stringTicketIds.map((id) => parseInt(id));
    }

    switch (event.type) {
        case 'charge.succeeded' :

            
            const tickets = await prisma.ticket.findMany({
                where: {
                    id: {in: ticketIds}
                }
            })

            await Promise.all(
                tickets.map((ticket) =>
                    prisma.paidTicket.create({
                        data: {
                            ticketId: ticket.id,
                            userEmail: ticket.userEmail,
                            title: ticket.title,
                            eventDate: ticket.eventDate,
                            uploadDate: ticket.uploadDate,
                            venue: ticket.venue,
                            price: ticket.price,
                            description: ticket.description,
                            firstName: ticket.firstName,
                            surname: ticket.surname,
                            fileUrl: ticket.fileUrl,
                            paidDate: new Date(), // Set paidDate to current date/time
                        },
                    })
                )
            );

            await prisma.ticket.deleteMany({
                where: {
                    id: {in: ticketIds},
                },
            });

            // console.log('tickets: ', tickets)
            res.json({ received: true });
            break;

        case 'checkout.session.expired':
        case 'payment_intent.payment_failed':
            await prisma.ticket.updateMany({
                where: {
                    id: {in: ticketIds},
                },
                data: {
                    visible: true,
                },
            });
            res.json({ received: true });
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
            res.json({ received: true });
    }
    res.send();
}
