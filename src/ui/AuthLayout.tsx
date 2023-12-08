import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-stone-300 font-serif min-h-screen w-full">
      <main className="flex justify-center items-center flex-col gap-4">
        <Outlet />
      </main>
    </div>
  );
}
