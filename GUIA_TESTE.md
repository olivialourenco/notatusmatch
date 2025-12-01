# 🧪 Guia de Teste - Recurso "Solicitar Orçamento"

## 📋 Pré-requisitos

✅ Script SQL executado (`database/schema_orcamento.sql`)  
✅ Storage configurado (bucket `orcamentos` criado)  
✅ Políticas de Storage configuradas  
✅ Variáveis de ambiente configuradas no `.env`

## 🚀 Passo 1: Criar Dados de Teste

### 1.1 Inserir Usuários de Teste

No **SQL Editor** do Supabase, execute:

```sql
-- Inserir usuários de teste
INSERT INTO usuarios (id, nome, email, tipo_usuario, telefone) VALUES
('00000000-0000-0000-0000-000000000001', 'João Cliente', 'cliente@teste.com', 'cliente', '(11) 99999-9999'),
('00000000-0000-0000-0000-000000000002', 'Maria Tatuadora', 'tatuadora@teste.com', 'tatuador', '(11) 88888-8888')
ON CONFLICT (email) DO NOTHING;
```

### 1.2 Verificar se foram criados

No **Table Editor** do Supabase:
- Vá em `usuarios`
- Você deve ver os 2 usuários criados

## 🧪 Passo 2: Testar como Cliente

### 2.1 Acessar a Lista de Tatuadores

1. Inicie o servidor: `npm run dev`
2. Acesse: `http://localhost:5173/tatuadores`
3. Você verá a lista de tatuadores (dados mockados)

### 2.2 Acessar Perfil do Tatuador

1. Clique em qualquer card de tatuador
2. Você será redirecionado para `/tatuador/:id`
3. **IMPORTANTE**: Use o ID do tatuador de teste: `00000000-0000-0000-0000-000000000002`
4. Acesse diretamente: `http://localhost:5173/tatuador/00000000-0000-0000-0000-000000000002`

### 2.3 Solicitar Orçamento

1. Na página do perfil, clique em **"Solicitar Orçamento"**
2. O modal deve abrir
3. Preencha o formulário:
   - **Descrição**: "Quero uma tatuagem de lobo realista"
   - **Parte do Corpo**: Selecione "Braço"
   - **Tamanho**: Selecione "Médio (10-20cm)"
   - **Orçamento Sugerido**: "R$ 500 ~ R$ 800" (opcional)
   - **Imagem**: Faça upload de uma imagem (opcional)
4. Clique em **"Enviar Solicitação"**
5. Você deve ver uma mensagem de sucesso

### 2.4 Verificar no Banco

No **Table Editor** do Supabase:
- Vá em `solicitacoes_orcamento`
- Você deve ver a solicitação criada com:
  - `cliente_id`: `00000000-0000-0000-0000-000000000001`
  - `tatuador_id`: `00000000-0000-0000-0000-000000000002`
  - `status`: `pendente`

## 🧪 Passo 3: Testar como Tatuador

### 3.1 Acessar Dashboard

1. Acesse: `http://localhost:5173/tatuador/dashboard`
2. Você deve ver:
   - Contador de solicitações pendentes (se houver)
   - Lista de solicitações recebidas

### 3.2 Ver Detalhes da Solicitação

1. Clique em uma solicitação na lista
2. Você será redirecionado para `/solicitacao/:id`
3. Você deve ver:
   - Informações do cliente
   - Descrição completa
   - Parte do corpo e tamanho
   - Imagem de referência (se foi enviada)
   - Orçamento sugerido

### 3.3 Marcar como Visto

1. Na página de detalhes, clique em **"Marcar como Visto"**
2. O status deve mudar para "visto"
3. Volte ao dashboard e verifique que o contador de pendentes diminuiu

### 3.4 Responder Solicitação

1. Na página de detalhes, clique em **"Responder Solicitação"**
2. Preencha:
   - **Mensagem**: "Olá! Gostei da ideia. Posso fazer por R$ 600,00"
   - **Valor Estimado**: "600" ou "600.00"
3. Clique em **"Salvar Resposta"**
4. O status deve mudar para "respondido"
5. A resposta deve aparecer na página

### 3.5 Testar Filtros no Dashboard

1. Volte ao dashboard
2. Teste os filtros:
   - **Todas**: Mostra todas as solicitações
   - **Pendentes**: Mostra apenas pendentes
   - **Vistas**: Mostra apenas vistas
   - **Respondidas**: Mostra apenas respondidas

## 🧪 Passo 4: Testar Upload de Imagem

### 4.1 Fazer Upload

1. No formulário de solicitação, clique na área de upload
2. Selecione uma imagem (PNG, JPG, GIF)
3. A imagem deve aparecer como preview
4. Envie a solicitação

### 4.2 Verificar no Storage

1. No Supabase Dashboard, vá em **Storage**
2. Abra o bucket `orcamentos`
3. Abra a pasta `referencias`
4. Você deve ver a imagem que foi enviada

### 4.3 Verificar na Solicitação

1. Acesse os detalhes da solicitação
2. A imagem deve aparecer na seção "Imagem de Referência"

## ✅ Checklist de Testes

- [ ] Usuários de teste criados no banco
- [ ] Página de tatuadores carrega
- [ ] Perfil do tatuador carrega corretamente
- [ ] Modal de formulário abre
- [ ] Formulário valida campos obrigatórios
- [ ] Upload de imagem funciona
- [ ] Solicitação é criada no banco
- [ ] Dashboard mostra solicitações
- [ ] Contador de pendentes funciona
- [ ] Filtros funcionam
- [ ] Detalhes da solicitação carregam
- [ ] Marcar como visto funciona
- [ ] Responder solicitação funciona
- [ ] Status é atualizado corretamente
- [ ] Imagem aparece nos detalhes

## 🐛 Problemas Comuns

### Erro ao fazer upload de imagem

**Solução**: Verifique se:
- O bucket `orcamentos` existe
- As políticas de Storage estão configuradas
- O bucket é público (ou as políticas permitem acesso)

### Solicitação não aparece no dashboard

**Solução**: Verifique se:
- O `tatuador_id` na solicitação corresponde ao ID do tatuador de teste
- O status está correto
- As políticas RLS não estão bloqueando

### Erro ao criar solicitação

**Solução**: Verifique no console do navegador (F12) qual é o erro específico. Pode ser:
- Cliente ID inválido
- Tatuador ID inválido
- Campos obrigatórios faltando

## 📝 Próximos Passos Após Testes

1. Implementar autenticação real (substituir IDs hardcoded)
2. Ajustar políticas RLS com `auth.uid()`
3. Adicionar validações adicionais
4. Melhorar tratamento de erros
5. Adicionar notificações

## 🎯 Teste Completo Bem-Sucedido!

Se todos os testes passaram, o recurso está funcionando corretamente! 🎉

