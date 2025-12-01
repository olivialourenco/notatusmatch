import { supabase } from './supabase'

/**
 * Upload de imagem para Supabase Storage
 * @param {File} file - Arquivo de imagem
 * @param {string} folder - Pasta no storage (ex: 'referencias')
 * @returns {Promise<string>} URL da imagem
 */
export async function uploadImage(file, folder = 'referencias') {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Usar bucket 'orcamentos' para tudo (referencias e perfis)
    const bucketName = 'orcamentos'
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      // Mensagens de erro mais específicas
      if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
        throw new Error('Bucket de armazenamento não configurado. Configure o bucket "orcamentos" no Supabase Storage.')
      }
      if (error.message?.includes('new row violates row-level security')) {
        throw new Error('Erro de permissão. Verifique as políticas RLS do Storage.')
      }
      throw error
    }

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error)
    throw error
  }
}

/**
 * Criar uma nova solicitação de orçamento
 */
export async function criarSolicitacaoOrcamento(solicitacao) {
  try {
    const { data, error } = await supabase
      .from('solicitacoes_orcamento')
      .insert([solicitacao])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao criar solicitação:', error)
    return { data: null, error }
  }
}

/**
 * Buscar solicitações de um tatuador
 */
export async function buscarSolicitacoesTatuador(tatuadorId, status = null) {
  try {
    let query = supabase
      .from('solicitacoes_orcamento')
      .select(`
        *,
        cliente:usuarios!cliente_id(id, nome, email, foto_url)
      `)
      .eq('tatuador_id', tatuadorId)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error)
    return { data: null, error }
  }
}

/**
 * Buscar solicitações de um cliente
 */
export async function buscarSolicitacoesCliente(clienteId) {
  try {
    const { data, error } = await supabase
      .from('solicitacoes_orcamento')
      .select(`
        *,
        tatuador:usuarios!tatuador_id(id, nome, email, foto_url)
      `)
      .eq('cliente_id', clienteId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error)
    return { data: null, error }
  }
}

/**
 * Atualizar status de uma solicitação
 */
export async function atualizarStatusSolicitacao(solicitacaoId, status, dadosAdicionais = {}) {
  try {
    const { data, error } = await supabase
      .from('solicitacoes_orcamento')
      .update({
        status,
        ...dadosAdicionais,
        updated_at: new Date().toISOString()
      })
      .eq('id', solicitacaoId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao atualizar solicitação:', error)
    return { data: null, error }
  }
}

/**
 * Buscar detalhes de uma solicitação
 */
export async function buscarSolicitacaoPorId(solicitacaoId) {
  try {
    const { data, error } = await supabase
      .from('solicitacoes_orcamento')
      .select(`
        *,
        cliente:usuarios!cliente_id(id, nome, email, foto_url, telefone),
        tatuador:usuarios!tatuador_id(id, nome, email, foto_url)
      `)
      .eq('id', solicitacaoId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao buscar solicitação:', error)
    return { data: null, error }
  }
}

/**
 * Buscar usuário por ID
 */
export async function buscarUsuarioPorId(usuarioId) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', usuarioId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return { data: null, error }
  }
}

/**
 * Buscar todos os tatuadores
 */
export async function buscarTatuadores() {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('tipo_usuario', 'tatuador')
      .order('nome', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao buscar tatuadores:', error)
    return { data: null, error }
  }
}

/**
 * Contar solicitações pendentes de um tatuador
 */
export async function contarSolicitacoesPendentes(tatuadorId) {
  try {
    const { count, error } = await supabase
      .from('solicitacoes_orcamento')
      .select('*', { count: 'exact', head: true })
      .eq('tatuador_id', tatuadorId)
      .eq('status', 'pendente')

    if (error) throw error
    return { count: count || 0, error: null }
  } catch (error) {
    console.error('Erro ao contar solicitações:', error)
    return { count: 0, error }
  }
}

/**
 * Criar novo usuário (cadastro)
 */
export async function criarUsuario(dadosUsuario) {
  try {
    // Converter portfolio para JSONB se for array
    const dadosFormatados = { ...dadosUsuario }
    if (Array.isArray(dadosFormatados.portfolio)) {
      dadosFormatados.portfolio = JSON.stringify(dadosFormatados.portfolio)
    } else if (!dadosFormatados.portfolio) {
      dadosFormatados.portfolio = JSON.stringify([])
    }

    const { data, error } = await supabase
      .from('usuarios')
      .insert([dadosFormatados])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return { data: null, error }
  }
}

/**
 * Buscar usuário por email e senha (login)
 */
export async function buscarUsuarioPorEmailSenha(email, senha) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('senha', senha)
      .single()

    if (error) {
      // Se não encontrar, retornar null sem erro
      if (error.code === 'PGRST116') {
        return { data: null, error: null }
      }
      throw error
    }
    return { data, error: null }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return { data: null, error }
  }
}
