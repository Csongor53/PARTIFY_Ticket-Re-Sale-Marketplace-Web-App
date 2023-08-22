
// import { getSession } from '@/lib/prisma'
// import axios from "axios";

// const getAdmin = async (user) => {
//   return await axios.post('/api/auth/admin/isAdmin', user)
// }
//
// export async function getServerSideProps(context) {
//     const session = await getSession(context)
//
//     // const isAdmin = getAdmin(session.user)
//
//     // if (!isAdmin) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     // }
//
//     // Fetch data from your API and pass it as props
//     const res = await fetch('https://api.example.com/data')
//     const data = await res.json()
//
//     return {
//         props: {
//             data,
//         },
//     }
// }

export default function AdminDashboard() {
    return (
        <div>
            {/*<h1>Admin Dashboard</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>*/}
        </div>
    )
}



