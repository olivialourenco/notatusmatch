import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-[#0A0E1A] shadow-md">
      <div className="flex items-center space-x-2">
        <img src="/src/assets/Logo3.png" alt="NotatusMatch" className="w-100 h-8" />
      </div>

      <nav className="space-x-6 text-gray-300">
        <Link
          to="/"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block"
        >
          Início
        </Link>

        <Link
          to="/tatuadores"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block"
        >
          Tatuadores
        </Link>

        <Link
          to="/sobre"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block"
        >
          Sobre
        </Link>
      </nav>
    </header>
  )
}

export default Header
