import './globals.css'
import QueryWrapper from "./QueryWrapper";
import AuthContext from "./auth/AuthContext"
import StoreProvider from "./StorePovider";
import Navbar from "./navbar"
import Footer from "./Footer"

export const metadata = {
    title: 'Partify',
    description: 'Get Tickets In Madrid with Partify!!!',
}

export default function RootLayout({session, children}) {
    return (
        <html lang="en">
        <body>
        <QueryWrapper> {/* QueryClientProvider */}
            <AuthContext session={session}> {/* SessionProvider */}
                <StoreProvider>
                    <Navbar/>
                    {children}
                    <Footer/>
                </StoreProvider>
            </AuthContext>
        </QueryWrapper>
        </body>
        </html>)
}
