# Script SQL - Recurso "Solicitar Orçamento"

## 📋 Informações

- **Banco de Teste**: notatus_teste
- **Arquivo**: `schema_orcamento.sql`
- **Objetivo**: Criar estrutura para o recurso de solicitação de orçamento

## 🚀 Como Executar

1. Acesse o **Dashboard do Supabase** (projeto notatus_teste)
2. Vá em **SQL Editor** (no menu lateral)
3. Clique em **New Query**
4. Abra o arquivo `database/schema_orcamento.sql` e copie todo o conteúdo
5. Cole no SQL Editor
6. Clique em **Run** (ou pressione Ctrl+Enter)

## 📊 Estrutura Criada

### Tabelas

1. **usuarios**
   - Armazena clientes e tatuadores
   - Campos: id, nome, email, tipo_usuario, telefone, foto_url, created_at, updated_at

2. **solicitacoes_orcamento**
   - Armazena solicitações de orçamento
   - Campos: id, cliente_id, tatuador_id, descricao, parte_corpo, tamanho, orcamento_sugerido, imagem_referencia, status, mensagem_resposta, valor_estimado, created_at, updated_at

### Recursos Incluídos

✅ Índices para performance  
✅ Triggers para atualização automática de timestamps  
✅ Row Level Security (RLS) habilitado  
✅ Políticas de segurança básicas  
✅ Constraints de validação  
✅ Comentários nas tabelas e colunas  

## ⚠️ Importante

As políticas RLS estão configuradas de forma temporária (permitindo acesso geral). Quando você implementar autenticação com Supabase Auth, ajuste as políticas para usar `auth.uid()`:

```sql
-- Exemplo de política ajustada:
CREATE POLICY "Cliente vê próprias solicitações" ON solicitacoes_orcamento
  FOR SELECT USING (auth.uid() = cliente_id);
```

## 🔄 Próximos Passos

1. Execute o script no Supabase
2. Verifique se as tabelas foram criadas no **Table Editor**
3. Teste a conexão usando `/test-connection`
4. Implemente as páginas conforme o documento de requisitos
5. Ajuste as políticas RLS quando implementar autenticação

## 📝 Notas

- O campo `imagem_referencia` armazena a URL da imagem no Supabase Storage
- O status pode ser: `pendente`, `visto`, `respondido`
- A tabela `respostas_orcamento` foi simplificada e integrada na tabela principal (campos `mensagem_resposta` e `valor_estimado`)

