# Member Onboarding - Claude Code OS (LGBU)

**Step-by-Step Guide to Deploy Your AI Business Operating System**

This guide will walk you through your first deployment of Claude Code OS. Follow each step in order.

**Estimated Time**: 30-60 minutes (depending on customization depth)

**NO COMMAND LINE REQUIRED** - We use VS Code + Claude Code extension with natural language commands

---

## Member Expectations Survey (Completed During/After First Call)

**Purpose**: Understand member motivation, planned usage, and success criteria to align program delivery with expectations.

**Survey Link**: [INSERT GOOGLE FORM LINK AFTER CREATION]

**When to Share**:
- **During Call**: Share link in chat at beginning of call (members fill while listening to opening remarks)
- **After Call**: Include link in follow-up email for no-shows or those who didn't complete during call

**Survey Questions** (3 min, 4 questions):
1. Your name or business name (for identification)
2. Why are you excited about Claude Code Business OS? What caught your attention?
3. How do you plan to use this in your business?
4. What would success look like for you?

**Email Notifications**: All responses sent to daron@ccggskool.com automatically

**Usage**: Review responses to:
- Personalize upcoming modules (CRM, Finance, Meta Ads teams)
- Address common pain points during group calls
- Identify high-value features to prioritize
- Validate program-market fit

**Script to Create Form** (5 min via Google Apps Script):
See `EXPECTATIONS_SURVEY_SCRIPT.md` in root folder for automated form creation script.

---

## Prerequisites Check

Before starting, verify you have:

- [ ] Windows 10 or Windows 11
- [ ] **Visual Studio Code** installed ([download here](https://code.visualstudio.com/))
- [ ] **Claude Code extension** installed in VS Code (search "Claude Code" in Extensions)
- [ ] **Claude Pro subscription** active ([sign up here](https://claude.ai/) - $20/month, required)
- [ ] GitHub account created ([sign up here](https://github.com/signup))
- [ ] Repository access granted (you received GitHub invitation email from program admin)

**Optional but recommended**:
- [ ] Git installed ([download here](https://git-scm.com/downloads)) - Improves reliability, but Claude Code has built-in Git support

**If missing any prerequisites**: Contact program admin or see README.md "System Requirements" section.

---

## Step 1: Accept GitHub Repository Invitation

### 1.1: Check Email

Look for email from GitHub with subject similar to:
> "You've been invited to join [AdminUsername]/claude-code-os-lgbu"

### 1.2: Accept Invitation

- Click link in email
- Sign in to GitHub (if not already)
- Click **"Accept invitation"** button
- You should see: "You now have Read access to this repository"

### 1.3: Verify Access

Visit the repository URL provided by your program admin.

You should see the repository files (not a 404 error).

---

## Step 2: Open VS Code + Claude Code Extension

### 2.1: Launch Visual Studio Code

- Open VS Code from Start menu or desktop shortcut
- You should see the VS Code welcome screen

### 2.2: Verify Claude Code Extension

- Click **Extensions** icon in left sidebar (or press `Ctrl+Shift+X`)
- Search: "Claude Code"
- Should show **"Installed"** (if not, click Install now)

### 2.3: Sign In to Claude

- Click **Claude icon** in left sidebar (looks like Claude logo)
- If not signed in: Click "Sign in" button
- Authenticate with your Claude Pro account
- Authorize Claude Code extension

**Success**: Claude chat interface appears on right side of VS Code

---

## Step 3: Clone Repository via Claude Code (NO COMMAND LINE!)

### 3.1: Ask Claude to Clone Repository

In the Claude Code chat interface, type:

```
Clone the repository [REPOSITORY_URL_PROVIDED_BY_ADMIN] to C:\Users\[YourWindowsUsername]\claude-code-os-lgbu
```

**Replace**:
- `[REPOSITORY_URL_PROVIDED_BY_ADMIN]` with the URL your admin gave you
- `[YourWindowsUsername]` with your actual Windows username (e.g., `JohnSmith`)

**Example**:
```
Clone the repository https://github.com/adminuser/claude-code-os-lgbu.git to C:\Users\JohnSmith\claude-code-os-lgbu
```

### 3.2: Authenticate with GitHub

**If Git asks for credentials** (popup or in terminal):

```
Username: [your-github-username]
Password: [your-personal-access-token]
```

**⚠️ IMPORTANT**: Use **Personal Access Token**, NOT your GitHub password

**GitHub deprecated password authentication** for security reasons. You must create a token.

### 3.3: Create Personal Access Token (If You Don't Have One)

**This token is for Git authentication (NOT Claude authentication) - Two separate systems**

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. **Token name**: "Git Access for Claude Code OS"
4. **Expiration**: Select "90 days" (or "No expiration" if you prefer)
5. **Scopes**: Check **"repo"** ONLY (uncheck everything else)
6. Click **"Generate token"** at bottom
7. **COPY THE TOKEN** - You can't see it again after leaving the page!
8. **Paste as password** when Git asks for credentials

**What this token allows**:
- ✅ Clone repositories (download code)
- ✅ Pull updates (get new features)
- ❌ Push changes (you have Read-only access anyway)

**Keep token safe**: Save in password manager, don't share publicly

### 3.4: Verify Clone Success

Claude Code should respond:
> "Repository cloned successfully. Would you like to open it in VS Code?"

**Click YES** or respond "yes" in chat.

**If you closed VS Code** or need to reopen later:
1. File → Open Folder
2. Navigate to `C:\Users\[YourName]\claude-code-os-lgbu`
3. Click "Select Folder"

**Success indicators**:
- File explorer (left sidebar) shows folders: `Project Memory/`, `Active Projects/`, `AI Growth Engine/`, etc.
- `CLAUDE.md`, `README.md` visible in file list
- Claude Code chat still accessible

---

## Step 4: Verify Claude Understands the System

### 4.1: Test System Load

In Claude Code chat, ask:

```
Read CLAUDE.md and confirm you understand this is a business operations project
```

### 4.2: Expected Response

Claude should respond with:
- Overview of the system (Daily Roadmap, Productivity Assessment, Strategic Planning workflows)
- Confirmation it read the CLAUDE.md instructions
- Readiness to help with business operations
- Mention of specific workflows (not generic AI assistant responses)

### 4.3: Troubleshooting

**If Claude gives generic response** (doesn't mention specific workflows):

**Solution**:
1. File → Close Folder
2. File → Open Folder
3. Select `C:\Users\[YourName]\claude-code-os-lgbu` again
4. Retry prompt: "Read CLAUDE.md and confirm you understand this is a business operations project"

**Success**: Claude references Daily Roadmap, Productivity Assessment, Strategic Planning systems

---

## Step 5: Understand Git + GitHub Workflow

### 5.1: How Your Work Stays Private

**IMPORTANT CLARIFICATION**:

Your work stays **LOCAL** on your computer. Here's how the system works:

**1. You cloned the repository**
- Copied the framework to your computer ✅
- All files are now on your machine ✅

**2. Your work is YOUR work**
- Roadmaps, assessments, projects you create = Yours ✅
- Stored locally, not uploaded to GitHub ✅

**3. Personal Access Token = GitHub authentication**
- Allows Git to authenticate with GitHub ✅
- Required for cloning private repositories ✅
- Has NOTHING to do with Claude Code extension authentication ✅
- Standard GitHub security requirement ✅

**4. You have Read-only access**
- You CAN pull updates from admin (get new features) ✅
- You CANNOT push to admin's GitHub (your work stays private) ✅
- This is correct and intentional ✅

**5. Local Git commits = Your backup**
- Ask Claude: "Commit my changes with message: [description]" ✅
- Commits stay on your computer (like Time Machine) ✅
- Your version control, your business data ✅

### 5.2: Two Separate Authentication Systems

| System | Authentication | Purpose |
|--------|---------------|---------|
| **Claude Code Extension** | Claude Pro account | Use Claude AI in VS Code |
| **Git + GitHub** | Personal Access Token | Clone/pull from GitHub repos |

**You need BOTH**, but they are NOT connected:
1. Claude Pro subscription → Sign in to Claude Code extension → Use AI features
2. GitHub account + Access Token → Clone admin's repository → Get updates

---

## Step 6: Customize for Your Business

### 6.1: Navigate to AI Growth Engine

In VS Code file explorer (left sidebar):
- Expand `AI Growth Engine/` folder
- Open `Knowledge Base/` subfolder

**This is THE MOST IMPORTANT step** - The system reads these files to prioritize your work.

### 6.2: Create Strategy.md (10-15 min)

Ask Claude Code in chat:

```
Help me create AI Growth Engine/Knowledge Base/Strategy.md with these sections:
- One Obsessional Big Goal (OOBG)
- Unique Vehicle
- Current Strategic Priorities
- Current Bottleneck
- 2-Year Vision

Let's start: What is my OOBG?
```

**Claude will prompt you for each section.** Answer with YOUR business details:

**Example answers**:
- **OOBG**: "Build the #1 AI automation community for coaches and consultants"
- **Unique Vehicle**: "YouTube + Paid Community (no courses, just systems)"
- **Current Priorities**:
  1. Increase YouTube views (traffic bottleneck)
  2. Optimize trial→paid conversion (revenue growth)
  3. Launch advanced AI agent course (product expansion)
- **Current Bottleneck**: "Member onboarding - too manual, needs automation"
- **2-Year Vision**: "10,000 members, $1.2M ARR, team of 5, fully automated operations"

**Claude saves the file** when complete.

### 6.3: Create Target_Avatars.md (5-10 min)

Ask Claude:

```
Help me create AI Growth Engine/Knowledge Base/Target_Avatars.md. I'll describe my ideal customer avatars.
```

**For EACH avatar** (describe 1-2 avatars):
- **Avatar Name**: (e.g., "Reluctant Coach", "Scaling Consultant")
- **Industry**: coaching, consulting, SaaS, etc.
- **Business Stage**: solopreneur, small team, scaling
- **Annual Revenue**: $50K-$100K, $100K-$250K, $250K-$1M, etc.
- **Pain Points** (3 main frustrations they have)
- **Goals** (what they want to achieve)
- **How We Help** (your specific value to this avatar)

**Claude formats and saves** the file.

### 6.4: Create Product_Information.md (5 min - Optional)

Ask Claude:

```
Help me create AI Growth Engine/Knowledge Base/Product_Information.md with my offers and customer journey.
```

**Provide**:
- **Core Offer**: Name, price, delivery method, promise
- **Customer Journey**: How they discover you → How they buy → Upsells/Next steps

**If time limited**: Skip this, add it later (not critical for Day 1 roadmap generation)

### 6.5: Optional - Customize CLAUDE.md (5 min - Advanced)

**If time allows** (not required for Day 1):

Ask Claude:

```
Open CLAUDE.md and help me customize it for my business
```

**Customizations**:
- Replace `[Your Business]` with your actual business name
- Adjust Daily Disciplines (Tier 3) to YOUR routines
- Add business-specific workflows if needed

**Keep all core mechanisms** (they work universally)

**You can do this later** - Not critical for first roadmap.

---

## Step 7: Generate Your First Daily Roadmap

### 7.1: Ask Claude to Generate Roadmap

In Claude Code chat:

```
Generate daily roadmap
```

### 7.2: What Happens (Behind the Scenes)

Claude Code will:
1. Read your AI Growth Engine (Strategy.md, Target_Avatars.md)
2. Check for yesterday's unfinished work (none on first run)
3. Prioritize tasks based on your OOBG alignment
4. Generate roadmap with 4 tiers:
   - **Tier 1 (Momentum)**: Unfinished work from yesterday
   - **Tier 2 (Strategic)**: High-OOBG-alignment tasks
   - **Tier 3 (Daily Disciplines)**: Fixed routines
   - **Tier 4 (Exploratory)**: Incubating projects
5. Save to `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`

**Time**: 2-5 minutes for Claude to generate

### 7.3: Review Your Roadmap

**Open the generated file**:
- Navigate to `Project Memory/Daily Planning/` folder
- Open today's file: `YYYY-MM-DD_daily-roadmap.md`

**You should see**:
- **Tier 1 (Momentum)**: Empty on first run (no yesterday's work)
- **Tier 2 (Strategic)**: Tasks based on YOUR OOBG, priorities, bottleneck
- **Tier 3 (Daily Disciplines)**: Default routines (customize in CLAUDE.md later)
- **Tier 4 (Exploratory)**: Incubating projects (if any)

**Each task shows**:
- Time estimate (e.g., "2-3 hours")
- OOBG alignment score (e.g., "92/100" = highly strategic)
- Context from yesterday (if applicable)
- Next actions (what to do first)

### 7.4: Troubleshooting Empty Roadmap

**If Tier 2 (Strategic) is empty or generic**:

**Root cause**: AI Growth Engine not detailed enough

**Solution**:
1. Go back to Step 6.2 (Strategy.md)
2. Add more specific details:
   - Expand Current Priorities (3+ concrete items)
   - Define Current Bottleneck clearly
   - Add tactical priorities (not just high-level goals)
3. Ask Claude: "Generate daily roadmap" again

**Success**: Tier 2 populates with specific tasks aligned to your business

---

## Step 8: Core Workflows Demo

### 8.1: Your Daily Rhythm (Quick Reference)

**Every Morning** (5 min):
```
"Generate daily roadmap"
```
→ Know exactly what to work on, no "where do I start?" friction

**Throughout the Day**:
- Work on tasks from your roadmap
- Ask Claude for help: "Help me create [deliverable]", "Analyze [data/document]"
- Claude logs your activity automatically to `operations_log.txt`

**End of Day** (5 min):
```
"Assess my productivity today"
```
→ Productivity score (0-10), OOBG alignment analysis, tomorrow's priorities

**Weekly** (Sunday/Monday, 15 min):
```
"Update strategic planning"
```
→ Reviews last 7 days, challenges deviations, sets next week's priorities

**Optional** (After roadmap):
```
"Apply brutal prioritization"
```
→ Identifies THE ONE THING, P1/P2/P3 rankings, KILL list

---

### 8.2: Workflow 1 - Daily Roadmap (Already Generated in Step 7)

**You already ran this!** Review the output in `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`

**What it showed**:
- **Tier 1 (Momentum)**: Unfinished work from yesterday (empty on first run)
- **Tier 2 (Strategic)**: High-OOBG tasks based on your Strategy.md
- **Tier 3 (Daily Disciplines)**: Fixed routines
- **Tier 4 (Exploratory)**: Incubating projects

**Use daily**: Every morning to know exactly what to work on.

---

### 8.3: Workflow 2 - Productivity Assessment (Try Tonight)

**Command**:
```
Assess my productivity today
```

**What it does**:
- Reads `operations_log.txt` (auto-tracks work when Claude creates/updates files)
- Analyzes files you created/modified today
- Calculates OOBG alignment (how strategic was your work? 0-100 scale)
- Scores productivity (0-10 scale with detailed justification)
- Identifies patterns (what made today productive or unproductive?)
- Recommends tomorrow's priorities (ranked: HIGH/MEDIUM/LOW)
- Saves to `Productivity Tracking/YYYY-MM-DD_daily-assessment.md`

**Navigate to generated file** and review:
- Score breakdown (strengths + deductions)
- OOBG alignment average
- Tomorrow's priorities section

**Run tonight** after your first work session.

---

### 8.4: Workflow 3 - Brutal Prioritization (Optional Power Feature)

**Command**:
```
Apply brutal prioritization
```

**What it does**:
- Evaluates tasks from roadmap on 4 dimensions: OOBG alignment, urgency, impact, effort/value ratio
- Assigns priorities:
  - **P1 (Must Do Today)**: 3-5 tasks, 60-80% daily effort, scores 75-100
  - **P2 (Should Do This Week)**: 5-8 tasks, defer if P1 needs capacity, scores 50-74
  - **P3 (Nice to Have)**: 2-4 tasks, defer without guilt, scores 30-49
  - **KILL List**: <40% OOBG alignment, busywork, scores 0-29
- Identifies **THE ONE THING**: Highest-scoring P1 task

**Output shows**:
- THE ONE THING (highlighted at top)
- P1/P2/P3 tasks with scores
- KILL list recommendations

**Use when**: Task list feels overwhelming, unclear what matters most.

---

### 8.5: Workflow 4 - Active Projects Index Sync (Weekly Maintenance)

**Command**:
```
Sync all project indices
```

**What it does**:
- Scans `Active Projects/` and `Active Projects/_Incubator/`
- Extracts: Status, deliverables, tags, progress, dependencies
- Updates lightweight indices in `Project Memory/Active Projects Index/`
- Updates `.last_sync` timestamp (prevents staleness warnings)
- Logs sync to operations_log.txt

**Navigate to** `Project Memory/Active Projects Index/` to see:
- Index files for each active project
- YAML frontmatter (status, dates, strategic alignment)
- "Current Status" and "Key Deliverables" sections

**Run weekly** or when you complete major work in projects. Enables "What am I working on?" queries across ALL projects.

---

### 8.6: Workflow 5 - Weekly Strategic Planning (Start After Week 1)

**Command**:
```
Update strategic planning
```

**What it does**:
- Checks index staleness (>7 days? offers sync first)
- Reviews last 7 days: operations log, productivity assessments, roadmaps
- Analyzes progress on strategic priorities
- Challenges deviations: "You said X was priority, but worked on Y - why?"
- Consolidates weekly goals and outcomes
- Sets next week's priorities
- Saves to `Strategic Planning/YYYY-MM-DD_weekly-plan.md`

**Navigate to generated file** to review:
- Previous Week Review section
- This Week's Strategic Focus
- Active Projects Status
- Dependency Health Check (if applicable)
- Decisions & Commitments
- Next Week Preview

**Run every Sunday/Monday**. Prevents priority drift. Builds strategic muscle over weeks.

---

### 8.7: Workflow 6 - Operations Logging (Automatic)

**Navigate to** `operations_log.txt` in root folder.

**What you'll see**:
- Auto-generated entries: `[YYYY-MM-DD HH:MM:SS] - [ACTION] - [project] - [details]`
- Actions: CREATE, UPDATE, COMPLETE, SYNC, GRADUATE
- Feeds all workflows: Daily Roadmap, Productivity Assessment, Strategic Planning

**Key insight**: System logs your work automatically when Claude creates/updates files. No manual tracking required.

---

### 8.8: Workflow 7 - AI Growth Engine (The Brain)

**Navigate to** `AI Growth Engine/Knowledge Base/`

**Files you created**:
- **Strategy.md** - OOBG, Unique Vehicle, priorities, bottleneck, 2-year vision
- **Target_Avatars.md** - Customer profiles (1-2 avatars)
- **Product_Information.md** (if created) - Core offers, customer journey

**Why these files matter**:
- Daily Roadmap reads these to prioritize tasks
- Productivity Assessment uses OOBG to score alignment
- Strategic Planning references priorities for deviation analysis
- **These 3 files = your business brain**

**Update as strategy evolves**. More detail = better prioritization.

---

## Step 9: Backup Your Work (Local Git Commits)

### 9.1: Commit to Local Git

Ask Claude:

```
Commit my changes with message: First day setup complete
```

**What this does**:
- Claude runs `git commit` locally (on your computer)
- Creates snapshot of your current state
- Acts like Time Machine for your business files
- Enables reverting to any previous state if needed

**Do this daily**:
```
"Commit my changes with message: [description of what you did today]"
```

**Examples**:
- "Completed 3 strategic tasks, updated AI Growth Engine"
- "End of day backup - finished content calendar for Q1"
- "Weekly strategic planning complete, priorities set"

### 9.2: Your Commits Stay Local

**Important**: Your Git commits do NOT push to GitHub automatically.

**Why?**:
- You have Read-only access (can pull updates, can't push)
- Your work stays on YOUR computer (privacy)
- Local Git = Your version control backup

**If you want to push to YOUR OWN GitHub repo** (optional, advanced):
- Create your own private GitHub repository
- Add it as a second remote ("backup")
- Push to your own repo for cloud backup
- See "Advanced: Personal GitHub Backup" section below

---

## Setup Complete! ✅

You now have:
- ✅ Visual Studio Code + Claude Code extension working
- ✅ Repository cloned locally
- ✅ Claude understands the system (read CLAUDE.md)
- ✅ AI Growth Engine customized for your business
- ✅ First Daily Roadmap generated
- ✅ Daily workflow understood (Roadmap → Work → Assess → Repeat)
- ✅ Local Git backup working

---

## Next Steps

### Immediate (Today/Tomorrow)

1. **Work on tasks from your roadmap**
   - Choose Tier 2 (Strategic) tasks first (highest OOBG alignment)
   - Ask Claude for help: "Help me create [deliverable]"
   - Let Claude do file operations (automatic logging)

2. **Run your first productivity assessment tonight**
   - After working on roadmap tasks for a few hours
   - Ask Claude: "Assess my productivity today"
   - Review the generated assessment file
   - See productivity score (0-10) and tomorrow's priorities

3. **Commit another backup**
   - End of day: Ask Claude "Commit my changes with message: [what you did]"
   - Builds daily Git commit history

### This Week

4. **Establish daily habit** (7 consecutive days)
   - Generate Daily Roadmap every morning
   - Run Productivity Assessment every evening
   - Track patterns (what makes you most productive?)
   - Notice OOBG alignment trending up or down

5. **Deepen your AI Growth Engine** (when you have 30-60 min)
   - Add more detail to Strategy.md (expand priorities, bottleneck)
   - Create Product_Information.md (if skipped on Day 1)
   - Optional: Add Attractive_Character.md (your voice/persona)
   - Optional: Add Unique_Selling_Proposition.md (what makes you different)

### End of Week 1

6. **Run your first Weekly Strategic Planning**
   - Sunday evening or Monday morning
   - Ask Claude: "Update strategic planning"
   - Review the week (deviations, patterns, outcomes)
   - Set next week's priorities
   - Claude will challenge you ("You said X, but did Y - why?")

---

## Common Questions

### Q: Can I customize the Daily Disciplines (Tier 3)?

**A**: Yes! Edit `CLAUDE.md` and adjust the "Daily Disciplines" section.

Default is: Outreach, Dream 100, LinkedIn, Email Nurture (from Daron's business)

Replace with YOUR routines:
- Content creation (if that's your bottleneck)
- Sales calls (if you're focused on revenue)
- Product development (if building new offers)

### Q: What if I want to add my own scripts or automation?

**A**: Encouraged! This system is yours to customize.

Add scripts to: `scripts/` folder
Create custom commands: `.claude/commands/`
Modify workflows: Edit `CLAUDE.md`

Ask Claude for help: "Help me create a script to [automation task]"

### Q: Should I commit my work to Git regularly?

**A**: YES! Daily commits = Your backup strategy.

**End of every workday**:
```
"Commit my changes with message: [description]"
```

**Why?**:
- Version control (can revert to any previous state)
- History of your business evolution
- Disaster recovery (if files corrupted)

**Your commits stay local** (don't push to GitHub - you have Read-only access)

### Q: How do I get updates when new features are released?

**A**: Ask Claude Code in VS Code:

```
"Pull latest updates from GitHub"
```

**What happens**:
1. Claude fetches admin's latest improvements
2. Merges with your local work
3. Your customizations stay safe (Git merge intelligence)
4. You get system upgrades without losing your business data

**Safe merging**:
- Framework files (scripts, system docs) = Updated from admin
- Your business files (AI Growth Engine, projects, assessments) = Preserved
- CLAUDE.md = Manual merge if both you and admin changed it (side-by-side diff)

### Q: Can I use this without internet?

**A**: Partially.

**Claude Code requires internet** (it's an AI service running in the cloud)

**Your files are local**:
- Can edit files manually in VS Code without internet
- Can view past roadmaps, assessments, projects
- Can't ask Claude questions or generate new roadmaps

**Best practice**: Work online when using Claude features, offline when reviewing/editing manually

### Q: What if I want to work on multiple devices?

**A**: Set up your own personal GitHub backup (optional, advanced).

**Quick setup** (5 minutes):
1. Create private GitHub repo: github.com/new → "my-business-os"
2. Ask Claude: "Add a second Git remote named 'backup' pointing to https://github.com/[your-username]/my-business-os.git"
3. Ask Claude: "Push all my commits to the 'backup' remote"

**Now you can**:
- **Daily backup**: Ask Claude "Commit and push to backup"
- **Multi-device**: Clone YOUR backup repo on other computers
- **Full ownership**: Your complete business data in your GitHub account

**Not urgent** - Set this up when you want extra peace of mind or multi-device access.

---

## Troubleshooting

### Issue: Git authentication failed

**Symptoms**:
```
fatal: Authentication failed for 'https://github.com/...'
```

**Root cause**: Using GitHub password instead of Personal Access Token

**Solution**: Create Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Generate token (classic)
3. Name: "Git Access for Claude Code OS"
4. Expiration: 90 days
5. Scope: "repo" only
6. Copy token, paste as password when Git asks

---

### Issue: Daily Roadmap is empty or generic

**Symptoms**: Tier 2 (Strategic) has no specific tasks or generic placeholders

**Root cause**: AI Growth Engine not detailed enough

**Solution**: Add more detail to Strategy.md
1. Open `AI Growth Engine/Knowledge Base/Strategy.md`
2. Expand "Current Strategic Priorities" (3+ specific items)
3. Define "Current Bottleneck" clearly
4. Add tactical priorities (not just high-level goals)
5. Ask Claude: "Generate daily roadmap" again

---

### Issue: Claude doesn't mention system workflows

**Symptoms**: Ask "Read CLAUDE.md..." → Claude gives generic response, no mention of Daily Roadmap/Productivity Assessment

**Root cause**: Claude didn't load CLAUDE.md (wrong folder opened)

**Solution**: Close and reopen folder
1. File → Close Folder
2. File → Open Folder
3. Select `C:\Users\[YourName]\claude-code-os-lgbu`
4. Retry: "Read CLAUDE.md and confirm you understand this is a business operations project"

---

### Issue: operations_log.txt is empty

**Symptoms**: Worked on tasks, but operations_log.txt has no entries, Productivity Assessment says "No work logged"

**Root cause**: Edited files manually (outside Claude Code), so no automatic logging

**Explanation**: Operations logging is automatic ONLY when Claude Code creates/updates files.

**Solution**: Work through Claude Code
- Ask Claude to create/update files: "Help me create [deliverable]"
- Let Claude do file operations (automatic logging)
- Manual edits are fine (you own the system), but won't appear in log

---

### Issue: Python scripts crash with encoding errors

**Symptoms**: Script outputs `UnicodeEncodeError`

**Root cause**: Windows console uses cp1252 encoding (not UTF-8)

**Solution**: Scripts in this system already use ASCII-only output
- See `CLAUDE.md` → "WINDOWS ENVIRONMENT" section for coding standards
- If creating new Python scripts: Use ASCII markers (`[OK]`, `[ERROR]`) instead of emojis

---

## Support Resources

- **Skool Community**: https://www.skool.com/ccgg - Ask questions, share wins, troubleshoot together
- **Weekly Group Calls**: Schedule posted in Skool community - Live Q&A, advanced features demos
- **DM Daron**: daron@ccggskool.com - For urgent or private issues (24-48h response time)
- **GitHub Issues**: https://github.com/DaronVee/claude-code-os-lgbu/issues - For bugs or feature requests
- **README.md**: Full system documentation in your cloned folder
- **CLAUDE.md**: Complete system instructions (customize for your business)

---

## Advanced Features (When Ready)

### Brutal Prioritization

**When task list feels overwhelming**:

```
"Apply brutal prioritization"
```

**What it does**:
- Evaluates every task (OOBG alignment, urgency, impact, effort/value ratio)
- Identifies THE ONE THING (highest leverage task)
- Ranks P1 (must do), P2 (should do), P3 (nice to have), KILL (eliminate)
- Gives you permission to ignore low-value work
- Appends brutal priorities to daily roadmap

**Use when**: Too many tasks, unclear what matters most

---

### Dependency Tracking

**When projects have blockers**:

```
"Show dependencies for [project-name]"
"What's blocking [project-name]?"
"What does [project-name] block?"
```

**What it does**:
- Tracks dependencies in project YAML metadata
- Surfaces blocked tasks (can't start until X completes)
- Identifies critical path (which task unblocks the most work?)
- Visualizes dependency chains

**Use when**: Complex projects with multiple phases, unclear sequencing

---

### Project Memory Search

**When you need to reference past work**:

```
"Find projects about [topic]"
"Show me all content projects from last quarter"
"What have I done on [subject]?"
```

**What it does**:
- Searches Project Memory for relevant past work
- Surfaces reusable components (frameworks, copy, templates)
- Recommends building on past successes
- Prevents reinventing the wheel

**Use when**: Starting new project, need inspiration, want to reference past wins

---

### Personal GitHub Backup (Advanced)

**Want cloud backup + multi-device access?**

**5-minute setup**:

1. **Create your own private GitHub repo**
   - Go to: github.com/new
   - Name: "my-business-os" (or whatever you want)
   - Make it **PRIVATE**
   - Do NOT initialize with README (you already have files)
   - Click "Create repository"

2. **Add your repo as second remote**

Ask Claude:
```
"Add a second Git remote named 'backup' pointing to https://github.com/[your-username]/my-business-os.git"
```

3. **Push your work to your repo**

Ask Claude:
```
"Push all my commits to the 'backup' remote"
```

**Now you have**:
- `origin` remote = Admin's repo (Read-only, for pulling updates)
- `backup` remote = Your repo (Full access, for backing up your work)

**Your workflow becomes**:

| Action | Command to Claude | What It Does |
|--------|-------------------|--------------|
| **Get updates from admin** | "Pull updates from origin" | Gets new features |
| **Backup your work** | "Push to backup remote" | Backs up to your GitHub |
| **Daily backup** | "Commit changes and push to backup" | Local commit + cloud backup |
| **Multi-device sync** | "Pull from backup remote" | Get your work on other computer |

**Benefits**:
- ✅ Disaster recovery (computer crashes → clone from your backup repo)
- ✅ Multi-device access (work on laptop → push to backup → work on desktop → pull from backup)
- ✅ Independence (if admin's repo becomes unavailable, you have full copy)
- ✅ Version history in the cloud (your GitHub shows your personal work history)

**Not urgent** - Set this up when you want extra peace of mind.

---

## Final Checklist

Before considering onboarding complete, verify:

- [ ] Repository cloned and accessible
- [ ] Claude Code opened in project folder
- [ ] CLAUDE.md read and understood by Claude (mentions specific workflows)
- [ ] AI Growth Engine populated (Strategy.md, Target_Avatars.md minimum)
- [ ] First Daily Roadmap generated successfully
- [ ] Daily workflow understood (Roadmap → Work → Assess → Repeat)
- [ ] First productivity assessment ready to run tonight
- [ ] Local Git commits working (backup strategy)
- [ ] Know where to get support (community, group calls, admin)

**If all checked**: You're ready to operate at full capacity.

**If any unchecked**: Review relevant section above or ask for help in community.

---

Welcome to systematic, AI-powered business operations!

Let's execute with clarity.
