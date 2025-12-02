import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Upload, Image as ImageIcon, Loader } from 'lucide-react'
import { uploadImage, criarSolicitacaoOrcamento } from '../lib/supabaseOrcamento'
import { getUsuarioLogado, ehCliente } from '../lib/auth'

function FormularioSolicitacao({ tatuadorId, onClose, onSuccess }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    descricao: '',
    parte_corpo: '',
    tamanho: '',
    imagem_referencia: null
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState(null)
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  useEffect(() => {
    // Verificar se o usuário está logado
    const user = getUsuarioLogado()
    if (!user || !ehCliente()) {
      // Se não estiver logado como cliente, fechar o formulário e redirecionar para login
      onClose()
      navigate('/login', { 
        state: { 
          message: 'Você precisa estar logado como cliente para solicitar um orçamento',
          redirectTo: window.location.pathname
        } 
      })
      return
    }
    setUsuarioLogado(user)
  }, [])

  const partesCorpo = [
    'Braço',
    'Antebraço',
    'Ombro',
    'Costas',
    'Peito',
    'Perna',
    'Panturrilha',
    'Pé',
    'Mão',
    'Pescoço',
    'Outro'
  ]

  const tamanhos = [
    'Pequeno (até 10cm)',
    'Médio (10-20cm)',
    'Grande (20-30cm)',
    'Muito Grande (acima de 30cm)'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Criar preview primeiro (para mostrar ao usuário)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)

      // Tentar fazer upload
      try {
        const imageUrl = await uploadImage(file)
        setFormData(prev => ({ ...prev, imagem_referencia: imageUrl }))
      } catch (uploadError) {
        console.error('Erro no upload:', uploadError)
        // Se o upload falhar, ainda permite usar a imagem localmente
        // O usuário pode enviar a solicitação sem a imagem no servidor
        // ou tentar novamente
        setError('Erro ao fazer upload da imagem. Você pode continuar sem a imagem ou tentar novamente.')
        // Limpar a referência da imagem para não tentar salvar URL inválida
        setFormData(prev => ({ ...prev, imagem_referencia: null }))
      }
    } catch (err) {
      console.error('Erro geral:', err)
      setError('Erro ao processar a imagem. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validações
    if (!formData.descricao.trim()) {
      setError('Por favor, descreva a tatuagem desejada')
      return
    }

    if (!formData.parte_corpo) {
      setError('Por favor, selecione a parte do corpo')
      return
    }

    if (!formData.tamanho) {
      setError('Por favor, selecione o tamanho aproximado')
      return
    }

    // Obter cliente_id do usuário logado
    if (!usuarioLogado || !ehCliente()) {
      setError('Você precisa estar logado como cliente para solicitar um orçamento')
      return
    }
    
    const clienteId = usuarioLogado.id

    setLoading(true)

    try {
      const { data, error: submitError } = await criarSolicitacaoOrcamento({
        cliente_id: clienteId,
        tatuador_id: tatuadorId,
        descricao: formData.descricao,
        parte_corpo: formData.parte_corpo,
        tamanho: formData.tamanho,
        imagem_referencia: formData.imagem_referencia || null,
        status: 'pendente'
      })

      if (submitError) {
        console.error('Erro detalhado:', submitError)
        // Mensagens de erro mais específicas
        if (submitError.code === '23503') {
          setError('Erro: Cliente ou tatuador não encontrado no banco de dados. Verifique se os usuários existem.')
        } else if (submitError.code === '23505') {
          setError('Erro: Já existe uma solicitação idêntica.')
        } else if (submitError.code === '42501') {
          setError('Erro de permissão. Verifique as políticas RLS do banco.')
        } else {
          setError(`Erro ao enviar solicitação: ${submitError.message || 'Tente novamente.'}`)
        }
        return
      }

      if (onSuccess) {
        onSuccess(data)
      }
      onClose()
    } catch (err) {
      console.error('Erro ao enviar solicitação:', err)
      setError(`Erro ao enviar solicitação: ${err.message || 'Tente novamente.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111529] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#111529] border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Solicitar Orçamento</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Descrição */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Descrição da Tatuagem <span className="text-red-400">*</span>
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Descreva a tatuagem que você deseja fazer..."
              rows="4"
              className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Parte do Corpo e Tamanho */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Parte do Corpo <span className="text-red-400">*</span>
              </label>
              <select
                name="parte_corpo"
                value={formData.parte_corpo}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none transition-colors"
                required
              >
                <option value="">Selecione...</option>
                {partesCorpo.map(parte => (
                  <option key={parte} value={parte}>{parte}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Tamanho Aproximado <span className="text-red-400">*</span>
              </label>
              <select
                name="tamanho"
                value={formData.tamanho}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none transition-colors"
                required
              >
                <option value="">Selecione...</option>
                {tamanhos.map(tamanho => (
                  <option key={tamanho} value={tamanho}>{tamanho}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload de Imagem */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Imagem de Referência (opcional)
            </label>
            <div className="space-y-3">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null)
                      setFormData(prev => ({ ...prev, imagem_referencia: null }))
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-pink-500 transition-colors bg-[#0B1120]">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                      <Loader className="animate-spin text-pink-400 mb-2" size={32} />
                    ) : (
                      <>
                        <Upload className="text-gray-400 mb-2" size={32} />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Clique para upload</span> ou arraste a imagem
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG ou GIF (máx. 5MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#0B1120] border border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-gray-600 hover:text-white transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Enviando...
                </>
              ) : (
                'Enviar Solicitação'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioSolicitacao

