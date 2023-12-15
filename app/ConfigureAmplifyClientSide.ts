'use client';

import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';
import {withAuthenticator} from "@aws-amplify/ui-react";

Amplify.configure(config, { ssr: true });

function ConfigureAmplifyClientSide() {
    return null;
}
export default withAuthenticator(ConfigureAmplifyClientSide);
