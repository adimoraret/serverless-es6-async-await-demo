import fetch from 'node-fetch'

const getHackerNewsLatestJobs = async () => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
  const jobIds = await response.json()

  const jobs = jobIds.map(async (jobId) => {
    const jobResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
    const job = await jobResponse.json()
    return {
      title: job.title,
      url: job.url
    }
  })

  return await Promise.all(jobs)
}

export async function jobs(event, context, callback) {
  const latestJobs = await getHackerNewsLatestJobs()
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(latestJobs),
  })
}