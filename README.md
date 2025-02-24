Projeto Mirrage - Lista de Presentes para Casamento
Bem-vindo ao Projeto Mirrage! Este é um site desenvolvido para ajudar um casal de noivos a arrecadar fundos para sua lista de presentes. O projeto permite que um administrador gerencie produtos (presentes) que serão exibidos no site, e os usuários podem contribuir comprando esses presentes de forma segura, utilizando a API do Mercado Pago para processar os pagamentos.

📌 Visão Geral
O Projeto Mirrage foi criado com o objetivo de facilitar a arrecadação de fundos para presentes de casamento. O administrador pode adicionar, editar e gerenciar produtos (presentes) no site, enquanto os usuários podem visualizar os produtos disponíveis e realizar contribuições de forma segura através da integração com o Mercado Pago.

🚀 Funcionalidades
Autenticação de Administrador:

Login seguro para o administrador gerenciar os produtos.

Listagem de Produtos:

O administrador pode adicionar, editar e remover produtos.

Cada produto contém informações como ID, título, descrição, preço e imagem.

Checkout Seguro:

Integração com a API do Mercado Pago para processamento de pagamentos.

Experiência de compra segura e confiável para os usuários.

Exibição de Produtos:

Os produtos são exibidos em uma interface amigável para os usuários.

Detalhes completos de cada produto, incluindo imagem, descrição e preço.

🛠️ Tecnologias Utilizadas
Frontend: Next.js

Backend: Next.js (API Routes)

Banco de Dados: MongoDB

ORM: Prisma

Autenticação: [Biblioteca de autenticação utilizada, se houver]

Pagamentos: API do Mercado Pago (Checkout Pro)

📦 Como Executar o Projeto
Siga os passos abaixo para configurar e executar o projeto localmente.

Pré-requisitos
Node.js instalado (versão 14 ou superior)

Git instalado

Conta no Mercado Pago para obter as credenciais da API

MongoDB configurado (local ou Atlas)

Passos para Execução
Clone o repositório:

bash
Copy
git clone https://github.com/LuanRoch/projetomirrage.git
cd projetomirrage
Instale as dependências:

bash
Copy
npm install
Configure o ambiente:

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

env
Copy
DATABASE_URL=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_do_mercado_pago
SECRET_KEY=secret_key_para_autenticacao
Substitua os valores pelos seus dados reais.

Execute as migrações do Prisma:

bash
Copy
npx prisma migrate dev --name init
Inicie o servidor:

bash
Copy
npm run dev
Acesse a aplicação:

Abra o navegador e acesse http://localhost:3000.

🤝 Como Contribuir
Contribuições são bem-vindas! Se você deseja contribuir para o Projeto Mirrage, siga os passos abaixo:

Faça um fork do projeto.

Crie uma nova branch com sua feature ou correção:

bash
Copy
git checkout -b minha-feature
Faça commit das suas alterações:

bash
Copy
git commit -m 'Adicionando nova feature'
Envie para o repositório remoto:

bash
Copy
git push origin minha-feature
Abra um Pull Request e descreva suas alterações.
