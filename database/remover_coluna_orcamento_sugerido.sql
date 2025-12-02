-- ============================================
-- REMOVER COLUNA orcamento_sugerido
-- Execute este script para remover a coluna da tabela
-- ============================================

-- Verificar se a coluna existe antes de remover
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'solicitacoes_orcamento' 
             AND column_name = 'orcamento_sugerido') THEN
    ALTER TABLE solicitacoes_orcamento DROP COLUMN orcamento_sugerido;
    RAISE NOTICE 'Coluna orcamento_sugerido removida com sucesso';
  ELSE
    RAISE NOTICE 'Coluna orcamento_sugerido não existe na tabela';
  END IF;
END $$;

