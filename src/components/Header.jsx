import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { getUsuarioLogado, ehCliente, ehTatuador, fazerLogout } from "../lib/auth"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Atualizar usuário logado quando a rota mudar (após login/logout)
    setUsuarioLogado(getUsuarioLogado())
  }, [location])

  const handleLogout = () => {
    fazerLogout()
    setUsuarioLogado(null)
    setIsMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="relative flex items-center justify-between p-4 md:p-6 bg-[#0A0E1A] shadow-md z-50">
      <div className="flex items-center space-x-2">
        <img src="/src/assets/Logo3.png" alt="NotatusMatch" className="h-6 md:h-8 w-auto" />
      </div>

      {/* Menu Desktop */}
      <nav className="hidden md:flex space-x-4 lg:space-x-6 text-gray-300 items-center">
        <Link
          to="/"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base"
        >
          Início
        </Link>

        <Link
          to="/tatuadores"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base"
        >
          Tatuadores
        </Link>

        <Link
          to="/sobre"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base"
        >
          Sobre
        </Link>

        <Link
          to="/contato"
          className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base"
        >
          Contato
        </Link>

        {ehCliente() && (
          <Link
            to="/minhas-solicitacoes"
            className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base text-pink-400 font-semibold"
          >
            Minhas Solicitações
          </Link>
        )}

        {ehTatuador() && (
          <Link
            to="/tatuador/dashboard"
            className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base text-pink-400 font-semibold"
          >
            Dashboard
          </Link>
        )}

        {usuarioLogado ? (
          <button
            onClick={handleLogout}
            className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base"
          >
            Sair
          </button>
        ) : (
          <Link
            to="/login"
            className="hover:text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110 inline-block text-sm lg:text-base"
          >
            Entrar
          </Link>
        )}
      </nav>

      {/* Botão Menu Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <nav className="absolute top-full left-0 right-0 bg-[#0A0E1A] border-t border-gray-800 md:hidden z-50 shadow-lg">
            <div className="flex flex-col p-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
              >
                Início
              </Link>
              <Link
                to="/tatuadores"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
              >
                Tatuadores
              </Link>
              <Link
                to="/sobre"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
              >
                Sobre
              </Link>
              <Link
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
              >
                Contato
              </Link>

              {ehCliente() && (
                <Link
                  to="/minhas-solicitacoes"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-pink-400 font-semibold hover:text-pink-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
                >
                  Minhas Solicitações
                </Link>
              )}

              {ehTatuador() && (
                <Link
                  to="/tatuador/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-pink-400 font-semibold hover:text-pink-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
                >
                  Dashboard
                </Link>
              )}

              {usuarioLogado ? (
                <button
                  onClick={() => {
                    handleLogout()
                  }}
                  className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 text-left w-full"
                >
                  Sair
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
                >
                  Entrar
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header
