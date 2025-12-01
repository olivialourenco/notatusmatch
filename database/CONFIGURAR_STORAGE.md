# 📦 Configurar Supabase Storage para Upload de Imagens

Para que o upload de imagens funcione, você precisa configurar um bucket no Supabase Storage.

## Passo a Passo

### 1. Acessar Storage no Dashboard

1. Acesse o **Dashboard do Supabase** (projeto notatus_teste)
2. No menu lateral, clique em **Storage**

### 2. Criar o Bucket

1. Clique em **New bucket**
2. Configure:
   - **Name**: `orcamentos`
   - **Public bucket**: ✅ Marque como público (para permitir acesso às imagens)
3. Clique em **Create bucket**

### 3. Configurar Políticas de Segurança (RLS)

1. No bucket `orcamentos`, vá em **Policies**
2. Clique em **New Policy**
3. Configure uma política para permitir upload:

**Policy Name**: `Permitir upload de imagens`

**Policy Definition**:
```sql
-- Permitir INSERT (upload)
CREATE POLICY "Permitir upload de imagens" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'orcamentos');

-- Permitir SELECT (visualização)
CREATE POLICY "Permitir visualização de imagens" ON storage.objects
FOR SELECT
USING (bucket_id = 'orcamentos');
```

Ou use a interface visual:
- **Allowed operation**: `INSERT` e `SELECT`
- **Policy name**: `Permitir upload de imagens`
- **Target roles**: `authenticated` ou `anon` (dependendo da sua necessidade)
- **USING expression**: `bucket_id = 'orcamentos'`

### 4. Criar Pasta (Opcional)

A pasta `referencias` será criada automaticamente quando você fizer o primeiro upload. Mas você pode criar manualmente se preferir.

## ✅ Verificação

Após configurar:

1. Teste fazendo uma solicitação de orçamento
2. Tente fazer upload de uma imagem
3. Verifique se a imagem aparece no bucket `orcamentos` > `referencias`

## 🔒 Segurança (Recomendado)

Para produção, ajuste as políticas para:
- Permitir upload apenas para usuários autenticados
- Restringir tamanho de arquivo
- Validar tipos de arquivo

Exemplo de política mais segura:
```sql
-- Apenas usuários autenticados podem fazer upload
CREATE POLICY "Upload autenticado" ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'orcamentos' 
  AND auth.role() = 'authenticated'
);
```

## 📝 Nota

O código em `src/lib/supabaseOrcamento.js` já está configurado para usar o bucket `orcamentos` e a pasta `referencias`. Se você usar nomes diferentes, atualize o código.

