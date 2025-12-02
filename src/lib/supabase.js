import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERRO: Variáveis de ambiente do Supabase não encontradas!')
  console.error('Por favor, crie um arquivo .env na raiz do projeto com:')
  console.error('VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co')
  console.error('VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
  console.error('Veja o README.md para mais informações.')
  
  // Criar um cliente vazio para evitar crash, mas mostrar erro no console
  // Isso permite que a aplicação carregue e mostre mensagens de erro
  const placeholderClient = createClient('https://placeholder.supabase.co', 'placeholder-key')
  export const supabase = placeholderClient
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
}

