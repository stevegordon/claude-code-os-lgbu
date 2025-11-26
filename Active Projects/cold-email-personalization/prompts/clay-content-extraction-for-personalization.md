# Clay Prompt: Content Extraction for Email Personalization

**Purpose**: Visit a thought leadership URL and extract personalization variables for cold email
**Platform**: Clay.com (Claygent)
**Input**: URL from thought leadership search
**Output**: contentType, topic, specificInsight, platform

---

## Prompt

```
Visit this URL: {{research_url}}

Read the content carefully. Find a specific insight, opinion, or recommendation the author made—something concrete they said, not a general topic description.

Return ONLY these four lines, nothing else:

contentType: [article | podcast interview | video | LinkedIn post | newsletter]
topic: [2-5 words describing the main subject]
specificInsight: [a specific point they made - use their words or paraphrase a concrete idea, not a vague description of their expertise]
platform: [see rules below]

PLATFORM RULES:
- If on YouTube, return: YouTube
- If on Substack, return: Substack
- If on Medium, return: Medium
- If on LinkedIn, return: LinkedIn
- If on Twitter/X, return: X
- If on Instagram, return: Instagram
- If on Forbes, Inc, FastCompany, HBR, or major publication, return the publication name
- If on their own podcast they host, return: podcast
- If guest on someone else's podcast, return: recent podcast
- If on a random website, company blog, or unknown site, return: recent

SPECIFICINSIGHT RULES:
- Must be something they actually said or argued, not a description of their credentials
- Should start with "your" (e.g., "your point about...", "your take on...", "your advice to...")
- Should be specific enough that only this person could have said it
- Keep under 15 words

GOOD specificInsight examples:
- your point about agencies plateauing when owners can't let go of sales
- your advice to treat every M&A conversation as a two-year relationship
- your take on why most diversity initiatives fail at the interview stage
- your argument that PE firms undervalue operational technology investments

BAD specificInsight examples (too vague):
- expertise in M&A trends and market benchmarking
- insights on leadership and growth
- experience in executive search
- knowledge of the insurance industry

Extract a real insight from the content. If you can't find a specific point they made, look for:
- A recommendation they gave
- A contrarian opinion they shared
- A mistake they said people make
- A prediction they made
- A framework or model they described

Do not add any other text, explanations, or labels beyond these four lines.
```

---

## Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `{{research_url}}` | URL from thought leadership search | https://nationalcioreview.com/article-title |

## Output

Four lines in this exact format:
```
contentType: article
topic: technology leadership in private equity
specificInsight: your point about aligning digital strategy with PE value creation timelines
platform: National CIO Review
```

## How Output Maps to Email Template

Email template line:
```
I {read|came across|saw} your {contentType} on {topic}—{specificInsight}
```

Subject line template:
```
Quick question about your {platform} content
```

## Recommended Model

- **Production**: Claude Sonnet 4 or 3.5 (needs good comprehension for insight extraction)
- **Not recommended**: Haiku (insights will be too generic)

---

*Last Updated: November 2025*
