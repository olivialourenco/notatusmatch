# Migração para Banco de Produção

## Informações do Banco
- **Nome do Projeto**: Notatus's Project
- **Ref do Projeto**: fphqwnusqmdztmguoubp
- **URL**: https://fphqwnusqmdztmguoubp.supabase.co

## Passos para Migração

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaHF3bnVzcW1kenRtZ3VvdWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjMyMjAsImV4cCI6MjA3OTIzOTIyMH0.hYOclI2Qn1C1rav6z66epaBdUoEFQNj6y4oqOsZECaA
```

### 2. Executar Script de Migração

1. Acesse o **Supabase Dashboard** do projeto "Notatus's Project"
2. Vá para **SQL Editor**
3. Copie e cole o conteúdo do arquivo `database/migrate_to_production.sql`
4. Execute o script

O script irá:
- ✅ Verificar se as tabelas `usuarios` e `solicitacoes_orcamento` existem
- ✅ Criar as tabelas se não existirem
- ✅ Adicionar colunas faltantes se as tabelas já existirem
- ✅ Criar índices necessários
- ✅ Configurar triggers para `updated_at`
- ✅ Habilitar Row Level Security (RLS)
- ✅ Criar políticas de segurança

### 3. Verificar Migração

Após executar o script, verifique se:

1. As tabelas foram criadas/atualizadas corretamente:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('usuarios', 'solicitacoes_orcamento');
   ```

2. As colunas estão presentes:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'usuarios';
   
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'solicitacoes_orcamento';
   ```

3. RLS está habilitado:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' 
   AND tablename IN ('usuarios', 'solicitacoes_orcamento');
   ```

### 4. Reiniciar Aplicação

Após configurar o `.env`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

### 5. Testar Conexão

Acesse a página de teste de conexão:
- URL: `http://localhost:5173/test-connection`

Isso verificará se a conexão com o novo banco está funcionando corretamente.

## Estrutura das Tabelas

### Tabela: usuarios
- `id` (UUID, PRIMARY KEY)
- `nome` (TEXT, NOT NULL)
- `email` (TEXT, UNIQUE, NOT NULL)
- `tipo_usuario` (TEXT, CHECK: 'cliente' ou 'tatuador')
- `telefone` (TEXT, nullable)
- `foto_url` (TEXT, nullable)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

### Tabela: solicitacoes_orcamento
- `id` (UUID, PRIMARY KEY)
- `cliente_id` (UUID, FOREIGN KEY -> usuarios.id)
- `tatuador_id` (UUID, FOREIGN KEY -> usuarios.id)
- `descricao` (TEXT, NOT NULL)
- `parte_corpo` (TEXT, NOT NULL)
- `tamanho` (TEXT, NOT NULL)
- `orcamento_sugerido` (TEXT, nullable)
- `imagem_referencia` (TEXT, nullable)
- `status` (TEXT, DEFAULT 'pendente', CHECK: 'pendente', 'visto', 'respondido')
- `mensagem_resposta` (TEXT, nullable)
- `valor_estimado` (DECIMAL(10, 2), nullable)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

## Notas Importantes

⚠️ **RLS (Row Level Security)**: As políticas atuais permitem acesso amplo para facilitar testes. Quando implementar autenticação real, ajuste as políticas para usar `auth.uid()`.

⚠️ **Foreign Keys**: O script verifica se a tabela `usuarios` existe antes de criar as foreign keys em `solicitacoes_orcamento`.

⚠️ **Colunas NOT NULL**: Se uma tabela já existir e você adicionar uma coluna NOT NULL, o script usa valores DEFAULT para evitar erros.

