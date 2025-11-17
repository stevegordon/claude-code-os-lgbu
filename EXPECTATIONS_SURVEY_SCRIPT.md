# Expectations Survey - Google Apps Script (5-Minute Setup)

**Purpose**: Automatically create Google Form for member expectations with email notifications

**Email**: Responses sent to daron@ccggskool.com

---

## How to Create the Form (5 Minutes)

### Step 1: Open Google Apps Script
1. Go to https://script.google.com
2. Click "+ New project" (top left)
3. You'll see code editor with `function myFunction() {}`

### Step 2: Paste This Script
**Delete everything**, then paste:

```javascript
function createExpectationsForm() {
  // Create new form
  var form = FormApp.create('Claude Code Business OS - Quick Expectations Check (3 min)');

  // Set description
  form.setDescription(
    'Help me tailor this program to YOUR needs. Quick 4 questions so I can make sure we\'re delivering exactly what you\'re looking for. Takes 3 minutes max.'
  );

  // Configure settings
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setConfirmationMessage('Thanks! This helps me align the program with what YOU need. See you in the call! 🚀');

  // Question 1: Name/Business Name
  form.addTextItem()
    .setTitle('Your name or business name')
    .setHelpText('So we know who\'s who')
    .setRequired(true);

  // Question 2: Why excited?
  form.addParagraphTextItem()
    .setTitle('Why are you excited about Claude Code Business OS? What caught your attention?')
    .setHelpText('What made you join? What problem do you hope this solves?')
    .setRequired(true);

  // Question 3: How plan to use?
  form.addParagraphTextItem()
    .setTitle('How do you plan to use this in your business?')
    .setHelpText('Examples: Manage all projects in one place, track productivity, automate operations, scale without hiring, etc.')
    .setRequired(true);

  // Question 4: Success criteria
  form.addParagraphTextItem()
    .setTitle('What would success look like for you?')
    .setHelpText('How will you know this is working? What results are you hoping for?')
    .setRequired(true);

  // Set up email notifications to daron@ccggskool.com
  form.setDestination(FormApp.DestinationType.EMAIL, 'daron@ccggskool.com');

  // Get URLs
  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  // Log URLs
  Logger.log('Form created successfully!');
  Logger.log('Email notifications enabled for: daron@ccggskool.com');
  Logger.log('Share this link with members: ' + formUrl);
  Logger.log('Edit form here: ' + editUrl);

  // Send confirmation email
  MailApp.sendEmail({
    to: 'daron@ccggskool.com',
    subject: 'Claude Code Business OS - Expectations Form Created',
    body: 'Your form is ready!\n\n' +
          'Share this link with members:\n' + formUrl + '\n\n' +
          'Edit form here:\n' + editUrl + '\n\n' +
          'You will receive an email notification every time someone submits a response.\n\n' +
          'Form created at: ' + new Date()
  });

  return {
    shareLink: formUrl,
    editLink: editUrl
  };
}
```

### Step 3: Save
1. Click disk icon (💾) or `Ctrl+S`
2. Name: "Create Expectations Form"
3. Click "OK"

### Step 4: Run
1. Select "createExpectationsForm" in dropdown (top)
2. Click ▶️ "Run" button
3. **First time**: Google asks permissions
   - Click "Review permissions"
   - Choose your account
   - Click "Advanced" → "Go to Create Expectations Form (unsafe)" (it's YOUR script)
   - Click "Allow"

### Step 5: Get Links
**Check daron@ccggskool.com inbox**:
- Subject: "Claude Code Business OS - Expectations Form Created"
- Email contains share link + edit link

**Or check Execution Log**:
- Bottom of Apps Script page
- Shows both links in log output

### Step 6: Test
1. Open share link
2. Fill with test data
3. Check daron@ccggskool.com for response email

---

## What You'll Share During Call

**In Skool Chat**:
```
📋 Quick 3-min survey to help me tailor the program to YOUR needs:
[PASTE SHARE LINK HERE]

Fill this out so I can align delivery with what you're looking for!
```

---

## How Email Notifications Work

**Every submission**:
- Email to: daron@ccggskool.com
- Subject: "New response for Claude Code Business OS - Quick Expectations Check (3 min)"
- Body: Contains respondent email + all 4 answers + timestamp

**You can also**:
- View responses in Google Forms (Responses tab)
- Export to Google Sheets for analysis
- Download as CSV

---

## After Form Creation

**Update MEMBER_ONBOARDING.md**:
1. Copy share link from email
2. Replace `[INSERT GOOGLE FORM LINK AFTER CREATION]` with actual link
3. Save file

**For future cohorts**: Same link works forever, just share it each time

---

**Total Time**: 5 minutes (1 min open script, 1 min paste, 30 sec save, 1 min run + permissions, 1 min get links, 1 min test)
