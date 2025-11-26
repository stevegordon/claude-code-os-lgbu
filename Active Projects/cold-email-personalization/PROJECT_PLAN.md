# Cold Email Personalization System - Project Plan

**Date Created**: 2025-11-19
**Project Status**: Phase 1 - Foundation (In Progress)
**Current Focus**: Vertical Research Brief System, Lead Data Quality & Batching, Copywriting, Personalization/Spintax

---

## PROJECT OVERVIEW

**Objective**: Build a complete, operationalized cold email system combining Lead Gen Jay's high-volume deliverability-first approach with strategic Sam McKenna enhancements (hidden objections, 3-layer research, super funky subject lines, loss-aversion framing, teaching/FUD).

**Target Output**: 500-2000 high-quality cold emails/day across multiple verticals with 5-8% reply rate, 2-3% opportunity rate

**Methodology**: Lead Gen Jay (primary) + Sam McKenna (strategic enhancements)

---

## RECOMMENDED BUILD SEQUENCE (Logical Dependencies)

### **PHASE 1: FOUNDATION (Infrastructure & Data)**

#### **Component 1: Deliverability & Technical Setup** ✅ COMPLETE
*Status: Already done for initial test case business*
- [ ] Domain setup (sending domains configured)
- [ ] SPF/DKIM/DMARC records configured
- [ ] Email warmup completed (gradual volume ramp)
- [ ] Spam testing process established
- [ ] Bounce rate monitoring (<5% threshold)
- [ ] Spam complaint tracking (<0.3% threshold)

**Deliverable**: Domains warmed and ready to send

---

#### **Component 2: Lead Data Quality & Batching System** 🔄 IN PROGRESS (Priority This Week)
*Status: In progress - needed before copywriting*
- [ ] Define ICP (Ideal Customer Profile) for first vertical
  - [ ] Job titles to target
  - [ ] Company size range
  - [ ] Industry/vertical focus
  - [ ] Geographic targeting (if any)
- [ ] Establish lead filtering criteria
  - [ ] Growth signals (hiring, funding, expansion)
  - [ ] Buying triggers (what makes them ready to buy?)
- [ ] Create data cleaning protocols
  - [ ] Remove LLC/Inc/Corp from company names
  - [ ] Standardize job titles
  - [ ] Fix capitalization (no ALL CAPS)
  - [ ] Verify email format
- [ ] Build lead batching system
  - [ ] Group by vertical + persona
  - [ ] Create batched lists (e.g., "CFOs in Financial Services 50-500 employees")
- [ ] Set up list hygiene process
  - [ ] Email verification tool (ZeroBounce, NeverBounce)
  - [ ] Suppression list (people who opted out)
  - [ ] Bounce tracking and removal

**Deliverable**: Clean, batched lead lists ready for first campaign (100-200 prospects per vertical)

**Time Estimate**: 4-6 hours for first vertical

---

#### **Component 3: Vertical Research Brief System** 🔄 IN PROGRESS (Priority This Week)
*Status: In progress - informs copywriting*
- [ ] Create Vertical Research Brief template
  - [ ] Layer 1: The Human (persona research)
  - [ ] Layer 2: The Company (vertical-wide patterns)
  - [ ] Layer 3: The Space/Vertical (trends, regulations)
  - [ ] Layer 4: Hidden Objection (vertical-specific)
- [ ] Build research source checklist
  - [ ] Persona pain points sources (job descriptions, LinkedIn, forums)
  - [ ] Industry trend sources (Gartner, Forrester, news)
  - [ ] FUD stat sources (industry reports, breach data)
- [ ] Create vertical-specific subject line library template
  - [ ] Super funky subject lines (jargon only this persona knows)
  - [ ] Pattern-interrupt subject lines (Jay's approach)
- [ ] Establish research update cadence (quarterly review)

**Deliverable**: Vertical Research Brief template + first vertical brief completed

**Time Estimate**: 2 hours to build template, 5-9 hours per vertical to complete first brief

---

### **PHASE 2: CONTENT CREATION (Copy & Personalization)**

#### **Component 4: Operationalize the Research Component** 🔄 IN PROGRESS (Priority This Week)
*Status: In progress - executing research for first vertical*
- [ ] **Layer 1: The Human (Persona Research)**
  - [ ] Identify job titles to target (e.g., CFOs, VPs of Finance)
  - [ ] Research top 3 priorities for this persona
  - [ ] Identify top 3 pain points (vertical-specific)
  - [ ] Determine hidden objection (most common reason they don't buy)
  - **Research Methods**:
    - [ ] Read 10+ job descriptions for this role in this vertical
    - [ ] Join industry forums/subreddits (e.g., r/CFO, r/finance)
    - [ ] Review Gartner/Forrester reports for persona priorities
    - [ ] Interview 2-3 existing customers in this vertical (if available)

- [ ] **Layer 2: The Company (Vertical-Wide Patterns)**
  - [ ] Determine growth stage (growing, stable, contracting?)
  - [ ] Research funding environment (VC activity, IPO trends)
  - [ ] Identify common initiatives (digital transformation, cloud migration, AI integration)
  - **Research Methods**:
    - [ ] Read industry news (TechCrunch, vertical-specific publications)
    - [ ] Review earnings calls for public companies in vertical
    - [ ] Check Crunchbase for funding trends
    - [ ] Google Trends for vertical-specific keywords

- [ ] **Layer 3: The Space/Vertical (Trends, Regulations)**
  - [ ] Identify top 2-3 trends affecting this vertical
  - [ ] Research recent or upcoming regulatory changes
  - [ ] Understand competitive dynamics (what are competitors doing?)
  - **Research Methods**:
    - [ ] Read industry analyst reports (Gartner, Forrester, McKinsey)
    - [ ] Subscribe to industry newsletters
    - [ ] Review LinkedIn posts from thought leaders in vertical
    - [ ] Google "[vertical] trends 2025"

- [ ] **Layer 4: Hidden Objection (Vertical-Specific)**
  - [ ] Identify most common objection in this vertical
  - [ ] Understand why they say it (underlying concern)
  - [ ] Determine how to address it (evidence/framing)
  - **Research Methods**:
    - [ ] Review past sales calls (objections prospects raised)
    - [ ] Ask sales team: "What do prospects in [vertical] always say?"
    - [ ] Check competitor reviews on G2/Capterra
    - [ ] Test Email 1 → Track negative replies → Identify patterns

**Deliverable**: Complete Vertical Research Brief for first vertical (1-2 pages)

**Time Estimate**: 5-9 hours per vertical (one-time investment)

---

#### **Component 5: Operationalize the Copywriting Component** 🔄 IN PROGRESS (Priority This Week)
*Status: In progress - creating templates for first vertical*

**Email 1 Template Creation**:
- [ ] Write Email 1 base template (Jay's structure)
  - [ ] Subject line (pattern-interrupt OR super funky)
  - [ ] Preview text / First sentence (hook, no sales signal)
  - [ ] Problem + Solution (2-3 sentences, mechanism included)
  - [ ] Hidden objection address (1 sentence, Sam's enhancement)
  - [ ] Social proof (1 sentence, personalized to vertical)
  - [ ] Low-friction CTA (single-word reply)
- [ ] Apply loss-aversion framing (Sam's enhancement)
  - [ ] Frame benefits as avoiding losses ("Without X, you're losing $Y")
  - [ ] Use "So What" test (why should they care?)
- [ ] Validate sentence count (6 sentences maximum)
- [ ] Validate reading level (6th grade)
- [ ] Remove all spam trigger words
- [ ] Ensure no links/images/signatures in Email 1

**Email 2 Template Creation**:
- [ ] Write Email 2 base template (Sam's structure + Jay's brevity)
  - [ ] Reference Email 1 specifically (not generic "did you see my email?")
  - [ ] Add NEW industry insight/stat/trend (Sam's context)
  - [ ] Explain why insight matters to them
  - [ ] Low-friction CTA (Jay's approach)
- [ ] Validate 4-5 sentences
- [ ] Ensure same thread (reply to Email 1, not new email)

**Email 3 Template Creation**:
- [ ] Write Email 3 base template (Sam's teaching/FUD + Jay's length)
  - [ ] Subject line (variant 1: stat-based, variant 2: problem-based)
  - [ ] Open with surprising stat or insight (teaching)
  - [ ] Create FUD (reveal gap in their current approach)
  - [ ] Position solution as antidote
  - [ ] Low-friction CTA (back to permission-based)
- [ ] Validate 6 sentences maximum
- [ ] Identify FUD stat sources (Gartner, Verizon DBIR, industry news)

**Subject Line Library Creation**:
- [ ] Generate 5-10 pattern-interrupt subject lines (Jay's approach)
  - [ ] Question-based ("question [firstName]")
  - [ ] Competitor mention ("[competitor name]")
  - [ ] Curiosity-driven ("sending cold emails?")
- [ ] Generate 5-10 super funky subject lines (Sam's approach)
  - [ ] Vertical-specific jargon (only this persona understands)
  - [ ] Metric/concern only this role cares about
  - [ ] Sounds like internal email

**Deliverable**: Email 1-3 templates for first vertical + subject line library (10-20 variations)

**Time Estimate**: 3-4 hours per vertical

---

#### **Component 6: Operationalize the Personalization and Spintax Components** 🔄 IN PROGRESS (Priority This Week)
*Status: In progress - adding Spintax to templates*

**Personalization Variables**:
- [ ] Define personalization variables (minimal for scalability)
  - [ ] {{firstName}} - Always use
  - [ ] {{companyName}} - Clean format (no LLC/Inc/Corp)
  - [ ] {{vertical}} - Industry/vertical name (optional)
  - [ ] {{competitorName}} - Well-known competitor in their space (optional)
- [ ] Create personalization rules
  - [ ] First name: Always included
  - [ ] Company name: Clean formatting required
  - [ ] NO location mentions (data quality risk)
  - [ ] NO job title mentions (unless generalized: "executive", "leader")

**Spintax Generation Process**:
- [ ] Add Spintax to Email 1 template (mandatory for deliverability)
  - [ ] Subject line (3+ variations)
  - [ ] First sentence (3+ variations)
  - [ ] Body sentences (2-3 variations each)
  - [ ] CTA (3+ variations)
- [ ] Add Spintax to Email 2 template
  - [ ] Opening line (3+ variations)
  - [ ] Context sentence (2-3 variations)
  - [ ] CTA (3+ variations)
- [ ] Add Spintax to Email 3 template
  - [ ] Subject line (3+ variations)
  - [ ] Opening stat/insight (2-3 variations)
  - [ ] CTA (3+ variations)

**Spintax Validation Protocol**:
- [ ] Use AI to generate all possible variations
  - [ ] Prompt: "Show me all possible variations of this email with Spintax. Output each unique variation on a new line: [Your email with Spintax]"
- [ ] Manually review EVERY variation for:
  - [ ] Grammar correctness
  - [ ] Natural flow (sounds conversational)
  - [ ] No spam trigger words
  - [ ] Maintains core message
- [ ] Fix any awkward combinations
- [ ] Run through spam checker (Instantly AI, Mail Tester)

**Deliverable**: Spintax-enabled Email 1-3 templates with validated variations

**Time Estimate**: 2-3 hours per vertical (Spintax generation + validation)

---

### **PHASE 3: LAUNCH & OPTIMIZATION (Testing & Improvement)**

#### **Component 7: Campaign Launch & Sequencing System** ⏳ NOT STARTED
*Status: Not started - needed after copy/Spintax complete*
- [ ] Create campaign launch checklist
  - [ ] Research completed? (Vertical Research Brief done)
  - [ ] Copy written? (Email 1-3 templates finalized)
  - [ ] Spintax added? (All variations validated)
  - [ ] Spam tested? (Run through spam checker)
  - [ ] Domains warmed? (Ready to send)
  - [ ] Lead list batched? (ICP-filtered, data cleaned)
- [ ] Set up email sequence in tool (Instantly AI, Outreach, etc.)
  - [ ] Email 1 (Day 1)
  - [ ] Email 2 (Day 3-5, same thread)
  - [ ] Email 3 (Day 7-10, same thread)
  - [ ] Optional Email 4 (Day 14-15, breakup, only if engagement)
- [ ] Configure reply detection
  - [ ] Auto-pause sequence on reply
  - [ ] Notify rep/founder of reply
- [ ] Set up tracking
  - [ ] Reply rate tracking
  - [ ] Opportunity rate tracking
  - [ ] Spam complaint rate tracking

**Deliverable**: Campaign ready to launch, sequence configured, tracking enabled

**Time Estimate**: 2-3 hours per campaign

---

#### **Component 8: Objection Handling & Reply Management** ⏳ NOT STARTED
*Status: Not started - needed after first replies come in*
- [ ] Build objection response bank
  - [ ] "We already have a solution" template
  - [ ] "No budget" template
  - [ ] "Not interested" template
  - [ ] "Send me more info" template (brush-off handler)
- [ ] Create reply categorization system
  - [ ] Positive replies (interested, questions)
  - [ ] Negative replies (not interested, wrong person)
  - [ ] Objections (budget, timing, already have solution)
  - [ ] Out-of-office / auto-replies
- [ ] Establish response time SLA
  - [ ] Reply within X hours (recommend 2-4 hours during business hours)
- [ ] Define handoff protocol
  - [ ] When does reply become "qualified lead"?
  - [ ] Who takes over? (Sales team, founder, SDR)
  - [ ] How is handoff tracked? (CRM, spreadsheet)

**Deliverable**: Objection response bank + reply handling protocol

**Time Estimate**: 3-4 hours to build initial templates

---

#### **Component 9: Operationalize the Analysis, Testing, and Improvement Component** ⏳ NOT STARTED
*Status: Not started - needed after first campaign results*

**A/B Testing Framework**:
- [ ] Define what to test (priority order)
  - [ ] **Test 1**: Preview text (pattern-interrupt vs. super funky subject lines)
  - [ ] **Test 2**: Problem/solution framing (gain vs. loss-aversion)
  - [ ] **Test 3**: Social proof elements (competitor mention vs. media authority vs. results)
  - [ ] **Test 4**: CTA language (permission vs. assumptive)
  - [ ] **Test 5**: Follow-up timing (2-3 days vs. 4-5 days)
- [ ] Set minimum test requirements
  - [ ] 100 sends per variation (directional data)
  - [ ] 300+ sends per variation (high confidence)
  - [ ] Wait for statistical significance before declaring winner

**Performance Tracking**:
- [ ] Set up weekly performance review cadence (every Friday)
- [ ] Track key metrics
  - [ ] Reply rate (primary metric)
  - [ ] Opportunity rate (positive replies only)
  - [ ] Spam complaint rate (must stay <0.3%)
  - [ ] Negative reply rate (should stay <0.5%)
  - [ ] Meeting booked rate (ultimate metric)
- [ ] Create performance scorecard
  - [ ] ✅ Healthy: 5-8% reply rate, 2-3% opportunity rate, <0.2% spam rate
  - [ ] ⚠️ Warning: 1-3% reply rate, 0.5-1% opportunity rate, 0.2-0.3% spam rate
  - [ ] 🚨 Kill: <1% reply rate, <0.3% opportunity rate, >0.3% spam rate

**Continuous Optimization Protocol**:
- [ ] Weekly review process
  - [ ] Review metrics (reply rate, opportunity rate, spam rate)
  - [ ] Identify winning variations (20%+ performance difference)
  - [ ] Kill losing variations
  - [ ] Create new tests (iterate on winners)
- [ ] Monthly pattern analysis
  - [ ] Which verticals perform best?
  - [ ] Which subject lines get highest open rates?
  - [ ] Which CTAs convert best?
  - [ ] Which hidden objections resonate most?
- [ ] Quarterly vertical refresh
  - [ ] Update Vertical Research Briefs (new trends, new FUD stats)
  - [ ] Refresh subject line library (test new approaches)
  - [ ] Update objection response bank (new objections emerging?)

**Deliverable**: A/B testing framework, weekly review process, continuous optimization protocol

**Time Estimate**: 2-3 hours/week ongoing

---

## CURRENT PRIORITY (This Week)

**Focus**: Foundation + Content Creation (Components 2-6)

### **Immediate Tasks (Priority Order)**:

1. **Component 3: Vertical Research Brief System** (Build template)
   - [ ] Create Vertical Research Brief template (2 hours)
   - [ ] Build research source checklist
   - **Deliverable**: Blank template ready to fill in

2. **Component 4: Operationalize the Research Component** (Execute research for first vertical)
   - [ ] Complete Layer 1 (Persona Research) - 2 hours
   - [ ] Complete Layer 2 (Company/Vertical Patterns) - 1-2 hours
   - [ ] Complete Layer 3 (Space/Trends/Regulations) - 1-2 hours
   - [ ] Complete Layer 4 (Hidden Objection) - 1 hour
   - **Deliverable**: First Vertical Research Brief complete (5-9 hours total)

3. **Component 2: Lead Data Quality & Batching** (Prepare lead list)
   - [ ] Define ICP for first vertical (1 hour)
   - [ ] Filter and batch lead list (1-2 hours)
   - [ ] Clean data (remove LLC, standardize, verify emails) - 1-2 hours
   - **Deliverable**: Clean batched list (100-200 prospects ready)

4. **Component 5: Operationalize the Copywriting Component** (Write templates)
   - [ ] Write Email 1 template (1.5 hours)
   - [ ] Write Email 2 template (1 hour)
   - [ ] Write Email 3 template (1 hour)
   - [ ] Create subject line library (30 min)
   - **Deliverable**: Email 1-3 templates + 10-20 subject lines (3-4 hours total)

5. **Component 6: Operationalize Personalization/Spintax** (Add Spintax, validate)
   - [ ] Add Spintax to all templates (1 hour)
   - [ ] Generate all variations with AI (30 min)
   - [ ] Manually validate every variation (1-2 hours)
   - [ ] Run through spam checker (30 min)
   - **Deliverable**: Spintax-enabled templates, validated (2-3 hours total)

---

## TOTAL TIME ESTIMATE (This Week's Work)

| Component | Time Estimate |
|-----------|---------------|
| Vertical Research Brief Template | 2 hours |
| Execute Research (First Vertical) | 5-9 hours |
| Lead Data Quality & Batching | 3-5 hours |
| Copywriting (Email 1-3 + Subjects) | 3-4 hours |
| Personalization/Spintax | 2-3 hours |
| **TOTAL** | **15-23 hours** |

**Realistic Timeline**: 3-5 days of focused work (4-6 hours/day)

---

## NEXT STEPS (After This Week)

Once Components 2-6 are complete:
- [ ] Move to Component 7: Campaign Launch & Sequencing
- [ ] Launch first campaign (100-200 sends)
- [ ] Monitor replies
- [ ] Build Component 8: Objection Handling & Reply Management (as replies come in)
- [ ] After 1 week of results: Move to Component 9: Analysis, Testing, Improvement

---

## SUCCESS METRICS (Goals)

**Campaign Performance Targets**:
- Reply rate: 5-8%
- Opportunity rate: 2-3%
- Spam complaint rate: <0.2%
- Meeting booked rate: 1-2%

**Volume Targets**:
- Daily send volume: 50-100 emails/day (once scaled)
- Weekly meetings: 3-5 meetings/week (per vertical)

**Timeline to Scale**:
- Week 1-2: First vertical operational (Components 2-6 complete)
- Week 3: First campaign launched, initial results (Component 7)
- Week 4: Objection handling operational, optimization begins (Components 8-9)
- Week 5-8: Scale to 2-3 additional verticals (repeat Components 4-6 per vertical)

---

## NOTES & DECISIONS

**Integration Decisions**: See [INTEGRATION_DECISIONS.md](INTEGRATION_DECISIONS.md) for full Sam McKenna enhancement details

**Key Decisions**:
- Primary methodology: Lead Gen Jay (high-volume, deliverability-first)
- Strategic enhancements: Sam McKenna (hidden objections, 3-layer research, super funky subject lines, loss-aversion framing, teaching/FUD)
- Target: Large TAM (>5000), deals <$50K (volume play)
- Personalization: Minimal (first name + company name only) for scalability
- Sequence: 3 emails, 2-5 day spacing (Jay's deliverability-safe approach)

---

**Last Updated**: 2025-11-19
**Next Review**: After Component 6 complete (end of week)
