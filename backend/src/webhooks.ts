import { exec } from 'child_process';
import { RequestHandler, Router } from 'express';
import EnvConfig from './lib/config/EnvConfig';

const webhooks = Router();

const handleExec = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

const githubWorkflow: RequestHandler = async (req, res) => {
  const data = req.body;

  const isTagValid = data && data.push_data && data.push_data.tag === 'latest';

  if (!isTagValid) {
    return res.status(400).send('Invalid webhook data');
  }

  try {
    // Pull the latest image
    await handleExec(`docker pull ${EnvConfig.DOCKER_USERNAME}/fedodo-api:latest`);
    console.log('Docker image pulled');

    // Stop the current container
    await handleExec(`docker stop ${EnvConfig.DOCKER_CONTAINER_NAME} || true`);
    console.log('Docker container stopped');

    // Remove the current container
    await handleExec(`docker rm ${EnvConfig.DOCKER_CONTAINER_NAME} || true`);
    console.log('Docker container removed');

    // Run the new container
    await handleExec(`docker run -d --name ${EnvConfig.DOCKER_CONTAINER_NAME} -p 80:3005 ${EnvConfig.DOCKER_USERNAME}/fedodo-api:latest`);
    console.log('Docker container started');

    return res.status(200).send('Container restarted successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error: ${error}`);
  }
};

webhooks.post('/webhook', githubWorkflow);

export default webhooks;
