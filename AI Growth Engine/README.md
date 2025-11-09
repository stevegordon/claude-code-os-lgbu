# AI Growth Engine

This is your **strategic knowledge base** - where you store business strategy, customer understanding, positioning, and core frameworks that inform all operational decisions.

## Purpose

The AI Growth Engine is the "brain" of your business OS. When Claude generates roadmaps, assesses productivity, or validates strategic alignment, it reads these files to understand:

- What you're trying to achieve (OOBG)
- Who you serve (Customer Avatars)
- How you're different (USP, Positioning)
- What you offer (Products, Services)
- How you communicate (Voice, Persona)

**Quality of outputs = Quality of strategic knowledge base**

## Folder Structure

### Knowledge Base/ (YOU POPULATE THIS)

This is where YOUR business strategy lives.

**Start here**: Create these files first (use templates in `_Template_Examples/`)

**Minimum Required Files:**

1. **Strategy.md**
   - Your OOBG (One Obsessional Big Goal)
   - Unique Vehicle (how you uniquely deliver value)
   - Current strategic priorities
   - Current bottleneck
   - 2-year vision

2. **Target_Avatars.md**
   - Ideal customer profiles
   - Demographics, pain points, goals
   - How you help each avatar
   - Which avatars are primary vs secondary

3. **Product_Information.md**
   - Core offerings
   - Pricing
   - Delivery method
   - Customer journey (discovery → conversion → ascension)
   - Module/lesson structure (if applicable)

**Recommended Files:**

4. **Attractive_Character.md**
   - Your voice and persona
   - Communication style
   - Core values and beliefs
   - Story and background

5. **Unique_Selling_Proposition.md**
   - What makes you different
   - Core frameworks you teach
   - Competitive advantages

6. **Offers_and_Funnel.md**
   - Detailed pricing structure
   - Funnel architecture
   - Upsells and downsells
   - Conversion strategies

7. **Strategic_Framework.md**
   - Category positioning
   - Market narrative
   - "Play Bigger" framework (if applicable)

### System Prompt/

AI system prompts for your business (if you build custom GPTs or AI tools).

**Optional**: Most members won't need this folder initially.

### _Template_Examples/

Example knowledge base files showing proper structure.

**Use these as starting points** when creating your files.

## How to Populate

### Step 1: Copy Templates

```bash
# Copy template to Knowledge Base folder
cp "AI Growth Engine/_Template_Examples/Strategy_TEMPLATE.md" "AI Growth Engine/Knowledge Base/Strategy.md"
```

Or manually copy/paste content into new files.

### Step 2: Customize with YOUR Business Info

Open `Strategy.md` and replace:
- `[Your One Obsessional Big Goal]` → Your actual OOBG
- `[Your Unique Vehicle]` → How you deliver value
- `[Your Current Priorities]` → Your real priorities

**Be specific and honest**. This isn't marketing copy - it's strategic truth.

### Step 3: Validate with Claude

Ask Claude:
```
"Read my AI Growth Engine knowledge base and summarize what you understand about my business"
```

Claude should accurately describe your OOBG, avatars, offerings.

**If Claude misunderstands**: Your knowledge base needs clarification. Edit and re-ask.

### Step 4: Iterate as Business Evolves

**Update knowledge base when**:
- Strategic priorities change
- New avatar emerges
- Offerings change (pricing, structure, delivery)
- OOBG pivots
- Bottleneck shifts

**Frequency**: Review quarterly, update as needed.

## Usage in Claude Code

### Strategic Validation

When Claude validates project alignment:

```
"Validate alignment for [project description]"
```

Claude reads:
- `Strategy.md` → Check OOBG relevance
- `Target_Avatars.md` → Check avatar targeting
- `Product_Information.md` → Check customer journey fit

Returns scores (0-100) + recommendations.

### Daily Roadmap Generation

When Claude generates roadmaps:

```
"Generate daily roadmap"
```

Claude reads:
- `Strategy.md` → Prioritize tasks by OOBG alignment
- Current bottleneck → Surface bottleneck-solving tasks first
- Strategic priorities → Rank by strategic importance

### Brutal Prioritization

When Claude applies brutal prioritization:

```
"Apply brutal prioritization"
```

Claude reads:
- `Strategy.md` → Score tasks against OOBG
- Current bottleneck → Bonus points for bottleneck work
- Strategic priorities → Validate P1 tasks align with priorities

## Best Practices

1. **Start simple**: Minimum 3 files (Strategy, Avatars, Products)
2. **Be honest, not aspirational**: Real current state, not future vision
3. **Update regularly**: Stale strategy = misaligned decisions
4. **Specific > Generic**: "Coaches making $5-20K/mo" > "Entrepreneurs"
5. **Prose over bullet points**: Claude understands context better with narrative
6. **Cross-reference**: Link files together (e.g., Strategy references Avatars)

## Common Mistakes

❌ **Too vague**: "Help people grow businesses" (not strategic)
✅ **Specific**: "Build #1 AI automation community for coaches"

❌ **Too long**: 50-page strategy documents (Claude can't process)
✅ **Concise**: 2-5 pages per file (focused, scannable)

❌ **One-time setup**: Create and forget
✅ **Living document**: Update as business evolves

❌ **Marketing copy**: "We're the best!"
✅ **Strategic truth**: "We focus on YouTube + Community, no courses"

## Questions?

- How to structure files? See `_Template_Examples/`
- How Claude uses this? See CLAUDE.md → "AI GROWTH ENGINE" section
- Need help populating? Ask in community or on group calls

---

**Remember**: This knowledge base is the foundation of your entire Business OS. Invest time here - everything else depends on it.
