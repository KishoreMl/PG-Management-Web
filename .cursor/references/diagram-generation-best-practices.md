# AWS Diagram Generation - Best Practices

## Summary

Best practices for generating clean, accurate, and maintainable AWS architecture diagrams using the Python `diagrams` package. Based on hands-on experience across production backend services.

---

## ✅ Key Principles

### 1. **Clarity Over Completeness**
- Show key traffic flows only
- Remove obvious or redundant labels
- Use implicit relationships where appropriate (e.g., S3 Access Logs)

### 2. **Correct Architectural Patterns**
- Understand the actual infrastructure before diagramming
- Don't assume relationships (e.g., ALB → ALB → ECS vs ALB → ECS direct)
- Validate with infrastructure code (Terraform, CloudFormation)

### 3. **Maintainability**
- Persist diagram generation scripts in `scripts/` folder
- Document how to update when infrastructure changes
- Version control both the script and generated PNG

---

## 🎯 Common Patterns & Fixes

### Pattern 1: Load Balancer Architecture

#### ❌ WRONG: Assuming Cascading ALBs
```python
# Don't assume External ALB → Internal ALB → ECS
external_alb >> internal_alb >> ecs_service
```

#### ✅ CORRECT: Verify Actual Architecture
```python
# Both ALBs point DIRECTLY to ECS (confirmed from Terraform)
external_alb >> Edge(label="HTTP", color="orange") >> ecs_service
internal_alb >> Edge(label="HTTP", color="purple") >> ecs_service
```

**Lesson**: Always check actual infrastructure. External and Internal ALBs often serve different purposes (internet-facing vs. inter-service), not cascading layers.

---

### Pattern 2: CI/CD and Container Registry Flow

#### ❌ WRONG: Single "Deploy" Arrow
```python
# Unclear and incomplete
github >> Edge(label="Deploy") >> ecs_service
```

#### ✅ CORRECT: Show Complete Build-Deploy Flow
```python
# Build and push container images
github >> Edge(label="Build &\nPush", color="black") >> ecr

# IAM role assumption for deployment
github >> Edge(label="Assume\nRole", color="darkgreen", style="dashed") >> iam
iam >> Edge(color="darkgreen", style="dashed") >> ecs_service

# ECS pulls images from ECR
ecr >> Edge(color="black", style="dotted") >> ecs_service
```

**Lesson**: CI/CD has multiple distinct flows: build/push, IAM permissions, and image pulling. Show all three.

---

### Pattern 3: Label Placement Issues

#### ❌ WRONG: Too Many Labels
```python
# Labels can appear on wrong components in complex layouts
ecs_service >> Edge(label="Fetch\nSecrets", color="red") >> secrets
ecs_service >> Edge(label="App\nLogs", color="brown") >> cloudwatch
ecs_service >> Edge(label="Deploy\nPermissions", color="green") >> iam
```

**Problem**: With many vertical components (Secrets, CloudWatch, IAM, S3, ECR), labels can appear near the wrong service.

#### ✅ CORRECT: Minimal Essential Labels
```python
# Keep only essential labels
ecs_service >> Edge(label="Registry\nLookup", color="purple") >> redis
ecs_service >> Edge(color="red") >> cloudwatch  # No label - obvious
```

**Lesson**: Remove labels that are obvious from context. Use color/line-style to differentiate connections.

---

### Pattern 4: Implicit Relationships

#### ❌ WRONG: Explicit Arrows Everywhere
```python
# Creates arrow clutter
external_alb >> Edge(label="Access\nLogs") >> s3_logs
internal_alb >> Edge(label="Access\nLogs") >> s3_logs
```

#### ✅ CORRECT: Implicit via Naming
```python
# Just name the S3 bucket clearly - relationship is implicit
s3_logs = S3("S3\nAccess Logs")
# No arrows needed
```

**Lesson**: For well-known patterns (ALB → S3 logging), implicit relationships via naming are clearer than explicit arrows.

---

### Pattern 5: Traffic Flow Clarity

#### ❌ WRONG: Certificate Authority in Request Path
```python
# Implies traffic goes through ACM
users >> route53 >> acm >> external_alb
```

#### ✅ CORRECT: Separate Traffic vs. Configuration
```python
# Traffic flow
users >> Edge(label="HTTPS", color="blue") >> route53
route53 >> Edge(label="HTTPS", color="blue") >> external_alb

# Certificate provisioning (not in request path)
acm >> Edge(label="SSL/TLS", color="green", style="dashed") >> external_alb
```

**Lesson**: Use dashed lines for configuration/provisioning relationships vs. solid lines for traffic flow.

---

### Pattern 6: Shared Services Organization

#### ❌ WRONG: Individual Arrows to Each Service
```python
# Creates visual clutter with 5+ services
ecs_service >> secrets
ecs_service >> iam
ecs_service >> cloudwatch
ecs_service >> s3
ecs_service >> ecr
```

#### ✅ CORRECT: Single Representative Arrow
```python
# Group services in a cluster
with Cluster("Shared Services"):
    secrets = SecretsManager("Secrets Manager")
    iam = IAM("IAM Roles")
    cloudwatch = Cloudwatch("CloudWatch Logs")
    s3_logs = S3("S3\nAccess Logs")
    ecr = ECR("ECR\nDocker Images")

# Single arrow to represent all relationships
ecs_service >> Edge(color="red") >> cloudwatch
```

**Lesson**: Don't draw every connection. One arrow to a cluster or representative service is cleaner.

---

## 📁 Script Organization

### Recommended Structure

```
scripts/
├── README.md                    # Documentation for all scripts
└── generate_aws_diagram.py      # AWS diagram generator

docs/architecture/diagrams/
├── README.md                    # Diagram guidelines
└── aws-infrastructure.png       # Generated diagram
```

### Script Template

```python
#!/usr/bin/env python3
"""
Generate AWS Architecture Diagram for [Service Name]

Update this script when AWS resources change.

Usage: python3 scripts/generate_aws_diagram.py
Output: docs/architecture/diagrams/aws-infrastructure.png
"""

from diagrams import Diagram, Cluster, Edge
# Import only needed AWS services

# Configuration
DIAGRAM_NAME = "Service Name - AWS Architecture"
OUTPUT_PATH = "docs/architecture/diagrams/aws-infrastructure"

with Diagram(DIAGRAM_NAME, 
             filename=OUTPUT_PATH,
             show=False,
             direction="LR",
             outformat="png"):
    
    # Define components
    # Define flows
    
print(f"✅ Diagram generated: {OUTPUT_PATH}.png")
```

---

## 🎨 Visual Design Guidelines

### Colors
- **Blue**: External traffic (HTTPS from users)
- **Orange**: External ALB traffic
- **Purple**: Internal service traffic, cache lookups
- **Red**: Internal dependencies (logs, secrets)
- **Green**: Security/IAM relationships
- **Black**: CI/CD operations
- **Gray**: Logging/monitoring (non-critical path)

### Line Styles
- **Solid**: Active traffic flow
- **Dashed**: Configuration/permissions (IAM roles, certificates)
- **Dotted**: Background operations (image pulls, log shipping)

### Labels
- **Keep short**: Max 2-3 words
- **Remove obvious**: If component names make it clear, no label needed
- **Be specific**: "Registry Lookup" not just "Query"

---

## 🔄 Updating Diagrams

### When to Update

1. **New AWS service added** (Lambda, DynamoDB, SNS, etc.)
2. **Infrastructure changes** (new ALB, VPC changes)
3. **Networking changes** (new VPC endpoints, peering)
4. **CI/CD changes** (new pipeline steps)

### Update Process

```bash
# 1. Edit script
vim scripts/generate_aws_diagram.py

# 2. Add new service
from diagrams.aws.database import Dynamodb
dynamo = Dynamodb("DynamoDB\nUsers")
ecs_service >> Edge(label="Query") >> dynamo

# 3. Regenerate
python3 scripts/generate_aws_diagram.py

# 4. Review
open docs/architecture/diagrams/aws-infrastructure.png

# 5. Commit both
git add scripts/generate_aws_diagram.py
git add docs/architecture/diagrams/aws-infrastructure.png
git commit -m "Add DynamoDB to architecture diagram"
```

---

## 🚨 Common Mistakes to Avoid

### 1. **Assuming Architecture Without Verification**
❌ Don't guess how ALBs, VPCs, or services connect
✅ Check Terraform/CloudFormation to understand actual relationships

### 2. **Over-labeling**
❌ Labeling every single connection
✅ Label only non-obvious or critical flows

### 3. **Text Placement Issues**
❌ Using long labels in dense layouts (text appears on wrong components)
✅ Short labels or no labels; rely on line colors and styles

### 4. **Showing Every Detail**
❌ Every security group rule, every environment variable
✅ High-level architecture with key flows

### 5. **Not Persisting Scripts**
❌ Generating diagrams once and losing the code
✅ Commit scripts to version control for future updates

---

## 📚 Reference

### Python Diagrams Library
- **Docs**: https://diagrams.mingrammer.com/
- **AWS Nodes**: https://diagrams.mingrammer.com/docs/nodes/aws
- **Clusters**: https://diagrams.mingrammer.com/docs/guides/cluster
- **Edge Attributes**: https://diagrams.mingrammer.com/docs/guides/edge

### Graphviz Layout
- Diagrams uses Graphviz for layout (limited control)
- For precise layouts, consider Lucid/draw.io
- Auto-generated diagrams work well for documentation and quick updates

---

## ✅ Checklist for New Diagrams

Before finalizing a diagram:

- [ ] Verified actual architecture (don't assume)
- [ ] Both ALBs point correctly (verified from infra code)
- [ ] CI/CD flow is complete (build, push, IAM, pull)
- [ ] Labels are minimal and clear
- [ ] No confusing label placement
- [ ] Implicit relationships used where appropriate (S3 logs)
- [ ] Traffic flows use solid lines
- [ ] Configuration uses dashed lines
- [ ] Colors differentiate traffic types
- [ ] Script is saved in `scripts/` folder
- [ ] `scripts/README.md` documents usage
- [ ] Both script and PNG committed to version control

---

**Status**: Best practices established 2026-02-11
