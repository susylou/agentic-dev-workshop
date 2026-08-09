# Before you start

A few things to have ready. Nothing here needs admin rights on your own machine.

!!! info "Whichever persona you came as"
    The deck frames this as **Pro developer**, **Low-code dev** and **Business
    User/SME** building together. That split holds here too: the **Build Agent lab
    runs entirely in the browser** with nothing to install, and the **off-platform SDK
    build** is the pro-dev lane. You don't need to do both — and if you get stuck,
    grab one of the gurus in the room.

## For everyone

- [ ] **Access to your workshop instance** — URL, username, password.
- [ ] **A modern browser** — for the ServiceNow UI and this guide.

## For the Build Agent lab

Nothing to install — it's all in the browser.

### What is ServiceNow Studio?

Studio is the modern development environment on the ServiceNow AI Platform. It is where
ServiceNow creators build applications: tables, flows, UI, and everything in between.
Unlike a traditional development environment it supports a drag-and-drop experience and
more of a *what you see is what you get* approach. Think of it as your workbench for
today's lab. Everything you build will live in Studio.

### What is Build Agent?

Build Agent is an agentic AI assistant that lives inside Studio. You will see it through
the **Now Assist** experience in Studio. You describe what you want in plain English, and
Build Agent creates the application components for you — tables, business rules, UI
pages, automation, sample data, the works. It knows how ServiceNow fits together, so it
builds things the platform way.

### Getting into Studio

1. **Log in** to your workshop instance with the URL and credentials you were given.

2. **Open Studio** — click **All** in the top navigator, type `ServiceNow Studio`, and
   press Enter.

    ![Typing "ServiceNow Studio" into the filter navigator](images/servicenowStudio.avif){ width="760" }

3. **Check it opened** — the URL will contain `sn_glider_app/servicenow_studio.do`.

4. **Wait for the Build Agent** — the Now Assist panel opens on the right with a welcome
   message. Give it a moment; it isn't instant.

    ![ServiceNow Studio with the Now Assist panel showing the Build Agent welcome](images/servicenowStudioBA.avif){ width="760" }

!!! check "Done when"
    - [ ] Studio is open and the URL contains `servicenow_studio.do`.
    - [ ] The Now Assist panel shows the Build Agent welcome message.

!!! warning "If the panel doesn't appear"
    Click the **Open Build Agent** icon in the Studio toolbar, lower right.

    ![The Open Build Agent icon in the Studio toolbar](images/openBA.avif){ width="420" }

## For the off-platform (SDK) build

Only needed if you want to follow the off-platform build hands-on.

- [ ] **Bring your own AI-enabled IDE** — Claude Code, Copilot, Cursor, or Devin.
      The SDK is editor-agnostic; any of these is fine.
- [ ] **Node.js 20.18.0+** (`node --version`) and **Git** (`git --version`).
- [ ] **ServiceNow SDK** installed — `npm install -g @servicenow/sdk`,
      then check with `now-sdk --version`.
- [ ] An **auth alias** to your instance set up in your terminal
      (we set this in the terminal, never in a prompt).

Full step-by-step — versions, install, authentication and the command reference — is on
the [Off-platform build (SDK)](track-b-sdk-devin.md) page. Start there if any of the
above is new to you.

!!! tip "Watching is fine"
    The off-platform build takes ~40 minutes end to end. If you'd rather watch than
    follow, that's the intended experience for most of the room — the prompts are all
    here to take away.

## Links for later

- **ServiceNow SDK on npm** — <https://www.npmjs.com/package/@servicenow/sdk>
- **ServiceNow SDK documentation** —
  <https://docs.servicenow.com/csh?topicname=servicenow-sdk-landing.html>
- Everything else is on the [Resources & where next](resources.md) page.
