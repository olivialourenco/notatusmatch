# Configurar Storage no Banco de Produção

## ⚠️ IMPORTANTE: Configurar o Bucket

O upload de imagens requer que o bucket `orcamentos` esteja configurado no Supabase Storage.

## Passos Rápidos

### 1. Criar o Bucket

1. Acesse o **Supabase Dashboard** do projeto "Notatus's Project"
2. Vá em **Storage** no menu lateral
3. Clique em **New bucket**
4. Configure:
   - **Name**: `orcamentos`
   - **Public bucket**: ✅ Marque como público
5. Clique em **Create bucket**

### 2. Configurar Políticas RLS (Row Level Security)

No bucket `orcamentos`, vá em **Policies** e crie:

**Política 1 - Upload (INSERT):**
- **Policy name**: `Permitir upload de imagens`
- **Allowed operation**: `INSERT`
- **Target roles**: `anon` (ou `authenticated` se preferir)
- **Policy definition**: `bucket_id = 'orcamentos'`

**Política 2 - Visualização (SELECT):**
- **Policy name**: `Permitir visualização de imagens`
- **Allowed operation**: `SELECT`
- **Target roles**: `anon`
- **Policy definition**: `bucket_id = 'orcamentos'`

### 3. Via SQL (Alternativa)

Se preferir usar SQL Editor:

```sql
-- Criar políticas para o bucket orcamentos
CREATE POLICY "Permitir upload de imagens" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'orcamentos');

CREATE POLICY "Permitir visualização de imagens" ON storage.objects
FOR SELECT
USING (bucket_id = 'orcamentos');
```

## ✅ Verificação

Após configurar:
1. Tente fazer upload de uma imagem no formulário de solicitação
2. Verifique se a imagem aparece no bucket `orcamentos` > `referencias`
3. Se ainda der erro, verifique o console do navegador para mensagens específicas

## 📝 Nota

Se o Storage não estiver configurado, o formulário ainda permite enviar a solicitação **sem imagem**. A imagem é opcional.

