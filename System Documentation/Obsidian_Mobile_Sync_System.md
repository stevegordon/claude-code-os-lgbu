# Obsidian Mobile Sync System - Technical Documentation

**Created**: 2025-11-24
**Status**: Production (Fully Operational)
**Purpose**: Enable mobile productivity via Obsidian iOS app with deterministic sync to Claude Code OS

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Why This Design](#why-this-design)
4. [File Locations](#file-locations)
5. [Sync Scripts](#sync-scripts)
6. [Slash Commands](#slash-commands)
7. [Natural Language Triggers](#natural-language-triggers)
8. [Workflows](#workflows)
9. [Troubleshooting](#troubleshooting)
10. [Implementation Timeline](#implementation-timeline)

---

## System Overview

**Problem Solved**: You need to access and edit business operations files (daily roadmaps, productivity assessments, mobile captures) on iPhone while away from laptop, with reliable sync back to Claude Code OS.

**Solution**: Real folder sync between Project Memory (source of truth for Claude Code) and Obsidian mobile folder (iOS-accessible location) using deterministic push/pull scripts.

**Key Features**:
- ✅ Mobile access to all Project Memory files via Obsidian iOS app
- ✅ Voice capture on iPhone syncs to Claude Code for processing
- ✅ Deterministic sync (you control direction: push before iPhone, pull after iPhone)
- ✅ No data loss (conflict-free by design)
- ✅ Natural language commands ("push to mobile", "pull from mobile")

---

## Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────┐
│                     Claude Code OS (Mac)                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Project Memory/ (Source of Truth)                       │   │
│  │ - Daily Planning/                                       │   │
│  │ - Active Projects Index/                                │   │
│  │ - Productivity Tracking/                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            ▲                                    │
│                            │                                    │
│                    push-to-mobile.sh                            │
│                    pull-from-mobile.sh                          │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ iCloud Drive/Obsidian/Documents/Claude-Code-OS/         │   │
│  │ (Mobile Copy - iOS Accessible)                          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                       iCloud Sync
                      (1-2 min delay)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       iPhone (Obsidian iOS)                      │
│                                                                 │
│  Obsidian Vault: Claude-Code-OS                                │
│  - Daily Planning/MOBILE_CAPTURE_INBOX.md                      │
│  - Daily Planning/[today]_daily-roadmap.md                     │
│  - Active Projects Index/                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

**Before iPhone Work**:
1. User: "push to mobile"
2. Claude runs `push-to-mobile.sh`
3. rsync: `Project Memory/` → `Obsidian/Documents/Claude-Code-OS/` (overwrites)
4. iCloud syncs to iPhone (1-2 min)
5. Obsidian iOS reads latest files

**After iPhone Work**:
1. User edits files on iPhone (Obsidian mobile)
2. iCloud syncs to Mac (1-2 min)
3. User: "pull from mobile"
4. Claude runs `pull-from-mobile.sh`
5. rsync: `Obsidian/Documents/Claude-Code-OS/` → `Project Memory/` (overwrites)
6. Claude Code can now see iPhone changes

---

## Why This Design

### Problem 1: iOS Sandboxing Prevents Symlinks

**Initial Attempt**: Create symlink from Obsidian folder → Project Memory folder

**Result**: ❌ Failed
- Symlink created successfully on Mac
- iOS Obsidian app could see the symlink as a folder
- iOS **could not read through the symlink** (sandboxing restriction)

**Lesson**: iOS apps can only access files within their designated iCloud folder. Symlinks are treated as broken links.

### Problem 2: Bidirectional Sync is Ambiguous

**Initial Attempt**: Single `sync-obsidian-mobile.sh` script using rsync `--update` flag (sync both directions based on timestamps)

**Problems**:
- ❌ Timestamps preserved by iCloud → rsync thinks files are identical when they're not
- ❌ If you edit Mac files after push, pull overwrites them (data loss)
- ❌ If you edit same file on Mac AND iPhone, last sync wins (conflict not detected)

**Lesson**: Bidirectional sync with timestamp comparison is unreliable with iCloud.

### Solution: Deterministic Two-Command Approach

**Design Principles**:
1. **Explicit direction control**: User chooses push (Mac → iPhone) or pull (iPhone → Mac)
2. **Force overwrite**: Use rsync `--delete` flag (no ambiguous merging)
3. **Clear mental model**: "I'm about to use iPhone" = push, "I'm done with iPhone" = pull
4. **Conflict prevention**: Never edit same file on both devices between syncs

**Trade-offs**:
- ✅ **Pro**: Simple, predictable, no data loss
- ✅ **Pro**: User controls sync direction (explicit intent)
- ⚠️ **Con**: Requires discipline (remember to push before iPhone, pull after iPhone)
- ⚠️ **Con**: Can't work on Mac and iPhone simultaneously on same files

---

## File Locations

### Mac Locations

**Source of Truth** (Claude Code works here):
```
/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/Project Memory/
```

**Mobile Copy** (Obsidian iOS reads here):
```
/Users/stevegordon/Library/Mobile Documents/iCloud~md~obsidian/Documents/Claude-Code-OS/
```

**Scripts**:
```
/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/scripts/
├── push-to-mobile.sh      # Push Mac → iPhone
├── pull-from-mobile.sh    # Pull iPhone → Mac
└── sync-obsidian-mobile.sh # (Legacy bidirectional script - not recommended)
```

**Slash Commands**:
```
/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/.claude/commands/
├── push-mobile.md         # /push-mobile command
└── pull-mobile.md         # /pull-mobile command
```

### iPhone Locations

**Obsidian Vault Path** (in Files app):
```
iCloud Drive → Obsidian → Claude-Code-OS/
```

**Key Files Accessed on iPhone**:
- `Daily Planning/MOBILE_CAPTURE_INBOX.md` (voice captures, quick tasks)
- `Daily Planning/[today]_daily-roadmap.md` (today's execution plan)
- `Daily Planning/FUTURE_TASKS.md` (scheduled tasks)
- `Active Projects Index/` (project context)

---

## Sync Scripts

### push-to-mobile.sh

**Purpose**: Push latest Mac changes to iPhone (run BEFORE using iPhone)

**Location**: `scripts/push-to-mobile.sh`

**Command**:
```bash
bash scripts/push-to-mobile.sh
```

**What it does**:
```bash
rsync -av --delete "$SOURCE_DIR/" "$OBSIDIAN_DIR/"
```
- `-a`: Archive mode (preserves permissions, timestamps)
- `-v`: Verbose output
- `--delete`: Remove files in destination that don't exist in source (force mirror)

**Output**:
```
📤 Pushing to Mobile...
Direction: Mac (Project Memory) → Obsidian Mobile

[rsync transfer details]

✅ Push complete!

Next steps:
  1. Wait 1-2 minutes for iCloud sync
  2. Open Obsidian on iPhone
  3. Your latest Mac changes will be available

When done on iPhone, run: bash scripts/pull-from-mobile.sh
```

**Use Cases**:
- Before traveling with iPhone
- Before working remotely (want latest roadmaps on iPhone)
- After generating daily roadmap (want to access on iPhone)

---

### pull-from-mobile.sh

**Purpose**: Pull latest iPhone changes back to Mac (run AFTER using iPhone)

**Location**: `scripts/pull-from-mobile.sh`

**Command**:
```bash
bash scripts/pull-from-mobile.sh
```

**What it does**:
```bash
# Wait for iCloud sync to complete
sleep 5

# Force sync from Obsidian folder to Project Memory
rsync -av --delete "$OBSIDIAN_DIR/" "$SOURCE_DIR/"
```

**Output**:
```
📥 Pulling from Mobile...
Direction: Obsidian Mobile → Mac (Project Memory)

Waiting 5 seconds for iCloud sync to complete...

[rsync transfer details]

✅ Pull complete!

Your iPhone changes are now in Project Memory.
Claude Code can now see and process mobile captures.
```

**Use Cases**:
- After adding voice captures on iPhone
- After checking tasks on iPhone
- After editing files in Obsidian mobile
- Before generating daily roadmap (to include mobile captures)

---

## Slash Commands

### /push-mobile

**File**: `.claude/commands/push-mobile.md`

**Usage**: Type `/push-mobile` in Claude Code

**What it does**:
- Executes `bash scripts/push-to-mobile.sh`
- Reports sync status to user
- Reminds user to wait for iCloud sync

**Example**:
```
User: /push-mobile

Claude:
📤 Pushing to Mobile...
[runs script]
✅ Push complete!

Wait 1-2 minutes for iCloud sync, then open Obsidian on iPhone.
Your latest changes will be available.
```

---

### /pull-mobile

**File**: `.claude/commands/pull-mobile.md`

**Usage**: Type `/pull-mobile` in Claude Code

**What it does**:
- Executes `bash scripts/pull-from-mobile.sh`
- Reports sync status to user
- Confirms Claude Code can now see iPhone changes

**Example**:
```
User: /pull-mobile

Claude:
📥 Pulling from Mobile...
[runs script]
✅ Pull complete!

Your iPhone changes are now in Project Memory.
I can now process mobile captures in daily roadmap.
```

---

## Natural Language Triggers

Claude Code automatically recognizes these phrases and executes the appropriate sync command:

### Push Triggers (runs push-to-mobile.sh)

- "push to mobile"
- "sync to mobile"
- "sync to iphone"
- "I'm about to use my iphone"
- "going mobile"
- "push latest changes to obsidian mobile"

**Example**:
```
User: "I'm about to use my iPhone"

Claude: [Automatically recognizes trigger]
📤 Pushing to Mobile...
[executes push-to-mobile.sh]
```

---

### Pull Triggers (runs pull-from-mobile.sh)

- "pull from mobile"
- "sync from mobile"
- "sync from iphone"
- "I just used my iphone"
- "done with mobile"
- "get my iphone changes"
- "pull mobile edits"

**Example**:
```
User: "I just used my iPhone"

Claude: [Automatically recognizes trigger]
📥 Pulling from Mobile...
[executes pull-from-mobile.sh]
```

---

### Proactive Sync Offers

Claude Code will **automatically offer** to pull from mobile when:
- User requests "generate daily roadmap" AND mobile sync hasn't run in 6+ hours
- User requests "assess my productivity" AND mobile sync hasn't run in 6+ hours
- User mentions iPhone/mobile/Obsidian mobile in any context

**Example**:
```
User: "Generate daily roadmap"

Claude: "Before generating your daily roadmap, should I pull latest changes from Obsidian mobile?
This ensures I capture any mobile edits or captures from your iPhone. (5 seconds)"

User: "Yes"

Claude: [Executes pull-from-mobile.sh, then generates roadmap]
```

---

## Workflows

### Workflow 1: Voice Capture on iPhone → Process in Daily Roadmap

**Steps**:

1. **Capture on iPhone** (anytime during day):
   - Open Obsidian mobile → `Daily Planning/MOBILE_CAPTURE_INBOX.md`
   - Add voice transcription or quick capture
   - Obsidian auto-saves

2. **Pull changes to Mac** (before roadmap generation):
   - Say: "pull from mobile"
   - Claude executes pull-from-mobile.sh
   - Voice captures now visible in Project Memory

3. **Generate daily roadmap** (morning or evening):
   - Say: "generate daily roadmap"
   - Claude reads MOBILE_CAPTURE_INBOX.md
   - Claude prompts for strategic context on each capture
   - Claude adds tasks to roadmap or FUTURE_TASKS.md
   - Claude moves processed items to Archive section

4. **Push roadmap to iPhone** (optional, if you want to see roadmap on iPhone):
   - Say: "push to mobile"
   - iPhone will have latest roadmap after iCloud sync

---

### Workflow 2: Check Daily Roadmap on iPhone

**Steps**:

1. **Generate roadmap on Mac**:
   - Say: "generate daily roadmap"
   - Claude creates `Project Memory/Daily Planning/[today]_daily-roadmap.md`

2. **Push to iPhone**:
   - Say: "push to mobile"
   - Wait 1-2 min for iCloud sync

3. **Access on iPhone**:
   - Open Obsidian mobile
   - Navigate to Daily Planning → [today]_daily-roadmap.md
   - Check tasks, mark complete with `- [x]`

4. **Pull completions back to Mac** (end of day):
   - Say: "pull from mobile"
   - Say: "assess my productivity today"
   - Claude detects checked tasks from iPhone

---

### Workflow 3: Review Active Projects on iPhone (During Travel)

**Steps**:

1. **Before travel** (on Mac):
   - Ensure Active Projects Index is synced: "sync all project indices"
   - Push to mobile: "push to mobile"

2. **During flight/travel** (on iPhone):
   - Open Obsidian mobile
   - Navigate to Active Projects Index/
   - Review project status, deliverables, priorities
   - Add strategic notes to Daily Planning/MOBILE_CAPTURE_INBOX.md

3. **After travel** (back on Mac):
   - Pull changes: "pull from mobile"
   - Process mobile notes during weekly strategic planning

---

## Troubleshooting

### Problem: "I pushed to mobile but iPhone doesn't show new files"

**Cause**: iCloud sync delay (can take 1-5 minutes)

**Solutions**:
1. Wait 2-3 minutes after push before opening Obsidian mobile
2. Force iCloud sync:
   - Open Files app on iPhone
   - Navigate to iCloud Drive → Obsidian → Claude-Code-OS
   - Pull down to refresh
3. Check iCloud storage: Settings → Apple ID → iCloud (low storage = slow sync)

---

### Problem: "I pulled from mobile but Mac doesn't show iPhone changes"

**Cause**: iCloud hadn't synced Mac copy before pull ran

**Solutions**:
1. Wait 2-3 minutes after saving on iPhone before pulling
2. Close Obsidian mobile app (ensures iCloud upload completes)
3. Re-run pull: `bash scripts/pull-from-mobile.sh` (script includes 5-second delay)
4. Force iCloud sync on Mac:
   - Open Finder → iCloud Drive → Obsidian folder
   - Right-click Claude-Code-OS folder → "Download Now"

---

### Problem: "I edited files on Mac after push, then pulled - my Mac edits are gone!"

**Cause**: Pull overwrites Mac files with mobile copy (by design, using `--delete` flag)

**Prevention**:
- **Workflow discipline**: Push → Work on iPhone ONLY → Pull
- **Never edit Mac files after push until you pull**

**Recovery**:
- If you have git commits: `git log` → find commit before pull → `git checkout [commit-hash] -- [file-path]`
- If no git backup: Edits are lost (this is why `--delete` requires discipline)

**Best Practice**: Commit Mac changes to git before push:
```bash
git add .
git commit -m "UPDATE: Daily work before mobile sync"
# Now safe to push to mobile
```

---

### Problem: "Push/pull commands don't work - 'no such file or directory' error"

**Cause**: Script paths broken after folder move or incorrect working directory

**Solutions**:
1. Check current working directory: `pwd` (should be claude-code-os-lgbu root)
2. Verify script exists: `ls -la scripts/push-to-mobile.sh`
3. Run with absolute path:
   ```bash
   bash "/Users/stevegordon/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/scripts/push-to-mobile.sh"
   ```
4. Re-create scripts if missing (see Implementation section)

---

### Problem: "Obsidian mobile shows 'conflicted copy' files"

**Cause**: File edited on Mac AND iPhone simultaneously, iCloud created conflict file

**What happened**:
- You edited `file.md` on iPhone
- You edited `file.md` on Mac (before pull)
- iCloud detected conflict, created `file (conflicted copy).md`

**Resolution**:
1. Open both files (original and conflicted copy) in text editor
2. Manually merge changes (choose which edits to keep)
3. Delete conflicted copy file after merging
4. Push or pull to sync resolved version

**Prevention**:
- Always push before iPhone work
- Always pull after iPhone work
- Never work on Mac and iPhone simultaneously on same files

---

### Problem: "Natural language triggers don't work - Claude doesn't recognize 'push to mobile'"

**Cause**: CLAUDE.md not loaded or natural language section missing

**Solutions**:
1. Verify CLAUDE.md has Obsidian Mobile Sync System section:
   ```bash
   grep -n "OBSIDIAN MOBILE SYNC SYSTEM" CLAUDE.md
   ```
   (Should return line number ~311)

2. Restart Claude Code session (reload CLAUDE.md)

3. Manually run slash command as fallback:
   - `/push-mobile` or `/pull-mobile`

4. Manually run script as fallback:
   ```bash
   bash scripts/push-to-mobile.sh
   bash scripts/pull-from-mobile.sh
   ```

---

## Implementation Timeline

### 2025-11-24 - Initial Setup

**Phase 1: Folder Move to iCloud Drive** (Completed)
- Moved claude-code-os-lgbu from `~/Documents/mdaos/` to iCloud Drive
- New location: `~/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/`
- Created backup before move

**Phase 2: Obsidian Setup** (Completed)
- Installed Obsidian on Mac
- Opened `Project Memory/` as vault on Mac
- Installed Obsidian on iPhone
- Attempted to open vault via iCloud Drive

**Phase 3: Symlink Attempt** (Failed)
- Created symlink: Obsidian folder → Project Memory
- Symlink worked on Mac
- iOS Obsidian could not read through symlink (sandboxing)
- **Lesson**: iOS apps require real folders, not symlinks

**Phase 4: Real Folder + Bidirectional Sync** (Partially Successful)
- Created real folder in Obsidian location
- Initial sync: Copied Project Memory → Obsidian folder
- Created `sync-obsidian-mobile.sh` (bidirectional with `--update` flag)
- **Problem**: Timestamps preserved by iCloud → unreliable sync direction detection

**Phase 5: Deterministic Two-Command Approach** (Production)
- Created `push-to-mobile.sh` (Mac → iPhone, force overwrite)
- Created `pull-from-mobile.sh` (iPhone → Mac, force overwrite)
- Created `/push-mobile` and `/pull-mobile` slash commands
- Updated CLAUDE.md with natural language triggers
- Tested end-to-end: Voice capture on iPhone → Pull → Process captures → Push
- **Status**: Fully operational

---

## Future Enhancements

### Potential Improvements (Not Implemented Yet)

1. **Automatic Sync on Daily Roadmap Generation**:
   - Auto-pull before generating roadmap (capture mobile edits)
   - Auto-push after generating roadmap (iPhone has latest plan)
   - **Trade-off**: Less explicit control, may surprise user

2. **Conflict Detection**:
   - Track last sync direction in `.last_sync_direction` file
   - Warn if Mac files modified since last push before running pull
   - **Implementation**: Add timestamp file, compare mtimes before rsync

3. **Sync Status Indicator**:
   - Show "Last synced: 2 hours ago" in daily roadmap header
   - Alert if >6 hours since last sync
   - **Implementation**: Read `.last_sync` timestamp, display in roadmap

4. **iOS Shortcut Integration**:
   - Create iOS Shortcut: Voice capture → Auto-append to MOBILE_CAPTURE_INBOX.md
   - Siri command: "Hey Siri, capture thought"
   - **Status**: Not implemented (user can add manually in Obsidian mobile)

5. **Git Auto-Commit Before Sync**:
   - Auto-commit Mac changes before push (safety net)
   - Recovery from accidental data loss via git history
   - **Implementation**: Add `git add . && git commit` to push-to-mobile.sh

---

## Key Learnings

### What Worked

1. ✅ **Deterministic sync** (explicit push/pull) prevents conflicts
2. ✅ **Real folder** (not symlink) works with iOS sandboxing
3. ✅ **Natural language triggers** make sync frictionless for user
4. ✅ **MOBILE_CAPTURE_INBOX.md** provides clear capture workflow
5. ✅ **rsync with --delete** ensures clean mirror (no stale files)

### What Didn't Work

1. ❌ **Symlinks** - iOS apps can't read through symlinks (sandboxing)
2. ❌ **Bidirectional sync with --update** - iCloud timestamp preservation breaks logic
3. ❌ **Trust iCloud timestamps** - Not reliable for conflict detection

### Best Practices Established

1. **Workflow discipline required**: Push before iPhone, pull after iPhone (no simultaneous editing)
2. **Git safety net**: Commit Mac changes before push (enables recovery)
3. **iCloud sync delay awareness**: Always wait 1-2 min after sync command before expecting changes on other device
4. **Clear mobile capture location**: All captures go to MOBILE_CAPTURE_INBOX.md (processed during roadmap generation)

---

## References

**Related Documentation**:
- `OBSIDIAN_MOBILE_SETUP_GUIDE.md` - Step-by-step setup instructions
- `CLAUDE.md` - Natural language triggers and mobile sync integration
- `System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md` - Related system mechanics

**Scripts**:
- `scripts/push-to-mobile.sh`
- `scripts/pull-from-mobile.sh`
- `scripts/sync-obsidian-mobile.sh` (legacy)

**Slash Commands**:
- `.claude/commands/push-mobile.md`
- `.claude/commands/pull-mobile.md`

---

**End of Documentation**
