# TODO

- react-query
  - product rows
- colour code remotes (background or outline)
- share types ( dummyproduct)
- deploy assets and shell app
- delegate modules
- graceful error boundaries
- telemetry

try this weird if statement in document around revalidate https://github.com/K-Cheddar/module-federation-examples/blob/hot-reload-issue/nextjs-ssr/home/pages/_document.js
# Turborepo starter

This is an official starter Turborepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

# TODO Update this

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

# TODO Add diagrams

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Using this example

This repository is used with `npx create-turbo@latest` command, but you can also use `degit` to
download and run this example, like the other examples.

Run the following command:

```sh
npx degit vercel/turbo/examples/basic basic
cd basic
pnpm install
git init . && git add . && git commit -m "Init"
```

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

# Notes

## `_app`/Shell sharing

Any sort of global app configuration such as context, or layouts can be added to the shell app, which when loaded with the constituent parts via the remotes - becomes the full app. The shell app can also act as a remote though, and share these global parts for the other remotes to consume. This bi-directional sharing is extremely powerful as it allows each remote to be developed individually but still load in all the important global configuration's that exist in the full app.

## `_document` sharing

Cannot share it as a federated module, there are issues with Next.js not recognising the underlying Document HTMLContext. Sharing as a build-time library seems to resolve this issue.
This trade-off is not a huge issue as the `_document` should not change too often after the initial setup, and also is only really needed for the shell application in production. All other remotes only require `_document` in development to mimic a full app environment, similar to what `_app` is used for.

## Shared module is not available for eager consumption

An async boundary is required. See https://github.com/module-federation/universe/issues/470.

In this repo, we are using the `automaticAsyncBoundary`. Which means we can sync import any federated module.
If the built-in plugin option stops working, then something like `real-pages` is needed. (other potential names: `async-pages` `pages-src`)

## React-Query Context Sharing
> `No QueryClient set, use QueryClientProvider to set one`

Seems like hot-reloading sometimes causes issues (assumption). It's a very hard issue to reporoduce consistenty .
The behaviour is similar to the hydration mismatch bug, which is resolved by a double refresh.

<details>
<summary>Results from some testing</summary>

🟩 - dev server running, open in browser
🟧 - dev server running, closed in browser
    
Based on a fresh tab and fresh dev server (with no changes to files between starting dev server and opening tab)

|  | shell 🟩 remote 🟩 | shell 🟩 remote 🟧 | shell 🟧 remote 🟩 |
| --- | --- | --- | --- |
| load | shell ✅ remote ✅ | ✅ | ✅ |
| refresh | shell ✅ remote ✅ | ✅ | ✅ |
| Update shell, refresh 1 | shell hot reload ✅ shell refresh (query client) ❌ remote refresh (hydration) ❌ | hot reload ✅ refresh (query client) ❌ | hydration error ❌ |
| Update shell, refresh 2 | shell ✅ remote ✅ | ✅ | ✅ |
| Update shell, refresh 3 | shell ✅ remote ✅ | ✅ | ✅ |
| Update remote, refresh 1 | shell refresh hydration ❌ remote hot reload ✅ remote refresh query client ❌ | hydration error ❌ | hot reload ✅ refresh (query client) ❌ |
| Update remote, refresh 2 | shell ✅ remote ✅ | ✅ | ✅ |
| Update remote, refresh 3 | shell ✅ remote ✅ | ✅ | ✅ |
| Update remote and shell, refresh 1 | shell query client ❌ remote query client ❌ | hot reload ✅ query client ❌ | hot reload ✅ query client ❌ |
| Update remote and shell, refresh 2 | shell ✅ remote ✅ | ✅ | ✅ |
| Update remote and shell, refresh 3 | shell ✅ remote ✅ | ✅ | ✅ |

</details>

Changes to the _document while the dev server is open will also trigger this error `No QueryClient set, use QueryClientProvider to set one` - restarting the server will solve the issue

## Issues with Console Ninja Extension

Using Console Ninja just seems to blow up the dev server 🤷

## SSR with Mantine Component Library

In this repo I am using Mantine for the UI library, just to speed up development. It is built on top of Emotion, so I presumed the SSR would work out of the box. But no, all the server content from Mantine is unstyled, causing a flash on the initial load due to the CSS coming in on the client.

I've tested Emotion to work perfectly fine with zero configuration using @emotion/styled, so it's probably an issue with Mantine.

## Shared library with share key `scope/`

Very useful to share all packages under the scope, e.g. `'@tanstack/'` shares `'@tanstack/query-core'` and `'@tanstack/react-query'`. Just have to be careful as sometimes you don't want to share a nested package.