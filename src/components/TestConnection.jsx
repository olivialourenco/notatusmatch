import { useState } from 'react'
import { testConnection, discoverTables, testTable } from '../lib/testConnection'
import { Database, CheckCircle, XCircle, Loader, Search } from 'lucide-react'

function TestConnection() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState(null)
  const [tables, setTables] = useState([])
  const [manualTableName, setManualTableName] = useState('')
  const [testingManual, setTestingManual] = useState(false)
  const [manualResult, setManualResult] = useState(null)

  const handleTest = async () => {
    setTesting(true)
    setResult(null)
    setTables([])

    try {
      const connectionResult = await testConnection()
      setResult(connectionResult)

      // Se a conexão funcionou, tentar descobrir tabelas
      if (connectionResult.success) {
        const availableTables = await discoverTables()
        // Se retornar array de strings, converter para formato de objeto
        if (Array.isArray(availableTables) && availableTables.length > 0) {
          if (typeof availableTables[0] === 'string') {
            setTables(availableTables.map(name => ({ name, accessible: true })))
          } else {
            setTables(availableTables)
          }
        }
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Erro: ${error.message}`
      })
    } finally {
      setTesting(false)
    }
  }

  const handleTestManual = async () => {
    if (!manualTableName.trim()) return

    setTestingManual(true)
    setManualResult(null)

    try {
      const result = await testTable(manualTableName.trim())
      setManualResult(result)
      
      // Se encontrou, adicionar à lista de tabelas
      if (result.exists && result.accessible) {
        const alreadyExists = tables.some(t => (t.name || t) === manualTableName.trim())
        if (!alreadyExists) {
          setTables([...tables, {
            name: manualTableName.trim(),
            accessible: true,
            columns: result.columns || []
          }])
        }
      }
    } catch (error) {
      setManualResult({
        exists: false,
        accessible: false,
        error: error.message
      })
    } finally {
      setTestingManual(false)
    }
  }

  return (
    <div className="p-6 bg-[#111529] rounded-lg border border-gray-700 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Database className="text-pink-400" size={24} />
        <h2 className="text-xl font-bold text-white">Teste de Conexão Supabase</h2>
      </div>

      <button
        onClick={handleTest}
        disabled={testing}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {testing ? (
          <>
            <Loader className="animate-spin" size={20} />
            <span>Testando conexão...</span>
          </>
        ) : (
          <span>Testar Conexão</span>
        )}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded-lg border ${
          result.success 
            ? 'bg-green-500/10 border-green-500/50' 
            : 'bg-red-500/10 border-red-500/50'
        }`}>
          <div className="flex items-start gap-3">
            {result.success ? (
              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            )}
            <div className="flex-1">
              <p className={`font-semibold ${
                result.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.success ? '✅ Conexão estabelecida!' : '❌ Erro na conexão'}
              </p>
              <p className="text-gray-300 mt-1 text-sm">{result.message}</p>
              
              {result.table && (
                <div className="mt-3 p-3 bg-[#0B1120] rounded border border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Tabela encontrada: <span className="text-pink-400 font-mono">{result.table}</span></p>
                  {result.sampleData && (
                    <pre className="text-xs text-gray-300 overflow-auto">
                      {JSON.stringify(result.sampleData, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tables.length > 0 && (
        <div className="mt-4 p-4 bg-[#0B1120] rounded-lg border border-gray-700">
          <h3 className="text-white font-semibold mb-3">Tabelas encontradas no banco:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tables.map((table) => (
              <div
                key={table.name || table}
                className="p-3 bg-[#111529] rounded border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 font-mono text-sm font-semibold">
                    {table.name || table}
                  </span>
                  {table.accessible && (
                    <span className="text-xs text-green-400">✓ acessível</span>
                  )}
                </div>
                {table.columns && table.columns.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Colunas:</p>
                    <div className="flex flex-wrap gap-1">
                      {table.columns.slice(0, 5).map((col, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-[#0B1120] px-2 py-0.5 rounded">
                          {col}
                        </span>
                      ))}
                      {table.columns.length > 5 && (
                        <span className="text-xs text-gray-500">+{table.columns.length - 5}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {result?.suggestion && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg">
          <p className="text-blue-400 text-sm">{result.suggestion}</p>
        </div>
      )}

      {/* Seção para testar tabela manualmente */}
      <div className="mt-6 p-4 bg-[#0B1120] rounded-lg border border-gray-700">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Search size={18} className="text-pink-400" />
          Testar Tabela Específica
        </h3>
        <p className="text-gray-400 text-sm mb-3">
          Se você souber o nome de uma tabela, teste aqui:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualTableName}
            onChange={(e) => setManualTableName(e.target.value)}
            placeholder="Digite o nome da tabela (ex: usuarios, profiles)"
            className="flex-1 px-4 py-2 bg-[#111529] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && manualTableName.trim()) {
                handleTestManual()
              }
            }}
          />
          <button
            onClick={handleTestManual}
            disabled={!manualTableName.trim() || testingManual}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {testingManual ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              <Search size={16} />
            )}
            Testar
          </button>
        </div>

        {manualResult && (
          <div className={`mt-3 p-3 rounded-lg border ${
            manualResult.accessible
              ? 'bg-green-500/10 border-green-500/50'
              : manualResult.exists
              ? 'bg-yellow-500/10 border-yellow-500/50'
              : 'bg-red-500/10 border-red-500/50'
          }`}>
            {manualResult.accessible ? (
              <div>
                <p className="text-green-400 font-semibold text-sm mb-2">
                  ✅ Tabela "{manualTableName}" encontrada e acessível!
                </p>
                {manualResult.columns && manualResult.columns.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Colunas:</p>
                    <div className="flex flex-wrap gap-1">
                      {manualResult.columns.map((col, idx) => (
                        <span key={idx} className="text-xs text-gray-300 bg-[#111529] px-2 py-1 rounded">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {manualResult.sampleData && (
                  <div className="mt-2 p-2 bg-[#111529] rounded border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Exemplo de dados:</p>
                    <pre className="text-xs text-gray-300 overflow-auto max-h-32">
                      {JSON.stringify(manualResult.sampleData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : manualResult.exists ? (
              <p className="text-yellow-400 text-sm">
                ⚠️ Tabela existe mas não é acessível: {manualResult.error}
              </p>
            ) : (
              <p className="text-red-400 text-sm">
                ❌ {manualResult.error || 'Tabela não encontrada'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TestConnection

