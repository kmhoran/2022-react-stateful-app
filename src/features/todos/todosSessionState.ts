import featureFlags, { LOCAL_STATE_ENABLED } from "./featureFlags";
const CATEGORY_SESSION_KEY = "key_for_demo_session";

const isLocalStateEnabled = featureFlags[LOCAL_STATE_ENABLED];

function getCategories(): any {
  if (!isLocalStateEnabled) return {};
  return JSON.parse(sessionStorage.getItem(CATEGORY_SESSION_KEY) || "{}");
}

function overwriteCategories(categories): void {
  if (!isLocalStateEnabled) return;
  sessionStorage.setItem(CATEGORY_SESSION_KEY, JSON.stringify(categories));
}

export default {
  getCategories,
  overwriteCategories,
};
