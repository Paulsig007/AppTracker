const { GraphQLScalarType } = require('graphql');
const { Kind }= require('graphql/language');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        // Convert outgoing Date to string for GraphQL
        return value.toISOString();
    },
    parseValue(value) {
        // Convert incoming string to Date
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});

module.exports = dateScalar;