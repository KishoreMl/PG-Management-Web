---
name: document-existing-service
description: Analyze an existing codebase and generate comprehensive documentation including SYSTEM_ARCHITECTURE.md, GLOSSARY.md, CONTRIBUTING.md, EVENT_SCHEMAS.md, ADR_RECOMMENDATIONS.md, OpenAPI spec, runbooks, and tech health assessment using specialist analyzer subagents selected by application type. Requires a completed Service Context Document at docs/design/service-context.md (generate with /gather-service-context). Use when documenting an undocumented or poorly documented existing service.
disable-model-invocation: true
---

# Document Existing Service

> **Trigger**: `/document-existing-service`
>
> **Purpose**: Analyze an existing codebase and generate comprehensive documentation: SYSTEM_ARCHITECTURE.md, GLOSSARY.md, CONTRIBUTING.md (separate file), EVENT_SCHEMAS.md (if event-driven), ADR_RECOMMENDATIONS.md, OpenAPI spec (if missing), runbook stubs, and tech health assessment. Documents are generated following the organization's documentation standards.
>
> **Prerequisite**: A completed Service Context Document must exist at `docs/design/service-context.md`. Generate it first with `/gather-service-context`.
>
> **Duration**: ~30-60 minutes depending on codebase size

---

## Progress Tracking (MANDATORY)

**At the start of this workflow**, use the `TodoWrite` tool to create a progress checklist. Update it as each step completes. This ensures nothing is skipped and the user can see progress at any time.

**Create this checklist immediately**:

```
TodoWrite (merge: false):
- [ ] Prerequisite: Verified service context and determined application type + agents
- [ ] Step 1: All selected subagents launched and completed
- [ ] Step 1B: Event flow verification (backend microservices with event-driven architecture only)
- [ ] Step 2: Subagent results reviewed by user
- [ ] Step 3: Architecture diagram generated (AWS diagram for backend; skip for SDK/Library)
- [ ] Step 4: SYSTEM_ARCHITECTURE.md generated (using correct template variant for app type)
- [ ] Step 5: GLOSSARY.md generated
- [ ] Step 5B: README.md generated/updated (SDK README Template for libraries)
- [ ] Step 5C: CONTRIBUTING.md generated (separate file with full workflow details)
- [ ] Step 5D: EVENT_SCHEMAS.md generated (if event-driven)
- [ ] Step 6: OpenAPI spec generated (if applicable -- backend/API services only)
- [ ] Step 7: Technical health assessment complete
- [ ] Step 8: ADR_RECOMMENDATIONS.md consolidated document generated
- [ ] Step 8A: ADR stubs generated for top recommendations
- [ ] Step 8B: Runbook stubs generated (Tier 3 only)
- [ ] Step 9: Quality review loop passed (including Mermaid syntax validation)
- [ ] Step 10: Final review presented to user
- [ ] Step 11: Feedback checkpoint (user prompted, optional)
- [ ] Step 12: Cleanup working files and uninstall guidance
```

**Rules**:
- Mark each item `in_progress` when starting, `completed` when done
- If a step is skipped (e.g., Step 7B for non-Tier-3), mark it `cancelled` with a note
- At each interactive checkpoint, show the user the current progress state
- **Do NOT proceed past Step 9 with any item still `pending`** (except cancelled items)

---

## Overview

This skill orchestrates specialist subagents (selected based on application type) to analyze different aspects of a codebase in parallel, then synthesizes their findings into complete architecture documentation, with a review loop to ensure quality and completeness.

**Documentation Standards Compliance**:
- Search the workspace for `DOCUMENTATION_STANDARDS.md` and read it to understand tier requirements
- Read the documentation tier from the Service Context Document at `docs/design/service-context.md`
- Generate ONLY the documents required for the determined tier
- Follow the repository folder structure defined in the documentation standards
- Use templates from the workspace (search for template files by name, e.g., `system-architecture-template.md`)

**Agent Selection by Application Type**:

Read the **Application Type** and **Agents to use** fields from the Service Context Document. Select agents based on this mapping:

| Application Type | Agents | SYSTEM_ARCHITECTURE Template |
|-----------------|--------|------------------------------|
| **Backend Microservice** | api-analyzer, database-analyzer, aws-analyzer, feature-analyzer | `system-architecture-template.md` (standard) |
| **Frontend Web App** | api-analyzer, feature-analyzer, ui-analyzer, build-analyzer | `frontend-system-architecture-template.md` |
| **Mobile App** | api-analyzer, feature-analyzer, ui-analyzer | `mobile-system-architecture-template.md` |
| **Desktop App** | feature-analyzer, ui-analyzer, build-analyzer | `desktop-system-architecture-template.md` |
| **SDK / Library** | feature-analyzer, sdk-analyzer, build-analyzer | `system-architecture-template.md` (lightweight) |

**For SDK/Library repositories**: Use `sdk-readme-template.md` instead of `readme-template.md` for the README.

**Mixed types**: If the Service Context Document notes multiple types (e.g., monorepo with frontend + backend), launch agents for all applicable types.

**What Gets Generated** (varies by tier):

| Document | Tier 1 | Tier 2 | Tier 3 |
|----------|--------|--------|--------|
| `SYSTEM_ARCHITECTURE.md` | Yes (lightweight) | Yes (full) | Yes (full) |
| `GLOSSARY.md` | Yes | Yes | Yes |
| `README.md` | Yes | Yes | Yes |
| `CONTRIBUTING.md` | Yes | Yes | Yes |
| `EVENT_SCHEMAS.md` | - | Yes (if event-driven) | Yes (if event-driven) |
| `openapi.yaml` | - | Yes (if missing) | Yes (if missing) |
| `ADR_RECOMMENDATIONS.md` | - | Yes | Yes |
| ADR stubs | - | Yes | Yes |
| Runbook stubs | - | - | Yes |
| Tech health assessment | Yes | Yes | Yes |

---

## Prerequisite: Verify Service Context Document

**Before starting any analysis work**, verify the Service Context Document exists and is complete.

1. **Check** that `docs/design/service-context.md` exists using the Read tool
2. **Scan** the document to confirm it has substantive content (not a stub or placeholder)
3. **Extract key information**: service name, domain, application type, documentation tier, agents to use, repository analysis results, user-provided context
4. **Confirm with the user**: "I've read the Service Context Document. This is a **[Application Type]** called [name] in the [domain] domain, at **Tier [X]**. I'll launch the following agents: [list agents]. Ready to proceed with analysis?"

**If the document doesn't exist or is incomplete**, tell the user:
```
The documentation pipeline requires a completed Service Context Document at docs/design/service-context.md.
Please run /gather-service-context first to scan the repository and gather context, then come back to /document-existing-service.
```

**If the document exists and is confirmed**, proceed to Step 1.

---

## Step 1: Launch Specialist Subagents (Parallel)

Launch the selected subagents **in parallel** using the **Task tool** -- send all Task tool calls in a single message. Each subagent is a custom agent defined in `.cursor/agents/`. **Which agents to launch is determined by the Application Type in the Service Context Document** (see Agent Selection table above).

### Fallback Strategy

Specialized `subagent_type` values (`api-analyzer`, `aws-analyzer`, `feature-analyzer`, etc.) may fail with "Tool failed; this may be temporary". If a specialized subagent fails:

1. **Retry once** with the same `subagent_type`.
2. **If it fails again**, fall back to `subagent_type: "generalPurpose"` with the same detailed prompt. This produces equivalent results. Include in the prompt: "You are acting as the [agent name] specialist. Follow the instructions in `.cursor/agents/[agent-name].md`."
3. Mark the fallback in your progress notes so it can be reported in the feedback step.

### Output File Location

All subagent analysis files MUST be saved to a consistent location. Include this instruction in every subagent prompt:

```
Save your complete analysis output to: docs/design/[SERVICE_NAME]_[AGENT_TYPE]_ANALYSIS.md
Example: docs/design/BCF_SERVICE_API_ANALYSIS.md
```

### Available Subagents

Launch ONLY the agents specified for the detected application type:

#### AWS Infrastructure Analyzer (Backend Microservice only)

Use the **Task tool** with:
- `subagent_type`: `"aws-analyzer"`
- `description`: `"Analyze AWS infrastructure"`
- `prompt`: Use the prompt template below, focused on: Terraform, CloudFormation, Docker, CI/CD files

**Returns**: AWS services list, networking topology, infrastructure diagram skeleton, deployment model, infrastructure domain terms

#### Database Schema Analyzer (Backend Microservice only)

Use the **Task tool** with:
- `subagent_type`: `"database-analyzer"`
- `description`: `"Analyze database schema and queries"`
- `prompt`: Use the prompt template below, focused on: Migration files, ORM models, repository/DAO code

**Returns**: ER diagram, query patterns, indexes, query-to-API mapping, database domain terms

#### API Analyzer (Backend Microservice, Frontend Web App, Mobile App)

Use the **Task tool** with:
- `subagent_type`: `"api-analyzer"`
- `description`: `"Analyze API endpoints and contracts"`
- `prompt`: Use the prompt template below, focused on: Controllers, routes, DTOs, middleware, error handling. Include existing OpenAPI spec status from the Service Context Document.

**Returns**: Endpoint catalog, OpenAPI spec (if missing), sequence diagrams, auth patterns, API domain terms

#### Business Feature Analyzer (All application types)

Use the **Task tool** with:
- `subagent_type`: `"feature-analyzer"`
- `description`: `"Analyze business features and integrations"`
- `prompt`: Use the prompt template below, focused on: Service layer, domain models, integration code, background jobs

**Returns**: Feature list, C4 component diagram, integration points, event-driven interactions, feature domain terms

#### UI & Component Analyzer (Frontend Web App, Mobile App, Desktop App)

Use the **Task tool** with:
- `subagent_type`: `"ui-analyzer"`
- `description`: `"Analyze UI components and frontend architecture"`
- `prompt`: Use the prompt template below, focused on: Component architecture, state management, routing, design system, accessibility, performance patterns

**Returns**: Component hierarchy, state architecture, route map, accessibility audit, performance patterns, UI domain terms

#### SDK & Library Analyzer (SDK / Library only)

Use the **Task tool** with:
- `subagent_type`: `"sdk-analyzer"`
- `description`: `"Analyze public API surface and library architecture"`
- `prompt`: Use the prompt template below, focused on: Exported API surface, versioning, compatibility, dependencies, documentation coverage

**Returns**: API catalog, compatibility matrix, dependency analysis, documentation gaps, SDK domain terms

#### Build & Pipeline Analyzer (Frontend Web App, Desktop App, SDK / Library)

Use the **Task tool** with:
- `subagent_type`: `"build-analyzer"`
- `description`: `"Analyze build configuration and CI/CD pipeline"`
- `prompt`: Use the prompt template below, focused on: Build tool config, bundling, CI/CD pipeline, publishing/deployment workflow, environment management

**Returns**: Build pipeline diagram, output format documentation, environment config, publishing workflow, build domain terms

### Prompt Template (use for each subagent)

```
Analyze the repository at [REPO_PATH].

Service context is documented at docs/design/service-context.md. Read this file for complete context including:
- Service purpose, domain, consumers
- Repository analysis results (language, framework, database, infrastructure)
- Documentation tier and what documents to generate
- User-provided context (special attention areas, known decisions, tech debt)

Your focus area: [specific focus from above]

Save your complete analysis to: docs/design/[SERVICE_NAME]_[AGENT_TYPE]_ANALYSIS.md
Return your complete analysis as a single markdown document.
```

---

## Step 1B: Event Flow Verification (If Event-Driven)

**CRITICAL**: Subagent analyses may misinterpret event flows (e.g., assuming all Lambdas read from DynamoDB Streams when only one does). Before proceeding, **verify the actual event architecture from code and Terraform**.

### What to Verify

1. **DynamoDB Streams consumers**: Check Terraform `aws_lambda_event_source_mapping` resources to confirm which Lambdas actually consume DynamoDB Streams vs. which consume from SQS queues.
2. **SNS/SQS topology**: Check Terraform for `aws_sns_topic_subscription` to see which SQS queues subscribe to which SNS topics, and which Lambdas consume from which queues.
3. **MessageGroupId strategy**: Read each Lambda's event publishing code to verify the actual `MessageGroupId` value used. This is critical for FIFO topics -- a common tech debt is using event UUID instead of a context/entity ID, which breaks per-entity ordering.
4. **DLQ configuration**: Check for `redrive_policy` on SQS queues and `on_failure` destinations on Lambda event source mappings. Verify if DLQs are per-queue or shared.
5. **EventBridge rules**: Check for `aws_cloudwatch_event_rule` / `aws_scheduler_schedule` to identify cron-triggered Lambdas.

### How to Verify

```
Launch an explore subagent to:
1. Search Terraform files for aws_lambda_event_source_mapping, aws_sns_topic_subscription, 
   aws_sqs_queue, redrive_policy, aws_cloudwatch_event_rule
2. Read each Lambda's handler code to identify what it publishes to (SNS topic ARN) 
   and what MessageGroupId value it uses
3. Return a verified event flow diagram showing: 
   [trigger source] → [Lambda] → [destination] for each Lambda
```

### Common Pitfalls

- **Assuming all Lambdas read from Streams**: Often only 1-2 Lambdas read DynamoDB Streams; others consume from SQS queues subscribed to an SNS topic
- **Missing DLQ-per-queue pattern**: Each SQS queue/Lambda trigger typically has its own DLQ
- **MessageGroupId mismatch**: Code may use event UUID instead of contextId/entityId, breaking FIFO ordering -- document this as tech debt if found

**Record verified findings** for use in Steps 4, 5D, and 7.

---

## Step 2: Review Subagent Results (Interactive)

Once all subagents complete, present a summary of findings to the user:

```
All [N] analyses are complete. Here's a summary of what was found:

[Include only sections relevant to the agents that were launched]
**Infrastructure**: [X] AWS services, [deployment model], [environments]       (if aws-analyzer ran)
**Database**: [X] tables, [Y] query patterns, [database type]                  (if database-analyzer ran)
**API**: [X] endpoints, [auth mechanism], [OpenAPI status]                      (if api-analyzer ran)
**Features**: [X] features, [architecture pattern], [Y] integrations           (if feature-analyzer ran)
**UI/Components**: [X] components, [state management], [routing]               (if ui-analyzer ran)
**SDK/API Surface**: [X] exports, [versioning], [compatibility]                (if sdk-analyzer ran)
**Build/CI**: [build tool], [CI pipeline], [output formats]                    (if build-analyzer ran)

Key Findings:
- [Notable finding 1]
- [Notable finding 2]
- [Any inconsistencies found between analyses]

Questions before I generate documentation:
1. Does this look accurate? Any corrections?
2. Are there any features or components missing from the analysis?
3. Any terminology corrections for the glossary?
```

**Wait for user confirmation before generating documents.**

---

## Step 3: Generate Architecture Diagram (FIRST)

**WHY FIRST**: Generate the diagram BEFORE SYSTEM_ARCHITECTURE.md so the architecture document can reference the actual generated diagram.

**Application Type Behavior**:
- **Backend Microservice**: Generate AWS architecture diagram (full)
- **Frontend Web App**: Skip diagram generation (architecture is documented via Mermaid in the template)
- **Mobile App**: Skip diagram generation
- **Desktop App**: Skip diagram generation
- **SDK / Library**: Skip diagram generation

**If diagram generation is skipped**, mark Step 3 as `cancelled` in the progress checklist and proceed to Step 4.

### Check for Diagram Generation Tools (in priority order)

**Option 1 (Preferred): MCP aws-diagram-mcp-server**

Check if the MCP `aws-diagram-mcp-server` is available (look for it in the MCP tools). This is the most reliable option -- no local package installation required. Use the `generate_diagram` tool with Python `diagrams` DSL code and set `workspace_dir` to the repository root. The MCP server handles execution.

If the MCP tool is available, use it to generate the diagram AND also create `scripts/generate_aws_diagram.py` so the team can regenerate locally without the MCP server.

**Option 2: Local Python diagrams package**

```bash
which dot && pip3 list | grep diagrams
```

**Option 3: Lucid instructions** (if neither tool is available)

### If Tools Available (MCP or Local): Auto-Generate Diagram

**IMPORTANT**: Follow diagram generation best practices from `.cursor/references/diagram-generation-best-practices.md`

Create a Python script using the AWS Analyzer's component list and save it to `scripts/generate_aws_diagram.py`:

```python
#!/usr/bin/env python3
"""
Generate AWS Architecture Diagram for [Service Name]

Update this script when AWS resources change.
Usage: python3 scripts/generate_aws_diagram.py
Output: docs/architecture/diagrams/aws-infrastructure.png
"""

from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import ECS, ECR, Lambda  # Import based on AWS Analyzer findings
from diagrams.aws.network import ALB, VPC, Route53
from diagrams.aws.database import RDS, Dynamodb, ElasticacheForRedis
from diagrams.aws.security import SecretsManager, CertificateManager, IAM
from diagrams.aws.storage import S3
from diagrams.aws.management import Cloudwatch
from diagrams.onprem.client import Users
from diagrams.onprem.vcs import Github

# Configuration
DIAGRAM_NAME = "[Service Name] - AWS Architecture"
OUTPUT_PATH = "docs/architecture/diagrams/aws-infrastructure"

with Diagram(DIAGRAM_NAME, 
             filename=OUTPUT_PATH,
             show=False,
             direction="LR",
             outformat="png"):
    
    # Build diagram based on AWS Analyzer component list
    # IMPORTANT PATTERNS TO FOLLOW:
    # 1. Verify architecture - don't assume ALB chains
    # 2. Show complete CI/CD: GitHub → ECR (push), GitHub → IAM → ECS (deploy), ECR → ECS (pull)
    # 3. Minimal labels - remove obvious ones, use colors/line-styles
    # 4. Implicit relationships - S3 "Access Logs" needs no arrows
    # 5. Dashed lines for config (certificates, IAM), solid for traffic
    # 6. Single arrow to shared services cluster (not individual arrows)

print(f"✅ Diagram generated: {OUTPUT_PATH}.png")
print("To update: edit scripts/generate_aws_diagram.py and rerun")
```

**Save script to**: `scripts/generate_aws_diagram.py`
**Run the script** to generate `docs/architecture/diagrams/aws-infrastructure.png`.

**Create scripts README**: `scripts/README.md` with usage documentation.

### If Tools NOT Available: Create Lucid Instructions

Generate `docs/architecture/diagrams/README.md` with complete component list from AWS Analyzer:

```markdown
# AWS Infrastructure Diagram

## Current State Diagram

**Action Required**: Create AWS infrastructure diagram in **Lucid** and export to:
- `aws-infrastructure.png`

### Components to Include

[Extract from AWS Analyzer results]

**Networking**:
- [List all networking components]

**Compute**:
- [List compute services with sizing]

**Data**:
- [List databases/caches with configuration]

**Security**:
- [List security services]

**Monitoring**:
- [List observability services]

### Traffic Flow

[Describe from AWS Analyzer findings]
```

### Installation Option

If user wants auto-generation but tools are missing, offer installation:

```bash
# macOS
brew install graphviz
pip3 install diagrams --break-system-packages

# Verify
python3 -c "import diagrams; print('✅ diagrams installed')"
dot -V
```

---

## Step 4: Generate SYSTEM_ARCHITECTURE.md

**NOW includes reference to the diagram generated in Step 3** (if applicable)

**Select the correct template** based on Application Type (search workspace for the template file):

| Application Type | Template to Use |
|-----------------|-----------------|
| Backend Microservice | `system-architecture-template.md` |
| Frontend Web App | `frontend-system-architecture-template.md` |
| Mobile App | `mobile-system-architecture-template.md` |
| Desktop App | `desktop-system-architecture-template.md` |
| SDK / Library | `system-architecture-template.md` (lightweight) |

Synthesize all subagent results into a complete document using the selected template.

**Tier-specific behavior**:
- **Tier 1**: Generate a lightweight version (Overview, Dependency Graph, Key Design Decisions only)
- **Tier 2/3**: Generate the full document per the template

**Mapping from subagent results to SYSTEM_ARCHITECTURE.md sections** (varies by application type -- use sections from the selected template):

**Backend Microservice**:

| Section | Source |
|---------|--------|
| Overview & Purpose | Service Context Document |
| C4 Context/Container Diagrams | Feature Analyzer + Service Context |
| Technology Stack | All subagents |
| AWS Infrastructure + Diagram | AWS Analyzer + Step 3 diagram |
| Database Architecture (ERD) | Database Analyzer (**use Mermaid-safe attribute names**) |
| API Endpoints | API Analyzer |
| Event-Driven Architecture | **Step 1B verified findings** (NOT raw subagent output) |
| Integration Points | Feature Analyzer |
| Deployment Model | AWS Analyzer |
| Security | API Analyzer + AWS Analyzer |

**Frontend Web App**:

| Section | Source |
|---------|--------|
| Overview & System Context | Service Context + Feature Analyzer |
| Technology Stack | All subagents |
| Component Architecture | UI Analyzer |
| State Management | UI Analyzer |
| Routing & Navigation | UI Analyzer |
| API Integration Layer | API Analyzer + UI Analyzer |
| Design System & Theming | UI Analyzer |
| Performance Architecture | UI Analyzer + Build Analyzer |
| Hosting & Deployment | Build Analyzer |
| Testing Architecture | All subagents |
| Accessibility | UI Analyzer |

**Mobile App**:

| Section | Source |
|---------|--------|
| Overview & System Context | Service Context + Feature Analyzer |
| Screen & Navigation Architecture | UI Analyzer |
| State Management | UI Analyzer |
| API Integration Layer | API Analyzer + UI Analyzer |
| Offline Strategy | Feature Analyzer + UI Analyzer |
| Push Notifications | Feature Analyzer |
| Deep Linking | UI Analyzer |
| Platform-Specific Architecture | UI Analyzer |
| Performance & Device Optimization | UI Analyzer |

**Desktop App**:

| Section | Source |
|---------|--------|
| Overview & System Context | Service Context + Feature Analyzer |
| Process Architecture (IPC) | UI Analyzer + Feature Analyzer |
| UI & Window Management | UI Analyzer |
| State Management | UI Analyzer |
| Local Data & Storage | Feature Analyzer |
| Native OS Integration | UI Analyzer + Feature Analyzer |
| Auto-Update Mechanism | Build Analyzer |
| Packaging & Distribution | Build Analyzer |

**SDK / Library**:

| Section | Source |
|---------|--------|
| Overview & Purpose | Service Context + SDK Analyzer |
| Public API Surface | SDK Analyzer |
| Architecture Overview | Feature Analyzer |
| Dependency Graph | SDK Analyzer + Build Analyzer |
| Versioning & Compatibility | SDK Analyzer |
| Build Outputs | Build Analyzer |

**Mermaid diagrams to include in SYSTEM_ARCHITECTURE.md**:
- C4 Context diagram (flowchart)
- C4 Container diagram (flowchart)
- ER diagram (erDiagram -- use `partitionKey`/`sortKey` instead of `PK`/`SK`)
- Event flow diagram (flowchart -- from Step 1B verified findings)
- Deployment pipeline diagram (flowchart)
- Auth flow diagram (sequence -- if complex auth chain)

**AWS Infrastructure Section**: Include reference to the generated diagram:

```markdown
### Infrastructure Diagram

**Generated Diagram**: An AWS architecture diagram has been auto-generated:
- `docs/architecture/diagrams/aws-infrastructure.png`

This diagram illustrates: [list key components from AWS Analyzer]

**Maintenance**: Update the diagram by editing `scripts/generate_aws_diagram.py` and rerunning.
```

**Write to**: `docs/architecture/SYSTEM_ARCHITECTURE.md`

---

## Step 5: Generate GLOSSARY.md

Merge domain terms from ALL subagents that were launched into a single GLOSSARY.md using the template `glossary-template.md` (search workspace for it).

**Sources** (include only those that ran):
- Infrastructure terms -> from AWS Analyzer
- Database/schema terms -> from Database Analyzer
- API/endpoint terms -> from API Analyzer
- Feature/domain terms -> from Feature Analyzer
- UI/component terms -> from UI Analyzer
- SDK/library terms -> from SDK Analyzer
- Build/tooling terms -> from Build Analyzer

**Deduplication**: If the same term appears from multiple subagents, merge their definitions and note all contexts.

**Write to**: `docs/architecture/GLOSSARY.md`

---

## Step 5B: Generate or Update README.md

If `README.md` doesn't exist or is minimal (< 20 lines), generate one using the appropriate template (search workspace):
- **SDK / Library**: Use `sdk-readme-template.md` (optimized for package consumers)
- **All other types**: Use `readme-template.md`

**Content from subagents**:
- Service name, purpose, domain -> from Service Context Document
- Tech stack -> from all subagents
- Quick start / setup instructions -> from Feature Analyzer + AWS Analyzer
- API overview -> from API Analyzer
- Architecture overview -> link to `docs/architecture/SYSTEM_ARCHITECTURE.md`
- **Contributing section**: Brief summary (2-3 sentences) linking to `CONTRIBUTING.md`. Do NOT put full contributing instructions in the README.
- **Documentation table**: Links to all generated docs (SYSTEM_ARCHITECTURE.md, GLOSSARY.md, CONTRIBUTING.md, EVENT_SCHEMAS.md, etc.)

**If README.md already exists and is substantial**: Leave it as-is, but ensure:
1. Contributing section links to `CONTRIBUTING.md` (not inline)
2. Documentation table includes all generated docs
3. No outdated tech stack references

**Write to**: `README.md` (repo root)

---

## Step 5C: Generate CONTRIBUTING.md (Separate File)

**IMPORTANT**: Contributing content MUST be in its own `CONTRIBUTING.md` file, NOT embedded in `README.md`. The README should only contain a brief "Contributing" section that links to `CONTRIBUTING.md`.

**Content to include** (sourced from Service Context Document and subagent results):

1. **Prerequisites**: Local development requirements (JDK, Python, Docker, Terraform, etc.)
2. **Repository Structure**: Brief overview of module/directory layout
3. **Development Workflow**: 
   - How to build locally
   - How to run tests locally
   - Linting / code style requirements
4. **PR Workflow** (with Mermaid diagram):
   - Branch naming conventions
   - Per-PR isolated environments/stacks (if applicable -- document how CI provisions them)
   - Required checks (build, test, lint, security scan)
   - Review and merge process
5. **Adding/Modifying an API Endpoint**: Step-by-step guide
   - Where to add the controller/route
   - DTO/model changes
   - Required test categories to add/update (schema, field, security, permission, workflow)
   - Database migration steps (if applicable)
6. **Adding/Modifying a Lambda Function**: Step-by-step guide (if applicable)
   - Handler code location and structure
   - Terraform infrastructure changes needed
   - Unit test requirements (e.g., pytest + LocalStack)
   - Integration with event architecture
7. **Testing Guide**:
   - Test philosophy (e.g., "functional tests are the primary gate, unit tests are secondary")
   - How to run each test type (functional, unit, performance)
   - Per-PR stack testing (if applicable)
   - Test coverage expectations per API
8. **Release Process**: How releases are triggered and deployed

**Write to**: `CONTRIBUTING.md` (repo root)

**Update README.md**: Ensure the README "Contributing" section is a brief summary linking to `CONTRIBUTING.md`:
```markdown
## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for the complete development and contribution guide.
```

---

## Step 5D: Generate EVENT_SCHEMAS.md (If Event-Driven)

**Skip if the service has no event-driven architecture.**

Document all event schemas published and consumed by the service, using findings from Step 1B (event flow verification).

**Content to include**:

1. **Event Standard**: What standard is used (CloudEvents 1.0, custom, etc.)
2. **Event Flow Overview**: Mermaid diagram showing the complete event flow (DDB Streams → Lambda → SNS → SQS → Lambda)
3. **SNS Routing Logic**: How events are routed (MessageAttributes, filter policies, MessageGroupId strategy)
4. **For each event type**:
   - Event type name (e.g., `issue.created`, `issue.updated`)
   - Source (which component publishes it)
   - Destination (SNS topic, with downstream SQS subscribers)
   - CloudEvents headers (source, type, subject, datacontenttype)
   - Full payload schema with field descriptions
   - Example JSON
5. **Tech Debt Callouts**: If verification in Step 1B found issues (e.g., incorrect MessageGroupId), add a visible "Tech Debt" callout box in the relevant event section
6. **Dead Letter Queue Handling**: How failed events are handled, retry policies

**Write to**: `docs/events/schemas/EVENT_SCHEMAS.md`

---

## Step 6: Generate OpenAPI Spec (If Missing)

If the API Analyzer generated a new OpenAPI spec (because none existed):

**Write to**: `docs/api/openapi.yaml`

If an OpenAPI spec already existed, note any discrepancies found by the API Analyzer and list them for the user to review.

---

## Step 7: Technical Health Assessment

Beyond documentation, provide a proactive assessment of the service's technical health:

### Architecture Fitness Assessment

Rate each dimension (1-5) with evidence:

| Dimension | Rating | Evidence | Recommendation |
|-----------|--------|----------|----------------|
| **Code Organization** | [1-5] | [Package structure, layer separation] | [Fix if < 3] |
| **Domain Modeling** | [1-5] | [DDD patterns, aggregate boundaries] | [Improve if < 3] |
| **API Quality** | [1-5] | [REST conventions, error handling, pagination] | [Fix if < 3] |
| **Database Health** | [1-5] | [N+1 queries, missing indexes, schema design] | [Fix if < 3] |
| **Test Coverage** | [1-5] | [Test types found, coverage indicators] | [Improve if < 3] |
| **Security Posture** | [1-5] | [Auth, encryption, secrets management, input validation] | [Fix if < 3] |
| **Observability** | [1-5] | [Logging, metrics, tracing, health checks] | [Improve if < 3] |
| **Operational Readiness** | [1-5] | [Health checks, graceful shutdown, deployment strategy] | [Fix if < 3] |
| **Dependency Freshness** | [1-5] | [Major version gaps, known CVEs in lock files] | [Update if < 3] |

### Tech Debt Inventory

Compile tech debt findings from all subagents into a prioritized list:

| # | Debt Item | Source | Impact | Effort to Fix | Priority |
|---|-----------|--------|--------|---------------|----------|
| 1 | N+1 queries in ProjectService | DB Analyzer | Performance degradation under load | Medium | High |
| 2 | Missing circuit breakers on User Service calls | Feature Analyzer | Cascade failure risk | Low | Critical |
| 3 | Hardcoded secrets in docker-compose | AWS Analyzer | Security vulnerability | Low | Critical |
| ... | | | | | |

### Performance Baseline Indicators

From the analysis, note what performance data is available or missing:
- **Has performance tests?**: [Yes/No -- if yes, where]
- **Has load test config?**: [Yes/No -- JMeter, k6, Gatling]
- **Database slow query log enabled?**: [Check RDS config]
- **APM instrumentation?**: [X-Ray, OTel, Datadog, New Relic]
- **Key bottleneck risks**: [Based on query patterns, connection pools, missing caching]

### Write Health Assessment as Standalone Document

Write the complete health assessment (fitness assessment table, tech debt inventory, and performance baseline indicators) to a standalone file:

**Write to**: `docs/architecture/TECHNICAL_HEALTH_ASSESSMENT.md`

Include a header linking back to SYSTEM_ARCHITECTURE.md for context.

---

## Step 8: ADR Recommendations and Consolidated Document

Based on the analysis, identify decisions that SHOULD be documented as ADRs.

**Look for**:
- Database technology choice (why PostgreSQL vs DynamoDB?)
- Architecture pattern choice (why hexagonal architecture?)
- Caching strategy (why Redis? what's cached?)
- Event-driven patterns (why EventBridge vs SQS direct?)
- Authentication mechanism (why this specific OAuth flow?)
- Any non-obvious technology choice
- Tech debt decisions (why something was done a certain way)
- Event ordering / MessageGroupId issues found in Step 1B
- Missing resilience patterns (circuit breakers, retries, bulkheads)
- Large class / module decomposition needs

### Generate ADR_RECOMMENDATIONS.md

Create a **consolidated recommendations document** summarizing all recommended ADRs with priority, rationale, and impact. This is a single reference document, separate from individual ADR stubs.

**Content structure**:

```markdown
# Architecture Decision Recommendations

## Overview
Identified [X] architectural decisions that should be formally documented.

## Recommendations

### Priority: Critical
| # | Decision | Problem | Recommendation | Impact if Deferred |
|---|----------|---------|----------------|--------------------|

### Priority: High
| # | Decision | Problem | Recommendation | Impact if Deferred |

### Priority: Medium
| # | Decision | Problem | Recommendation | Impact if Deferred |

## ADR Stubs Created
Links to individual ADR stubs in docs/architecture/decisions/
```

**Write to**: `docs/architecture/decisions/ADR_RECOMMENDATIONS.md`

### Generate Individual ADR Stubs

For the top 2-3 highest priority recommendations, create individual ADR stub files using the ADR template.

**Write to**: `docs/architecture/decisions/NNN-[decision-name].md`

**Present to user**:

```
I've created:
1. ADR_RECOMMENDATIONS.md -- consolidated list of [X] recommendations with priorities
2. [N] individual ADR stubs for the highest-priority items

Recommendations summary:
- Critical: [list]
- High: [list]
- Medium: [list]

Would you like me to flesh out any of these ADRs further?
```

---

## Step 8B: Generate Runbook Stubs (Tier 3 Only)

**Skip this step if Tier 1 or Tier 2.**

If this is a Tier 3 (Production Microservice) service:
1. Search for existing runbooks in `docs/runbooks/`
2. Identify alarms from the AWS Analyzer results (CloudWatch alarms, SNS topics)
3. For each alarm without a runbook, generate a stub using `runbook-template.md` (search workspace)

**Each runbook stub should include**:
- Alarm name and what it monitors
- First-response checklist (from what the analyzer found about the service)
- Escalation path (leave as `[FILL IN]` since this requires team knowledge)
- Links to relevant dashboards/logs

**Write to**: `docs/runbooks/[alarm-name].md`

If no alarms are defined in infrastructure, note this as a gap in the final review:
```
Warning: No CloudWatch alarms found for a Tier 3 service. Recommend adding alarms for: error rate, latency, CPU, memory, database connections.
```

---

## Step 9: Documentation Quality Review (Review Loop)

**MANDATORY**: Before presenting final results, run a quality review of ALL generated documents.

### Mermaid Syntax Validation (CRITICAL)

**Common Mermaid pitfalls that MUST be checked**:

1. **ER Diagram reserved keywords**: `PK`, `SK`, `FK`, `UK` are reserved attribute keys in Mermaid ER diagrams. **NEVER** use them as attribute names. Use `partitionKey`, `sortKey`, `foreignKey` instead.
2. **ER Diagram data types**: Only use Mermaid-compatible types (`string`, `number`, `boolean`, `int`, `float`, `date`, `datetime`). Custom types like `set`, `instant`, `long`, `list`, `map` will cause parse errors. Use `string` with a comment for clarity (e.g., `string sortKey "SK -- timestamp-based"`).
3. **Relationship labels**: Keep short, avoid special characters. Use alphanumeric labels only (e.g., `contains` not `has many (1:N)`).
4. **Flowchart node labels**: Keep labels short (< 30 chars). Long labels can break rendering. Use line breaks sparingly.
5. **Sequence diagram**: Participant names must not contain spaces or special characters.
6. **Test your Mermaid**: After generating, mentally parse each diagram for syntax correctness. If unsure, simplify.

### Self-Review Checklist

Run these checks against each generated document:

**SYSTEM_ARCHITECTURE.md**:
- [ ] All `[PLACEHOLDER]` and `[NEEDS VERIFICATION]` tags are minimized (only used when genuinely uncertain)
- [ ] Every C4/Mermaid diagram is syntactically valid (check reserved keywords, data types, label lengths)
- [ ] Technology stack matches what was found in code (cross-check with subagent results)
- [ ] All API endpoints listed match the API Analyzer findings
- [ ] Database tables/collections match the Database Analyzer findings
- [ ] Event flow matches verified findings from Step 1B (not subagent assumptions)
- [ ] Security section covers authentication AND authorization
- [ ] No sections are empty or contain only template boilerplate
- [ ] AWS architecture diagram is referenced and path is correct
- [ ] Includes Mermaid diagrams for: deployment pipeline, event flow (if event-driven), auth flow

**CONTRIBUTING.md**:
- [ ] PR workflow is accurate (matches actual CI/CD pipeline)
- [ ] Per-PR stack process is documented (if applicable)
- [ ] Steps for adding/modifying APIs are complete and actionable
- [ ] Steps for adding/modifying Lambdas are complete (if applicable)
- [ ] Test categories and requirements are listed
- [ ] Contributing content is NOT duplicated in README.md (README should only link here)

**EVENT_SCHEMAS.md** (if generated):
- [ ] All event types are documented with full payload schemas
- [ ] Example JSONs are included for each event type
- [ ] SNS routing logic (MessageAttributes, filter policies) is documented
- [ ] MessageGroupId strategy is documented and verified against actual code
- [ ] Tech debt callouts are included for any issues found in Step 1B
- [ ] DLQ handling is documented

**ADR_RECOMMENDATIONS.md**:
- [ ] All recommendations have clear problem statements and impact assessments
- [ ] Priorities (Critical/High/Medium) are justified
- [ ] Links to individual ADR stubs are correct
- [ ] Code locations are provided where applicable

**GLOSSARY.md**:
- [ ] No orphan terms (terms referenced in SYSTEM_ARCHITECTURE.md but not in GLOSSARY.md)
- [ ] No duplicate terms
- [ ] All acronyms expanded
- [ ] Terms are alphabetically sorted

**OpenAPI Spec (if generated)**:
- [ ] All endpoints have descriptions
- [ ] Request/response schemas defined
- [ ] Error responses documented
- [ ] Authentication scheme documented

### Cross-Reference Validation

Check consistency between generated documents:

| Check | SYSTEM_ARCH says... | Other source says... | Match? |
|-------|---------------------|----------------------|--------|
| Database type | [X] | DB Analyzer found [Y] | Yes/No |
| Number of API endpoints | [X] | API Analyzer found [Y] | Yes/No |
| Auth mechanism | [X] | API Analyzer found [Y] | Yes/No |
| AWS services | [list] | AWS Analyzer found [list] | Yes/No |
| Domain terms count | [X] in GLOSSARY | [Y] unique terms from all subagents | Yes/No |
| Event flow | [SYSTEM_ARCH diagram] | Step 1B verified flow | Yes/No |
| Lambda triggers | [SYSTEM_ARCH description] | Terraform event_source_mapping | Yes/No |
| MessageGroupId | [EVENT_SCHEMAS says] | Actual code in Lambda handlers | Yes/No |

### Review Verdict

After running checks:

- **PASS**: All checks pass, fewer than 3 `[NEEDS VERIFICATION]` tags -> proceed to final review
- **NEEDS FIXES**: Issues found -> fix them, then re-run this checklist
- **NEEDS USER INPUT**: Ambiguities that can't be resolved from code -> list them for user in final review

**If NEEDS FIXES**: Iterate (fix issues, re-run checklist) up to 2 times. If issues persist after 2 iterations, flag them as `[NEEDS VERIFICATION]` and proceed.

---

## Step 10: Final Review (Interactive)

Present the complete generated documentation for review:

```
Documentation generation complete! Here's what was created:

Documentation Tier: [Tier X]

Generated Documents:
1. docs/architecture/SYSTEM_ARCHITECTURE.md ([X] sections, [Y] Mermaid diagrams)
2. docs/architecture/GLOSSARY.md ([X] domain terms)
3. docs/architecture/TECHNICAL_HEALTH_ASSESSMENT.md ([X] findings)
4. docs/architecture/decisions/ADR_RECOMMENDATIONS.md ([X] recommendations)
5. docs/architecture/decisions/NNN-*.md ([X] ADR stubs)
6. CONTRIBUTING.md (complete contributor guide)
7. [docs/events/schemas/EVENT_SCHEMAS.md -- generated / not applicable]
8. [docs/api/openapi.yaml -- generated / already existed / not applicable]
9. [README.md -- generated / updated]
10. [docs/runbooks/*.md -- Tier 3 only]
11. [docs/architecture/diagrams/aws-infrastructure.png -- generated]

Quality Review Results:
- Self-review: [PASS / X issues fixed during review]
- Mermaid syntax: [All valid / X diagrams fixed]
- Event flow verification: [Verified against code / N/A]
- Cross-reference validation: [All consistent / X discrepancies noted]
- Items needing verification: [X] (marked with [NEEDS VERIFICATION])

Technical Health Score: [X/5] (average of fitness dimensions)
Tech Debt Items: [X] critical, [Y] high, [Z] medium

Recommended Next Steps:
- [ ] Review generated documents for accuracy
- [ ] Resolve [NEEDS VERIFICATION] items (listed below)
- [ ] Address critical tech debt items (listed in health assessment)
- [ ] Flesh out ADR stubs with full decision rationale
- [ ] [Tier 3] Create detailed runbooks for each alarm

Items Needing Your Verification:
1. [Item 1 -- why it's uncertain]
2. [Item 2 -- why it's uncertain]

Please review the generated documents and let me know if you'd like any corrections.
```

**Wait for user feedback. If corrections are requested, apply them and re-run Step 9.**

Once the user confirms they are satisfied with the generated documentation, proceed to Step 11.

---

## Step 11: Feedback Checkpoint (Optional)

**When**: After the user has reviewed all generated documents and any corrections have been applied.

Ask the user:

```
All documentation has been generated and reviewed.

Before we wrap up -- did you notice any issues with the documentation workflow itself?
For example: incorrect analysis from the agents, template sections that didn't fit,
steps that felt unnecessary, or things that were missing?

If so, I can run /collect-skill-feedback right now to capture those findings into a
structured report. This helps the platform-ai-kit maintainers improve the workflow.

Would you like me to run the feedback collection? (yes/no)
```

- **If yes**: Execute the `/collect-skill-feedback` skill inline (read `.cursor/skills/collect-skill-feedback/SKILL.md` and follow its steps in this same conversation). After the report is saved, remind the user to share it:
  ```
  The improvement report has been saved to docs/feedback/skill-improvement-[date].md.

  Please share this with the platform-ai-kit maintainers by opening an issue or PR on the
  platform-ai-kit repository. Each finding maps to a specific file with a suggested fix.
  ```
- **If no**: Mark Step 11 as `cancelled` and proceed to Step 12.

If a feedback report already exists from a previous run (`docs/feedback/skill-improvement-*.md`), remind the user:

```
I also noticed an existing feedback report at [path]. If you haven't shared it yet,
please consider sending it to the platform-ai-kit maintainers.
```

---

## Step 12: Cleanup

After documentation is complete and feedback (if any) is captured, clean up working files that are no longer needed.

### 12A: Remove Intermediate Working Files

The `docs/design/` directory contains the Service Context Document and subagent analysis files created during the workflow. These are intermediate artifacts -- all findings are already synthesized into the final generated documents.

```bash
rm -rf docs/design/
```

### 12B: Remove Template Files

Template files were copied into the project during installation. They are not needed after documentation has been generated.

```bash
# Remove template files from project root (these came from _shared/templates/)
rm -f system-architecture-template.md
rm -f frontend-system-architecture-template.md
rm -f mobile-system-architecture-template.md
rm -f desktop-system-architecture-template.md
rm -f glossary-template.md
rm -f readme-template.md
rm -f sdk-readme-template.md
rm -f adr-template.md
rm -f runbook-template.md
rm -f changelog-template.md
rm -f technical-design-document-template.md
```

### 12C: Remove Standards File

The documentation standards file was a reference used during generation. The generated documents themselves now contain the relevant content.

```bash
rm -f DOCUMENTATION_STANDARDS.md
```

### 12D: Inform User About Cursor Skills Uninstall

The skills, agents, rules, and references installed into `.cursor/` were for this one-time documentation generation workflow. Inform the user they can remove them:

```
Documentation generation is complete. The platform-ai-kit skills, agents, rules, and
references installed in your .cursor/ directory were used for this workflow and
are no longer needed for day-to-day development.

You can safely remove them:

  rm -rf .cursor/skills/gather-service-context
  rm -rf .cursor/skills/document-existing-service
  rm -rf .cursor/skills/collect-skill-feedback
  rm -rf .cursor/agents/api-analyzer.md .cursor/agents/aws-analyzer.md \
         .cursor/agents/build-analyzer.md .cursor/agents/database-analyzer.md \
         .cursor/agents/feature-analyzer.md .cursor/agents/sdk-analyzer.md \
         .cursor/agents/ui-analyzer.md
  rm -rf .cursor/rules/documentation-standards.md
  rm -rf .cursor/references/diagram-generation-best-practices.md

Or keep them if you plan to re-run the documentation workflow later (e.g., after
major codebase changes). Re-running will update the existing generated documents.

Would you like me to remove these now?
```

- **If yes**: Run the cleanup commands. Verify with `git status` to confirm the removals are staged properly if the user wants to commit the cleanup.
- **If no**: Leave them in place.

---

## Important Notes

- **Do NOT hallucinate**: Only document what is actually found in the code. If something is unclear, mark it with `[NEEDS VERIFICATION]`.
- **Do NOT generate code**: This workflow produces documentation only (except the diagram generation script).
- **Respect existing docs**: If documentation already exists, note what's new vs what already existed.
- **Interactive checkpoints**: Always pause at Steps 2, 9 (review), and 10 for user review. These are mandatory quality gates -- never skip them.
- **Review loop is mandatory**: Never skip Step 9. Quality review catches inconsistencies.
- **Tech debt is documentation too**: Identifying and cataloging tech debt is as valuable as documenting what exists.
- **Diagram FIRST**: Step 3 generates the AWS diagram BEFORE Step 4 generates SYSTEM_ARCHITECTURE.md so the architecture doc can reference the actual diagram.
- **Application type awareness**: Always check the application type (from the Service Context Document) to select the correct agents and SYSTEM_ARCHITECTURE template variant.
- **Tier awareness**: Always check which tier this service falls into (from the Service Context Document) and generate only the required documents.
- **CONTRIBUTING.md is always separate**: Never embed full contributing content in README.md. README gets a brief section linking to CONTRIBUTING.md.
- **Verify event flows from code**: Do NOT trust subagent assumptions about event-driven architecture. Always verify Lambda triggers, SNS subscriptions, and MessageGroupId from actual Terraform and Lambda handler code (Step 1B).
- **Mermaid syntax matters**: Test all Mermaid diagrams mentally for reserved keywords (`PK`, `SK`, `FK`, `UK`), unsupported data types, and label length. These cause silent rendering failures that users will catch.
- **Add Mermaid diagrams judiciously**: Include diagrams for deployment pipeline, event flow, and auth flow where they add clarity. Do NOT go overboard with diagrams that duplicate text.
- **Diagram tool limitations**: When using the Python `diagrams` library, keep node labels short (< 20 chars), avoid multi-line labels, use simple component names (e.g., `Dynamodb` not `DynamodbTable`), and test iteratively. The tool may silently fail with complex diagrams.
- **Subagent fallback**: Specialized subagent_types may fail. Always retry once, then fall back to `generalPurpose` with the same prompt. Document any fallbacks in the feedback step.
- **Consistent output paths**: All subagent analysis files go to `docs/design/[SERVICE_NAME]_[AGENT_TYPE]_ANALYSIS.md`. Never save to `docs/` root or other ad-hoc locations.
- **MCP diagram tool first**: When generating AWS diagrams, check for the MCP `aws-diagram-mcp-server` first (most reliable), then local `diagrams` package, then Lucid instructions. Always generate `scripts/generate_aws_diagram.py` regardless of which tool is used for generation.
- **TECHNICAL_HEALTH_ASSESSMENT.md is a standalone file**: Step 7 writes the health assessment to `docs/architecture/TECHNICAL_HEALTH_ASSESSMENT.md` as a separate document, not just inline in the final review.
- **Inapplicable template sections**: If a service has no database, replace the "Database Architecture" section with a "Data Strategy" section covering caching, delegation, or in-memory data patterns. If a service has no event-driven components, remove the "Event-Driven Architecture" section entirely -- don't leave it as "N/A".
