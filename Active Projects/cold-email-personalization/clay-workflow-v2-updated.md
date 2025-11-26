# Clay Workflow for Consulting Firm Lead Gen (v2 - Updated with Clay Best Practices)

**Target ICP**: Consulting firms, 3-50 employees, US-based (or specific geography)
**Decision-Makers**: Founder, Owner, Managing Partner, Principal, CEO
**Personalization Strategy**: Thought leadership + AI snippets (one sentence at a time)

---

## PHASE 1: COMPANY SOURCING

### Step 1.1: Find Companies (Choose One Method)

**Option A: Clay "Find Companies" Search**
- Industry filters: "Management Consulting", "Business Consulting", "Professional Services"
- Company size: 3-50 employees
- Location: [Your target geography]
- Save to table: `companies_table`

**Option B: LinkedIn Sales Navigator Import**
- Search: "consulting firms" + employee count filter (3-50)
- Export via Clay Chrome extension
- Import to table: `companies_table`

**Option C: Upload Existing List**
- Import CSV/spreadsheet with company names or domains
- Clay will enrich from there

### Step 1.2: Enrich Company "Corner Pieces"

**Goal**: Get domain + company LinkedIn URL (these unlock all other enrichments)

**Waterfall Setup**:
- Input: Company name (from search)
- Outputs needed:
  - `company_domain` (website)
  - `company_linkedin_url` (LinkedIn company page)

**Providers**: Clay auto-enrichment (usually finds these from Find Companies search)

---

## PHASE 2: COMPANY DATA ENRICHMENT (Firmographic/Technographic)

**Purpose**: Qualify leads, personalize messaging with company-specific data

### Step 2.1: Company Data Waterfalls

**Recommended Data Points** (prioritize based on your ICP):

| Data Point | Why You Need It | Waterfall Providers |
|-----------|-----------------|---------------------|
| **Employee Count** | Segmentation (solo vs. small vs. mid-size) | Intellizence → Dealroom → Harmonic |
| **Revenue** | Qualify budget fit | Owler → Pitchbook → Apollo |
| **Funding Stage** | Understand growth phase | Intellizence → Dealroom → Harmonic → Owler → Pitchbook |
| **Tech Stack** | Identify tool usage (for positioning) | BuiltWith → Datanyze → Apollo |
| **Recent News** | Personalization hooks | PredictLeads → Claygent (fallback) |

**Conditional Run Example**:
- Only run "Tech Stack" waterfall IF employee_count > 10 (smaller firms may not have detectable tech stack)

### Step 2.2: AI-Powered Company Research (Claygent)

**Use Claygent for web scraping** (data not available via standard enrichments):

**Prompt 1 - Consulting Specialty**:
```
Visit {company_website}. What types of consulting does this firm specialize in? List their 3 main service areas in a comma-separated list. If unclear, return "Unknown".
```
Output: `consulting_specialty` (e.g., "HR consulting, Organizational development, Change management")

**Prompt 2 - Recent LinkedIn Activity** (Optional - for high-value targets):
```
Search LinkedIn for {company_name}. Find any posts from the last 60 days about challenges, growth, hiring, or wins. Return the most recent post with a brief summary (1 sentence). If no posts found, return "No recent activity".
```
Output: `recent_linkedin_post` (e.g., "Announced hiring 3 new consultants for Q4 growth")

**Prompt 3 - Competitor Context** (Optional - for subject line hooks):
```
Find 2-3 consulting firms similar to {company_name} in {location} with {employee_count} employees. Return company names only, comma-separated.
```
Output: `competitor_names` (for pattern-interrupt subject lines like "Unlike [Competitor], you...")

**Cost Optimization**:
- Use conditional runs: Only run Claygent IF company passes initial qualification (e.g., employee_count >= 5, revenue >= $500k)

---

## PHASE 3: PEOPLE SEARCH (Find Decision-Makers)

### Step 3.1: Find People at Companies

**Clay "Find People" Search** (on top of `companies_table`):
- Job titles: "Founder", "Owner", "Managing Partner", "Principal", "CEO"
- Seniority: "CXO", "Owner", "Partner"
- Output: 1-3 decision-makers per firm (prioritize Founder/Owner)

**Creates new table**: `people_table` (linked to `companies_table`)

### Step 3.2: Pull Company Data into People Table

**Lookup from `companies_table`**:
- Automatically pulls: `company_domain`, `company_linkedin_url`, `consulting_specialty`, `employee_count`, `recent_news`, etc.
- This ensures each contact has full company context

---

## PHASE 4: CONTACT DATA ENRICHMENT (Email + Profile)

### Step 4.1: Email Waterfall (Updated 2024 Best Practices)

**Recommended Sequence**:
1. **FullEnrich** (only returns verified emails - start here for quality)
2. **Prospeo** (high accuracy for SMB - consulting firms)
3. **DropContact** (GDPR-compliant, good for global lists)
4. **Apollo** (broad coverage, backup)
5. **Claygent** (last resort - AI web scraping from company website contact pages)

**Validation**:
- **ZeroBounce** (final step in waterfall)
- **Setting**: "Only mark safe to send" (excludes catch-all emails for conservative approach)
  - OR: Default (includes catch-all) if you want higher volume

**Output**: `validated_work_email`

### Step 4.2: Conditional Personal Email Waterfall (Optional)

**Only run IF**: `validated_work_email` is blank

**Sequence**:
1. **Apollo** → 2. **Hunter** → 3. **Snov.io**

**Validation**: ZeroBounce
**Output**: `validated_personal_email`

**Why Conditional?**: Save credits - don't search for personal email if work email found

### Step 4.3: LinkedIn Profile Enrichment

**Enrich from LinkedIn Profile URL** (from People Search):
- Work experience (full history)
- Education (alma mater, degrees)
- Certifications
- Volunteering/Awards

**Output**: `linkedin_profile_data` (JSON object with all details)

---

## PHASE 5: DATA CLEANING (Credit-Free Clay Tools)

**Purpose**: Ensure clean data for email personalization (avoid "Dear {{FirstName}} LLC")

### Step 5.1: Company Name Cleaning

**Tool**: Clay "Normalize Company Names"
- Input: `company_name` (raw)
- Output: `company_name_cleaned`
- Removes: "LLC", "Inc", "Corp", "Limited", "Consulting Group"

**Example**:
- Before: "Acme Consulting Group, LLC"
- After: "Acme Consulting"

### Step 5.2: Job Title Standardization

**Tool**: Clay "Use AI" (ChatGPT) - Credit-Free AI Formula
- Prompt: "Standardize this job title to common format. Return only the cleaned title. Examples: 'Managing Partner' → 'Founder', 'Principal Consultant' → 'Principal'. Input: {job_title}"
- Output: `job_title_cleaned`

### Step 5.3: Name Extraction (First Name)

**Tool**: Clay "Extract First Name" (or AI Formula)
- Input: `full_name`
- Output: `first_name`

**AI Formula Alternative**:
```
Extract the first name from this full name: {full_name}. Return only the first name, no punctuation.
```

---

## PHASE 6: AI-POWERED PERSONALIZATION (The Core Differentiator)

**CRITICAL PHILOSOPHY**: Generate ONE SENTENCE at a time (AI snippets, not full paragraphs)

### Step 6.1: Thought Leadership Research (Claygent)

**Why**: Clay's data shows thought leadership = highest response rates

**Claygent Prompt** (Neon model for multi-output):
```
Search Google for "{founder_name} {company_name}" + "podcast" OR "article" OR "interview" OR "blog" OR "LinkedIn post".

Find the 3 most recent pieces of public content from the last 12 months.

For EACH piece found, extract:
1. content_type (podcast/article/interview/blog/LinkedIn post)
2. content_title
3. content_url
4. publication_date (if available)
5. main_topic (1-2 words)

Return in format:
Type: [content_type]
Title: [content_title]
URL: [content_url]
Date: [publication_date]
Topic: [main_topic]

If fewer than 3 found, return only what exists. If NONE found, return "No thought leadership found".
```

**Outputs** (Neon model allows multiple columns from one Claygent run):
- `thought_leadership_1` (full details)
- `thought_leadership_2`
- `thought_leadership_3`

**Conditional Run**: Only run IF email found (don't waste credits on un-contactable leads)

### Step 6.2: Extract Content Insights (Claygent Follow-Up)

**For each thought leadership piece found**, run Claygent to extract key insights:

**Prompt** (for `thought_leadership_1`):
```
Visit this URL: {thought_leadership_1_url}

Extract:
1. A direct quote from {founder_name} (1-2 sentences max)
2. The main insight or takeaway (1 sentence)
3. Any specific challenge or problem they discussed (1 sentence)

Return in format:
Quote: "[exact quote]"
Insight: [main takeaway]
Challenge: [problem discussed]

If content not accessible, return "Content unavailable".
```

**Outputs**:
- `tl_quote_1`
- `tl_insight_1`
- `tl_challenge_1`

**Cost Optimization**: Only run for highest-priority leads (e.g., companies with 10+ employees, revenue > $1M)

### Step 6.3: Generate Email Components (AI Snippets - One Sentence at a Time)

**CRITICAL**: Each component is a SEPARATE AI call, ONE SENTENCE output

---

#### Component 1: Subject Line

**AI Integration**: ChatGPT (or Claude)
**Input**: `tl_insight_1`, `first_name`, `company_name_cleaned`

**Prompt**:
```
Write a personalized email subject line (under 8 words) referencing this insight: "{tl_insight_1}"

Use second person ("Your insights on...").

Examples:
- "Your take on AI in consulting"
- "Your growth strategy approach"
- "Loved your podcast on culture"

Return ONLY the subject line, no quotes or extra text.
```

**Output**: `subject_line`

---

#### Component 2: Email First Line

**AI Integration**: ChatGPT (or Claude)
**Input**: `tl_insight_1`, `thought_leadership_1_type`, `thought_leadership_1_title`

**Prompt**:
```
Write the first line of a cold email (1 sentence, under 15 words) referencing this content:

Type: {thought_leadership_1_type}
Title: "{thought_leadership_1_title}"
Insight: "{tl_insight_1}"

Start with "Just read" or "Just listened to" (match the content type).

Examples:
- "Just listened to your podcast on scaling consulting firms."
- "Just read your article about client retention challenges."

DO NOT repeat the subject line. Return ONLY the first sentence, no punctuation at end.
```

**Output**: `email_first_line`

---

#### Component 3: Email Body (Insight Reference)

**AI Integration**: ChatGPT (or Claude)
**Input**: `tl_insight_1`, `tl_quote_1`, `company_name_cleaned`, `first_name`

**Prompt**:
```
Write ONE sentence (under 20 words) that references this insight and connects it to a problem you solve:

Insight: "{tl_insight_1}"
Quote (optional): "{tl_quote_1}"

The sentence should:
1. Acknowledge their expertise
2. Subtly hint at a related problem or opportunity
3. Avoid salesy language

Examples:
- "Your point about culture alignment resonates—many firms struggle to measure it systematically."
- "The retention challenge you mentioned is exactly what we're solving for mid-sized consultancies."

Return ONLY the sentence, no extra text. DO NOT repeat previous lines.

Previous lines to avoid repeating:
Subject: {subject_line}
First line: {email_first_line}
```

**Output**: `email_body_insight`

---

#### Component 4: Transition to Value Prop

**AI Integration**: ChatGPT (or Claude)
**Input**: `consulting_specialty`, `company_name_cleaned`

**Prompt**:
```
Write ONE sentence (under 20 words) that transitions from their insight to your value proposition.

Their specialty: {consulting_specialty}
Company: {company_name_cleaned}

The sentence should:
1. Be conversational, not salesy
2. Introduce "we help [firms like yours]" angle
3. Connect to their consulting specialty

Examples:
- "We work with HR consultancies to turn client engagements into scalable IP."
- "We're helping strategy firms like {company_name_cleaned} systematize their methodologies."

Return ONLY the sentence, no extra text. DO NOT repeat previous lines.

Previous lines to avoid repeating:
Subject: {subject_line}
First line: {email_first_line}
Body: {email_body_insight}
```

**Output**: `email_body_transition`

---

#### Component 5: CTA (Call to Action)

**Static or AI-Generated** (recommend static for consistency)

**Option A: Static CTA**:
```
Worth a 15-minute conversation?
```

**Option B: AI-Generated CTA** (for variety):

**Prompt**:
```
Write a soft CTA (1 sentence, under 12 words) asking for a brief conversation.

Be casual and low-pressure. No "I'd love to" or "Let me know".

Examples:
- "Worth a quick call this week?"
- "Open to a 15-minute chat?"
- "Curious if this resonates—quick call?"

Return ONLY the CTA, no punctuation.
```

**Output**: `email_cta`

---

#### Component 6: PS Line (Personal Touch)

**AI Integration**: ChatGPT (or Claude)
**Input**: `linkedin_profile_data` (education, recent company news, volunteering)

**Prompt**:
```
Write a personalized PS line (1 sentence, under 15 words) based on this profile data:

Education: {linkedin_profile_data.education}
Recent activity: {recent_linkedin_post}
Volunteering: {linkedin_profile_data.volunteering}

The PS should:
1. Reference something specific and authentic (alma mater, recent hire, volunteer work)
2. Be friendly, not salesy
3. Show you researched them

Examples:
- "PS — Go Wolverines! (saw you're a Michigan alum)"
- "PS — Congrats on the new hire you announced last month."
- "PS — Love that you volunteer with Big Brothers Big Sisters."

Return ONLY the PS line, starting with "PS —". DO NOT repeat previous lines.

Previous lines to avoid repeating:
Subject: {subject_line}
First line: {email_first_line}
Body: {email_body_insight}
Transition: {email_body_transition}
CTA: {email_cta}
```

**Output**: `email_ps_line`

---

### Step 6.4: Assemble Final Email

**Tool**: Clay "Combine Text" (or AI Formula)

**Formula**:
```
{email_first_line}

{email_body_insight}

{email_body_transition}

{email_cta}

{email_ps_line}
```

**Output**: `final_email_body`

---

## PHASE 7: QUALIFICATION & FILTERING

**Purpose**: Only export leads that meet quality thresholds

### Step 7.1: Create Qualification Score

**AI Formula** (Credit-Free):
```
Score this lead from 0-100 based on:
- Email found: {validated_work_email} (40 points if exists)
- Employee count: {employee_count} (20 points if >= 5)
- Thought leadership: {thought_leadership_1} (20 points if exists)
- Consulting specialty: {consulting_specialty} (10 points if not "Unknown")
- Recent activity: {recent_linkedin_post} (10 points if exists)

Return only the numeric score (0-100).
```

**Output**: `lead_score`

### Step 7.2: Filter by Score

**Conditional Formula**:
- Only rows where `lead_score >= 60` proceed to export
- Rows <60: Skip or move to "nurture list"

---

## PHASE 8: EXPORT TO EMAIL SEQUENCER

### Step 8.1: Setup Campaign in Sequencer (Instantly, Smartlead, etc.)

**Campaign Structure** (in sequencer tool):
```
Subject: {{subject_line}}

{{email_body}}
```

**Variables to Create in Sequencer**:
- `subject_line`
- `email_body` (or `final_email_body`)

### Step 8.2: Add Clay Enrichment (Send to Sequencer)

**Clay Integration**: "Add to [Instantly/Smartlead/Outreach/SalesLoft]"

**Required Fields**:
- `validated_work_email` (required)
- `first_name` (required)
- `company_name_cleaned` (required)

**Custom Fields** (map to sequencer variables):
- `subject_line` → {{subject_line}}
- `final_email_body` → {{email_body}}

**Optional Fields** (for segmentation/tracking):
- `employee_count`
- `consulting_specialty`
- `lead_score`
- `thought_leadership_1_url` (for CRM notes)

### Step 8.3: Launch Campaign

1. Run enrichment in Clay (pushes leads to sequencer)
2. Go to sequencer tool, refresh campaign
3. Verify custom variables populated correctly
4. Set campaign rules (send times, follow-ups, etc.)
5. Activate campaign

---

## CLAY WORKFLOW SUMMARY (Table Structure)

| Phase | Table | Key Columns | Tools Used |
|-------|-------|-------------|------------|
| 1 | `companies_table` | company_name, company_domain, company_linkedin_url, employee_count | Find Companies, Waterfalls |
| 2 | `companies_table` | consulting_specialty, recent_news, tech_stack | Claygent, AI formulas |
| 3 | `people_table` | full_name, job_title, linkedin_profile_url, company_domain (lookup) | Find People |
| 4 | `people_table` | validated_work_email, validated_personal_email, linkedin_profile_data | Email waterfalls, LinkedIn enrichment |
| 5 | `people_table` | company_name_cleaned, first_name, job_title_cleaned | Normalize tools (credit-free) |
| 6 | `people_table` | thought_leadership_1, tl_quote_1, subject_line, email_first_line, email_body_insight, email_body_transition, email_cta, email_ps_line, final_email_body | Claygent, ChatGPT AI snippets |
| 7 | `people_table` | lead_score, qualified (Y/N) | AI formula (credit-free) |
| 8 | `people_table` | Export to sequencer | Instantly/Smartlead integration |

---

## KEY TAKEAWAYS (Clay Best Practices)

### 1. **AI Snippets > Full Emails**
- Generate ONE SENTENCE at a time
- Prevents AI from going off-topic or sounding robotic
- More control over tone and quality

### 2. **Claygent vs. Basic AI**
- **Claygent**: Web scraping (thought leadership, company research)
- **ChatGPT/Claude**: Summarization, extraction, copywriting
- **AI Formulas**: Credit-free (use for scoring, cleaning, extraction from enriched data)

### 3. **Conditional Runs = Cost Savings**
- Only run Claygent on qualified leads (e.g., employee_count >= 5)
- Only run personal email IF work email not found
- Only run thought leadership research IF email found

### 4. **Waterfall Philosophy**
- Maximize coverage, minimize cost
- Only subsequent providers run if previous failed
- Always validate emails (ZeroBounce)

### 5. **Credit-Free Tools First**
- Use Clay's native functions (Normalize, AI formulas) before paid integrations
- Example: Extract first name with AI formula (free) vs. external API (paid)

### 6. **Thought Leadership = Gold**
- Highest response rates come from referencing THEIR content
- Worth the extra Claygent credits for high-value targets
- Fallback: Recent company news, LinkedIn activity

### 7. **Email Structure (Clay-Validated)**
- **Subject**: <8 words, second person, reference their content
- **First line**: "Just read/listened to..."
- **Body**: Acknowledge insight + subtle problem hint
- **Transition**: "We help firms like yours..."
- **CTA**: Soft ask, low-pressure
- **PS**: Personal touch (alma mater, recent news)

---

## COST OPTIMIZATION CHECKLIST

**Before Running Workflow**:
- [ ] Set conditional runs on Claygent (only run for qualified leads)
- [ ] Use AI formulas (credit-free) for data cleaning vs. integrations
- [ ] Set email waterfall to stop after validation (don't run all providers if first succeeds)
- [ ] Only run personal email waterfall IF work email fails
- [ ] Only run thought leadership research IF email found
- [ ] Filter out unqualified companies BEFORE people search (save credits on people enrichment)

**Estimated Credit Usage** (per lead, assuming all enrichments run):
- Company enrichment: 5-10 credits (waterfalls)
- People search: 1 credit
- Email waterfall: 5-15 credits (depending on provider hits)
- Claygent thought leadership: 10-20 credits (per research call)
- Claygent content extraction: 5-10 credits (per URL)
- AI copywriting: 5-10 credits (ChatGPT calls)
- **Total**: ~30-65 credits per lead (with full personalization)

**With Conditional Runs** (only high-quality leads get full treatment):
- **Basic enrichment**: ~10-20 credits per lead (email + basic company data)
- **Premium personalization**: +30-45 credits (thought leadership + AI snippets)
- **Strategy**: Run basic on ALL, run premium on top 20-30% (lead_score >= 70)

---

## NEXT STEPS

1. **Test on 10-lead sample**: Validate each phase works before scaling
2. **A/B test personalization depth**: Compare thought leadership emails vs. basic personalization (response rates)
3. **Track cost per lead**: Monitor credit usage, optimize conditional runs
4. **Iterate on AI prompts**: Refine snippet prompts based on output quality
5. **Scale gradually**: Start with 50-100 leads/week, scale to 500+ once dialed in
