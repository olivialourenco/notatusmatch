# NotatusMatch

Plataforma para conectar clientes e tatuadores.

## Tecnologias

- React
- Vite
- Supabase
- Tailwind CSS

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/olivialourenco/notatusmatch.git
cd notatusmatch
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Ou crie manualmente o arquivo `.env` na raiz do projeto com:
```
VITE_SUPABASE_URL=https://fphqwnusqmdztmguoubp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaHF3bnVzcW1kenRtZ3VvdWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjMyMjAsImV4cCI6MjA3OTIzOTIyMH0.hYOclI2Qn1C1rav6z66epaBdUoEFQNj6y4oqOsZECaA
```

4. Execute o projeto:
```bash
npm run dev
```

## Problemas Comuns

**Tela branca ao abrir:**
- Verifique se o arquivo `.env` existe na raiz do projeto
- Verifique se as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão configuradas
- Abra o console do navegador (F12) para ver erros específicos
