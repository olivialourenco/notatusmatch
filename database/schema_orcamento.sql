-- ============================================
-- SCHEMA PARA RECURSO "SOLICITAR ORÇAMENTO"
-- Banco: notatus_teste
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE 1: usuarios
-- Tabela de usuários (clientes e tatuadores)
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('cliente', 'tatuador')),
  telefone TEXT,
  foto_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE 2: solicitacoes_orcamento
-- Tabela principal para solicitações de orçamento
-- ============================================
CREATE TABLE IF NOT EXISTS solicitacoes_orcamento (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tatuador_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  parte_corpo TEXT NOT NULL,
  tamanho TEXT NOT NULL,
  orcamento_sugerido TEXT,
  imagem_referencia TEXT, -- URL do Supabase Storage
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'visto', 'respondido')),
  mensagem_resposta TEXT, -- Resposta do tatuador (opcional)
  valor_estimado DECIMAL(10, 2), -- Valor estimado pelo tatuador (opcional)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Garantir que cliente e tatuador sejam diferentes
  CONSTRAINT cliente_tatuador_diferentes CHECK (cliente_id != tatuador_id)
);

-- ============================================
-- ÍNDICES para melhor performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_cliente ON solicitacoes_orcamento(cliente_id);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_tatuador ON solicitacoes_orcamento(tatuador_id);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_status ON solicitacoes_orcamento(status);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_created_at ON solicitacoes_orcamento(created_at DESC);

-- ============================================
-- FUNÇÕES E TRIGGERS
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_usuarios_updated_at 
  BEFORE UPDATE ON usuarios
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_solicitacoes_updated_at 
  BEFORE UPDATE ON solicitacoes_orcamento
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Configurar políticas de segurança
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes_orcamento ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE SEGURANÇA - usuarios
-- ============================================

-- Todos podem ver usuários (para buscar tatuadores)
CREATE POLICY "Todos podem ver usuários" ON usuarios
  FOR SELECT USING (true);

-- Usuários podem atualizar próprio perfil
-- Nota: Você precisará implementar autenticação para usar auth.uid()
-- Por enquanto, permitimos update com validação manual
CREATE POLICY "Usuários podem atualizar próprio perfil" ON usuarios
  FOR UPDATE USING (true); -- Ajustar depois com auth.uid() = id

-- Usuários podem inserir (cadastro)
CREATE POLICY "Usuários podem se cadastrar" ON usuarios
  FOR INSERT WITH CHECK (true);

-- ============================================
-- POLÍTICAS DE SEGURANÇA - solicitacoes_orcamento
-- ============================================

-- Cliente pode ver suas próprias solicitações
-- Nota: Ajustar depois com auth.uid() = cliente_id
CREATE POLICY "Cliente vê próprias solicitações" ON solicitacoes_orcamento
  FOR SELECT USING (true); -- Temporário: ajustar com auth.uid() = cliente_id

-- Tatuador pode ver solicitações destinadas a ele
-- Nota: Ajustar depois com auth.uid() = tatuador_id
CREATE POLICY "Tatuador vê próprias solicitações" ON solicitacoes_orcamento
  FOR SELECT USING (true); -- Temporário: ajustar com auth.uid() = tatuador_id

-- Cliente pode criar solicitações
CREATE POLICY "Cliente pode criar solicitações" ON solicitacoes_orcamento
  FOR INSERT WITH CHECK (true); -- Ajustar: auth.uid() = cliente_id

-- Tatuador pode atualizar solicitações destinadas a ele
CREATE POLICY "Tatuador pode atualizar solicitações" ON solicitacoes_orcamento
  FOR UPDATE USING (true); -- Ajustar: auth.uid() = tatuador_id

-- ============================================
-- DADOS DE TESTE (OPCIONAL)
-- Descomente para inserir dados de exemplo
-- ============================================

/*
-- Inserir usuários de teste
INSERT INTO usuarios (id, nome, email, tipo_usuario) VALUES
('00000000-0000-0000-0000-000000000001', 'João Cliente', 'cliente@teste.com', 'cliente'),
('00000000-0000-0000-0000-000000000002', 'Maria Tatuadora', 'tatuadora@teste.com', 'tatuador')
ON CONFLICT (email) DO NOTHING;

-- Inserir solicitação de teste
INSERT INTO solicitacoes_orcamento (cliente_id, tatuador_id, descricao, parte_corpo, tamanho, orcamento_sugerido, status) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 
 'Quero um lobo realista', 'antebraço', 'médio', '500 ~ 800', 'pendente');
*/

-- ============================================
-- COMENTÁRIOS DAS TABELAS
-- ============================================
COMMENT ON TABLE usuarios IS 'Tabela de usuários (clientes e tatuadores)';
COMMENT ON TABLE solicitacoes_orcamento IS 'Solicitações de orçamento de clientes para tatuadores';

COMMENT ON COLUMN solicitacoes_orcamento.descricao IS 'Descrição da tatuagem desejada';
COMMENT ON COLUMN solicitacoes_orcamento.parte_corpo IS 'Parte do corpo onde será feita a tatuagem';
COMMENT ON COLUMN solicitacoes_orcamento.tamanho IS 'Tamanho aproximado da tatuagem';
COMMENT ON COLUMN solicitacoes_orcamento.orcamento_sugerido IS 'Orçamento sugerido pelo cliente (texto livre)';
COMMENT ON COLUMN solicitacoes_orcamento.imagem_referencia IS 'URL da imagem de referência no Supabase Storage';
COMMENT ON COLUMN solicitacoes_orcamento.status IS 'Status da solicitação: pendente, visto, respondido';
COMMENT ON COLUMN solicitacoes_orcamento.mensagem_resposta IS 'Resposta do tatuador (opcional)';
COMMENT ON COLUMN solicitacoes_orcamento.valor_estimado IS 'Valor estimado pelo tatuador (opcional)';

-- ============================================
-- VERIFICAÇÃO FINAL
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Schema criado com sucesso!';
  RAISE NOTICE '📋 Tabelas criadas: usuarios, solicitacoes_orcamento';
  RAISE NOTICE '🔒 RLS habilitado em todas as tabelas';
  RAISE NOTICE '⚠️  Lembre-se de ajustar as políticas RLS com auth.uid() quando implementar autenticação';
END $$;

