# Update Quick Reference - Claude Code Business OS

**Quick guide for updating your system when Daron releases improvements**

---

## EASIEST: Automated Update Script (Recommended)

**Just run this command** and answer a few prompts:

```bash
node scripts/update-from-upstream.js
```

**What it does automatically**:
- ✅ Creates backup branch
- ✅ Fetches upstream changes
- ✅ Shows what changed
- ✅ Updates framework files (scripts, docs)
- ✅ Preserves your business files
- ✅ Guides CLAUDE.md merge (opens VS Code diff)
- ✅ Commits changes
- ✅ Tests the update

**Time**: 5-10 minutes with guided prompts

**Use this method** if you want the safest, easiest update experience.

---

## Manual Update (For Advanced Users)

If you prefer running Git commands yourself:

### TL;DR - 5-Minute Update

**Prerequisites**: Make sure you're in your Business OS folder
```bash
cd claude-code-os-lgbu  # or wherever you cloned it
```

**Update Commands**:
```bash
# 1. Backup (safety net - create backup branch)
git checkout -b backup-pre-update-$(date +%Y%m%d)
git checkout main  # Return to main branch

# 2. Fetch Daron's latest changes (doesn't modify your files yet)
git fetch origin

# 3. See what Daron changed (review before applying)
git log HEAD..origin/main --oneline
git diff HEAD..origin/main --name-only

# 4. Update framework files ONLY (scripts, system docs - safe to overwrite)
git checkout origin/main -- scripts/
git checkout origin/main -- "System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md"
git checkout origin/main -- "System Documentation/CCGG_MECHANISMS_REGISTRY.md"
git checkout origin/main -- "System Documentation/BRUTAL_PRIORITIZATION_FRAMEWORK.md"
# ... add any other system docs Daron mentions in release notes

# 5. Keep YOUR business files (never overwrite these)
git checkout HEAD -- "AI Growth Engine/"
git checkout HEAD -- "Active Projects/"
git checkout HEAD -- "Project Memory/"
git checkout HEAD -- operations_log.txt

# 6. Merge CLAUDE.md manually (see "CLAUDE.md Manual Merge" section below)
# This is the ONLY file requiring manual attention

# 7. Test
# - Ask Claude: "Generate daily roadmap"
# - Verify your business context loads correctly

# 8. Commit merged update
git add .
git commit -m "MERGE: Upstream update from Daron - [feature name from release notes]"

# 9. Push to YOUR GitHub repo (if you have one)
# NOTE: If you DON'T have your own GitHub repo, skip this step
git push origin main
```

**Time**: 5-10 minutes (most time spent on Step 6 - CLAUDE.md merge)

---

## CLAUDE.md Manual Merge (Step 5)

### Option A: Side-by-Side Diff (Recommended)

```bash
# Create comparison files
git show origin/main:CLAUDE.md > CLAUDE_upstream.md
cp CLAUDE.md CLAUDE_local.md

# Open diff tool
code --diff CLAUDE_local.md CLAUDE_upstream.md
```

**What to do**:
1. **FRAMEWORK SECTION** (top of file, before `<!-- CUSTOMER SECTION -->`):
   - **TAKE UPSTREAM** (Daron's improvements)
   - Copy from `CLAUDE_upstream.md` to `CLAUDE.md`

2. **CUSTOMER SECTION** (after `<!-- CUSTOMER SECTION -->` marker):
   - **KEEP LOCAL** (your business content)
   - Do NOT copy from upstream

3. **Save merged CLAUDE.md**

---

### Option B: Manual Review (If You Prefer)

```bash
# See what changed
git diff HEAD..origin/main -- CLAUDE.md

# Identify sections (look for section markers)
# - Framework sections: TAKE upstream
# - Customer sections: KEEP local
```

**Section Markers**:
- `<!-- FRAMEWORK SECTION - SYNC FROM UPSTREAM -->` = TAKE Daron's version
- `<!-- CUSTOMER SECTION - NEVER OVERWRITE -->` = KEEP your version

---

## File Classification Cheat Sheet

### Layer 1: TAKE FROM UPSTREAM (Framework)
- ✅ `scripts/*.js` - All scripts
- ✅ `System Documentation/*.md` - All system docs
- ✅ `Project Memory/*_TEMPLATE.md` - All templates
- ✅ `README.md`
- ✅ `MEMBER_ONBOARDING.md`

**Command**: `git checkout origin/main -- [file]`

---

### Layer 2: KEEP LOCAL (Your Business)
- 🛡️ `AI Growth Engine/Knowledge Base/*` - Your knowledge
- 🛡️ `Active Projects/*` - Your projects
- 🛡️ `Project Memory/Strategic Planning/*` - Your plans
- 🛡️ `Project Memory/Productivity Tracking/*` - Your assessments
- 🛡️ `Project Memory/Daily Planning/*` - Your roadmaps
- 🛡️ `operations_log.txt` - Your activity log

**Command**: `git checkout HEAD -- [file]`

---

### Layer 3: MANUAL MERGE (Hybrid)
- ⚠️ `CLAUDE.md` - Framework + your business context
- ⚠️ `System Documentation/SYSTEM_ASSET_REGISTRY.md` - Framework + your assets

**Process**: See "CLAUDE.md Manual Merge" above

---

## Troubleshooting

### "Merge conflict in CLAUDE.md"
```bash
# Abort auto-merge
git merge --abort

# Use manual merge (see above)
```

### "Update broke my workflows"
```bash
# Revert to backup
git reset --hard backup-pre-update-[date]

# Identify issue, fix, test again
```

### "Lost my business context"
```bash
# Restore from backup
git show backup-pre-update-[date]:CLAUDE.md > CLAUDE_backup.md

# Extract your CUSTOMER SECTION
# Copy to current CLAUDE.md

# Commit fix
git add CLAUDE.md
git commit -m "FIX: Restored business context"
```

---

## Full Documentation

See [PRODUCT_UPDATE_PROTOCOL.md](PRODUCT_UPDATE_PROTOCOL.md) for complete details, conflict resolution, and advanced scenarios.

---

## Need Help?

1. **Documentation**: Read `PRODUCT_UPDATE_PROTOCOL.md` (comprehensive guide)
2. **Community**: Ask in Discord/forum (link in README.md)
3. **Support**: Contact Daron (if critical issue)

---

**Remember**: Always backup before updating. You can always revert if something goes wrong.
