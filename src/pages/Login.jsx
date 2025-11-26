import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white text-center px-6">
      {/* Caixa de fundo */}
      <div className="bg-[#111529] p-10 rounded-2xl shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Faça seu Login
        </h2>

        <p className="text-gray-300 mb-8">
          Acesse sua conta para continuar explorando o NotatusMatch.
        </p>

        <form className="flex flex-col space-y-4 text-left">
          <label className="text-gray-300 text-sm">E-mail</label>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            className="p-3 rounded-md bg-[#0B1120] border border-gray-600 text-white focus:border-pink-500 focus:outline-none"
          />

          <label className="text-gray-300 text-sm">Senha</label>
          <input
            type="password"
            placeholder="********"
            className="p-3 rounded-md bg-[#0B1120] border border-gray-600 text-white focus:border-pink-500 focus:outline-none"
          />

          {/* Botão Entrar */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold mt-4 hover:scale-110 hover:-translate-y-1 transition-transform"
          >
            Entrar
          </button>

          {/* Botão Voltar */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg font-semibold mt-2 hover:scale-110 hover:-translate-y-1 transition-transform"
          >
            Voltar
          </button>
        </form>

        {/* Esqueci a senha */}
        <p className="text-gray-400 mt-6 text-sm">
          Esqueceu sua senha?{" "}
          <span className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors duration-200">
            Recuperar acesso
          </span>
        </p>
      </div>
    </main>
  )
}

export default Login
