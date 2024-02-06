import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: "Owen-Market Admin",
    description: "Owen-Market Admin Dashboard",
}


const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <AdminNav/>
      {children}
    </div>
  )
}

export default AdminLayout;
