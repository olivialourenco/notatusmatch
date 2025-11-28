import { Heart, Users, Target, Award, Sparkles, Shield } from "lucide-react"

function Sobre() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-[#111529] via-[#0B1120] to-[#111529]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Sobre o NotatusMatch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            O NotatusMatch nasceu para conectar tatuadores e amantes da arte da tatuagem,
            criando uma comunidade onde criatividade e confiança se encontram.
          </p>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-20 px-6 bg-[#111529]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Nossa Missão</h2>
              <p className="text-gray-400 leading-relaxed">
                Facilitar o encontro entre tatuadores talentosos e pessoas que buscam transformar suas ideias em arte permanente na pele. Promovemos um ambiente seguro, profissional e inspirador para toda a comunidade de tatuagem.
              </p>
            </div>

            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Nossa Visão</h2>
              <p className="text-gray-400 leading-relaxed">
                Ser a principal plataforma de conexão entre tatuadores e clientes no Brasil, reconhecida pela qualidade, segurança e inovação no mercado de tatuagens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Os princípios que guiam tudo o que fazemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111529] border border-gray-800 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Shield size={28} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Segurança</h3>
              <p className="text-gray-400">
                Todos os tatuadores são verificados e possuem perfis completos com avaliações reais.
              </p>
            </div>

            <div className="bg-[#111529] border border-gray-800 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
                <Award size={28} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Qualidade</h3>
              <p className="text-gray-400">
                Conectamos apenas com profissionais experientes e especializados em diversos estilos.
              </p>
            </div>

            <div className="bg-[#111529] border border-gray-800 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-6">
                <Heart size={28} className="text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Comunidade</h3>
              <p className="text-gray-400">
                Construímos uma comunidade unida onde artistas e clientes se apoiam mutuamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 px-6 bg-[#111529]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Nossa História
            </h2>
          </div>

          <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-8 md:p-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              O NotatusMatch foi criado com a paixão de conectar pessoas através da arte da tatuagem. 
              Percebemos que muitos tatuadores talentosos tinham dificuldade em encontrar clientes, 
              enquanto pessoas interessadas em fazer tatuagens não sabiam onde encontrar o artista ideal.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Com isso em mente, desenvolvemos uma plataforma completa que facilita essa conexão, 
              oferecendo ferramentas para busca, agendamento e comunicação direta entre tatuadores e clientes.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Hoje, somos uma comunidade crescente de artistas e amantes da tatuagem, unidos pela 
              paixão de transformar ideias em arte permanente.
            </p>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Números que Nos Orgulham
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                500+
              </div>
              <p className="text-gray-400">Tatuadores Cadastrados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                2.5k+
              </div>
              <p className="text-gray-400">Agendamentos Realizados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                4.8
              </div>
              <p className="text-gray-400">Avaliação Média</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                98%
              </div>
              <p className="text-gray-400">Taxa de Satisfação</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Sobre
