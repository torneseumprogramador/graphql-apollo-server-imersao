const { ApolloServer } = require('apollo-server');
const { gql } = require('apollo-server');

const clientes = [
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-01",
      endereco: "Rua das Flores, 123, Jardim Primavera, São Paulo, SP"
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      telefone: "(21) 91234-5678",
      cpf: "234.567.890-12",
      endereco: "Avenida dos Pássaros, 456, Centro, Rio de Janeiro, RJ"
    },
    {
      id: 3,
      nome: "Carlos Pereira",
      telefone: "(31) 99876-5432",
      cpf: "345.678.901-23",
      endereco: "Travessa da Paz, 789, Savassi, Belo Horizonte, MG"
    },
    {
      id: 4,
      nome: "Ana Castro",
      telefone: "(41) 91234-5678",
      cpf: "456.789.012-34",
      endereco: "Rua das Orquídeas, 321, Batel, Curitiba, PR"
    },
    {
      id: 5,
      nome: "Roberto Almeida",
      telefone: "(51) 98765-4321",
      cpf: "567.890.123-45",
      endereco: "Praça da Harmonia, 654, Moinhos de Vento, Porto Alegre, RS"
    }
];  

const typeDefs = gql`
  input ClienteInputType {
    nome: String!,
    telefone: String
    cpf: String
    endereco: String
  }

  type ClienteType {
    id: ID,
    nome: String!,
    telefone: String
    cpf: String
    endereco: String
  }

  type Query {
    clientes: [ClienteType],
    clientesPorId(id: ID!): ClienteType!
  }

  type Mutation {
    addCliente(clienteInput: ClienteInputType!): ClienteType
    excluirCliente(id: ID!): ClienteType
  }
`;

const resolvers = {
  Query: {
    clientes: () => {
        return clientes;
    },
    clientesPorId: (_, { id }) => {
        return clientes.find(cliente => cliente.id === parseInt(id));  // Usando o método find para buscar o cliente pelo ID
    }
  },
  Mutation: {
    addCliente: (_, { clienteInput }) => {
      const novoCliente = {
        id: clientes.length + 1, // Apenas para este exemplo, em um app real você provavelmente usaria um ID gerado de forma diferente
        ...clienteInput
      };
      clientes.push(novoCliente);
      return novoCliente;
    },
    excluirCliente: (_, { id }) => {
        const clienteIndex = clientes.findIndex(cliente => cliente.id === parseInt(id));

        if (clienteIndex === -1) {
            throw new Error('Cliente não encontrado');
        }

        const [clienteRemovido] = clientes.splice(clienteIndex, 1);

        return clienteRemovido;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor pronto em ${url}`);
});
