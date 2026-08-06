# Off-platform build (SDK)

Build the same *kind* of app off-platform: an AI IDE drives the ServiceNow SDK (Fluent)
to generate versioned source, then installs it onto the instance. Runs ~40 minutes end
to end.

=== "Watch"
    This is the intended experience for most of the room — watch the build happen in
    stages, and take the prompts away to run later.

=== "Follow along"
    You'll need the off-platform prerequisites (AI IDE, Node, Git, SDK, an auth alias).
    Set your instance auth alias **in the terminal** first — never paste credentials
    into a prompt.

## Setup

1. Open your AI-enabled IDE with the project folder.
2. Confirm your **auth alias** points at the workshop instance (set in the terminal).
3. Keep the **design brief + prototype** in the project so the agent ports the design,
   not a flat guess.

!!! check "Done when"
    - [ ] `now-sdk install` succeeds with **no "application was null"** error
    - [ ] The app + portal render on the instance
    - [ ] A record can be lodged and appears back in the list

!!! warning "If it breaks"
    - **"application was null"** on install → the scope prefix must match the instance
      company code. Re-scope the app; don't hack the allowlist.
    - **43 lint errors / weird build** → you probably skipped `npm install`
      (that fetches the SDK *tool's* libraries; it's separate from `now-sdk install`,
      which deploys *your* app).
