import LogoutButton from "./(auth)/logout/logoutButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-5xl justify-center min-h-screen space-y-3.5">
      
      <div className ="">
        Welcome
      </div>
      <LogoutButton />
    </div>

  );
}
