# Member Onboarding - Claude Code OS (LGBU)

**Step-by-Step Guide to Deploy Your AI Business Operating System**

This guide will walk you through your first deployment of Claude Code OS. Follow each step in order.

**Estimated Time**: 30-60 minutes (depending on customization depth)

---

## Prerequisites Check

Before starting, verify you have:

- [ ] Windows 10 or Windows 11
- [ ] Claude Code installed ([download here](https://claude.com/claude-code))
- [ ] Git installed ([download here](https://git-scm.com/downloads))
- [ ] GitHub account created
- [ ] Repository access granted (you received GitHub invitation email)
- [ ] Terminal/command line access (Command Prompt, PowerShell, or Git Bash)

**If missing any prerequisites**: See README.md "System Requirements" section first.

---

## Step 1: Accept GitHub Repository Invitation

### 1.1: Check Email

Look for email from GitHub with subject similar to:
> "You've been invited to join CCGG-Business-Operations/claude-code-os-lgbu"

### 1.2: Accept Invitation

- Click link in email
- Sign in to GitHub (if not already)
- Click **"Accept invitation"** button
- You should see: "You now have Read access to this repository"

### 1.3: Verify Access

Visit: `https://github.com/CCGG-Business-Operations/claude-code-os-lgbu`

You should see the repository files (not a 404 error).

---

## Step 2: Clone Repository to Your Computer

### 2.1: Choose Location

Decide where to store your business operations:

**Recommended**: `C:\Users\YourName\claude-code-os-lgbu`

**Why this location**:
- Easy to find and access
- No spaces in path (avoids Windows issues)
- Not in OneDrive/Dropbox (can cause sync conflicts)
- Direct path for command line operations

### 2.2: Open Terminal

**Option A: Command Prompt**
- Press `Win + R`
- Type `cmd` → Enter

**Option B: PowerShell**
- Right-click Start menu
- Select "Windows PowerShell"

**Option C: Git Bash** (if installed)
- Right-click in folder where you want to clone
- Select "Git Bash Here"

### 2.3: Navigate to Parent Folder

```bash
# Go to your user folder
cd C:\Users\YourName

# Or navigate to your preferred location
cd C:\path\to\your\preferred\location
```

### 2.4: Clone Repository

```bash
git clone https://github.com/CCGG-Business-Operations/claude-code-os-lgbu.git
```

**If asked for authentication**:

**HTTPS (recommended for simplicity)**:
- Username: Your GitHub username
- Password: Personal Access Token ([create one here](https://github.com/settings/tokens))
  - Note: GitHub no longer accepts account passwords for Git operations

**SSH (if you've set up SSH keys)**:
- Use: `git clone git@github.com:CCGG-Business-Operations/claude-code-os-lgbu.git`
- Requires SSH keys configured ([GitHub guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh))

### 2.5: Verify Clone Success

```bash
# Navigate into the cloned folder
cd claude-code-os-lgbu

# List files (you should see CLAUDE.md, README.md, etc.)
dir  # (Windows Command Prompt)
# OR
ls   # (Git Bash, PowerShell)
```

**Success**: You see a list of files and folders.

---

## Step 3: Open in Claude Code

### 3.1: Launch Claude Code

From terminal (inside `claude-code-os-lgbu` folder):

```bash
code .
```

**OR**

- Open Claude Code application
- File → Open Folder
- Navigate to `claude-code-os-lgbu` folder
- Click "Select Folder"

### 3.2: Verify Claude Code Loaded Correctly

You should see:
- File explorer on left (showing all folders/files)
- CLAUDE.md visible in file list
- Claude chat interface (ready to accept prompts)

### 3.3: Read CLAUDE.md

**CRITICAL**: Claude Code reads CLAUDE.md to understand how to work in this project.

Ask Claude:

```
"Read CLAUDE.md and confirm you understand this is a business operations project"
```

Claude should respond with confirmation and overview of capabilities.

---

## Step 4: Customize for Your Business

### 4.1: Review CLAUDE.md Placeholders

Open `CLAUDE.md` and search for:
- `[Your Business]`
- `[Your Name]`
- Any other placeholder text

**You can edit this file directly** (it's yours to customize).

**What to customize**:
- Replace `[Your Business]` with your actual business name
- Adjust strategic goal descriptions if needed
- Add business-specific workflows if relevant

**What to keep**:
- All core mechanisms (they work universally)
- Windows coding standards section
- Workflow sections (Daily Roadmap, Productivity Assessment, etc.)

### 4.2: Populate AI Growth Engine Knowledge Base

**This is THE MOST IMPORTANT step for strategic alignment.**

Navigate to: `AI Growth Engine/Knowledge Base/`

**Minimum Required Files** (use templates from `_Template_Examples/`):

**1. Strategy.md** (Your strategic foundation)

Create this file with:

```markdown
# Business Strategy

## One Obsessional Big Goal (OOBG)

[What is the ONE thing your business exists to achieve?]

Example: "Build the #1 AI automation community for coaches and consultants"

## Unique Vehicle

[How do you uniquely deliver value?]

Example: "YouTube + Paid Community (no courses, just systems)"

## Current Strategic Priorities

1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

## Current Bottleneck

[What is blocking your OOBG progress right now?]

Example: "Member onboarding - too manual, needs automation"

## 2-Year Vision

[Where do you want to be in 2 years?]
```

**2. Target_Avatars.md** (Who you serve)

```markdown
# Target Customer Avatars

## Avatar 1: [Name]

**Demographics:**
- Industry: [industry]
- Business stage: [stage]
- Annual revenue: [$X-Y]

**Pain Points:**
- [Pain 1]
- [Pain 2]
- [Pain 3]

**Goals:**
- [Goal 1]
- [Goal 2]

**How We Help:**
[Specific value we provide to this avatar]

---

## Avatar 2: [Name]

[Repeat structure for additional avatars]
```

**3. Product_Information.md** (What you offer)

```markdown
# Product & Service Offerings

## Core Offer

**Name**: [Product/Program Name]
**Price**: [Pricing]
**Delivery**: [How delivered]
**Promise**: [Core value proposition]

## Customer Journey

**Entry Point**: [How they discover you]
**Nurture**: [How you build trust]
**Conversion**: [How they buy]
**Ascension**: [Upsells, next steps]

## Module/Lesson Structure

[If you have courses/programs, outline the structure here]
```

**Optional Files** (add as needed):

- `Attractive_Character.md` - Your voice, persona, communication style
- `Unique_Selling_Proposition.md` - What makes you different
- `Offers_and_Funnel.md` - Detailed pricing and funnel structure
- `Strategic_Framework.md` - Positioning, category design

**Time Investment**: 1-2 hours for minimum files, 3-4 hours for complete knowledge base

---

## Step 5: Run Your First Daily Roadmap

### 5.1: Ask Claude to Generate Roadmap

In Claude Code chat:

```
"Generate daily roadmap"
```

### 5.2: What Happens

Claude will:
1. Read your AI Growth Engine (Strategy.md, avatars, etc.)
2. Check for yesterday's unfinished work (none yet, this is your first run)
3. Prioritize tasks based on OOBG alignment
4. Generate roadmap with 4 tiers (Momentum, Strategic, Disciplines, Exploratory)
5. Save to `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`

### 5.3: Review Your Roadmap

Open the generated file: `Project Memory/Daily Planning/[today's date]_daily-roadmap.md`

You should see:
- **Tier 1 (Momentum)**: Unfinished work from yesterday (empty on first run)
- **Tier 2 (Strategic)**: High-OOBG-alignment tasks
- **Tier 3 (Daily Disciplines)**: Fixed routines (customize these in CLAUDE.md)
- **Tier 4 (Exploratory)**: Incubating projects (if any)

**If roadmap is empty or generic**:
- Go back to Step 4.2 (populate AI Growth Engine)
- Roadmap quality depends on strategic knowledge base quality

---

## Step 6: Execute and Track Work

### 6.1: Work on Tasks from Roadmap

Choose a task from your roadmap and execute.

**Examples**:
- "Create content brief for [topic]"
- "Draft email sequence for [campaign]"
- "Build strategic plan for [quarter]"

### 6.2: Let Claude Help

**For content creation**:
```
"Help me create [deliverable] based on my roadmap priority"
```

**For analysis**:
```
"Analyze [data/document] and provide insights"
```

**For planning**:
```
"Help me break down [project] into actionable steps"
```

### 6.3: Claude Logs Activity Automatically

When Claude creates/updates files, it logs to `operations_log.txt`:

```
[2025-11-09 14:23:15] - CREATE - content-brief - Email sequence for product launch
[2025-11-09 15:10:42] - UPDATE - strategic-planning - Q1 2026 priorities defined
```

**You don't need to do anything** - this happens automatically.

---

## Step 7: Assess Your First Day

### 7.1: End of Day

When you're done working for the day, ask Claude:

```
"Assess my productivity today"
```

### 7.2: What Happens

Claude will:
1. Read `operations_log.txt` for today's activity
2. Analyze files modified today
3. Calculate OOBG alignment (how strategic was your work?)
4. Score productivity (0-10 scale with detailed justification)
5. Identify patterns (what made today productive?)
6. Recommend tomorrow's priorities
7. Save to `Project Memory/Productivity Tracking/YYYY-MM-DD_daily-assessment.md`

### 7.3: Review Assessment

Open the generated file and read:
- **Work Completed**: What you delivered
- **Productivity Score**: X/10 with breakdown (strengths + deductions)
- **Strategic Alignment**: Average OOBG alignment of today's work
- **Tomorrow's Priorities**: Ranked by impact (HIGH/MEDIUM/LOW)
- **Pattern Notes**: Observations for future cross-analysis

**Use this to improve**:
- High-productivity days: What patterns can you replicate?
- Low-productivity days: What blocked you?
- OOBG alignment trending down? Course-correct tomorrow.

---

## Step 8: Establish Weekly Rhythm

### 8.1: Sunday Evening or Monday Morning

Ask Claude:

```
"Update strategic planning"
```

### 8.2: What Happens

Claude will:
1. Read last 7 days' data (operations log, productivity assessments, daily roadmaps)
2. Analyze progress on strategic priorities
3. Challenge deviations ("You said X was priority, but worked on Y - why?")
4. Consolidate weekly goals and outcomes
5. Set next week's priorities
6. Identify blockers to address
7. Save to `Project Memory/Strategic Planning/YYYY-MM-DD_weekly-plan.md`

### 8.3: Review and Respond

Claude will ask probing questions:
- "Last week you prioritized [X], but worked mostly on [Y]. Why the deviation?"
- "OOBG alignment averaged [XX/100] last week. What would increase it to 90+?"

**Answer honestly** - this is YOUR business reflection, Claude is facilitating.

### 8.4: Weekly Habit

Commit to this every week for 12+ consecutive weeks to see compounding benefits.

---

## Step 9: Advanced Features (When Ready)

### 9.1: Brutal Prioritization

**When task list feels overwhelming**:

```
"Apply brutal prioritization"
```

Claude will:
- Evaluate every task (OOBG alignment, urgency, impact, effort/value)
- Identify THE ONE THING (highest leverage)
- Rank P1 (must do), P2 (should do), P3 (nice to have), KILL (eliminate)
- Give you permission to ignore low-value work

### 9.2: Dependency Tracking

**When projects have blockers**:

```
"Show dependencies for [project-name]"
"What's blocking [project-name]?"
"What does [project-name] block?"
```

Claude tracks dependencies in YAML metadata, surfaces blocked tasks, identifies critical path.

### 9.3: Project Memory Search

**When you need to reference past work**:

```
"Find projects about [topic]"
"Show me all content projects from last quarter"
"What have I done on [subject]?"
```

Claude searches Project Memory, surfaces reusable components, recommends building on past successes.

---

## Congratulations!

You've successfully deployed Claude Code OS. You now have:

- ✅ AI-powered Daily Execution Roadmaps
- ✅ Productivity Assessment system
- ✅ Weekly Strategic Planning workflow
- ✅ Complete business knowledge base
- ✅ Project Memory for knowledge compounding
- ✅ Git version control for all business operations

---

## Next Steps

1. **Daily**: Generate roadmap, execute, assess productivity
2. **Weekly**: Update strategic planning (Sunday/Monday)
3. **Monthly**: Review productivity trends, identify high-ROI patterns
4. **Quarterly**: Major strategic review, goal adjustments
5. **Ongoing**: Populate AI Growth Engine as business evolves

---

## Common Questions (Post-Setup)

### Q: Can I customize the daily disciplines (Tier 3)?

**A**: Yes! Edit `CLAUDE.md` and adjust the "Daily Disciplines" section. Default is outreach, Dream 100, LinkedIn, email nurture - replace with YOUR routines.

### Q: What if I want to add my own scripts or automation?

**A**: Encouraged! Add scripts to `scripts/` folder, create custom commands in `.claude/commands/`, modify workflows in `CLAUDE.md`.

### Q: Should I commit my work to Git?

**A**: Yes, regularly! Your local Git commits are your backup:

```bash
git add .
git commit -m "End of day - completed [deliverables]"
```

You can't push to GitHub (Read-only access), but local commits preserve your history.

### Q: How do I get updates when new features are released?

**A**: See README.md "Getting Updates" section. Summary:

1. Commit your work: `git commit -am "Before update"`
2. Pull updates: `git pull origin main`
3. Resolve conflicts (if any)
4. Test system still works

### Q: Can I use this without internet?

**A**: Partially. Claude Code requires internet (it's an AI service), but your files/system are local. No internet = can't ask Claude questions, but can still edit files manually.

---

## Support Resources

- **Community**: [Your program community link]
- **Group Calls**: Weekly strategy sessions
- **DM Support**: For urgent issues
- **README.md**: Troubleshooting section
- **CLAUDE.md**: Full system documentation

---

## Final Checklist

Before considering onboarding complete, verify:

- [ ] Repository cloned and accessible
- [ ] Claude Code opened in project folder
- [ ] CLAUDE.md read and understood by Claude
- [ ] AI Growth Engine populated (minimum: Strategy.md, Target_Avatars.md, Product_Information.md)
- [ ] First Daily Roadmap generated successfully
- [ ] First Productivity Assessment completed
- [ ] `operations_log.txt` has entries (work tracked)
- [ ] Git commits created (backup strategy working)
- [ ] You know where to get support

**If all checked**: You're ready to operate at full capacity.

**If any unchecked**: Review relevant section above or ask for help in community.

---

Welcome to systematic, AI-powered business operations!

Let's execute with clarity.
