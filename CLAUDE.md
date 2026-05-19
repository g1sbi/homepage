# Homepage — Claude Guidelines

## Branching

**Never commit feature work directly to `main`.** A GitHub Actions hook auto-deploys to the production server on every push to `main`. Always create a feature branch (e.g. `feat/<name>`) and merge via PR when ready.
