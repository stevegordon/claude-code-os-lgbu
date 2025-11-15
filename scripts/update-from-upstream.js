#!/usr/bin/env node

/**
 * Automated Update Script - Claude Code Business OS
 *
 * Purpose: Update your Business OS from Daron's upstream repo WITHOUT losing your customizations
 *
 * Usage:
 *   node scripts/update-from-upstream.js
 *
 * What it does:
 * 1. Fetches latest changes from upstream
 * 2. Shows you what changed
 * 3. Auto-updates framework files (Layer 1)
 * 4. Preserves your business files (Layer 2)
 * 5. Guides you through CLAUDE.md merge (Layer 3)
 * 6. Creates backup branch automatically
 *
 * Safe: Creates backup before making changes, validates Git status, prevents data loss
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const LAYER_1_FILES = [
    'scripts/',
    'System Documentation/SETTINGS_JSON_IMPLEMENTATION_GUIDE.md',
    'System Documentation/CCGG_MECHANISMS_REGISTRY.md',
    'System Documentation/BRUTAL_PRIORITIZATION_FRAMEWORK.md',
    'System Documentation/DEPENDENCY_TRACKING_FORCING_FUNCTIONS.md',
    'System Documentation/OPERATIONAL_WORKFLOWS_FOR_BUSINESS_OS.md',
    'README.md',
    'MEMBER_ONBOARDING.md',
    'PRODUCT_UPDATE_PROTOCOL.md',
    'UPDATE_QUICK_REFERENCE.md',
    'GIT_UPDATE_EXPLAINED.md'
];

const LAYER_2_FILES = [
    'AI Growth Engine/',
    'Active Projects/',
    'Project Memory/Strategic Planning/',
    'Project Memory/Productivity Tracking/',
    'Project Memory/Daily Planning/',
    'operations_log.txt',
    '.gitignore'
];

const LAYER_3_FILES = [
    'CLAUDE.md',
    'System Documentation/SYSTEM_ASSET_REGISTRY.md'
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function runCommand(command, options = {}) {
    try {
        return execSync(command, {
            encoding: 'utf8',
            stdio: options.silent ? 'pipe' : 'inherit',
            ...options
        });
    } catch (error) {
        if (!options.allowFail) {
            console.error(`[ERROR] Command failed: ${command}`);
            console.error(error.message);
            process.exit(1);
        }
        return null;
    }
}

function log(message, type = 'INFO') {
    const prefix = {
        'INFO': '[INFO]',
        'OK': '[OK]',
        'WARNING': '[WARNING]',
        'ERROR': '[ERROR]',
        'STEP': '\n[STEP]'
    }[type] || '[INFO]';

    console.log(`${prefix} ${message}`);
}

function confirm(question) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readline.question(`${question} (y/n): `, (answer) => {
            readline.close();
            resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
    });
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

// ============================================================================
// VALIDATION
// ============================================================================

function validateGitRepo() {
    log('Validating Git repository...', 'STEP');

    if (!fileExists('.git')) {
        log('This is not a Git repository. Cannot update.', 'ERROR');
        log('Make sure you are in the claude-code-os-lgbu folder.', 'ERROR');
        process.exit(1);
    }

    log('Git repository validated', 'OK');
}

function checkUncommittedChanges() {
    log('Checking for uncommitted changes...', 'STEP');

    const status = runCommand('git status --porcelain', { silent: true });

    if (status && status.trim().length > 0) {
        log('You have uncommitted changes. Commit or stash them before updating.', 'WARNING');
        console.log('\nUncommitted files:');
        console.log(status);
        return false;
    }

    log('Working directory is clean', 'OK');
    return true;
}

function getCurrentBranch() {
    return runCommand('git branch --show-current', { silent: true }).trim();
}

// ============================================================================
// BACKUP
// ============================================================================

function createBackup() {
    log('Creating backup branch...', 'STEP');

    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const backupBranch = `backup-pre-update-${date}`;

    // Check if backup branch already exists
    const branches = runCommand('git branch --list', { silent: true });
    if (branches.includes(backupBranch)) {
        log(`Backup branch ${backupBranch} already exists. Skipping backup creation.`, 'WARNING');
        return backupBranch;
    }

    runCommand(`git checkout -b ${backupBranch}`, { silent: true });
    log(`Created backup branch: ${backupBranch}`, 'OK');

    // Return to main branch
    runCommand('git checkout main', { silent: true });
    log('Returned to main branch', 'OK');

    return backupBranch;
}

// ============================================================================
// FETCH & REVIEW
// ============================================================================

function fetchUpstream() {
    log('Fetching latest changes from upstream...', 'STEP');

    runCommand('git fetch origin');

    log('Fetched upstream changes', 'OK');
}

function showChanges() {
    log('Changes in upstream update:', 'STEP');

    console.log('\n=== COMMITS ===');
    const commits = runCommand('git log HEAD..origin/main --oneline', { silent: true, allowFail: true });

    if (!commits || commits.trim().length === 0) {
        log('No new commits from upstream. You are already up-to-date!', 'OK');
        return false;
    }

    console.log(commits);

    console.log('\n=== FILES CHANGED ===');
    const files = runCommand('git diff HEAD..origin/main --name-only', { silent: true });
    console.log(files);

    return true;
}

// ============================================================================
// LAYER 1: UPDATE FRAMEWORK FILES
// ============================================================================

function updateFrameworkFiles() {
    log('Updating framework files (Layer 1)...', 'STEP');

    let updatedCount = 0;

    for (const file of LAYER_1_FILES) {
        // Check if file exists in upstream
        const exists = runCommand(`git ls-tree -r origin/main --name-only | grep "${file}"`, {
            silent: true,
            allowFail: true
        });

        if (exists && exists.trim().length > 0) {
            log(`Updating: ${file}`, 'INFO');
            runCommand(`git checkout origin/main -- "${file}"`, { silent: true });
            updatedCount++;
        }
    }

    log(`Updated ${updatedCount} framework files`, 'OK');
}

// ============================================================================
// LAYER 2: PRESERVE BUSINESS FILES
// ============================================================================

function preserveBusinessFiles() {
    log('Preserving your business files (Layer 2)...', 'STEP');

    let preservedCount = 0;

    for (const file of LAYER_2_FILES) {
        if (fileExists(file)) {
            log(`Preserving: ${file}`, 'INFO');
            runCommand(`git checkout HEAD -- "${file}"`, { silent: true, allowFail: true });
            preservedCount++;
        }
    }

    log(`Preserved ${preservedCount} business files`, 'OK');
}

// ============================================================================
// LAYER 3: GUIDE CLAUDE.MD MERGE
// ============================================================================

async function guideCLAUDEMerge() {
    log('CLAUDE.md requires manual merge (Layer 3)...', 'STEP');

    console.log('\nCLAUDE.md contains BOTH framework (Daron\'s improvements) AND business content (your customizations).');
    console.log('You need to manually merge this file.\n');

    console.log('Options:');
    console.log('  A) Side-by-side diff (recommended - opens VS Code)');
    console.log('  B) Manual merge instructions (I\'ll do it myself)');
    console.log('  C) Skip for now (I\'ll merge later)\n');

    const choice = await promptChoice('Choose option', ['A', 'B', 'C']);

    if (choice === 'A') {
        await sideBySideDiff();
    } else if (choice === 'B') {
        showManualInstructions();
    } else {
        log('CLAUDE.md merge skipped. Remember to merge before committing!', 'WARNING');
    }
}

async function sideBySideDiff() {
    log('Creating side-by-side diff for CLAUDE.md...', 'INFO');

    // Export upstream version
    runCommand('git show origin/main:CLAUDE.md > CLAUDE_upstream.md', { silent: true });

    // Copy local version
    if (fileExists('CLAUDE.md')) {
        fs.copyFileSync('CLAUDE.md', 'CLAUDE_local.md');
    }

    log('Opening VS Code diff view...', 'INFO');
    log('In VS Code:', 'INFO');
    log('  - LEFT side = Your current version', 'INFO');
    log('  - RIGHT side = Daron\'s new version', 'INFO');
    log('  - FRAMEWORK sections: Copy from RIGHT (Daron\'s improvements)', 'INFO');
    log('  - CUSTOMER sections: Keep from LEFT (your business content)', 'INFO');

    // Open diff in VS Code
    runCommand('code --diff CLAUDE_local.md CLAUDE_upstream.md', { allowFail: true });

    console.log('\nAfter merging:');
    console.log('  1. Save your merged CLAUDE.md');
    console.log('  2. Delete temporary files (CLAUDE_upstream.md, CLAUDE_local.md)');
    console.log('  3. Continue with this script\n');

    await confirm('Press Enter when merge is complete...');

    // Clean up temp files
    if (fileExists('CLAUDE_upstream.md')) fs.unlinkSync('CLAUDE_upstream.md');
    if (fileExists('CLAUDE_local.md')) fs.unlinkSync('CLAUDE_local.md');

    log('CLAUDE.md merge complete', 'OK');
}

function showManualInstructions() {
    console.log('\n=== MANUAL MERGE INSTRUCTIONS ===\n');
    console.log('1. Open CLAUDE.md in your editor');
    console.log('2. Look for section markers:');
    console.log('   - <!-- FRAMEWORK SECTION --> = Take Daron\'s version');
    console.log('   - <!-- CUSTOMER SECTION --> = Keep your version\n');
    console.log('3. For FRAMEWORK sections:');
    console.log('   - Replace with content from Daron\'s update');
    console.log('   - Run: git show origin/main:CLAUDE.md');
    console.log('   - Copy framework sections from output\n');
    console.log('4. For CUSTOMER sections:');
    console.log('   - Keep your current content unchanged\n');
    console.log('5. Save merged CLAUDE.md\n');
    console.log('See PRODUCT_UPDATE_PROTOCOL.md for detailed examples.\n');
}

async function promptChoice(question, choices) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readline.question(`${question}: `, (answer) => {
            readline.close();
            const upper = answer.toUpperCase();
            if (choices.includes(upper)) {
                resolve(upper);
            } else {
                console.log(`Invalid choice. Please choose from: ${choices.join(', ')}`);
                resolve(promptChoice(question, choices));
            }
        });
    });
}

// ============================================================================
// COMMIT
// ============================================================================

async function commitChanges() {
    log('Committing merged changes...', 'STEP');

    // Show what will be committed
    console.log('\n=== FILES TO COMMIT ===');
    runCommand('git status --short');

    const shouldCommit = await confirm('\nCommit these changes?');

    if (!shouldCommit) {
        log('Commit skipped. You can commit manually later.', 'WARNING');
        return;
    }

    // Stage all changes
    runCommand('git add .');

    // Get commit message
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const message = await new Promise((resolve) => {
        readline.question('Commit message (or press Enter for default): ', (answer) => {
            readline.close();
            resolve(answer || 'MERGE: Upstream update from Daron');
        });
    });

    // Commit
    runCommand(`git commit -m "${message}"`);

    log('Changes committed successfully', 'OK');
}

// ============================================================================
// TEST
// ============================================================================

async function runTests() {
    log('Testing updated system...', 'STEP');

    console.log('\nPlease test the following:');
    console.log('  1. Ask Claude Code: "Generate daily roadmap"');
    console.log('  2. Verify your business context loads (AI Growth Engine)');
    console.log('  3. Check that scripts run without errors\n');

    const testsPass = await confirm('Do all tests pass?');

    if (!testsPass) {
        log('Tests failed. You can revert to backup branch.', 'WARNING');
        console.log('\nTo revert:');
        const backupBranch = runCommand('git branch --list backup-pre-update-*', { silent: true }).trim();
        console.log(`  git reset --hard ${backupBranch}`);
        return false;
    }

    log('Tests passed', 'OK');
    return true;
}

// ============================================================================
// MAIN WORKFLOW
// ============================================================================

async function main() {
    console.log('\n=================================================');
    console.log('  Claude Code Business OS - Update from Upstream');
    console.log('=================================================\n');

    // Step 1: Validate
    validateGitRepo();

    const isClean = checkUncommittedChanges();
    if (!isClean) {
        const proceed = await confirm('Uncommitted changes detected. Continue anyway? (changes will be committed)');
        if (!proceed) {
            log('Update cancelled. Commit your changes and try again.', 'INFO');
            process.exit(0);
        }
    }

    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main') {
        log(`You are on branch "${currentBranch}". Switch to main branch first.`, 'WARNING');
        const switchToMain = await confirm('Switch to main branch now?');
        if (switchToMain) {
            runCommand('git checkout main');
        } else {
            log('Update cancelled.', 'INFO');
            process.exit(0);
        }
    }

    // Step 2: Backup
    const backupBranch = createBackup();

    // Step 3: Fetch
    fetchUpstream();

    // Step 4: Review changes
    const hasChanges = showChanges();

    if (!hasChanges) {
        log('No updates available. Exiting.', 'INFO');
        process.exit(0);
    }

    const proceed = await confirm('\nProceed with update?');
    if (!proceed) {
        log('Update cancelled.', 'INFO');
        process.exit(0);
    }

    // Step 5: Update Layer 1 (Framework)
    updateFrameworkFiles();

    // Step 6: Preserve Layer 2 (Business)
    preserveBusinessFiles();

    // Step 7: Guide Layer 3 (CLAUDE.md)
    await guideCLAUDEMerge();

    // Step 8: Commit
    await commitChanges();

    // Step 9: Test
    const testsPass = await runTests();

    // Done
    console.log('\n=================================================');
    console.log('  Update Complete!');
    console.log('=================================================\n');

    console.log(`Backup branch: ${backupBranch}`);
    console.log('To revert if needed:');
    console.log(`  git reset --hard ${backupBranch}\n`);

    if (testsPass) {
        log('Your Business OS is now up-to-date with Daron\'s latest improvements.', 'OK');
        log('Your business customizations have been preserved.', 'OK');
    } else {
        log('Update complete, but tests failed. Review changes before continuing.', 'WARNING');
    }
}

// ============================================================================
// RUN
// ============================================================================

main().catch((error) => {
    console.error('\n[ERROR] Update script failed:');
    console.error(error.message);
    process.exit(1);
});
