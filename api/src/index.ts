import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express from 'express';

const envConfig = config();
expand(envConfig);

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
