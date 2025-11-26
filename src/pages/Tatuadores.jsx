import { useState } from "react"
import { MapPin, Star } from "lucide-react"

function Tatuadores() {
  const [filtro, setFiltro] = useState({
    estilo: "",
    localizacao: "",
    nota: 0,
    especialidade: "",
  })

  const [notaTemp, setNotaTemp] = useState(0)
  const [aplicarFiltro, setAplicarFiltro] = useState(false)

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

  // Dados dos tatuadores (ajustado: especialidade = Fine Line, Old School etc)
  const tatuadores = [
    {
      id: 1,
      nome: "Rafael Santos",
      especialidade: "Realismo",
      estilo: "Retratos",
      localizacao: "São Paulo",
      nota: 4.8,
      imagem: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 2,
      nome: "Ana Costa",
      especialidade: "Fine Line",
      estilo: "Minimalismo",
      localizacao: "Curitiba",
      nota: 4.9,
      imagem: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      nome: "Lucas Oliveira",
      especialidade: "Old School",
      estilo: "Colorido",
      localizacao: "Rio de Janeiro",
      nota: 4.6,
      imagem: "https://i.pravatar.cc/150?img=8",
    },
  ]

  const filtrados = aplicarFiltro
    ? tatuadores.filter((t) =>
        (filtro.estilo === "" || t.estilo === filtro.estilo) &&
        (filtro.localizacao === "" || t.localizacao.includes(filtro.localizacao)) &&
        (filtro.especialidade === "" || t.especialidade === filtro.especialidade) &&
        (filtro.nota === 0 || t.nota >= filtro.nota)
      )
    : tatuadores

  return (
    <main className="min-h-screen bg-[#0B1120] text-white px-6 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Encontre o tatuador ideal 
      </h2>

      {/* FILTROS */}
      <div className="bg-[#111529] p-8 rounded-2xl shadow-lg mb-10 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">Filtrar por</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Estilo */}
          <select
            value={filtro.estilo}
            onChange={(e) => setFiltro({ ...filtro, estilo: e.target.value })}
            className="p-3 h-[46px] w-full rounded-md bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none"
          >
            <option value="">Selecione o estilo</option>
            <option value="Retratos">Retratos</option>
            <option value="Minimalismo">Minimalismo</option>
            <option value="Colorido">Colorido</option>
            <option value="Sombrado">Sombrado</option>
            <option value="Geométrico">Geométrico</option>
          </select>

          {/* Especialidade */}
          <select
            value={filtro.especialidade}
            onChange={(e) => setFiltro({ ...filtro, especialidade: e.target.value })}
            className="p-3 h-[46px] w-full rounded-md bg-[#0B1120] border border-gray-700 text-white focus:border-pink-500 focus:outline-none"
          >
            <option value="">Especialidade</option>
            <option value="Realismo">Realismo</option>
            <option value="Fine Line">Fine Line</option>
            <option value="Old School">Old School</option>
            <option value="Tribal">Tribal</option>
            <option value="Aquarela">Aquarela</option>
          </select>

          {/* Localização */}
          <div className="relative w-full">
            <div className="flex items-center border border-gray-700 bg-[#0B1120] rounded-md px-3 h-[46px] focus-within:border-pink-500">
              <MapPin size={18} className="text-pink-400 mr-2" />
              <input
                type="text"
                placeholder="Localização"
                value={filtro.localizacao}
                onChange={(e) => handleLocalizacao(e.target.value)}
                className="bg-transparent w-full focus:outline-none text-white"
              />
            </div>

            {sugestoes.length > 0 && (
              <ul className="absolute z-10 bg-[#111529] border border-gray-700 mt-1 w-full rounded-md shadow-lg">
                {sugestoes.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setFiltro({ ...filtro, localizacao: s })
                      setSugestoes([])
                    }}
                    className="p-2 cursor-pointer hover:bg-pink-500/20 transition"
                  >
                    {s}
                  </li>
                ))}
                <li
                  onClick={handleLocalizacaoAutomatica}
                  className="p-2 cursor-pointer text-pink-400 hover:bg-pink-500/20 transition"
                >
                  📍 Usar localização automática
                </li>
              </ul>
            )}
          </div>

          {/* Nota mínima */}
          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-400 mb-2">Nota mínima</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={notaTemp}
              onChange={(e) => setNotaTemp(parseFloat(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <span className="mt-1 text-pink-400 font-semibold">
              {notaTemp} ⭐
            </span>
          </div>
        </div>

        {/* BOTÃO APLICAR */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setFiltro({ ...filtro, nota: notaTemp })
              setAplicarFiltro(true)
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-3 rounded-lg font-semibold hover:scale-105 hover:opacity-90 transition-transform shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtrados.map((t) => (
          <div
            key={t.id}
            className="bg-[#111529] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer group"
          >
            <div className="relative">
              <img
                src={t.imagem}
                alt={t.nome}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-pink-500 object-cover group-hover:border-purple-400 transition-all"
              />
              <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.4)] opacity-0 group-hover:opacity-100 transition"></div>
            </div>
            <h3 className="text-xl font-semibold mb-1 text-center">{t.nome}</h3>

            {/* Exibe especialidade e estilo */}
            <p className="text-pink-400 text-sm mb-1 text-center">
              {t.especialidade}
            </p>
            <p className="text-gray-400 text-sm mb-2 text-center italic">
              {t.estilo}
            </p>

            <p className="flex items-center justify-center text-gray-400 text-sm mb-1">
              <MapPin size={14} className="mr-1 text-gray-500" /> {t.localizacao}
            </p>
            <p className="flex items-center justify-center text-yellow-400">
              <Star size={14} className="mr-1" /> {t.nota}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Tatuadores
