const { gql } = require('graphql-tag');

const typeDefs = gql`

    scalar Date

    type Job {
        _id: ID
        company: String!
        jobTitle: String!
        link: String!
        dateApplied: Date!
        contact: String
        status: String
        notes: String
        lastUpdated: Date
    }

    type Query {
        jobs: [Job]
        job(_id: ID!): Job
    }

    type Mutation {
        addJob( 
            company: String!, 
            jobTitle: String!, 
            link: String!, 
            dateApplied: Date!, 
            contact: String, 
            status: String, 
            notes: String
            lastUpdated: Date
        ): Job
        updateJob(
            _id: ID!,
            company: String,
            jobTitle: String,
            link: String,
            dateApplied: Date,
            contact: String,
            status: String,
            notes: String
            lastUpdated: Date
        ): Job
        removeJob(_id: ID!): Job
    }
`;

module.exports = typeDefs;

