import { useNavigate } from "react-router-dom"

function EscolhaPerfil() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-[90vh] text-white px-6 text-center">
      <div className="bg-[#111529] p-10 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Escolha seu tipo de conta
        </h2>

        <p className="text-gray-300 mb-8">
          Você é tatuador ou cliente? Escolha abaixo para acessar ou criar sua conta.
        </p>

        {/* Botões lado a lado */}
        <div className="flex justify-center gap-6 mb-4">
          <button
            onClick={() => navigate("/cadastro-tatuador")}
            className="w-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:scale-110 transition-transform"
          >
            Sou Tatuador
          </button>

          <button
            onClick={() => navigate("/cadastro-cliente")}
            className="w-40 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:scale-110 transition-transform"
          >
            Sou Cliente
          </button>
        </div>

        {/* Botão Voltar - alinhado exatamente com os de cima */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-[calc(20rem+1.5rem)] bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-lg font-semibold hover:scale-110 hover:-translate-y-1 transition-transform"
          >
            Voltar
          </button>
        </div>
      </div>
    </main>
  )
}

export default EscolhaPerfil
