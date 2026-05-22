import HeaderComponent from "./components/Header";
import HomeComponent from "./components/Home";
import SidebarComponent from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex flex-col w-full h-screen">
      <HeaderComponent></HeaderComponent>
      <main className="flex grow">
        <SidebarComponent></SidebarComponent>
        <HomeComponent></HomeComponent>
      </main>
    </div>
  )
}