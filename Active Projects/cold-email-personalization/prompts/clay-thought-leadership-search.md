# Clay Prompt: Thought Leadership Search

**Purpose**: Find thought leadership content (podcasts, articles, videos, interviews) for a lead
**Platform**: Clay.com (Claygent)
**Output**: Single URL

---

## Prompt

```
Find thought leadership content for {{first_name}} {{last_name}} at {{company_name}}.

=== WHAT TO FIND ===
Content where this person shares expertise: podcast interviews, articles they wrote, videos, conference talks, LinkedIn articles, newsletter posts.

=== VERIFY IT'S THE RIGHT PERSON ===
Match the name AND company (current or mentioned in content). If both match, it's valid.

=== REJECT ===
- Company bio/about pages
- LinkedIn profile pages (the profile itself, not articles they wrote)
- Press releases where they're just mentioned
- Event attendee lists

=== SEARCH ===
"{{first_name}} {{last_name}}" {{company_name}} + podcast OR interview OR article OR keynote OR webinar
site:youtube.com "{{first_name}} {{last_name}}"
site:medium.com "{{first_name}} {{last_name}}"
site:linkedin.com/pulse "{{first_name}} {{last_name}}"
site:substack.com "{{first_name}} {{last_name}}"
"{{first_name}} {{last_name}}" + authored OR byline OR guest

=== WHEN TO STOP ===
When you find content that features {{first_name}} {{last_name}} from {{company_name}} sharing their expertise, STOP and return it. Do not keep searching for something "better."

=== OUTPUT FORMAT - CRITICAL ===
Return ONLY a valid URL. Nothing else.

CORRECT:
https://nationalcioreview.com/article-title

WRONG:
research_url: https://nationalcioreview.com/article-title

WRONG:
I found this article: https://nationalcioreview.com/article-title

Just the URL. No labels. No text before or after. Only the URL starting with https://

If nothing found, return exactly:
NO RESULTS

=== IMPORTANT ===
Good enough is good enough. If you found content featuring this person, return the URL.
```

---

## Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `{{first_name}}` | Lead's first name | Jennifer |
| `{{last_name}}` | Lead's last name | Becker |
| `{{company_name}}` | Lead's current company | CIO Partners, Inc. |

## Output

- Single URL (e.g., `https://example.com/article-title`)
- Or `NO RESULTS` if nothing found

## Recommended Model

- **Production**: Claude Sonnet 4 or 3.5
- **Testing**: Claude Haiku 3.5 (faster, cheaper, less reliable)

---

*Last Updated: November 2025*
