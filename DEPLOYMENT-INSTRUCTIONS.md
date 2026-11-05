# Daymark React Deployment — Submission

The assignment requires a **public GitHub repository** containing the original React capstone source code and a `github.txt` file containing **only** the final repository URL. Render deployment and `link.txt` are optional.

## 1. Verify locally

Open `event-planner` in VS Code and run:

```powershell
npm.cmd install
npm.cmd run test
npm.cmd run build
```

## 2. Create the public GitHub repository

Go to https://github.com/new, name it `daymark-event-planner`, choose **Public**, and create it **without** initialising README, .gitignore or licence (the project already has a README and .gitignore).

## 3. Push the existing project

In the VS Code terminal opened inside `event-planner`:

```powershell
git init
git add .
git commit -m "Deploy Daymark React capstone"
git branch -M main
git remote add origin https://github.com/HeinSS/daymark-event-planner.git
git push -u origin main
```

If Git says origin already exists, use `git remote set-url origin https://github.com/HeinSS/daymark-event-planner.git` instead of `git remote add origin ...`.

## 4. Complete submission

After the public repository is live, create `github.txt` in the **submission folder** (alongside `event-planner`) with a single line:

`https://github.com/HeinSS/daymark-event-planner`

Only use that URL if that is the actual repository you created. Confirm it loads publicly before submitting. Upload the project source plus `github.txt`; don't upload `node_modules`, `.git` or `dist`.

## Optional Render

Connect the GitHub repository in Render, choose Static Site, build command `npm install && npm run build`, publish directory `dist`. If the site is live, add `link.txt` in the submission folder with only its actual deployment URL.
