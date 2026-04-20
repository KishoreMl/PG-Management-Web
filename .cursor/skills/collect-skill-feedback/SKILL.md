---
name: collect-skill-feedback
description: Run at the end of a documentation generation session (same conversation window) to analyze corrections, feedback, and issues encountered during the flow. Produces a structured improvement report identifying what agents, templates, skills, and standards need updating. Share this report with the platform-ai-kit maintainers to improve the documentation workflow.
disable-model-invocation: true
---

# Collect Skill Feedback

> **Trigger**: `/collect-skill-feedback`
>
> **Purpose**: Analyze the current conversation for corrections, feedback, and friction points encountered during `/gather-service-context` and `/document-existing-service` runs. Produce a structured improvement report that platform-ai-kit maintainers can use to refine skills, agents, templates, and standards.
>
> **CRITICAL**: This skill MUST be run in the **same conversation window** where the documentation workflow was executed. It relies on the full conversation context to identify what went well and what didn't.
>
> **Duration**: ~5-10 minutes

---

## How This Works

This skill reviews the full conversation history from the documentation generation session and identifies:

1. **Corrections the user made** to agent output (wrong assumptions, incorrect analysis, missed components)
2. **Questions the user had to answer** that the agents should have figured out from code
3. **Template sections** that were inapplicable, missing, or confusing for the repo type
4. **Mermaid diagram issues** that passed the quality review but were caught by the user
5. **Steps that were skipped** or caused friction in the workflow
6. **Things that worked well** (positive signal is equally important)

---

## Step 1: Verify Context Availability

Before proceeding, verify this conversation contains documentation workflow output:

1. **Check** if this conversation includes output from `/gather-service-context` or `/document-existing-service`
2. **If no documentation workflow was run in this conversation**, inform the user:
   ```
   This skill needs to run in the same conversation where /gather-service-context and 
   /document-existing-service were executed. It analyzes the corrections and feedback 
   from that session to generate improvement recommendations.
   
   Please run this skill at the end of a documentation generation session, 
   in the same chat window.
   ```
3. **If context is available**, proceed to Step 2.

---

## Step 2: Analyze the Conversation

Review the full conversation systematically. For each category below, scan all messages (user and assistant) for relevant signals.

### 2A: Agent Analysis Issues

For each analyzer agent that was invoked (api-analyzer, aws-analyzer, database-analyzer, feature-analyzer, ui-analyzer, sdk-analyzer, build-analyzer), identify:

- **Missed Components**: Things in the codebase that the agent failed to detect
- **Wrong Assumptions**: Analysis that was incorrect and the user had to correct
- **Hallucinated Details**: Things the agent reported that don't actually exist in the code
- **Incomplete Coverage**: Sections of the agent's return checklist that were superficial or missing
- **Good Catches**: Things the agent found that surprised the user (positive)

### 2B: Template & Document Issues

For each generated document, identify:

- **Inapplicable Sections**: Template sections that didn't fit this repo type
- **Missing Sections**: Information the user wanted documented that no template covers
- **Confusing Structure**: Sections where the organization didn't make sense for this repo
- **Placeholder Problems**: `[PLACEHOLDER]` or `[NEEDS VERIFICATION]` items that should have been resolvable from code

### 2C: Workflow Friction

For the skill workflow itself, identify:

- **Skipped Steps**: Steps that were marked cancelled and why
- **Unnecessary Steps**: Steps that added no value for this repo type
- **Missing Steps**: Things the user asked for that aren't part of the workflow
- **Ordering Issues**: Steps that should have run in a different order
- **Checkpoint Friction**: Interactive checkpoints where the user was confused about what to review

### 2D: Standards & Tier Issues

- **Tier Mismatch**: Was the documentation tier appropriate? Did it generate too much or too little?
- **Naming Convention Issues**: File naming or folder structure problems
- **Cross-Reference Gaps**: Documents that should reference each other but don't

### 2E: Mermaid & Diagram Issues

- **Syntax Errors**: Mermaid diagrams that failed to render
- **Reserved Keyword Issues**: ER diagrams with PK/SK/FK problems
- **Inaccurate Diagrams**: Diagrams that misrepresented the actual architecture
- **Missing Diagrams**: Architecture aspects that needed a diagram but didn't get one

---

## Step 3: Compile User Corrections

Go through every user message in the conversation and extract explicit corrections:

For each correction, capture:
1. **What was wrong**: The specific error or omission
2. **What the user said**: The user's correction (paraphrase)
3. **Which component**: Agent / template / skill step / standard
4. **Specific file**: Which `.md` file in platform-ai-kit should be updated
5. **Suggested fix**: Concrete change to prevent this in future runs

---

## Step 4: Generate the Improvement Report

Produce the following structured document:

```markdown
# Skill Improvement Report

**Date**: [YYYY-MM-DD]
**Repository Documented**: [Repo name and brief description]
**Application Type**: [Backend Microservice / Frontend Web App / Mobile App / Desktop App / SDK/Library]
**Documentation Tier**: [Tier 1 / 2 / 3]
**Agents Used**: [List of agents that were launched]

---

## Session Summary

- **Total user corrections**: [count]
- **Documents generated**: [count]
- **Steps skipped/cancelled**: [count]
- **Overall quality**: [High / Medium / Low -- based on how many corrections were needed]

---

## Agent Improvements

### [agent-name].md

**File**: `cursor/service-documentation/agents/[agent-name].md`

| # | Issue Type | Description | Suggested Fix |
|---|-----------|-------------|---------------|
| 1 | [Missed/Wrong/Hallucinated/Incomplete] | [Specific issue] | [Concrete fix to agent prompt] |
| 2 | ... | ... | ... |

**What Worked Well**:
- [Positive finding 1]
- [Positive finding 2]

[Repeat for each agent]

---

## Template Improvements

### [template-name].md

**File**: `_shared/templates/[template-name].md`

| # | Issue Type | Description | Suggested Fix |
|---|-----------|-------------|---------------|
| 1 | [Inapplicable/Missing/Confusing] | [Specific issue] | [Concrete fix] |

[Repeat for each template]

---

## Skill Workflow Improvements

### gather-service-context

**File**: `cursor/service-documentation/skills/gather-service-context/SKILL.md`

| # | Issue Type | Description | Suggested Fix |
|---|-----------|-------------|---------------|
| 1 | [Missing Question/Unnecessary Question/Ordering] | [Specific issue] | [Concrete fix] |

### document-existing-service

**File**: `cursor/service-documentation/skills/document-existing-service/SKILL.md`

| # | Issue Type | Description | Suggested Fix |
|---|-----------|-------------|---------------|
| 1 | [Skipped Step/Missing Step/Ordering/Friction] | [Specific issue] | [Concrete fix] |

---

## Standards Improvements

**File**: `_shared/standards/DOCUMENTATION_STANDARDS.md`

| # | Issue Type | Description | Suggested Fix |
|---|-----------|-------------|---------------|
| 1 | [Tier/Naming/Structure] | [Specific issue] | [Concrete fix] |

---

## Mermaid & Diagram Issues

| # | Document | Diagram Type | Issue | Fix |
|---|----------|-------------|-------|-----|
| 1 | [Document] | [erDiagram/flowchart/sequence] | [Issue] | [Fix] |

---

## New Feature Requests

Things the user asked for that the workflow doesn't currently support:

| # | Request | Complexity | Which Component |
|---|---------|-----------|-----------------|
| 1 | [What the user wanted] | [Low/Medium/High] | [Agent/Template/Skill/New] |

---

## Priority Summary

### Critical (Fix Before Next Run)
1. [Issue that causes incorrect documentation]
2. ...

### High (Fix Soon)
1. [Issue that causes significant friction or missing coverage]
2. ...

### Medium (Nice to Have)
1. [Issue that's a quality improvement]
2. ...

### Low (Future Consideration)
1. [Minor polish or edge case]
2. ...
```

---

## Step 5: Present and Save

1. **Present** the complete improvement report to the user
2. **Ask** the user if they want to add any additional feedback not captured
3. **Incorporate** any additional feedback
4. **Save** the report to `docs/feedback/skill-improvement-[YYYY-MM-DD].md` (create the `docs/feedback/` directory if it doesn't exist)
5. **Ask the user to share the report**:
   ```
   The improvement report has been saved to:
     docs/feedback/skill-improvement-[date].md

   🔁 Please share this report with the platform-ai-kit maintainers so they can improve the
   workflow for everyone. You can do this by:

   1. Opening an issue on the platform-ai-kit repository and pasting the report contents
   2. Or opening a PR that includes the report file

   Each item in the Priority Summary maps to a specific platform-ai-kit file with a concrete
   suggested fix, so maintainers can act on it directly.

   Would you like me to help you draft a GitHub issue or prepare a PR with this report?
   ```
6. **If the user agrees**, help them draft the issue or prepare a branch with the report committed.

---

## Important Notes

- **Same conversation context is essential**: This skill's value comes from having access to all the corrections and feedback in the current conversation. Running it in a new conversation provides no useful signal.
- **Be specific**: Vague feedback like "agents could be better" is not actionable. Every finding should reference a specific agent, template, or skill step with a concrete improvement suggestion.
- **Positive feedback matters**: Identifying what works well is as important as finding issues. It prevents good patterns from being accidentally removed in future updates.
- **Don't fabricate issues**: Only report issues that actually occurred in this conversation. If the workflow ran smoothly with no corrections, say so -- that's valuable signal too.
- **Map to files**: Every improvement suggestion should reference the specific platform-ai-kit file path that needs updating. This makes it easy for maintainers to act on the feedback.
