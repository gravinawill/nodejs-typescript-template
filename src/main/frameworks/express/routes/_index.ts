import { Router } from 'express';

import healthCheck from './health-check.route';

const routes: Router = Router();

routes.use('/', healthCheck);

export default routes;
