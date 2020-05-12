import { NowRequest, NowResponse } from '@now/node';

const cache = new Map<number, boolean>();

export default (req: NowRequest, res: NowResponse) => {
  const now = Date.now();
  cache.set(now, true);

  res.json({
    serverTime: Date.now(),
    __cache__: [...cache.entries()]
  });
};
