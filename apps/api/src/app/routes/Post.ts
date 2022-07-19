import { randomUUID } from 'crypto';
import { Request, Response, Router } from 'express';
import { dbCollection } from '../../database';
import { LoggedInUser, validateAccessToken } from './Auth';
import * as joi from 'joi';

const router = Router();

const newPostSchema = joi.object({
  title: joi.string().min(2).max(100).required(),
  content: joi.string().min(2).max(1000).required(),
});

const newCommentSchema = joi.object({
  text: joi.string().min(2).max(50).required(),
});

router.get('/', async (req: Request, res: Response) => {
  const result = await dbCollection.find({}).toArray();

  return res.json({
    status: 'ok',
    result,
  });
});

router.post(
  '/',
  validateAccessToken,
  async (req: Request & { user: LoggedInUser }, res: Response) => {
    const { body, user } = req;

    try {
      await newPostSchema.validateAsync(body);
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details.map(({ message }) => message).join(', '),
      });
    }

    const result = await dbCollection.insertOne({
      ...body,
      id: randomUUID(),
      user,
    });

    return res.json({ status: 'ok', result });
  }
);
router.post(
  '/:id/comment',
  validateAccessToken,
  async (req: Request & { user: LoggedInUser }, res: Response) => {
    const { body, user } = req;
    const { id } = req.params;

    try {
      await newCommentSchema.validateAsync(body);
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details.map(({ message }) => message).join(', '),
      });
    }
    const result = await dbCollection.updateOne(
      { id },
      {
        $push: { comments: { ...body, user, id: randomUUID } },
      }
    );

    return res.json({ status: 'ok', result });
  }
);

export { router as PostRoutes };
