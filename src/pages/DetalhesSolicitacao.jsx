import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Calendar, MapPin, Ruler, DollarSign, Image as ImageIcon, Eye, CheckCircle, MessageSquare, Loader } from 'lucide-react'
import { buscarSolicitacaoPorId, atualizarStatusSolicitacao } from '../lib/supabaseOrcamento'

function DetalhesSolicitacao() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [solicitacao, setSolicitacao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [mostrarFormResposta, setMostrarFormResposta] = useState(false)
  const [resposta, setResposta] = useState({
    mensagem_resposta: '',
    valor_estimado: ''
  })

  useEffect(() => {
    carregarSolicitacao()
  }, [id])

  const carregarSolicitacao = async () => {
    try {
      const { data, error } = await buscarSolicitacaoPorId(id)
      if (error) throw error
      setSolicitacao(data)
      
      // Preencher resposta se já existir
      if (data) {
        setResposta({
          mensagem_resposta: data.mensagem_resposta || '',
          valor_estimado: data.valor_estimado ? `R$ ${data.valor_estimado}` : ''
        })
      }
    } catch (error) {
      console.error('Erro ao carregar solicitação:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMudarStatus = async (novoStatus) => {
    setUpdating(true)
    try {
      const { error } = await atualizarStatusSolicitacao(id, novoStatus)
      if (error) throw error
      
      // Recarregar dados
      carregarSolicitacao()
      alert(`Status atualizado para "${novoStatus}"`)
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    } finally {
      setUpdating(false)
    }
  }

  const handleSalvarResposta = async () => {
    setUpdating(true)
    try {
      const valorNumerico = resposta.valor_estimado
        ? parseFloat(resposta.valor_estimado.replace(/[^\d,.-]/g, '').replace(',', '.'))
        : null

      const { error } = await atualizarStatusSolicitacao(id, 'respondido', {
        mensagem_resposta: resposta.mensagem_resposta || null,
        valor_estimado: valorNumerico
      })

      if (error) throw error

      setMostrarFormResposta(false)
      carregarSolicitacao()
      alert('Resposta salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar resposta:', error)
      alert('Erro ao salvar resposta. Tente novamente.')
    } finally {
      setUpdating(false)
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
      pendente: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pendente' },
      visto: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Visto' },
      respondido: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Respondido' }
    }
    const badge = badges[status] || badges.pendente

    return (
      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    )
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
            onClick={() => navigate('/tatuador/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Voltar para Dashboard
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
            onClick={() => navigate('/tatuador/dashboard')}
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
        {/* Informações do Cliente */}
        <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {solicitacao.cliente?.foto_url ? (
              <img
                src={solicitacao.cliente.foto_url}
                alt={solicitacao.cliente.nome}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">{solicitacao.cliente?.nome || 'Cliente'}</h2>
              <p className="text-gray-400">{solicitacao.cliente?.email}</p>
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

          {solicitacao.orcamento_sugerido && (
            <div className="bg-[#111529] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="text-yellow-400" size={20} />
                <h3 className="text-sm text-gray-400">Orçamento Sugerido</h3>
              </div>
              <p className="text-white font-semibold">{solicitacao.orcamento_sugerido}</p>
            </div>
          )}
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
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <p className="text-center text-gray-500 text-sm mt-2" style={{ display: 'none' }}>
              Erro ao carregar imagem
            </p>
          </div>
        )}

        {/* Resposta do Tatuador */}
        {solicitacao.mensagem_resposta || solicitacao.valor_estimado ? (
          <div className="bg-[#111529] border border-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="text-green-400" size={20} />
              Sua Resposta
            </h3>
            {solicitacao.mensagem_resposta && (
              <p className="text-gray-300 mb-4">{solicitacao.mensagem_resposta}</p>
            )}
            {solicitacao.valor_estimado && (
              <p className="text-2xl font-bold text-green-400">
                R$ {parseFloat(solicitacao.valor_estimado).toFixed(2)}
              </p>
            )}
          </div>
        ) : null}

        {/* Ações */}
        <div className="bg-[#111529] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Ações</h3>
          <div className="space-y-3">
            {solicitacao.status === 'pendente' && (
              <button
                onClick={() => handleMudarStatus('visto')}
                disabled={updating}
                className="w-full px-6 py-3 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                Marcar como Visto
              </button>
            )}

            {solicitacao.status !== 'respondido' && (
              <>
                {!mostrarFormResposta ? (
                  <button
                    onClick={() => setMostrarFormResposta(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} />
                    Responder Solicitação
                  </button>
                ) : (
                  <div className="space-y-4 p-4 bg-[#0B1120] rounded-lg border border-gray-700">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Mensagem (opcional)</label>
                      <textarea
                        value={resposta.mensagem_resposta}
                        onChange={(e) => setResposta({ ...resposta, mensagem_resposta: e.target.value })}
                        placeholder="Deixe uma mensagem para o cliente..."
                        rows="3"
                        className="w-full p-3 rounded-lg bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Valor Estimado (opcional)</label>
                      <input
                        type="text"
                        value={resposta.valor_estimado}
                        onChange={(e) => setResposta({ ...resposta, valor_estimado: e.target.value })}
                        placeholder="Ex: R$ 500,00"
                        className="w-full p-3 rounded-lg bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setMostrarFormResposta(false)
                          setResposta({ mensagem_resposta: '', valor_estimado: '' })
                        }}
                        className="flex-1 px-6 py-3 bg-[#0B1120] border border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-gray-600 transition-all"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSalvarResposta}
                        disabled={updating}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {updating ? (
                          <>
                            <Loader className="animate-spin" size={18} />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            Salvar Resposta
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default DetalhesSolicitacao

