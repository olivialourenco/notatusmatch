import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Mail, Phone, MapPin, Briefcase, Check, ArrowLeft } from "lucide-react"

function CadastroTatuador() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("gratuito")
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    experiencia: "",
    especialidades: [],
    bio: "",
  })

  const planos = [
    {
      id: "gratuito",
      nome: "Gratuito",
      preco: "R$ 0",
      periodo: "Sempre",
      recursos: [
        "Perfil básico na plataforma",
        "Até 10 fotos no portfólio",
        "Receber mensagens de clientes",
        "Visualizar perfil de clientes",
      ],
      destaque: false,
    },
    {
      id: "basico",
      nome: "Básico",
      preco: "R$ 49",
      periodo: "/mês",
      recursos: [
        "Tudo do plano Gratuito",
        "Portfólio ilimitado",
        "Sistema de agendamento",
        "Destaque nos resultados de busca",
        "Estatísticas de perfil",
        "Chat prioritário",
      ],
      destaque: true,
    },
    {
      id: "premium",
      nome: "Premium",
      preco: "R$ 99",
      periodo: "/mês",
      recursos: [
        "Tudo do plano Básico",
        "Destaque máximo nos resultados",
        "Análises avançadas",
        "Gestão completa de agenda",
        "Notificações personalizadas",
        "Suporte prioritário 24/7",
        "Badge de verificação",
      ],
      destaque: false,
    },
  ]

  const especialidadesOptions = [
    "Realismo",
    "Fine Line",
    "Old School",
    "Tribal",
    "Aquarela",
    "Geométrico",
    "Minimalista",
    "Blackwork",
    "Neo Traditional",
    "Japonês",
  ]

  const handleEspecialidadeToggle = (esp) => {
    setFormData((prev) => ({
      ...prev,
      especialidades: prev.especialidades.includes(esp)
        ? prev.especialidades.filter((e) => e !== esp)
        : [...prev.especialidades, esp],
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGoogleSignup = () => {
    // Implementar integração com Google OAuth
    console.log("Cadastro com Google")
  }

  return (
    <main className="min-h-screen flex bg-[#0B1120]">
      {/* Seção Esquerda - Formulário */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-[#0B1120] overflow-y-auto">
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

          <h2 className="text-3xl font-bold mb-2 text-white">
            Cadastro de Tatuador
          </h2>
          <p className="text-gray-400 mb-8">
            Crie seu perfil profissional e comece a receber agendamentos
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
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                className="w-full p-3 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
              />
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

            {/* Endereço */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Endereço</label>
              <div className="relative">
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Rua, número, complemento"
                  className="w-full p-3 pl-10 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                />
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
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

            {/* Experiência */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Anos de experiência</label>
              <div className="relative">
                <input
                  type="number"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  placeholder="Quantos anos você trabalha como tatuador?"
                  min="0"
                  className="w-full p-3 pl-10 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                />
                <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Especialidades</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {especialidadesOptions.map((esp) => (
                  <button
                    key={esp}
                    type="button"
                    onClick={() => handleEspecialidadeToggle(esp)}
                    className={`p-2 rounded-md text-sm border transition-colors ${
                      formData.especialidades.includes(esp)
                        ? "bg-pink-500/20 border-pink-500 text-pink-400"
                        : "bg-[#111529] border-gray-700 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    {esp}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Bio / Sobre você</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Conte um pouco sobre você e seu trabalho..."
                rows="4"
                className="w-full p-3 rounded-md bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
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
                Continuar
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

      {/* Seção Direita - Planos e Resumo */}
      <div className="hidden lg:flex w-1/3 bg-[#111529] p-8 overflow-y-auto">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-white mb-6">Escolha seu plano</h3>
          <p className="text-gray-400 mb-6 text-sm">
            Selecione o plano que melhor se adequa às suas necessidades
          </p>

          <div className="space-y-4">
            {planos.map((plano) => (
              <div
                key={plano.id}
                onClick={() => setSelectedPlan(plano.id)}
                className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPlan === plano.id
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-gray-700 bg-[#0B1120] hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{plano.nome}</h4>
                    <div className="flex items-baseline mt-1">
                      <span className="text-2xl font-bold text-white">{plano.preco}</span>
                      <span className="text-sm text-gray-400 ml-1">{plano.periodo}</span>
                    </div>
                  </div>
                  {selectedPlan === plano.id && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                  {selectedPlan !== plano.id && (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
                  )}
                </div>
                <ul className="space-y-2">
                  {plano.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-300">
                      <Check size={16} className="text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>
                {plano.destaque && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <span className="text-xs text-pink-400 font-semibold">MAIS POPULAR</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="mt-8 p-5 bg-[#0B1120] rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Resumo</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Plano selecionado:</span>
                <span className="text-white font-semibold">
                  {planos.find((p) => p.id === selectedPlan)?.nome}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Valor:</span>
                <span className="text-white font-semibold">
                  {planos.find((p) => p.id === selectedPlan)?.preco}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-700 mt-3">
                <div className="flex justify-between text-white font-semibold">
                  <span>Total:</span>
                  <span>{planos.find((p) => p.id === selectedPlan)?.preco}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CadastroTatuador
