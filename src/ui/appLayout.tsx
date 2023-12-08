import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

export default function appLayout() {
  return (
    <div
      className={`min-h-screen w-full grid grid-cols-1 gap-4 sm:grid-cols-3 font-serif bg-stone-950 `}
    >
      <header className="fixed top-0 w-full z-50 sm:hidden bg-stone-900 p-2 col-span-3">
        <Header />
      </header>
      <aside className="sticky hidden sm:flex top-0 h-screen max-w-[300px] w-full bg-black p-4">
        <SideBar />
      </aside>
      <main className={`col-span-2 p-2 overflow-y-auto py-20 sm:p-8 xl:pr-28`}>
        <Outlet />
      </main>
      <div className="fixed bottom-0 w-full sm:hidden bg-stone-900 p-4  col-span-3 z-50 ">
        <Footer />
      </div>
    </div>
  );
}
