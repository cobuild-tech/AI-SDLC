# Workshop setup checklist

**Do this once, before your first session · about 15 minutes**

Every module is hands-on, so you need these on your own laptop. You don't need a GitHub account.

---

## 1. Check what you have

In a terminal, run:

```bash
node --version
npm --version
git --version
```

You need **Node.js 20+**, **npm 10+** and **Git 2.40+**. If all three are new enough, skip to step 3.

---

## 2. Install what's missing

- **Node.js** (npm comes with it): download the LTS installer from https://nodejs.org and run it.
- **Git:**
  - Windows: https://git-scm.com/download/win
  - macOS: run `git --version` and accept the install prompt
  - Linux: `sudo apt install git` or `sudo dnf install git`

Close and reopen the terminal, then run the three commands again.

---

## 3. Install VS Code and your coding agent

- Install **VS Code**: https://code.visualstudio.com
- In VS Code, open **Settings** (`Ctrl+,` / `Cmd+,`), search for `openRepositoryInParentFolders`, and set **Git: Open Repository In Parent Folders** to `always`. Each module is a folder inside one Git repository, and without this setting Source Control stays empty when you open a module's folder.
- Install the **coding agent** your facilitator named, and sign in.
- Check it can **read files, edit files and run terminal commands**. Ask it to run `git --version` and tell you the result.
- Find its **plan / ask / approval mode**, the setting that makes it ask before changing anything. You'll use it in every module.

---

## 4. How every module works

1. Clone the workshop code once, before the first module (see the [README](../README.md#2-get-the-code-once-for-every-module)):

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with one folder per module.
2. In VS Code, choose **File → Open Folder** and open that module's folder inside `AI-SDLC`, for example `AI-SDLC/module-1`. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Start your agent **in that module folder**, not the `AI-SDLC` folder.
4. Follow the module's `PARTICIPANT-GUIDE.md`.
5. When you finish a module, commit or discard your changes, and make sure you're back on the `demo-exercise` branch (`git switch demo-exercise`). Every module shares one repository, so leftover changes show up in the next module's Source Control.

---

**Can't install software on a work laptop?** Tell your facilitator **before** the workshop.

**No internet for npm?** Ask your facilitator for an internal package mirror. Don't copy `node_modules` from someone else's machine.
