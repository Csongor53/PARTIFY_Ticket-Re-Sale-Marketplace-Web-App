import NextAuth from "next-auth"
import EmailProvider from 'next-auth/providers/email';
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {/*JWT setup*/},
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/login/complete"
    },
    callbacks: {
        async jwt({token/*, user, account, profile, isNewUser*/}) {
            // for email provider only token has content (test isNewUser later)
           /* console.log("JWT Callback: ")
            console.log("token")
            console.log(token)
            */
            const user = await prisma.user.findUnique({
                where: {
                    email: token.email
                }
            })

            return {
                ...token,
                user: {
                    ...token.user,
                    emailVerified: user.emailVerified,
                    accComplete: user.accComplete,
                    firstName: user.firstName,
                    surname: user.surname,
                },
            }
            return token
        },

        async session({session, token}) {
            // only a subset of the token is returned for increased security

            /*console.log("Session Callback: ")
            console.log("session")
            console.log(session)
            console.log("token")
            console.log(token)*/

            const user = await prisma.user.findUnique({
                where: {
                    email: token.email
                }
            })

            return {
                ...session,
                user: {
                    ...session.user,
                    emailVerified: user.emailVerified,
                    accComplete: user.accComplete,
                    firstName: user.firstName,
                    surname: user.surname,
                },
            }
        },
    },
    debug: false,
}

export default NextAuth(authOptions)