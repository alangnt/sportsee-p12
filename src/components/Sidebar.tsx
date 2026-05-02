export default function SidebarComponent() {
  const tabs: { iconUrl: string; value: string }[] = [
    { iconUrl: "/icons/meditate.svg", value: "meditation" },
    { iconUrl: "/icons/swim.svg", value: "swimming" },
    { iconUrl: "/icons/bicycle.svg", value: "cycling" },
    { iconUrl: "/icons/weight.svg", value: "weightlifting" }
  ];

  return (
    <aside className="flex flex-col items-center justify-center bg-black text-white w-fit p-6 relative">
      <nav>
        <ul className="flex flex-col gap-5">
          {tabs.map(tab => (
            <li 
              key={tab.value} 
              className="flex items-center justify-center rounded-md w-16 h-16 bg-white hover:bg-white/90 transition cursor-pointer"
            ><img src={tab.iconUrl} alt={tab.value} /></li>
          ))}
        </ul>
      </nav>

      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 [writing-mode:vertical-lr] rotate-180 whitespace-nowrap text-xs">Copyright, SportSee 2020</p>
    </aside>
  )
}