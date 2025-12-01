import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Star, Award, Users, ArrowLeft, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react'
import { buscarUsuarioPorId } from '../lib/supabaseOrcamento'
import FormularioSolicitacao from '../components/FormularioSolicitacao'
import { estaLogado, ehCliente } from '../lib/auth'

function PerfilTatuador() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tatuador, setTatuador] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showFormulario, setShowFormulario] = useState(false)

  useEffect(() => {
    carregarTatuador()
  }, [id])

  const carregarTatuador = async () => {
    try {
      // Buscar tatuador no banco
      const { data, error } = await buscarUsuarioPorId(id)
      if (error) throw error
      
      if (data && data.tipo_usuario === 'tatuador') {
        setTatuador(data)
      } else {
        // Se não for tatuador, redirecionar
        navigate('/tatuadores')
      }
    } catch (error) {
      console.error('Erro ao carregar tatuador:', error)
      // Se der erro, redirecionar para lista de tatuadores
      navigate('/tatuadores')
    } finally {
      setLoading(false)
    }
  }

  const handleSolicitarOrcamento = () => {
    // Verificar se o usuário está logado como cliente
    if (!estaLogado() || !ehCliente()) {
      // Redirecionar para login com mensagem
      navigate('/login', { 
        state: { 
          message: 'Você precisa estar logado como cliente para solicitar um orçamento',
          redirectTo: `/tatuador/${id}`
        } 
      })
      return
    }
    setShowFormulario(true)
  }

  const handleSolicitacaoEnviada = () => {
    // Mostrar mensagem de sucesso
    alert('Solicitação enviada com sucesso!')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando perfil...</p>
        </div>
      </main>
    )
  }

  if (!tatuador) {
    return (
      <main className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Tatuador não encontrado</p>
          <button
            onClick={() => navigate('/tatuadores')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Voltar para Tatuadores
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Header com botão voltar */}
      <div className="bg-[#111529] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate('/tatuadores')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#111529] via-[#0B1120] to-[#111529] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
              <div className="flex-shrink-0">
              <div className="relative">
                {tatuador.foto_url ? (
                  <img
                    src={tatuador.foto_url}
                    alt={tatuador.nome}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pink-500 object-cover"
                    onError={(e) => {
                      e.target.src = `https://i.pravatar.cc/300?img=${tatuador.id?.slice(-2) || '1'}`
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pink-500 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {tatuador.nome?.charAt(0).toUpperCase() || 'T'}
                    </span>
                  </div>
                )}
                {tatuador.verificado && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#111529] flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Informações */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                {tatuador.nome}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-pink-400 text-lg font-medium">{tatuador.especialidade || 'Tatuador Profissional'}</p>
                {tatuador.estilo && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    {tatuador.estilo}
                  </span>
                )}
                {tatuador.verificado && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Verificado
                  </span>
                )}
                {tatuador.premium && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-medium">
                    Premium
                  </span>
                )}
              </div>
              {tatuador.localizacao && (
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <MapPin size={18} />
                  <span>{tatuador.localizacao}</span>
                </div>
              )}

              {/* Estatísticas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#111529] p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-2 text-yellow-400 mb-1">
                    <Star size={20} className="fill-yellow-400" />
                    <span className="text-2xl font-bold">{tatuador.nota || 4.8}</span>
                  </div>
                  <p className="text-sm text-gray-400">{tatuador.avaliacoes || 0} avaliações</p>
                </div>
                <div className="bg-[#111529] p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Award size={20} />
                    <span className="text-2xl font-bold">{tatuador.experiencia || '5+'}</span>
                  </div>
                  <p className="text-sm text-gray-400">Experiência</p>
                </div>
                <div className="bg-[#111529] p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-2 text-pink-400 mb-1">
                    <Users size={20} />
                    <span className="text-2xl font-bold">{tatuador.trabalhos || 200}+</span>
                  </div>
                  <p className="text-sm text-gray-400">Trabalhos</p>
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-2 mb-6">
                {tatuador.email && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={18} />
                    <span>{tatuador.email}</span>
                  </div>
                )}
                {tatuador.telefone && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={18} />
                    <span>{tatuador.telefone}</span>
                  </div>
                )}
              </div>

              {/* Botão Solicitar Orçamento */}
              <button
                onClick={handleSolicitarOrcamento}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder para imagens do portfolio */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square bg-[#111529] rounded-lg border border-gray-800 flex items-center justify-center"
            >
              <span className="text-gray-600 text-sm">Imagem {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Formulário */}
      {showFormulario && (
        <FormularioSolicitacao
          tatuadorId={id}
          onClose={() => setShowFormulario(false)}
          onSuccess={handleSolicitacaoEnviada}
        />
      )}
    </main>
  )
}

export default PerfilTatuador

