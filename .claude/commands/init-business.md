---
description: Initialize business project CLAUDE.md with business-specific guidance
allowed-tools: Read, Write, Edit, Glob
---

# Initialize Business Project CLAUDE.md

Please analyze this business project and create or update the CLAUDE.md file.

## IMPORTANT CONTEXT

**Project Type**: Business Operations (not a traditional code repository)

**Primary Work Types**:
- Natural language deliverables (scripts, emails, strategies, frameworks, documentation)
- Strategic planning and execution workflows
- Content creation and campaign development
- Business analysis and decision-making
- Project management and tracking

**Code May Still Be Involved**: While this is a business project, code (Python scripts, automation tools, etc.) may be used for data processing, automation, or API integrations. Don't exclude technical guidance where relevant.

---

## INSTRUCTIONS

### If CLAUDE.md Does NOT Exist:

1. **Analyze the project** (same as standard `/init`):
   - Read key files (README.md, project briefs, documentation)
   - Understand project structure and file organization
   - Identify workflows, commands, and common tasks
   - Note strategic context and business objectives

2. **Create CLAUDE.md with this header**:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this project.

**Project Type**: Business Operations
**Primary Work**: Natural language deliverables, strategic planning, business execution
**Code Usage**: Code may be used for automation, data processing, or technical integrations where relevant

---
```

3. **Then include standard sections** (as /init would):
   - Project Overview
   - Project Structure
   - Key workflows and commands
   - Important context for future Claude instances
   - Success criteria or objectives
   - Integration with parent projects (if applicable)

4. **Add Business-Specific Guidance**:

```markdown
## AUTOMATION & ORCHESTRATION

When automating processes in this project:
- **Default to LLM sub-agents** (Task tool) for content creation, analysis, research, strategic work
- **Use code/scripts** when working with data processing, API integrations, batch operations, or technical automation
- Examples of LLM sub-agent uses: drafting content, analyzing documents, creating frameworks, research synthesis
- Examples of code uses: data transformation, API calls, file processing, scheduled automation
```

---

### If CLAUDE.md Already EXISTS:

1. **Check the header section** (first 10 lines)

2. **If header mentions "working with code in this repository"**:
   - Replace with: "working in this project"
   - Add project type clarification:
     ```markdown
     **Project Type**: Business Operations
     **Primary Work**: Natural language deliverables, strategic planning, business execution
     **Code Usage**: Code may be used for automation, data processing, or technical integrations where relevant
     ```

3. **If "AUTOMATION & ORCHESTRATION" section is missing**:
   - Add it after the main project overview sections
   - Use the template above

4. **If header is already updated and automation section exists**:
   - Report: "CLAUDE.md already configured for business operations. No changes needed."
   - Optionally suggest improvements based on project analysis

---

## OUTPUT FORMAT

After creating or updating CLAUDE.md:

1. **Report what was done**:
   - "Created new CLAUDE.md for business project" OR
   - "Updated existing CLAUDE.md header and added automation guidance" OR
   - "CLAUDE.md already properly configured"

2. **Highlight key additions** (if any were made)

3. **Provide quick summary** of what future Claude instances will understand about this project

---

## NOTES

- Follow the same thorough analysis approach as standard `/init`
- Don't remove or replace good existing content - only enhance
- Maintain any project-specific context already present
- The goal is clarity about project type, not restriction of capabilities
