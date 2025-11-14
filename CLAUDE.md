# CLAUDE.md - Business Operations Assistant

<!-- ========================================================================== -->
<!-- FRAMEWORK SECTION - SYNC FROM UPSTREAM                                    -->
<!-- When updating from Daron's repo, TAKE these sections (system mechanics)   -->
<!-- ========================================================================== -->

## PROJECT MISSION & IDENTITY

You are Claude Code working on a **Business Operations** project - the operational layer where the business owner executes daily business activities. Your mission is to help manage, organize, track, and leverage all business projects while ensuring strategic alignment with business goals.

This project is **operational** - you help DO the work through systematic productivity frameworks, strategic planning, and knowledge management.

---

## WINDOWS ENVIRONMENT - CRITICAL CODING STANDARDS

**User Environment**: Windows 10/11 (cp1252 console encoding by default)
**Global Reference**: `~/.claude/WINDOWS_CODING_STANDARDS.md`

### MANDATORY: ASCII-Only Python Print Statements

**❌ NEVER use Unicode in Python scripts:**
```python
print("✅ Success")  # WRONG - causes UnicodeEncodeError
```

**✅ ALWAYS use ASCII markers:**
```python
print("[OK] Success")  # CORRECT - Windows compatible
```

### Standard ASCII Markers

| Purpose | Marker | Example |
|---------|--------|---------|
| Success | `[OK]` | `[OK] Validation passed` |
| Error | `[ERROR]` | `[ERROR] File not found` |
| Warning | `[WARNING]` | `[WARNING] Missing field` |
| Info | `[INFO]` | `[INFO] Processing...` |
| Tip | `[TIP]` | `[TIP] Consider X` |

### When Creating Python Scripts

**BEFORE writing ANY Python script**, verify:
1. ✅ Print statements use ASCII-only markers
2. ✅ No emojis (✅❌⚠️📁🚀💡) in output
3. ✅ Use `=` or `-` for separators, NOT Unicode box drawing
4. ✅ Test without `-X utf8` flag

**Rationale**: Windows console uses cp1252 encoding. Unicode emojis cause `UnicodeEncodeError` crashes. This is a **recurring issue** that has affected multiple projects.

**Full Documentation**: See `~/.claude/WINDOWS_CODING_STANDARDS.md` for complete guidelines.

---

## SETTINGS.JSON CONFIGURATION

**When implementing mechanisms using settings.json/settings.local.json**:

**MUST READ FIRST**: `System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md`

This guide contains lessons learned from implementation:
- Valid use cases vs known limitations
- Implementation best practices (avoid repeating mistakes)
- Testing protocols and troubleshooting
- Known bugs (Read/Write deny rules non-functional - GitHub #6631)
- Settings hierarchy (local > project > user)
- Symlink path resolution issues

**Do NOT implement settings-based mechanisms without consulting this guide.**

**Quick Reference**:
- ✅ **Works**: Approved read patterns, file write hooks, bash deny rules, environment variables (Claude Code internal)
- ❌ **Doesn't Work**: Read/Write deny rules (known bug), env vars in shell

---

## WINDOWS POWERSHELL COMMAND PATTERNS

**Shell Environment**: Claude Code Bash tool uses your system's **default shell** (PowerShell on Windows, zsh on macOS, bash on Linux). No shell configuration options exist in settings.json (feature request GitHub #7490).

**Windows Reality**: PowerShell is the system default on Windows 10/11. All Bash tool commands execute in PowerShell context.

**Critical Rule**: DO NOT use Windows CMD commands (`dir`, `findstr`, `forfiles`) directly in Bash tool calls. They fail in Git Bash environment and cause syntax errors.

### Recommended Approach: Explicit PowerShell Invocation

**Pattern**: Always invoke PowerShell explicitly via `powershell -Command "..."`

**Why**: Works reliably across CMD, PowerShell, and Git Bash environments.

### Common Data Extraction Patterns

#### 1. List Files Sorted by Date (Index Staleness Checks)

**DON'T USE** (fails in Git Bash):
```bash
dir "Project Memory\Active Projects Index\*-index.md" /b /o-d
```

**USE THIS** (works everywhere):
```powershell
powershell -Command "Get-ChildItem 'Project Memory\Active Projects Index\*-index.md' -File | Sort-Object LastWriteTime -Descending | Select-Object -ExpandProperty FullName"
```

#### 2. Search Text with Date Pattern (Operations Log Parsing)

**DON'T USE** (fails in Git Bash):
```bash
findstr /r "^\[2025-11-14" operations_log.txt
```

**USE THIS** (works everywhere):
```powershell
powershell -Command "Select-String -Path 'operations_log.txt' -Pattern '^\[2025-11-14' | Select-Object -ExpandProperty Line"
```

**Note**: Use `-SimpleMatch` for literal strings (no regex):
```powershell
powershell -Command "Select-String -Path 'operations_log.txt' -Pattern '2025-11-14' -SimpleMatch"
```

#### 3. Find Files Modified Yesterday (File Modification Detection)

**DON'T USE** (fails in Git Bash):
```bash
dir /s /b /a-d | findstr "2025-11-13"
```

**USE THIS** (works everywhere):
```powershell
powershell -Command "Get-ChildItem -Path 'Active Projects','Project Memory' -Recurse -File | Where-Object { $_.LastWriteTime -ge '2025-11-13' -and $_.LastWriteTime -lt '2025-11-14' } | Select-Object -ExpandProperty FullName"
```

**Dynamic Date** (yesterday):
```powershell
powershell -Command "$yesterday = (Get-Date).AddDays(-1).ToString('yyyy-MM-dd'); Get-ChildItem -Path 'Active Projects','Project Memory' -Recurse -File | Where-Object { $_.LastWriteTime -ge $yesterday } | Select-Object -ExpandProperty FullName"
```

#### 4. Calculate Days Since Timestamp (Staleness Calculation)

**Pattern**: Read .last_sync file, parse date, calculate difference

```powershell
powershell -Command "$content = Get-Content 'Project Memory\Active Projects Index\.last_sync' -Raw; $lastSync = [datetime]::ParseExact($content.Trim(), 'yyyy-MM-dd HH:mm:ss', $null); $daysSince = (New-TimeSpan -Start $lastSync -End (Get-Date)).Days; Write-Output $daysSince"
```

**Error Handling** (if file missing):
```powershell
powershell -Command "if (Test-Path 'Project Memory\Active Projects Index\.last_sync') { $content = Get-Content 'Project Memory\Active Projects Index\.last_sync' -Raw; $lastSync = [datetime]::ParseExact($content.Trim(), 'yyyy-MM-dd HH:mm:ss', $null); $daysSince = (New-TimeSpan -Start $lastSync -End (Get-Date)).Days; Write-Output $daysSince } else { Write-Output 999 }"
```

#### 5. Write Timestamp to File (Update .last_sync)

**Pattern**: Write current timestamp in ISO 8601 format

```powershell
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss' | Out-File 'Project Memory\Active Projects Index\.last_sync' -Encoding UTF8 -NoNewline"
```

**Why `-NoNewline`**: Prevents extra blank line at end of file (cleaner for parsing).

#### 6. Parse Last 7 Days of Log Entries (Weekly Strategic Planning)

**Pattern**: Dynamic date calculation + pattern matching

```powershell
powershell -Command "$startDate = (Get-Date).AddDays(-7).ToString('yyyy-MM-dd'); Select-String -Path 'operations_log.txt' -Pattern \"^\[$startDate\" | Select-Object -ExpandProperty Line"
```

**For all dates in last 7 days** (more flexible):
```powershell
powershell -Command "$sevenDaysAgo = (Get-Date).AddDays(-7); Select-String -Path 'operations_log.txt' -Pattern '^\[' | Where-Object { $_.Line -match '^\[(\d{4}-\d{2}-\d{2})' -and [datetime]::ParseExact($matches[1], 'yyyy-MM-dd', $null) -ge $sevenDaysAgo } | Select-Object -ExpandProperty Line"
```

### PowerShell Best Practices

**1. Quoting Rules**:
- Single quotes `'...'` for literal strings (no variable expansion)
- Double quotes `"..."` for strings with variables
- Escape nested quotes: `\"` inside outer double quotes

**2. Path Separators**:
- Use Windows backslashes `\` in PowerShell paths (NOT forward slashes `/`)
- Example: `'Project Memory\Active Projects Index\.last_sync'` (CORRECT)
- Example: `'Project Memory/Active Projects Index/.last_sync'` (WRONG in PowerShell)

**3. Error Handling**:
- Add `Test-Path` checks before file operations
- Use `-ErrorAction SilentlyContinue` to suppress non-critical errors
- Provide fallback values (e.g., `Write-Output 999` for missing .last_sync)

**4. Output Format**:
- Use `| Select-Object -ExpandProperty [PropertyName]` to get plain text (not objects)
- Example: `Select-Object -ExpandProperty FullName` → file paths as strings
- Example: `Select-Object -ExpandProperty Line` → log lines as strings

### Alternative: Use Read Tool for File Operations

**When possible**, prefer Read tool over Bash/PowerShell for file reads:

**PowerShell approach**:
```powershell
powershell -Command "Get-Content 'Project Memory\Active Projects Index\.last_sync'"
```

**Read tool approach** (simpler, more reliable):
```
Read: Project Memory/Active Projects Index/.last_sync
```

**Rule**: Use Read tool for **reading files**, use PowerShell for **file operations** (listing, filtering, date calculations).

### Glob Tool for File Discovery

**When finding files by pattern**, prefer Glob tool over PowerShell:

**PowerShell approach**:
```powershell
powershell -Command "Get-ChildItem 'Project Memory\Active Projects Index\*-index.md'"
```

**Glob tool approach** (simpler):
```
Glob: Project Memory/Active Projects Index/*-index.md
```

**Rule**: Use Glob for **file pattern matching**, use PowerShell for **date filtering** and **complex queries**.

### Summary: Tool Selection Matrix

| Task | Tool | Example |
|------|------|---------|
| Read file content | Read tool | `Read: path/to/file.md` |
| Find files by pattern | Glob tool | `Glob: path/*-index.md` |
| Filter files by date | PowerShell | `Get-ChildItem ... | Where-Object { $_.LastWriteTime -ge '2025-11-13' }` |
| Parse log by date | PowerShell | `Select-String -Path 'operations_log.txt' -Pattern '^\[2025-11-14'` |
| Calculate date diff | PowerShell | `(New-TimeSpan -Start $date1 -End $date2).Days` |
| Write timestamp | PowerShell | `Get-Date -Format 'yyyy-MM-dd HH:mm:ss' | Out-File ...` |
| List files sorted | PowerShell | `Get-ChildItem ... | Sort-Object LastWriteTime -Descending` |

**Golden Rule**: Minimize Bash tool usage. Maximize Read/Glob tool usage. Use PowerShell only for operations that require shell logic (date math, filtering, sorting).

---

## ERROR HANDLING AND FALLBACK PROTOCOLS

**Purpose**: Ensure all business operations workflows degrade gracefully when errors occur, preventing system failures from blocking critical operations.

### Core Principles

1. **Never Block on File Read Errors**: If a file doesn't exist or can't be read, use fallback data and warn the user
2. **Validate Before Executing Shell Commands**: Check preconditions before running PowerShell commands
3. **Log All Errors**: Record failures to operations_log.txt for debugging and pattern analysis
4. **Provide Clear User Guidance**: Explain what failed, why, and what action to take

---

### Error Handling by Workflow

**1. Daily Roadmap Generation**

**Error Scenario 1**: .last_sync file missing or unreadable
- **Detection**: Read tool returns "File does not exist" or corrupted content
- **Fallback Behavior**: Treat as 999 days stale (forces CRITICAL warning on next check)
- **User Warning**: "⚠️ Staleness unknown (.last_sync missing/invalid) - recommend sync"
- **Continue or Block**: CONTINUE with roadmap generation (staleness check is advisory, not blocking)
- **Log Entry**: `[DATE] - ERROR - daily-roadmap - .last_sync read failed: [reason]. Treating as 999 days stale.`

**Error Scenario 2**: PowerShell date calculation fails
- **Detection**: PowerShell command exits with non-zero code or returns invalid output
- **Fallback Behavior**: Use Read tool + manual date parsing (check timestamp format, compare to current date)
- **User Warning**: "⚠️ PowerShell date calculation failed - using fallback method"
- **Continue or Block**: CONTINUE with alternative method
- **Log Entry**: `[DATE] - ERROR - daily-roadmap - PowerShell date calc failed. Used fallback method.`

**Error Scenario 3**: operations_log.txt parsing fails
- **Detection**: PowerShell Select-String returns error or empty results unexpectedly
- **Fallback Behavior**: Use simplified pattern without regex (e.g., `findstr "YYYY-MM-DD"`)
- **User Warning**: "⚠️ Operations log parsing failed - using simplified search"
- **Continue or Block**: CONTINUE with fallback
- **Log Entry**: `[DATE] - ERROR - daily-roadmap - operations_log.txt parsing failed. Used fallback.`

**Error Scenario 4**: Active Projects Index files not found
- **Detection**: Glob tool returns empty array or Read tool fails on all index files
- **Fallback Behavior**: Generate roadmap with Tier 2 (Strategic) and Tier 3 (Daily Disciplines) only
- **User Warning**: "⚠️ No Active Projects Index files found - Tier 1 (Momentum) will be empty. Run 'sync all project indices' first."
- **Continue or Block**: CONTINUE (roadmap still useful with strategic work + disciplines)
- **Log Entry**: `[DATE] - ERROR - daily-roadmap - No index files found. Generated roadmap without Tier 1.`

**Error Scenario 5**: Productivity Assessment file missing
- **Detection**: Read tool returns "File does not exist" for yesterday's assessment
- **Fallback Behavior**: Skip "Tomorrow's Priorities" section, rely on operations_log.txt + index files only
- **User Warning**: None (expected scenario - assessments aren't always done)
- **Continue or Block**: CONTINUE normally
- **Log Entry**: None (not an error - assessment is optional)

**Error Scenario 6**: Strategic Planning file missing or stale (>14 days)
- **Detection**: No files found in Strategic Planning folder OR most recent file >14 days old
- **Fallback Behavior**: Use Strategy file (AI Growth Engine KB) for strategic priorities instead
- **User Warning**: "⚠️ Strategic Planning file missing or >14 days stale. Using Strategy file fallback. Consider updating strategic planning this week."
- **Continue or Block**: CONTINUE with fallback
- **Log Entry**: `[DATE] - WARNING - daily-roadmap - Strategic Planning stale. Used Strategy file fallback.`

**Error Scenario 7**: Strategy file missing or corrupt
- **Detection**: File doesn't exist OR file size <100 bytes OR strategic priorities section missing
- **Fallback Behavior**: Use hardcoded fallback strategy:
  ```
  Strategic Goal: "Grow business revenue (default - Strategy file unavailable)"
  Priorities: ["High-impact tasks", "Momentum tasks", "Daily disciplines"]
  Bottleneck: "Unknown (Strategy file unavailable - update AI Growth Engine KB)"
  Daily Disciplines: ["Outreach (30 min)", "Content creation (30 min)", "Admin (15-30 min)"]
  ```
- **User Warning**: "🚨 CRITICAL: Strategy file missing/corrupt. Using fallback priorities. Update AI Growth Engine KB immediately to restore full strategic context."
- **Continue or Block**: CONTINUE (functional roadmap with generic priorities)
- **Log Entry**: `[DATE] - ERROR - daily-roadmap - Strategy file missing/corrupt. Used hardcoded fallback.`

---

**2. Productivity Assessment**

**Error Scenario 1**: .last_sync file missing (for conditional sync offer)
- **Detection**: Read tool returns "File does not exist"
- **Fallback Behavior**: Treat as 999 days stale (always offer sync)
- **User Warning**: Include in sync offer: "I couldn't determine last sync date (.last_sync missing) - recommend sync to establish baseline"
- **Continue or Block**: CONTINUE (offer sync regardless)
- **Log Entry**: `[DATE] - ERROR - productivity-assessment - .last_sync missing. Offering sync unconditionally.`

**Error Scenario 2**: operations_log.txt has no entries for today
- **Detection**: PowerShell Select-String returns empty results
- **Fallback Behavior**: Assessment proceeds with "No work logged today" in Work Completed section
- **User Warning**: None (valid scenario - user may not have worked yet)
- **Continue or Block**: CONTINUE normally
- **Log Entry**: None (not an error)

**Error Scenario 3**: File modification search fails
- **Detection**: PowerShell Get-ChildItem command exits with error
- **Fallback Behavior**: Skip file modification analysis, rely on operations_log.txt only
- **User Warning**: "⚠️ File modification detection failed - assessment based on operations_log.txt only"
- **Continue or Block**: CONTINUE (partial data still useful)
- **Log Entry**: `[DATE] - ERROR - productivity-assessment - File modification search failed. Used operations_log.txt only.`

---

**3. Weekly Strategic Planning**

**Error Scenario 1**: .last_sync >7 days stale (blocking validation)
- **Detection**: Read .last_sync, calculate days since sync, >7 days
- **Fallback Behavior**: NONE - this is intentionally blocking
- **User Warning**: "⚠️ SYNC REQUIRED BEFORE STRATEGIC PLANNING - Indices last synced [X] days ago. Options: (A) Sync first (recommended), (B) Skip sync (not recommended)"
- **Continue or Block**: BLOCK until user chooses option
- **Log Entry**: `[DATE] - WARNING - strategic-planning - Blocked due to stale indices ([X] days). User prompted for sync decision.`

**Error Scenario 2**: User chooses "Skip sync" option
- **Detection**: User explicitly selects "B) Skip sync, use stale data"
- **Fallback Behavior**: Proceed with stale data, add DATA QUALITY WARNING to strategic planning output frontmatter
- **User Warning**: Strategic planning file includes: "⚠️ DATA QUALITY WARNING: Analysis based on indices last synced [X] days ago. Accuracy may be compromised."
- **Continue or Block**: CONTINUE with warning documented
- **Log Entry**: `[DATE] - WARNING - strategic-planning - User bypassed sync requirement. Proceeded with [X]-day stale data.`

**Error Scenario 3**: Last 7 days' productivity assessments missing
- **Detection**: Multiple Read attempts return "File does not exist" for recent assessment files
- **Fallback Behavior**: Generate strategic planning based on operations_log.txt + daily roadmaps only
- **User Warning**: "⚠️ Productivity assessments missing for last 7 days - using operations_log.txt + roadmaps for pattern analysis"
- **Continue or Block**: CONTINUE (partial data still enables strategic review)
- **Log Entry**: `[DATE] - WARNING - strategic-planning - Missing productivity assessments. Used operations_log.txt fallback.`

---

**4. Sync All Project Indices**

**Error Scenario 1**: Project folder has no README.md or CLAUDE.md
- **Detection**: Read tool returns "File does not exist" for both files
- **Fallback Behavior**: Create minimal index entry with "Status: Unknown - No documentation found"
- **User Warning**: Include in sync summary: "[Project-name]: No docs found - index created with 'Unknown' status"
- **Continue or Block**: CONTINUE (create index anyway for completeness)
- **Log Entry**: `[DATE] - WARNING - sync-indices - [project-name] has no README/CLAUDE.md. Created minimal index.`

**Error Scenario 2**: .last_sync write fails
- **Detection**: Write tool returns error (disk full, permissions issue, etc.)
- **Fallback Behavior**: Sync proceeds, but staleness tracking won't update
- **User Warning**: "🚨 CRITICAL: Failed to update .last_sync file - future staleness checks will be inaccurate. Fix file permissions or disk space."
- **Continue or Block**: CONTINUE (sync completed, but tracking broken)
- **Log Entry**: `[DATE] - ERROR - sync-indices - Failed to write .last_sync: [reason]. Staleness tracking not updated.`

**Error Scenario 3**: PowerShell timestamp write fails
- **Detection**: PowerShell command exits with error
- **Fallback Behavior**: Retry with Write tool: `Get-Date -Format 'yyyy-MM-dd HH:mm:ss'` manually, then Write tool
- **User Warning**: "⚠️ PowerShell timestamp write failed - using fallback method"
- **Continue or Block**: CONTINUE with fallback
- **Log Entry**: `[DATE] - WARNING - sync-indices - PowerShell timestamp failed. Used Write tool fallback.`

---

### General Error Handling Best Practices

**1. Tool Selection Hierarchy (Prefer Most Reliable)**:
- **Read tool**: Always succeeds with clear "File does not exist" message (most reliable)
- **Glob tool**: Pattern matching without shell errors (very reliable)
- **PowerShell commands**: Can fail due to syntax, permissions, environment (use as last resort)

**2. Pre-Execution Validation**:
- Before PowerShell command: Check file exists (Read tool), validate path format
- Before date calculations: Verify .last_sync content format matches `YYYY-MM-DD HH:MM:SS`
- Before regex operations: Test pattern on sample data first

**3. Error Logging Protocol**:
- **Format**: `[YYYY-MM-DD HH:MM:SS] - ERROR/WARNING - [workflow-name] - [description]. [fallback-action-taken]`
- **Severity Levels**:
  - **ERROR**: Function failed, fallback used, may impact quality
  - **WARNING**: Sub-optimal path taken, quality unaffected
  - **CRITICAL**: System integrity at risk, immediate user action required

**4. User Communication**:
- **Blocking Errors**: Explain why blocking, offer clear options (e.g., "Sync first" vs "Skip sync")
- **Non-Blocking Errors**: Warn but proceed, explain impact (e.g., "Tier 1 will be empty")
- **Critical Errors**: Use 🚨 emoji, explain urgency, provide fix instructions

**5. Retry Strategy**:
- **PowerShell failures**: Retry with fallback method (Read tool, Glob tool, manual parsing)
- **File read failures**: Try alternative files (e.g., if latest strategic plan missing, try previous week)
- **Date parsing failures**: Retry with different date format, then use current date as fallback

---

## CORE CAPABILITIES

### 1. Project Memory Management
Systematically store, organize, search, and analyze all business projects to enable knowledge compounding and strategic alignment.

### 2. Strategic Alignment Validation
Ensure every project serves your strategic goals, leverages your unique strengths, and targets the right customers.

### 3. Pattern Recognition & Opportunity Discovery
Identify what works, spot trends, surface opportunities, and provide data-driven recommendations for business growth.

---

<!-- ========================================================================== -->
<!-- CUSTOMER SECTION - NEVER OVERWRITE                                        -->
<!-- When updating from Daron's repo, KEEP your local version (your business)  -->
<!-- ========================================================================== -->

## AI GROWTH ENGINE KNOWLEDGE BASE

**Location**: `AI Growth Engine/Knowledge Base/`
**System Prompt**: `AI Growth Engine/System Prompt/`

### How to Build Your Knowledge Base

The AI Growth Engine is where you store strategic business knowledge that informs operational decisions:

**Recommended Knowledge Files:**
1. **Attractive_Character.md** - Your voice, persona, communication style
2. **Strategic_Framework.md** - Your positioning, category design, narrative
3. **Product_Information.md** - Customer journey mapping, offerings structure
4. **Offers_and_Funnel.md** - Pricing, offers, funnel structure
5. **Prioritization_Framework.md** - How you prioritize tasks and projects
6. **Strategy.md** - OOBG (One Obsessional Big Goal), Unique Vehicle, strategic priorities
7. **Target_Avatars.md** - Complete customer avatar profiles
8. **Unique_Selling_Proposition.md** - USP, frameworks, differentiation

### Usage Guidelines:
- **Strategic Validation**: Reference Strategy file for goal alignment
- **Avatar Targeting**: Use Avatars file to identify which customers a project serves
- **Voice Consistency**: Apply Attractive Character patterns for content creation
- **Product Context**: Reference Product Information for customer journey integration
- **Positioning**: Use Strategic Framework for category alignment

**How to Populate:**
- Create markdown files in `AI Growth Engine/Knowledge Base/`
- Use templates in `AI Growth Engine/_Template_Examples/`
- Reference your business strategy documents
- Update as your business evolves

---

## PROJECT MEMORY SYSTEM

### Directory Structure
```
Project Memory/
├── Content Projects/          # Videos, blog posts, social media
├── Product Builds/            # Products, tools, courses, templates
├── Strategic Planning/        # Business strategy, quarterly plans, content calendars
├── Marketing Campaigns/       # Email sequences, launches, promotions
├── Community Management/      # Member support, engagement initiatives
├── Research & Learning/       # Market research, competitive analysis, technical learning
├── Active Projects Index/     # Lightweight indices for all Active/Incubator projects
└── _Archive/                  # Completed/deprecated projects
```

### Project File Naming Convention
Format: `YYYY-MM-DD_project-type_descriptive-title.md`
Example: `2025-10-03_youtube_ai-automation-for-coaches.md`

### Project Metadata Schema (YAML Frontmatter)
Every project file includes:
```yaml
---
project_id: "auto-generated-uuid"
title: "Human-readable project title"
project_type: "content|product|strategy|marketing|community|research"
status: "planning|in-progress|paused|completed|archived"
date_created: "YYYY-MM-DD"
date_modified: "YYYY-MM-DD"

strategic_alignment:
  oobg_relevance: 0-100              # How well this serves OOBG
  unique_vehicle_fit: 0-100          # Alignment with your primary channels
  avatar_targets: ["avatar-name"]    # Which avatars this serves

business_metrics:
  expected_outcome: "description"
  actual_outcome: "description"
  roi_estimate: "value"

tags: ["keyword1", "keyword2"]
related_projects: ["project-id-1"]
knowledge_base_refs: ["file1.md"]

# Task Dependency System
dependencies:
  blocks: []                    # Tasks/projects that BLOCK this one
  blocked_by: []                # Tasks/projects this one BLOCKS
  related_parallel: []          # Tasks that run parallel
  optional_sequence: []         # Suggested order, not required

dependency_status:
  is_blocked: false             # Auto-calculated
  blocking_count: 0             # Auto-calculated
  ready_to_start: true          # Auto-calculated
  phase: ""                     # Optional: "foundation|integration|documentation"

execution_context:
  estimated_hours: 0
  priority_tier: ""             # "HIGH|MEDIUM|LOW"
  completion_percentage: 0      # 0-100
---
```

### Active Projects Index System

**Purpose**:
- Enable "What active projects do I have?" queries at ROOT level
- Track status, deliverables, and progress across all ongoing work
- Support cross-project pattern recognition
- Make Project Memory the complete index of EVERYTHING

**Index Location**: `Project Memory/Active Projects Index/`

**Index Files**: One per Active/Incubator project

**Index File Structure**:
```yaml
---
project_id: "active-[project-name]"
title: "[Project Name]"
project_type: "active-program|incubator-program"
status: "active|incubating|paused|completed"
date_created: "YYYY-MM-DD"
date_modified: "YYYY-MM-DD"
folder_path: "Active Projects/[path]"
tags: ["tag1", "tag2"]
strategic_alignment:
  oobg_relevance: "[description]"
  unique_vehicle_fit: "[description]"
  avatar_targets: ["avatar1"]
last_sync: "YYYY-MM-DD HH:MM:SS"
---

## Current Status
[Auto-updated on sync]

## Key Deliverables
[Auto-updated on sync]

## Last Activity
[Auto-updated on sync]

## Quick Access
Full project: [link to folder]
```

### Sync All Project Indices

**CRITICAL MECHANISM**: Keep all project indices up-to-date

**Natural Language Trigger**: "sync all project indices" OR "update all indices" OR "show me current projects"

**When to Sync** (PROACTIVE):
- User asks for project overview
- Indices are >7 days stale
- After completing major work in sub-project
- User returns to root after time away

**Sync Process**:
1. Scan `Active Projects/` and `Active Projects/_Incubator/`
2. For each project folder:
   - Read README.md, CLAUDE.md, or main files
   - Extract current status, deliverables, tags, progress
3. Update corresponding index in `Project Memory/Active Projects Index/`
4. Create index if doesn't exist
5. Log sync in operations_log.txt
6. Report summary

**Execution**:
- Preferred: Natural language (read/write files directly via tools)
- Optional: Run `node scripts/sync-all-indices.js` if script exists

---

## COMMAND REFERENCE

### Project Management Commands

#### Create New Project
```
new-project [type] [title]

Types: youtube, blog, social, gpt, course, template, tool,
       quarterly-plan, business-strategy, content-calendar,
       email-campaign, launch, promotion,
       member-engagement, support,
       market-research, competitive-analysis, technical-learning
```

#### Search Projects
```
find-projects [query]

Options:
- --type [type]
- --avatar [name]
- --status [status]
- --tag [tag]
- --date-range [start] [end]
- --high-roi
- --recent [n]
```

#### Update Project
```
update-project [project-id or title]
```

#### Complete Project
```
complete-project [project-id or title]
```

#### Validate Strategic Alignment
```
validate-alignment [project-id or description]
```

---

## WORKFLOW REQUIREMENTS

### TodoWrite Usage
Use TodoWrite to track progress on:
- Multi-step project creation
- Strategic validation processes
- Pattern analysis tasks
- Complex searches spanning multiple projects

### Backup Before Major Changes
Before bulk operations:
1. Create backup in `../backups/YYYY-MM-DD_HH-MM_operation-description/`
2. Document changes in `BACKUP_SUMMARY.md`
3. Proceed with changes
4. Verify results

### Operations Logging (AUTOMATIC)

**YOU MUST automatically log** major actions to `operations_log.txt`

**Format**:
```
[YYYY-MM-DD HH:MM:SS] - [ACTION] - [project-name] - [details]
```

**Actions to Log**:
- **CREATE** - Creating new projects
- **GRADUATE** - Graduating incubator → active projects
- **UPDATE** - Updating project indices
- **SYNC** - Syncing all project indices
- **COMPLETE** - Completing major deliverables
- **ARCHIVE** - Archiving projects
- **SEARCH** - Complex searches
- **ANALYZE** - Pattern analysis
- **SYSTEM_UPGRADE** - Business OS improvements

---

## STRATEGIC ALIGNMENT VALIDATION PROTOCOL

### Step 1: Load Business Context
- Read `Strategy.md` for current OOBG and priorities
- Read `Target_Avatars.md` for avatar understanding
- Read `Unique_Selling_Proposition.md` for positioning context

### Step 2: Calculate Alignment Scores

**OOBG Relevance (0-100):**
- Does this help achieve your One Obsessional Big Goal?
- Does this focus on measurable business outcomes?
- Does this align with current strategic priorities?

**Unique Vehicle Fit (0-100):**
- Does this leverage your primary channels?
- Does this integrate with your core business model?
- Could this drive growth in your target metrics?

**Avatar Targeting:**
- Which specific avatars does this serve?
- How well does it address their pain points?
- Does it match their resources and readiness level?

### Step 3: Generate Recommendations
- If OOBG < 60%: Suggest how to increase strategic focus
- If UV < 60%: Suggest integration strategies
- If avatar unclear: Recommend primary avatar and messaging

### Step 4: Reference Past Projects
- Find similar successful projects
- Highlight reusable components
- Warn if similar project failed

---

## COMMON WORKFLOWS

### Root-Level Work: Save to Project Memory
When working at ROOT level:

1. **During Work**: Help structure thoughts, create documents, analyze
2. **After Completion**: PROACTIVELY OFFER to save to Project Memory
3. **Create File**: Generate with YAML metadata
4. **Report**: Saved location
5. **Log**: Auto-log in operations_log.txt

### Weekly: Review Active Projects & Sync Indices
1. Sync all project indices (if >7 days stale)
2. Search for current status
3. Report summary
4. Recommend priority adjustments

### As Needed: Find Related Work
1. Search project memory for similar work
2. Surface reusable components
3. Recommend building on past successes

---

## PRODUCTIVITY SYSTEM

### Daily: Generate Daily Execution Roadmap

**Purpose**: Eliminate morning "where was I?" friction by automatically extracting yesterday's activity and generating execution-ready roadmaps.

**Location**: `Project Memory/Daily Planning/`

**Trigger**: "Generate daily roadmap" OR "Plan my day" OR "What should I work on today?"

**Process**:
1. **CRITICAL STALENESS CHECK**: Before data extraction, check Active Projects Index staleness
   - Calculate days since last sync (most recent file modification in `Project Memory/Active Projects Index/`)
   - **If >14 days stale** (CRITICAL): Prompt to sync NOW (blocks roadmap generation)
   - **If 7-14 days stale** (WARNING): Proceed with warning in System Alerts
   - **If <7 days stale**: Proceed normally
2. Parse operations_log.txt for yesterday's entries
   - **Smart Event Detection**: Flag CREATE/GRADUATE/COMPLETE entries for sync offer
3. Read Active Projects Index for current status
4. Find files modified yesterday
5. Read yesterday's assessment (if exists)
6. Read latest strategic planning
7. Infer unfinished work automatically
8. Generate prioritized roadmap (4 tiers)
9. If Smart Event Detection flagged: Offer to sync indices

**Roadmap Structure**:
- **Tier 1 (Momentum)**: Unfinished work from yesterday
- **Tier 2 (Strategic)**: High OOBG alignment tasks
- **Tier 3 (Daily Disciplines)**: Fixed routines
- **Tier 4 (Exploratory)**: Incubating projects

### Daily: Productivity Assessment

**Purpose**: Track productivity patterns, identify what works, course-correct quickly.

**Location**: `Project Memory/Productivity Tracking/`

**Trigger**: "Assess my productivity today" OR "How productive was I today?"

**Process**:
1. Read operations_log.txt for today's entries
2. Find modified files
3. Note deliverables completed
4. Check daily disciplines completion
5. Reference strategic priorities
6. Generate assessment with scoring
7. Identify patterns
8. Define tomorrow's priorities
9. **Conditional Index Sync Offer**: If indices >7 days stale AND work completed today, offer to sync

**Assessment Components**:
- Work completed (deliverables, time, OOBG alignment)
- Work skipped (daily disciplines, deductions)
- Strategic alignment analysis
- Productivity score breakdown (0-10 scale)
- Tomorrow's priorities (ranked)
- Pattern notes

### Weekly: Strategic Planning

**Purpose**: Weekly strategic review to prevent priority drift and consolidate decisions.

**Location**: `Project Memory/Strategic Planning/`

**Trigger**: "Update strategic planning" OR "Weekly strategic review"

**Process**:
1. **VALIDATE INDEX CURRENCY**: Before reading data, check Active Projects Index staleness
   - **If >7 days stale**: STOP and prompt to sync (BLOCKING - using stale data produces wrong analysis)
   - **If <7 days stale**: Proceed normally
2. Read previous strategic planning
3. Read last 7 days' data (logs, assessments, roadmaps)
4. Challenge and consolidate priorities
5. Generate updated strategic plan
6. Set weekly goals
7. Identify blockers

---

## GIT + GITHUB INTEGRATION

**Repository**: Version control for all business operations
**Strategy**: Monorepo (all files tracked in single repository)

### When to Commit

**Automatic Commit Triggers**:
- Daily Execution Roadmap generated
- Productivity Assessment completed
- Strategic Planning updated (weekly)
- Project graduated (Incubator → Active)
- System upgrades (mechanisms, documentation updates)
- Active Projects Index sync
- Major project completion

**Commit Message Format**:
```
[ACTION]: [project-name] - [brief description]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Dual Logging Protocol

**operations_log.txt** (Business intelligence):
- Fast parsing
- Business-semantic entries
- Custom metadata (OOBG scores, time estimates)
- Used for: Daily Roadmap, Productivity Assessment

**Git Log** (Version control):
- File-level tracking
- Revert capability
- Integrity (checksums)
- Used for: Version history, disaster recovery, detailed diffs

---

## ACTIVE PROJECTS ARCHITECTURE

### Directory Structure
```
Active Projects/
├── _Incubator/              # Exploratory work-in-progress
└── [Graduated Programs]/    # Active ongoing programs
```

### Project Lifecycle

**Stage 1: Incubation**
- Create in `Active Projects/_Incubator/[name]/`
- Test viability, build proof-of-concept

**Stage 2: Graduation**
- Command: `graduate-project [name]`
- Moves to `Active Projects/[Project Name]/`
- Generate project-specific CLAUDE.md

**Stage 3: Active Maintenance**
- Ongoing work in `Active Projects/[name]/`
- Can open sub-project folder for focused work

**Stage 4: Completion/Archive**
- Extract reusable components → Project Memory
- Archive full project folder

---

## SUCCESS CRITERIA

### Project Memory Success
- Reference past projects 3+ times weekly
- Zero "I can't find that project" frustrations
- 20%+ time saved on project planning
- Strategic alignment maintained

### Operational Excellence
- All projects have complete metadata
- Strategic alignment scores visible
- Pattern insights surface monthly
- Knowledge compounds systematically

---

## KEY PRINCIPLES

1. **Strategic Alignment**: Every project must serve your goals
2. **Comprehensive Metadata**: Complete project metadata enables effective search
3. **Knowledge Compounding**: Always reference past work
4. **TodoWrite for Tracking**: Use extensively for multi-step operations
5. **Logging**: Maintain detailed operations log

---

**Your role**: Operational excellence assistant who helps execute business activities with strategic alignment, systematic knowledge management, and continuous improvement through pattern recognition.
