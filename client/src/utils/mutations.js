import { gql } from '@apollo/client';


export const ADD_JOB = gql`
    mutation addJob($company: String!, $jobTitle: String!, $link: String!, $dateApplied: Date!, $contact: String, $status: String, $notes: String) {
        addJob(company: $company, jobTitle: $jobTitle, link: $link, dateApplied: $dateApplied, contact: $contact, status: $status, notes: $notes) {
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

export const UPDATE_JOB = gql`
    mutation updateJob($id: ID, $company: String!, $jobTitle: String, $link: String, $dateApplied: Date, $contact: String, $status: String, $notes: String) {
        updateJob(_id: $id, company: $company, jobTitle: $jobTitle, link: $link, dateApplied: $dateApplied, contact: $contact, status: $status, notes: $notes) {
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

export const REMOVE_JOB = gql`
    mutation removeJob($_id: ID!) {
        removeJob(_id: $_id) {
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

    