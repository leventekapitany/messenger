import express from 'express';

const app = express();

export default {
  start: async () => {
    const port = +process.env.REST_API_PORT;
    await app.listen(port);
    console.log(`Express Rest API running on port ${port}`);
  },
};
