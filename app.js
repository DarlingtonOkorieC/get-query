const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;
  const current_day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const utc_time = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'); // Format UTC time
  const github_file_url = 'https://github.com/DarlingtonOkorieC/get-query/blob/main/app.js';
  const github_repo_url = 'https://github.com/DarlingtonOkorieC/get-query.git';

  // Validate UTC time within +/-2 hours
  const currentUtcTime = new Date(utc_time);
  const twoHoursAgo = new Date();
  twoHoursAgo.setUTCHours(twoHoursAgo.getUTCHours() - 2);
  const twoHoursFromNow = new Date();
  twoHoursFromNow.setUTCHours(twoHoursFromNow.getUTCHours() + 2);

  if (currentUtcTime < twoHoursAgo || currentUtcTime > twoHoursFromNow) {
    return res.status(400).json({ error: 'Invalid UTC time' });
  }

  const response = {
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    status_code: 200,
  };

  res.json(response);
})




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

