# Cold Email Personalization

**Status**: Active
**Created**: 2025-11-19
**Type**: Tool Build (Marketing/Cold Outreach)

---

## Purpose

Develop a methodology and prompting system to personalize cold emails to prospects, focusing on **subject lines** and **opening lines** while keeping the email body templated.

**Goal**: Balance efficiency with genuine personalization to increase cold email open rates and response rates.

---

## Business Context

### Strategic Alignment
- **Addresses**: #1 business constraint (cold outreach effectiveness)
- **OOBG Relevance**: 95/100 - Directly drives revenue
- **Unique Vehicle Fit**: 90/100 - Leverages AI + systemization
- **Target Avatar**: Professional services firm owners

### Critical Path Project
This project **BLOCKS**:
- Launch Cold Email System (downstream project waiting for this methodology)

Completing this enables full cold email system rollout and unblocks revenue generation.

---

## Deliverables

### 1. Methodology Document
Step-by-step process for personalizing cold emails:
- Research checklist (LinkedIn, company website, news)
- Insight extraction process
- Personalization guidelines
- Quality criteria

**Location**: `methodology/personalization-framework.md`

### 2. AI Prompts
Engineered prompts for generating:
- Personalized subject lines (<50 chars, mobile-optimized)
- Personalized opening lines (1-2 sentences, relevant hook)

**Location**: `prompts/subject-line-prompt.md`, `prompts/opening-line-prompt.md`

### 3. Email Templates
Modular email body templates that pair with personalized openings:
- Value proposition focused
- Clear call-to-action
- Professional tone

**Location**: `templates/cold-email-templates.md`

### 4. Documentation
Usage guides, best practices, examples:
- How to research prospects (5-10 min per prospect)
- How to use prompts effectively
- Quality checklist

**Location**: `methodology/`, `research/`

---

## Key Constraints

### Personalization Scope
- ✅ **Personalize**: Subject line + first/second line (high-impact areas)
- ❌ **Don't Personalize**: Bulk of email body (scalable, consistent messaging)

**Why**: Fully custom emails are too time-intensive. Strategic personalization increases engagement while maintaining outreach velocity.

### Velocity Target
- Research + Personalization: <10 minutes per prospect
- Output: Personalized subject + opening + template body ready to send

---

## Current Status

**Phase**: Email Templates Complete - Ready for Integration
**Last Updated**: 2025-11-25

### Completed Deliverables

#### Email Templates (Full 3-Email Sequence)

| Email | File | Variations | Strategy |
|-------|------|------------|----------|
| **Email 1 Version A** | `Email-1-Version-A-Spintax.md` | 1M+ | Authority gap framing |
| **Email 1 Version B** | `Email-1-Version-B-Spintax.md` | 1M+ | Desire-forward framing |
| **Email 1 Version C** | `Email-1-Version-C-Spintax.md` | 9.5M+ | Fear/frustration framing |
| **Email 2** | `Email-2-Spintax.md` | 486 | Open loop + social proof |
| **Email 3** | `Email-3-Spintax.md` | 708K+ | Teaching/FUD + video |

All templates have corresponding `-All-Variations.md` QA files.

#### Research & Framework
- `Knowledge Report - Lead Gen Jay Cold Email Copywriting Strategy.md`
- `Knowledge Report - Sam McKenna SMYKM Cold Email Strategy.md`
- `Comparative Analysis - Lead Gen Jay vs Sam McKenna.md`
- `INTEGRATION_DECISIONS.md` (hybrid framework)
- `Cold Email Hook Library.md` (40+ opening line patterns)

### Next Actions
1. Import Email 1 templates into Clay (A/B/C test)
2. Configure Smartlead with spintax
3. Set up Email 2 & 3 in sequence (timing per Jay's guidance)
4. Test on initial prospect batch
5. Monitor deliverability & response rates

---

## Folder Structure

```
cold-email-personalization/
├── CLAUDE.md              # Project guidance
├── README.md              # This file
├── methodology/           # Process documentation
├── prompts/               # AI prompt engineering
├── templates/             # Email body templates
└── research/              # Background research, examples
```

---

## Success Metrics

**Effectiveness**:
- Personalized subject lines increase open rates vs. generic subjects
- Opening lines feel relevant and researched (not generic)
- Response rate improvement (baseline TBD)

**Efficiency**:
- Research-to-personalization process: <10 min per prospect
- Reusable across different prospects in professional services niche
- Scalable to 20-50 emails per week

---

## Questions to Answer

1. What subject line patterns work best for professional services firm owners?
2. What opening line hooks create immediate relevance without feeling formulaic?
3. What research sources provide quick, high-value insights? (LinkedIn, company news, etc.)
4. Should we create niche-specific variations? (accounting vs. law vs. consulting)
5. How do we measure effectiveness and iterate?

---

## Getting Started

**To work on this project**:

1. Open this folder in Claude Code for focused context
2. Review CLAUDE.md for full project guidance
3. Start with research phase (collect effective examples)
4. Document findings as you go

**From root workspace**:
- All Active Projects are tracked in `Project Memory/Active Projects Index/`
- Daily roadmaps will surface this as high-priority (critical path blocker)
- Sync indices after major progress to update tracking

---

## Related Projects

- **Launch Cold Email System** (blocked by this project - waiting for methodology)

---

## Progress Log

| Date | Milestone |
|------|-----------|
| 2025-11-19 | Project created, structure set up |
| 2025-11-25 | Knowledge Reports complete (Lead Gen Jay + Sam McKenna) |
| 2025-11-25 | INTEGRATION_DECISIONS.md finalized (Jay + Sam hybrid framework) |
| 2025-11-25 | Email 1 all 3 versions (A/B/C) complete with spintax + QA |
| 2025-11-25 | Email 2 complete: Open loop questions + real testimonials |
| 2025-11-25 | Email 3 complete: Teaching/FUD + video + opt-out |
| 2025-11-25 | **FULL 3-EMAIL SEQUENCE COMPLETE** - Ready for integration |

---

**Last Updated**: 2025-11-25
**Next Review**: After first campaign results
