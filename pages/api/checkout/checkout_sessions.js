const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const items = req.body.cart;
        // console.log("Items from checkout api: ",items);

        // Check if all tickets exist in the database
        const tickets = await prisma.ticket.findMany({
            where: {
                AND: items.map((item) => ({
                    id: item.product.id,
                    visible: true,
                })),
            },
        });
        // console.log("items (req.body.cart): ", items, "tickets (from db):" , tickets)
        if (tickets.length < items.length) {
            // Some tickets are not available
            const unavailableTickets = items.filter(
                (item) => !tickets.some((ticket) => ticket.id === item.product.id)
            );
            // Remove unavailable tickets from the cart
            const updatedCart = items.filter(
                (item) => !unavailableTickets.some((t) => t.product.id === item.product.id)
            );

            res.status(200).json({
                success: true,
                message: "Some tickets are no longer available",
                cart: updatedCart,
            });
            return;
        }

        // Set `visible` property to false for each ticket in the order
        await prisma.ticket.updateMany({
            where: {
                AND: items.map((item) => ({
                    id: item.product.id,
                    visible: true,
                })),
            },
            data: {
                visible: false,
            },
        });
        // Schedule a function to turn tickets back to visible after 15 minutes
        setTimeout(async () => {
            const ticketsToUpdate = await prisma.ticket.findMany({
                where: {
                    AND: items.map((item) => ({
                        id: item.product.id,
                        visible: false,
                    })),
                },
            });

            await prisma.ticket.updateMany({
                where: {
                    AND: ticketsToUpdate.map((ticket) => ({
                        id: ticket.id,
                    })),
                },
                data: {
                    visible: true,
                },
            });
        }, 1000 * 60 * 15); // 900000ms = 15min

        const serviceFeeItem = {
            price_data: {
                currency: "eur",
                product_data: {
                    name: 'Service fee',
                    description: 'This fee supports the functioning of the website.',
                },
                unit_amount: 1,
            },
            quantity: 1,
        };

        const transformedItems = items.map((p) => {
            let item = p.product
            serviceFeeItem.price_data.unit_amount += item.price * 100 * 0.1 // 10% commission
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.title,
                        description: item.description,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: 1,
            };
        });
        transformedItems.push(serviceFeeItem)
        const ticketIds = items.map((item) => item.product.id).join(',');

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: transformedItems,
            mode: "payment",
            success_url: `${req.headers.origin}/checkoutResult/paymentSuccess`,
            cancel_url: `${req.headers.origin}/checkoutResult/paymentFailed`,
            payment_intent_data: {
                metadata: {
                    ticketIds: ticketIds,
                },
            },
        })

            res.json({sessionURL: session.url});
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

/*
desc:

    It receives a POST request with an array of items from the shopping cart (req.body.cart).
    It queries the database to check if all the tickets in the cart are available and have their visible attribute set to true.
    If all the tickets are available, it sets their visible attribute to false and schedules a function to turn them back to visible after 15 minutes.
    It calculates the total price of the items and creates a Stripe Checkout session.
    If the payment is successful, it moves the tickets to a paidTickets table and deletes them from the tickets table.
    If the payment fails or is incomplete, it reverts the tickets to their normal state by setting their visible attribute to true.
*/
