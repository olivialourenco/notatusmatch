-- ============================================
-- ADICIONAR SENHAS PARA TATUADORES EXISTENTES
-- Execute este script para adicionar senhas aos tatuadores que já estão no banco
-- ============================================

-- Atualizar senhas dos tatuadores existentes
-- Senha padrão: senha123 (os tatuadores podem alterar depois)
UPDATE usuarios 
SET senha = 'senha123'
WHERE tipo_usuario = 'tatuador'
AND (senha IS NULL OR senha = '');

-- Verificar quais tatuadores foram atualizados
SELECT 
  id,
  nome,
  email,
  tipo_usuario,
  CASE 
    WHEN senha IS NOT NULL AND senha != '' THEN 'Senha configurada'
    ELSE 'Sem senha'
  END as status_senha
FROM usuarios
WHERE tipo_usuario = 'tatuador'
ORDER BY nome;

