-- ============================================
-- INSERIR USUÁRIOS DE TESTE
-- Execute este script após criar as tabelas
-- ============================================

-- Inserir usuários de teste (clientes e tatuador)
-- Usando ON CONFLICT para evitar erros se já existirem

INSERT INTO usuarios (id, nome, email, tipo_usuario, telefone, foto_url) VALUES
-- Clientes de teste
('00000000-0000-0000-0000-000000000001', 'João Silva', 'cliente1@teste.com', 'cliente', '(11) 99999-9999', NULL),
('00000000-0000-0000-0000-000000000010', 'Maria Oliveira', 'cliente2@teste.com', 'cliente', '(11) 88888-8888', NULL),
('00000000-0000-0000-0000-000000000011', 'Pedro Costa', 'cliente3@teste.com', 'cliente', '(11) 77777-7777', NULL),
-- Tatuador de teste (Rafael Santos)
('00000000-0000-0000-0000-000000000002', 'Rafael Santos', 'rafael@teste.com', 'tatuador', '(11) 77777-7777', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  tipo_usuario = EXCLUDED.tipo_usuario,
  telefone = EXCLUDED.telefone,
  foto_url = EXCLUDED.foto_url;

-- Verificar se foram inseridos
SELECT id, nome, email, tipo_usuario FROM usuarios WHERE email IN (
  'cliente1@teste.com',
  'cliente2@teste.com',
  'cliente3@teste.com',
  'rafael@teste.com'
);

