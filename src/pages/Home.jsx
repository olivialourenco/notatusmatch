import { Calendar, Sparkles, MessageCircle, Star, ArrowRight, CheckCircle2, Users, Award, Shield, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background Gradient com animação wave */}
        <div className="absolute inset-0 animate-gradient-wave"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text animate-gradient">
            Conectando Tatuadores e Amantes da Arte
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            Uma plataforma profissional para artistas e clientes se encontrarem, agendarem e criarem novas histórias na pele.
          </p>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            NotatusMatch, a arte que conecta o encontro entre a marca eterna e o artista que a cria.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => navigate("/escolha-perfil")}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Começar Agora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            <button
              onClick={() => navigate("/tatuadores")}
              className="px-8 py-4 bg-[#111529] border border-gray-700 text-white rounded-xl font-semibold text-lg hover:border-pink-500/50 hover:bg-[#1a1f3a] transition-all"
            >
              Explorar Tatuadores
            </button>
          </div>

          <p className="text-gray-400">
            Já tem uma conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors font-semibold"
            >
              Faça login
            </span>
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-6 bg-[#111529]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Um processo simples e intuitivo para conectar você ao tatuador perfeito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-[#111529] border border-gray-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Escolha o Estilo</h3>
              <p className="text-gray-400 leading-relaxed">
                Explore estilos diversos como realismo, minimalista, tribal, old school e muito mais.
              </p>
            </div>

            <div className="group bg-[#111529] border border-gray-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Agende o Horário</h3>
              <p className="text-gray-400 leading-relaxed">
                Escolha seu tatuador favorito e defina o melhor dia e hora para sua sessão.
              </p>
            </div>

            <div className="group bg-[#111529] border border-gray-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Converse com o Artista</h3>
              <p className="text-gray-400 leading-relaxed">
                Troque ideias, envie referências e alinhe todos os detalhes da sua arte.
              </p>
            </div>

            <div className="group bg-[#111529] border border-gray-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">4. Tatue com Confiança</h3>
              <p className="text-gray-400 leading-relaxed">
                Artistas verificados e avaliações reais garantem sua segurança e satisfação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTATÍSTICAS */}
      <section className="py-16 px-6 bg-[#0B1120] border-y border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                500+
              </div>
              <p className="text-gray-400 text-sm md:text-base">Tatuadores Cadastrados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                4.8
              </div>
              <p className="text-gray-400 text-sm md:text-base">Avaliação Média</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                2.5k+
              </div>
              <p className="text-gray-400 text-sm md:text-base">Agendamentos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                98%
              </div>
              <p className="text-gray-400 text-sm md:text-base">Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 px-6 bg-[#111529]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Por Que Escolher a NotatusMatch?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A plataforma mais completa para conectar tatuadores e clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
                <Shield size={28} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Seguro</h3>
              <p className="text-gray-400">
                Todos os tatuadores são verificados e possuem perfis completos com avaliações reais de clientes.
              </p>
            </div>

            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Award size={28} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Artistas Profissionais</h3>
              <p className="text-gray-400">
                Conecte-se apenas com tatuadores experientes e especializados em diversos estilos.
              </p>
            </div>

            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                <TrendingUp size={28} className="text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fácil e Rápido</h3>
              <p className="text-gray-400">
                Sistema intuitivo de busca, agendamento e comunicação direta com os artistas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTISTAS EM DESTAQUE */}
      <section className="py-20 px-6 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Artistas em Destaque
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Conheça alguns dos melhores profissionais da nossa plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-[#111529] border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-pink-500/10">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format" 
                  alt="Rafa Tattoo - Tatuador especialista em Realismo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/400?img=12"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111529] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    <span>Verificado</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">Rafa Tattoo</h4>
                <p className="text-pink-400 font-medium mb-1">Especialista em Realismo</p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Star size={16} className="fill-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(127 avaliações)</span>
                </div>
              </div>
            </div>

            <div className="group bg-[#111529] border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-pink-500/10">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&auto=format" 
                  alt="Luna Ink - Tatuadora especialista em Minimalismo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/400?img=47"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111529] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    <span>Verificado</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">Luna Ink</h4>
                <p className="text-pink-400 font-medium mb-1">Minimalismo & Fine Line</p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Star size={16} className="fill-yellow-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-gray-500">(203 avaliações)</span>
                </div>
              </div>
            </div>

            <div className="group bg-[#111529] border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-pink-500/10">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format" 
                  alt="Diego Black - Tatuador especialista em Tribal" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/400?img=33"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111529] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    <span>Verificado</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">Diego Black</h4>
                <p className="text-pink-400 font-medium mb-1">Tribal e Preto & Cinza</p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Star size={16} className="fill-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(198 avaliações)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/tatuadores")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
            >
              Ver Todos os Tatuadores
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
