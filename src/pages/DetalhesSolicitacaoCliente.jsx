import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Calendar, MapPin, Ruler, DollarSign, Image as ImageIcon, MessageSquare, Loader, CheckCircle, Clock, Eye } from 'lucide-react'
import { buscarSolicitacaoPorId } from '../lib/supabaseOrcamento'
import { getUsuarioLogado, ehCliente } from '../lib/auth'

function DetalhesSolicitacaoCliente() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [solicitacao, setSolicitacao] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se está logado como cliente
    const usuario = getUsuarioLogado()
    if (!usuario || !ehCliente()) {
      navigate('/login', {
        state: {
          message: 'Você precisa estar logado como cliente para ver esta solicitação'
        }
      })
      return
    }
    carregarSolicitacao()
  }, [id, navigate])

  const carregarSolicitacao = async () => {
    try {
      const { data, error } = await buscarSolicitacaoPorId(id)
      if (error) throw error
      
      // Verificar se a solicitação pertence ao cliente logado
      const usuario = getUsuarioLogado()
      if (data && data.cliente_id !== usuario.id) {
        navigate('/minhas-solicitacoes')
        return
      }
      
      setSolicitacao(data)
    } catch (error) {
      console.error('Erro ao carregar solicitação:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    const badges = {
      pendente: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: Clock, label: 'Pendente' },
      visto: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: Eye, label: 'Visto' },
      respondido: { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle, label: 'Respondido' }
    }
    const badge = badges[status] || badges.pendente
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        <Icon size={12} />
        {badge.label}
      </span>
    )
  }

  const formatarValor = (valor) => {
    if (!valor) return null
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-pink-400 mx-auto mb-4" size={48} />
          <p className="text-gray-400">Carregando detalhes...</p>
        </div>
      </main>
    )
  }

  if (!solicitacao) {
    return (
      <main className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Solicitação não encontrada</p>
          <button
            onClick={() => navigate('/minhas-solicitacoes')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Voltar para Minhas Solicitações
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Header */}
      <div className="bg-[#111529] border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => navigate('/minhas-solicitacoes')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Detalhes da Solicitação</h1>
            {getStatusBadge(solicitacao.status)}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Informações do Tatuador */}
        <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {solicitacao.tatuador?.foto_url ? (
              <img
                src={solicitacao.tatuador.foto_url}
                alt={solicitacao.tatuador.nome}
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center border-2 border-pink-500">
                <User size={32} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">{solicitacao.tatuador?.nome || 'Tatuador'}</h2>
              <p className="text-pink-400">{solicitacao.tatuador?.especialidade || 'Tatuador Profissional'}</p>
              {solicitacao.tatuador?.localizacao && (
                <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                  <MapPin size={14} />
                  {solicitacao.tatuador.localizacao}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} />
            <span>Solicitado em {formatarData(solicitacao.created_at)}</span>
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Descrição da Tatuagem</h3>
          <p className="text-gray-300 leading-relaxed">{solicitacao.descricao}</p>
        </div>

        {/* Detalhes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="text-pink-400" size={20} />
              <h3 className="text-sm text-gray-400">Parte do Corpo</h3>
            </div>
            <p className="text-white font-semibold">{solicitacao.parte_corpo}</p>
          </div>

          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Ruler className="text-purple-400" size={20} />
              <h3 className="text-sm text-gray-400">Tamanho</h3>
            </div>
            <p className="text-white font-semibold">{solicitacao.tamanho}</p>
          </div>
        </div>

        {/* Imagem de Referência */}
        {solicitacao.imagem_referencia && (
          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="text-pink-400" size={20} />
              Imagem de Referência
            </h3>
            <img
              src={solicitacao.imagem_referencia}
              alt="Referência"
              className="w-full max-w-2xl mx-auto rounded-lg border border-gray-700"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Resposta do Tatuador */}
        {solicitacao.status === 'respondido' && (solicitacao.mensagem_resposta || solicitacao.valor_estimado) ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
              <MessageSquare size={20} />
              Resposta do Tatuador
            </h3>
            {solicitacao.mensagem_resposta && (
              <p className="text-gray-300 mb-4 leading-relaxed">{solicitacao.mensagem_resposta}</p>
            )}
            {solicitacao.valor_estimado && (
              <div className="flex items-center gap-2">
                <DollarSign className="text-green-400" size={24} />
                <span className="text-3xl font-bold text-green-400">
                  {formatarValor(solicitacao.valor_estimado)}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock size={20} />
              <p className="font-semibold">Aguardando resposta do tatuador...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default DetalhesSolicitacaoCliente

