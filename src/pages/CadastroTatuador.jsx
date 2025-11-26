import { useNavigate } from "react-router-dom"

function CadastroTatuador() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-[110vh] text-white px-6  text-center">
      <h2 className="text-4xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Cadastro de Tatuador
      </h2>

      <p className="text-gray-300 max-w-md mb-8">
        Crie seu perfil profissional para se conectar com clientes, exibir seu portfólio e receber agendamentos.
      </p>

      {/* Caixa de cadastro */}
      <form className="bg-[#111529] p-8 rounded-xl w-full max-w-md shadow-lg space-y-4">
        <input
          type="text"
          placeholder="Nome completo"
          className="w-full p-3 rounded-md bg-[#0B1120] border border-gray-700 text-white focus:outline-none focus:border-pink-500"
        />
        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-3 rounded-md bg-[#0B1120] border border-gray-700 text-white focus:outline-none focus:border-pink-500"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded-md bg-[#0B1120] border border-gray-700 text-white focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          placeholder="Especialidade (ex: realismo, fine line...)"
          className="w-full p-3 rounded-md bg-[#0B1120] border border-gray-700 text-white focus:outline-none focus:border-pink-500"
        />

        {/* Botão Criar Conta */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-md font-semibold hover:scale-105 transition-transform"
        >
          Criar conta
        </button>

        {/* Botão Voltar */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 py-3 rounded-md font-semibold hover:scale-105 transition-transform mt-2"
        >
          Voltar
        </button>
      </form>

      {/* Link de login */}
        <p className="text-gray-400 mt-6">
        Já tem uma conta?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-pink-400 hover:underline cursor-pointer transition-colors duration-200"
        >
          Entrar
        </span>
      </p>
    </main>
  )
}

export default CadastroTatuador
