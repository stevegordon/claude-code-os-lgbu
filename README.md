# Claude Code OS - Lean GPT Business Ultimate

**Full AI Business Operating System in Claude Code**

A complete business operations framework that combines productivity systems, strategic planning, project management, and AI-powered workflows into a single unified operating system.

---

## What Is This?

Claude Code OS (LGBU) is a **business operating system** that runs inside Claude Code - Anthropic's AI-powered development environment. It provides:

- **Daily Execution Roadmaps**: Automated task prioritization based on strategic goals
- **Productivity Assessment**: Track patterns, measure OOBG alignment, identify what works
- **Strategic Planning**: Weekly reviews, quarterly planning, goal tracking
- **Project Memory**: Systematic knowledge management across all business activities
- **Brutal Prioritization**: Ruthlessly identify THE ONE THING that matters most
- **Dependency Tracking**: Never lose track of blocked tasks or critical path work
- **Git Integration**: Full version control for your business operations

**This is NOT** a traditional code repository. It's a **business operations workspace** powered by AI.

---

## System Requirements

**Required:**
- Windows 10 or Windows 11
- [Claude Code](https://claude.com/claude-code) installed and activated
- [Git](https://git-scm.com/downloads) installed (for cloning repository)
- GitHub account (for repository access)

**Recommended:**
- 8GB+ RAM (for Claude Code performance)
- VS Code or similar editor (for file editing outside Claude Code)
- Basic familiarity with command line (for Git operations)

---

## Quick Start (5 Steps)

### Step 1: Clone Repository

```bash
# Open terminal in your preferred location (e.g., C:\Users\YourName\)
git clone https://github.com/[YourGitHubUsername]/claude-code-os-lgbu.git
cd claude-code-os-lgbu
```

**Note**: Replace `[YourGitHubUsername]` with the actual GitHub username provided by your program administrator.

### Step 2: Open in Claude Code

```bash
# Open this folder in Claude Code
code .
```

Or: Open Claude Code → File → Open Folder → Select `claude-code-os-lgbu`

### Step 3: Customize for Your Business

**Edit CLAUDE.md** (root file):
- Replace `[Your Business]` placeholders with your business name
- Adjust strategic goals if needed
- Keep the core mechanisms (they work universally)

**Populate AI Growth Engine**:
- Create files in `AI Growth Engine/Knowledge Base/`
- Use templates in `AI Growth Engine/_Template_Examples/`
- Add your business strategy, customer avatars, positioning, offers

**Minimal required files:**
- `Strategy.md` (your OOBG, Unique Vehicle, goals)
- `Target_Avatars.md` (your ideal customers)
- `Product_Information.md` (your offerings)

### Step 4: Run Your First Daily Roadmap

Ask Claude Code:

```
"Generate daily roadmap"
```

Claude will:
- Extract yesterday's unfinished work (if any)
- Read your strategic priorities
- Prioritize tasks into 4 tiers (Momentum, Strategic, Daily Disciplines, Exploratory)
- Save to `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`

### Step 5: Start Executing

Follow your roadmap and track work:

- Complete tasks → Claude logs to `operations_log.txt`
- End of day → Ask: "Assess my productivity today"
- Weekly → Ask: "Update strategic planning"
- Anytime → Ask: "What should I work on?"

---

## Folder Structure

```
claude-code-os-lgbu/
├── CLAUDE.md                      # System instructions (READ THIS FIRST)
├── LICENSE.md                     # Proprietary license
├── TERMS_OF_SERVICE.md            # Access terms
├── README.md                      # This file
├── MEMBER_ONBOARDING.md           # Detailed setup guide
├── operations_log.txt             # Business activity log
├── .gitignore                     # Git exclusions
│
├── Project Memory/                # Knowledge management
│   ├── Active Projects Index/    # Indices for ongoing work
│   ├── Content Projects/          # Completed content deliverables
│   ├── Product Builds/            # Completed product builds
│   ├── Strategic Planning/        # Strategy documents
│   ├── Daily Planning/            # Daily roadmaps
│   ├── Productivity Tracking/     # Assessments
│   └── _Templates/                # Example project files
│
├── Active Projects/               # Ongoing programs
│   ├── _Incubator/                # Exploratory work
│   └── _Templates/                # Example project structures
│
├── System Documentation/          # Framework docs
│   ├── BRUTAL_PRIORITIZATION_FRAMEWORK.md
│   ├── SETTINGS_JSON_IMPLEMENTATION_GUIDE.md
│   └── [Other mechanism docs]
│
├── AI Growth Engine/              # Strategic knowledge base
│   ├── Knowledge Base/            # YOUR business strategy files (populate this)
│   ├── System Prompt/             # AI system prompts
│   └── _Template_Examples/        # Example knowledge files
│
├── scripts/                       # Automation tools
│   ├── sync-all-indices.js
│   ├── update-asset-registry.js
│   ├── generate-dependency-graph.js
│   └── project-commands.js
│
└── .claude/                       # Claude Code configuration
    ├── agents/                    # Subagents (ruthless-prioritizer)
    ├── commands/                  # Custom commands (/init-business)
    └── settings.local.json        # Local settings (customize)
```

---

## Core Workflows

### Daily: Generate Execution Roadmap

**When**: Every morning (or when starting work)

**How**: Ask Claude Code: `"Generate daily roadmap"`

**What happens**:
1. Claude extracts yesterday's unfinished work
2. Reads your strategic priorities from AI Growth Engine
3. Prioritizes tasks by impact (OOBG alignment scoring)
4. Generates roadmap with 4 tiers (Momentum, Strategic, Disciplines, Exploratory)
5. Saves to `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`

**Output**: Clear priorities for the day, no "what should I work on?" friction

---

### Daily: Assess Productivity

**When**: End of workday

**How**: Ask Claude Code: `"Assess my productivity today"`

**What happens**:
1. Claude reads operations_log.txt for today's activity
2. Analyzes deliverables completed
3. Calculates OOBG alignment (how strategic was your work?)
4. Scores productivity (0-10 scale with justification)
5. Identifies patterns (what made today productive/unproductive?)
6. Saves to `Project Memory/Productivity Tracking/YYYY-MM-DD_daily-assessment.md`

**Output**: Data-driven feedback, patterns over time, tomorrow's priorities

---

### Weekly: Update Strategic Planning

**When**: End of week (Sunday evening or Monday morning)

**How**: Ask Claude Code: `"Update strategic planning"`

**What happens**:
1. Claude reviews last 7 days (operations log, productivity assessments, roadmaps)
2. Analyzes progress on strategic priorities
3. Challenges deviations ("You said X was priority, but worked on Y - why?")
4. Consolidates weekly goals and outcomes
5. Sets next week's priorities
6. Saves to `Project Memory/Strategic Planning/YYYY-MM-DD_weekly-plan.md`

**Output**: Weekly reflection, course corrections, consolidated priorities

---

### Anytime: Apply Brutal Prioritization

**When**: Task list feels overwhelming, unclear what matters most

**How**: Ask Claude Code: `"Apply brutal prioritization"`

**What happens**:
1. Claude reads your AI Growth Engine (OOBG, current bottleneck, strategic priorities)
2. Evaluates every task on your list (OOBG alignment, urgency, impact, effort/value ratio)
3. Identifies THE ONE THING (highest leverage task)
4. Ranks tasks into P1 (must do), P2 (should do), P3 (nice to have), KILL (eliminate)
5. Provides clear recommendation: Focus on this, defer that, kill the rest

**Output**: Clarity on what truly matters, guilt-free elimination of low-value work

---

## Common Troubleshooting

### Issue: `git clone` asks for authentication

**Solution**:
- If using HTTPS: Enter your GitHub username and Personal Access Token ([create one here](https://github.com/settings/tokens))
- If using SSH: Set up SSH keys ([GitHub guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh))

---

### Issue: Claude Code says "CCGG Business Operations" not found

**Solution**:
- You're trying to open the wrong folder
- Make sure you're in `claude-code-os-lgbu/` directory (the one you cloned)
- Check: `pwd` (should show path ending in `/claude-code-os-lgbu`)

---

### Issue: Python scripts crash with `UnicodeEncodeError`

**Solution**:
- Windows console uses cp1252 encoding (not UTF-8)
- Scripts in this system use ASCII-only output (`[OK]`, `[ERROR]` instead of emojis)
- If you create new Python scripts: See `CLAUDE.md` → "WINDOWS ENVIRONMENT" section
- Reference: `System Documentation/WINDOWS_CODING_STANDARDS.md` (if available)

---

### Issue: `operations_log.txt` is empty, no activity tracked

**Solution**:
- You need to work WITH Claude Code (ask it to do things)
- Operations logging is automatic when Claude creates/updates files
- Example: "Create new project for [X]" → Claude logs CREATE action
- If you edit files manually, Claude won't log (that's expected)

---

### Issue: Daily Roadmap says "No strategic priorities found"

**Solution**:
- You haven't populated `AI Growth Engine/Knowledge Base/` yet
- Create at minimum: `Strategy.md` (with your OOBG and goals)
- Use templates in `AI Growth Engine/_Template_Examples/`
- After creating files, regenerate roadmap

---

### Issue: Git says "Your branch is ahead of 'origin/main' by X commits"

**What this means**:
- You made local changes (created projects, ran roadmaps, assessments)
- Those changes are committed to your local Git repository
- They haven't been pushed to GitHub (that's fine)

**Should you push?**
- **NO** - Your personal work should stay local
- This repository is for YOUR business only
- Pushing would require write access (you have Read-only)
- Your local Git history is your version control, GitHub is the update source

**To get updates from GitHub**:
```bash
git pull origin main
```

---

## Getting Updates

**When Daron releases new system improvements**, you can update your local system WITHOUT losing your business customizations.

### Automated Update (Recommended - Easiest)

**Just run this command** in your Business OS folder:

```bash
node scripts/update-from-upstream.js
```

The script will:
- ✅ Guide you through the entire update process
- ✅ Create automatic backups
- ✅ Update framework files (system improvements)
- ✅ Preserve your business files (your work stays safe)
- ✅ Help you merge CLAUDE.md (opens side-by-side diff)
- ✅ Test the update works

**Time**: 5-10 minutes with interactive prompts

**This is the safest and easiest way to update.**

---

### Manual Update (Advanced Users)

If you prefer running Git commands yourself, see [UPDATE_QUICK_REFERENCE.md](UPDATE_QUICK_REFERENCE.md) for step-by-step commands.

**TL;DR**:
1. Backup your work
2. Fetch upstream changes
3. Take framework files (scripts, system docs)
4. Keep your business files (projects, knowledge base)
5. Manually merge CLAUDE.md (framework sections FROM upstream, business sections KEEP local)
6. Test and commit

### Detailed Update Guide

See [PRODUCT_UPDATE_PROTOCOL.md](PRODUCT_UPDATE_PROTOCOL.md) for:
- File classification system (what to update vs. preserve)
- 3-layer architecture (Framework, Config, Hybrid)
- Conflict resolution examples
- Troubleshooting common issues

**Key Principle**: Updates are SAFE because CLAUDE.md uses section markers:
- `<!-- FRAMEWORK SECTION -->` = Take Daron's improvements
- `<!-- CUSTOMER SECTION -->` = Keep your business content

**Result**: You get system upgrades without overwriting your work

---

## Where to Get Support

- **Community**: [Your program community link - Skool, Discord, etc.]
- **Group Calls**: Weekly strategy calls with program members
- **DM**: Direct message support for urgent issues
- **GitHub Issues**: For bugs or feature requests (link if applicable)

**Response Times**:
- Community: Usually within 24 hours (other members may help faster)
- Group calls: Real-time support during scheduled calls
- DM: Best-effort (usually same day for critical issues)

---

## Important Reminders

### This is NOT a Code Repository

- Don't expect `package.json`, `requirements.txt`, or traditional code structure
- Work is **natural language** (strategies, emails, scripts, frameworks)
- Code exists for automation, but it's secondary to business deliverables

### Your Work Stays Local

- Your Git commits don't push to GitHub (Read-only access)
- All your projects, assessments, roadmaps = local to your machine
- Backup: Commit to Git regularly (`git commit -am "End of day backup"`)
- Disaster recovery: Clone to external drive periodically

### Updates Require Active Membership

- One-time purchase = Lifetime access to current version
- Active membership = Ongoing updates and new features
- If membership ends: System still works, but no new updates
- You keep everything you already have

### Customization is Encouraged

- Modify CLAUDE.md for your business workflows
- Add your own scripts to `scripts/` folder
- Create custom commands in `.claude/commands/`
- Change folder structures if needed (you own your deployment)

---

## Next Steps

1. **Read MEMBER_ONBOARDING.md** - Detailed setup walkthrough
2. **Populate AI Growth Engine** - Add your business strategy files
3. **Generate first Daily Roadmap** - See the system in action
4. **Join community** - Connect with other members
5. **Weekly strategic planning** - Establish the habit

---

## License & Terms

- **License**: Proprietary (see LICENSE.md)
- **Terms**: See TERMS_OF_SERVICE.md
- **Access**: Active membership required for updates
- **Support**: Provided through program community

---

**Welcome to Claude Code OS!**

You now have a complete AI-powered business operating system. Use it to execute with clarity, track what works, and compound your knowledge systematically.

Questions? Ask in the community or on your next group call.

Let's build.
