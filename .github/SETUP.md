# Branch Protection Setup

After copying the `.github` folder to your repo, enable branch protection to enforce the time check.

## Steps

1. Go to your repo on GitHub
2. **Settings** → **Branches** → **Add branch protection rule**
3. Set **Branch name pattern** to `main` (or your default branch)
4. Enable these options:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
5. In the status checks search box, search for **Validate Time Entry** and select it
   - Note: The check won't appear until the action has run at least once. Merge the `.github` files first, then come back to enable this.
6. Save changes

## How It Works

- Developers open a PR and see the template with `hours:` field
- They enter their time (e.g., `hours: 2.5`)
- The GitHub Action validates the entry is present and a valid number
- If missing or invalid, the check fails and the PR cannot be merged
- A bot comment tells the developer exactly what to fix
