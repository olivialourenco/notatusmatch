import { useNavigate } from "react-router-dom"
import { Mail, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <main className="flex flex-col lg:flex-row bg-gradient-to-b from-gray-100 via-purple-100 to-purple-200 flex-1 min-h-[calc(100vh-120px)]">
      {/* Seção Esquerda - Formulário de Login */}
      <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col items-start justify-center px-6 sm:px-8 md:px-12 py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-100 via-purple-100 to-purple-200 lg:ml-auto min-h-full">
        <div className="w-full max-w-md">
          {/* Logo e Título */}
          <div className="mb-8">
            <div className="mb-6">
              <img 
                src="/src/assets/Logo2.png" 
                alt="NotatusMatch" 
                className="h-10 w-auto mb-4"
              />
              <h1 className="text-3xl sm:text-4xl font-bold text-black">Login</h1>
            </div>
          </div>

          {/* Link para cadastro */}
          <p className="text-gray-700 mb-8 text-sm">
            Não tem uma conta?{" "}
            <span 
              onClick={() => navigate("/escolha-perfil")}
              className="text-pink-600 hover:text-pink-500 cursor-pointer font-semibold transition-colors"
            >
              Cadastre-se no NotatusMatch
            </span>
          </p>

          {/* Formulário */}
          <form className="space-y-5">
            {/* Campo Email */}
            <div>
              <label className="block text-gray-800 text-sm mb-2">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="w-full p-3 pr-10 rounded-md bg-white border border-gray-300 text-black placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Mail size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-gray-800 text-sm mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-3 pr-10 rounded-md bg-white border border-gray-300 text-black placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-400 bg-white text-pink-500 focus:ring-pink-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-800 cursor-pointer">
                Lembrar-me
              </label>
            </div>

            {/* Botão Login */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
            >
              Entrar
            </button>
          </form>

          {/* Esqueceu a senha */}
          <p className="text-center mt-6">
            <span 
              onClick={() => navigate("/escolha-perfil")}
              className="text-pink-600 hover:text-pink-500 cursor-pointer text-sm transition-colors"
            >
              Esqueceu sua senha?
            </span>
          </p>

          {/* Rodapé */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-xs mb-2">
              Copyright © 2024 NotatusMatch. NotatusMatch™ é uma marca registrada.
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <span className="text-gray-700 hover:text-gray-600 cursor-pointer transition-colors">
                Termos de Serviço
              </span>
              <span className="text-gray-700">|</span>
              <span className="text-gray-700 hover:text-gray-600 cursor-pointer transition-colors">
                Política de Privacidade
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Direita - Design com Slogans */}
      <div className="hidden lg:flex w-full lg:w-2/3 xl:w-3/4 relative overflow-hidden bg-[#0B1120] min-h-full">
        {/* Fundo com animação wave igual à Home */}
        <div className="absolute inset-0 animate-gradient-wave"></div>

        {/* Slogans */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-4 px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Conectando arte e paixão
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-6 max-w-lg px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Encontre o tatuador perfeito para eternizar sua história
          </p>
          <div className="flex flex-col items-start space-y-3 max-w-md">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <p className="text-base text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Portfólios diversos e profissionais
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <p className="text-base text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Agendamento fácil e seguro
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <p className="text-base text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Conexão direta com artistas
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
