# Pull from Mobile

Pull latest iPhone/Obsidian mobile changes back to Mac (run AFTER using iPhone).

## Step 1: Sync Files from Mobile

Execute the pull-from-mobile script:

```bash
bash scripts/pull-from-mobile.sh
```

## Step 2: Process Mobile Captures

Read `Project Memory/Daily Planning/MOBILE_CAPTURE_INBOX.md` and extract unprocessed items from:
- **Quick Add** section (one-liner tasks)
- **Voice Transcriptions** section (Whisprflow captures)
- **Meeting Notes** section (context-rich captures)

## Step 3: Restate as Proper Tasks

For each capture:
1. Convert to actionable task (start with verb)
2. Add clear action description
3. Extract/infer due date (if mentioned)
4. Determine priority (HIGH/MEDIUM/LOW)
5. Estimate time required
6. Propose organization location (FUTURE_TASKS.md, active project, etc.)

Present proposed tasks to user for approval:

```
Found X new mobile captures:

**From Quick Add:**
- [original capture text]

**Proposed Tasks:**
1. **[Task Name]** - Priority: [X] - Est: [X min] - Due: [Date] - Location: [where it goes]

Does this look correct? Should I create these tasks?
```

## Step 4: Create Tasks After Approval

Once user approves:
- Add tasks to appropriate location (FUTURE_TASKS.md, project CLAUDE.md, etc.)
- Use full task metadata format
- Ensure due dates are in correct sections

## Step 5: Archive in MOBILE_CAPTURE_INBOX.md

After creating tasks:
1. Remove processed items from Quick Add/Voice/Meeting sections
2. Add log entry to Archive section:
   ```
   - ✅ [YYYY-MM-DD] Processed: [task summary] → Added to [location]
   ```

## Step 6: Update Today's Roadmap with Completed Items

Check mobile roadmap (`Project Memory/Daily Planning/YYYY-MM-DD_*-roadmap.md`) for:
- Completed checkboxes `[x]`
- Progress updates
- Status changes

Update local roadmap to match mobile edits.

## Final Report

After all steps complete, inform user:
- X mobile captures processed
- X tasks created in [locations]
- Roadmap updated with completed items
- Mobile capture inbox cleared
