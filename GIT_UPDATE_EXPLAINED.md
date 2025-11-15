# Git Update Process Explained - For Non-Git Users

**Question**: "I don't understand what operation the customer has to do to get the update from GitHub"

**Answer**: Here's exactly what happens, step by step.

---

## The Setup (One-Time, Already Done)

**When customer first got your product**:
```bash
git clone https://github.com/YourUsername/claude-code-os-lgbu.git
```

**What this did**:
- Downloaded ALL files from your GitHub repo to their computer
- Created a connection called "origin" pointing to your GitHub repo
- Set up a local branch called "main" that tracks your "origin/main"

**Current state**:
```
Customer's Computer              GitHub (Your Repo)
├── Local Files                  ├── Your Latest Files
│   ├── CLAUDE.md (their version)│   ├── CLAUDE.md (your version)
│   ├── scripts/                 │   ├── scripts/ (your updated scripts)
│   └── ...                      │   └── ...
│
└── Local Git History            └── Remote Git History
    (their commits)                  (your commits)
```

**The problem**: These two have DIVERGED (both have new commits the other doesn't have)

---

## Step-by-Step: What Customer Does

### Step 1: Fetch (Download Your Changes)

**Command**:
```bash
git fetch origin
```

**What this does**:
- Downloads your latest commits from GitHub
- Does NOT touch customer's files yet
- Stores your changes in a special place called "origin/main"

**Visual**:
```
BEFORE git fetch:
Customer's Computer:
  - main branch (their work)
  - origin/main (OLD, from when they first cloned)

GitHub:
  - main branch (YOUR new improvements)

AFTER git fetch:
Customer's Computer:
  - main branch (their work, unchanged)
  - origin/main (UPDATED, now has YOUR improvements)

GitHub:
  - main branch (your improvements, unchanged)
```

**Key insight**: `git fetch` is SAFE - it downloads but doesn't change anything yet

---

### Step 2: Review What Changed

**Command**:
```bash
git log HEAD..origin/main --oneline
```

**What this shows**:
```
d4034e4 PRODUCT_UPGRADE: Update Management System
a1b2c3d SYSTEM_UPGRADE: PowerShell Fix
e4f5g6h WORKFLOW: Enhanced Daily Roadmap
```

**Translation**: "Here are the commits Daron added since I last updated"

**Command**:
```bash
git diff HEAD..origin/main --name-only
```

**What this shows**:
```
CLAUDE.md
scripts/sync-all-indices.js
System Documentation/PRODUCT_UPDATE_PROTOCOL.md
```

**Translation**: "These files changed in Daron's updates"

---

### Step 3: Selectively Apply Changes (The Magic Part)

**This is where your 3-layer system shines**

#### Layer 1: Take Framework Files (Overwrite Local)

**Command**:
```bash
git checkout origin/main -- scripts/
```

**What this does**:
- Takes the `scripts/` folder from YOUR version (origin/main)
- Overwrites customer's local `scripts/` folder
- Safe because scripts have no business-specific content

**Visual**:
```
BEFORE:
Customer's scripts/sync-all-indices.js (old version)

git checkout origin/main -- scripts/

AFTER:
Customer's scripts/sync-all-indices.js (YOUR new version)
```

**Repeat for all Layer 1 files**:
```bash
git checkout origin/main -- "System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md"
git checkout origin/main -- "System Documentation/CCGG_MECHANISMS_REGISTRY.md"
# ... etc
```

---

#### Layer 2: Keep Business Files (Ignore Your Updates)

**Command**:
```bash
git checkout HEAD -- "AI Growth Engine/"
```

**What this does**:
- Takes the `AI Growth Engine/` folder from THEIR current version (HEAD)
- Ignores whatever you have in origin/main
- Safe because their knowledge base is 100% custom

**Visual**:
```
YOUR version (origin/main):
AI Growth Engine/Knowledge Base/
  ├── Strategy_for_CCGG_AI_Leaders_Business.md (your business)
  └── Target_Avatars_Complete_Profiles.md (your avatars)

THEIR version (HEAD):
AI Growth Engine/Knowledge Base/
  ├── Strategy_for_My_Coaching_Business.md (their business)
  └── Target_Avatars_My_Customers.md (their avatars)

git checkout HEAD -- "AI Growth Engine/"

RESULT:
Customer KEEPS their version, ignores yours
```

**Repeat for all Layer 2 files**:
```bash
git checkout HEAD -- "Active Projects/"
git checkout HEAD -- "Project Memory/"
git checkout HEAD -- operations_log.txt
```

---

#### Layer 3: Manually Merge CLAUDE.md (Hybrid File)

**Why manual?**
- CLAUDE.md has BOTH framework (your improvements) AND business content (their customizations)
- Can't auto-take yours (loses their business context)
- Can't auto-keep theirs (misses your improvements)
- Solution: Manual merge with section markers

**Command**:
```bash
# Export YOUR version to temporary file
git show origin/main:CLAUDE.md > CLAUDE_upstream.md

# Copy THEIR version to temporary file
cp CLAUDE.md CLAUDE_local.md

# Open side-by-side comparison
code --diff CLAUDE_local.md CLAUDE_upstream.md
```

**What customer does in VS Code diff view**:
1. **See FRAMEWORK sections** (marked `<!-- FRAMEWORK SECTION -->`)
   - COPY from `CLAUDE_upstream.md` (your version) → paste into `CLAUDE.md`
   - Reason: Take your system improvements

2. **See CUSTOMER sections** (marked `<!-- CUSTOMER SECTION -->`)
   - KEEP from `CLAUDE_local.md` (their version) → leave unchanged in `CLAUDE.md`
   - Reason: Preserve their business content

3. **Save merged CLAUDE.md**

**Visual**:
```
YOUR CLAUDE.md (origin/main):
<!-- FRAMEWORK SECTION -->
## WORKFLOWS
[Your improved workflow - 500 new lines]

<!-- CUSTOMER SECTION -->
## AI GROWTH ENGINE
- OOBG: Grow CCGG revenue (YOUR business)
- Avatars: Reluctant Coach, etc. (YOUR avatars)

THEIR CLAUDE.md (local):
<!-- FRAMEWORK SECTION -->
## WORKFLOWS
[Old workflow - 200 lines]

<!-- CUSTOMER SECTION -->
## AI GROWTH ENGINE
- OOBG: Scale coaching practice (THEIR business)
- Avatars: Corporate executive, etc. (THEIR avatars)

MERGED CLAUDE.md (what they create):
<!-- FRAMEWORK SECTION -->
## WORKFLOWS
[Your improved workflow - 500 new lines] ← FROM YOUR VERSION

<!-- CUSTOMER SECTION -->
## AI GROWTH ENGINE
- OOBG: Scale coaching practice (THEIR business) ← FROM THEIR VERSION
- Avatars: Corporate executive, etc. (THEIR avatars) ← FROM THEIR VERSION
```

---

### Step 4: Commit Merged Changes

**Command**:
```bash
git add .
git commit -m "MERGE: Upstream update from Daron - Enhanced Daily Roadmap"
```

**What this does**:
- Saves all changes (framework files updated, business files preserved, CLAUDE.md merged)
- Creates a new commit on their local main branch

**Visual**:
```
BEFORE:
Their main branch: A -- B -- C (their commits)
Your origin/main:  A -- D -- E -- F (your commits)

AFTER git commit:
Their main branch: A -- B -- C -- G (G = merged commit with your improvements + their content)
Your origin/main:  A -- D -- E -- F (unchanged)
```

---

## Key Git Commands Explained

| Command | What It Does | Safe? |
|---------|--------------|-------|
| `git fetch origin` | Download your updates, don't change files yet | ✅ YES - Read-only |
| `git log HEAD..origin/main` | Show what changed in your updates | ✅ YES - Read-only |
| `git diff HEAD..origin/main` | Show file differences | ✅ YES - Read-only |
| `git checkout origin/main -- [file]` | Take YOUR version of file | ⚠️ ONLY for Layer 1 (framework) |
| `git checkout HEAD -- [file]` | Keep THEIR version of file | ✅ YES - Protects their work |
| `git add .` | Stage changes for commit | ✅ YES - Reversible |
| `git commit -m "..."` | Save merged changes | ✅ YES - Creates new commit |

---

## Common Misconceptions

### ❌ WRONG: "Just run `git pull`"

**Problem**:
```bash
git pull origin main
```

**What this does**:
- Tries to auto-merge ALL files
- Causes conflicts on CLAUDE.md, operations_log.txt, etc.
- Overwrites business content if auto-merge succeeds (BAD)

**Why it fails**: Git can't distinguish framework vs. business content

---

### ✅ RIGHT: "Selective checkout + manual merge"

**What your system does**:
```bash
git fetch origin                           # Download updates
git checkout origin/main -- scripts/       # Take framework
git checkout HEAD -- "AI Growth Engine/"   # Keep business
# Manual CLAUDE.md merge                   # Hybrid
git commit -m "MERGE: ..."                 # Save
```

**Why it works**: YOU (via 3-layer system) tell Git what to keep vs. take

---

## Visual Summary

```
┌─────────────────────────────────────────────────────────────┐
│  CUSTOMER'S UPDATE PROCESS                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. git fetch origin                                        │
│     └─> Downloads Daron's updates (doesn't change files)   │
│                                                             │
│  2. git log HEAD..origin/main                               │
│     └─> "Daron added 3 new commits"                        │
│                                                             │
│  3. LAYER 1 (Framework - Take Daron's)                      │
│     git checkout origin/main -- scripts/                    │
│     git checkout origin/main -- "System Documentation/"     │
│     └─> Overwrites with Daron's improvements               │
│                                                             │
│  4. LAYER 2 (Business - Keep Mine)                          │
│     git checkout HEAD -- "AI Growth Engine/"                │
│     git checkout HEAD -- "Active Projects/"                 │
│     └─> Preserves my business content                      │
│                                                             │
│  5. LAYER 3 (CLAUDE.md - Merge Both)                        │
│     - Export Daron's version: git show origin/main:CLAUDE.md│
│     - Compare with mine: code --diff                        │
│     - Copy framework sections FROM Daron                    │
│     - Keep business sections FROM mine                      │
│     └─> Best of both worlds                                │
│                                                             │
│  6. git commit -m "MERGE: Upstream update"                  │
│     └─> Save merged result                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Why This Approach Works

**Traditional Git merge**:
- Assumes both sides are "code" (no business vs. framework distinction)
- Auto-merges when possible, conflicts when not
- You resolve conflicts line-by-line (tedious)

**Your 3-layer system**:
- Classifies files by PURPOSE (framework vs. business vs. hybrid)
- Tells customer EXACTLY what to take vs. keep
- Only 1 file (CLAUDE.md) requires manual attention
- Section markers make merge obvious

**Result**: 5-minute update instead of 30-minute conflict resolution

---

## For Customers Who Don't Know Git

**Simplified explanation** (for docs):

> **When Daron releases improvements**, you run a few commands to:
> 1. Download his updates
> 2. Take his system files (scripts, docs)
> 3. Keep your business files (projects, knowledge base)
> 4. Merge one file (CLAUDE.md) by copying sections
> 5. Save the result
>
> It's like getting a software update on your phone - your data stays, the app improves.

---

## Next Step: Test with Real Customer

**Simulate the update**:
1. Create test customer account (separate folder)
2. Clone repo: `git clone <your-repo-url> test-customer`
3. Customer makes fake customizations (edit AI Growth Engine, add projects)
4. Customer commits: `git commit -am "My business work"`
5. You push new feature to GitHub
6. Customer follows UPDATE_QUICK_REFERENCE.md
7. Validate: Customer has YOUR improvements + THEIR content

**If successful**: You've proven the system works end-to-end

**If issues**: Refine docs based on pain points

---

**Bottom Line**: Customer doesn't need to understand Git deeply. They follow 9 copy-paste commands, manually merge one file (with clear section markers), and they're done.
