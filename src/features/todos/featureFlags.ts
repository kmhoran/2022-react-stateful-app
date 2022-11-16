import featureFlags from "../../app/featureFlags";
import { BETA, PROD } from "../../app/featureFlags/constants";

export const LOCAL_STATE_ENABLED = "local-state-enabled";

const config = featureFlags.reduce({
  [BETA]: {
    [LOCAL_STATE_ENABLED]: true,
  },
  [PROD]: {
    [LOCAL_STATE_ENABLED]: false,
  },
});

export default config;
