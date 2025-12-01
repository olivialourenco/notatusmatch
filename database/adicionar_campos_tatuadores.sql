-- ============================================
-- ADICIONAR CAMPOS PARA TATUADORES
-- Execute este script para adicionar campos necessários
-- ============================================

-- Adicionar colunas se não existirem
DO $$ 
BEGIN
  -- Especialidade (ex: Realismo, Fine Line, etc)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'especialidade') THEN
    ALTER TABLE usuarios ADD COLUMN especialidade TEXT;
  END IF;

  -- Estilo (ex: Retratos, Minimalismo, etc)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'estilo') THEN
    ALTER TABLE usuarios ADD COLUMN estilo TEXT;
  END IF;

  -- Localização (ex: São Paulo, SP)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'localizacao') THEN
    ALTER TABLE usuarios ADD COLUMN localizacao TEXT;
  END IF;

  -- Nota (avaliação média)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'nota') THEN
    ALTER TABLE usuarios ADD COLUMN nota DECIMAL(3,1) DEFAULT 0;
  END IF;

  -- Número de avaliações
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'avaliacoes') THEN
    ALTER TABLE usuarios ADD COLUMN avaliacoes INTEGER DEFAULT 0;
  END IF;

  -- Experiência (ex: "8 anos")
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'experiencia') THEN
    ALTER TABLE usuarios ADD COLUMN experiencia TEXT;
  END IF;

  -- Número de trabalhos
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'trabalhos') THEN
    ALTER TABLE usuarios ADD COLUMN trabalhos INTEGER DEFAULT 0;
  END IF;

  -- Verificado (boolean)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'verificado') THEN
    ALTER TABLE usuarios ADD COLUMN verificado BOOLEAN DEFAULT false;
  END IF;

  -- Premium (boolean)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'premium') THEN
    ALTER TABLE usuarios ADD COLUMN premium BOOLEAN DEFAULT false;
  END IF;

  -- Portfolio (array de URLs de imagens - JSON)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'usuarios' AND column_name = 'portfolio') THEN
    ALTER TABLE usuarios ADD COLUMN portfolio JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Atualizar dados do Rafael Santos com os campos completos
UPDATE usuarios 
SET 
  especialidade = 'Realismo',
  estilo = 'Retratos',
  localizacao = 'São Paulo, SP',
  nota = 4.8,
  avaliacoes = 127,
  experiencia = '8 anos',
  trabalhos = 450,
  verificado = true,
  premium = true,
  portfolio = '[
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
  ]'::jsonb
WHERE id = '00000000-0000-0000-0000-000000000002';

