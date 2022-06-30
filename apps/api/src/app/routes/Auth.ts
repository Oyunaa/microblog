import axios from 'axios';
import { Router, Request, Response, NextFunction } from 'express';
import { environment } from '../../environments/environment';

const router = Router();

router.get('/github/authorize', async (req: Request, res: Response) => {
  const { query } = req;
  const { code } = query;

  const githubAuthResult = await axios.post(
    `https://github.com/login/oauth/access_token?clientId=${environment.clientId}&client_secret=${environment.clientSecret}&code=${code}
    `,
    null,
    { headers: { Accept: 'application/json' } }
  );

  if(!githubAuthResult || !githubAuthResult.data.access_token) {
      return res.status(400).json({
          status: 'error',
          message: 'Could not identify user with github'
      })
  }
  const userResponse = await axios.get('')
});

export { router as AuthRoutes };
