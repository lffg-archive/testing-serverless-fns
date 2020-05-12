import { NowRequest, NowResponse } from '@now/node';

const CACHE_SECONDS = 60 * 60 * 24 * 30 * 5;

export default (req: NowRequest, res: NowResponse) => {
  res.setHeader('Cache-Control', `s-maxage=${CACHE_SECONDS}`);

  return res.json({
    date: new Date().toLocaleString('en-US'),
    __data__: req.query
  });
};
