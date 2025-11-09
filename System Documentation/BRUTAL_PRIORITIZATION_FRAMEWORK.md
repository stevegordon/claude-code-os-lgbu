# Brutal Prioritization Framework - System Documentation

**Version**: 1.0
**Status**: Production
**Created**: 2025-11-02
**Last Updated**: 2025-11-02
**Owner**: Daron Vener (CCGG Business Operations)

---

## Overview

The **Brutal Prioritization Framework** is a ruthless task evaluation system that identifies THE ONE THING Daron should work on each day to maximize strategic impact on his CCGG AI Leaders business. It eliminates low-value work without mercy, focusing energy on the 1-3 tasks that truly advance the One Obsessional Big Goal (OOBG).

**Core Philosophy**: Most tasks are distractions. Only 1-3 tasks per day meaningfully advance OOBG. This framework finds them and kills everything else.

---

## Implementation

**Subagent**: `ruthless-prioritizer` (`.claude/agents/ruthless-prioritizer.md`)
**Triggers**: Natural language OR automatic offer after Daily Roadmap generation
**Integration**: Post-processing layer on Daily Roadmap, standalone usage anytime
**Output**: THE ONE THING + P1/P2/P3 task rankings + KILL list (recommendations)

---

## Source of Truth Hierarchy

### Primary Source: AI Growth Engine Knowledge Base

**These files define strategic truth** (OOBG, Unique Vehicle, avatars, category):

1. **Strategy_for_CCGG_AI_Leaders_Business.md**
   - OOBG (One Obsessional Big Goal): Grow CCGG revenue through category leadership
   - Unique Vehicle: YouTube (traffic engine) + CCGG Paid Community (revenue model)
   - Current strategic priorities
   - Current business bottleneck
   - 2-year vision and milestones

2. **Target_Avatars_Complete_Profiles.md**
   - Avatar pain points and readiness levels
   - Avatar transformation outcomes
   - Which avatars each task serves

3. **CCGG_Play_Bigger_Framework_Clean.md**
   - Category positioning (Lean GPT Business)
   - Category leadership metrics
   - Differentiation from competitors

**Location**: `AI Growth Engine/Knowledge Base/`

### Secondary Source: Current Execution Context

4. **Strategy_for_CCGG_AI_Leaders_Business.md** (execution priorities)
   - Current bottleneck (execution reality vs strategic intent)
   - This month/quarter's priorities
   - Active strategic initiatives

5. **Latest Strategic Planning File**
   - Location: `Project Memory/Strategic Planning/` (most recent YYYY-MM-DD_weekly-plan.md)
   - This week's priorities (tactical execution)
   - Active projects advancing vs. stalled
   - Weekly goals and commitments

### Alignment Validation Protocol

**Before prioritization, validate sources are coherent**:

1. Read AI Growth Engine Strategy file (primary truth)
2. Read Latest Strategic Planning file (execution reality)
3. Compare OOBG, bottleneck, priorities

**If aligned (90%+ match)**: Proceed with prioritization

**If misaligned (conflict detected)**: Flag and request Daron's guidance

**Misalignment Flag Example**:
```
[WARNING] Source Misalignment Detected

AI Growth Engine (last updated: 2025-09-29):
- OOBG: Grow CCGG revenue through category leadership + customer monetization with AI
- Bottleneck: Content creation capacity (need more YouTube videos)
- Priority: Build YouTube traffic engine

Strategic Planning (last updated: 2025-11-01):
- Current focus: Build Claude Code Business OS (infrastructure work)
- Bottleneck: Time consumed by internal tooling
- Priority: Automate operations before scaling content

Conflict: AI Growth Engine emphasizes revenue-generating work (content creation, YouTube growth),
but Strategic Planning focuses on infrastructure (automation, internal tooling).

These conflict on task prioritization:
- Task "Record YouTube video" = high priority per AI Growth Engine (OOBG), low priority per Strategic Planning (infrastructure focus)
- Task "Build automation script" = low priority per AI Growth Engine (not revenue), high priority per Strategic Planning (bottleneck)

Which source should I prioritize for this decision?
A) AI Growth Engine (strategic truth - focus revenue and content)
B) Strategic Planning (execution reality - infrastructure bottleneck must be solved first)
C) Explain context and I'll advise

Awaiting your guidance before proceeding.
```

**After guidance received**: Note decision in output, proceed with chosen source as priority.

---

## Four Evaluation Dimensions

Every task is evaluated across 4 dimensions to calculate a **Priority Score** (0-100):

### 1. Objective Alignment (0-100)

**Question**: How well does this task advance Daron's OOBG?

**OOBG (from AI Growth Engine)**:
- Grow CCGG revenue (monthly recurring + annual upgrades)
- Establish category leadership in "Lean GPT Business"
- Enable coaches/consultants to monetize with AI (customer transformation)

**Scoring Rubric**:

| Score Range | Criteria | Example Tasks |
|-------------|----------|---------------|
| **90-100** | Directly generates revenue OR establishes category leadership OR enables customer monetization with AI | Launch new paid product, publish category-defining YouTube video, create customer success framework |
| **70-89** | Supports revenue goals OR builds Unique Vehicle (YouTube/Community) OR serves target avatars' pain points | YouTube SEO optimization, email nurture sequence, community engagement initiative |
| **50-69** | Tangentially related to OOBG, moderate strategic value | Research competitor strategies, update website copy, organize project files |
| **30-49** | Weak connection to strategic goals, mostly tactical | Admin tasks, minor optimizations, internal documentation |
| **0-29** | No clear connection to OOBG, likely busywork | Personal errands, procrastination tasks, low-impact tweaks |

**Key Questions**:
- Does this make CCGG money (now or soon)?
- Does this position CCGG as the Lean GPT Business leader?
- Does this help coaches/consultants monetize with AI?
- Does this leverage YouTube (traffic) or Paid Community (revenue)?

### 2. Urgency (0-100)

**Question**: How time-sensitive is this task?

**Scoring Rubric**:

| Score Range | Criteria | Example Scenarios |
|-------------|----------|-------------------|
| **90-100** | Hard deadline today OR critical blocker for high-value work OR time-sensitive opportunity (closes soon) | Video must publish today, customer emergency, limited-time partnership offer |
| **70-89** | Deadline within 3 days OR unblocks team/customer OR momentum-dependent | Email sequence launch Friday, course module due this week, follow-up before interest cools |
| **50-69** | Deadline this week OR prevents future urgency if done now | Prepare next week's content, schedule upcoming calls, complete research before strategy meeting |
| **30-49** | Deadline this month OR flexible timing | Monthly report, content calendar update, non-urgent admin |
| **0-29** | No deadline OR "someday maybe" OR self-imposed urgency | Personal learning, speculative research, perfectionism tweaks |

**Key Questions**:
- What happens if this waits 24 hours? 7 days? 30 days?
- Is there a hard external deadline (customer, partner, platform)?
- Does this unblock other high-value work?
- Is this a time-limited opportunity?

### 3. Impact (0-100)

**Question**: What's the potential positive outcome if this succeeds?

**Scoring Rubric**:

| Score Range | Criteria | Example Outcomes |
|-------------|----------|------------------|
| **90-100** | Game-changing for business (10x revenue potential, category-defining, major bottleneck eliminated) | Launch flagship product, viral YouTube video, automate 20 hours/week of work |
| **70-89** | High impact (significant revenue, YouTube growth, community retention, avatar transformation) | New email funnel (+$5K MRR), YouTube video (+10K subscribers), member onboarding system (50% retention lift) |
| **50-69** | Moderate impact (incremental revenue, content performance, operational improvement) | Blog post (traffic boost), LinkedIn engagement (network growth), process documentation (time savings) |
| **30-49** | Low impact (nice-to-have improvement, minor optimization) | Tweak email subject line, update internal doc, small UI change |
| **0-29** | Negligible impact (no measurable business outcome) | Reorganize folders, read article, research tool with no application |

**Key Questions**:
- If this succeeds, what changes for the business?
- How many customers/revenue does this affect?
- Does this solve a bottleneck or create new capacity?
- Is the impact one-time or compounding?

### 4. Effort/Value Ratio

**Question**: Is this a high-value, low-effort win OR a low-value, high-effort grind?

**Evaluation Logic**:

| Effort/Value Profile | Priority Implication | Example Tasks |
|---------------------|----------------------|---------------|
| **High Value (80+ Impact), Low Effort (<2 hours)** | Auto-P1 (quick win) | Send partnership email, publish pre-written content, launch tested product |
| **High Value (70+ Impact), Moderate Effort (2-4 hours)** | P1 candidate (strategic work) | Record YouTube video, write email sequence, build automation script |
| **Moderate Value (50-69 Impact), High Effort (4+ hours)** | P2 unless urgent (consider deferring) | Research new platform, build complex tool, long-form content |
| **Low Value (<50 Impact), Any Effort** | KILL unless urgent deadline | Perfectionism tweaks, speculative research, busywork |

**Key Questions**:
- Can this be done in <2 hours with high impact?
- Is there a simpler way to achieve 80% of the outcome?
- Should this be automated, delegated, or eliminated?

---

## Priority Score Calculation

**Formula**:
```
Priority Score = (Objective Alignment × 0.4) + (Impact × 0.3) + (Urgency × 0.2) + (Effort/Value × 0.1)
```

**Bonuses**:
- **Bottleneck Bonus**: +10 points if task directly addresses current business bottleneck
- **Unique Vehicle Bonus**: +5 points if task leverages YouTube OR Paid Community

**Final Score Range**: 0-115 (with bonuses)

---

## Priority Assignment

### P1 (Must Do Today) - Score 75-100+

**Criteria**:
- Max 3-5 tasks (ideally 3)
- Represents 60-80% of daily effort (4-6 hours of 6-8 hour workday)
- High Objective Alignment (typically 80+)
- Addresses current bottleneck (preferred)
- Urgent deadlines OR high-impact strategic work

**Balance**:
- **1-2 Momentum tasks** (>50% complete from yesterday) - Finish unfinished work
- **1-2 Strategic tasks** (new high-impact work) - Advance OOBG

**Examples**:
- "Finish Magnetic Content OS video script" (95/100) - Addresses content bottleneck, high OOBG, urgent deadline
- "Test automated content pipeline" (88/100) - Addresses bottleneck, high impact, unblocks next steps
- "Send partnership proposal to Dream 100 contact" (82/100) - High revenue potential, low effort, time-sensitive

### P2 (Should Do This Week) - Score 50-74

**Criteria**:
- 5-8 tasks
- Important but not mission-critical
- Can be deferred if P1 tasks demand full capacity
- Schedule for later this week

**Examples**:
- "Update email nurture sequence" (72/100) - Supports revenue, not urgent
- "Write LinkedIn post about AI automation" (65/100) - Builds audience, moderate impact
- "Research new content distribution platform" (58/100) - Exploratory, low urgency

### P3 (Nice to Have) - Score 30-49

**Criteria**:
- 2-4 tasks
- Low strategic value OR distant deadlines
- Defer without guilt if higher priorities exist

**Examples**:
- "Update project documentation" (45/100) - Low OOBG alignment, internal only
- "Read article about GPT trends" (38/100) - Speculative learning, no immediate application

### KILL List - Score 0-29 OR Meets Kill Criteria

**Auto-Kill Criteria**:
1. **Zero OOBG Alignment**: Task has <40% Objective Alignment (no connection to revenue, category leadership, or customer monetization)
2. **Busywork**: Task has no clear, measurable business outcome
3. **Automation Candidates**: Task is repetitive and could be automated with 2 hours of setup
4. **Delegation Candidates**: Task could be done by VA, contractor, or AI agent
5. **Procrastination Tasks**: Task provides comfort/avoidance (e.g., "reorganize files," "research tool X for 3 hours with no decision")
6. **Duplicates**: Task is redundant with another task or recently completed work
7. **Perfectionism**: Task is 80% complete and final 20% adds <5% value
8. **Low-Impact Optimization**: Task optimizes something with negligible business impact (e.g., "tweak font on internal doc")

**Examples**:
- "Reorganize project folders" (18/100) - Zero OOBG, busywork → KILL
- "Research 10 new tools" (22/100) - Low impact, high effort, no decision criteria → KILL
- "Perfect email subject line" (15/100) - Task 80% done, final tweaks add <5% value → KILL

**IMPORTANT**: KILL list is **recommendations only**. Daron reviews and decides final action (drop, defer, or delegate). Never auto-execute kills.

---

## THE ONE THING Identification

**THE ONE THING = The single highest-leverage task for today**

**Selection Criteria**:
1. **Highest P1 score** (ideally 85-100)
2. **Addresses current business bottleneck** (if possible)
3. **High Impact** (70+)
4. **Can be completed today** (realistic time estimate)

**Tiebreaker Logic** (if multiple tasks tied):
1. Favor task addressing current bottleneck
2. Favor task with hard external deadline (urgency)
3. Favor task leveraging Unique Vehicle (YouTube/Community)
4. Favor task with highest Impact score
5. If still tied: Ask Daron which matters more this week

**THE ONE THING Philosophy**:
> "What's the ONE task that, if completed today, makes everything else easier or unnecessary?"

**Execution**: THE ONE THING gets morning deep work (peak energy). Everything else is secondary.

---

## Usage Workflows

### Workflow 1: Integrated with Daily Roadmap (Systematic)

**Trigger**: After Daily Roadmap generated (Step 5 of Daily Roadmap workflow)

**Process**:
1. Daily Roadmap generated with **hybrid structure** (Dependency Sections + DER Tiers):
   - 🎯 Quick View (THE ONE THING placeholder, TODAY'S FOCUS, DEPENDENCY SUMMARY, Daily Disciplines)
   - ⚡ READY TO START (Tier 1 Momentum + Tier 2 Strategic tasks with no blockers)
   - 🚧 BLOCKED (Tasks waiting on dependencies)
   - 🔄 PARALLEL (Connected but not blocking)
   - 📊 FULL DEPENDENCY SUMMARY
   - TIER 3: DAILY DISCIPLINES
2. Claude offers: "Daily roadmap created. Should I apply brutal prioritization to identify THE ONE THING?"
3. **If YES**:
   - Claude invokes ruthless-prioritizer subagent via Task tool
   - Subagent reads AI Growth Engine KB + Strategy file + Strategic Planning
   - Subagent validates source alignment (flags conflicts if detected)
   - Subagent evaluates each roadmap task (4 dimensions, priority score)
   - **NEW: Checks dependency status for each task** (READY vs BLOCKED)
   - Subagent assigns P1/P2/P3 priorities, identifies KILL list
   - Subagent identifies THE ONE THING (highest P1, addresses bottleneck)
     - **If THE ONE THING is BLOCKED**: Surfaces blocker, recommends unblock strategy, identifies Alternative THE ONE THING (highest P1 that's READY TO START)
     - **If THE ONE THING is READY**: Annotates with ✅ READY TO START, provides execution plan
   - Subagent adds 🎯 P1/P2/P3 annotations to each task in READY/BLOCKED/PARALLEL sections (additive overlays)
   - Subagent fills Quick View section (THE ONE THING details, TODAY'S FOCUS P1 list)
   - Subagent appends full BRUTAL PRIORITIZATION APPLIED section with P1/P2/P3/KILL details
   - Claude reports: "Brutal prioritization complete. THE ONE THING: [task name] [READY or BLOCKED status]"
4. **If NO**: Skip, roadmap stands as-is with dependency sections + DER tiers

**Output**: Roadmap file now contains (hybrid structure):
- 🎯 **Quick View** (top 50 lines): THE ONE THING (with dependency status), TODAY'S FOCUS (P1), DEPENDENCY SUMMARY, Daily Disciplines
- **Dependency Sections**: READY TO START, BLOCKED, PARALLEL (with 🎯 P1/P2/P3 annotations on each task)
- **DER Tiers**: Tier 1/Tier 2 sub-grouping within READY TO START, Tier 3 Daily Disciplines preserved
- **Brutal Priorities Overlay**: P1/P2/P3 annotations additive (not replacement)
- **Full Details** (below Quick View): P1/P2/P3/KILL sections, Execution Guidance, Strategic Insights

**Key Integration**: Three systems work together seamlessly:
- **Dependencies**: "Can I start this?" (blockers removed?)
- **DER Tiers**: "Should I start this?" (momentum vs strategic priority)
- **Brutal Priorities**: "Must I start this today?" (urgency and OOBG alignment)

**Frequency**: Daily (systematic offer every time roadmap generated)

### Workflow 2: Standalone Usage (Manual Trigger)

**Trigger**: Natural language from any context in CCGG Business Operations

**Examples**:
- "Apply brutal prioritization"
- "Ruthless prioritize my tasks"
- "Identify THE ONE THING for today"
- "What should I kill from my task list?"

**Process**:
1. Daron provides task list (in message or references file)
2. Claude invokes ruthless-prioritizer subagent
3. Subagent reads AI Growth Engine KB + Strategy file + Strategic Planning
4. Subagent validates source alignment
5. Subagent evaluates tasks, assigns priorities, identifies THE ONE THING + KILL list
6. Claude outputs brutal priorities (standalone, not appended to file)

**Use Cases**:
- **Task overwhelm**: "I have 20 tasks, help me focus"
- **Strategic clarity**: "Are these tasks aligned with OOBG?"
- **Weekly validation**: "Review my planned tasks for the week, what should I kill?"

### Workflow 3: Integration with Productivity Assessment

**Trigger**: At end of day, during productivity assessment

**Process**:
1. Productivity Assessment generated (daily or weekly)
2. If brutal priorities were applied today, reference them:
   - "Did you complete THE ONE THING?" (key success metric)
   - "P1 completion rate: X/3 tasks" (focus measure)
   - "KILL list review: Did you drop recommended tasks?" (discipline measure)

**Benefit**: Productivity scores reflect adherence to brutal priorities, not just activity volume.

### Workflow 4: Integration with Strategic Planning

**Trigger**: During weekly strategic planning review

**Process**:
1. Strategic Planning workflow runs (challenge & consolidate priorities)
2. Apply brutal prioritization to proposed weekly priorities:
   - "Are your P1 tasks actually aligned with OOBG?"
   - "Which of these 10 priorities should be P1 (3-5 max) vs P2/P3?"
   - "What should be on the KILL list?"

**Benefit**: Weekly priorities are validated against OOBG before committing, preventing strategic drift.

---

## Example Output Format

**Appended to Daily Roadmap** (or standalone output):

```markdown
---

## BRUTAL PRIORITIZATION APPLIED

### Source Validation
✅ AI Growth Engine Knowledge Base (OOBG, Unique Vehicle, avatars, category)
✅ Strategic Planning File (bottleneck, weekly priorities)
✅ Alignment confirmed (sources coherent)

### Strategic Context
- **OOBG**: Grow CCGG revenue through category leadership + customer monetization with AI
- **Current Bottleneck**: Content creation capacity (need more YouTube videos to drive traffic)
- **Unique Vehicle Focus**: YouTube (traffic engine) + CCGG Paid Community (revenue model)
- **Target Avatar**: Reluctant Coach (needs proven systems, low technical confidence)

---

## THE ONE THING 🎯

**Finish Magnetic Content OS Video Script** (Original tier: Tier 1 Momentum)

**Why This Is THE ONE THING**:
- **OOBG Alignment**: 95/100 - Directly advances YouTube growth (Unique Vehicle traffic engine) + demonstrates customer monetization with AI (OOBG core)
- **Bottleneck Impact**: Eliminates content creation bottleneck by showcasing automation framework that scales video production
- **Unique Vehicle Leverage**: YouTube video drives traffic + promotes CCGG Paid Community membership (revenue model)
- **Avatar Served**: Reluctant Coach (demonstrates proven AI system for content creation, addresses low technical confidence)
- **Impact**: 10K+ video views, 100+ new CCGG leads, category-defining content (positions CCGG as Lean GPT Business leader)

**Execution Plan**:
- **Time Estimate**: 3 hours (Schedule: Morning deep work, 8-11am peak energy)
- **Success Criteria**: Full video script complete (hook, framework explanation, demo, CTA), ready for recording
- **Next Actions**:
  1. Review yesterday's draft (context: 70% complete, needs demo section + CTA)
  2. Write demo section (show Magnetic Content OS in action, 10-min walkthrough)
  3. Craft CTA (join CCGG for full framework + implementation support)

**Priority Score**: 95/100 (Objective: 95, Impact: 90, Urgency: 60, Effort/Value: High-value/Low-effort) + Bottleneck Bonus: +10

---

## P1 Tasks (Must Do Today - 3 tasks total, 6 hours)

### 1. ✅ THE ONE THING (above)

### 2. Test Automated Content Pipeline - Tier 2 Strategic
- **OOBG Alignment**: 88/100 - Addresses content bottleneck (automation enables 10x output), demonstrates Lean GPT Business approach
- **Urgency**: 70/100 - Needed for next week's video production cycle
- **Impact**: 85/100 - If successful, reduces video production time by 50% (20 hours/week → 10 hours/week)
- **Time Estimate**: 2 hours (Morning or afternoon)
- **Priority Score**: 88/100
- **Next Actions**: Run full pipeline test (input → research → outline → script draft), validate output quality, document issues

### 3. Send Partnership Proposal to Dream 100 Contact - Tier 2 Strategic
- **OOBG Alignment**: 85/100 - High revenue potential (partnership could add $10K MRR), category positioning opportunity
- **Urgency**: 75/100 - Follow-up window closes this week (momentum from last week's intro call)
- **Impact**: 80/100 - If successful, unlocks new revenue stream + category co-leadership
- **Time Estimate**: 1 hour (Low-effort, high-value)
- **Priority Score**: 82/100 + Unique Vehicle Bonus: +5 (partnership promotes CCGG Community)
- **Next Actions**: Draft proposal (value prop, revenue share model, timeline), send via email, schedule follow-up call

**P1 Total Time**: 6 hours (Realistic for today: ✅ Yes - fits within 6-8 hour workday)

---

## P2 Tasks (Should Do This Week - 5 tasks)

1. **Update Email Nurture Sequence** (Score: 72/100) - Supports revenue (email funnel optimization), not urgent
2. **Write LinkedIn Post: AI Automation for Coaches** (Score: 68/100) - Builds audience, moderate impact
3. **Review Active Projects Index (Sync if Needed)** (Score: 65/100) - Operational maintenance, low urgency
4. **Schedule Q4 Content Calendar Planning** (Score: 58/100) - Important but can wait until next week
5. **Research New Content Distribution Platform** (Score: 54/100) - Exploratory, low OOBG alignment

---

## P3 Tasks (Nice to Have - Defer if Needed)

1. **Update Project Documentation** (Score: 45/100) - Low OOBG alignment, internal only
2. **Read Article: GPT-4 Trends** (Score: 38/100) - Speculative learning, no immediate application

---

## KILL List (Recommend Dropping - You Review & Decide)

❌ **Reorganize Project Folders** (Score: 18/100)
   - **Why Kill**: 0% OOBG alignment, busywork with no strategic outcome, perfectionism disguised as productivity
   - **Alternative**: Eliminate entirely (folder structure is functional, reorganization adds zero business value)

❌ **Research 10 New AI Tools** (Score: 22/100)
   - **Why Kill**: Low impact (speculative research), high effort (3+ hours with no decision criteria), procrastination risk
   - **Alternative**: Defer to P3 for next month OR set decision criteria first ("I need tool that solves X problem, budget $Y, must integrate with Z")

❌ **Perfect Email Subject Line** (Score: 15/100)
   - **Why Kill**: Email is 80% complete, final subject line tweaks add <5% value (perfectionism), diminishing returns
   - **Alternative**: Ship current version, A/B test subject lines in next campaign (data-driven optimization vs. speculation)

**Note**: These are RECOMMENDATIONS. Review each and decide whether to drop, defer, or delegate. Do NOT auto-execute kills.

---

## Execution Guidance

### Daily Disciplines (Tier 3 from Roadmap)
- **Status**: Preserved from roadmap (Outreach, Dream 100, LinkedIn, Email nurture - 90-120 min)
- **Recommendation**: Complete AFTER P1 tasks OR during low-energy windows (afternoon slump, evening wind-down)

### Capacity Check
- **Total P1 Time**: 6 hours (THE ONE THING: 3h, Test Pipeline: 2h, Partnership Proposal: 1h)
- **Daily Disciplines**: ~90 min
- **Buffer for breaks/interruptions**: ~60 min
- **Total**: 8.5 hours / 6-8 hour workday
- **Assessment**: ⚠️ Slightly over capacity - Consider deferring P1 Task #3 (Partnership Proposal) to tomorrow if THE ONE THING + Pipeline Test run long

### Energy Optimization
- **Morning (8-11am, Peak Energy)**: THE ONE THING (video script) - Deep work, high complexity
- **Late Morning (11am-12pm)**: Test Pipeline - Strategic work, moderate complexity
- **Afternoon (1-3pm, Medium Energy)**: Partnership Proposal - Important but low-effort
- **Late Afternoon (3-5pm, Low Energy)**: Daily Disciplines (administrative, routine tasks)
- **Evening (optional)**: P2 tasks if energy permits (LinkedIn post, email sequence update)

---

## Strategic Insights

**Pattern Recognition**:
- **Content Creation Bottleneck**: 2 of your 3 P1 tasks focus on content (video script, automated pipeline). This confirms content creation is your primary strategic focus this week. Good alignment with OOBG (YouTube = Unique Vehicle).

**Recommendations**:
- **Batch Similar Tasks**: Video script + pipeline test are both content-related. Consider batching these for reduced context switching (morning block: 8am-12pm, both tasks back-to-back).
- **Partnership Follow-Up**: Task #3 (partnership proposal) is high-value, low-effort. If THE ONE THING + pipeline test complete early, execute this SAME DAY (momentum window closes).

---

**Brutal Prioritization Complete**. Focus on THE ONE THING first. Everything else is secondary.
```

---

## Key Behaviors & Guidelines

### For Ruthless Prioritizer Subagent

**Ruthless, Not Rude**:
- Be direct and honest about task value, but respectful
- Example: "This task has low OOBG alignment (22/100). Consider dropping or deferring." NOT "This is a waste of time."

**Justify Every Score**:
- Every Objective Alignment, Urgency, Impact score must include brief reasoning
- Example: "Objective Alignment: 88/100 - Directly advances YouTube growth (Unique Vehicle) and serves Reluctant Coach avatar (high-value segment)"

**Default to Elimination**:
- When in doubt about task value, recommend KILL or defer
- Better to do 3 tasks excellently than 10 tasks poorly
- "No" protects "Yes" - killing low-value work creates capacity for high-value work

**Highlight Bottleneck Work**:
- Current bottleneck is THE strategic focus
- Any task addressing bottleneck gets bonus points (+10) and extra visibility in output
- If no tasks address bottleneck: "⚠️ No tasks address current bottleneck ([X]). Should this week's priorities shift?"

**Flag Strategic Drift**:
- If 3+ consecutive P1 tasks have <70% OOBG alignment over multiple days: "⚠️ Strategic drift detected. Recent priorities averaging 65% OOBG alignment. Recommend reviewing Strategy file and weekly planning."

### For Daron (Usage Guidelines)

**Trust the KILL List**:
- If subagent recommends KILL, there's likely a good reason (low OOBG, busywork, perfectionism)
- Review reasoning, challenge if disagree, but default to "drop it"

**THE ONE THING is Sacred**:
- Start every day with THE ONE THING (morning deep work)
- If THE ONE THING doesn't get done, day is a strategic failure (even if 10 P2 tasks completed)

**P1 Limits are Non-Negotiable**:
- Max 3-5 P1 tasks per day (ideally 3)
- If you have 10 "urgent" tasks, 7 are actually P2/P3 (or should be KILLED)
- Ruthless prioritization exists to enforce these limits

**Source Conflicts Require Your Judgment**:
- If AI Growth Engine contradicts Strategy file, you decide which source to prioritize
- Strategic truth (AI Growth Engine) vs execution reality (Strategy file) - both have validity in context

---

## Integration Points

### Daily Roadmap
- Brutal prioritization applied as **optional Step 6** after roadmap generation
- Appends brutal priorities section to same roadmap file
- Does NOT replace 4-tier structure, adds strategic lens on top

### Productivity Assessment
- Reference brutal priorities when scoring OOBG alignment
- "Did you complete THE ONE THING?" = key success metric
- P1 completion rate measures focus (not just activity volume)

### Strategic Planning
- Use brutal prioritization to validate weekly priorities
- "Are your P1 tasks aligned with OOBG?"
- "What should be KILLED from this week's plan?"

### Standalone Usage
- Trigger anytime from any context in CCGG Business Operations
- Provide task list, get THE ONE THING + priorities + KILL list
- No file modification required (output displayed in conversation)

---

## Success Metrics

**System-Level Success**:
- ✅ THE ONE THING identified every time (clear, actionable, high-leverage)
- ✅ OOBG alignment scores visible (0-100 scale for all tasks)
- ✅ Current bottleneck explicitly addressed in priorities
- ✅ Low-value tasks identified and recommended for elimination
- ✅ Zero interference with existing workflows (Daily Roadmap, Productivity Assessment)

**User-Level Success** (Daron's Experience):
- ✅ Morning clarity: "I know exactly what to work on first"
- ✅ Reduced task overwhelm: "KILL list eliminates 30-40% of busywork"
- ✅ Strategic confidence: "My P1 tasks actually advance OOBG"
- ✅ Bottleneck progress: "Current bottleneck addressed daily"
- ✅ Energy optimization: "High-impact work during peak energy"

---

## Troubleshooting

### Issue: "All tasks score <75 (no P1 candidates)"

**Cause**: Task list lacks strategic focus OR current priorities misaligned with OOBG

**Solution**:
1. Subagent lowers P1 threshold to 65-74 for top 1-3 tasks (relaxed P1)
2. Subagent flags: "⚠️ No tasks scored P1 threshold (75+). Top tasks in 65-74 range. Possible reasons: (1) Task list lacks strategic focus, (2) Current priorities misaligned with OOBG, (3) Need new high-leverage opportunities. Should we review strategic planning?"
3. Daron reviews: Are these tasks truly important? Or should I generate new high-OOBG tasks?

### Issue: "All tasks flagged as urgent (80+ urgency)"

**Cause**: Chronic reactive mode, lack of proactive planning, over-commitment

**Solution**:
1. Subagent prioritizes anyway using Objective Alignment + Impact as tiebreakers
2. Subagent flags: "⚠️ All tasks flagged as urgent. This suggests: (1) Chronic reactive mode, (2) Lack of proactive planning, (3) Over-commitment. Recommend weekly strategic planning to reduce urgency dependency."
3. Daron reviews weekly planning: Are these real deadlines or self-imposed urgency?

### Issue: "THE ONE THING is unclear (multiple tasks tied)"

**Cause**: Multiple high-priority tasks with similar scores

**Solution**: Apply tiebreaker logic:
1. Favor task addressing current bottleneck
2. Favor task with hard external deadline (urgency)
3. Favor task leveraging Unique Vehicle (YouTube/Community)
4. Favor task with highest Impact score
5. If still tied: Ask Daron which matters more this week

### Issue: "Daron keeps tasks flagged for KILL"

**Cause**: Hidden strategic value, emotional priority, or commitment to customer that subagent missed

**Solution**:
1. Subagent asks: "I recommended KILL for [task]. You kept it. Can you explain why? I may have missed strategic context."
2. Daron explains reasoning
3. Subagent updates logic for future evaluations (learn from Daron's judgment)

---

## Version History

**v1.0 (2025-11-02)**: Initial production release
- Ruthless prioritizer subagent created
- Integrated with Daily Roadmap (Step 6 auto-offer)
- Standalone usage enabled (natural language triggers)
- Source of truth hierarchy defined (AI Growth Engine > Strategy file)
- Alignment validation protocol implemented
- 4-dimension evaluation (Objective Alignment, Urgency, Impact, Effort/Value)
- P1/P2/P3 priority assignment + KILL list
- THE ONE THING identification logic
- Documentation complete

---

## Future Enhancements

**Potential Phase 2+ Improvements** (Not Yet Implemented):

1. **Historical Pattern Recognition**: "Your last 10 THE ONE THING tasks focused on content. Is this pattern intentional?"
2. **KILL List Compliance Tracking**: "You've deferred 5 consecutive KILL recommendations. Review decision criteria?"
3. **Bottleneck Progress Metrics**: "Content bottleneck addressed in 8/10 days this month. Bottleneck resolving?"
4. **Cross-Project Synergy Detection**: "3 P1 tasks this week relate to Magnetic Content OS. Consider batching?"
5. **Predictive THE ONE THING**: "Based on last 4 weeks, tomorrow's THE ONE THING is likely [X]"

**Tracking**: Add to `Project Memory/Daily Planning/PHASE_UPGRADES_TRACKER.md` if/when enhancements validated.

---

## Integration with Three-System Architecture

**Design Decision** (2025-11-02): After analyzing potential conflicts between Daily Execution Roadmap, Task Dependency System, and Brutal Prioritization Framework, we confirmed all three systems integrate seamlessly.

### Issue 1: Dual Tier Systems (DER Tiers vs Brutal Priorities)

**Solution Implemented**: Brutal priorit priority annotations are **ADDITIVE, not replacement**. DER tiers stay. Brutal priorities clarify urgency within tiers.

**Format**:
```markdown
### Tier 2: Strategic Priorities (High OOBG Alignment) ← DER classification

- [ ] 🎯 **P1: Test Automated Content Pipeline** [2 hours] [OOBG: 88/100] ← Brutal Priority overlay
  - Phase: Foundation
  - Next: Run full pipeline test, validate output quality
```

**Rationale**: Each system provides complementary information without conflict.

---

### Issue 2: Dependency Sections vs DER Tiers

**Solution Implemented**: Hybrid structure (Option A) - Both systems maintained coherently:

1. **Top Level**: Dependency sections (READY TO START, BLOCKED, PARALLEL) - Groups tasks by execution readiness
2. **Within READY TO START**: Tier 1 (Momentum) + Tier 2 (Strategic) sub-grouping - Prioritizes by completion status and strategic value
3. **Brutal Priority Overlay**: 🎯 P1/P2/P3 annotations on each task (additive, not replacement) - Clarifies urgency within tiers

**Example**:
```markdown
## ⚡ READY TO START (All Dependencies Met)

### Tier 1: Momentum Work
- [ ] 🎯 **P1: Finalize Pricing Model** [80% complete] [OOBG: 95/100]

### Tier 2: Strategic Priorities
- [ ] 🎯 **P1: Test Automated Pipeline** [OOBG: 88/100]
- [ ] **P2: Send Partnership Proposal** [OOBG: 85/100]
```

**Rationale**: Preserves both frameworks without conflict. User sees:
- **Dependency status** (can I start?)
- **DER tier** (should I start? - momentum vs strategic)
- **Brutal priority** (must I start today? - urgency)

---

### Issue 3: THE ONE THING vs Dependency READY TO START

**Solution Implemented**: Dependency-aware THE ONE THING logic.

**If THE ONE THING is BLOCKED**:
```markdown
## THE ONE THING 🎯

**Update CCGG Onboarding** (Original tier: Tier 2 Strategic)

⚠️ **DEPENDENCY STATUS: BLOCKED**
- **Blocked by**: Pricing Model (80% complete, est. 2-3 hours)
- **Unblock Strategy**: Complete Pricing Model FIRST (morning deep work), then pivot to THE ONE THING

---

### ALTERNATIVE THE ONE THING (Ready to Start)

**Finalize Pricing Model** (Score: 88/100)
- **Why This Is Alternative**: Highest P1 score among READY TO START tasks
- **Strategic Value**: Addresses bottleneck + unblocks 5 downstream tasks (including THE ONE THING above)
- **Execution**: Start now (morning deep work), complete before lunch
```

**Rationale**: User always has clear execution path. If THE ONE THING blocked, surface blocker + Alternative THE ONE THING (ready to start now).

---

### Issue 4: Capacity Overload (Three Systems = Verbose Output)

**Solution Implemented**: Progressive disclosure via Quick View.

**Quick View Section** (Top 50 lines - 3-5 min scan):
```markdown
## 🎯 QUICK VIEW (Start Here)

### THE ONE THING
[Task] [X hours] [OOBG: XX/100] [P1] [Dependency Status: ✅ or ⚠️]

### TODAY'S FOCUS (P1 - 3 tasks, 6 hours)
1. ✅ THE ONE THING
2. [Task 2]
3. [Task 3]

### DEPENDENCY SUMMARY
- Blocking Tasks: X
- Blocked Tasks: Y
- Critical Path: [Task]

### Daily Disciplines [90-120 min]
- [ ] Outreach
- [ ] Dream 100
- [ ] LinkedIn
- [ ] Email nurture
```

**Full Details Below** (Expandable):
- READY TO START (full context)
- BLOCKED (full context)
- PARALLEL (full context)
- P2/P3/KILL lists
- Strategic Insights

**Rationale**: User scans Quick View in 3-5 min, knows exactly what to work on. Expands details as needed.

---

### Integration Summary

**Three systems work together seamlessly**:

| System | Question Answered | Output | Conflicts? |
|--------|-------------------|--------|------------|
| **Task Dependency System** | "Can I start this?" | READY/BLOCKED/PARALLEL sections | ❌ No - groups tasks by readiness |
| **DER Tiers** | "Should I start this?" | Tier 1 (Momentum) + Tier 2 (Strategic) sub-grouping | ❌ No - prioritizes within READY section |
| **Brutal Prioritization** | "Must I start this today?" | 🎯 P1/P2/P3 annotations + THE ONE THING | ❌ No - additive overlay, clarifies urgency |

**User Experience**: Scan Quick View (3-5 min) → Know THE ONE THING + P1 focus → Execute. Expand details as needed.

**Total Roadmap Length**: 50 lines (Quick View) + 150-200 lines (Full Details) = 200-250 lines maximum.

---

**End of Documentation**

For implementation details, see `.claude/agents/ruthless-prioritizer.md` (subagent system prompt).
For workflow integration, see root `CLAUDE.md` ("As Needed: Apply Brutal Prioritization Framework" section).
For daily roadmap structure, see `Project Memory/Daily Planning/DAILY_PLANNING_SYSTEM.md` (hybrid structure details).
For roadmap template, see `Project Memory/Daily Planning/ROADMAP_TEMPLATE.md` (progressive disclosure format).
For asset tracking, see `System Documentation/SYSTEM_ASSET_REGISTRY.md` (ruthless-prioritizer subagent entry).
