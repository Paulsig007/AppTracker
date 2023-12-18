const Job  = require('../models/Job'); // Adjust the import path as needed
const dateScalar = require('../utils/dateScalar');

const resolvers = {

    Date: dateScalar,

    Query: {
        // Fetch all jobs
        jobs: async () => {
            try {
                return await Job.find({})
                .sort({ lastUpdated: -1 })
                .exec();
            } catch (error) {
                console.error("Error fetching jobs:", error);
                throw new Error('Error fetching jobs');
            }
        },

        // Fetch a single job by ID
        job: async (_, { _id }) => {
            try {
                return await Job.findById(_id);
            } catch (error) {
                console.error(`Error fetching job with ID ${_id}:`, error);
                throw new Error('Error fetching job');
            }
        },
    },
    Mutation: {
        // Add a new job
        addJob: async (_, { company, jobTitle, link, dateApplied, contact, status, notes, lastUpdated }) => {
            try {
                const newJob = new Job({ company, jobTitle, link, dateApplied, contact, status, notes });
                return await newJob.save();
            } catch (error) {
                console.error("Error adding new job:", error);
                throw new Error('Error adding job');
            }
        },

        // Update an existing job
        updateJob: async (_, { _id, company, jobTitle, link, dateApplied, contact, status, notes, lastUpdated }) => {
            try {
                return await Job.findByIdAndUpdate(
                    _id, 
                    { company, jobTitle, link, dateApplied, contact, status, notes, lastUpdated: new Date() }, 
                    { new: true });
            } catch (error) {
                console.error(`Error updating job with ID ${_id}:`, error);
                throw new Error('Error updating job');
            }
        },

        // Remove a job
        removeJob: async (_, { _id }) => {
            try {
                const deletedJob = await Job.findByIdAndDelete(_id);
                if(!deletedJob) throw new Error('No job with that ID');
                return deletedJob;
            } catch (error) {
                console.error(`Error removing job with ID ${_id}:`, error);
                throw new Error(error);
            }
        },
    },
};

module.exports = resolvers;