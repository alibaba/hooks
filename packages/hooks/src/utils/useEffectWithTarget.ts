import { useEffect } from "react";
import createEffectWithTarget from "./createEffectWithTarget";

const useEffectWithTarget = createEffectWithTarget(useEffect);

export default useEffectWithTarget;
