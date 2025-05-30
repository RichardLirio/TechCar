# Sistema de Gestão de Oficinas Mecânicas

Este é um sistema para gerenciamento de oficinas mecânicas, projetado para facilitar o cadastro de clientes, veículos, ordens de serviço, controle de estoque e geração de relatórios. O sistema segue os princípios SOLID e utiliza uma arquitetura em camadas.

## Tecnologias Utilizadas

- **Backend:**
  - Node.js com TypeScript
  - Express.js para API RESTful
  - Prisma ORM com PostgreSQL
- **Frontend:**
  - React.js
- **Banco de Dados:**
  - PostgreSQL

## Requisitos Funcionais

### 1. Cadastro de Clientes e Veículos
- [x] **RF01:** O sistema deve permitir operações CRUD de clientes. Cadastro, read, update e delete.
- [x] **RF01.1:** Realizar verificação do cpf e cnpj para saber se é valido.
- [x] **RF02:** O sistema deve permitir o cadastro de veículos associados a um cliente, com placa, modelo, marca e ano (opcional).
- [x] **RF03:** Usuários podem visualizar, editar e excluir clientes e veículos.

### 2. Gerenciamento de Ordens de Serviço
- **RF04:** Usuários podem criar ordens de serviço associadas a um cliente e veículo.
- **RF05:** Cada ordem pode conter múltiplos serviços realizados (ex.: troca de óleo, alinhamento), com descrição e valor individual.
- **RF06:** Cada ordem pode usar múltiplas peças do estoque, com quantidade e valor unitário registrados.
- **RF07:** O sistema deve calcular o valor total da ordem (soma dos serviços + peças - desconto) no frontend.
- **RF08:** Usuários podem visualizar, editar e finalizar ordens de serviço.
- **RF09:** O status da ordem pode ser "Em andamento", "Concluído" ou "Cancelado".

### 3. Controle de Estoque
- [X] **RF10:**   O sistema deve permitir o cadastro de peças com nome, quantidade e valor unitário.
- **RF10.1:** Não pode ser utilizada uma quantidade maior que a registrada no estoque.
- **RF11:**   Ao criar uma ordem, as peças usadas devem ser deduzidas do estoque.
- **RF12:**   Usuários podem visualizar e atualizar o estoque.

### 4. Gestão de Usuários
- [X] **RF13:** O sistema deve suportar autenticação de usuários com email, senha e papel (admin ou user).
- [X] **RF14:** Apenas usuários com papel "admin" podem manipular dados dos usuários.
- [X] **RF15:** O sistema deve permitir editar os dados de um usuário.
- [X] **RF16:** O sistema deve permitir excluir um usuário.
- [X] **RF17:** O sistema deve permitir listar os usuários.
- [X] **RF18:** O sistema deve permitir cadastras novos usuários.

### 5. Relatórios
- **RF19:** O sistema deve gerar relatórios de ordens concluídas, faturamento e serviços por mecânico (futuro).

## Regras de Negócio

### 1. Autenticação e Autorização
- **RN01:** Apenas usuários com papel "admin" podem aplicar descontos em ordens de serviço.
- **RN02:** Usuários comuns ("user") podem criar e visualizar ordens, mas não alterar descontos.
- [x] **RN03:** A autenticação deve ser feita via JWT, com token gerado no login.

### 2. Ordens de Serviço
- **RN04:** O valor total da ordem é calculado pelo frontend como:
  - `valorTotal = soma(servicos.valorServico) + soma(pecasUsadas.quantidadeUsada * pecasUsadas.valorUnitarioPeca) - desconto`.
- **RN05:** O backend deve validar a disponibilidade de peças no estoque antes de salvar a ordem.
- **RN06:** O desconto só pode ser maior ou igual a zero e não pode exceder o valor total antes do desconto.
- **RN07:** Uma ordem só pode ser finalizada ("Concluído") se todas as peças usadas estiverem registradas e deduzidas do estoque.
-**RN07.1:** Criar caso de uso para os itens da ordem de serviço e agregar ao caso de uso de ordem de serviço. Liberar http somente para ordem de servico completa os itens ficam agregados por baixo dos panos 

### 3. Estoque
- **RN08:** A quantidade de peças no estoque não pode ser negativa após a criação de uma ordem.
- **RN09:** Apenas administradores podem adicionar ou remover peças do estoque manualmente.

### 4. Clientes e Veículos
-[x] **RN10:** O CPF ou CNPJ de um cliente deve ser único no sistema.
-[x] **RN11:** Um veículo só pode ser associado a um cliente existente.

## Como Executar

### Pré-requisitos
- Node.js (v16+)
- PostgreSQL (v13+)
- Yarn ou npm

### Backend
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd backend