# Source control & GitHub

## What it needs to cover

- How each track meets Git:
    - **SDK (Fluent)** → `.now.ts` source lives in Git; the platform is compiled output.
    - **Build Agent + Studio** → the platform is the source; Git holds serialised **XML**
      update records.
    - They **don't meet in the middle**.
- Tracing a change back to the work: branch / PR / commit (off-platform) vs. change
  request (on-platform).
- How far the promotion story goes (dev → test → prod) and what's actually proven.
