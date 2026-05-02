export default function HeaderComponent() {
  const tabs: { name: string; value: string }[] = [
    { name: "Accueil", value: "home" },
    { name: "Profil", value: "profile" },
    { name: "Réglage", value: "settings" },
    { name: "Communauté", value: "community" }
  ];

  return (
    <header className="flex items-center bg-black text-white font-semibold w-full pl-6 py-4">
      <div className="flex items-center gap-2">
        <img src="/logos/logo.svg" alt="Logo of the website" />
        <img src="/logos/logo-name.svg" alt="Logo title of the website" />
      </div>

      <nav className="grow">
        <ul className="flex items-center text-xl">
          {tabs.map(tab => (
            <li key={tab.value} className="w-full py-4 px-2 cursor-pointer">{tab.name}</li>
          ))}
        </ul>
      </nav>
    </header>
  )
}