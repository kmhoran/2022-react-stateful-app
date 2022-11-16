import getStage from "./getStage";
import { DEFAULT } from "./constants";

const reduce = (flagConfig = {}) => {
  const stage = getStage();
  return { ...(flagConfig[DEFAULT] || {}), ...(flagConfig[stage] || {}) };
};

export default {
  reduce,
};
