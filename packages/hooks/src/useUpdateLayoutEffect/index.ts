import { useLayoutEffect } from "react";
import { createUpdateEffect } from "../createUpdateEffect";

export default createUpdateEffect(useLayoutEffect);
