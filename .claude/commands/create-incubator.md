---
description: Create new incubator project with structure and index
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Create Incubator Project

Create a new incubator project in `Active Projects/_Incubator/` with full structure, CLAUDE.md, and Active Projects Index entry.

## INSTRUCTIONS

### Step 1: Gather Project Information

Ask the user for:
1. **Project name** (kebab-case, e.g., "google-integration")
2. **Project title** (human-readable, e.g., "Google Calendar & Gmail Integration")
3. **Project purpose** (1-2 sentences describing what this explores)
4. **Strategic alignment** (how does this serve OOBG? which avatars? bottleneck impact?)

### Step 2: Create Project Folder Structure

Create folder and initial files:

```bash
mkdir -p "Active Projects/_Incubator/[project-name]"
```

### Step 3: Create Initial CLAUDE.md

Create `Active Projects/_Incubator/[project-name]/CLAUDE.md` with:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this project.

**Project Type**: Business Operations - Incubator Project
**Primary Work**: [Natural language deliverables / Technical integration / etc.]
**Status**: Incubating (exploratory, testing viability)

---

## PROJECT OVERVIEW

**Purpose**: [Project purpose from Step 1]

**Strategic Alignment**:
- **OOBG Relevance**: [How this serves One Obsessional Big Goal]
- **Avatar Targets**: [Which customer avatars this serves]
- **Bottleneck Impact**: [Does this address current bottleneck?]

**Success Criteria**:
- [What defines successful exploration?]
- [What would trigger graduation to Active Projects?]

---

## PROJECT STRUCTURE

[Document folder structure, key files, resources]

---

## KEY WORKFLOWS

[Document common tasks, commands, processes]

---

## AUTOMATION & ORCHESTRATION

When automating processes in this project:
- **Default to LLM sub-agents** (Task tool) for content creation, analysis, research, strategic work
- **Use code/scripts** when working with data processing, API integrations, batch operations, or technical automation
- Examples of LLM sub-agent uses: drafting content, analyzing documents, creating frameworks, research synthesis
- Examples of code uses: data transformation, API calls, file processing, scheduled automation

---

## GRADUATION CRITERIA

This project graduates to Active Projects when:
- [Criterion 1: e.g., "Proof of concept validated"]
- [Criterion 2: e.g., "Integration tested and working"]
- [Criterion 3: e.g., "Strategic value confirmed"]

Once graduated, use: `graduate-project [project-name]`
```

### Step 4: Create Active Projects Index Entry

Create `Project Memory/Active Projects Index/[project-name]-index.md` with:

```markdown
---
project_id: "incubator-[project-name]"
title: "[Project Title]"
project_type: "incubator-program"
status: "incubating"
date_created: "YYYY-MM-DD"
date_modified: "YYYY-MM-DD"
folder_path: "Active Projects/_Incubator/[project-name]"
tags: ["incubator", "exploration"]
strategic_alignment:
  oobg_relevance: "[description from Step 1]"
  unique_vehicle_fit: "[description]"
  avatar_targets: ["[avatar-name]"]
last_sync: "YYYY-MM-DD HH:MM:SS"
---

## Current Status
Incubating - Initial exploration phase

## Key Deliverables
- [ ] Define project scope and requirements
- [ ] Research technical approach
- [ ] Build proof of concept
- [ ] Validate strategic value

## Last Activity
Created: YYYY-MM-DD

## Quick Access
Full project: [Active Projects/_Incubator/[project-name]](../../Active%20Projects/_Incubator/[project-name])
```

### Step 5: Log Creation

Add entry to `operations_log.txt`:

```
[YYYY-MM-DD HH:MM:SS] - CREATE - incubator-[project-name] - Created new incubator project: [Project Title]. Purpose: [brief purpose]. Location: Active Projects/_Incubator/[project-name]
```

### Step 6: Report to User

After creation, report:

```
✅ Incubator project created: [Project Title]

**Location**: Active Projects/_Incubator/[project-name]

**Files Created**:
- CLAUDE.md (project guidance)
- Index entry in Project Memory/Active Projects Index/

**Next Steps**:
1. Add project files, research, prototypes
2. Document workflows in CLAUDE.md
3. Track progress in index deliverables
4. Graduate when ready: `graduate-project [project-name]`

**Quick Access**: [Active Projects/_Incubator/[project-name]](Active Projects/_Incubator/[project-name])
```

---

## NOTES

- Use kebab-case for project names (e.g., "google-integration", not "Google Integration")
- Strategic alignment fields are required (helps validate incubation vs. active)
- Graduation criteria help prevent "stuck in incubator forever" problem
- Index entry enables "show me current projects" queries to include incubator work
