import express from 'express';
import { healthCheck } from '../controllers/healthcheck.controller';

const healthcheckRouter: express.Router = express.Router();

healthcheckRouter.get('/', healthCheck);

export default healthcheckRouter;