import { gql } from '@apollo/client';


export const ADD_JOB = gql`
    mutation addJob($company: String!, $jobTitle: String!, $link: String!, $dateApplied: Date!, $contact: String, $status: String, $notes: String, $lastUpdated: Date) {
        addJob(company: $company, jobTitle: $jobTitle, link: $link, dateApplied: $dateApplied, contact: $contact, status: $status, notes: $notes, lastUpdated: $lastUpdated) {
            _id
            company
            jobTitle
            link
            dateApplied
            contact
            status
            notes
            lastUpdated
        }
    }
`;

export const UPDATE_JOB = gql`
    mutation updateJob($_id: ID!, $company: String, $jobTitle: String, $link: String, $dateApplied: Date, $contact: String, $status: String, $notes: String, $lastUpdated: Date) {
        updateJob(_id: $_id, company: $company, jobTitle: $jobTitle, link: $link, dateApplied: $dateApplied, contact: $contact, status: $status, notes: $notes, lastUpdated: $lastUpdated) {
            _id
            company
            jobTitle
            link
            dateApplied
            contact
            status
            notes
            lastUpdated
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
            lastUpdated
        }
    }
`;

    