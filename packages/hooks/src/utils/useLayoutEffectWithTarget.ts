import { useLayoutEffect } from "react";
import createEffectWithTarget from "./createEffectWithTarget";

const useEffectWithTarget = createEffectWithTarget(useLayoutEffect);

export default useEffectWithTarget;
