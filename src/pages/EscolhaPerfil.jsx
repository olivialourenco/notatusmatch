import { useNavigate } from "react-router-dom"
import { User, Sparkles, ArrowLeft, CheckCircle2, Star, Calendar, Users } from "lucide-react"

function EscolhaPerfil() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text leading-tight pb-2">
            Escolha seu tipo de conta
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Você é tatuador ou cliente? Escolha abaixo para acessar ou criar sua conta e começar sua jornada na NotatusMatch.
          </p>
        </div>

        {/* Cards de Escolha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Card Tatuador */}
          <div className="group relative bg-[#111529] border border-gray-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
            {/* Gradiente de fundo no hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              {/* Ícone e Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Sparkles size={32} className="text-white" />
                </div>
                <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Popular
                  </span>
                </div>
              </div>

              {/* Título e Descrição */}
              <h2 className="text-2xl font-bold text-white mb-3">Sou Tatuador</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Crie seu perfil profissional, mostre seu portfólio e conecte-se com clientes que procuram sua arte.
              </p>

              {/* Benefícios */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-300">Portfólio ilimitado de trabalhos</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-300">Sistema de agendamento integrado</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-300">Avaliações e recomendações</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-300">Planos flexíveis para crescer</span>
                </div>
              </div>

              {/* Botão */}
              <button
                onClick={() => navigate("/cadastro-tatuador")}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 group-hover:scale-[1.02] duration-300"
              >
                Criar conta como Tatuador
              </button>
            </div>
          </div>

          {/* Card Cliente */}
          <div className="group relative bg-[#111529] border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
            {/* Gradiente de fundo no hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              {/* Ícone */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <User size={32} className="text-white" />
                </div>
              </div>

              {/* Título e Descrição */}
              <h2 className="text-2xl font-bold text-white mb-3">Sou Cliente</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Encontre o tatuador perfeito para sua próxima tatuagem, agende sua sessão e transforme sua ideia em arte.
              </p>

              {/* Benefícios */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">Busque por estilo e localização</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">Agendamento rápido e fácil</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">Perfis verificados e seguros</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">Avaliações e portfólios completos</span>
                </div>
              </div>

              {/* Botão */}
              <button
                onClick={() => navigate("/cadastro-cliente")}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 group-hover:scale-[1.02] duration-300"
              >
                Criar conta como Cliente
              </button>
            </div>
          </div>
        </div>

        {/* Seção de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">500+</h3>
            <p className="text-sm text-gray-400">Tatuadores cadastrados</p>
          </div>
          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Star size={24} className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">4.8</h3>
            <p className="text-sm text-gray-400">Avaliação média</p>
          </div>
          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
              <Calendar size={24} className="text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2.5k+</h3>
            <p className="text-sm text-gray-400">Agendamentos realizados</p>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111529] border border-gray-700 text-gray-300 rounded-xl font-semibold hover:border-gray-600 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </button>
        </div>

        {/* Link para Login */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Já tem uma conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:text-pink-300 cursor-pointer font-semibold transition-colors"
            >
              Faça login
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default EscolhaPerfil
