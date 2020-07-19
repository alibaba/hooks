/**
 * 管理参数
 */
import { Pipe } from '../type';
import transformerPipe from './transformer';
import refreshPipe from './refresh';
import updatePipe from './update';
import normalPipe from './normal';
import { IS_NORMAL_SYMBOL } from '../symbol';

const createNormalPipe = (pipe: Pipe, $isNormal: boolean): Pipe => (ctx) => {
  const { meta } = ctx;
  return meta[IS_NORMAL_SYMBOL] === $isNormal ? pipe(ctx) : ctx;
};

const pipes = [
  createNormalPipe(refreshPipe, false),
  createNormalPipe(normalPipe, true),
  transformerPipe,
  updatePipe,
];

export default pipes;
