# How NX Speeds Up Builds and Tests

## 1. NX is a build system and task orchestrator for monorepos.

It does not replace tools such as: - Webpack - Vite - Jest - ESLint -
TypeScript

Instead, NX coordinates when and how these tools run.

NX improves build and CI performance using several mechanisms:

1.  Project dependency graph
2.  Affected project detection
3.  Task hashing
4.  Computation caching
5.  Parallel task execution

------------------------------------------------------------------------

## 2. Project Graph

NX analyzes imports between projects and builds a dependency graph.

Example repository structure:

apps/ web admin

libs/ ui api-client utils

Example imports:

web -\> ui ui -\> utils web -\> api-client

NX converts this into a graph:

web ├─ ui │ └─ utils └─ api-client

This graph allows NX to determine: - which projects depend on others -
what needs to be rebuilt - the correct execution order of tasks

Visualize with:

nx graph

------------------------------------------------------------------------

## 3. Affected Project Detection

NX determines what changed using Git.

Example:

git diff origin/main..HEAD

If a file changes:

libs/utils/date.ts

NX calculates the affected chain:

utils -\> ui -\> web

Example command:

nx affected:test

Runs tests only for affected projects instead of the entire repo.

------------------------------------------------------------------------

## 4. Task Graph

Example:

nx build web

NX determines dependencies:

build utils build ui build web

Independent tasks run in parallel.

------------------------------------------------------------------------

## 5. Task Hashing

NX computes a hash including:

-   source files
-   dependency files
-   configuration
-   environment variables
-   lockfile

If the hash hasn't changed, NX knows the output is still valid.

------------------------------------------------------------------------

## 6. Computation Cache

NX stores task outputs:

-   build artifacts
-   console output
-   metadata

If the same task runs again and the hash matches, NX restores the result
from cache.

Example:

✔ utils (cached) ✔ ui (cached) ✔ web (cached)

------------------------------------------------------------------------

## 7. Remote Cache

Cache can be shared between machines.

Developer: nx build web

CI later: nx build web

NX restores from cache instead of rebuilding.

Options: - NX Cloud - self‑hosted cache - cloud storage

------------------------------------------------------------------------

## 8. Parallel Task Execution

NX runs independent tasks simultaneously.

Example:

build ui build api build utils

Improves performance for:

-   lint
-   test
-   build

------------------------------------------------------------------------

## 9. Incremental Builds

Example change:

libs/ui/button.tsx

Affected chain:

ui -\> web

NX rebuilds only affected projects instead of the whole repository.

------------------------------------------------------------------------

## 10. Development Mode

Example:

nx serve web

NX watches files and rebuilds only affected modules.

------------------------------------------------------------------------

## 11. Plugin Ecosystem

NX plugins support technologies like:

-   React
-   Node.js
-   NestJS
-   Vite
-   Webpack

Plugins allow NX to:

-   detect dependencies
-   configure tasks
-   generate project scaffolding

------------------------------------------------------------------------

## 12. What Makes NX Fast

-   dependency graph analysis
-   affected project detection
-   deterministic task hashing
-   computation caching
-   parallel task execution
-   incremental builds

------------------------------------------------------------------------

## Summary

NX is a build orchestration system for monorepos that improves
development and CI performance by:

-   understanding project dependencies
-   running tasks only for affected projects
-   caching task results
-   executing independent tasks in parallel

This enables incremental, cache-driven builds instead of full rebuilds,
significantly reducing build and CI times.
