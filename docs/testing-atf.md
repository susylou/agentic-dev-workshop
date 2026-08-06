# Testing with ATF

The Automated Test Framework (ATF) is ServiceNow's native testing. The key point for
this workshop: **it's the same framework whether you built on-platform or off** — only
*where the test is authored* differs.

| | Authored | Travels as | Runs |
|---|---|---|---|
| **Build Agent** | in-platform (its "Flow 2") | update set | on the instance |
| **SDK (Fluent)** | as source in Git (`Test()` API) | with the app | on the instance |

So testing isn't bolted on afterward — on the SDK side it ships *with* the app and
becomes your CI/CD pre-prod gate.

## Pick the test seam that matches the build

- **Server-side (`atf.server`)** — insert a record, validate it saved with the right
  defaults. Rock-solid. The right seam for a **custom-widget** app (the UI form steps
  have nothing standard to target).
- **UI steps (`atf.form` / `atf.form_SP`)** — target ServiceNow-*rendered* forms and
  catalog items. Great when that's what you built; fiddly otherwise.

## Running a test

- There is **no CLI to run a test** — the SDK builds and installs it; execution happens
  **on the instance**.
- ATF test execution is **off by default** as a safety guard — enable it once in ATF
  Properties.
- Then: **Automated Test Framework → Tests → open the test → Run Test.** A server-only
  test runs without a separate browser-runner window.

!!! check "Done when"
    - [ ] Test installed on the instance
    - [ ] Execution enabled
    - [ ] Every step passes (green)
