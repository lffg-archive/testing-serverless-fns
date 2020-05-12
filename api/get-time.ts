import { NowRequest, NowResponse } from '@now/node';

const cache = new Map<number, boolean>();

if (!process.env.GET_TIME_SECRET) {
  throw new Error('Missing `GET_TIME_SECRET` environment variable.');
}

export default (req: NowRequest, res: NowResponse) => {
  if (req.query.secret !== process.env.GET_TIME_SECRET) {
    return res.status(403).json({
      error: {
        message: 'Invalid authorization token.',
        code: 'ERR_INVALID_AUTHORIZATION_TOKEN'
      }
    });
  }

  const now = Date.now();
  cache.set(now, true);

  res.json({
    serverTime: Date.now(),
    __cache__: [...cache.entries()]
  });
};
