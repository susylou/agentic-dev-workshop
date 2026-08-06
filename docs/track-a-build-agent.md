# The Build Agent lab

Build a working app *inside* ServiceNow Studio just by describing what you want to the
Build Agent — no code, no local setup.

There are **two builds to choose from.** Pick whichever suits you — or do both (in
separate chats):

- **Path A · Gear Up** — shorter, the official warm-up build. Start here if the Build
  Agent is new to you.
- **Path B · Idea Exchange** — a deeper build that ends with a working **AI agent**.

## Get into the Build Agent

1. Log in to your instance and open **ServiceNow Studio** (All → type "ServiceNow Studio").
2. Confirm the **Now Assist** panel shows the **Build Agent** welcome message.

!!! tip "Three things that keep the Build Agent happy"
    - **Wrap the app name in quotes** every time (e.g. `"Idea Exchange"`) so the agent
      doesn't drop characters.
    - Each prompt takes ~5–6 minutes. **Read the next one while the current one builds**,
      and let it finish before sending the next.
    - **One build = one conversation.** Each path builds a *different* app, so if you
      switch paths — or start over — begin a **fresh Build Agent chat**, or it'll try to
      mix them together.

---

## Path A · Gear Up

Build an **IT equipment request** app — a table, fields and sample data, then your own
automation and polish — all by describing it to the Build Agent. Three prompts,
~15–20 minutes. A great first taste if the Build Agent is new to you.

### Prompt 1 — Create your app

```text
Create an app called "Gear Up" to track IT equipment requests. One table with fields
for item name (dropdown: Laptop, Monitor, Headset, etc.), description, cost, quantity,
status (pending / approved / rejected / fulfilled), requestor, and justification. Add
5 sample records with realistic IT gear. Include a navigation menu so I can browse the
table from the application navigator.
```

!!! check "Done when"
    - [ ] A table was created with those fields.
    - [ ] Five sample records exist with realistic IT gear.
    - [ ] A navigation module lets you open the table from the navigator.

### Prompt 2 — Make it your own

Now make it yours. One well-scoped prompt is faster than several small ones (each build
carries a few minutes of overhead), so the recommended move combines a bit of automation
with some UI polish:

```text
Add a business rule: when a record is created, auto-set status to Approved if cost is
under $100. Add an Approve button (green) and a Deny button (red) that only show when
status is Pending.
```

??? tip "Other things to try"
    A dashboard:
    ```text
    Build a UI page as a dashboard. Four cards at the top showing the count of requests
    by status with color coding. Below that, a table of the 5 most recent requests. Add
    a nav module so I can open it from the sidebar.
    ```

!!! check "Done when"
    - [ ] Create a record over and under $100 and confirm the rule fires as expected.
    - [ ] The Approve / Deny buttons show only when status is Pending.

### Prompt 3 — Explore the possibilities

Close out by asking the Build Agent to reflect. The handy one is to have it write a
prompt you can keep and reuse to rebuild the whole app later:

```text
Generate a single plain-text prompt short enough to screenshot that I can paste into a
new Build Agent session to recreate this app.
```

??? tip "Or instead"
    ```text
    Explain what we built together. Keep it brief but complete.
    ```
    ```text
    Brainstorm 3 ways this app could be improved if I had more time. Focus on changes
    that would make it more useful in a real ServiceNow setting.
    ```

---

## Path B · Idea Exchange

Build an internal ideas portal: staff submit innovation ideas, they get tracked and
reviewed, and an AI agent recommends which ones to prioritise. Five prompts, run in order.

### Prompt 1 — Frame it & create the app

```text
I want to build an app called "Idea Exchange" — an internal ideas portal where
employees across an organisation can submit innovation ideas, track them, and have
them reviewed.

Before you build anything, tell me your plan: the scoped app you'll create, the main
table, the key fields, and how an idea will move through review. Then create the
scoped application and a single main "Idea" table to start with — a short title, a full
description, a category, the person who submitted it, and a status — with
auto-numbering. Don't build the portal or any automation yet. Just the app and this
core table, so we can check it together first.
```

!!! check "Done when"
    - [ ] The app appears in the navigator (refresh menu items if it's not there yet).
    - [ ] An **Idea** table exists with title, description, category, submitter, status.
    - [ ] Records get an auto-generated number.

### Prompt 2 — Build the back end

```text
Now build out the back end of "Idea Exchange".

1. Turn "category" into a choice list: Product, Process, Customer Experience, Cost
   Saving, Other. Turn "status" into: New, Under Review, Approved, Rejected,
   Implemented. Default the submitter to the current user.
2. Add a second table, "Idea Review", linked to each Idea, capturing a reviewer, a
   decision, and comments.
3. Create around 30 realistic sample ideas so the app feels alive. Make them varied:
   spread them across all five categories; include a few that clearly overlap on the
   same theme (so there are real duplicates to spot); and mix genuinely strong,
   high-impact ideas with some weak or trivial ones. Give them a realistic spread of
   statuses and different submitters.

Tell me your plan first, then build it, and show me a count of ideas by category when
you're done.
```

!!! check "Done when"
    - [ ] Category and status show as proper choice lists.
    - [ ] An **Idea Review** table exists, linked to Idea.
    - [ ] ~30 sample ideas are present, spread across categories.

### Prompt 3 — Build the portal

```text
Now build a Service Portal front-end for "Idea Exchange" so employees can use it
without the platform UI. Include:
- a branded landing page with a clear hero header ("Share your idea") — use a fresh,
  modern colour palette, not the default grey;
- a form to submit a new idea (title, description, category);
- a list where people can browse existing ideas with their status.

Give the portal, its pages and widgets IDs prefixed with the app's short code so
nothing clashes. Show me the portal URL when it's finished.
```

!!! check "Done when"
    - [ ] The portal loads at its own URL.
    - [ ] You can submit a new idea from the portal.
    - [ ] The idea you submitted appears in the browse list.

### Prompt 4 — Create the AI agent

```text
Create an AI agent for "Idea Exchange" called "Idea Advisor".

Its job: when a reviewer asks, look across all the ideas in the Idea table and
recommend which ones the organisation should prioritise, and explain why — weighing
potential impact, how many ideas cluster on the same theme, and any duplicates or
overlaps. It should also be able to summarise the current idea pipeline by category
and status.

Build it to run ON DEMAND when a reviewer asks — do NOT wire it to fire automatically
when an idea is submitted. Give it a tool that can read the Idea table. Tell me your
plan first, then build it, and tell me exactly how to invoke it to test it.
```

!!! check "Done when"
    - [ ] The **Idea Advisor** agent exists and you can invoke it.
    - [ ] *On the first run it comes back empty — that's expected.* Prompt 5 fixes it.

### Prompt 5 — Give the agent access to the data

When you first run Idea Advisor it comes back empty: a brand-new custom table has no
access rules yet, so the agent can't read it. This prompt adds them.

```text
The Idea Advisor agent came back empty because the Idea table has no access controls,
so the agent's read tool can't see the data. Fix the access model:

1. Create a role for this app (e.g. "idea_reader").
2. Create a read ACL on the Idea table that grants that role read access.
3. Give the agent permission to read the table via BOTH the new idea_reader role and
   admin, so an admin tester can't be locked out.
4. Also grant the idea_reader role to me (the admin/test user).

Then confirm it's wired up and tell me exactly how to re-test the Idea Advisor agent.
```

!!! check "Done when"
    - [ ] Re-invoking **Idea Advisor** returns real recommendations grounded in your
      ideas — naming specific ones and explaining why.

---

## If you get stuck

- **App not in the navigator?** Refresh the menu / re-open the app.
- **A field or bit of data missing?** A short follow-up prompt fixes it — you don't
  start over.
- **Build Agent says it "can't" do something?** Ask it to try anyway, or rephrase.
