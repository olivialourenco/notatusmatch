import { Calendar, Sparkles, MessageCircle, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"


function Home() {
    const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center text-center text-white px-6">

      {/* HERO / TÍTULO PRINCIPAL */}
      <section className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text opacity-0 animate-fade-in">
          Conectando tatuadores e amantes da arte
        </h2>

        <p className="text-gray-300 max-w-lg mb-8 opacity-0 animate-fade-in animation-delay-300">
          Uma plataforma para artistas e clientes se encontrarem, agendarem e criarem novas histórias na pele.
          <br />
          NotatusMatch, a arte que conecta o encontro entre a marca eterna e o artista que a cria.
        </p>

        <button
          onClick={() => navigate("/escolha-perfil")}
          className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform group hover:scale-110 hover:-translate-y-1"
        >
          <span className="relative z-10">Começar Agora</span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        {/* 🔹 Link para quem já tem conta */}
        <p className="text-gray-400 mt-6">
          Já tem uma conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors duration-200 font-semibold"
          >
            Faça login
          </span>
        </p>
      </section>


      {/* SEÇÃO: COMO FUNCIONA */}
      <section className="mt-5 mb-14">
        <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Como funciona
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl">
          <div className="flex flex-col items-center text-gray-300">
            <Sparkles size={40} className="text-pink-400 mb-3" />
            <h4 className="text-lg font-semibold mb-2 text-white">Escolha o estilo</h4>
            <p className="text-sm text-gray-400">Explore estilos como realismo, minimalista, tribal e muito mais.</p>
          </div>

          <div className="flex flex-col items-center text-gray-300">
            <Calendar size={40} className="text-pink-400 mb-3" />
            <h4 className="text-lg font-semibold mb-2 text-white">Agende o horário</h4>
            <p className="text-sm text-gray-400">Escolha seu tatuador favorito e defina o melhor dia e hora.</p>
          </div>

          <div className="flex flex-col items-center text-gray-300">
            <MessageCircle size={40} className="text-pink-400 mb-3" />
            <h4 className="text-lg font-semibold mb-2 text-white">Converse com o artista</h4>
            <p className="text-sm text-gray-400">Troque ideias, envie referências e alinhe os detalhes da arte.</p>
          </div>

          <div className="flex flex-col items-center text-gray-300">
            <Star size={40} className="text-pink-400 mb-3" />
            <h4 className="text-lg font-semibold mb-2 text-white">Tatue com confiança</h4>
            <p className="text-sm text-gray-400">Artistas verificados e avaliações reais garantem sua segurança.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO: ARTISTAS EM DESTAQUE */}
      <section className="mt-20 mb-25"> 
        <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Artistas em destaque
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-[#111529] rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
            <img src="/img/rafa.jpg" alt="Rafa Tattoo" className="rounded-lg mb-4 w-full h-56 object-cover" />
            <h4 className="text-lg font-semibold text-white">Rafa Tattoo</h4>
            <p className="text-gray-400">Especialista em Realismo</p>
          </div>

          <div className="bg-[#111529] rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
            <img src="/img/luna.jpg" alt="Luna Ink" className="rounded-lg mb-4 w-full h-56 object-cover" />
            <h4 className="text-lg font-semibold text-white">Luna Ink</h4>
            <p className="text-gray-400">Minimalismo & Fine Line</p>
          </div>

          <div className="bg-[#111529] rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
            <img src="/img/diego.jpg" alt="Diego Black" className="rounded-lg mb-4 w-full h-56 object-cover" />
            <h4 className="text-lg font-semibold text-white">Diego Black</h4>
            <p className="text-gray-400">Tribal e Preto & Cinza</p>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
