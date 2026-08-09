# Off-platform build (SDK)

Build the same *kind* of app off-platform: an AI IDE drives the ServiceNow SDK (Fluent)
to generate versioned source, then installs it onto the instance. Four prompts,
~40 minutes end to end.

=== "Watch"
    This is the intended experience for most of the room — watch the build happen in
    stages, and take the prompts away to run later.

=== "Follow along"
    You'll need the off-platform prerequisites (AI IDE, Node, Git, SDK, an auth alias).
    Set your instance auth alias **in the terminal** first — never paste credentials
    into a prompt.

## Setup

Work through this in order. If you've never used the SDK before, this is the whole
setup — there's nothing hidden elsewhere.

### 1. What you need installed

| | Version | Check it with | Get it |
|---|---|---|---|
| **Node.js** | 20.18.0 or newer | `node --version` | [nodejs.org](https://nodejs.org) |
| **Git** | any current version | `git --version` | [git-scm.com](https://git-scm.com) |
| **ServiceNow SDK** | latest | `now-sdk --version` | see step 2 |
| **An AI-enabled IDE** | — | — | Claude Code, Copilot, Cursor, Devin — your choice |

The SDK is a command-line tool, so it's **editor-agnostic**: bring whichever AI
assistant you already use. Nothing here needs admin rights on your machine.

### 2. Install the SDK

```bash
npm install -g @servicenow/sdk
```

Then confirm it's on your PATH:

```bash
now-sdk --version
```

### 3. Authenticate to your instance

The SDK stores credentials against an **alias**, so you never retype them — and never
put them in a prompt. Set this up in the terminal, once:

```bash
now-sdk auth --add https://your-instance.service-now.com --type basic --alias arts-dev
```

`--type` takes `basic` or `oauth`. The prompts later in this page all use the alias
`arts-dev`, so use that name if you want to paste them unchanged.

Managing aliases:

```bash
now-sdk auth --list              # what credentials do I have?
now-sdk auth --use arts-dev      # make this one the default
now-sdk auth --delete arts-dev   # remove it
```

!!! warning "Credentials go in the terminal, never in a prompt"
    Anything you type into an AI assistant may be stored or sent off your machine.
    The alias is the point: you authenticate once in the terminal, then prompts only
    ever refer to `arts-dev`.

### 4. Know the commands

Grouped by what they actually touch — which is the thing worth learning first.

**Connect**

| Command | What it does |
|---|---|
| `now-sdk auth` | Configure, list, or select credentials for an instance |

**Bring down from an instance**

| Command | What it does |
|---|---|
| `now-sdk init` *(alias `create`)* | Start a new scoped app, apply a template, or bring an existing app down from an instance |
| `now-sdk download <dir>` | Download application metadata from the instance |
| `now-sdk transform` | Download XML records from an instance (or a local path) and convert them into Fluent source |
| `now-sdk dependencies` | Download the dependencies declared in `now.config.json`, plus TypeScript types |

**Work locally — these never touch ServiceNow**

| Command | What it does |
|---|---|
| `now-sdk build` | Compile your source into app files and an installable package |
| `now-sdk pack` | Zip a built app into an installable artifact |
| `now-sdk clean` | Clean the output directory |
| `now-sdk explain <topic>` | Show the SDK's own documentation for a topic |

**Push up to an instance**

| Command | What it does |
|---|---|
| `now-sdk install` *(alias `deploy`)* | Install or update your application on the instance |

!!! tip "Ground your AI tooling — don't let it work from memory"
    A model's recall of ServiceNow will be patchy and out of date, and it won't tell you
    when it's guessing. Give it the real sources instead:

    - **`now-sdk explain <topic>`** for the SDK's own APIs. `now-sdk explain atf-guide`
      and `now-sdk explain test-api` are used in Prompt 4 below for exactly that reason,
      and it's why the prompts on this page tell the agent to read `explain` first.
    - **<https://github.com/ServiceNow/ServiceNowDocs>** for everything else on the
      platform — the full documentation library as plain markdown, published by
      ServiceNow for AI tooling to read. One branch per release family; use the one
      matching your instance (`australia` is current).

    This is the single highest-value habit when building with the SDK. Tables, fields
    and API shapes that an ungrounded model invents look completely plausible right up
    until they fail.

!!! warning "Two different `install` commands — this catches everyone"
    **`npm install`** fetches the SDK *tool's* own libraries. Internet → your laptop.
    It never touches ServiceNow, and you run it once per project.

    **`now-sdk install`** deploys *your app*. Your laptop → the instance.

    Skipping `npm install` is the usual cause of a project that won't build or throws a
    pile of lint errors.

!!! note "What `transform` will and won't convert"
    It converts the metadata types the SDK supports. Anything it doesn't support stays
    as XML — which is still version-controlled and still installable, so the round trip
    works either way. Don't expect every app to come back as `.now.ts`.

### 5. Open the project

1. Open your AI-enabled IDE with the project folder.
2. Keep the **design brief + prototype** in the project (`./design`) so the agent ports
   the design, not a flat guess.

## The prompts

### Prompt 1 — Scaffold app + EOI table

```text
Using the ServiceNow SDK (Fluent) and the servicenow-fluent-companion skill,
create a new scoped application. Ground yourself with `now-sdk explain` for the
table/field APIs before writing metadata — don't rely on recall.

- App: "Creative Futures Fund", scope x_snc_arts
  (prefix MUST match the instance company code "snc"; do not touch the allowlist)
- Table: x_snc_arts_eoi, label "Expression of Interest", auto-number prefix "EOI"
- Fields:
    title              string, mandatory
    idea               string (large)
    artform            choice: Visual arts / Performing arts / Music & sound /
                       Literature & storytelling / Screen & digital /
                       Ngā Toi Māori — Māori arts / Across artforms
    indicative_amount  choice: Up to $5,000 / $5,000–$25,000 /
                       $25,000–$100,000 / Over $100,000
    applicant          reference sys_user, default javascript:gs.getUserID()
    status             choice: Received / Under review / Invited to apply /
                       Not progressing  (default Received)
    ai_summary         string (large)

Data model only — no flow, no AI action, no agent, and NO linked/reference field to
any OOTB table (incident/case/request). This app is deliberately self-contained.
```

!!! check "Done when"
    - [ ] The app scaffolds and the table + fields exist in Fluent source.

### Prompt 2 — Service Portal (with the clickable record link)

```text
Build a Service Portal for this app, porting the design faithfully from ./design
(prototype.html + design-brief.md): cool teal/coral/gold "gallery" palette, serif
display, the spotlit framed-canvas hero with its plaque. Uniquely prefix every portal
record (e.g. arts_) so nothing collides with OOB.

Portal, top to bottom:
  1. hero (headline, lede, one-line-idea field, framed-canvas + plaque)
  2. "How it works" 1-2-3 band: Lodge → Review → Apply in full
  3. discipline tiles (4) that preselect artform on the form
  4. a request form that inserts straight into x_snc_arts_eoi
  5. "Your EOIs" list at the BOTTOM showing the current applicant's records

THE NEW PART — link each row to its record:
  - Add an on-brand detail PAGE + widget (e.g. page id arts_eoi_detail) that reads the
    sys_id from the URL and shows that EOI's full record in the portal's styling
    (title, idea, artform, indicative amount, status, ai_summary).
  - Each row in "Your EOIs" links to it: ?id=arts_eoi_detail&sys_id=<record sys_id>.
  - Do NOT link to the backend form or any OOTB ticket view — stay in this app.

On submit the new EOI appears in the bottom list without a full reload
($rootScope broadcast between the form and list widgets).
The AI assist panel is client-side draft only (as in the prototype) — do NOT wire a
server-side flow or AI action; that's a later on-platform step.
```

!!! check "Done when"
    - [ ] Portal, theme, pages and widgets exist in Fluent source.

### Prompt 3 — Build, install, verify the click-through

```text
Run `npm install` if not already done, then `now-sdk build`, then
`now-sdk install --auth arts-dev`.
Then verify live: open the portal, lodge a test EOI through the form, confirm it appears
in "Your EOIs" at the bottom, then CLICK that row and confirm the on-brand detail page
opens showing the same record. Report the EOI number.
```

!!! check "Done when"
    - [ ] Install succeeds with **no "application was null"** error.
    - [ ] A submitted EOI shows in "Your EOIs".
    - [ ] Clicking a row opens the in-app detail page for that record.

### Prompt 4 — Author the ATF test (server-side)

```text
Using the servicenow-fluent-companion skill, first read `now-sdk explain atf-guide`
and `now-sdk explain test-api` to ground the ATF Fluent API — don't rely on recall.

Author ONE server-side ATF test for the Creative Futures Fund app (scope x_snc_arts),
using the atf.server category:

Test "Lodge and validate an EOI":
  1. impersonate a test applicant (create or impersonate a standard user)
  2. atf.server.recordInsert into x_snc_arts_eoi with a realistic EOI
     (title, idea, artform, indicative_amount) — assert record_successfully_inserted
  3. atf.server.recordValidation on that record — assert status defaulted to
     "Received" and the title persisted (encoded query) — assert record_validated

Do NOT use atf.form / atf.form_SP — the portal form is a custom widget, not a
ServiceNow-rendered form, so the UI steps don't target it; the server layer is the
correct test seam. Unique $id for the test and every step.
```

!!! check "Done when"
    - [ ] The ATF test exists in Fluent source.

!!! warning "If it breaks"
    - **"application was null"** on install → the scope prefix must match the instance
      company code. Re-scope the app; don't hack the allowlist.
    - **43 lint errors / weird build** → you probably skipped `npm install`
      (that fetches the SDK *tool's* libraries; it's separate from `now-sdk install`,
      which deploys *your* app).
