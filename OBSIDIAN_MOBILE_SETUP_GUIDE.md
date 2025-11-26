# Obsidian Mobile Setup - Implementation Guide

**Created**: 2025-11-24
**Status**: Phase 1 - Moving to iCloud Drive

---

## CURRENT STATUS

✅ **Completed**:
- MOBILE_CAPTURE_INBOX.md created in `Project Memory/Daily Planning/`
- _MOBILE_README.md created in `Project Memory/Daily Planning/`

⏳ **Next Steps**:
- Move claude-code-os-lgbu folder to iCloud Drive
- Install Obsidian on laptop and iPhone
- Create iOS Shortcut for voice capture
- Test end-to-end workflows

---

## PHASE 1: MOVE FOLDER TO iCloud DRIVE (10 min)

### Current Location
```
/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/
```

### New Location (iCloud Drive)
```
/Users/stevegordon/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/
```

### Commands to Execute

**Step 1: Create backup** (safety first)
```bash
# Create backup folder
mkdir -p ~/Documents/backups/2025-11-24_pre-icloud-move/

# Copy entire folder to backup
cp -R ~/Documents/mdaos/claude-code-os-lgbu/ ~/Documents/backups/2025-11-24_pre-icloud-move/

# Verify backup
ls -la ~/Documents/backups/2025-11-24_pre-icloud-move/claude-code-os-lgbu/
```

**Step 2: Create parent directory in iCloud Drive**
```bash
mkdir -p "$HOME/Library/Mobile Documents/com~apple~CloudDocs/mdaos"
```

**Step 3: Move folder to iCloud Drive**
```bash
mv ~/Documents/mdaos/claude-code-os-lgbu "$HOME/Library/Mobile Documents/com~apple~CloudDocs/mdaos/"
```

**Step 4: Verify move**
```bash
# Check new location
ls -la "$HOME/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/"

# Check old location (should be gone)
ls -la ~/Documents/mdaos/claude-code-os-lgbu/ 2>/dev/null || echo "Original folder successfully moved"
```

**Step 5: Wait for iCloud sync** (5-10 min)
- Open Finder → iCloud Drive → mdaos folder
- Verify cloud icon appears next to claude-code-os-lgbu folder
- Wait for sync to complete (cloud icon disappears when synced)

---

## PHASE 2: OBSIDIAN SETUP (15 min)

### On Laptop

**Step 1: Install Obsidian**
- Download: https://obsidian.md/download
- Install and open

**Step 2: Open vault**
- Click "Open folder as vault"
- Navigate to: `/Users/stevegordon/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/Project Memory/`
- Click "Open"

**Step 3: Verify files**
- Check that you see all Project Memory folders (Daily Planning, Strategic Planning, etc.)
- Open `Daily Planning/_MOBILE_README.md` - verify it displays correctly
- Open `Daily Planning/MOBILE_CAPTURE_INBOX.md` - verify it displays correctly

### On iPhone

**Step 1: Install Obsidian**
- Open App Store
- Search "Obsidian"
- Install

**Step 2: Open vault from iCloud**
- Open Obsidian app
- Tap "Open folder as vault"
- Navigate to: iCloud Drive → mdaos → claude-code-os-lgbu → Project Memory
- Tap "Select this folder"

**Step 3: Test sync**
- Edit `MOBILE_CAPTURE_INBOX.md` on iPhone
- Add line: "Test sync from iPhone - [current time]"
- Wait 10 seconds
- Check laptop Obsidian - verify change appears

**Step 4: Test reverse sync**
- Edit `MOBILE_CAPTURE_INBOX.md` on laptop
- Add line: "Test sync from laptop - [current time]"
- Wait 10 seconds
- Check iPhone Obsidian - verify change appears

---

## PHASE 3: iOS SHORTCUT FOR VOICE CAPTURE (15 min)

### Shortcut: "Capture to Obsidian"

**Method 1: Using Whisprflow** (if Shortcuts integration exists)

1. Open Shortcuts app on iPhone
2. Tap "+" to create new shortcut
3. Add actions:
   - **Whisprflow** → Record & Transcribe (if available in Shortcuts)
   - **Set Variable** → Name: "Transcription", Value: [Whisprflow output]
   - **Get File** → Select: `MOBILE_CAPTURE_INBOX.md` from iCloud Drive path:
     `iCloud Drive/mdaos/claude-code-os-lgbu/Project Memory/Daily Planning/MOBILE_CAPTURE_INBOX.md`
   - **Get Text from Input** → [File from previous step]
   - **Set Variable** → Name: "CurrentContent", Value: [Text from previous step]
   - **Text** → Combine:
     ```
     [CurrentContent]

     - [Transcription] — [Current Date] [Current Time]
     ```
   - **Save File** →
     File: `MOBILE_CAPTURE_INBOX.md`
     Destination: Same iCloud path
     Overwrite: YES

**Method 2: Using iOS Dictation** (fallback if Whisprflow unavailable)

1. Open Shortcuts app on iPhone
2. Tap "+" to create new shortcut
3. Add actions:
   - **Dictate Text** → Set "Show When Run" = ON
   - **Set Variable** → Name: "Transcription", Value: [Dictated Text]
   - **Get File** → Same as above
   - **Get Text from Input**
   - **Set Variable** → Name: "CurrentContent"
   - **Text** → Combine with timestamp
   - **Save File** → Overwrite

**Method 3: Manual Paste** (simplest, no auto-transcription)

1. Open Shortcuts app
2. Create shortcut with these actions:
   - **Ask for Input** → Prompt: "Paste transcription from Whisprflow"
   - Continue with same steps as Method 1/2

### Test Shortcut

1. Run shortcut
2. Speak or type: "Test capture - Follow up with John about partnership"
3. Open Obsidian mobile → `MOBILE_CAPTURE_INBOX.md`
4. Verify entry appears under "Voice Transcriptions" section with timestamp
5. Check laptop Obsidian → verify sync

### Add to Siri

1. iOS Settings → Siri & Search
2. Find "Capture to Obsidian" shortcut
3. Tap "Add to Siri"
4. Record phrase: "Capture thought" (or your preferred phrase)
5. Test: "Hey Siri, capture thought" → Speak → Done

---

## PHASE 4: REOPEN IN VS CODE

### After Moving Folder

**Step 1: Close VS Code**
- Save any open files
- Quit VS Code completely

**Step 2: Reopen from new location**
- Open VS Code
- File → Open Folder
- Navigate to: `/Users/stevegordon/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/`
- Click "Open"

**Step 3: Start new Claude Code session**
- Open Claude Code (Command+L or click icon)
- Say: "I moved claude-code-os-lgbu to iCloud Drive. Let's continue Obsidian mobile setup. We just completed Phase 1-3. What's next?"

**Step 4: Verify git still works**
```bash
# Check git status
git status

# Check remote
git remote -v

# If git tracking lost, reinitialize
# (Only if needed - should still work after move)
```

---

## PHASE 5: CLAUDE CODE WORKFLOW UPDATES (I implement)

### What Claude Will Change

**Daily Roadmap Generation**:
- Read `MOBILE_CAPTURE_INBOX.md` during data extraction
- Parse voice transcriptions and quick captures
- Process captures (prompt for strategic context, add to roadmap or FUTURE_TASKS.md)
- Move processed items to Archive section
- Add mobile-friendly tags to tasks: `#mobile-ready`, `#call`, `#review`, `#laptop`, `#deep-work`, `#quick-win`
- Include location references (file paths with line numbers)
- Include contact info for `#call` tasks

**Productivity Assessment**:
- Read today's daily roadmap file
- Find all checked tasks: `- [x] **Task name**`
- Extract completion notes (if added)
- Log to operations_log.txt with timestamp
- Include mobile completions in productivity score
- Report mobile completions in assessment

**Weekly Strategic Planning**:
- Read any `*-reflections.md` files from Strategic Planning folder
- Integrate insights into weekly analysis
- Clear processed reflection files after integration

**FUTURE_TASKS.md Structure**:
- Add "MOBILE QUICK-ADD" section for quick captures
- Process during daily roadmap generation (prompt for strategic context)

---

## PHASE 6: END-TO-END TESTING (1 week)

### Test 1: Voice Capture → Daily Roadmap
- [ ] Use Siri shortcut: "Follow up with Jane about webinar"
- [ ] Next morning: "Generate daily roadmap"
- [ ] Verify: Claude reads capture, prompts for context, adds to roadmap

### Test 2: Mobile Task Completion → Productivity Assessment
- [ ] Open today's roadmap in Obsidian mobile
- [ ] Complete a `#call` task, check box
- [ ] Evening: "Assess my productivity today"
- [ ] Verify: Claude detects checkbox, logs to operations_log.txt, includes in assessment

### Test 3: FUTURE_TASKS.md Quick-Add → Weekly Planning
- [ ] Add task to "MOBILE QUICK-ADD" section
- [ ] Next weekly strategic planning
- [ ] Verify: Claude processes quick-add, scores strategically, moves to appropriate week

### Test 4: Quarterly Reflection → Strategic Planning
- [ ] On flight: Create `2025-11-XX_flight-reflections.md` in Strategic Planning
- [ ] Brain dump strategic thoughts
- [ ] Next weekly planning: Verify Claude reads reflections, integrates insights

### Test 5: File Conflict Handling
- [ ] Edit same file on laptop and mobile simultaneously (don't sync)
- [ ] Let iCloud sync attempt merge
- [ ] Check for "conflicted copy" files
- [ ] Alert Claude during next workflow

---

## TROUBLESHOOTING

### iCloud Sync Issues
**Problem**: Files not syncing between laptop and iPhone
**Solutions**:
- Check iCloud storage: Settings → Apple ID → iCloud → Manage Storage
- Check iCloud Drive enabled: System Settings → Apple ID → iCloud → iCloud Drive (ON)
- Force sync: Finder → iCloud Drive → Right-click folder → "Download Now"
- Restart devices

### Obsidian Sync Lag
**Problem**: Edits don't appear quickly on other device
**Solutions**:
- Obsidian mobile → Settings → Sync → "Sync now"
- Close and reopen Obsidian app
- Check "Background sync" enabled in settings

### iOS Shortcut Not Working
**Problem**: Voice capture doesn't append to MOBILE_CAPTURE_INBOX.md
**Solutions**:
- Check Shortcuts app permissions: Settings → Shortcuts → Files (ON)
- Verify file path in shortcut matches iCloud location
- Add "Show Notification" actions after each step to debug
- Test with simpler shortcut (just "Ask for Input" instead of Whisprflow)

### Git Issues After Move
**Problem**: Git status shows deleted files or loses tracking
**Solutions**:
```bash
# Check git status
git status

# If shows deleted, git doesn't know files moved
# Update git index
git add -A

# Commit the change
git commit -m "MOVE: Relocate project to iCloud Drive for Obsidian mobile sync"
```

### File Conflicts
**Problem**: iCloud creates "filename (conflicted copy).md" files
**Solutions**:
- Open both versions in text editor
- Manually merge changes
- Delete conflicted copy after merging
- Workflow rule: Only edit daily roadmap on mobile (never on laptop)

---

## NEXT STEPS AFTER SETUP

Once Phase 1-5 complete:

**Daily Workflow**:
1. Morning: "Generate daily roadmap" (Claude adds mobile tags)
2. Review roadmap in Obsidian mobile
3. Execute tasks, check boxes for completions
4. Voice capture ideas/follow-ups throughout day
5. Evening: "Assess my productivity today" (Claude reads checkboxes)

**Weekly Workflow**:
1. "Update strategic planning" (Claude reads reflections, mobile captures)
2. Review weekly plan in Obsidian mobile
3. Long flights: Create reflection notes, review quarterly strategy

**As Needed**:
- Add tasks to FUTURE_TASKS.md → MOBILE QUICK-ADD section
- Create reflection notes during travel
- Review Active Projects Index for context

---

## REFERENCE: KEY FILE LOCATIONS

**After move, all paths change to**:
```
/Users/stevegordon/Library/Mobile Documents/com~apple~CloudDocs/mdaos/claude-code-os-lgbu/
```

**Important files**:
- `Project Memory/Daily Planning/MOBILE_CAPTURE_INBOX.md`
- `Project Memory/Daily Planning/_MOBILE_README.md`
- `Project Memory/Daily Planning/FUTURE_TASKS.md`
- `Project Memory/Daily Planning/YYYY-MM-DD_daily-roadmap.md`
- `Project Memory/Strategic Planning/[latest-weekly-planning].md`
- `AI Growth Engine/Knowledge Base/Strategy.md`

**Git repository root**: Same as project root (contains .git folder)

---

## CONTACT / SUPPORT

After reopening in VS Code from new iCloud location, start new Claude Code session and reference this guide.

Say: "I completed Obsidian mobile setup Phase [X]. [Describe any issues or next steps needed]"

Claude will continue implementation from where you left off.

---

**Good luck with the setup! This is going to significantly improve your mobile productivity workflow.**
