import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react"

function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementar envio do formulário
    console.log("Formulário enviado:", formData)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    })
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[#111529] via-[#0B1120] to-[#111529]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para você!
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações de Contato */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#111529] border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Informações de Contato</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">E-mail</h3>
                      <p className="text-gray-400 text-sm">contato@notatusmatch.com</p>
                      <p className="text-gray-400 text-sm">suporte@notatusmatch.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Telefone</h3>
                      <p className="text-gray-400 text-sm">(11) 9999-9999</p>
                      <p className="text-gray-400 text-sm">(11) 8888-8888</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Endereço</h3>
                      <p className="text-gray-400 text-sm">São Paulo, SP</p>
                      <p className="text-gray-400 text-sm">Brasil</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Horário de Atendimento</h3>
                      <p className="text-gray-400 text-sm">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-gray-400 text-sm">Sábado: 9h às 13h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais ou Informações Adicionais */}
              <div className="bg-[#111529] border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Redes Sociais</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Siga-nos nas redes sociais para ficar por dentro de novidades e dicas sobre tatuagens.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-semibold">f</span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-semibold">@</span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-semibold">in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <div className="bg-[#111529] border border-gray-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Envie sua Mensagem</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Nome completo</label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome"
                        className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-2">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seuemail@exemplo.com"
                        className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Telefone</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Assunto</label>
                      <select
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="problema">Problema Técnico</option>
                        <option value="parceria">Parceria</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Mensagem</label>
                    <textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Escreva sua mensagem aqui..."
                      className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contato

