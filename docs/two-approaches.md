# The two approaches

Two ways to build with AI on ServiceNow. Same platform, very different lanes.

| | **On-platform** | **Off-platform** |
|---|---|---|
| **Tool** | Build Agent, in Studio | ServiceNow SDK (Fluent) + your AI IDE |
| **Where the source lives** | The platform | Your project (`.now.ts` in Git) |
| **How it reaches an instance** | Built in place | `now-sdk build` → `now-sdk install` |
| **Source control holds** | XML update records | Fluent source (`.now.ts`) |
| **Best at** | Fast in-context builds, extending what's there | Versioned, promotable apps; deterministic logic |

## The one line to remember

> Both reach the platform. They meet through source control — but **not in the middle**.
> Fluent keeps `.now.ts` in Git and compiles it onto the instance; the Build Agent keeps
> the platform as the source and serialises XML update records into Git.

## What we'll do

1. **Track A** — build on-platform with the Build Agent.
2. **Track B** — build the same *kind* of thing off-platform with the SDK.
3. **Testing** — prove it with ATF, which works with **both**.
4. Optional: the **source-control** story.
