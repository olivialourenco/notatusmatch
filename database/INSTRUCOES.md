# 📋 Instruções para Executar o Script SQL

## 1. Atualizar Variáveis de Ambiente

Atualize o arquivo `.env` na raiz do projeto com as credenciais do banco de teste:

```env
VITE_SUPABASE_URL=https://mtqkzuaidxlmdrmbzkml.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cWt6dWFpZHhsbWRybWJ6a21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDEyOTgsImV4cCI6MjA4MDExNzI5OH0.ruA5RJGq1r0BloMIZBHOm-oZxl-pe6OnDZ8aAEhJHdk
```

## 2. Executar o Script SQL no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione o projeto **notatus_teste**
3. No menu lateral, clique em **SQL Editor**
4. Clique em **New Query**
5. Abra o arquivo `database/schema_orcamento.sql`
6. Copie TODO o conteúdo do arquivo
7. Cole no SQL Editor do Supabase
8. Clique em **Run** (ou pressione `Ctrl+Enter`)

## 3. Verificar se Funcionou

1. No Supabase Dashboard, vá em **Table Editor**
2. Você deve ver duas novas tabelas:
   - `usuarios`
   - `solicitacoes_orcamento`

## 4. Testar a Conexão

1. No seu projeto, execute: `npm run dev`
2. Acesse: `http://localhost:5173/test-connection`
3. Clique em "Testar Conexão"
4. Teste manualmente as tabelas:
   - Digite `usuarios` e clique em "Testar"
   - Digite `solicitacoes_orcamento` e clique em "Testar"

## ✅ Pronto!

Agora você pode começar a implementar as páginas conforme o documento de requisitos.

