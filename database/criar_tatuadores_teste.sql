-- Criar mais tatuadores de teste
-- Execute este script no SQL Editor do Supabase

INSERT INTO usuarios (id, nome, email, tipo_usuario, telefone) VALUES
('00000000-0000-0000-0000-000000000002', 'Maria Tatuadora', 'tatuadora@teste.com', 'tatuador', '(11) 88888-8888'),
('00000000-0000-0000-0000-000000000003', 'Rafael Santos', 'rafael@teste.com', 'tatuador', '(11) 77777-7777'),
('00000000-0000-0000-0000-000000000004', 'Ana Costa', 'ana@teste.com', 'tatuador', '(21) 66666-6666'),
('00000000-0000-0000-0000-000000000005', 'Lucas Oliveira', 'lucas@teste.com', 'tatuador', '(41) 55555-5555'),
('00000000-0000-0000-0000-000000000006', 'Mariana Silva', 'mariana@teste.com', 'tatuador', '(31) 44444-4444'),
('00000000-0000-0000-0000-000000000007', 'Diego Black', 'diego@teste.com', 'tatuador', '(11) 33333-3333'),
('00000000-0000-0000-0000-000000000008', 'Julia Martins', 'julia@teste.com', 'tatuador', '(51) 22222-2222')
ON CONFLICT (email) DO NOTHING;

-- Verificar se foram criados
SELECT id, nome, email, tipo_usuario FROM usuarios WHERE tipo_usuario = 'tatuador';

