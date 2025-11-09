/**
 * update-asset-registry.js
 *
 * Automates System Asset Registry updates
 *
 * Functions:
 * - addAsset(metadata) - Adds new asset to registry
 * - updateAsset(assetId, updates) - Updates existing asset
 * - removeAsset(assetId) - Archives/removes asset
 * - syncFromLog() - Parses operations_log.txt for new assets
 * - exportToJSON() - Generates asset-registry.json
 *
 * Usage:
 *   node scripts/update-asset-registry.js sync
 *   node scripts/update-asset-registry.js add --asset-id skill-test --type skill --name "Test Skill"
 *   node scripts/update-asset-registry.js export
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'System Documentation', 'SYSTEM_ASSET_REGISTRY.md');
const OPERATIONS_LOG_PATH = path.join(__dirname, '..', 'operations_log.txt');
const JSON_EXPORT_PATH = path.join(__dirname, '..', 'System Documentation', 'asset-registry.json');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Reads the registry file and parses YAML frontmatter + markdown content
 */
function readRegistry() {
  const content = fs.readFileSync(REGISTRY_PATH, 'utf-8');

  // Parse YAML frontmatter
  const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!yamlMatch) {
    throw new Error('Registry file missing YAML frontmatter');
  }

  const yamlContent = yamlMatch[1];
  const markdownContent = content.slice(yamlMatch[0].length);

  // Simple YAML parser (for our simple structure)
  const frontmatter = {};
  yamlContent.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle arrays
      if (value.startsWith('[')) {
        frontmatter[key] = JSON.parse(value.replace(/"/g, '"'));
      } else if (value.startsWith('"')) {
        frontmatter[key] = value.slice(1, -1);
      } else {
        frontmatter[key] = isNaN(value) ? value : parseInt(value);
      }
    }
  });

  return { frontmatter, markdownContent, fullContent: content };
}

/**
 * Writes registry file with updated frontmatter + markdown
 */
function writeRegistry(frontmatter, markdownContent) {
  const yamlLines = [
    '---',
    `registry_version: "${frontmatter.registry_version}"`,
    `last_updated: "${frontmatter.last_updated}"`,
    `total_assets: ${frontmatter.total_assets}`,
    `asset_types: ${JSON.stringify(frontmatter.asset_types)}`,
    '---'
  ];

  const fullContent = yamlLines.join('\n') + markdownContent;
  fs.writeFileSync(REGISTRY_PATH, fullContent, 'utf-8');

  console.log('[OK] Registry updated successfully');
  console.log(`[INFO] Total assets: ${frontmatter.total_assets}`);
  console.log(`[INFO] Last updated: ${frontmatter.last_updated}`);
}

/**
 * Logs action to operations_log.txt
 */
function logToOperations(action, details) {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const logEntry = `[${timestamp}] - ${action} - asset-registry - ${details}\n`;
  fs.appendFileSync(OPERATIONS_LOG_PATH, logEntry, 'utf-8');
  console.log(`[INFO] Logged: ${action} - ${details}`);
}

/**
 * Gets current date in YYYY-MM-DD format
 */
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Generates asset markdown section
 */
function generateAssetMarkdown(metadata) {
  const lines = [
    `#### ${metadata.name}`,
    `- **Asset ID**: \`${metadata.asset_id}\``,
    `- **Type**: ${metadata.type}`,
    `- **Scope**: ${metadata.scope}`,
    `- **Status**: ${metadata.status}`,
    `- **Location**: \`${metadata.location}\``,
    `- **Description**: ${metadata.description}`,
    `- **Category**: ${metadata.category}`,
    `- **Tags**: [${metadata.tags.join(', ')}]`,
    `- **Created**: ${metadata.created}`,
    `- **Last Modified**: ${metadata.last_modified}`,
    `- **Owner**: ${metadata.owner}`
  ];

  if (metadata.dependencies && metadata.dependencies.length > 0) {
    lines.push(`- **Dependencies**: [${metadata.dependencies.join(', ')}]`);
  }

  if (metadata.related_assets && metadata.related_assets.length > 0) {
    lines.push(`- **Related Assets**: [${metadata.related_assets.join(', ')}]`);
  }

  if (metadata.documentation) {
    lines.push(`- **Documentation**: \`${metadata.documentation}\``);
  }

  lines.push(''); // Blank line after asset

  return lines.join('\n');
}

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Adds new asset to registry
 */
function addAsset(metadata) {
  console.log(`[INFO] Adding asset: ${metadata.name} (${metadata.type})`);

  // Validate required fields
  const required = ['asset_id', 'name', 'type', 'scope', 'status', 'location', 'description', 'category', 'tags', 'owner'];
  for (const field of required) {
    if (!metadata[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Set dates if not provided
  if (!metadata.created) metadata.created = getCurrentDate();
  if (!metadata.last_modified) metadata.last_modified = getCurrentDate();

  const { frontmatter, markdownContent } = readRegistry();

  // Check for duplicate asset_id
  if (markdownContent.includes(`**Asset ID**: \`${metadata.asset_id}\``)) {
    console.log('[WARNING] Asset ID already exists. Use updateAsset() to modify.');
    return false;
  }

  // Find appropriate section based on type
  const sectionMap = {
    'skill': '## CLAUDE CODE SKILLS',
    'subagent': '## SUBAGENTS',
    'command': '## CUSTOM SLASH COMMANDS',
    'script': '## AUTOMATION SCRIPTS',
    'project': '## ACTIVE/INCUBATOR PROJECTS',
    'mechanism': '## SYSTEM MECHANISMS',
    'mcp': '## MCPS'
  };

  const sectionHeader = sectionMap[metadata.type];
  if (!sectionHeader) {
    throw new Error(`Unknown asset type: ${metadata.type}`);
  }

  // Find insertion point (before next ## section or end of file)
  const sectionStart = markdownContent.indexOf(sectionHeader);
  if (sectionStart === -1) {
    throw new Error(`Section not found: ${sectionHeader}`);
  }

  // Find next section
  const nextSectionMatch = markdownContent.slice(sectionStart + sectionHeader.length).match(/\n## /);
  const insertionPoint = nextSectionMatch
    ? sectionStart + sectionHeader.length + nextSectionMatch.index
    : markdownContent.indexOf('## TAG INDEX');

  // Generate asset markdown
  const assetMarkdown = '\n' + generateAssetMarkdown(metadata) + '\n';

  // Insert asset
  const updatedContent =
    markdownContent.slice(0, insertionPoint) +
    assetMarkdown +
    markdownContent.slice(insertionPoint);

  // Update frontmatter
  frontmatter.total_assets += 1;
  frontmatter.last_updated = getCurrentDate();

  // Write registry
  writeRegistry(frontmatter, updatedContent);

  // Log to operations
  logToOperations('UPDATE', `Added: ${metadata.name} (${metadata.type})`);

  console.log(`[OK] Asset added successfully: ${metadata.name}`);
  return true;
}

/**
 * Updates existing asset in registry
 */
function updateAsset(assetId, updates) {
  console.log(`[INFO] Updating asset: ${assetId}`);

  const { frontmatter, markdownContent } = readRegistry();

  // Find asset by ID
  const assetIdPattern = `**Asset ID**: \`${assetId}\``;
  const assetStart = markdownContent.indexOf(assetIdPattern);

  if (assetStart === -1) {
    console.log(`[ERROR] Asset not found: ${assetId}`);
    return false;
  }

  // Find asset boundaries (from #### to next #### or section break)
  const headerStart = markdownContent.lastIndexOf('####', assetStart);
  const nextHeaderMatch = markdownContent.slice(assetStart).match(/\n#### /);
  const nextSectionMatch = markdownContent.slice(assetStart).match(/\n## /);

  let assetEnd;
  if (nextHeaderMatch && (!nextSectionMatch || nextHeaderMatch.index < nextSectionMatch.index)) {
    assetEnd = assetStart + nextHeaderMatch.index;
  } else if (nextSectionMatch) {
    assetEnd = assetStart + nextSectionMatch.index;
  } else {
    assetEnd = markdownContent.length;
  }

  const assetContent = markdownContent.slice(headerStart, assetEnd);

  // Parse current metadata
  const currentMetadata = {};
  const lines = assetContent.split('\n');

  lines.forEach(line => {
    const match = line.match(/- \*\*(\w[\w\s]+)\*\*: (.+)/);
    if (match) {
      const [, key, value] = match;
      const fieldKey = key.toLowerCase().replace(/\s+/g, '_');

      // Parse value based on format
      if (value.startsWith('[') && value.endsWith(']')) {
        currentMetadata[fieldKey] = value.slice(1, -1).split(', ').map(v => v.trim());
      } else if (value.startsWith('`') && value.endsWith('`')) {
        currentMetadata[fieldKey] = value.slice(1, -1);
      } else {
        currentMetadata[fieldKey] = value;
      }
    }
  });

  // Extract name from header
  const nameMatch = lines[0].match(/#### (.+)/);
  if (nameMatch) {
    currentMetadata.name = nameMatch[1];
  }

  // Merge updates
  const updatedMetadata = { ...currentMetadata, ...updates };
  updatedMetadata.last_modified = getCurrentDate();

  // Generate updated markdown
  const updatedAssetMarkdown = generateAssetMarkdown(updatedMetadata);

  // Replace in content
  const updatedContent =
    markdownContent.slice(0, headerStart) +
    updatedAssetMarkdown +
    markdownContent.slice(assetEnd);

  // Update frontmatter
  frontmatter.last_updated = getCurrentDate();

  // Write registry
  writeRegistry(frontmatter, updatedContent);

  // Log to operations
  const changesSummary = Object.keys(updates).join(', ');
  logToOperations('UPDATE', `Modified: ${assetId} (changed: ${changesSummary})`);

  console.log(`[OK] Asset updated successfully: ${assetId}`);
  return true;
}

/**
 * Removes asset from registry (marks as deprecated or removes entirely)
 */
function removeAsset(assetId, archive = true) {
  console.log(`[INFO] ${archive ? 'Archiving' : 'Removing'} asset: ${assetId}`);

  if (archive) {
    // Mark as deprecated instead of removing
    return updateAsset(assetId, { status: 'deprecated' });
  }

  const { frontmatter, markdownContent } = readRegistry();

  // Find and remove asset (similar to updateAsset but delete instead)
  const assetIdPattern = `**Asset ID**: \`${assetId}\``;
  const assetStart = markdownContent.indexOf(assetIdPattern);

  if (assetStart === -1) {
    console.log(`[ERROR] Asset not found: ${assetId}`);
    return false;
  }

  const headerStart = markdownContent.lastIndexOf('####', assetStart);
  const nextHeaderMatch = markdownContent.slice(assetStart).match(/\n#### /);
  const nextSectionMatch = markdownContent.slice(assetStart).match(/\n## /);

  let assetEnd;
  if (nextHeaderMatch && (!nextSectionMatch || nextHeaderMatch.index < nextSectionMatch.index)) {
    assetEnd = assetStart + nextHeaderMatch.index;
  } else if (nextSectionMatch) {
    assetEnd = assetStart + nextSectionMatch.index;
  } else {
    assetEnd = markdownContent.length;
  }

  // Remove asset
  const updatedContent =
    markdownContent.slice(0, headerStart) +
    markdownContent.slice(assetEnd);

  // Update frontmatter
  frontmatter.total_assets -= 1;
  frontmatter.last_updated = getCurrentDate();

  // Write registry
  writeRegistry(frontmatter, updatedContent);

  // Log to operations
  logToOperations('ARCHIVE', `Removed: ${assetId}`);

  console.log(`[OK] Asset removed successfully: ${assetId}`);
  return true;
}

/**
 * Syncs registry from operations_log.txt
 * Detects: CREATE - skill/command/script/subagent/project entries
 */
function syncFromLog(daysBack = 7) {
  console.log(`[INFO] Syncing from operations_log.txt (last ${daysBack} days)`);

  const logContent = fs.readFileSync(OPERATIONS_LOG_PATH, 'utf-8');
  const logLines = logContent.split('\n').filter(line => line.trim());

  // Parse log entries
  const recentEntries = [];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);

  logLines.forEach(line => {
    const match = line.match(/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] - (\w+) - (.+?) - (.+)$/);
    if (match) {
      const [, timestamp, action, target, details] = match;
      const entryDate = new Date(timestamp);

      if (entryDate >= cutoffDate) {
        recentEntries.push({ timestamp, action, target, details });
      }
    }
  });

  console.log(`[INFO] Found ${recentEntries.length} recent log entries`);

  // Detect new assets
  const newAssets = [];

  recentEntries.forEach(entry => {
    if (entry.action === 'CREATE') {
      // Patterns: CREATE - skill - [name], CREATE - command - [name], etc.
      const typeMatch = entry.target.match(/^(skill|command|script|subagent|project)$/);
      if (typeMatch) {
        const type = typeMatch[1];
        newAssets.push({
          type,
          name: entry.details,
          timestamp: entry.timestamp
        });
      }
    }

    if (entry.action === 'GRADUATE') {
      // Project graduated from incubator to active
      newAssets.push({
        type: 'project-graduation',
        name: entry.target,
        timestamp: entry.timestamp
      });
    }
  });

  console.log(`[INFO] Detected ${newAssets.length} potential new assets`);

  if (newAssets.length === 0) {
    console.log('[INFO] No new assets to sync');
    return { synced: 0, assets: [] };
  }

  // Return detected assets for manual review/addition
  // (Actual addition requires metadata that log doesn't have)
  return { synced: newAssets.length, assets: newAssets };
}

/**
 * Exports registry to JSON format
 */
function exportToJSON() {
  console.log('[INFO] Exporting registry to JSON');

  const { frontmatter, markdownContent } = readRegistry();

  const json = {
    version: frontmatter.registry_version,
    last_updated: frontmatter.last_updated,
    total_assets: frontmatter.total_assets,
    asset_types: frontmatter.asset_types,
    assets: []
  };

  // Parse markdown to extract all assets
  const sections = markdownContent.split(/\n## /).slice(1); // Skip intro before first ##

  sections.forEach(section => {
    const lines = section.split('\n');
    const sectionName = lines[0];

    // Skip non-asset sections
    if (sectionName.includes('TAG INDEX') || sectionName.includes('CHANGE LOG')) {
      return;
    }

    // Find all #### headers (assets)
    let currentAsset = null;

    lines.forEach(line => {
      if (line.startsWith('#### ')) {
        if (currentAsset) {
          json.assets.push(currentAsset);
        }
        currentAsset = { name: line.slice(5).trim() };
      } else if (currentAsset && line.startsWith('- **')) {
        const match = line.match(/- \*\*(\w[\w\s]+)\*\*: (.+)/);
        if (match) {
          const [, key, value] = match;
          const fieldKey = key.toLowerCase().replace(/\s+/g, '_');

          // Parse value
          if (value.startsWith('[') && value.endsWith(']')) {
            currentAsset[fieldKey] = value.slice(1, -1).split(', ').map(v => v.trim());
          } else if (value.startsWith('`') && value.endsWith('`')) {
            currentAsset[fieldKey] = value.slice(1, -1);
          } else {
            currentAsset[fieldKey] = value;
          }
        }
      }
    });

    if (currentAsset) {
      json.assets.push(currentAsset);
    }
  });

  fs.writeFileSync(JSON_EXPORT_PATH, JSON.stringify(json, null, 2), 'utf-8');

  console.log(`[OK] Exported ${json.assets.length} assets to JSON`);
  console.log(`[INFO] Location: ${JSON_EXPORT_PATH}`);

  return json;
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'add': {
        // Parse arguments for add command
        const metadata = {
          asset_id: getArg(args, '--asset-id'),
          name: getArg(args, '--name'),
          type: getArg(args, '--type'),
          scope: getArg(args, '--scope', 'system-wide'),
          status: getArg(args, '--status', 'production'),
          location: getArg(args, '--location'),
          description: getArg(args, '--description'),
          category: getArg(args, '--category'),
          tags: getArg(args, '--tags', '').split(',').map(t => t.trim()).filter(Boolean),
          owner: getArg(args, '--owner', 'Daron')
        };

        addAsset(metadata);
        break;
      }

      case 'update': {
        const assetId = getArg(args, '--asset-id');
        const updates = {};

        if (args.includes('--status')) updates.status = getArg(args, '--status');
        if (args.includes('--description')) updates.description = getArg(args, '--description');
        if (args.includes('--category')) updates.category = getArg(args, '--category');
        if (args.includes('--tags')) updates.tags = getArg(args, '--tags').split(',').map(t => t.trim());

        updateAsset(assetId, updates);
        break;
      }

      case 'remove': {
        const assetId = getArg(args, '--asset-id');
        const archive = !args.includes('--permanent');
        removeAsset(assetId, archive);
        break;
      }

      case 'sync': {
        const daysBack = parseInt(getArg(args, '--days', '7'));
        const result = syncFromLog(daysBack);

        console.log('\n[INFO] Sync Results:');
        console.log(`[INFO] Detected ${result.synced} potential new assets`);

        if (result.assets.length > 0) {
          console.log('\n[INFO] New assets detected (manual review required):');
          result.assets.forEach(asset => {
            console.log(`  - ${asset.type}: ${asset.name} (${asset.timestamp})`);
          });
          console.log('\n[TIP] Use Claude Code to add these assets with full metadata');
        }
        break;
      }

      case 'export': {
        exportToJSON();
        break;
      }

      default:
        console.log('System Asset Registry Update Script');
        console.log('');
        console.log('Usage:');
        console.log('  node scripts/update-asset-registry.js <command> [options]');
        console.log('');
        console.log('Commands:');
        console.log('  add       Add new asset to registry');
        console.log('  update    Update existing asset');
        console.log('  remove    Remove/archive asset');
        console.log('  sync      Sync from operations_log.txt');
        console.log('  export    Export registry to JSON');
        console.log('');
        console.log('Examples:');
        console.log('  node scripts/update-asset-registry.js sync');
        console.log('  node scripts/update-asset-registry.js export');
        console.log('  node scripts/update-asset-registry.js update --asset-id skill-test --status production');
    }
  } catch (error) {
    console.error('[ERROR]', error.message);
    process.exit(1);
  }
}

function getArg(args, flag, defaultValue = '') {
  const index = args.indexOf(flag);
  if (index === -1 || index === args.length - 1) {
    if (defaultValue === '') {
      throw new Error(`Missing required argument: ${flag}`);
    }
    return defaultValue;
  }
  return args[index + 1];
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export functions for use as module
module.exports = {
  addAsset,
  updateAsset,
  removeAsset,
  syncFromLog,
  exportToJSON
};
