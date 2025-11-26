# CLAUDE.md - Cold Email Personalization Project

This file provides guidance to Claude Code when working in this project.

**Project Type**: Tool Build (Marketing/Cold Outreach)
**Primary Work**: Methodology development, AI prompt engineering, documentation
**Code Usage**: May include automation scripts for testing prompts or processing prospect data

---

## PROJECT OVERVIEW

**Purpose**: Develop a methodology and prompting system to personalize cold emails to prospects.

**Business Context**:
- Addresses our #1 business constraint (cold outreach effectiveness)
- High strategic alignment - directly impacts revenue generation
- Target Avatar: Professional services firm owners

**Key Constraint**:
We're optimizing for **efficiency + personalization balance**:
- Personalize: Subject line + first/second line (high-impact areas)
- Template: Bulk of email body (scalable, consistent messaging)

This is NOT about fully custom emails (too time-intensive). This IS about strategic personalization that increases open rates and engagement while maintaining outreach velocity.

---

## PROJECT GOALS

### Primary Deliverables
1. **Methodology Document**: Step-by-step process for personalizing cold emails
2. **AI Prompts**: One or more engineered prompts that generate personalized subject lines + opening lines
3. **Documentation**: Usage guides, best practices, examples
4. **Templates**: Email body templates that work with personalized openings

### Success Criteria
- Personalized subject lines that increase open rates vs. generic subjects
- Personalized opening lines that feel relevant and researched
- Process is fast enough to support outreach velocity (target: <2 min per prospect)
- Reusable across different prospect types within professional services niche

---

## FOLDER STRUCTURE

```
cold-email-personalization/
├── CLAUDE.md              # This file - project guidance
├── README.md              # Project overview and status
├── methodology/           # Process documentation
│   ├── personalization-framework.md
│   └── research-process.md
├── prompts/               # AI prompt engineering
│   ├── subject-line-prompt.md
│   ├── opening-line-prompt.md
│   └── prompt-testing-log.md
├── templates/             # Email body templates
│   └── cold-email-templates.md
└── research/              # Background research, examples, analysis
    ├── effective-examples.md
    └── prospect-intel-sources.md
```

---

## DEPENDENCIES

### Blocking Dependencies (This project blocks):
- **Launch Cold Email System** (downstream project waiting for this methodology)

### Dependencies (This project needs):
- None currently - this is foundational work

**Dependency Impact**: Completing this project unblocks the full cold email system launch. This is on the **critical path** for revenue generation.

---

## WORKFLOW GUIDANCE

### When Creating Methodology
1. **Research effective cold email personalization**:
   - What makes a subject line stand out?
   - What opening lines create immediate relevance?
   - What data sources can be researched quickly? (LinkedIn, company website, recent news)

2. **Define research-to-personalization process**:
   - Input: Prospect data (name, company, role, industry)
   - Process: Quick research steps (5-10 min max)
   - Output: Personalized subject + opening line

3. **Test and iterate**:
   - Create 10-20 examples
   - Identify patterns in what works
   - Refine methodology

### When Engineering Prompts
1. **Start with clear constraints**:
   - Input format: Prospect data fields
   - Output format: Subject line (X chars max) + Opening line (1-2 sentences)
   - Tone: Professional, relevant, not salesy

2. **Test with real prospect data**:
   - Use actual professional services firm owners
   - Evaluate: Does this feel personalized? Would I open this?

3. **Iterate based on output quality**:
   - Log prompt versions in `prompts/prompt-testing-log.md`
   - Track what changes improve output

### When Creating Templates
1. **Design email body for modularity**:
   - Opening line hooks seamlessly into body
   - Body focuses on value proposition (not prospect-specific)
   - Call-to-action is clear and low-friction

2. **Test full email assembly**:
   - Personalized subject + opening + template body
   - Read as a whole - does it flow naturally?

---

## BEST PRACTICES

### Personalization Research
- **LinkedIn**: Job title, recent posts, company updates
- **Company Website**: Recent news, product launches, growth signals
- **Google News**: Company mentions, industry trends
- **Trade Publications**: Industry-specific insights

### Subject Line Principles
- Keep under 50 characters (mobile optimization)
- Reference specific, recent, or relevant detail
- Avoid spam triggers ("free", "urgent", "limited time")
- Test: Would YOU open this if you were the prospect?

### Opening Line Principles
- Reference the research insight from subject line
- Connect insight to prospect's likely goal/pain point
- Transition naturally into value proposition
- Avoid: "I noticed you...", "I saw that you..." (overused patterns)

### Velocity Optimization
- Create research checklist (limit to 3-5 quick sources)
- Timebox research to 5-10 minutes per prospect
- Batch research when possible (e.g., 5 prospects at once)
- Use AI to speed up insight synthesis from research

---

## STRATEGIC CONTEXT

### Why This Matters
Cold email is the primary customer acquisition channel. Generic emails get ignored. Personalized emails get opened and replied to. This project directly addresses the #1 business constraint (getting in front of qualified prospects).

### Strategic Alignment
- **OOBG Relevance**: 95/100 - Directly drives revenue through improved cold outreach
- **Unique Vehicle Fit**: 90/100 - Leverages AI + systemization (our core strengths)
- **Avatar Targeting**: Professional services firm owners (exact match)

### Bottleneck Solver
If current bottleneck is "not enough qualified conversations", this project removes that bottleneck by increasing cold email response rates.

---

## NEXT ACTIONS (When Starting Work)

1. **Research Phase**:
   - Collect 20-30 examples of effective cold emails (especially subject lines)
   - Analyze what makes them work
   - Document patterns in `research/effective-examples.md`

2. **Methodology Phase**:
   - Define step-by-step research process
   - Document in `methodology/personalization-framework.md`
   - Test on 5-10 real prospects

3. **Prompt Engineering Phase**:
   - Create initial subject line prompt
   - Create initial opening line prompt
   - Test with real prospect data
   - Iterate based on quality

4. **Integration Phase**:
   - Create email body templates
   - Test full email assembly
   - Document usage guide

5. **Validation Phase**:
   - Create 20-30 full personalized emails
   - Review for quality, flow, relevance
   - Refine methodology/prompts as needed

---

## AUTOMATION & ORCHESTRATION

When automating processes in this project:
- **Default to LLM sub-agents** for: Analyzing effective examples, drafting methodology, engineering prompts, generating personalized emails from prospect data
- **Use code/scripts** for: Batch processing prospect data, automating research data collection (web scraping LinkedIn/company sites if needed), testing prompt variations at scale

**Examples**:
- LLM sub-agent: "Analyze these 20 cold email examples and identify patterns in effective personalization"
- Code/script: Python script to scrape LinkedIn profiles and extract job title, recent posts, company info
- LLM sub-agent: "Given this prospect data, generate a personalized subject line and opening line"

---

## QUESTIONS FOR FUTURE DEVELOPMENT

- Should we create different prompt variations for different professional services niches? (accounting vs. law vs. consulting)
- Can we integrate with CRM to pull prospect data automatically?
- Should we create a GPT/Claude Project for this, or keep as prompt templates?
- How do we measure effectiveness? (open rates, reply rates, meeting bookings)

---

**Your role when working in this project**: Help develop a scalable, effective cold email personalization system that balances efficiency with genuine personalization, directly addressing our #1 business constraint.
