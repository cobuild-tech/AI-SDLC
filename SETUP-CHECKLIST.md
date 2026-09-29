# Workshop setup checklist

**Do this once, before your first session · about 15 minutes**

Every module is hands-on, so you need these on your own laptop. You don't need a GitHub account.

The workshop has two paths with the same exercises: **JavaScript** and **Python**. Pick one, and install what that path needs.

---

## 1. Check what you have

In a terminal, run:

```bash
git --version
```

Then run the commands for your path.

**JavaScript path:**

```bash
node --version
npm --version
```

**Python path:**

```bash
python3 --version     # Windows: py --version
```

You need **Git 2.40+**, plus either **Node.js 20+ and npm 10+** (JavaScript) or **Python 3.11+** (Python). If everything is new enough, skip to step 3.

---

## 2. Install what's missing

- **Git:**
  - Windows: https://git-scm.com/download/win
  - macOS: run `git --version` and accept the install prompt
  - Linux: `sudo apt install git` or `sudo dnf install git`
- **Node.js** (JavaScript path; npm comes with it): download the LTS installer from https://nodejs.org and run it.
- **Python** (Python path): download Python 3.11 or newer from https://www.python.org/downloads/ and run the installer. On Windows, tick **Add python.exe to PATH**. On Linux, also install the `venv` module (for example `sudo apt install python3-venv`).

Close and reopen the terminal, then run the commands from step 1 again.

---

## 3. Install VS Code and your coding agent

- Install **VS Code**: https://code.visualstudio.com
- In VS Code, open **Settings** (`Ctrl+,` / `Cmd+,`), search for `openRepositoryInParentFolders`, and set **Git: Open Repository In Parent Folders** to `always`. Each module is a folder inside one Git repository, and without this setting Source Control stays empty when you open a module's folder.
- **Python path:** install the **Python** extension from Microsoft in VS Code. It finds each module's `.venv` and activates it in new terminals.
- Install the **coding agent** your facilitator named, and sign in.
- Check it can **read files, edit files and run terminal commands**. Ask it to run `git --version` and tell you the result.
- Find its **plan / ask / approval mode**, the setting that makes it ask before changing anything. You'll use it in every module.

---

## 4. How every module works

1. Clone the workshop code once, before the first module (see the [README](README.md#2-get-the-code-once-for-every-module)):

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with a `javascript` and a `python` folder, each with one folder per module.
2. In VS Code, choose **File → Open Folder** and open that module's folder for your path, for example `AI-SDLC/javascript/module-1` or `AI-SDLC/python/module-1`. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. **Python path:** each module has its own virtual environment. The module's guide shows how to create it (`python3 -m venv .venv`), activate it and install its requirements. Activate it in the terminal before you start your agent, so the agent's commands use it too.
4. Start your agent **in that module folder**, not the `AI-SDLC` folder.
5. Follow the module's `PARTICIPANT-GUIDE.md`.
6. When you finish a module, commit or discard your changes, and make sure you're back on the `demo-exercise` branch (`git switch demo-exercise`). Every module shares one repository, so leftover changes show up in the next module's Source Control.

---

**Can't install software on a work laptop?** Tell your facilitator **before** the workshop.

**No internet for npm or pip?** Ask your facilitator for an internal package mirror. Don't copy `node_modules` or `.venv` from someone else's machine.
