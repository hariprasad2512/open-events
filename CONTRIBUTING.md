# CONTRIBUTING.md

> Contribution and collaboration guidelines for Startup Traction Intelligence.

This repository is developed collaboratively by human team members and AI-assisted development tools.

The goal is to keep changes:

- focused
- reviewable
- reproducible
- understandable by the entire team

---

# 1. Before You Start

Before starting any task, read:

1. `AI_INSTRUCTIONS.md`
2. `PROJECT_STATE.md`
3. `DECISIONS.md`
4. `TASKS.md`

Then inspect any relevant documentation under:

```text
docs/
```

## Branching Strategy

- **`main`**: Production-ready code. Never commit directly to `main`.
- **`pranav/repo-env-init` or `feature/<name>`**: Feature branches. Use your name/initials or descriptive identifiers.
- **Pull Requests**: Submit PRs to `main`. All PRs must pass automated CI pipeline tests before merging.

## Commits & Messages

Write descriptive commit messages following the Conventional Commits specification:
- `feat(...)`: A new user-facing feature.
- `fix(...)`: A bug fix.
- `docs(...)`: Documentation changes.
- `style(...)`: Formatting, missing semicolons, etc.
- `refactor(...)`: Code changes that neither fix a bug nor add a feature.
- `test(...)`: Adding missing tests or correcting existing tests.
- `chore(...)`: General maintenance, dependencies, etc.

## Code Standards

- **Python**: Follow PEP 8 guidelines. Always document classes and functions.
- **TypeScript / React**: Use modern functional components with hooks, strict typing, and clean folder organization.
- **Linting**: Ensure your editor loads formatting rules from the `.editorconfig` file.
