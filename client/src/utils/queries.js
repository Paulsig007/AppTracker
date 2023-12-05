import {gql} from '@apollo/client';

export const QUERY_JOBS = gql`
    query jobs {
        jobs {
            _id
            company
            jobTitle
            link
            dateApplied
            contact
            status
            notes
        }
    }
`;

export const QUERY_JOB = gql`
    query job($id: ID!) {
        job(_id: $id) {
            _id
            company
            jobTitle
            link
            dateApplied
            contact
            status
            notes
        }
    }
`;

