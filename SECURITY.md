# Security Guidelines

- Do not commit plain `.env` files. Use environment variables or secure vaults.
- If secrets have been accidentally committed, remove them from your Git history using tools like BFG Repo-Cleaner or git filter-branch.
- Review GitHub's guidance on [Secret Scanning and Push Protection](https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection).
