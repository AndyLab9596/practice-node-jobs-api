const getAllJobs = (req, res) => {
    res.send('get all jobs')
}

const createJob = (req, res) => {
    res.send('create job')
}

const getJob = (req, res) => {
    res.send('get single job')
}

const updateJob = (req, res) => {
    res.send('update job')
}

const deleteJob = (req, res) => {
    res.send('delete job')
}

module.exports = { getAllJobs, createJob, getJob, updateJob, deleteJob }