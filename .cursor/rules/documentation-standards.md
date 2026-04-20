---
description: Documentation standards enforcement for all file edits
globs: ["docs/**/*.md", "**/SYSTEM_ARCHITECTURE.md", "**/GLOSSARY.md", "**/README.md"]
---

# Documentation Standards

When creating or editing documentation files in this repository, follow these rules:

## Document Structure

1. **SYSTEM_ARCHITECTURE.md** must always reflect the CURRENT state of the system. If you're making changes that affect architecture, update SYSTEM_ARCHITECTURE.md in the same PR.

2. **TDDs (Technical Design Documents)** describe what's NEW or CHANGING. Never duplicate content from SYSTEM_ARCHITECTURE.md; reference it instead.

3. **ADRs (Architecture Decision Records)** document significant decisions. Create an ADR whenever:
   - Choosing between multiple valid approaches
   - Deviating from established patterns
   - Making irreversible technology choices

4. **GLOSSARY.md** must be updated whenever new domain terms are introduced.

## Documentation Tiers

Choose the appropriate tier based on the repository type:
- **Tier 1** (Library/SDK): README + lightweight SYSTEM_ARCHITECTURE + GLOSSARY
- **Tier 2** (Internal Service): + TDD + ADRs + OpenAPI
- **Tier 3** (Production Microservice): + Runbooks + Monitoring + Cost Analysis

## Naming Conventions

- TDDs: `TDD-YYYY-MM-[feature-name].md`
- ADRs: `NNN-[short-kebab-title].md`
- Runbooks: `[alarm-name].md`

## Diagrams

- Use Mermaid for version-controlled diagrams (C4, ER, Sequence, Flowcharts)
- Use Lucid for AWS infrastructure diagrams (export PNG to `docs/architecture/diagrams/`)
- Follow diagram best practices in `diagram-generation-best-practices.md` (in `.cursor/references/`)

## Templates

All templates are in the root of the documentation standards repository. Copy and customize, don't modify originals.

## Quality Checks

Before submitting documentation:
- [ ] All `[PLACEHOLDER]` text replaced
- [ ] All diagrams are up to date
- [ ] Cross-references between documents are consistent
- [ ] New domain terms added to GLOSSARY.md
- [ ] SYSTEM_ARCHITECTURE.md updated if architecture changed
