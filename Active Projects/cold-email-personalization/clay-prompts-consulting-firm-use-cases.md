# Clay AI Prompts - Consulting Firm Outreach Use Cases

**Source**: [24 AI Prompts from the Clay Team](research/24 AI Prompts from the Clay Team.md)
**Adapted for**: Cold email outreach to consulting firms (3-50 employees)

---

## HOW TO USE THIS GUIDE

**Format**:
- **Clay Prompt** = Copy-paste ready prompt (use verbatim or customize)
- **Input Variables** = Data fields needed from your Clay table
- **Output** = What you get back from AI
- **Use Case** = When/why to use this in your workflow
- **Credits** = AI integration cost (most are ChatGPT calls = 1-2 credits each)

**Implementation**:
1. Copy prompt from this doc
2. Add "Use AI (ChatGPT)" enrichment in Clay
3. Paste prompt, map input variables to your columns
4. Run on sample rows first (test before scaling)

---

## PHASE 1: COMPANY RESEARCH & QUALIFICATION

### Prompt #9: Discover Company Mission/Focus

**Clay Prompt**:
```
What is the mission of the company using the input?

The input: "{{LinkedIn Company Description}}"

Be specific and use keywords in the description not normally found in other companies.
Keep the output under 6 words and make the output conversational/casual.

Complete this prompt: "I was on your LinkedIn company page and it looks you're focused on"
```

**Input Variables**:
- `{{LinkedIn Company Description}}` = From LinkedIn enrichment or company search

**Output**:
- `company_mission_snippet` (e.g., "helping manufacturers adopt lean principles")

**Use Case**:
- Personalization snippet for email body
- Example: "I was on your LinkedIn company page and it looks you're focused on **helping manufacturers adopt lean principles**."

**Credits**: 1-2 credits (ChatGPT)

---

### Prompt #10: Discover Who the Company Sells To

**Clay Prompt**:
```
What is the job title that this company usually sells to using the input as a guide for what they do.

The input is this: {{LinkedIn Company Description}}

Who gets most value out of the product and what is their usual job title?
Give me up to three job titles. Do not include any numbers or extra information.
Just a comma separated list of titles.
```

**Input Variables**:
- `{{LinkedIn Company Description}}`

**Output**:
- `company_sells_to` (e.g., "CEO, COO, VP of Operations")

**Use Case**:
- Identify if this consulting firm serves similar clients as you
- Qualification filter (only reach out if they sell to decision-makers)
- Personalization: "Since you work with [CEOs/COOs], you probably see..."

**Credits**: 1-2 credits (ChatGPT)

---

### Prompt #13: Infer if Company is B2B or B2C

**Clay Prompt**:
```
A B2B company is a company that sells to other companies.
A B2C company is a company that sells to consumers.
Using the input, tell me if the company is likely a B2B company or a B2C company.

The input is this: {{company description}}

The only acceptable output is either "B2B" or "B2C" do not answer in any other way.
```

**Input Variables**:
- `{{company description}}`

**Output**:
- `b2b_or_b2c` (returns "B2B" or "B2C")

**Use Case**:
- Qualification filter (only target B2B consulting firms if your solution is B2B-focused)
- Segmentation (different messaging for B2B vs. B2C consultants)

**Credits**: 1 credit (ChatGPT)

---

### Prompt #16: Understand the Problems a Company Solves

**Clay Prompt**:
```
Answer the questions about the company whose name is {{Company Name}}, company description is this {{description}}.
Use Breadth-first search to explore all potential scenarios before going deeper into specific ones.
Only answer the questions if you have an answer you are 95% sure is correct.
If you don't think it's 95% certain, leave it blank.

1. What is the problem this company solves?
2. Without this company, how are people solving this problem today?
3. What is something new or novel that we can teach the person we are reaching out to? We want to provide them something for free.
4. What is the cost of inaction if they were to stay with their status quo solution?
5. How is the company different from its competitors?
```

**Input Variables**:
- `{{Company Name}}`
- `{{description}}` (LinkedIn description or website scrape)

**Output**:
- `problem_they_solve`
- `status_quo_solution`
- `novel_insight_to_teach`
- `cost_of_inaction`
- `differentiation`

**Use Case**:
- Deep personalization for high-value targets (run conditionally on top 10-20% of leads)
- Use `novel_insight_to_teach` in email body: "One thing I've learned working with [similar firms] is [insight]—something most consultants overlook."
- Use `problem_they_solve` to frame your value prop around THEIR client challenges

**Credits**: 2-3 credits (ChatGPT, complex reasoning)

**Conditional Run**: Only run IF `lead_score >= 80` (premium personalization for best leads)

---

### Prompt #11: Find Pricing Terms

**Clay Prompt**:
```
How much is this company's highest pricing per month using the input. Be as specific and short as possible.
Also tell me if it's monthly or annual pricing.

The input: {{Scraped Website Data}}
```

**Input Variables**:
- `{{Scraped Website Data}}` = From Claygent or "Scrape Website" enrichment

**Output**:
- `pricing_info` (e.g., "$5,000/month" or "Custom pricing")

**Use Case**:
- Budget qualification (if their pricing is $10k+/month, they likely have budget for your solution)
- Segmentation (high-ticket consultants vs. solopreneurs)
- Personalization: Reference pricing tier in email (if public)

**Credits**: 1-2 credits (ChatGPT)

---

## PHASE 2: PEOPLE RESEARCH & PERSONALIZATION

### Prompt #2: Summarize LinkedIn Profile (3 Unique Aspects)

**Clay Prompt**:
```
Imagine you are an expert business development representative focused on prospect research.

Based on the Linkedin profile data provided, please identify three unique and noteworthy aspects about the individual.
Consider the professional background, achievements, skills, endorsements, projects, education, and any personal interests or volunteer work mentioned.

Highlight points that distinguish them from others in their field.
Keep each bullet point to 15 words max.

Profile Data: {{Enrich LI Profile}}

Output format:
Unique Aspects:
1.
2.
3.
```

**Input Variables**:
- `{{Enrich LI Profile}}` = JSON object from "Enrich Person from Profile" in Clay

**Output**:
- `unique_aspects_1`
- `unique_aspects_2`
- `unique_aspects_3`

**Use Case**:
- PS line personalization: "PS — [unique aspect from their profile]"
- Email body hook: Reference unique experience/achievement
- Example: "PS — Saw you were a Peace Corps volunteer in Rwanda—incredible experience."

**Credits**: 2-3 credits (ChatGPT)

**Conditional Run**: Only run IF email found AND `lead_score >= 70` (don't waste credits on unqualified leads)

---

### Prompt #12: Find Focus of Job Title

**Clay Prompt**:
```
Tell me what is the focus of this person's role based on the title name and the input.
Be specific and casual.

The title name is this: {{LinkedIn Job Title}}
The input is this: "{{LinkedIn Summary}}"

Complete this prompt with the tasks they are responsible for in under 6 words. "As the {{title}}, I'd imagine you focus on"
```

**Input Variables**:
- `{{LinkedIn Job Title}}` (e.g., "Managing Partner")
- `{{LinkedIn Summary}}` (from LinkedIn enrichment)

**Output**:
- `role_focus_snippet` (e.g., "client acquisition and team development")

**Use Case**:
- Email personalization: "As the Managing Partner, I'd imagine you focus on **client acquisition and team development**."
- Shows you understand their day-to-day (builds credibility)

**Credits**: 1-2 credits (ChatGPT)

---

### Prompt #5: Summarize LinkedIn Post

**Clay Prompt**:
```
Use the input to complete my prompt in under 8 words.
Keep the output short and use specific keywords from the post.
These are social media posts by other people and I would just like to know the main idea of each post.

The input is this: {{LinkedIn Post}}

Complete this prompt: "I just wanted to reach out because I saw your post about"
```

**Input Variables**:
- `{{LinkedIn Post}}` = From Claygent search for recent LinkedIn posts

**Output**:
- `linkedin_post_summary` (e.g., "scaling your consulting practice profitably")

**Use Case**:
- High-engagement opener: "I just wanted to reach out because I saw your post about **scaling your consulting practice profitably**."
- Shows you're paying attention to their thought leadership

**Credits**: 1 credit (ChatGPT)

**Conditional Run**: Only run IF Claygent found recent LinkedIn posts (don't run on blank input)

---

### Prompt #19: Understand Seniority of Title

**Clay Prompt**:
```
You will be provided with a job title below and your job is to categorize the job title into one of the following seniority buckets.

• Owner/CXO
• Vice President
• Director
• Manager
• Head
• Senior
• AE (Account Executive)
• SDR/BDR
• RevOps/Sales Ops
• Advisor
• Consultant
• Recruiter
• Growth
• Other

Return only the seniority bucket and nothing else. Only return one seniority.
In cases where multiple could apply, default to the more senior one.
There should be no • in the final output.

The job title is {{job title}}.
```

**Input Variables**:
- `{{job title}}` (e.g., "Managing Partner", "Principal Consultant", "Founder")

**Output**:
- `seniority_bucket` (e.g., "Owner/CXO")

**Use Case**:
- Qualification filter (only reach out to Owner/CXO, Vice President, Director)
- Segmentation (different messaging by seniority)
- Prioritization (Owner/CXO = highest priority)

**Credits**: 1 credit (ChatGPT)

---

### Prompt #20: Clean Job Titles

**Clay Prompt**:
```
Please help me clean out the job titles in finance. I just want the current position from this text: {{Title}}.

If there are two positions, please choose the first position.
If there are any abbreviations, please spell them out (ex. SVP is Senior Vice President, CFO is Chief Financial Officer), and make sure to keep the words finance in the role.
For the output, I only want the job title.
```

**Input Variables**:
- `{{Title}}` (raw job title from LinkedIn, may include company name or multiple positions)

**Output**:
- `cleaned_job_title` (e.g., "Managing Partner" instead of "Managing Partner at Acme Consulting | Former VP at XYZ Corp")

**Use Case**:
- Personalization (use clean title in email: "As the Managing Partner...")
- De-duplication (avoid confusing AI with messy titles)

**Credits**: 1 credit (ChatGPT)

**Adaptation for Consulting**:
- Replace "finance" with "consulting" in prompt
- Example: "If there are any abbreviations, please spell them out (ex. MP is Managing Partner, PC is Principal Consultant), and make sure to keep the words consulting in the role."

---

## PHASE 3: NEWS & RECENT ACTIVITY RESEARCH

### Prompt #3: Summarize News Article

**Clay Prompt**:
```
Using the input, complete my prompt using keywords specific to the news article.
Compliment them on the findings of the article. Keep it very short and casual.
Make sure to leave out corporate jargon. Shorten company names when applicable.
Don't make any reference to the time of the article being published.

The input is: {{Headline}}

Complete this prompt: I saw the recent news article about
```

**Input Variables**:
- `{{Headline}}` = From PredictLeads or Google News search via Claygent

**Output**:
- `news_article_snippet` (e.g., "your firm landing the partnership with Boeing")

**Use Case**:
- Email opener: "I saw the recent news article about **your firm landing the partnership with Boeing**."
- Shows you're tracking their success (flattering + relevant)

**Credits**: 1 credit (ChatGPT)

---

### Prompt #4: Infer Problem from Open Job Listing

**Clay Prompt**:
```
Tell me what problem this company is trying to solve based on the open job that is listed in the input.
Keep it short and be specific based on what that job title is known to be tasked with in a company.

The input is this: {{job title}}

Complete this prompt: "I saw your company was hiring for a {{job title}}. In my experience this means you're trying to improve the company's"
```

**Input Variables**:
- `{{job title}}` = From job board scrape or Claygent search for open positions

**Output**:
- `inferred_problem` (e.g., "client delivery capacity and project management")

**Use Case**:
- Email hook: "I saw your company was hiring for a Senior Consultant. In my experience this means you're trying to improve the company's **client delivery capacity and project management**."
- Shows you understand their growth challenges

**Credits**: 1 credit (ChatGPT)

**Conditional Run**: Only run IF Claygent found open job listings (many small consulting firms don't post publicly)

---

## PHASE 4: EMAIL COPYWRITING (AI SNIPPETS)

### Custom Prompt: Subject Line (Consulting Focus)

**Adapted from Clay Best Practices** (not in 24 prompts, but based on their methodology)

**Clay Prompt**:
```
Write a personalized email subject line (under 8 words) for a cold email to a consulting firm founder.

Reference this insight about them: "{{thought_leadership_insight}}"

Use second person ("Your insights on...").

Examples for consulting firms:
- "Your take on scaling consultancies"
- "Your growth strategy for consultants"
- "Loved your podcast on culture"

Return ONLY the subject line, no quotes or extra text.
```

**Input Variables**:
- `{{thought_leadership_insight}}` = From Claygent research or LinkedIn post summary

**Output**:
- `subject_line`

**Use Case**:
- Email campaign subject line (personalized to each lead)

**Credits**: 1-2 credits (ChatGPT)

---

### Custom Prompt: Email First Line (Thought Leadership Reference)

**Adapted from Clay Best Practices**

**Clay Prompt**:
```
Write the first line of a cold email (1 sentence, under 15 words) referencing this content:

Type: {{content_type}}
Title: "{{content_title}}"
Insight: "{{main_insight}}"

Start with "Just read" or "Just listened to" (match the content type: podcast → listened, article/blog → read).

Examples:
- "Just listened to your podcast on scaling consulting firms profitably."
- "Just read your article about client retention in professional services."

DO NOT repeat this subject line: {{subject_line}}

Return ONLY the first sentence, no punctuation at end.
```

**Input Variables**:
- `{{content_type}}` (e.g., "podcast", "article", "LinkedIn post")
- `{{content_title}}`
- `{{main_insight}}`
- `{{subject_line}}` (to avoid repetition)

**Output**:
- `email_first_line`

**Use Case**:
- Email opener (immediately after subject line)

**Credits**: 1-2 credits (ChatGPT)

---

### Custom Prompt: Email Body (Insight + Problem Hint)

**Adapted from Clay Best Practices**

**Clay Prompt**:
```
Write ONE sentence (under 20 words) that references this insight and connects it to a problem you solve:

Insight: "{{thought_leadership_insight}}"
Quote (optional): "{{extracted_quote}}"

The sentence should:
1. Acknowledge their expertise
2. Subtly hint at a related problem or opportunity
3. Avoid salesy language

Examples for consulting firms:
- "Your point about culture alignment resonates—many firms struggle to measure it systematically."
- "The retention challenge you mentioned is exactly what we're solving for mid-sized consultancies."

Return ONLY the sentence, no extra text. DO NOT repeat previous lines.

Previous lines to avoid repeating:
Subject: {{subject_line}}
First line: {{email_first_line}}
```

**Input Variables**:
- `{{thought_leadership_insight}}`
- `{{extracted_quote}}` (optional)
- `{{subject_line}}`
- `{{email_first_line}}`

**Output**:
- `email_body_insight`

**Use Case**:
- Email body (2nd sentence after opener)

**Credits**: 2 credits (ChatGPT)

---

### Custom Prompt: Transition to Value Prop

**Adapted from Clay Best Practices**

**Clay Prompt**:
```
Write ONE sentence (under 20 words) that transitions from their insight to your value proposition.

Their consulting specialty: {{consulting_specialty}}
Company: {{company_name_cleaned}}

The sentence should:
1. Be conversational, not salesy
2. Introduce "we help [firms like yours]" angle
3. Connect to their consulting specialty

Examples:
- "We work with HR consultancies to turn client engagements into scalable IP."
- "We're helping strategy firms like {{company_name_cleaned}} systematize their methodologies."

Return ONLY the sentence, no extra text. DO NOT repeat previous lines.

Previous lines to avoid repeating:
Subject: {{subject_line}}
First line: {{email_first_line}}
Body: {{email_body_insight}}
```

**Input Variables**:
- `{{consulting_specialty}}` (from Claygent research)
- `{{company_name_cleaned}}`
- Previous email components (to avoid repetition)

**Output**:
- `email_body_transition`

**Use Case**:
- Email body (transition to your pitch)

**Credits**: 2 credits (ChatGPT)

---

### Custom Prompt: PS Line (Personal Touch)

**Adapted from Prompt #2 (LinkedIn Profile Insights)**

**Clay Prompt**:
```
Write a personalized PS line (1 sentence, under 15 words) based on this profile data:

Education: {{education}}
Unique aspect: {{unique_aspect_1}}
Recent activity: {{recent_linkedin_post_summary}}

The PS should:
1. Reference something specific and authentic (alma mater, unique experience, recent achievement)
2. Be friendly, not salesy
3. Show you researched them

Examples:
- "PS — Go Wolverines! (saw you're a Michigan alum)"
- "PS — Congrats on the new hire you announced last month."
- "PS — Love that you volunteer with Big Brothers Big Sisters."

Return ONLY the PS line, starting with "PS —". DO NOT repeat previous lines.

Previous lines to avoid repeating:
Subject: {{subject_line}}
First line: {{email_first_line}}
Body: {{email_body_insight}}
Transition: {{email_body_transition}}
```

**Input Variables**:
- `{{education}}` (from LinkedIn enrichment)
- `{{unique_aspect_1}}` (from Prompt #2 output)
- `{{recent_linkedin_post_summary}}` (from Prompt #5 output)
- Previous email components

**Output**:
- `email_ps_line`

**Use Case**:
- Email closing (personal touch)

**Credits**: 1-2 credits (ChatGPT)

---

### Prompt #24: Creative Outreach (Alternative Approach)

**Clay Prompt (Example 1)**:
```
You are a creative advertiser who has turned into a prospecting expert that works at Clay.com.
Your goal is to write a compelling email that entices the CMO (Chief Marketing Officer) to take a meeting with Clay.com.

The email should be no more than 5 sentences long that are short and no longer than 15 words each.
The email should not be a single paragraph. It should contain an insight and a call to action (that is a question).

The content should include how clay can help {{Company Name}} with a website at {{Company Domain}} reach its buyers who are {{Personas}} working in the industries {{industries}}.
{{Company Name}} aims to provide the following value proposition {{Value Proposition}} to its ICP {{ICP}}.

Be creative how you phrase the call to action
```

**Input Variables**:
- `{{Company Name}}`
- `{{Company Domain}}`
- `{{Personas}}` (from Prompt #10 - who they sell to)
- `{{industries}}` (from company description)
- `{{Value Proposition}}` (from Prompt #16 - problem they solve)
- `{{ICP}}` (from company description)

**Output**:
- `creative_email_body` (full email, 5 sentences)

**Use Case**:
- Alternative to snippet-by-snippet approach (generates full email in one call)
- Good for A/B testing (compare snippet approach vs. full email generation)
- Faster workflow (1 AI call instead of 5-6)

**Credits**: 2-3 credits (ChatGPT, longer output)

**Adaptation for Your Use Case**:
- Replace "CMO" with "Founder/Managing Partner"
- Replace Clay.com references with your company/value prop
- Adjust industries/personas to consulting-specific language

---

## PHASE 5: DATA NORMALIZATION (CREDIT-FREE)

### Prompt #17: Normalize City from Location

**Clay Prompt**:
```
Extract the city from {{Location}}.
If {{Location}} is just a country, return "No City".
```

**Input Variables**:
- `{{Location}}` (raw location from LinkedIn, e.g., "San Francisco Bay Area", "United States", "NYC")

**Output**:
- `city` (e.g., "San Francisco", "New York City", "No City")

**Use Case**:
- Segmentation by geography
- Personalization: "Since you're in [city]..." or "I'm based in [nearby city]..."

**Credits**: 1 credit (ChatGPT) OR use Clay's "Normalize Location" tool (credit-free)

**Recommendation**: Use Clay's native "Normalize Location" tool first (credit-free), fallback to AI if location data is messy

---

### Prompt #18: Return Timezone

**Clay Prompt**:
```
Return the letter timezone for {{City Response}}, {{Country Response}}.
If there are multiple possible timezones, just return your best guess timezone.
Return only three letter timezone and nothing else.
```

**Input Variables**:
- `{{City Response}}` (from Prompt #17)
- `{{Country Response}}` (from location enrichment)

**Output**:
- `timezone` (e.g., "PST", "EST", "CET")

**Use Case**:
- Email sequencing (send emails during their business hours)
- Personalization: "Happy to chat this week—I'm EST, you're PST, so afternoons work best for me."

**Credits**: 1 credit (ChatGPT) OR use Clay's "Get Timezone" tool (if available, credit-free)

---

## RECOMMENDED WORKFLOW INTEGRATION

### High-Volume, Low-Touch (100+ leads/week)

**Use These Prompts**:
1. **#13 - B2B or B2C** (qualification filter)
2. **#19 - Seniority Bucket** (qualification filter)
3. **#20 - Clean Job Titles** (data normalization)
4. **#9 - Company Mission** (basic personalization)
5. **#12 - Role Focus** (basic personalization)
6. **Custom - Subject Line** (AI snippet)
7. **Custom - Email First Line** (AI snippet)
8. **Custom - Email Body** (AI snippet)

**Total Credits/Lead**: ~10-15 credits (affordable for high volume)

---

### High-Touch, Deep Personalization (10-20 leads/week)

**Use These Prompts**:
1. All prompts from High-Volume approach
2. **#2 - LinkedIn Profile Insights** (3 unique aspects)
3. **#16 - Problems Company Solves** (deep company research)
4. **#5 - LinkedIn Post Summary** (recent activity)
5. **#3 - News Article Summary** (recent wins)
6. **#4 - Infer Problem from Job Listing** (growth signals)
7. **Custom - PS Line** (personal touch)

**Total Credits/Lead**: ~30-50 credits (premium personalization)

**Conditional Runs**:
- Only run deep research (#2, #16, #5, #3, #4) IF `lead_score >= 70` AND email found

---

## TESTING & OPTIMIZATION

### A/B Test Framework

**Test 1: Subject Line Styles**
- **A**: Prompt #9 output ("Your insights on scaling consultancies")
- **B**: Question format ("Quick question about [their specialty]?")
- **Measure**: Open rate

**Test 2: Email Length**
- **A**: AI snippets (5-6 sentences, each generated separately)
- **B**: Prompt #24 creative email (5 sentences, generated in one call)
- **Measure**: Response rate

**Test 3: Personalization Depth**
- **A**: Basic personalization (company mission + role focus)
- **B**: Deep personalization (thought leadership + LinkedIn insights + PS line)
- **Measure**: Response rate, cost per reply

**Test 4: Thought Leadership vs. News**
- **A**: Reference their podcast/article (Prompt #5)
- **B**: Reference recent news (Prompt #3)
- **Measure**: Response rate

---

## COST OPTIMIZATION TIPS

### 1. Use Conditional Runs
- Only run expensive prompts (#2, #16) on high-scoring leads
- Example: `IF lead_score >= 70 AND email_found = TRUE`

### 2. Fallback Logic
- Try cheap enrichment first, fallback to AI if needed
- Example: Normalize location with Clay tool (free) → AI cleanup (1 credit)

### 3. Batch AI Calls
- Combine multiple extractions in one prompt (e.g., Prompt #16 asks 5 questions in one call)

### 4. Cache Results
- If researching same company for multiple contacts, reuse company-level research
- Example: Prompts #9, #10, #13, #16 run once per company, lookup for each person

### 5. Skip Low-Value Prompts
- Don't run Prompt #11 (pricing) unless budget qualification is critical
- Don't run Prompt #4 (job listings) if most consulting firms don't post publicly

---

## PROMPT CUSTOMIZATION EXAMPLES

### Customize Prompt #9 for Your Industry

**Original** (generic):
```
Complete this prompt: "I was on your LinkedIn company page and it looks you're focused on"
```

**Customized** (consulting-specific):
```
Complete this prompt: "I noticed your firm specializes in"
```

---

### Customize Prompt #24 for Consulting Firms

**Original** (generic SaaS pitch):
```
Your goal is to write a compelling email that entices the CMO (Chief Marketing Officer) to take a meeting with Clay.com.
```

**Customized** (consulting firm pitch):
```
Your goal is to write a compelling email that entices the Founder or Managing Partner of a consulting firm to take a meeting about [your value proposition].

The email should address common challenges consulting firms face:
- Scaling delivery without burning out founders
- Systemizing expertise into repeatable methodologies
- Growing revenue while maintaining quality

Be specific to consulting firms, not generic SaaS companies.
```

---

## FINAL RECOMMENDATIONS

### Use These Prompts Verbatim (Proven by Clay Team):
- #9 - Company Mission
- #10 - Who They Sell To
- #13 - B2B or B2C
- #19 - Seniority Bucket
- #20 - Clean Job Titles

### Adapt These for Consulting Focus:
- #2 - LinkedIn Profile Insights (add consulting-specific achievements to look for)
- #16 - Problems Company Solves (emphasize consulting pain points)
- #24 - Creative Outreach (replace CMO with Founder, add consulting challenges)

### Create Custom Prompts (Use Clay's Style):
- Subject lines (follow <8 words, second person format)
- Email snippets (follow 1 sentence, <15-20 words format)
- PS lines (follow personal touch, authentic reference format)

---

**Next Steps**:
1. Test 3-5 prompts on 10-lead sample
2. Measure credit usage and output quality
3. Scale winners, kill losers
4. Iterate on custom prompts based on response data
