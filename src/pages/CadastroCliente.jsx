import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Mail, Phone, User, ArrowLeft } from "lucide-react"

function CadastroCliente() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cidade: "",
    estado: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGoogleSignup = () => {
    // Implementar integração com Google OAuth
    console.log("Cadastro com Google")
  }

  return (
    <main className="flex flex-col lg:flex-row bg-[#0B1120] flex-1">
      {/* Seção Esquerda - Formulário */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12 bg-[#0B1120] overflow-y-auto">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  1
                </div>
                <span className="ml-2 text-sm text-gray-400">Cadastro</span>
              </div>
              <div className="w-12 h-px bg-gray-700"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-400">Perfil</span>
              </div>
              <div className="w-12 h-px bg-gray-700"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 font-semibold">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-400">Confirmação</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
            Cadastro de Cliente
          </h2>
          <p className="text-gray-400 mb-8">
            Crie sua conta e encontre o tatuador perfeito para sua próxima tatuagem
          </p>

          {/* Botão Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold mb-6 flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Cadastrar-se com Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Formulário */}
          <form className="space-y-4">
            {/* Nome Completo */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Nome completo</label>
              <div className="relative">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className="w-full p-3 pl-10 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                />
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">E-mail</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seuemail@exemplo.com"
                    className="w-full p-3 pl-10 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Telefone</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    className="w-full p-3 pl-10 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                  />
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Mínimo 8 caracteres"
                className="w-full p-3 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Sua cidade"
                  className="w-full p-3 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[#111529] border border-gray-700 text-white focus:border-pink-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="BA">Bahia</option>
                  <option value="GO">Goiás</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111529] border border-gray-700 text-gray-300 rounded-xl font-semibold hover:border-gray-600 hover:text-white transition-all"
              >
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-500/30"
              >
                Criar conta
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Já tem uma conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors"
            >
              Entrar
            </span>
          </p>
        </div>
      </div>

      {/* Seção Direita - Informações */}
      <div className="hidden lg:flex w-full lg:w-1/3 bg-[#111529] p-6 lg:p-8 overflow-y-auto">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-white mb-6">Por que se cadastrar?</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-[#0B1120] rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-2">Encontre o artista ideal</h4>
              <p className="text-sm text-gray-400">
                Explore portfólios diversos e encontre o estilo perfeito para sua tatuagem
              </p>
            </div>

            <div className="p-4 bg-[#0B1120] rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-2">Agendamento fácil</h4>
              <p className="text-sm text-gray-400">
                Marque sua sessão diretamente pela plataforma, de forma rápida e segura
              </p>
            </div>

            <div className="p-4 bg-[#0B1120] rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-2">Comunicação direta</h4>
              <p className="text-sm text-gray-400">
                Converse diretamente com o tatuador, tire dúvidas e alinhe expectativas
              </p>
            </div>

            <div className="p-4 bg-[#0B1120] rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-2">Perfil personalizado</h4>
              <p className="text-sm text-gray-400">
                Crie seu perfil e compartilhe suas preferências e ideias de tatuagem
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CadastroCliente
