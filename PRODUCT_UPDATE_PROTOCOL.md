# Product Update Protocol - Claude Code Business OS

**Purpose**: Enable customers to receive upstream system improvements WITHOUT overwriting their business-specific customizations.

**Problem**: Git `pull` overwrites local changes. Manual copying is error-prone. Need systematic merge strategy.

**Solution**: 3-layer architecture + structured update workflow.

---

## File Classification System

### Layer 1: Framework Files (ALWAYS UPDATE)
**Definition**: System mechanics that customers should take from upstream without modification

**Files**:
- `scripts/*.js` - All automation scripts
- `System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md`
- `System Documentation/CCGG_MECHANISMS_REGISTRY.md`
- `System Documentation/BRUTAL_PRIORITIZATION_FRAMEWORK.md`
- `System Documentation/DEPENDENCY_TRACKING_FORCING_FUNCTIONS.md`
- `System Documentation/OPERATIONAL_WORKFLOWS_FOR_BUSINESS_OS.md`
- `Project Memory/*/[*_TEMPLATE.md]` - All template files
- `README.md` - Product overview (generic)
- `MEMBER_ONBOARDING.md` - Setup instructions

**Customer Action**: `git checkout origin/main -- [file]` (take upstream version, discard local)

**Why Safe**: These files contain NO business-specific content, only system logic

---

### Layer 2: Configuration Files (NEVER OVERWRITE)
**Definition**: Business-specific content unique to each customer

**Files**:
- `AI Growth Engine/Knowledge Base/*` - Customer's knowledge base
- `Active Projects/*` - Customer's projects (except templates)
- `Project Memory/Strategic Planning/*` - Customer's strategic plans
- `Project Memory/Productivity Tracking/*` - Customer's assessments
- `Project Memory/Daily Planning/*` - Customer's roadmaps
- `operations_log.txt` - Customer's activity log
- `.gitignore` - Customer's exclusions (may differ)
- `.claude/settings.local.json` - Customer's local settings

**Customer Action**: `git checkout HEAD -- [file]` (keep local version, ignore upstream)

**Why**: These contain customer's business data - upstream has nothing relevant

---

### Layer 3: Hybrid Files (MANUAL MERGE REQUIRED)
**Definition**: Files with BOTH framework sections AND business content sections

**Primary Example**: `CLAUDE.md`

**Structure**:
```markdown
<!-- ========================================= -->
<!-- FRAMEWORK SECTION - SYNC FROM UPSTREAM   -->
<!-- ========================================= -->
## WINDOWS ENVIRONMENT
## POWERSHELL PATTERNS
## ERROR HANDLING
## CORE CAPABILITIES
## PROJECT MEMORY SYSTEM
## COMMAND REFERENCE
## WORKFLOWS (Daily Roadmap, Productivity, etc.)
## SYSTEM MECHANISMS REGISTRY

<!-- ========================================= -->
<!-- CUSTOMER SECTION - NEVER OVERWRITE       -->
<!-- ========================================= -->
## YOUR BUSINESS CONTEXT
- OOBG: [Customer fills this]
- Knowledge Base: [Customer's path]
- Strategic Priorities: [Customer's]

## YOUR ACTIVE PROJECTS
[Customer's projects]

## AI GROWTH ENGINE KNOWLEDGE BASE ACCESS
[Customer's knowledge files]
```

**Customer Action**: 3-way merge (detailed workflow below)

**Other Hybrid Files**:
- `System Documentation/SYSTEM_ASSET_REGISTRY.md` - Framework structure + customer's assets
- `System Documentation/PROJECT_DEPENDENCY_GRAPH.md` - Framework + customer's dependencies

---

## Update Workflow (Step-by-Step)

### When Upstream Update Available

**Scenario**: Daron pushes new system improvements to GitHub repo

**Customer receives notification**: "New updates available from upstream"

**Customer Workflow**:

#### Step 1: Backup Current State
```bash
# Create backup branch before updating
git checkout -b backup-pre-update-$(date +%Y%m%d)
git push origin backup-pre-update-$(date +%Y%m%d)

# Return to main branch
git checkout main
```

**Why**: Safety net - can revert if merge goes wrong

---

#### Step 2: Fetch Upstream Changes
```bash
# Fetch latest from upstream (don't merge yet)
git fetch origin

# See what changed
git log HEAD..origin/main --oneline
git diff HEAD..origin/main --name-only
```

**Output**: List of files changed in upstream update

**Customer reviews**:
- Layer 1 files (framework) → Safe to update
- Layer 2 files (config) → Ignore upstream
- Layer 3 files (hybrid) → Manual merge needed

---

#### Step 3: Update Framework Files (Layer 1)
```bash
# Option A: Take ALL framework files from upstream
git checkout origin/main -- scripts/
git checkout origin/main -- "System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md"
git checkout origin/main -- "System Documentation/CCGG_MECHANISMS_REGISTRY.md"
# ... (all Layer 1 files)

# Option B: Use update script (future automation)
node scripts/update-from-upstream.js --layer 1
```

**Result**: Framework files updated, no business data lost

---

#### Step 4: Preserve Configuration Files (Layer 2)
```bash
# Keep local versions (ignore upstream changes)
git checkout HEAD -- "AI Growth Engine/"
git checkout HEAD -- "Active Projects/"
git checkout HEAD -- "Project Memory/Strategic Planning/"
git checkout HEAD -- "Project Memory/Productivity Tracking/"
git checkout HEAD -- "operations_log.txt"

# Option B: Use update script
node scripts/update-from-upstream.js --layer 2 --action preserve
```

**Result**: Business data untouched

---

#### Step 5: Merge Hybrid Files (Layer 3) - CLAUDE.md

**Manual 3-Way Merge**:

```bash
# See what changed in upstream CLAUDE.md
git diff HEAD..origin/main -- CLAUDE.md

# Create temporary files for comparison
git show origin/main:CLAUDE.md > CLAUDE_upstream.md
cp CLAUDE.md CLAUDE_local.md

# Use merge tool (VS Code, or manual review)
code --diff CLAUDE_local.md CLAUDE_upstream.md
```

**Merge Strategy**:

1. **Identify sections** (use section markers `<!-- FRAMEWORK SECTION -->` and `<!-- CUSTOMER SECTION -->`)

2. **For FRAMEWORK sections** (## WINDOWS ENVIRONMENT, ## WORKFLOWS, etc.):
   - **TAKE UPSTREAM VERSION** (Daron's improvements)
   - Copy from `CLAUDE_upstream.md` to `CLAUDE.md`

3. **For CUSTOMER sections** (## YOUR BUSINESS CONTEXT, ## YOUR ACTIVE PROJECTS):
   - **KEEP LOCAL VERSION** (your business content)
   - Do NOT copy from upstream (it's Daron's business, not yours)

4. **For NEW sections in upstream** (e.g., Daron added "## NEW WORKFLOW"):
   - **ADD to FRAMEWORK section** (copy entire new section)
   - Check if section needs customization (most don't)

5. **Save merged CLAUDE.md**

**Example Merge**:

**Upstream added**: New workflow "## Weekly Strategic Planning" (500 lines)
**Your CLAUDE.md has**: Custom "## YOUR BUSINESS CONTEXT" section (100 lines)

**Result**:
```markdown
<!-- FRAMEWORK SECTION -->
## WINDOWS ENVIRONMENT
[Daron's latest version]

## WORKFLOWS
### Daily Roadmap
[Daron's latest version]

### Weekly Strategic Planning  <-- NEW from upstream
[Daron's new 500 lines]

<!-- CUSTOMER SECTION -->
## YOUR BUSINESS CONTEXT
[Your 100 lines - UNCHANGED]
```

---

#### Step 6: Test Merged System

```bash
# Commit merged changes
git add CLAUDE.md
git commit -m "MERGE: Upstream update - Added Weekly Strategic Planning workflow"

# Test workflows
# - Generate daily roadmap (verify new framework features work)
# - Verify your business context still loads correctly
# - Check operations_log.txt writes
```

**Validation Checklist**:
- [ ] Daily Roadmap generates without errors
- [ ] Productivity Assessment references YOUR business context (not Daron's)
- [ ] AI Growth Engine path points to YOUR knowledge base
- [ ] Scripts run without errors
- [ ] operations_log.txt writes correctly

**If test fails**: Revert to backup branch
```bash
git reset --hard backup-pre-update-$(date +%Y%m%d)
```

---

#### Step 7: Push Updated System

```bash
# Push to your remote repository
git push origin main

# Tag the update (optional, for version tracking)
git tag -a v1.1-upstream-update-$(date +%Y%m%d) -m "Merged upstream improvements: Weekly Strategic Planning"
git push origin --tags
```

---

## Conflict Resolution Examples

### Conflict 1: Daron Modified Workflow You Also Modified

**Scenario**:
- Daron improved "Daily Roadmap - Step 3" (added new data source)
- You also modified "Daily Roadmap - Step 3" (customized for your business)

**Detection**:
```bash
git diff HEAD..origin/main -- CLAUDE.md
# Shows conflicting changes in same section
```

**Resolution**:
1. **Read Daron's change** (what improvement did he add?)
2. **Read your change** (what did you customize?)
3. **Combine both**:
   - Take Daron's framework improvement (new data source logic)
   - Preserve your business customization (data paths, file names)
4. **Test thoroughly** (ensure both changes work together)

**Example**:
- **Daron added**: "Read FUTURE_TASKS.md for scheduled work"
- **You customized**: "Read YOUR_CUSTOM_FILE.md for priorities"
- **Merged version**: Read BOTH files (Daron's + yours)

---

### Conflict 2: Daron Deleted Section You Still Use

**Scenario**:
- Daron removed "Legacy Workflow X" (obsolete in his system)
- You still use "Legacy Workflow X" (works for your business)

**Detection**:
```bash
git diff HEAD..origin/main -- CLAUDE.md
# Shows section deleted in upstream
```

**Resolution**:
1. **Keep your section** (don't delete)
2. **Add comment**: `<!-- CUSTOM: Kept legacy workflow, still in use -->`
3. **Future**: Check if Daron's new replacement workflow fits your needs

**Example**:
- **Daron removed**: Old manual index sync process (replaced with automated script)
- **You keep**: Old manual process (automated script doesn't fit your setup yet)
- **Action**: Keep old section, test new script in parallel, migrate when ready

---

### Conflict 3: New Framework Requires New Files You Don't Have

**Scenario**:
- Daron added "Phase Tracker" mechanism (requires PHASE_TRACKER.md files in projects)
- You don't have these files yet

**Detection**: CLAUDE.md references files that don't exist

**Resolution**:
1. **Read new mechanism documentation** (understand what it does)
2. **Decide**: Do I need this now, or later?
3. **If now**: Create required files from templates
4. **If later**: Add to backlog, mechanism won't break system (graceful degradation)

**Example**:
- **Daron added**: Multi-phase project tracking (requires PHASE_TRACKER.md)
- **You**: Don't have multi-phase projects yet
- **Action**: CLAUDE.md works fine (checks for file, skips if missing), add phase trackers when you have multi-phase work

---

## Automation: Update Helper Script (Future)

**Goal**: Simplify update workflow with script

**Usage**:
```bash
# Fetch and classify changes
node scripts/update-from-upstream.js --fetch

# Output:
# Layer 1 (Framework - safe to update): 5 files
# Layer 2 (Config - preserve local): 8 files
# Layer 3 (Hybrid - manual merge): 1 file (CLAUDE.md)

# Auto-update Layer 1
node scripts/update-from-upstream.js --layer 1 --apply

# Preserve Layer 2
node scripts/update-from-upstream.js --layer 2 --preserve

# Guide Layer 3 merge
node scripts/update-from-upstream.js --layer 3 --merge-assistant
# Opens side-by-side diff, highlights conflicts, suggests resolution
```

**Implementation**: Phase 2 (after validating manual workflow)

---

## Communication: Update Notifications

**When Daron Pushes Update**:

1. **GitHub Release Notes** (manual):
   ```markdown
   # Release v1.1 - Weekly Strategic Planning Workflow

   ## What's New
   - Added comprehensive weekly strategic planning workflow
   - Enhanced CLAUDE.md with 500 lines of strategic planning guidance
   - New template: Project Memory/Strategic Planning/WEEKLY_PLAN_TEMPLATE.md

   ## Update Instructions
   - **Framework files** (auto-merge safe): scripts/, System Documentation/
   - **Hybrid files** (manual merge): CLAUDE.md (see PRODUCT_UPDATE_PROTOCOL.md Step 5)
   - **Your files** (preserve): Active Projects/, AI Growth Engine/, operations_log.txt

   ## Breaking Changes
   - None

   ## Testing Checklist
   - [ ] Daily Roadmap generates
   - [ ] Weekly Strategic Planning works
   - [ ] Your business context intact
   ```

2. **Optional: Discord/Email Notification** (future):
   - "New Business OS update available: v1.1"
   - Link to release notes
   - Link to PRODUCT_UPDATE_PROTOCOL.md

---

## Customer Training: Update Walkthrough

**Included in MEMBER_ONBOARDING.md**:

### Section: "Updating Your Business OS"

**When to Update**:
- New release notification from Daron
- Every 2-4 weeks (check GitHub releases)
- Before major projects (get latest system improvements)

**How to Update** (Summary):
1. Backup (create backup branch)
2. Fetch upstream (see what changed)
3. Update framework files (Layer 1 - safe)
4. Preserve config files (Layer 2 - yours)
5. Merge hybrid files (Layer 3 - CLAUDE.md manual merge)
6. Test (validate workflows work)
7. Push (save updated system)

**Full Guide**: See `PRODUCT_UPDATE_PROTOCOL.md`

**Video Tutorial** (future): "How to Update Business OS Without Losing Your Work"

---

## Version Compatibility

**Semantic Versioning**:
- **v1.0**: Initial release (baseline system)
- **v1.1**: Minor improvements (workflow enhancements, new templates)
- **v2.0**: Major changes (restructured CLAUDE.md, new architecture)

**Compatibility Promise**:
- **Minor versions (1.x)**: Always backward compatible, safe to update
- **Major versions (2.x)**: May require migration, detailed upgrade guide provided

**Migration Guides** (for major versions):
- `MIGRATION_v1_to_v2.md` - Step-by-step upgrade instructions
- Breaking changes documented
- Rollback instructions if migration fails

---

## Troubleshooting

### Issue 1: Merge Conflict in CLAUDE.md

**Symptom**: Git reports merge conflict, can't auto-merge

**Solution**:
```bash
# Abort automatic merge
git merge --abort

# Use manual 3-way merge (Step 5 above)
git show origin/main:CLAUDE.md > CLAUDE_upstream.md
# Manually merge sections, test, commit
```

---

### Issue 2: Update Broke My Workflows

**Symptom**: Daily Roadmap fails after update, errors in operations_log.txt

**Solution**:
```bash
# Revert to backup
git reset --hard backup-pre-update-[date]

# Identify what broke
git diff HEAD backup-pre-update-[date] -- CLAUDE.md
# Review changes, find breaking change

# Fix specific issue (e.g., file path changed)
# Test again
```

---

### Issue 3: Lost My Business Context After Update

**Symptom**: CLAUDE.md now has Daron's business context (CCGG, avatars), not mine

**Cause**: Accidentally took entire upstream CLAUDE.md (should have merged)

**Solution**:
```bash
# Restore your CUSTOMER SECTION from backup
git show backup-pre-update-[date]:CLAUDE.md > CLAUDE_backup.md

# Extract YOUR BUSINESS CONTEXT section
# Copy to current CLAUDE.md (replace Daron's section)

# Commit fix
git add CLAUDE.md
git commit -m "FIX: Restored my business context after update"
```

---

## Future Enhancements

**Phase 2: Smart Merge Tool**
- Script detects framework vs customer sections automatically
- Auto-merges Layer 1, preserves Layer 2, assists Layer 3
- Reduces manual work

**Phase 3: Differential Updates**
- Daron publishes "patch files" (only changed sections)
- Customers apply patches (like OS updates)
- No full file replacements

**Phase 4: Update Rollback**
- One-click revert to pre-update state
- Test mode (try update, revert if fails)

---

## Summary

**3-Layer System**:
1. **Framework** (take upstream) - Scripts, system docs, templates
2. **Config** (keep local) - Business data, projects, knowledge base
3. **Hybrid** (manual merge) - CLAUDE.md framework + business sections

**Update Process**:
1. Backup → Fetch → Classify → Update Layer 1 → Preserve Layer 2 → Merge Layer 3 → Test → Push

**Safety**:
- Backup branch before every update
- Test workflows after merge
- Revert if anything breaks

**Communication**:
- GitHub release notes (what's new, how to update)
- MEMBER_ONBOARDING.md (update walkthrough)
- Video tutorial (future)

**Result**: Customers get your system improvements WITHOUT losing their business customizations.

---

**Next Steps for Daron**:
1. Review this protocol (validate approach)
2. Add section markers to CLAUDE.md (`<!-- FRAMEWORK SECTION -->` and `<!-- CUSTOMER SECTION -->`)
3. Document first update (v1.0 → v1.1 test case)
4. Train first customer (validate workflow)
5. Build update helper script (Phase 2 automation)
