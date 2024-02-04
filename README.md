## AWS Amplify + Next.js starter

This is a starter application for building fullstack apps with AWS Amplify. 

Learn more: https://docs.amplify.aws/gen2/start/quickstart/ 

### Set up Amplify

```bash
npm install -g @aws-amplify/cli
npx amplify configure profile
```
see: https://docs.amplify.aws/gen2/start/account-setup/


### Getting Started

#### Start backend in cloud for local development
```bash
npx amplify sandbox
```

#### Start frontend for local development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#### Generate forms
```bash
npx amplify generate forms
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
