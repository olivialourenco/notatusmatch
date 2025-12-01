-- ============================================
-- ADICIONAR COLUNA SENHA NA TABELA usuarios
-- Execute este script para adicionar coluna de senha
-- ============================================

-- Adicionar coluna senha se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'senha') THEN
    ALTER TABLE usuarios ADD COLUMN senha TEXT;
  END IF;
END $$;

-- Atualizar senhas dos usuários de teste existentes
UPDATE usuarios 
SET senha = 'senha123'
WHERE email IN ('cliente1@teste.com', 'cliente2@teste.com', 'cliente3@teste.com', 'rafael@teste.com')
AND senha IS NULL;

