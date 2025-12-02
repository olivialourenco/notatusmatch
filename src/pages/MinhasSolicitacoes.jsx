import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Ruler, DollarSign, Image as ImageIcon, MessageSquare, ArrowRight, User, Loader, CheckCircle, Clock, Eye } from 'lucide-react'
import { buscarSolicitacoesCliente } from '../lib/supabaseOrcamento'
import { getUsuarioLogado, ehCliente } from '../lib/auth'

function MinhasSolicitacoes() {
  const navigate = useNavigate()
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState(null)
  const [clienteId, setClienteId] = useState(null)

  useEffect(() => {
    // Verificar se está logado como cliente
    const usuario = getUsuarioLogado()
    if (!usuario || !ehCliente()) {
      navigate('/login', {
        state: {
          message: 'Você precisa estar logado como cliente para ver suas solicitações'
        }
      })
      return
    }
    setClienteId(usuario.id)
  }, [navigate])

  useEffect(() => {
    if (clienteId) {
      carregarSolicitacoes()
    }
  }, [clienteId, filtroStatus])

  const carregarSolicitacoes = async () => {
    if (!clienteId) return
    setLoading(true)
    try {
      const { data, error } = await buscarSolicitacoesCliente(clienteId, filtroStatus)
      if (error) throw error
      setSolicitacoes(data || [])
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error)
      setSolicitacoes([])
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

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Header */}
      <div className="bg-[#111529] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold mb-2">Minhas Solicitações</h1>
          <p className="text-gray-400">Acompanhe suas solicitações de orçamento</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setFiltroStatus(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filtroStatus === null
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'bg-[#111529] border border-gray-700 text-gray-300 hover:border-pink-500'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltroStatus('pendente')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filtroStatus === 'pendente'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'bg-[#111529] border border-gray-700 text-gray-300 hover:border-pink-500'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFiltroStatus('visto')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filtroStatus === 'visto'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'bg-[#111529] border border-gray-700 text-gray-300 hover:border-pink-500'
            }`}
          >
            Vistas
          </button>
          <button
            onClick={() => setFiltroStatus('respondido')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filtroStatus === 'respondido'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'bg-[#111529] border border-gray-700 text-gray-300 hover:border-pink-500'
            }`}
          >
            Respondidas
          </button>
        </div>
      </div>

      {/* Lista de Solicitações */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader className="animate-spin text-pink-400 mx-auto mb-4" size={48} />
            <p className="text-gray-400">Carregando solicitações...</p>
          </div>
        ) : solicitacoes.length === 0 ? (
          <div className="text-center py-16 bg-[#111529] rounded-xl border border-gray-800">
            <Calendar size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Nenhuma solicitação encontrada</h3>
            <p className="text-gray-400 mb-6">
              {filtroStatus
                ? `Não há solicitações com status "${filtroStatus}"`
                : 'Você ainda não fez nenhuma solicitação de orçamento'}
            </p>
            <button
              onClick={() => navigate('/tatuadores')}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Buscar Tatuadores
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitacoes.map((solicitacao) => (
              <div
                key={solicitacao.id}
                className="bg-[#111529] border border-gray-800 rounded-xl p-6 hover:border-pink-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar do Tatuador */}
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
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {solicitacao.tatuador?.nome || 'Tatuador'}
                      </h3>
                      <p className="text-pink-400 text-sm mb-2">
                        {solicitacao.tatuador?.especialidade || 'Tatuador Profissional'}
                      </p>
                      {solicitacao.tatuador?.localizacao && (
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <MapPin size={14} />
                          {solicitacao.tatuador.localizacao}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(solicitacao.status)}
                    <button
                      onClick={() => navigate(`/minhas-solicitacoes/${solicitacao.id}`)}
                      className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 text-sm"
                    >
                      Ver Detalhes
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-gray-300 mb-4 line-clamp-2">{solicitacao.descricao}</p>

                {/* Detalhes */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={16} />
                    <span>{solicitacao.parte_corpo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Ruler size={16} />
                    <span>{solicitacao.tamanho}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar size={16} />
                    <span>{formatarData(solicitacao.created_at)}</span>
                  </div>
                </div>

                {/* Resposta do Tatuador */}
                {solicitacao.status === 'respondido' && (solicitacao.mensagem_resposta || solicitacao.valor_estimado) && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare size={18} />
                      Resposta do Tatuador
                    </h4>
                    {solicitacao.mensagem_resposta && (
                      <p className="text-gray-300 mb-3">{solicitacao.mensagem_resposta}</p>
                    )}
                    {solicitacao.valor_estimado && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-green-400" size={20} />
                        <span className="text-2xl font-bold text-green-400">
                          {formatarValor(solicitacao.valor_estimado)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Imagem de Referência */}
                {solicitacao.imagem_referencia && (
                  <div className="flex items-center gap-2 text-pink-400 text-sm">
                    <ImageIcon size={16} />
                    <span>Imagem de referência anexada</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default MinhasSolicitacoes

