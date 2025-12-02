-- ============================================
-- INSERIR TODOS OS TATUADORES
-- Execute este script após executar adicionar_campos_tatuadores.sql
-- ============================================

-- Inserir ou atualizar todos os tatuadores com dados completos
INSERT INTO usuarios (id, nome, email, tipo_usuario, telefone, foto_url, especialidade, estilo, localizacao, nota, avaliacoes, experiencia, trabalhos, verificado, premium, portfolio, senha) VALUES
-- Rafael Santos
('00000000-0000-0000-0000-000000000002', 
 'Rafael Santos', 
 'rafael@teste.com', 
 'tatuador', 
 '(11) 77777-7777', 
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
 'Realismo',
 'Retratos',
 'São Paulo, SP',
 4.8,
 127,
 '8 anos',
 450,
 true,
 true,
 '[
   "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
 ]'::jsonb,
 'senha123'),

-- Ana Costa
('00000000-0000-0000-0000-000000000003', 
 'Ana Costa', 
 'ana@teste.com', 
 'tatuador', 
 '(41) 99999-9999', 
 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
 'Fine Line',
 'Minimalismo',
 'Curitiba, PR',
 4.9,
 203,
 '6 anos',
 320,
 true,
 false,
 '[
   "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
   "https://images.unsplash.com/photo-1576075796033-848c2a5d3696?w=300&h=300&fit=crop"
 ]'::jsonb,
 'senha123'),

-- Lucas Oliveira
('00000000-0000-0000-0000-000000000004', 
 'Lucas Oliveira', 
 'lucas@teste.com', 
 'tatuador', 
 '(21) 88888-8888', 
 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
 'Old School',
 'Colorido',
 'Rio de Janeiro, RJ',
 4.6,
 89,
 '5 anos',
 280,
 true,
 true,
 '[
   "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
 ]'::jsonb,
 'senha123'),

-- Mariana Silva
('00000000-0000-0000-0000-000000000005', 
 'Mariana Silva', 
 'mariana@teste.com', 
 'tatuador', 
 '(31) 77777-7777', 
 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
 'Aquarela',
 'Colorido',
 'Belo Horizonte, MG',
 4.7,
 156,
 '7 anos',
 380,
 true,
 false,
 '[
   "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
   "https://images.unsplash.com/photo-1576075796033-848c2a5d3696?w=300&h=300&fit=crop"
 ]'::jsonb,
 'senha123'),

-- Diego Black
('00000000-0000-0000-0000-000000000006', 
 'Diego Black', 
 'diego@teste.com', 
 'tatuador', 
 '(11) 66666-6666', 
 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
 'Tribal',
 'Preto & Cinza',
 'São Paulo, SP',
 4.8,
 198,
 '10 anos',
 520,
 true,
 true,
 '[
   "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
 ]'::jsonb,
 'senha123'),

-- Julia Martins
('00000000-0000-0000-0000-000000000007', 
 'Julia Martins', 
 'julia@teste.com', 
 'tatuador', 
 '(51) 55555-5555', 
 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
 'Geometric',
 'Minimalismo',
 'Porto Alegre, RS',
 4.9,
 142,
 '4 anos',
 210,
 true,
 false,
 '[
   "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
   "https://images.unsplash.com/photo-1576075796033-848c2a5d3696?w=300&h=300&fit=crop"
 ]'::jsonb,
 'senha123')

ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  tipo_usuario = EXCLUDED.tipo_usuario,
  telefone = EXCLUDED.telefone,
  foto_url = EXCLUDED.foto_url,
  especialidade = EXCLUDED.especialidade,
  estilo = EXCLUDED.estilo,
  localizacao = EXCLUDED.localizacao,
  nota = EXCLUDED.nota,
  avaliacoes = EXCLUDED.avaliacoes,
  experiencia = EXCLUDED.experiencia,
  trabalhos = EXCLUDED.trabalhos,
  verificado = EXCLUDED.verificado,
  premium = EXCLUDED.premium,
  portfolio = EXCLUDED.portfolio,
  senha = COALESCE(EXCLUDED.senha, usuarios.senha);

-- Verificar se foram inseridos
SELECT 
  id, 
  nome, 
  email, 
  especialidade, 
  estilo, 
  localizacao, 
  nota, 
  avaliacoes,
  verificado,
  premium
FROM usuarios 
WHERE tipo_usuario = 'tatuador'
ORDER BY nome;

