import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Star, Search, Filter, Award, Clock, Users, CheckCircle2 } from "lucide-react"

function Tatuadores() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState({
    estilo: "",
    localizacao: "",
    nota: 0,
    especialidade: "",
  })

  const [notaTemp, setNotaTemp] = useState(0)
  const [aplicarFiltro, setAplicarFiltro] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [sugestoes, setSugestoes] = useState([])
  const todasCidades = [
    "São Paulo", "Santo André", "São Bernardo do Campo",
    "São Caetano do Sul", "Campinas", "Curitiba", "Rio de Janeiro", "Belo Horizonte"
  ]

  const handleLocalizacao = (valor) => {
    setFiltro({ ...filtro, localizacao: valor })
    if (valor.length > 0) {
      setSugestoes(
        todasCidades.filter((c) => c.toLowerCase().includes(valor.toLowerCase()))
      )
    } else {
      setSugestoes([])
    }
  }

  const handleLocalizacaoAutomatica = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo navegador.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setFiltro({ ...filtro, localizacao: `(${latitude.toFixed(3)}, ${longitude.toFixed(3)})` })
      },
      () => {
        alert("Não foi possível obter a localização automática.")
      }
    )
  }

  // Dados dos tatuadores expandidos
  const tatuadores = [
    {
      id: '00000000-0000-0000-0000-000000000002',
      nome: "Rafael Santos",
      especialidade: "Realismo",
      estilo: "Retratos",
      localizacao: "São Paulo, SP",
      nota: 4.8,
      avaliacoes: 127,
      experiencia: "8 anos",
      trabalhos: 450,
      imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      verificado: true,
      premium: true,
      portfolio: [
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
      ]
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      nome: "Ana Costa",
      especialidade: "Fine Line",
      estilo: "Minimalismo",
      localizacao: "Curitiba, PR",
      nota: 4.9,
      avaliacoes: 203,
      experiencia: "6 anos",
      trabalhos: 320,
      imagem: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      verificado: true,
      premium: false,
      portfolio: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576075796033-848c2a5d3696?w=300&h=300&fit=crop"
      ]
    },
    {
      id: '00000000-0000-0000-0000-000000000004',
      nome: "Lucas Oliveira",
      especialidade: "Old School",
      estilo: "Colorido",
      localizacao: "Rio de Janeiro, RJ",
      nota: 4.6,
      avaliacoes: 89,
      experiencia: "5 anos",
      trabalhos: 280,
      imagem: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      verificado: true,
      premium: true,
      portfolio: [
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
      ]
    },
    {
      id: '00000000-0000-0000-0000-000000000005',
      nome: "Mariana Silva",
      especialidade: "Aquarela",
      estilo: "Colorido",
      localizacao: "Belo Horizonte, MG",
      nota: 4.7,
      avaliacoes: 156,
      experiencia: "7 anos",
      trabalhos: 380,
      imagem: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      verificado: true,
      premium: false,
      portfolio: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576075796033-848c2a5d3696?w=300&h=300&fit=crop"
      ]
    },
    {
      id: '00000000-0000-0000-0000-000000000006',
      nome: "Diego Black",
      especialidade: "Tribal",
      estilo: "Preto & Cinza",
      localizacao: "São Paulo, SP",
      nota: 4.8,
      avaliacoes: 198,
      experiencia: "10 anos",
      trabalhos: 520,
      imagem: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      verificado: true,
      premium: true,
      portfolio: [
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
      ]
    },
    {
      id: '00000000-0000-0000-0000-000000000007',
      nome: "Julia Martins",
      especialidade: "Geometric",
      estilo: "Minimalismo",
      localizacao: "Porto Alegre, RS",
      nota: 4.9,
      avaliacoes: 142,
      experiencia: "4 anos",
      trabalhos: 210,
      imagem: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      verificado: true,
      premium: false,
      portfolio: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576075796033-848c2a5d3696?w=300&h=300&fit=crop"
      ]
    },
  ]

  const filtrados = aplicarFiltro
    ? tatuadores.filter((t) => {
        const matchEstilo = filtro.estilo === "" || t.estilo === filtro.estilo
        const matchLocalizacao = filtro.localizacao === "" || t.localizacao.toLowerCase().includes(filtro.localizacao.toLowerCase())
        const matchEspecialidade = filtro.especialidade === "" || t.especialidade === filtro.especialidade
        const matchNota = filtro.nota === 0 || t.nota >= filtro.nota
        const matchSearch = searchQuery === "" || t.nome.toLowerCase().includes(searchQuery.toLowerCase()) || t.especialidade.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchEstilo && matchLocalizacao && matchEspecialidade && matchNota && matchSearch
      })
    : tatuadores.filter((t) => {
        const matchSearch = searchQuery === "" || t.nome.toLowerCase().includes(searchQuery.toLowerCase()) || t.especialidade.toLowerCase().includes(searchQuery.toLowerCase())
        return matchSearch
      })

  const limparFiltros = () => {
    setFiltro({ estilo: "", localizacao: "", nota: 0, especialidade: "" })
    setNotaTemp(0)
    setAplicarFiltro(false)
    setSearchQuery("")
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#111529] via-[#0B1120] to-[#111529] py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text animate-gradient">
            Encontre o Tatuador Ideal
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 md:mb-8">
            Conecte-se com artistas profissionais verificados e transforme sua ideia em arte permanente
          </p>

          {/* Barra de Busca */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou especialidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#111529] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
            </div>
          </div>

          {/* Botão Filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111529] border border-gray-700 rounded-xl hover:border-pink-500 transition-colors"
          >
            <Filter size={18} />
            <span>Filtros</span>
            {aplicarFiltro && (
              <span className="ml-2 px-2 py-0.5 bg-pink-500 rounded-full text-xs font-semibold">
                Ativo
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filtros Expandidos */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 md:mb-8">
          <div className="bg-[#111529] border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Filtros de Busca</h3>
              <button
                onClick={limparFiltros}
                className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
              >
                Limpar tudo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Estilo */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Estilo</label>
                <select
                  value={filtro.estilo}
                  onChange={(e) => setFiltro({ ...filtro, estilo: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                >
                  <option value="">Todos os estilos</option>
                  <option value="Retratos">Retratos</option>
                  <option value="Minimalismo">Minimalismo</option>
                  <option value="Colorido">Colorido</option>
                  <option value="Sombrado">Sombrado</option>
                  <option value="Geométrico">Geométrico</option>
                </select>
              </div>

              {/* Especialidade */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Especialidade</label>
                <select
                  value={filtro.especialidade}
                  onChange={(e) => setFiltro({ ...filtro, especialidade: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                >
                  <option value="">Todas as especialidades</option>
                  <option value="Realismo">Realismo</option>
                  <option value="Fine Line">Fine Line</option>
                  <option value="Old School">Old School</option>
                  <option value="Tribal">Tribal</option>
                  <option value="Aquarela">Aquarela</option>
                  <option value="Geometric">Geometric</option>
                </select>
              </div>

              {/* Localização */}
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-2">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                  <input
                    type="text"
                    placeholder="Cidade ou estado"
                    value={filtro.localizacao}
                    onChange={(e) => handleLocalizacao(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-[#0B1120] border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                  />
                </div>

                {sugestoes.length > 0 && (
                  <ul className="absolute z-10 bg-[#111529] border border-gray-700 mt-1 w-full rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {sugestoes.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setFiltro({ ...filtro, localizacao: s })
                          setSugestoes([])
                        }}
                        className="p-3 cursor-pointer hover:bg-pink-500/10 transition-colors text-sm"
                      >
                        {s}
                      </li>
                    ))}
                    <li
                      onClick={handleLocalizacaoAutomatica}
                      className="p-3 cursor-pointer text-pink-400 hover:bg-pink-500/10 transition-colors text-sm border-t border-gray-700"
                    >
                      📍 Usar localização automática
                    </li>
                  </ul>
                )}
              </div>

              {/* Nota mínima */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Avaliação mínima: {notaTemp > 0 ? `${notaTemp.toFixed(1)} ⭐` : "Qualquer"}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={notaTemp}
                  onChange={(e) => setNotaTemp(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Botão Aplicar */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setFiltro({ ...filtro, nota: notaTemp })
                  setAplicarFiltro(true)
                  setShowFilters(false)
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resultados */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            {filtrados.length} {filtrados.length === 1 ? "tatuador encontrado" : "tatuadores encontrados"}
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtrados.map((t) => {
            // Apenas o Rafael Santos pode ser clicado
            const isRafaelSantos = t.id === '00000000-0000-0000-0000-000000000002'
            
            return (
            <div
              key={t.id}
              onClick={isRafaelSantos ? () => navigate(`/tatuador/${t.id}`) : undefined}
              className={`group bg-[#111529] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 ${
                isRafaelSantos 
                  ? 'hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 cursor-pointer' 
                  : 'cursor-default'
              }`}
            >
              {/* Imagem do Portfolio */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <img
                  src={t.portfolio[0]}
                  alt={`Portfolio ${t.nome}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111529] via-transparent to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {t.verificado && (
                    <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                      <CheckCircle2 size={12} />
                      <span>Verificado</span>
                    </div>
                  )}
                  {t.premium && (
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                      Premium
                    </div>
                  )}
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                {/* Avatar e Nome */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={t.imagem}
                      alt={t.nome}
                      className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover"
                      onError={(e) => {
                        e.target.src = `https://i.pravatar.cc/150?img=${t.id}`
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#111529]"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{t.nome}</h3>
                    <p className="text-pink-400 text-sm font-medium">{t.especialidade}</p>
                  </div>
                </div>

                {/* Estilo */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                    {t.estilo}
                  </span>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                      <Star size={16} className="fill-yellow-400" />
                      <span className="font-bold">{t.nota}</span>
                    </div>
                    <p className="text-xs text-gray-400">{t.avaliacoes} avaliações</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                      <Award size={16} />
                      <span className="font-bold">{t.experiencia}</span>
                    </div>
                    <p className="text-xs text-gray-400">Experiência</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-pink-400 mb-1">
                      <Users size={16} />
                      <span className="font-bold">{t.trabalhos}+</span>
                    </div>
                    <p className="text-xs text-gray-400">Trabalhos</p>
                  </div>
                </div>

                {/* Localização */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin size={14} />
                  <span>{t.localizacao}</span>
                </div>

                {/* Botão Ver Perfil */}
                <button 
                  onClick={isRafaelSantos ? () => navigate(`/tatuador/${t.id}`) : (e) => {
                    e.stopPropagation()
                    // Não faz nada para os outros cards
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-pink-500/20"
                >
                  Ver Perfil Completo
                </button>
              </div>
            </div>
            )
          })}
        </div>

        {/* Mensagem quando não há resultados */}
        {filtrados.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Nenhum tatuador encontrado</h3>
              <p className="text-gray-400 mb-6">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <button
                onClick={limparFiltros}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Tatuadores
