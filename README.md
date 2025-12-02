# NotatusMatch

Plataforma para conectar clientes e tatuadores.

## Tecnologias

- React
- Vite
- Supabase
- Tailwind CSS

## Instalação

### Passo 1: Clone o repositório
```bash
git clone https://github.com/olivialourenco/notatusmatch.git
cd notatusmatch
```

### Passo 2: Instale as dependências
```bash
npm install
```

### Passo 3: Configure as variáveis de ambiente

**IMPORTANTE:** Este passo é obrigatório! Sem o arquivo `.env`, a aplicação não funcionará.

Crie um arquivo chamado `.env` na raiz do projeto (mesmo nível do `package.json`) com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaHF3bnVzcW1kenRtZ3VvdWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjMyMjAsImV4cCI6MjA3OTIzOTIyMH0.hYOclI2Qn1C1rav6z66epaBdUoEFQNj6y4oqOsZECaA
```

**Como criar o arquivo:**

**Windows:**
- Abra o Bloco de Notas ou qualquer editor de texto
- Cole o conteúdo acima
- Salve como `.env` (com o ponto no início) na pasta raiz do projeto
- Se o Windows não permitir salvar com ponto, salve como `env` e depois renomeie para `.env`

**Linux/Mac:**
```bash
cat > .env << EOF
VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaHF3bnVzcW1kenRtZ3VvdWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjMyMjAsImV4cCI6MjA3OTIzOTIyMH0.hYOclI2Qn1C1rav6z66epaBdUoEFQNj6y4oqOsZECaA
EOF
```

### Passo 4: Execute o projeto
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Problemas Comuns

### Tela branca ao abrir

**Solução 1: Verificar arquivo .env**
1. Confirme que o arquivo `.env` existe na raiz do projeto (mesmo nível do `package.json`)
2. Abra o arquivo e verifique se contém exatamente:
   - `VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Solução 2: Verificar console do navegador**
1. Abra o navegador
2. Pressione F12 para abrir as ferramentas de desenvolvedor
3. Vá na aba "Console"
4. Procure por mensagens de erro em vermelho
5. Se aparecer "Missing Supabase environment variables", o arquivo `.env` não está configurado corretamente

**Solução 3: Reiniciar o servidor**
Após criar/editar o arquivo `.env`, é necessário reiniciar o servidor:
1. Pare o servidor (Ctrl+C no terminal)
2. Execute novamente: `npm run dev`

**Solução 4: Verificar se o arquivo está no lugar certo**
A estrutura de pastas deve ser:
```
notatusmatch/
├── .env          ← Arquivo deve estar AQUI
├── package.json
├── src/
├── public/
└── ...
```

### Erro ao instalar dependências

Se houver erro ao executar `npm install`:
```bash
# Limpar cache e tentar novamente
npm cache clean --force
npm install
```

### Porta já em uso

Se a porta 5173 estiver em uso:
```bash
# O Vite tentará usar outra porta automaticamente
# Ou você pode especificar outra porta:
npm run dev -- --port 3000
```
