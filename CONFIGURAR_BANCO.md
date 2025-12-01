# Configuração do Banco de Produção

## ⚠️ IMPORTANTE: Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaHF3bnVzcW1kenRtZ3VvdWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjMyMjAsImV4cCI6MjA3OTIzOTIyMH0.hYOclI2Qn1C1rav6z66epaBdUoEFQNj6y4oqOsZECaA
```

## Passos para Migração

### 1. Executar Script SQL no Supabase

1. Acesse o **Supabase Dashboard** do projeto "Notatus's Project"
2. Vá para **SQL Editor**
3. Abra o arquivo `database/migrate_to_production.sql`
4. Copie todo o conteúdo e cole no SQL Editor
5. Execute o script

O script irá:
- ✅ Verificar tabelas existentes
- ✅ Criar tabelas se não existirem
- ✅ Adicionar colunas faltantes
- ✅ Configurar índices, triggers e RLS

### 2. Inserir Usuários de Teste

Execute o script `database/inserir_usuarios_teste.sql` no SQL Editor do Supabase para criar os usuários de teste necessários:
- 3 clientes (cliente1@teste.com, cliente2@teste.com, cliente3@teste.com)
- 1 tatuador (rafael@teste.com)

### 3. Reiniciar Aplicação

Após criar o arquivo `.env`, reinicie o servidor:

```bash
npm run dev
```

### 4. Testar Conexão

Acesse: `http://localhost:5173/test-connection`

## Estrutura Esperada

### Tabela: usuarios
- id, nome, email, tipo_usuario, telefone, foto_url, created_at, updated_at

### Tabela: solicitacoes_orcamento
- id, cliente_id, tatuador_id, descricao, parte_corpo, tamanho, orcamento_sugerido, imagem_referencia, status, mensagem_resposta, valor_estimado, created_at, updated_at

