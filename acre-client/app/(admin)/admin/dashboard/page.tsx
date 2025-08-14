import AdminLogoutButton from "../(auth)/logout/AdminLogoutButton";


export default function page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <AdminLogoutButton />
    </div>
  );
}