// Sistema de autenticação integrado com banco de dados
import { buscarUsuarioPorEmailSenha } from './supabaseOrcamento'

// Usuários de teste (fallback se banco não estiver disponível)
export const usuariosTeste = {
  cliente1: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'cliente1@teste.com',
    nome: 'João Silva',
    tipo: 'cliente',
    senha: 'senha123'
  },
  cliente2: {
    id: '00000000-0000-0000-0000-000000000010',
    email: 'cliente2@teste.com',
    nome: 'Maria Oliveira',
    tipo: 'cliente',
    senha: 'senha123'
  },
  cliente3: {
    id: '00000000-0000-0000-0000-000000000011',
    email: 'cliente3@teste.com',
    nome: 'Pedro Costa',
    tipo: 'cliente',
    senha: 'senha123'
  },
  tatuador: {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'rafael@teste.com',
    nome: 'Rafael Santos',
    tipo: 'tatuador',
    senha: 'senha123'
  }
}

// Função para fazer login (busca no banco primeiro, depois fallback)
export const fazerLogin = async (email, senha) => {
  try {
    // Tentar buscar no banco primeiro
    const { data, error } = await buscarUsuarioPorEmailSenha(email, senha)
    
    if (data) {
      const userData = {
        id: data.id,
        email: data.email,
        nome: data.nome,
        tipo: data.tipo_usuario
      }
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true, user: userData }
    }

    // Fallback para usuários de teste (se banco não tiver o usuário)
    const usuario = Object.values(usuariosTeste).find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    )

    if (usuario) {
      const userData = {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo
      }
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true, user: userData }
    }

    return { success: false, error: 'Email ou senha incorretos' }
  } catch (error) {
    console.error('Erro no login:', error)
    // Em caso de erro, tentar fallback
    const usuario = Object.values(usuariosTeste).find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    )

    if (usuario) {
      const userData = {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo
      }
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true, user: userData }
    }

    return { success: false, error: 'Erro ao fazer login. Tente novamente.' }
  }
}

// Função para fazer logout
export const fazerLogout = () => {
  localStorage.removeItem('user')
}

// Função para obter usuário logado
export const getUsuarioLogado = () => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Função para verificar se está logado
export const estaLogado = () => {
  return getUsuarioLogado() !== null
}

// Função para verificar se é cliente
export const ehCliente = () => {
  const user = getUsuarioLogado()
  return user && user.tipo === 'cliente'
}

// Função para verificar se é tatuador
export const ehTatuador = () => {
  const user = getUsuarioLogado()
  return user && user.tipo === 'tatuador'
}

