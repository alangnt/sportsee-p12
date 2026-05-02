import HeaderComponent from "./components/Header";
import SidebarComponent from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeaderComponent></HeaderComponent>
      <div className="flex grow">
        <SidebarComponent></SidebarComponent>
      </div>
    </div>
  )
}