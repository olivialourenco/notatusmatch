import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Eye, CheckCircle, Clock, Filter, ArrowRight, User, Image as ImageIcon } from 'lucide-react'
import { buscarSolicitacoesTatuador, contarSolicitacoesPendentes, atualizarStatusSolicitacao } from '../lib/supabaseOrcamento'

function DashboardTatuador() {
  const navigate = useNavigate()
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState(null) // null = todas, 'pendente', 'visto', 'respondido'
  const [contadorPendentes, setContadorPendentes] = useState(0)

  // TODO: Obter tatuadorId do usuário logado
  // Por enquanto, vamos usar um ID temporário
  const tatuadorId = '00000000-0000-0000-0000-000000000002' // Substituir com auth.uid() depois

  useEffect(() => {
    carregarSolicitacoes()
    carregarContador()
  }, [filtroStatus])

  const carregarSolicitacoes = async () => {
    setLoading(true)
    try {
      const { data, error } = await buscarSolicitacoesTatuador(tatuadorId, filtroStatus)
      if (error) throw error
      setSolicitacoes(data || [])
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error)
    } finally {
      setLoading(false)
    }
  }

  const carregarContador = async () => {
    try {
      const { count } = await contarSolicitacoesPendentes(tatuadorId)
      setContadorPendentes(count)
    } catch (error) {
      console.error('Erro ao carregar contador:', error)
    }
  }

  const handleMudarStatus = async (solicitacaoId, novoStatus) => {
    try {
      const { error } = await atualizarStatusSolicitacao(solicitacaoId, novoStatus)
      if (error) throw error
      
      // Recarregar lista
      carregarSolicitacoes()
      carregarContador()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pendente: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: Clock },
      visto: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: Eye },
      respondido: { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle }
    }
    const badge = badges[status] || badges.pendente
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
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

  const solicitacoesFiltradas = filtroStatus
    ? solicitacoes.filter(s => s.status === filtroStatus)
    : solicitacoes

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Header */}
      <div className="bg-[#111529] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Gerencie suas solicitações de orçamento</p>
        </div>
      </div>

      {/* Contador de Pendentes */}
      {contadorPendentes > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-pink-400 mb-2">{contadorPendentes}</p>
                <p className="text-gray-300">
                  {contadorPendentes === 1 ? 'Solicitação pendente' : 'Solicitações pendentes'}
                </p>
              </div>
              <button
                onClick={() => setFiltroStatus('pendente')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all flex items-center gap-2"
              >
                Ver Pendentes
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter size={20} className="text-gray-400" />
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando solicitações...</p>
          </div>
        ) : solicitacoesFiltradas.length === 0 ? (
          <div className="text-center py-12 bg-[#111529] rounded-xl border border-gray-800">
            <Calendar size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Nenhuma solicitação encontrada</h3>
            <p className="text-gray-400">
              {filtroStatus
                ? `Não há solicitações com status "${filtroStatus}"`
                : 'Você ainda não recebeu nenhuma solicitação de orçamento'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitacoesFiltradas.map((solicitacao) => (
              <div
                key={solicitacao.id}
                className="bg-[#111529] border border-gray-800 rounded-xl p-6 hover:border-pink-500/50 transition-all cursor-pointer"
                onClick={() => navigate(`/solicitacao/${solicitacao.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {solicitacao.cliente?.foto_url ? (
                        <img
                          src={solicitacao.cliente.foto_url}
                          alt={solicitacao.cliente.nome}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">{solicitacao.cliente?.nome || 'Cliente'}</h3>
                        <p className="text-sm text-gray-400">{formatarData(solicitacao.created_at)}</p>
                      </div>
                    </div>
                    {getStatusBadge(solicitacao.status)}
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-300 line-clamp-2">{solicitacao.descricao}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>📍 {solicitacao.parte_corpo}</span>
                    <span>📏 {solicitacao.tamanho}</span>
                  </div>
                  {solicitacao.imagem_referencia && (
                    <div className="flex items-center gap-2 text-sm text-pink-400">
                      <ImageIcon size={16} />
                      <span>Imagem de referência anexada</span>
                    </div>
                  )}
                </div>

                {/* Ações Rápidas */}
                <div className="flex gap-2 pt-4 border-t border-gray-800">
                  {solicitacao.status === 'pendente' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMudarStatus(solicitacao.id, 'visto')
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-500/30 transition-colors"
                    >
                      Marcar como Visto
                    </button>
                  )}
                  {solicitacao.status !== 'respondido' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMudarStatus(solicitacao.id, 'respondido')
                      }}
                      className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold hover:bg-green-500/30 transition-colors"
                    >
                      Marcar como Respondido
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default DashboardTatuador

