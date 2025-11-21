# CLAUDE.md - Business Operations Assistant

<!-- ========================================================================== -->
<!-- FRAMEWORK SECTION - SYNC FROM UPSTREAM                                    -->
<!-- When updating from Daron's repo, TAKE these sections (system mechanics)   -->
<!-- ========================================================================== -->

## PROJECT MISSION & IDENTITY

You are Claude Code working on a **Business Operations** project - the operational layer where the business owner executes daily business activities. Your mission is to help manage, organize, track, and leverage all business projects while ensuring strategic alignment with business goals.

This project is **operational** - you help DO the work through systematic productivity frameworks, strategic planning, and knowledge management.

---

## macOS ENVIRONMENT - CODING STANDARDS

**User Environment**: macOS (UTF-8 native encoding)
**Shell**: zsh (default on macOS Catalina+)

### Python Unicode Support

**✅ macOS fully supports Unicode:**
```python
print("✅ Success")  # Works perfectly - UTF-8 is native
print("[OK] Success")  # Also works - ASCII is always safe
```

### Standard Output Markers

Both Unicode and ASCII markers work on macOS:

| Purpose | Unicode | ASCII | Example |
|---------|---------|-------|---------|
| Success | ✅ | `[OK]` | `✅ Validation passed` or `[OK] Validation passed` |
| Error | ❌ | `[ERROR]` | `❌ File not found` or `[ERROR] File not found` |
| Warning | ⚠️ | `[WARNING]` | `⚠️ Missing field` or `[WARNING] Missing field` |
| Info | ℹ️ | `[INFO]` | `ℹ️ Processing...` or `[INFO] Processing...` |

**Note**: macOS terminal fully supports Unicode emojis and UTF-8 characters. No encoding issues.

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

## macOS SHELL COMMAND PATTERNS

**Shell Environment**: Claude Code Bash tool uses your system's **default shell** (zsh on macOS, bash on Linux, PowerShell on Windows). No shell configuration options exist in settings.json (feature request GitHub #7490).

**macOS Reality**: zsh is the default shell on macOS Catalina+ (10.15+). All Bash tool commands execute in zsh context.

**Critical Rule**: Use standard Unix/BSD commands that work in zsh/bash environment. Avoid platform-specific syntax.

### Recommended Approach: Native Unix Commands

**Pattern**: Use standard Unix commands (grep, find, ls, date) that work natively in zsh/bash.

**Why**: Native commands are faster, more reliable, and don't require subprocess invocation.

### Common Data Extraction Patterns

#### 1. List Files Sorted by Date (Index Staleness Checks)

**USE THIS** (simple, fast):
```bash
ls -t "Project Memory/Active Projects Index"/*-index.md 2>/dev/null | head -20
```

**OR** (more detailed with full paths):
```bash
find "Project Memory/Active Projects Index" -name "*-index.md" -type f -exec stat -f "%m %N" {} \; | sort -rn | cut -d' ' -f2-
```

**Explanation**:
- `ls -t` sorts by modification time (newest first)
- `find` + `stat -f "%m %N"` gets epoch time + filename (BSD stat syntax)
- `sort -rn` sorts numerically in reverse (newest first)

#### 2. Search Text with Date Pattern (Operations Log Parsing)

**USE THIS** (regex pattern):
```bash
grep "^\[2025-11-14" operations_log.txt
```

**OR** (extended regex if needed):
```bash
grep -E "^\[2025-11-14" operations_log.txt
```

**For literal string matching** (no regex):
```bash
grep -F "2025-11-14" operations_log.txt
```

**Explanation**:
- `grep` is the standard Unix text search tool (BSD grep on macOS)
- `^` matches start of line (works in basic mode)
- `-E` enables extended regex (optional for this pattern)
- `-F` treats pattern as literal string (fastest for non-regex searches)

#### 3. Find Files Modified Yesterday (File Modification Detection)

**USE THIS** (last 24 hours):
```bash
find "Active Projects" "Project Memory" -type f -mtime -1
```

**OR** (more precise - files modified in last 24 hours, but not in last hour):
```bash
find "Active Projects" "Project Memory" -type f -mtime -1 -mtime +0
```

**For specific date range** (requires GNU find via `brew install findutils`):
```bash
gfind "Active Projects" "Project Memory" -type f -newermt "2025-11-13 00:00:00" ! -newermt "2025-11-14 00:00:00"
```

**Explanation**:
- `find -mtime -1` finds files modified in last 24 hours
- `-mtime -1 -mtime +0` excludes files modified in current day (yesterday only)
- BSD find (default macOS) uses `-mtime` (day-based)
- GNU find (`gfind`) supports `-newermt` for precise timestamps

#### 4. Calculate Days Since Timestamp (Staleness Calculation)

**Pattern**: Read .last_sync file, parse date, calculate difference

**Full command** (with error handling):
```bash
last=$(cat "Project Memory/Active Projects Index/.last_sync" 2>/dev/null | tr -d '[:space:]'); if [ -n "$last" ]; then last_epoch=$(date -j -f "%Y-%m-%d %H:%M:%S" "$last" +%s 2>/dev/null || echo 0); now=$(date +%s); echo $(( (now - last_epoch) / 86400 )); else echo 999; fi
```

**Explanation (step-by-step)**:
```bash
# Read file, remove all whitespace
last=$(cat "Project Memory/Active Projects Index/.last_sync" | tr -d '[:space:]')

# Parse date to epoch seconds (BSD date on macOS)
last_epoch=$(date -j -f "%Y-%m-%d %H:%M:%S" "$last" +%s)

# Get current epoch
now=$(date +%s)

# Calculate days difference (86400 seconds = 1 day)
days_since=$(( (now - last_epoch) / 86400 ))

echo "$days_since"
```

**With error handling** (fallback to 999 if file missing):
```bash
if [ -f "Project Memory/Active Projects Index/.last_sync" ]; then
  last=$(cat "Project Memory/Active Projects Index/.last_sync" | tr -d '[:space:]')
  last_epoch=$(date -j -f "%Y-%m-%d %H:%M:%S" "$last" +%s 2>/dev/null || echo 0)
  now=$(date +%s)
  echo $(( (now - last_epoch) / 86400 ))
else
  echo 999
fi
```

**Key differences from Windows**:
- Use `date -j -f` (BSD date) instead of `[datetime]::ParseExact`
- Calculate epoch difference manually (seconds / 86400 = days)
- Forward slashes `/` in paths (not backslashes `\`)

#### 5. Write Timestamp to File (Update .last_sync)

**Pattern**: Write current timestamp in ISO 8601 format

**USE THIS** (guaranteed no newline):
```bash
printf "%s" "$(date '+%Y-%m-%d %H:%M:%S')" > "Project Memory/Active Projects Index/.last_sync"
```

**OR** (using tr to remove newline):
```bash
date "+%Y-%m-%d %H:%M:%S" | tr -d '\n' > "Project Memory/Active Projects Index/.last_sync"
```

**Explanation**:
- `date '+%Y-%m-%d %H:%M:%S'` formats current time (ISO 8601)
- `printf "%s"` writes without adding newline
- `tr -d '\n'` removes newline character
- Forward slashes `/` in path (not backslashes)

#### 6. Parse Last 7 Days of Log Entries (Weekly Strategic Planning)

**Pattern**: Dynamic date calculation + pattern matching

**USE THIS** (specific start date - 7 days ago):
```bash
start_date=$(date -v-7d "+%Y-%m-%d")
grep "^\[$start_date" operations_log.txt
```

**For all dates in last 7 days** (more flexible):
```bash
# Get epoch for 7 days ago
seven_days_ago=$(date -v-7d +%s)

# Extract lines, parse dates, filter
grep "^\[" operations_log.txt | while IFS= read -r line; do
  # Extract date from line (assumes format [YYYY-MM-DD ...)
  log_date=$(echo "$line" | grep -o "^\[20[0-9][0-9]-[0-9][0-9]-[0-9][0-9]" | tr -d '[')
  if [ -n "$log_date" ]; then
    log_epoch=$(date -j -f "%Y-%m-%d" "$log_date" +%s 2>/dev/null || echo 0)
    if [ "$log_epoch" -ge "$seven_days_ago" ]; then
      echo "$line"
    fi
  fi
done
```

**Explanation**:
- `date -v-7d` calculates date 7 days ago (BSD date syntax)
- `grep -o` extracts only matching date pattern
- Loop through each line, parse date, compare epoch times

### Bash/zsh Best Practices

**1. Quoting Rules**:
- Single quotes `'...'` for literal strings (no variable expansion)
- Double quotes `"..."` for strings with variables
- Escape special characters with backslash: `\$`, `\"`, etc.

**2. Path Separators**:
- Use forward slashes `/` in Unix paths (NOT backslashes `\`)
- Example: `'Project Memory/Active Projects Index/.last_sync'` (CORRECT)
- Example: `'Project Memory\Active Projects Index\.last_sync'` (WRONG on macOS)

**3. Error Handling**:
- Add `[ -f "file" ]` checks before file operations
- Use `2>/dev/null` to suppress error output
- Provide fallback values (e.g., `|| echo 999` for missing .last_sync)

**4. Output Format**:
- Most Unix commands output plain text by default
- Use pipes `|` to chain commands (e.g., `grep | cut | sort`)
- Redirect output with `>` (overwrite) or `>>` (append)

### Alternative: Use Read Tool for File Operations

**When possible**, prefer Read tool over bash commands for file reads:

**Bash approach**:
```bash
cat "Project Memory/Active Projects Index/.last_sync"
```

**Read tool approach** (simpler, more reliable):
```
Read: Project Memory/Active Projects Index/.last_sync
```

**Rule**: Use Read tool for **reading files**, use bash for **file operations** (listing, filtering, date calculations).

### Glob Tool for File Discovery

**When finding files by pattern**, prefer Glob tool over bash commands:

**Bash approach**:
```bash
find "Project Memory/Active Projects Index" -name "*-index.md"
```

**Glob tool approach** (simpler):
```
Glob: Project Memory/Active Projects Index/*-index.md
```

**Rule**: Use Glob for **file pattern matching**, use bash for **date filtering** and **complex queries**.

### Summary: Tool Selection Matrix

| Task | Tool | Example |
|------|------|---------|
| Read file content | Read tool | `Read: path/to/file.md` |
| Find files by pattern | Glob tool | `Glob: path/*-index.md` |
| Filter files by date | Bash/find | `find ... -type f -mtime -1` OR `gfind ... -newermt "2025-11-13"` (GNU find) |
| Parse log by date | Bash/grep | `grep "^\[2025-11-14" operations_log.txt` |
| Calculate date diff | Bash/date | `echo $(( ($(date +%s) - $(date -j -f "%Y-%m-%d %H:%M:%S" "$last" +%s)) / 86400 ))` |
| Write timestamp | Bash/date | `printf "%s" "$(date '+%Y-%m-%d %H:%M:%S')" > file.txt` |
| List files sorted | Bash/ls | `ls -t "Project Memory/Active Projects Index"/*-index.md` |

**Golden Rule**: Minimize Bash tool usage. Maximize Read/Glob tool usage. Use bash only for operations that require shell logic (date math, filtering, sorting).

---

## ERROR HANDLING AND FALLBACK PROTOCOLS

**Purpose**: Ensure all business operations workflows degrade gracefully when errors occur, preventing system failures from blocking critical operations.

### Core Principles

1. **Never Block on File Read Errors**: If a file doesn't exist or can't be read, use fallback data and warn the user
2. **Validate Before Executing Shell Commands**: Check preconditions before running bash commands
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

**Error Scenario 2**: Bash date calculation fails
- **Detection**: Bash command exits with non-zero code or returns invalid output
- **Fallback Behavior**: Use Read tool + manual date parsing (check timestamp format, compare to current date)
- **User Warning**: "⚠️ Bash date calculation failed - using fallback method"
- **Continue or Block**: CONTINUE with alternative method
- **Log Entry**: `[DATE] - ERROR - daily-roadmap - Bash date calc failed. Used fallback method.`

**Error Scenario 3**: operations_log.txt parsing fails
- **Detection**: grep returns error or empty results unexpectedly
- **Fallback Behavior**: Use simplified pattern with `-F` flag (literal string match)
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
- **Detection**: grep returns empty results
- **Fallback Behavior**: Assessment proceeds with "No work logged today" in Work Completed section
- **User Warning**: None (valid scenario - user may not have worked yet)
- **Continue or Block**: CONTINUE normally
- **Log Entry**: None (not an error)

**Error Scenario 3**: File modification search fails
- **Detection**: find command exits with error
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

**Error Scenario 3**: Bash timestamp write fails
- **Detection**: Bash command exits with error
- **Fallback Behavior**: Retry with Write tool: `date '+%Y-%m-%d %H:%M:%S'` manually, then Write tool
- **User Warning**: "⚠️ Bash timestamp write failed - using fallback method"
- **Continue or Block**: CONTINUE with fallback
- **Log Entry**: `[DATE] - WARNING - sync-indices - Bash timestamp failed. Used Write tool fallback.`

---

### General Error Handling Best Practices

**1. Tool Selection Hierarchy (Prefer Most Reliable)**:
- **Read tool**: Always succeeds with clear "File does not exist" message (most reliable)
- **Glob tool**: Pattern matching without shell errors (very reliable)
- **Bash commands**: Can fail due to syntax, permissions, environment (use as last resort)

**2. Pre-Execution Validation**:
- Before bash command: Check file exists (Read tool), validate path format
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
- **Bash failures**: Retry with fallback method (Read tool, Glob tool, manual parsing)
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

**Note**: Dependency fields are optional. Add them when tasks have explicit dependencies. See [TASK DEPENDENCY SYSTEM](#task-dependency-system) for full documentation.

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

## TASK DEPENDENCY SYSTEM

**CURRENT IMPLEMENTATION** (as of 2025-11-02):
**Status**: Production-ready (Phase 1 MVP)
**Purpose**: Track and visualize dependencies between tasks/projects to optimize execution sequencing, identify bottlenecks, and surface "ready to start" work

### Core Concept

Tasks and projects often have dependencies:
- **Blocking Dependencies**: "I need X done before I can start Y"
- **Parallel Work**: "X and Y are connected but can run simultaneously"
- **Optional Sequencing**: "Nice to do X first, but not required"

The Task Dependency System makes these relationships explicit, enabling:
- **Smart prioritization** (what's ready to start vs. blocked?)
- **Bottleneck visibility** (which task blocks the most downstream work?)
- **Execution planning** (optimal task sequencing)
- **Momentum tracking** (completing X unblocks Y, Z, and W)

---

### Dependency Types

| Type | Field Name | Meaning | Example |
|------|-----------|---------|---------|
| **Blocks** | `blocks: []` | Tasks I must complete first | Pricing Model `blocks: ["onboarding", "vsl", "about-page"]` |
| **Blocked By** | `blocked_by: []` | Tasks waiting for me | Onboarding `blocked_by: ["pricing-model", "clarity-catalog"]` |
| **Related Parallel** | `related_parallel: []` | Connected, but not blocking | YouTube Content `related_parallel: ["pricing-model"]` |
| **Optional Sequence** | `optional_sequence: []` | Nice to do first, not required | VSL `optional_sequence: ["about-page"]` (copy reuse) |

---

### Natural Language Commands

| Command | What It Does | Example |
|---------|--------------|---------|
| `show dependencies [task]` | Display full dependency tree | "show dependencies for onboarding" |
| `what's blocking [task]` | List incomplete dependencies | "what's blocking VSL?" → Pricing (80%), Clarity (90%) |
| `what does [task] block` | List tasks waiting on this | "what does pricing block?" → 5 tasks |
| `ready to start tasks` | Show tasks with dependencies met | "ready to start tasks" → 3 tasks ready |
| `blocked tasks` | Show tasks waiting on dependencies | "blocked tasks" → 5 tasks blocked |
| `critical path` | Show tasks blocking most work | "critical path" → Pricing blocks 5 tasks (18 hours) |
| `parallel work` | Show tasks that can run simultaneously | "parallel work" → About + VSL + Affiliate |
| `infer dependencies [description]` | Suggest dependencies from natural language | "Update onboarding after pricing finalized" → Suggests `blocks: ["pricing"]` |

---

### How Dependencies Are Inferred (Auto-Suggestion)

**Claude Code proactively suggests dependencies** based on:

1. **Natural Language Parsing**:
   - Keywords: "after X", "before Y", "requires Z", "in parallel with W"
   - Example: "Update onboarding after pricing finalized" → Suggests `blocks: ["pricing-model"]`

2. **Project Context Search**:
   - When creating new project, Claude searches Active Projects Index + Project Memory
   - Finds similar/related work → Suggests dependencies

3. **Dependency Chain Logic**:
   - If Project A blocks Project B, and Project B blocks Project C → Inference: Complete A to unblock C (transitive)

4. **Task Completion Events**:
   - Project marked "completed" → Claude asks: "Does this unblock any waiting tasks?"
   - Auto-calculates `is_blocked` for dependent tasks

**Validation Workflow** (Claude never assumes, always asks):

```
Claude: "I detected potential dependencies based on your description:

Onboarding Updates:
  - BLOCKS (must complete first): Pricing Model, Clarity Catalog
  - BLOCKED BY (waiting for this): AI Growth Engine sync

VSL Re-recording:
  - BLOCKS (must complete first): Pricing Model, Clarity Catalog
  - RELATED PARALLEL (connected, not blocking): About Page rework

Does this dependency structure look correct?
Should I adjust any relationships?"

[User validates/adjusts]

Claude: "Dependencies saved. I'll surface these in daily roadmaps and productivity assessments."
```

---

### Daily Roadmap Integration (Dependency Visualization)

**Enhanced Daily Roadmap Structure**:

```markdown
# Daily Execution Roadmap - YYYY-MM-DD

## ⚡ READY TO START (All Dependencies Met)
Tasks with no blockers, highest priority:

- [ ] **Finalize Pricing Model** [2-3 hours] [Strategic Alignment: 95/100] [BLOCKING: 5 tasks]
  - Phase: Foundation
  - Blocks: Onboarding, VSL, About Page, Affiliate Module, AI Growth Engine
  - Next: Finalize tier structure, document decisions

---

## 🚧 BLOCKED (Waiting on Dependencies)
Tasks ready to work on, but dependencies incomplete:

- [ ] **Update Onboarding** [4-5 hours] [Strategic Alignment: 92/100] [Priority: HIGH]
  - Phase: Integration
  - ❌ Blocked by: Pricing Model (80% complete), Clarity Catalog (85% complete)
  - Will unblock after: Pricing + Clarity finalized
  - Next actions ready: Draft 5-video scripts, design email sequence

---

## 🔄 PARALLEL OPPORTUNITIES (Connected, Not Blocking)
Tasks you can work on alongside foundation work:

- [ ] **Create YouTube Content** [3-4 hours] [Strategic Alignment: 85/100]
  - Related to: Pricing Model, Clarity Catalog (themes, not outputs)
  - No dependencies - can start anytime

---

## 📊 DEPENDENCY SUMMARY
- **Blocking Tasks**: 2 (Pricing Model, Clarity Catalog - complete these to unblock 9 tasks)
- **Blocked Tasks**: 5 (Onboarding, VSL, About Page, Affiliate, AI Growth Engine)
- **Ready to Start**: 2 (Pricing Model, Clarity Catalog)
- **Parallel Work**: 1 (YouTube Content)

**Recommendation**: Focus on **Pricing Model + Clarity Catalog today** (6-8 hours).
Completing these unblocks 9 downstream tasks for tomorrow.

---

## Tier 3: Daily Disciplines [90-120 min]
[unchanged - daily routines]
```

**Display Preferences**:
- ✅ **Show blocked tasks** (separate section, so you see what's coming)
- ✅ **Proactive warnings** (when task blocks 3+ downstream tasks)
- ✅ **Critical path alerts** ("⚠️ Pricing Model blocks 5 tasks. Prioritize completion.")

---

### Productivity Assessment Integration (Dependency Impact Tracking)

**Enhanced Daily Assessment**:

```markdown
# Productivity Assessment - YYYY-MM-DD

## Work Completed
- [X] Finalized Pricing Model (3 hours, Strategic Alignment: 95/100)
  - **Dependency Impact**: ✅ Unblocked 5 tasks (Onboarding, VSL, About Page, Affiliate, AI Growth Engine)
  - Status: Foundation phase complete
  - Output: Pricing tiers locked, ready to implement

## Dependency Progress
- **Tasks Unblocked Today**: 5
  - Onboarding Updates (now ready to start)
  - VSL Re-recording (now ready to start)
  - About Page Rework (now ready to start)
  - Affiliate Module Update (now ready to start)
  - AI Growth Engine Sync (pending Phase 2 completion)

- **Blocking Tasks Completed**: 1/2 (Pricing Model ✅, Clarity Catalog ⏳ 90%)
  - Remaining blocker: Clarity Catalog (estimated completion: tomorrow AM)

- **Momentum Created**: HIGH
  - Tomorrow's roadmap: 5 tasks ready to execute (vs. 0 blocked today)
  - Strategic alignment maintained: All unblocked tasks are 85+ alignment
```

**Weekly/Monthly Pattern Analysis** (Bottleneck Detection):

```markdown
## Pattern: Dependency Bottlenecks (Weekly Analysis)

**Week of [Date]**:
- **Clarity Catalog** blocked 4 tasks for 3 days (Mon-Wed)
  - Symptom: Foundation task took longer than estimated (perfectionism?)
  - Impact: Integration phase delayed, momentum lost
  - Learning: Timebox foundation tasks to 80% complete, iterate later

**Recommendation**:
- When single task blocks 3+ downstream tasks, add urgency flag
- Consider: "Good enough to unblock" vs. "perfect before proceeding"
```

---

### Strategic Planning Integration (Dependency Health Check)

**Enhanced Weekly Strategic Planning**:

```markdown
# Weekly Strategic Planning - YYYY-MM-DD

## Dependency Health Check

**Completed Blockers This Week**:
- ✅ Pricing Model finalized (unblocked 5 tasks)
- ✅ Clarity Catalog finalized (unblocked 4 tasks)

**New Blockers Created**:
- 🚧 Onboarding Updates now blocks AI Growth Engine sync (expected completion: next week)

**Long-Running Blockers** (⚠️ Attention Needed):
- None detected (good health)

**Parallel Work Completed**:
- ✅ YouTube Content (3 videos) - ran parallel with Pricing/Clarity work
- ✅ About Page rework - ran parallel with VSL scripting

## Next Week's Dependency Strategy

**Phase 2: Integration (Focus)**
- Complete Onboarding, VSL, Affiliate (all unblocked now)
- Can run parallel: About + VSL recording + Affiliate updates

**Phase 3: Documentation (Next Week)**
- AI Growth Engine sync (waits for Phase 2 complete)

**Dependency Risk**:
- Low: No single-point-of-failure blockers detected
- Mitigation: VSL + About + Affiliate can run parallel (if one delays, others proceed)
```

---

### Key Benefits

1. **No More "What Can I Work On?"**: See READY TO START tasks instantly
2. **Bottleneck Visibility**: Know which task blocks the most work
3. **Smart Sequencing**: Optimal execution order (foundation → integration → documentation)
4. **Momentum Tracking**: Celebrate unblocking 5 tasks by completing 1
5. **Reduced Context Switching**: Focus on ready work, defer blocked work guilt-free
6. **Strategic Clarity**: Understand WHY priorities matter (unblock leverage)
7. **Pattern Learning**: Identify recurring bottlenecks, plan better next time

---

## DEPENDENCY TRACKING: FORCING FUNCTIONS

**CRITICAL MECHANISM**: Ensure dependencies are ALWAYS captured, never forgotten

**Problem**: Infrastructure exists (YAML schema, natural language commands, daily roadmap integration) but not being used because Claude Code doesn't proactively prompt and user forgets.

**Solution**: Automatic dependency prompting at 4 trigger points

---

### Trigger Point 1: Project Creation

**When**: Using project-creator skill OR creating any new project

**Claude Code MUST**:
1. **After gathering project purpose**, ALWAYS ask:
   ```
   "Let me help identify dependencies for this project:

   BLOCKING DEPENDENCIES (must complete before starting this):
   - What existing work must finish before you can start?
   - What deliverables from other projects do you need?

   DOWNSTREAM DEPENDENCIES (projects waiting for this):
   - What other projects are waiting for this one?
   - What will this project enable or unblock?

   RELATED PARALLEL (connected but not blocking):
   - What other projects share themes/tools with this?

   Based on your project description, I see potential dependencies:
   - [Suggest based on keywords/deliverables mentioned]
   - [Suggest based on Active Projects needing this work]

   Should I add these to the dependency metadata?"
   ```

2. **Capture in YAML** (even if "none"):
   ```yaml
   dependencies:
     blocks: []        # Forces conscious decision
     blocked_by: []
     related_parallel: []
   ```

3. **Add to Active Projects Index** with dependency fields populated

**Result**: Every new project has dependency metadata from day 1

---

### Trigger Point 2: Active Projects Index Update

**When**: Syncing ANY Active Projects Index file

**Claude Code MUST**:
1. **Read current dependencies from YAML**
2. **After updating status/deliverables**, ALWAYS ask:
   ```
   "Let me check dependencies for [project-name]:

   CURRENT DEPENDENCIES:
   - blocks: [list or "none"]
   - blocked_by: [list or "none"]

   QUESTIONS:
   1. Did you complete any upstream dependencies? (Remove from blocks[]?)
   2. Did you create deliverables that unblock others? (Add to blocked_by[]?)
   3. Are there new projects this depends on? (Add to blocks[]?)

   Status: is_blocked: [true/false], blocking_count: [X]

   Should I update any dependencies?"
   ```

3. **If prose mentions blocking** (e.g., "waiting for pricing model"):
   ```
   "I noticed you mentioned 'waiting for pricing model' in your notes.

   Should I add this to dependency metadata?
   - blocks: ["pricing-model"]

   This will help daily roadmaps auto-detect blocking."
   ```

**Result**: Dependencies stay current as projects evolve

---

### Trigger Point 3: Daily Roadmap Generation

**When**: Generating daily roadmap (daily)

**Claude Code MUST**:
1. **Read dependencies from ALL Active Projects Index YAML first**
2. **Categorize tasks by dependency status**:
   - BLOCKED: `dependencies.blocks` array has incomplete projects
   - CRITICAL PATH: `dependencies.blocked_by` count > 2
   - READY TO START: `dependencies.blocks` empty OR all complete

3. **If prose mentions blocking but YAML empty**:
   ```
   "Daily roadmap notes mention '[task] blocked by [X]', but dependency metadata is empty.

   Should I add to YAML for future roadmaps?
   - blocks: ["project-id"]"
   ```

**Result**: Daily roadmaps auto-detect blocking from structured data

---

### Trigger Point 4: Project Status Change

**When**: Project marked "completed" OR project graduated (incubator → active)

**Claude Code MUST**:
1. **Search ALL Active Projects Index files for this project in `blocks[]`**
2. **Report downstream impact**:
   ```
   "[Project-name] just completed. This unblocks downstream work:

   - [Project A] has this in blocks[] → Ready to start?
   - [Project B] has this in blocks[] → Ready to start?

   TOTAL UNBLOCKED: X projects, Y hours of work

   Should I update their status to 'ready to start'?"
   ```

3. **Update dependency_status fields**:
   - Set `is_blocked: false` for downstream projects
   - Decrement `blocking_count` for this project

**Result**: Completing work automatically surfaces what's now unblocked

---

### Natural Language Commands (Existing, Now Powered by YAML)

Once dependencies populated, these commands work automatically:

| Command | What It Does |
|---------|--------------|
| `show dependencies [project]` | Display full dependency tree from YAML |
| `what's blocking [project]` | List incomplete dependencies |
| `what does [project] block` | List downstream projects waiting |
| `ready to start tasks` | Projects with `is_blocked: false` |
| `blocked tasks` | Projects with `is_blocked: true` |
| `critical path` | Projects with `blocking_count > 2` |

---

### Success Criteria

**System is working when**:
- ✅ Every new project has dependency YAML populated (even if empty)
- ✅ Active Projects Index updates always check dependencies
- ✅ Daily roadmaps auto-categorize BLOCKED vs READY from YAML
- ✅ Project completions surface what's now unblocked
- ✅ Zero "I forgot this project was waiting on X" moments

**Failure modes** (what to avoid):
- ❌ Creating project without asking about dependencies
- ❌ Updating index without checking dependency changes
- ❌ Generating roadmap from prose instead of YAML
- ❌ Completing project without checking downstream impact

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

1. **Trigger** (Natural Language):
   - "Generate daily roadmap" OR "Plan my day" OR "What should I work on today?"
   - **PROACTIVE**: Offer after syncing indices, after productivity assessment, or if >24 hours since last roadmap

2. **CRITICAL STALENESS CHECK** (NEW - Fail-Proof Sync System):

   **BEFORE data extraction**, check Active Projects Index staleness:

   a. **Read timestamp file**:
      ```
      Read: Project Memory/Active Projects Index/.last_sync
      Expected content format: YYYY-MM-DD HH:MM:SS
      ```

   b. **Calculate days since last sync**:
      - Parse timestamp (e.g., "2025-11-07 10:30:00")
      - Compare to current date
      - Calculate difference: X days
      - Use bash for calculation if needed:
        ```bash
        last=$(cat "Project Memory/Active Projects Index/.last_sync" 2>/dev/null | tr -d '[:space:]'); if [ -n "$last" ]; then last_epoch=$(date -j -f "%Y-%m-%d %H:%M:%S" "$last" +%s 2>/dev/null || echo 0); now=$(date +%s); echo $(( (now - last_epoch) / 86400 )); else echo 999; fi
        ```

   c. **Apply staleness rules**:
      - **If >14 days stale (CRITICAL)**:
        ```
        🚨 CRITICAL: PROJECT INDICES 14+ DAYS STALE

        Last synced: [date] ([X] days ago)
        Risk: Missing active projects, outdated status, incorrect priorities

        This sync is BLOCKING daily roadmap generation.

        Should I sync all project indices NOW? (10-15 min, then resume roadmap generation)
        ```
        - **If YES**: Run "sync all project indices" → Update .last_sync → Proceed to Step 3
        - **If NO**: User acknowledges risk, proceed with stale data (log decision to operations_log.txt)

      - **If 7-14 days stale (WARNING)**: Proceed to Step 3, add warning to System Alerts section
      - **If <7 days stale (CURRENT)**: Proceed to Step 3 normally

   d. **Fallback behavior** (if .last_sync missing or invalid):
      - Treat as 999 days stale (force sync on next check)
      - Warn: "⚠️ Staleness unknown (.last_sync missing/invalid) - recommend sync"
      - Continue with roadmap generation (don't block on file read error)

3. **Automated Data Extraction** (10-15 min):

   **operations_log.txt** (TIME-BOUNDED - Last 24 Hours Only):
   - Parse ONLY yesterday's entries (YYYY-MM-DD 00:00:00 to 23:59:59)
   - Use grep for date filtering:
     ```bash
     grep "^\[2025-11-13" operations_log.txt
     ```
     (Replace date with yesterday's date dynamically)
   - Extract action types: CREATE, UPDATE, COMPLETE, GRADUATE, LAUNCH_WEEK, PUBLISH, ARCHIVE
   - Exclude: SYSTEM_UPGRADE, FILE_WRITE, SYNC, GITHUB_SYNC, PRODUCT_SYNC (system maintenance, not user work)
   - For each entry: Extract [project-name], [action], [details], [timestamp]
   - Inference: UPDATE without subsequent COMPLETE = unfinished work on [project-name]

   **Smart Event Detection** (NEW - Fail-Proof Sync System):
   - After parsing operations_log.txt, detect high-priority events that require index sync
   - Patterns: `CREATE -`, `GRADUATE -`, `COMPLETE -` entries (indicate project status/deliverable changes)
   - Filter: Exclude `SYNC - active-projects` entries (already synced)
   - If detected: Flag for sync recommendation (offer at end of roadmap generation)
   - Add to System Alerts section: "🔔 Smart Sync Detection: [X] high-priority events yesterday → Sync to capture?"

   **Active Projects Index** (ENHANCED - With Dependency Extraction):
   - Read all index files in `Project Memory/Active Projects Index/` using Glob
   - For each file found:
     a. Use Read tool to get full content
     b. Parse YAML frontmatter (status, dependencies, dependency_status, execution_context)
     c. Extract "Key Deliverables" section (in-progress work)
     d. Extract "Last Activity" section (most recent update)
     e. Calculate staleness: Read .last_sync for sync timestamp
   - Filter: Only extract projects with status = "incubating" | "active" (skip "paused" | "completed")
   - **Extract dependency data**:
     - `dependencies.blocks`, `dependencies.blocked_by`, `dependencies.related_parallel`
     - `dependency_status.is_blocked`, `dependency_status.blocking_count`, `dependency_status.ready_to_start`
     - `execution_context.estimated_hours`, `execution_context.priority_tier`, `execution_context.completion_percentage`
   - Calculate dependency readiness:
     - If `is_blocked: true` → BLOCKED category
     - If `is_blocked: false` AND `status: active` → READY category

   **File Modifications** (Yesterday Only):
   - Find files modified yesterday using find command
   - Exclude system files: *-index.md, *-template.md, CLAUDE.md, README.md, operations_log.txt
   - Group by project: Extract project folder name from path
   - For each file: Note path (for "where was I?" quick access in roadmap)

   **Productivity Assessment** (Yesterday's Assessment):
   - Read if exists: `Project Memory/Productivity Tracking/YYYY-MM-DD_daily-assessment.md`
   - Extract: "Tomorrow's Priorities" section
   - Extract: Patterns noted, recommendations made
   - Note: If missing, skip this source (not critical)

   **Strategic Planning** (Most Recent, Recency Check):
   - Read most recent file in `Project Memory/Strategic Planning/`
   - Check if <14 days old
   - Extract: Weekly priorities, monthly goals, current focus
   - Use: If current (<14 days), integrate into Tier 2; if stale, flag for update

   **Strategy File** (LEAN - Targeted Extraction with Validation & Fallback):
   - Location: `AI Growth Engine/Knowledge Base/Strategy.md` (or your strategy file name)

   - **Validation** (before extraction):
     1. **Check file exists** → If missing: Use fallback strategy, warn user
     2. **Check file size >100 bytes** → If suspiciously small: Use fallback strategy, warn user
     3. **Proceed to extraction** if validation passes

   - **Fallback Strategy** (if file missing/corrupt):
     ```
     Strategic Goal: "Grow business revenue (default - Strategy file unavailable)"
     Priorities: ["High-impact tasks", "Momentum tasks", "Daily disciplines"]
     Bottleneck: "Unknown (Strategy file unavailable - update AI Growth Engine KB)"
     Daily Disciplines: ["Outreach (30 min)", "Content creation (30 min)", "Admin (15-30 min)"]
     ```
     - **User Warning**: "⚠️ Strategy file missing/corrupt. Using fallback priorities. Update AI Growth Engine KB to restore full strategic context."
     - **Roadmap Impact**: System continues generating roadmap with generic priorities (functional, but less strategic)

   - **Extract key sections**: Strategic goal, current priorities, bottleneck, daily disciplines
   - **Parse Validation** (after extraction):
     1. **Strategic Goal field**: Must exist, length >10 chars → **ERROR**: "Strategy file missing goal section. Cannot generate roadmap. Fix Strategy file or use fallback."
     2. **Priorities**: Must have >0 items → **Warning**: "No priorities found. Using strategic goal for prioritization."
     3. **Bottleneck**: Must exist → **Warning**: "No bottleneck identified. Prioritization may be generic."

   - **Error Handling**:
     - **Critical errors** (missing strategic goal): STOP generation → Prompt user: "Strategy file corrupt. Options: (A) Fix file, (B) Use fallback strategy?"
     - **Warnings** (missing sections): CONTINUE with partial data → Show warnings in roadmap "System Alerts" section

   **FUTURE_TASKS.md** (NEW - Scheduled Work with Auto-Creation):
   - Location: `Project Memory/Daily Planning/FUTURE_TASKS.md`

   - **Auto-Creation** (if file missing):
     - Create file with template:
       ```markdown
       # Future Tasks Tracking

       ## This Week (Target: Week of YYYY-MM-DD)
       - [ ] **Task Name** - Priority: HIGH/MEDIUM/LOW - Est: X hours - Why: [reason]

       ## Next Week

       ## This Month

       ## Someday/Maybe
       ```
     - Log creation: "Created FUTURE_TASKS.md with template. Add scheduled work here."

   - **Extraction** (if file exists):
     - Extract: "THIS WEEK" section (tasks targeted for current week)
     - Extract: "NEXT WEEK" section (tasks approaching readiness, for awareness)
     - Use: Surface in Tier 2 (Strategic) or prompt "Ready to schedule [task]?"
     - If sections empty: Skip (no scheduled work this week)

   **PHASE_TRACKER.md Files** (NEW - Multi-Phase Projects):
   - Search: All Active Projects folders for PHASE_TRACKER.md
   - For each found: Read current phase status, check completion criteria
   - Calculate: Days since phase start, criteria met? (e.g., "4 weekly files submitted?")
   - If phase complete: Add to System Alerts "Phase [N] complete, ready for Phase [N+1]?"
   - If phase overdue: Add to System Alerts "Phase [N] overdue [X] days - should we transition?"

4. **Infer Unfinished Work** (ENHANCED - With Dependency Awareness):

   Apply all 4 inference methods:

   **Method 1: operations_log Analysis**
   - UPDATE without subsequent COMPLETE = unfinished work on [project-name]
   - Extract project context from entry details

   **Method 2: Active Projects Index**
   - Deliverables marked "in-progress" or "needs X"
   - Read `completion_percentage` from YAML (if available)

   **Method 3: File Modifications**
   - Files modified yesterday without completion log entry
   - Group by project for context

   **Method 4: Productivity Assessment**
   - Tasks marked partial completion (e.g., "80% complete")
   - Extract "Tomorrow's Priorities" (carries forward work)

   **For Each Inferred Unfinished Task**:
   1. Estimate % complete (from assessment OR index `completion_percentage` YAML OR default 50%)
   2. Estimate hours remaining (from `estimated_hours` YAML OR default 1-2 hours)
   3. **Check if blocked** (from `is_blocked` YAML):
      - If `is_blocked: true` → Move to BLOCKED section in roadmap
      - If `is_blocked: false` → Include in Tier 1 (Momentum)
   4. Check `blocking_count` (if >2, annotate "completes X tasks")

   **Conflict Resolution**:
   - If Productivity Assessment says "complete" BUT operations_log shows "UPDATE": Trust assessment (user explicitly confirmed)
   - If multiple sources show different completion %: Use highest % (most recent/accurate)

5. **Prioritization Logic** (DEPENDENCY-AWARE, 4 Tiers + Blocked Section):

   **Tier 1: Momentum Work (Unfinished from Yesterday)** - READY TO START
   - **Selection Criteria**:
     - Unfinished work from Step 4 analysis
     - **Filter by `is_blocked: false`** (only show if dependencies met)
     - Prioritize >50% complete (close to done)
     - Prioritize work that unblocks next steps
   - **Rank within Tier 1**:
     - Primary: Completion % (higher = closer to done)
     - Secondary: `blocking_count` (higher = unblocks more downstream work)
     - Tertiary: Strategic alignment (higher = more strategic)
   - **Annotations**:
     - If `blocking_count > 2`: Show "[BLOCKING: X tasks]" badge
     - If `estimated_hours` available: Show time estimate
     - Show file paths for quick access ("where was I?")

   **Tier 2: Strategic Work (High Strategic Alignment)** - READY TO START
   - **Selection Criteria**:
     - High strategic alignment (>80/100) from Strategic Planning + Strategy file
     - **Filter by `is_blocked: false`** (only show if dependencies met)
     - FUTURE_TASKS.md "THIS WEEK" section (scheduled work ready to start)
     - Addresses current bottleneck (from Strategy file)
   - **Rank within Tier 2**:
     - Primary: Bottleneck solver (Y/N) - if task addresses bottleneck, boost priority
     - Secondary: Strategic alignment score (90-100 = highest priority)
     - Tertiary: `priority_tier: "HIGH"` from YAML (if available)
     - Quaternary: Estimated hours (lower = faster win)
   - **Annotations**:
     - Show strategic alignment score (0-100)
     - If bottleneck solver: "[SOLVES BOTTLENECK]" badge
     - If from FUTURE_TASKS.md: "[SCHEDULED: This Week]" badge

   **Tier 3: Daily Disciplines (Fixed Routine)** - 90-120 minutes
   - **Fixed list** (from Strategy File - customize for your business):
     1. **Outreach** (30 min): Engage with prospects, DMs
     2. **Content creation** (30 min): Daily content production
     3. **Admin** (15-30 min): Email, planning, operations
   - **Why these matter**: Daily disciplines compound over time, maintain momentum
   - **Track completion**: Mark each discipline complete (builds streak, enables Productivity Assessment scoring)

   **Tier 4: Exploratory Work (Capacity Permitting)** - Only if <6 hours Tier 1-3
   - Incubating projects (low strategic alignment <60/100, or early R&D)
   - Creative exploration, learning, research
   - Nice-to-have improvements
   - Only include if Tier 1 + Tier 2 + Tier 3 < 6 hours (capacity check)

   **BLOCKED WORK (Separate Section Below Tiers)** - Context for Future
   - **Selection Criteria**:
     - Tasks with `is_blocked: true` (dependencies incomplete)
     - From Tier 1 (unfinished work) OR Tier 2 (strategic work)
   - **Display Format**:
     ```
     **Project Name** (Tier 1 Momentum / Tier 2 Strategic)
     - Blocked by: [project-name] (XX% complete, est. X hours remaining)
     - Will unblock after: [blocker] finalized
     - Next actions ready: [List what you'll do when unblocked]
     - Completion so far: XX%
     ```
   - **Purpose**: Visibility (know what's coming, prepare mentally) without cluttering READY TO START sections

   **Capacity Check** (All Tiers):
   - Estimate total hours: Tier 1 + Tier 2 + Tier 3 + Tier 4
   - If >6-8 hours: Flag for deferral
   - Move lowest-priority Tier 2 tasks to tomorrow OR defer to next week
   - Ensure daily roadmap is ACTIONABLE (not aspirational)

6. **Generate Roadmap**:
   - Use roadmap template structure
   - Include: File paths, next actions, time estimates, strategic alignment scores, context from yesterday
   - Format: 150-200 lines, scannable in 5-10 min
   - Save to: `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`

7. **Apply Brutal Prioritization (Systematic Offer)**:
   - After roadmap generated, offer: "Daily roadmap created. Should I apply brutal prioritization to identify THE ONE THING?"
   - **If YES**:
     - Invoke ruthless-prioritizer subagent via Task tool
     - Subagent reads AI Growth Engine KB + Strategy file + Strategic Planning
     - Subagent validates source alignment (flags conflicts if detected)
     - Subagent applies brutal prioritization to roadmap tasks
     - Subagent identifies THE ONE THING + P1/P2/P3 rankings + KILL list
     - APPEND brutal priorities section to same roadmap file
     - Report: "Brutal prioritization complete. THE ONE THING: [task name]"
   - **If NO**: Skip, roadmap stands as-is with 4-tier structure

8. **Log & Report**:
   - Log in operations_log.txt: `[YYYY-MM-DD HH:MM:SS] - DAILY_ROADMAP - generated - X momentum tasks, X strategic tasks, X daily disciplines, capacity: X hours`
   - If brutal prioritization applied, also log: `[YYYY-MM-DD HH:MM:SS] - BRUTAL_PRIORITIZATION - applied - THE ONE THING: [task], P1: X tasks, KILL: X tasks`
   - **If Smart Event Detection flagged** (NEW - Fail-Proof Sync System): Offer sync after reporting roadmap:
     ```
     "I detected [X] high-priority events yesterday (CREATE/GRADUATE/COMPLETE). These likely changed project status/deliverables. Should I sync indices to capture these changes? (10-15 min)"
     ```
   - Report concise summary with file link

**Roadmap Structure**:
- **Tier 1 (Momentum)**: Unfinished work from yesterday
- **Tier 2 (Strategic)**: High strategic alignment tasks
- **Tier 3 (Daily Disciplines)**: Fixed routines
- **Tier 4 (Exploratory)**: Incubating projects

**Key Features**:
- Zero manual logging (all data extracted automatically)
- Execution-ready (file paths, next actions, context)
- Smart prioritization (completion momentum vs. strategic impact)
- Strategic alignment (every task shows alignment score)
- System alerts (flags stale planning, indices, phase transitions)

---

### Multi-Phase Project Tracking

**Purpose**: Prevent "Phase 1 Complete, Forget Phase 2/3" problem across ALL multi-phase projects

**Core Concept**: Multi-phase projects often get stuck at Phase 1. User completes initial phase, system works, then forgets to validate/institutionalize. Phase Tracker ensures completion across ALL phases.

**Implementation**:
1. **Create `PHASE_TRACKER.md`** at project start in project folder
2. **Document all phases**: Goals, duration, completion criteria, target dates
3. **Proactive reminders**: Claude checks tracker weekly, prompts phase transitions
4. **Manual check available**: User says "Check phase tracker" anytime

**Phase Tracker File Structure**:

**Location**: `[Project Folder]/PHASE_TRACKER.md`

**Example Structure**:
```markdown
# Multi-Phase Project Tracker: [Project Name]

**Project**: [Name]
**Status**: Phase 1 ([Phase Name])
**Created**: YYYY-MM-DD
**Last Checked**: YYYY-MM-DD

## Phase Timeline

### Phase 1: [Name] (Target: [Date Range])
**Status**: ✅ IN PROGRESS (started [Date])
**Goal**: [What this phase accomplishes]
**Duration**: [X weeks]
**Completion Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**Deliverables**:
- [x] Deliverable 1 (completed)
- [ ] Deliverable 2 (pending)

**Next Phase Trigger**: [Date or criteria]

### Phase 2: [Name] (Target: [Date Range])
**Status**: ⏳ PENDING (starts after Phase 1)
[Same structure as Phase 1]

### Phase 3: [Name] (Target: [Date Range])
**Status**: ⏳ PENDING (starts after Phase 2)
[Same structure as Phase 1]

## Proactive Reminder Logic
[How Claude checks and prompts phase transitions]

## Success Criteria
[What defines project completion]
```

**How Claude Uses Phase Tracker**:

**Weekly Check** (During Strategic Planning OR Friday Roadmap):
1. Read project's `PHASE_TRACKER.md` → Check current phase status
2. Calculate days since phase start (today - phase start date)
3. Check completion criteria (e.g., "4 weekly files submitted?")
4. If criteria met OR deadline passed → Prompt phase transition

**Example Prompts**:
- Week 4: "Phase 1 test period complete (4 weeks). Ready to start Phase 2 validation?"
- After Phase 2: "Phase 2 complete. Ready to institutionalize (Phase 3)?"

**Manual Check** (Anytime):
- User: "Check phase tracker [project-name]" → Claude reads tracker, reports status, prompts next phase if ready

**Integration with project-creator Skill**:

**project-creator skill** analyzes project descriptions for multi-phase indicators:
- Keywords: "validate", "test", "feedback", "iterate", "production rollout", "pilot"
- Complex deliverables (3+ major components requiring testing)
- Integration with existing systems (needs testing phase)
- User mentions "experiment", "trial", or "phase"
- Project type: infrastructure, framework, new system (vs simple content creation)

**If detected**, skill SUGGESTS phased approach:
```
"Based on your project description, I recommend a multi-phase approach:

Phase 1: [Research & Planning / Setup & Test / MVP]
Phase 2: [Build & Test / Validation & Refinement / Production Rollout]
Phase 3: [Deploy & Scale / Institutionalize / Maintenance]

This allows testing and feedback before full rollout. Would you like to use this phased approach?"
```

**User Options**:
- "Yes, use phases" → Skill generates PHASE_TRACKER.md with suggested 3-phase structure
- "No, single phase" → Skill adds "single-phase" text to CLAUDE.md, skips Phase Tracker
- "Let me customize phases" → Skill asks for phase names/durations

**When to Create Phase Tracker**:
- Any project with 2+ phases (test → validate, test → production, MVP → enhancement)
- Projects requiring validation before institutionalization
- Projects with planned feature roadmaps (Phase 1 MVP, Phase 2 advanced features)

**Pattern**: Always create Phase Tracker at project START (not after Phase 1 complete)

---

### Apply Brutal Prioritization Framework

**CURRENT IMPLEMENTATION** (as of 2025-11-02):
**Status**: Production-ready
**Subagent**: `ruthless-prioritizer` (if available in `.claude/agents/`)

**Purpose**: Ruthlessly identify THE ONE THING that will have the most strategic impact, eliminate low-value work, and focus energy on the 1-3 tasks that truly matter.

**Core Philosophy**: Most tasks are distractions. Only 1-3 tasks per day advance strategic goals meaningfully. Brutal prioritization finds them and kills everything else.

**How It Works**:

1. **Natural Language Triggers**:
   - "Apply brutal prioritization"
   - "Ruthless prioritize my tasks"
   - "Identify THE ONE THING for today"
   - "What should I kill from my task list?"
   - **Automatic**: Offered systematically after Daily Roadmap generation

2. **Source of Truth Protocol**:
   - **Primary**: AI Growth Engine Knowledge Base (strategic goal, unique strengths, avatars, positioning)
   - **Secondary**: Strategy.md (current execution priorities, bottleneck)
   - **Tertiary**: Latest Strategic Planning file (weekly priorities)
   - **Alignment Validation**: Flags misalignments between sources, requests guidance before proceeding

3. **Four Evaluation Dimensions**:
   - **Strategic Alignment (0-100)**: How well does task advance strategic goal?
   - **Urgency (0-100)**: Time sensitivity, deadlines, blockers
   - **Impact (0-100)**: Potential positive outcome if successful (revenue, growth, bottleneck elimination)
   - **Effort/Value Ratio**: High-value, low-effort wins prioritized

4. **Priority Assignment**:
   - **P1 (Must Do Today)**: 3-5 tasks max, 60-80% of daily effort, scores 75-100
   - **P2 (Should Do This Week)**: 5-8 tasks, can defer if P1 demands capacity, scores 50-74
   - **P3 (Nice to Have)**: 2-4 tasks, defer without guilt, scores 30-49
   - **KILL List**: Tasks with <40% strategic alignment, zero bottleneck impact, or busywork (scores 0-29)

5. **THE ONE THING Identification**:
   - Highest-scoring P1 task (ideally 85+ strategic alignment)
   - Addresses current business bottleneck (if possible)
   - High impact (70+) and can be completed today
   - Gets morning deep work, everything else is secondary

6. **Output**:
   - **Appended to Daily Roadmap** (if post-processing roadmap)
   - OR **Standalone output** (if triggered manually)
   - Includes: THE ONE THING (detailed), P1/P2/P3 tasks (ranked with scores), KILL list (recommendations)
   - You review and decide final priorities (KILL list not auto-executed)

**Integration with Daily Roadmap**:

After Daily Roadmap generated, Claude automatically offers:

> "Daily roadmap created. Should I apply brutal prioritization to identify THE ONE THING?"

- **If YES**: Invoke ruthless-prioritizer subagent (if available), append brutal priorities section to roadmap file
- **If NO**: Skip, roadmap stands as-is with 4-tier structure

**Integration with Productivity Assessment**:
- Productivity Assessment can reference brutal priorities when scoring strategic alignment
- "Did you complete THE ONE THING today?" becomes key success metric

**Integration with Strategic Planning**:
- Weekly Strategic Planning can use brutal prioritization to validate weekly priorities against strategic goals
- "Are your P1 tasks actually aligned with strategic goals?"

**Standalone Usage** (Anytime):

Trigger manually:

```
"Apply brutal prioritization to my task list:
- Task 1: [description]
- Task 2: [description]
- Task 3: [description]
...
```

Claude invokes ruthless-prioritizer (if available), returns THE ONE THING + priorities + KILL list.

**Key Behaviors**:
- **Ruthless, Not Rude**: Direct and honest about task value, but respectful
- **Default to Elimination**: When in doubt, recommend KILL or defer (protect your time)
- **Justify Every Score**: Every alignment/urgency/impact score includes brief reasoning
- **Highlight Bottleneck Work**: Tasks addressing current bottleneck get bonus points and visibility
- **Flag Strategic Drift**: If 3+ consecutive P1 tasks have <70% strategic alignment, warn about drift

**When to Use**:
- **After Daily Roadmap** (systematic, every day) - Identify THE ONE THING for today
- **When Task List Feels Overwhelming** (manual trigger) - Declutter and focus
- **When Strategic Alignment Unclear** (manual trigger) - Validate tasks against strategic goal
- **During Weekly Strategic Planning** (validate priorities) - Ensure P1 tasks are truly strategic

---

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
9. **Conditional Index Sync Offer** (NEW - Fail-Proof Sync System):

   **After saving assessment**, check if indices should be synced:

   a. **Read .last_sync**:
      ```
      Read: Project Memory/Active Projects Index/.last_sync
      Expected content format: YYYY-MM-DD HH:MM:SS
      ```

   b. **Calculate days stale** (same logic as Daily Roadmap Step 2):
      - Parse timestamp
      - Compare to current date
      - Calculate difference in days
      - Use bash if needed (same command as Daily Roadmap)

   c. **Conditions** (both must be true):
      1. Indices >7 days stale
      2. operations_log.txt has high-priority entries for today (CREATE, UPDATE, COMPLETE, GRADUATE)

   d. **Conditional Offer** (if both conditions true):
      ```
      "Productivity assessment complete (Score: [X]/10, Strategic Alignment: [XX]/100).

      I noticed project indices haven't been synced in [days_stale] days, and you completed significant work today:
      - [work_summary from operations_log]

      Should I sync indices to capture today's progress? (10-15 min)

      This will ensure tomorrow's roadmap reflects today's deliverables."
      ```

   e. **If YES**: Run "sync all project indices" → Update .last_sync → Log sync to operations_log.txt

   f. **If NO**: Skip, user will sync later (no pressure - this is optional offer, not blocking)

**Assessment Components**:
- Work completed (deliverables, time, strategic alignment)
- Work skipped (daily disciplines, deductions)
- Strategic alignment analysis
- Productivity score breakdown (0-10 scale)
- Tomorrow's priorities (ranked)
- Pattern notes

---

### Weekly: Strategic Planning

**Purpose**: Weekly strategic review to prevent priority drift and consolidate decisions.

**Location**: `Project Memory/Strategic Planning/`

**Trigger**: "Update strategic planning" OR "Weekly strategic review"

**Process**:

1. **VALIDATE INDEX CURRENCY** (NEW - Fail-Proof Sync System):

   **BEFORE reading last 7 days' data**, check Active Projects Index staleness:

   a. **Read .last_sync** (same as Daily Roadmap/Productivity Assessment):
      ```
      Read: Project Memory/Active Projects Index/.last_sync
      Expected content format: YYYY-MM-DD HH:MM:SS
      ```

   b. **Calculate days since last sync**:
      - Parse timestamp
      - Compare to current date
      - Calculate difference in days
      - Use bash if needed:
        ```bash
        last=$(cat "Project Memory/Active Projects Index/.last_sync" 2>/dev/null | tr -d '[:space:]'); if [ -n "$last" ]; then last_epoch=$(date -j -f "%Y-%m-%d %H:%M:%S" "$last" +%s 2>/dev/null || echo 0); now=$(date +%s); echo $(( (now - last_epoch) / 86400 )); else echo 999; fi
        ```

   c. **If >7 days stale**: STOP and prompt (BLOCKING)
      ```
      ⚠️ SYNC REQUIRED BEFORE STRATEGIC PLANNING

      Project indices last synced: [date] ([X] days ago)

      Strategic planning relies on current index data for:
      - Advancing projects detection (which projects made progress?)
      - Stalled projects identification (which projects stuck >2 weeks?)
      - Weekly priorities validation (are priorities still relevant?)

      Using stale data will produce inaccurate analysis.

      Options:
      A) Sync indices first (recommended) - 10-15 min, then continue strategic planning
      B) Skip sync, use stale data (not recommended - analysis may be wrong)

      What should I do?
      ```
      - **If User chooses A**: Run "sync all project indices" → Update .last_sync → Continue to Step 2
      - **If User chooses B**: Proceed to Step 2 with DATA QUALITY WARNING added to strategic planning output frontmatter

   d. **If <7 days stale**: Proceed to Step 2 normally

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
