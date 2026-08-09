# Source control & GitHub

How to put your work into GitHub. The method depends on which track you built with.

## Build Agent work → GitHub

Studio links a scoped application directly to a Git repository.

### Before you start

- **Admin role** on the instance.
- A **dedicated Git repository** for this application — each application needs its own.
- Initialise the repo with a README so it has a default branch before you link.
- A **personal access token** with read and write access to that repository, saved as a
  **Basic Auth** credential record (username + token as the password). Use an SSH private
  key credential instead if you're linking over SSH.
- The instance needs network access to the repository. If it's behind a firewall, you'll
  need a MID Server.
- Add the email address you use for Git commits to your **sys_user** record, so commits
  are attributed to you.

!!! note "Non-production only"
    Source control integration doesn't support linking an application on a production
    instance. To install applications on production, use the application repository, an
    update set, or ServiceNow Studio.

### Link it

1. Go to **All** → **App Engine** → **ServiceNow Studio**.
2. Select your application in the file navigator.
3. Select **App details** to open it in the canvas.
4. Select **Source control** → **Link to source control**.
5. Fill in the connection details:

    | Field | What to enter |
    |---|---|
    | **Network protocol** | HTTPS or SSH |
    | **URL** | The repository URL |
    | **Branch** | Defaults to `main` |
    | **Credential** | Basic Auth credential for HTTPS, SSH private key for SSH |
    | **Default email** | Fallback committer address when a user has no email on their record |
    | **MID Server Name** | Only if the repository is behind a firewall |
    | **Commit Comment** | Optional description |

6. Select **Link to source control**. The instance validates the connection and confirms.

Once linked, use **Source control** in Studio to commit local changes, pull remote
changes, create branches, and switch between them.

## SDK work → GitHub

An SDK project is already files on your machine, so it's ordinary Git.

1. From the project folder:

    ```bash
    git init
    git branch -M main
    ```

2. Add a `.gitignore` so you don't commit dependencies or build output:

    ```gitignore
    node_modules/
    dist/
    ```

3. Commit and push to your repository:

    ```bash
    git add .
    git commit -m "Initial commit"
    git remote add origin https://github.com/<you>/<repo>.git
    git push -u origin main
    ```

From there it's a normal Git workflow — branches, pull requests, and history all behave
as they would on any other codebase.

## What ends up in the repository

| Track | What you'll see |
|---|---|
| **SDK (Fluent)** | Your Fluent source files, plus XML for any metadata the SDK doesn't express as Fluent. |
| **Build Agent + Studio** | The application serialised as ServiceNow source-control XML, alongside `sn_source_control.properties` and `checksum.txt`. |

Both are version-controlled and both can be installed onto another instance — they just
look quite different when you open the repository.
