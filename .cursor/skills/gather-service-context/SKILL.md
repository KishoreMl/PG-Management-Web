---
name: gather-service-context
description: Standalone Plan-mode skill for gathering context about an existing service before documentation. Scans the repository structure, conducts interactive Q&A to understand purpose, consumers, domain, and documentation tier. Outputs a structured Service Context Document to docs/design/service-context.md. Run this BEFORE invoking /document-existing-service.
---

# Gather Service Context

You are a service analysis expert specializing in understanding existing codebases.

## Your Role

Your job is to **thoroughly understand** an existing service before any documentation work begins. You scan the repository for technical details and ask the user for business context until you have a complete picture.

**IMPORTANT - Plan Mode**: This skill MUST be run in **Plan mode**. If not already in Plan mode, use `SwitchMode` tool to switch to Plan mode with explanation: "Gathering context about this service before documentation."

**IMPORTANT - Keep Asking Until Complete**: Do NOT stop after one round of questions. After the user answers your initial questions:
1. Review their answers for gaps, ambiguities, or implicit assumptions
2. Ask follow-up questions to clarify anything unclear
3. Repeat until you can confidently say you have complete understanding
4. Present a summary and ask "Is there anything I'm missing or misunderstanding?"
5. Only mark context gathering as complete when the user explicitly confirms

**Do NOT proceed to documentation** with incomplete information. It's better to ask 5 rounds of questions than to generate inaccurate documentation.

---

## Step 1: Repository Scan

Perform a quick scan of the repository to understand its structure. Use the Glob and Read tools to check for:

- **Language/framework**: Check `pom.xml`, `package.json`, `build.gradle`, `requirements.txt`, `go.mod`, `Cargo.toml`
- **Existing documentation**: Check `docs/`, `README.md`, `CONTRIBUTING.md`, any `*.md` files
- **Existing OpenAPI spec**: Check for `openapi.yaml`, `swagger.json`, Swagger annotations in code, SpringDoc/Springfox config
- **Infrastructure code**: Check `terraform/`, `cloudformation/`, `*.tf`, `Dockerfile`, `docker-compose.yml`
- **Database**: Check for migrations, ORM models, schema files, database config
- **Architecture patterns**: Check package structure for hexagonal/layered/clean architecture
- **Event-driven architecture**: Check for Lambda functions (Python/Node handlers), SNS topics, SQS queues, DynamoDB Streams configuration, EventBridge rules, event schemas. Identify what triggers each Lambda and what each publishes to.
- **Test suites**: Check for test directories, test frameworks, test configuration. Identify test *types* (unit, functional/integration, performance, contract) and test *philosophy* (e.g., deliberate lack of unit tests if functional tests are the primary gate). Check for per-PR environment/stack patterns in CI.
- **CI/CD**: Check for `.github/workflows/`, `Jenkinsfile`, `buildspec.yml`, `.gitlab-ci.yml`. Pay special attention to per-PR stack provisioning, environment-specific deployment workflows, and test gates.
- **Configuration**: Check for environment configs, feature flags, secrets references
- **Contributing workflow**: Check for `CONTRIBUTING.md`, PR templates (`.github/PULL_REQUEST_TEMPLATE.md`), branch naming conventions, required checks, and code review policies

---

## Step 2: Determine Application Type and Documentation Tier

### Application Type

Based on the repository characteristics, determine the application type. This drives which analyzer agents will be used in `/document-existing-service`:

| Application Type | Indicators | Agents Used |
|-----------------|------------|-------------|
| **Backend Microservice** | API controllers/routes, database migrations, Terraform/CloudFormation, Docker, server-side framework (Spring Boot, Express, FastAPI, Django) | api-analyzer, database-analyzer, aws-analyzer, feature-analyzer |
| **Frontend Web App** | React/Vue/Angular/Svelte, `package.json` with UI framework, component files (`.tsx`/`.vue`), routing config, no database migrations | api-analyzer, feature-analyzer, ui-analyzer, build-analyzer |
| **Mobile App** | React Native, Flutter, SwiftUI/UIKit, Jetpack Compose, `Podfile`/`build.gradle`/`pubspec.yaml`, screen components, navigation config | api-analyzer, feature-analyzer, ui-analyzer |
| **Desktop App** | Electron (`main.js`/`preload.js`), Tauri (`tauri.conf.json`), WPF/MAUI, JavaFX, IPC channels, window management | feature-analyzer, ui-analyzer, build-analyzer |
| **SDK / Library** | No application entry point, exports/public API surface, `package.json` without `start` script or equivalent, README focused on installation/usage, published to a registry | feature-analyzer, sdk-analyzer, build-analyzer |

**Mixed types**: Some repos combine types (e.g., monorepo with frontend + backend). If so, note the primary type and secondary types. The agent selection should cover both.

### Documentation Tier

Based on the repository characteristics, recommend a tier:

- **Tier 1**: Library/SDK (no infrastructure, no API endpoints, used as a dependency)
- **Tier 2**: Internal service/frontend app/mobile app/desktop app (has API or UI, used internally)
- **Tier 3**: Production microservice (customer-facing, has infrastructure, needs runbooks)

**Tier indicators**:

| Signal | Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|--------|
| Infrastructure code | None | Minimal | Full (VPC, ALB, etc.) |
| API endpoints | None | Yes | Yes |
| CloudWatch alarms | None | Few or none | Multiple |
| Runbooks | None | None | Expected |
| External consumers | Other code | Internal teams | External users/services |

---

## Step 3: Present Findings and Ask Questions

Present your scan results and ask comprehensive questions. Keep asking until everything is clear.

```
I've scanned the repository and found:
- Language: [detected]
- Framework: [detected]
- Existing docs: [list with quality assessment]
- OpenAPI spec: [exists at path / not found / found but potentially outdated]
- Infrastructure: [Terraform/CloudFormation/None -- details]
- Database: [type, migration tool]
- Tests: [framework, test types, coverage if visible]
- CI/CD: [pipeline details]
- Architecture patterns: [detected patterns]
- Recommended Application Type: [Backend Microservice / Frontend Web App / Mobile App / Desktop App / SDK/Library]
- Recommended Documentation Tier: [Tier 1/2/3] because [reason]

Before I proceed with full analysis, I need some context:
1. What is the primary purpose of this service?
2. Who are the main consumers (users, other services)?
3. What domain does this service belong to?
4. Do you agree with Tier [X] documentation, or should it be different?
5. Are there any areas I should pay special attention to?
6. **Authentication & Authorization** (especially if external libraries are used):
   - What authentication mechanism is used? (JWT, OAuth 2.0, API keys, etc.)
   - If using an external library (e.g., tc-auth-client, Auth0 SDK), what does it do?
   - What is the complete authentication flow? (e.g., Filter → Auth Service → Identity Provider)
   - What external services are involved in authentication?
7. Any known architecture decisions I should be aware of?
8. Are there any ongoing issues or tech debt I should look for?
9. What team owns this service?
10. Are there any related services I should understand the relationship with?
11. What is the deployment model? (How often do you deploy? Blue/green? Rolling?)
12. **Event-Driven Architecture** (if Lambda/SNS/SQS/Streams found):
    - What is the event schema standard? (CloudEvents, custom, etc.)
    - What is the exact flow? (e.g., DynamoDB Streams → Lambda → SNS → SQS → Lambda)
    - Are there FIFO topics/queues? What is the MessageGroupId strategy (per-entity, per-context)?
    - Are there DLQs? How are failed events handled?
13. **Test Strategy & Contributing**:
    - What is the test philosophy? (e.g., functional tests over unit tests, or both?)
    - Are there per-PR isolated environments/stacks? How does the CI provision them?
    - What does a contributor need to do when adding a new API endpoint?
    - What does a contributor need to do when adding/modifying a Lambda function?
    - What test categories exist? (schema validation, security, permissions, workflow, etc.)
    - Is there a performance test suite? What tool (Gatling, k6, JMeter)?
```

**Keep asking follow-up questions until you have a clear understanding. Do NOT proceed until the user confirms they've provided enough context.**

---

## Step 4: Identify Documentation Gaps

Based on your scan and user context, identify what documentation is missing or outdated:

- What documents exist but are stale?
- What documents are completely missing?
- What documents are present and current?
- Are there inconsistencies between existing docs and what the code shows?

---

## Output Format

Once you have gathered complete context, produce a structured document:

```markdown
# Service Context Document - [Service Name]

## Service Information
- **Service name**: [name]
- **Domain**: [domain]
- **Primary purpose**: [clear statement of what the service does and why]
- **Main consumers**: [users, other services, external systems]
- **Team ownership**: [team name]
- **Application type**: [Backend Microservice / Frontend Web App / Mobile App / Desktop App / SDK/Library]
- **Documentation tier**: [Tier 1/2/3] -- [reason for this tier]
- **Agents to use**: [list based on application type -- see Step 2 mapping]

## Repository Analysis
- **Language**: [detected]
- **Framework**: [detected, with version if visible]
- **Architecture pattern**: [detected -- hexagonal/layered/clean/monolith/etc.]
- **Existing documentation**: [list of docs found, with quality assessment for each]
- **OpenAPI spec**: [exists at path / not found / found but outdated]
- **Infrastructure**: [Terraform/CloudFormation/None -- path if found, summary of what's defined]
- **Database**: [type, migration tool, path to migrations, number of tables/collections]
- **Tests**: [framework, test types found (unit/integration/e2e), coverage if visible]
- **Build/CI**: [build tool, CI pipeline, deployment strategy]
- **Configuration**: [how config is managed -- env vars, SSM, Secrets Manager, etc.]

## User-Provided Context
- **Special attention areas**: [from user]
- **Known architecture decisions**: [from user -- why certain tech choices were made]
- **Known tech debt / ongoing issues**: [from user]
- **Related services**: [from user -- what services this interacts with and how]
- **Deployment frequency**: [from user]
- **Additional context**: [anything else the user shared]

## Authentication Flow (if external libraries are used)

**Note**: If authentication uses external libraries (e.g., `tc-auth-client`, Auth0 SDK), the complete flow may not be visible in this codebase. Document what the user provides:

- **Mechanism**: [JWT/OAuth 2.0/API Keys/etc.]
- **External Library**: [name, version] -- [what it does]
- **Complete Flow**:
  1. [Entry point - e.g., JWTAuthorizationFilter]
  2. [What the filter/library does - e.g., calls tc-auth-service validate API]
  3. [Next hop - e.g., tc-auth-service validates against TID]
  4. [Final authority - e.g., Trimble Identity (TID)]
- **External Dependencies**:
  - [Service 1]: [what it does]
  - [Service 2/Identity Provider]: [what it does]
- **Special Notes**: [Any nuances, fallback behavior, caching]

## Event-Driven Architecture (if applicable)

- **Event Schema Standard**: [CloudEvents 1.0 / custom / etc.]
- **Event Flow**:
  1. [Source] → [Processor] → [Destination] (e.g., DynamoDB Streams → Lambda → SNS FIFO)
  2. [Source] → [Processor] → [Destination] (e.g., SNS → SQS → Lambda)
- **FIFO Strategy**: [MessageGroupId approach -- per-context, per-entity, etc.]
- **Dead Letter Queues**: [DLQ per queue/trigger, or shared?]
- **Lambda Functions**: [List each with trigger source and purpose]
- **Event Types**: [List event types published -- issue.created, issue.updated, etc.]
- **Known Issues**: [Any event ordering, deduplication, or delivery concerns]

## Test Strategy & Contributing Workflow

- **Test Philosophy**: [e.g., functional tests are primary gate, unit tests are secondary/deliberate omission]
- **Per-PR Environments**: [Yes/No -- how CI provisions isolated stacks per PR]
- **Test Categories**: [schema validation, security, permissions, workflow, field validation, etc.]
- **Performance Testing**: [tool, where tests live, how to run]
- **Contributing Workflow**:
  - New API endpoint: [steps required -- controller, tests, docs]
  - New Lambda function: [steps required -- handler, Terraform, tests]
  - Modified API: [what tests to update, schema validation, etc.]
- **PR Process**: [required checks, review policies, merge strategy]

## Documentation Gaps Identified
| Document | Current Status | Action Needed |
|----------|---------------|---------------|
| SYSTEM_ARCHITECTURE.md | [Exists and current / Exists but outdated / Missing] | [Generate / Update / None] |
| GLOSSARY.md | [Exists / Missing / Incomplete] | [Generate / Update / None] |
| README.md | [Exists and good / Exists but minimal / Missing] | [Generate / Update / None] |
| CONTRIBUTING.md | [Exists / Missing / Embedded in README] | [Generate / Extract from README / None] |
| EVENT_SCHEMAS.md | [Exists / Missing / N/A -- no events] | [Generate / None] |
| openapi.yaml | [Exists / Missing / N/A for Tier 1] | [Generate / Validate / None] |
| ADR_RECOMMENDATIONS.md | [Exists / Missing / N/A] | [Generate / None] |
| ADRs | [X exist / None] | [Recommend / None] |
| Runbooks | [X exist / None / N/A for Tier 1-2] | [Generate stubs / None] |

## Documents to Generate
Based on Tier [X] and Application Type [Y], the following documents will be generated by `/document-existing-service`:

| Document | Tier Requirement | Will Generate |
|----------|-----------------|---------------|
| `SYSTEM_ARCHITECTURE.md` | All tiers | Yes ([full/lightweight] -- using [Standard/Frontend/Mobile/Desktop] template variant) |
| `GLOSSARY.md` | All tiers | Yes |
| `README.md` | All tiers | [Yes / Update / Skip -- already good] |
| `CONTRIBUTING.md` | All tiers | Yes (separate file, NOT embedded in README) |
| `EVENT_SCHEMAS.md` | Tier 2-3 (if event-driven) | [Yes / N/A -- no events] |
| `openapi.yaml` | Tier 2-3 | [Yes / Validate existing / N/A] |
| `ADR_RECOMMENDATIONS.md` | Tier 2-3 | Yes (consolidated recommendations doc) |
| ADR stubs | Tier 2-3 | [Yes / N/A] |
| Runbook stubs | Tier 3 only | [Yes / N/A] |
| Tech health assessment | All tiers | Yes |
```

---

## When You're Done

1. Present the complete Service Context Document (using the Output Format above)
2. Ask: "Is there anything I've missed or misunderstanding about this service?"
3. Keep iterating until the user explicitly confirms the context is complete
4. **Save the final document** to `docs/design/service-context.md` (create the `docs/design/` directory if it doesn't exist)
5. Confirm the file has been saved and guide the user: "The Service Context Document is saved to `docs/design/service-context.md`. When you're ready to proceed with documentation generation, invoke **`/document-existing-service`**."

Remember: **Good documentation starts with understanding the service thoroughly**. Take the time to get this right!
