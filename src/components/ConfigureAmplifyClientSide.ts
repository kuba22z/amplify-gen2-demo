"use client";

import { Amplify } from "aws-amplify";
import config from "../../amplifyconfiguration.json";
//This file will make sure that Ampify API and services are available on the server side.
Amplify.configure(config, { ssr: true });
export default function ConfigureAmplifyClientSide() {
  return null;
}
