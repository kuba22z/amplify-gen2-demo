import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "@/../amplifyconfiguration.json";
// This File is needed to have access to AWS Amplify services and API's on the server side.
export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});
