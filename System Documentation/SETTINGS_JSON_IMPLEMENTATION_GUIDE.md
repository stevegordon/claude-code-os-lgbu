# Settings.json Implementation Guide - CCGG Business Operations

**Date Created**: 2025-11-05
**Status**: Production (Institutional Knowledge)
**Version**: 1.0
**Source**: Lessons learned from Nov 2025 settings optimization implementation

---

## Purpose

This guide documents **when and how to use settings.json/settings.local.json** in CCGG Business Operations, including all limitations, bugs, and best practices discovered during our Nov 2025 implementation.

**Target Audience**: Future Claude Code sessions implementing settings-based mechanisms

**Key Goal**: Avoid repeating the mistakes and trial-and-error from Nov 2025

---

## When to Use Settings.json (Valid Use Cases)

### ✅ Use settings.json For:

| Use Case | Why It Works | Example from CCGG |
|----------|--------------|-------------------|
| **Approved Read Patterns** | Eliminate approval prompts for routine operations | `Read(//c/Users/Raphael/1 PROJECTS/AI Growth Engine with POV/AI Growth Engine/Knowledge Base/**)` - Saves 10-20 min/day |
| **Environment Variables** | Claude Code internal use (scripts, hooks, skills) | `CCGG_OPERATIONS_ROOT`, `CCGG_KB_PATH` - Available to hooks and skills |
| **File Write Hooks** | Automatic logging, validation, processing after file writes | `PostToolUse` hook → operations_log.txt logging |
| **Bash Deny Rules** | Block dangerous commands | `rm -rf:*`, `git push --force:*`, `git reset --hard:*` - **WORK CORRECTLY** |
| **Bash Approved Commands** | Pre-approve specific bash patterns | `Bash(git commit:*)`, `Bash(py:*)` |

**Success Criteria**:
- Saves time (fewer approval prompts)
- Automates repetitive tasks (hooks)
- Provides safety layer (bash deny rules)

---

## When NOT to Use Settings.json (Known Limitations)

### ❌ Do NOT Use settings.json For:

| Use Case | Why It Fails | Alternative Approach |
|----------|--------------|---------------------|
| **Read/Write Deny Rules** | GitHub bug #6631 - completely non-functional | Manual vigilance + CLAUDE.md policy layer + file write hooks for audit trail |
| **File Protection** | Deny rules ignored by Claude Code | Use filesystem permissions OR PreToolUse hook workaround (complex) |
| **Environment Variables in Shell** | Settings env vars don't propagate to Bash/PowerShell | Use shell config files (.bashrc, PowerShell profile) OR pass via command |
| **Git Pre-Commit Hooks** | Not supported in settings.json | Use `.git/hooks/pre-commit` (filesystem-level Git hooks) |
| **Security Boundary** | Settings.json is NOT a security layer | Never rely on deny rules for sensitive data protection |

**Critical Understanding**:
- Bash deny rules work ✅
- Read/Write deny rules DON'T work ❌ (this is counterintuitive but confirmed by testing + GitHub issues)

---

## Known Bugs & Limitations (Nov 2025)

### Bug 1: Read/Write Deny Rules Non-Functional

**Status**: Confirmed bug in Claude Code (GitHub #6631, #6699, #4467, #8961)

**Evidence**:
- Multiple users confirmed across v1.0.93+ versions
- Assigned to Anthropic developer, not yet fixed
- All test patterns failed: `Write(*.env)`, `Write(.env*)`, `Write(secrets/**)`, etc.

**What Fails**:
```json
"deny": [
  "Write(//c/Users/Raphael/1 PROJECTS/AI Growth Engine with POV/**)",  // IGNORED
  "Read(.env)",  // IGNORED
  "Write(credentials.json)"  // IGNORED
]
```

**What Works**:
```json
"deny": [
  "Bash(rm -rf:*)",  // WORKS
  "Bash(git push --force:*)",  // WORKS
  "Bash(git reset --hard:*)"  // WORKS
]
```

**Workaround**:
- Manual vigilance (document read-only policies in CLAUDE.md)
- File write hooks for audit trail (log all writes to operations_log.txt)
- PreToolUse hooks (complex, requires custom logic)

**Future**: Monitor GitHub #6631 for fixes. Deny rules configured anyway for future-proofing.

---

### Bug 2: Environment Variables Don't Propagate to Shell

**Status**: By design (not a bug, but counterintuitive)

**What Happens**:
```json
"env": {
  "CCGG_OPERATIONS_ROOT": "c:\\Users\\Raphael\\1 PROJECTS\\CCGG Business Operations"
}
```

- ✅ Available to Claude Code internally (hooks, skills, scripts)
- ❌ NOT available in Bash/PowerShell shells

**Test**:
```bash
echo $CCGG_OPERATIONS_ROOT  # Empty (not set)
```

**Use Case**: Pass paths to hooks, reference in skill code, use in scripts via Claude Code API

**Not for**: Shell commands, manual bash operations

---

### Limitation 3: Settings Hierarchy (Overrides)

**Hierarchy** (highest to lowest priority):
1. `.claude/settings.local.json` ← **WINS** (machine-specific, gitignored)
2. `.claude/settings.json` ← Overridden by local
3. `~/.claude/settings.json` ← Overridden by both

**Critical Mistake We Made**: Created settings.json but settings.local.json already existed → settings.json was completely ignored

**Solution**: Put ALL settings in settings.local.json (the file that actually loads)

**When to Use Each**:
- `settings.local.json`: Machine-specific config (approved read paths, local env vars) - **PRIMARY FILE**
- `settings.json`: Team template (gitignored in CCGG, but useful for reference)
- `~/.claude/settings.json`: Global defaults across all projects (rarely needed)

---

### Limitation 4: Symlink Path Resolution

**Problem**: Windows resolves symlinks to physical paths, but deny rules only match the path format provided

**Example**:
```
CCGG Business Operations/AI Growth Engine/Knowledge Base (junction)
  ↓ (resolves to)
AI Growth Engine with POV/AI Growth Engine/Knowledge Base (physical)
```

**What Happens**: Write to junction → Windows resolves to physical path → deny rule only covers junction path → write allowed (bypass)

**Solution**: Add deny rules for BOTH paths:
```json
"deny": [
  "Write(//c/Users/Raphael/1 PROJECTS/CCGG Business Operations/AI Growth Engine/Knowledge Base/**)",  // Junction
  "Write(//c/Users/Raphael/1 PROJECTS/AI Growth Engine with POV/AI Growth Engine/Knowledge Base/**)"  // Physical
]
```

**Note**: This still doesn't work due to Bug 1, but it's the correct pattern for when Anthropic fixes the bug.

---

### Limitation 5: Path Format Sensitivity

**Windows Paths**: Two formats work, but you need to escape backslashes
- Unix-style: `//c/Users/Raphael/1 PROJECTS/...`
- Windows-style: `c:\\Users\\Raphael\\1 PROJECTS\\...` (double backslash required in JSON)

**Defense-in-Depth**: Include both formats for maximum compatibility:
```json
"deny": [
  "Write(//c/Users/Raphael/1 PROJECTS/CCGG Business Operations/.env)",  // Unix-style
  "Write(c:\\Users\\Raphael\\1 PROJECTS\\CCGG Business Operations\\.env)"  // Windows-style
]
```

---

## Implementation Checklist (Step-by-Step)

### Phase 0: Preparation

- [ ] Identify the mechanism to implement (approved reads, hooks, deny rules, env vars)
- [ ] Check this guide for known limitations
- [ ] Verify use case is in "Valid Use Cases" section
- [ ] If use case is in "When NOT to Use", choose alternative approach
- [ ] Create Git backup: `git checkout -b feature/settings-[name]`

### Phase 1: File Selection

- [ ] Determine which file to edit:
  - **settings.local.json** ← Use this (machine-specific, highest priority)
  - settings.json ← Only for team templates (rarely used in CCGG)
- [ ] Check if settings.local.json exists: `ls .claude/settings.local.json`
- [ ] If exists: Read existing content, merge new settings
- [ ] If doesn't exist: Create from scratch

### Phase 2: Configuration

- [ ] Use only officially documented fields (https://docs.claude.com/en/docs/claude-code/settings)
- [ ] Validate JSON syntax: `python -m json.tool .claude/settings.local.json`
- [ ] For Windows paths: Use double backslashes `\\` in JSON
- [ ] For symlinks: Include both junction AND physical paths
- [ ] For hooks: Test PowerShell command manually first (avoid variable conflicts)
- [ ] For deny rules: Remember Read/Write deny rules DON'T WORK (Bug 1)

### Phase 3: Testing

- [ ] Commit changes to feature branch
- [ ] **Restart Claude Code** (settings only load at startup)
- [ ] Test approved read patterns (no approval prompts?)
- [ ] Test hooks (check target file for output?)
- [ ] Test bash deny rules (dangerous commands blocked?)
- [ ] Test environment variables (available to hooks/skills? NOT in shell)
- [ ] Accept that Read/Write deny rules won't work (known bug)

### Phase 4: Documentation

- [ ] Create/update SETTINGS_GUIDE.md with specifics for this project
- [ ] Document what works vs what doesn't
- [ ] Note any workarounds for limitations
- [ ] Update version history

### Phase 5: Merge

- [ ] If tests pass: Merge to master
- [ ] If tests fail: Iterate on fixes, retest
- [ ] Delete feature branch after successful merge
- [ ] Push to GitHub
- [ ] Log completion to operations_log.txt

---

## Testing Protocol

### Test 1: Approved Read Patterns

**Goal**: Verify no approval prompts for routine operations

**Test**:
```
Ask Claude: "Read operations_log.txt"
```

**Expected**: ✅ File read immediately without approval prompt

**If Fails**:
- Check settings.local.json loaded (not settings.json)
- Verify path format matches exactly (Unix vs Windows style)
- Restart Claude Code (settings load at startup only)

---

### Test 2: File Write Hook

**Goal**: Verify automatic logging to operations_log.txt

**Test**:
```
Ask Claude: "Create test-hook.md with content 'test'"
```

**Expected**: ✅ New entry in operations_log.txt:
```
[2025-11-05 HH:MM:SS] - FILE_WRITE - test-hook.md - Modified by Claude
```

**If Fails**:
- Check PowerShell syntax (avoid `$input` variable - use `$jsonInput`)
- Check operations_log.txt path (relative to project root)
- Test PowerShell command manually

---

### Test 3: Bash Deny Rules

**Goal**: Verify dangerous commands blocked

**Test**:
```
Ask Claude: "Run: rm -rf test-folder"
```

**Expected**: ✅ Command denied (permission error)

**If Fails**:
- Check bash deny rule syntax: `Bash(rm -rf:*)` (colon + asterisk for prefix match)
- Restart Claude Code

---

### Test 4: Environment Variables

**Goal**: Verify variables available to Claude Code (NOT shell)

**Test**:
```
Ask Claude: "Echo $CCGG_OPERATIONS_ROOT in PowerShell"
```

**Expected**: ❌ Empty/undefined (env vars don't propagate to shell by design)

**But Check Hook Access**:
```json
"command": "powershell -Command \"echo $env:CCGG_OPERATIONS_ROOT\""
```

**Expected**: ✅ Works in hook context (Claude Code internal use)

---

### Test 5: Read/Write Deny Rules (Known to Fail)

**Goal**: Confirm deny rules DON'T work (document limitation)

**Test**:
```
Ask Claude: "Write to AI Growth Engine/Knowledge Base/test-deny.md"
```

**Expected**: ❌ File created (deny rules ignored - Bug 1)

**Action**: Accept limitation, use alternative protection strategy

---

## Troubleshooting Guide

### Issue: Settings Not Loading

**Symptoms**: Approved reads still prompt, hooks don't execute, deny rules ignored

**Causes**:
1. Edited settings.json but settings.local.json exists (hierarchy issue)
2. JSON syntax error (settings file invalid)
3. Didn't restart Claude Code (settings load at startup only)

**Solutions**:
- Check which file is active: settings.local.json wins if exists
- Validate JSON: `python -m json.tool .claude/settings.local.json`
- Restart Claude Code: Close and reopen session

---

### Issue: Hook Not Logging to operations_log.txt

**Symptoms**: File writes occur but no log entries

**Causes**:
1. PowerShell variable conflict (`$input` is reserved in PowerShell)
2. operations_log.txt path incorrect (must be relative to project root)
3. PowerShell syntax error (quotes, escaping)

**Solutions**:
- Rename `$input` to `$jsonInput` in hook command
- Use relative path: `operations_log.txt` (not absolute)
- Test PowerShell command manually: Copy hook command, paste in PowerShell, test

**Example Fix**:
```json
// WRONG (variable conflict)
"command": "powershell -Command \"$input = [Console]::In.ReadToEnd()...\""

// CORRECT (renamed variable)
"command": "powershell -Command \"$jsonInput = [Console]::In.ReadToEnd()...\""
```

---

### Issue: Deny Rules Not Working

**Cause 1**: Read/Write deny rules are broken (Bug 1)

**Solution**: Accept limitation, use alternative protection (manual vigilance, hooks, CLAUDE.md policy)

**Cause 2**: settings.local.json has conflicting allow rules

**Solution**: Check allow list, ensure no overlapping Write permissions

**Cause 3**: Symlink path resolution

**Solution**: Add deny rules for both junction AND physical paths

---

### Issue: Environment Variables Not in Shell

**Cause**: By design (env vars are Claude Code internal only)

**Solution**: Don't use settings.json env vars for shell commands. Use for hooks, skills, scripts only.

**Alternative**: Set shell env vars in .bashrc or PowerShell profile

---

## Examples from CCGG Implementation

### Example 1: Approved Read Optimization (Working)

**Problem**: Approval prompts for routine operations wasted 10-20 min/day

**Solution**:
```json
"allow": [
  "Read(//c/Users/Raphael/1 PROJECTS/AI Growth Engine with POV/AI Growth Engine/Knowledge Base/**)",
  "Read(//c/Users/Raphael/1 PROJECTS/CCGG Business Operations/AI Growth Engine/Knowledge Base/**)",
  "Read(//c/Users/Raphael/1 PROJECTS/CCGG Business Operations/operations_log.txt)"
]
```

**Result**: ✅ No more approval prompts for AI Growth Engine KB, operations_log.txt, project files

**Value**: 10-20 minutes saved per day

---

### Example 2: File Write Hook (Working)

**Problem**: Manual operations logging is error-prone (missed entries)

**Solution**:
```json
"hooks": {
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [
        {
          "type": "command",
          "command": "powershell -Command \"$jsonInput = [Console]::In.ReadToEnd(); $data = $jsonInput | ConvertFrom-Json; $filePath = $data.tool_input.file_path; $fileName = Split-Path -Leaf $filePath; $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'; $logEntry = '[{0}] - FILE_WRITE - {1} - Modified by Claude' -f $timestamp, $fileName; Add-Content -Path 'operations_log.txt' -Value $logEntry\"",
          "timeout": 5
        }
      ]
    }
  ]
}
```

**Result**: ✅ Every file write automatically logged to operations_log.txt

**Value**: Audit trail, zero manual logging needed

---

### Example 3: Bash Deny Rules (Working)

**Problem**: Dangerous commands could cause data loss

**Solution**:
```json
"deny": [
  "Bash(rm -rf:*)",
  "Bash(git push --force:*)",
  "Bash(git reset --hard:*)"
]
```

**Result**: ✅ Dangerous commands blocked

**Value**: Safety layer, prevents accidental data loss

---

### Example 4: Read/Write Deny Rules (Failed - Bug 1)

**Problem**: AI Growth Engine KB is read-only, needed write protection

**Attempted Solution**:
```json
"deny": [
  "Write(//c/Users/Raphael/1 PROJECTS/AI Growth Engine with POV/AI Growth Engine/Knowledge Base/**)",
  "Write(//c/Users/Raphael/1 PROJECTS/CCGG Business Operations/AI Growth Engine/Knowledge Base/**)"
]
```

**Result**: ❌ Deny rules ignored, writes still allowed (Bug 1)

**Actual Solution**:
- Manual vigilance (be careful)
- CLAUDE.md policy layer (document read-only requirement)
- File write hook audit trail (log all writes for review)

**Lesson**: Don't rely on Read/Write deny rules for protection

---

## Best Practices Summary

### ✅ Do:
- Use settings.local.json (highest priority)
- Validate JSON syntax before committing
- Test after restart (settings load at startup)
- Document what works vs what doesn't
- Include both Unix and Windows path formats
- Test hooks manually before deploying
- Accept that Read/Write deny rules don't work (Bug 1)
- Use Git feature branches for safety
- Commit to operations_log.txt after changes

### ❌ Don't:
- Don't rely on Read/Write deny rules for security
- Don't assume settings.json will load if settings.local.json exists
- Don't use `$input` variable in PowerShell hooks (reserved)
- Don't forget to restart Claude Code after changes
- Don't expect env vars to propagate to shell
- Don't implement without consulting this guide first

---

## Future Improvements (Phase 2+)

### When Anthropic Fixes Bug 1 (Read/Write Deny Rules)

**Monitor**: GitHub issue #6631 for updates

**Action**:
- Existing deny rules will automatically activate (already configured)
- Retest Read/Write deny rules
- Update SETTINGS_GUIDE.md (Bug 1 fixed)
- Update this guide (move to "What Works" section)

---

### PreToolUse Hook Workaround (Complex)

**If Anthropic doesn't fix Bug 1**: Implement PreToolUse hook to intercept tool calls before execution

**Complexity**: High (requires custom logic, JSON parsing, pattern matching)

**Deferred**: Phase 2+ (wait for Anthropic fix first)

---

## References

- **CCGG Implementation**: `.claude/SETTINGS_GUIDE.md` (project-specific config v1.3)
- **Official Docs**: https://docs.claude.com/en/docs/claude-code/settings
- **Bug Reports**:
  - Primary: https://github.com/anthropics/claude-code/issues/6631
  - Related: #6699, #4467, #8961
- **Root CLAUDE.md**: Settings.json configuration section (this guide referenced)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-05 | Initial guide created from Nov 2025 settings optimization lessons learned |

---

**End of Guide**
