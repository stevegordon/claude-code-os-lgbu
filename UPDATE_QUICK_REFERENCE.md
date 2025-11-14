# Update Quick Reference - Claude Code Business OS

**Quick guide for updating your system when Daron releases improvements**

---

## TL;DR - 5-Minute Update

```bash
# 1. Backup
git checkout -b backup-pre-update-$(date +%Y%m%d)

# 2. Fetch upstream
git fetch origin
git log HEAD..origin/main --oneline

# 3. Take framework files (safe)
git checkout origin/main -- scripts/
git checkout origin/main -- "System Documentation/"

# 4. Keep your business files (never overwrite)
git checkout HEAD -- "AI Growth Engine/"
git checkout HEAD -- "Active Projects/"
git checkout HEAD -- "Project Memory/"
git checkout HEAD -- operations_log.txt

# 5. Merge CLAUDE.md (manual - see below)

# 6. Test
# - Generate daily roadmap
# - Check your business context loads

# 7. Commit
git add .
git commit -m "MERGE: Upstream update from Daron"
git push origin main
```

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
