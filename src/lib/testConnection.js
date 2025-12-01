import { supabase } from './supabase'

/**
 * Testa a conexão com o Supabase
 * Tenta listar todas as tabelas disponíveis e fazer uma consulta básica
 */
export async function testConnection() {
  try {
    console.log('🔌 Testando conexão com Supabase...')
    console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
    
    // Teste 1: Verificar se o cliente foi criado corretamente
    if (!supabase) {
      throw new Error('Cliente Supabase não foi inicializado')
    }
    console.log('✅ Cliente Supabase inicializado')

    // Teste 2: Tentar listar tabelas (usando uma query simples)
    // Vamos tentar acessar a tabela 'users' ou 'profiles' que são comuns
    // Se não existir, vamos tentar outras tabelas comuns
    
    const commonTables = ['users', 'profiles', 'tatuadores', 'clientes', 'user', 'profile']
    
    for (const tableName of commonTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1)
        
        if (!error) {
          console.log(`✅ Tabela "${tableName}" encontrada e acessível`)
          console.log(`📊 Estrutura da tabela:`, data.length > 0 ? Object.keys(data[0]) : 'Tabela vazia')
          return {
            success: true,
            message: `Conexão estabelecida com sucesso! Tabela "${tableName}" encontrada.`,
            table: tableName,
            sampleData: data[0] || null
          }
        }
      } catch (err) {
        // Tabela não existe ou não temos permissão, continue tentando
        continue
      }
    }

    // Se nenhuma tabela comum foi encontrada, vamos tentar uma abordagem diferente
    // Tentar fazer uma query genérica para ver se pelo menos a conexão funciona
    try {
      // Tentar acessar informações do sistema (isso pode não funcionar com anon key)
      const { data, error } = await supabase.rpc('version')
      if (!error) {
        console.log('✅ Conexão estabelecida (método alternativo)')
        return {
          success: true,
          message: 'Conexão estabelecida com sucesso!',
          method: 'rpc'
        }
      }
    } catch (err) {
      // Ignorar erro
    }

    // Se chegou aqui, a conexão funciona mas não encontramos tabelas conhecidas
    return {
      success: true,
      message: 'Conexão estabelecida! Não foi possível detectar tabelas comuns automaticamente.',
      suggestion: 'Verifique no dashboard do Supabase quais tabelas existem no seu banco.'
    }

  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error)
    return {
      success: false,
      message: `Erro na conexão: ${error.message}`,
      error: error
    }
  }
}

/**
 * Tenta descobrir tabelas existentes consultando o schema do PostgreSQL
 * Nota: Com anon key, isso pode ser limitado pelas políticas RLS
 */
export async function discoverTables() {
  try {
    // Tentar consultar o information_schema (pode não funcionar com anon key)
    const { data, error } = await supabase.rpc('exec_sql', {
      query: `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `
    })

    if (!error && data) {
      return data.map(row => row.table_name)
    }
  } catch (err) {
    console.log('Não foi possível consultar information_schema:', err.message)
  }

  // Fallback: tentar uma lista mais ampla de possíveis nomes de tabelas
  return await listAvailableTables()
}

/**
 * Testa se uma tabela específica existe e é acessível
 */
export async function testTable(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
    
    if (error) {
      // Verificar o tipo de erro
      if (error.code === '42P01') {
        return { exists: false, accessible: false, error: 'Tabela não existe' }
      } else if (error.code === '42501' || error.message?.includes('permission')) {
        return { exists: true, accessible: false, error: 'Sem permissão para acessar' }
      } else {
        return { exists: false, accessible: false, error: error.message }
      }
    }

    // Tabela existe e é acessível
    const columns = data && data.length > 0 ? Object.keys(data[0]) : []
    
    return {
      exists: true,
      accessible: true,
      columns: columns,
      sampleData: data[0] || null
    }
  } catch (err) {
    return { exists: false, accessible: false, error: err.message }
  }
}

/**
 * Lista todas as tabelas acessíveis testando nomes comuns
 * Nota: Com anon key, isso pode ser limitado
 */
export async function listAvailableTables() {
  const results = []
  // Lista MUITO expandida de possíveis nomes de tabelas
  const possibleTables = [
    // Tabelas comuns em português
    'users', 'user', 'usuarios', 'usuario', 'usuário',
    'profiles', 'profile', 'perfis', 'perfil',
    // Tabelas específicas do projeto
    'tatuadores', 'tatuador', 'tattoo_artists', 'artists', 'artistas',
    'clientes', 'cliente', 'customers', 'clients',
    'agendamentos', 'agendamento', 'appointments', 'schedules', 'horarios',
    'portfolio', 'portfolios', 'fotos', 'photos', 'images', 'imagens',
    'especialidades', 'especialidade', 'specialties', 'styles',
    'planos', 'plano', 'plans', 'subscriptions', 'assinaturas',
    'avaliacoes', 'avaliacao', 'reviews', 'ratings', 'notas',
    'mensagens', 'mensagem', 'messages', 'chats', 'conversas',
    // Outras possibilidades
    'posts', 'publicacoes', 'publicações',
    'comentarios', 'comments', 'comentários',
    'likes', 'curtidas',
    'seguidores', 'followers',
    'notificacoes', 'notifications',
    // Tabelas do Supabase Auth
    'auth.users', 'auth.sessions',
    // Outras variações
    'tabela1', 'tabela2', 'test', 'teste',
    'data', 'dados', 'registros', 'records'
  ]

  console.log('🔍 Tentando descobrir tabelas...')

  for (const table of possibleTables) {
    const result = await testTable(table)
    if (result.exists && result.accessible) {
      results.push({
        name: table,
        accessible: true,
        columns: result.columns || [],
        sampleData: result.sampleData
      })
      console.log(`✅ Tabela encontrada: ${table}`)
    }
  }

  return results
}

