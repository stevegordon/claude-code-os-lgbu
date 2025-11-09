#!/usr/bin/env node

/**
 * Sync All Project Indices
 *
 * Scans Active Projects (including _Incubator) and creates/updates
 * lightweight indices in Project Memory/Active Projects Index/
 *
 * Usage:
 *   node scripts/sync-all-indices.js
 *
 * Can also be triggered via natural language: "sync all project indices"
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ACTIVE_PROJECTS = path.join(PROJECT_ROOT, 'Active Projects');
const INCUBATOR = path.join(ACTIVE_PROJECTS, '_Incubator');
const INDICES_PATH = path.join(PROJECT_ROOT, 'Project Memory', 'Active Projects Index');
const OPERATIONS_LOG = path.join(PROJECT_ROOT, 'operations_log.txt');

// Utility: Log operation
function logOperation(action, projectId, details) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const logEntry = `[${timestamp}] - ${action} - ${projectId} - ${details}\n`;
  fs.appendFileSync(OPERATIONS_LOG, logEntry);
}

// Utility: Convert project folder name to slug
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Utility: Convert slug to Title Case
function toTitleCase(slug) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Utility: Get file modification time
function getLastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (error) {
    return new Date().toISOString().split('T')[0];
  }
}

// Scan project folder to extract status and deliverables
function analyzeProject(projectPath, projectName, isIncubator) {
  const analysis = {
    name: projectName,
    slug: toSlug(projectName),
    title: toTitleCase(toSlug(projectName)),
    type: isIncubator ? 'incubator-program' : 'active-program',
    status: isIncubator ? 'incubating' : 'active',
    folder_path: isIncubator ? `Active Projects/_Incubator/${projectName}` : `Active Projects/${projectName}`,
    tags: [],
    deliverables: [],
    current_status: 'No recent activity',
    last_modified: getLastModified(projectPath)
  };

  // Try to read README.md
  const readmePath = path.join(projectPath, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8');

    // Extract basic info (first 500 chars)
    const preview = readme.substring(0, 500);
    analysis.current_status = preview.split('\n').slice(0, 3).join(' ').trim();

    // Extract potential tags from content (simple keyword extraction)
    const keywords = preview.toLowerCase().match(/\b(automation|ai|content|youtube|skool|affiliate|member|retention|engagement|challenge|onboarding|email|crm|offer|funnel|plugin|agent|skill)\b/g);
    if (keywords) {
      analysis.tags = [...new Set(keywords)].slice(0, 5);
    }
  }

  // Try to read CLAUDE.md for additional context
  const claudeMdPath = path.join(projectPath, 'CLAUDE.md');
  const claudeMdAltPath = path.join(projectPath, '.claude', 'CLAUDE.md');

  let claudeMd = null;
  if (fs.existsSync(claudeMdPath)) {
    claudeMd = fs.readFileSync(claudeMdPath, 'utf8');
  } else if (fs.existsSync(claudeMdAltPath)) {
    claudeMd = fs.readFileSync(claudeMdAltPath, 'utf8');
  }

  if (claudeMd) {
    // Extract mission/purpose from CLAUDE.md
    const missionMatch = claudeMd.match(/## PROJECT MISSION[^#]*([\s\S]{0,300})/i);
    if (missionMatch) {
      analysis.current_status = missionMatch[1].trim().split('\n').slice(0, 2).join(' ');
    }
  }

  return analysis;
}

// Create or update index file
function syncIndex(projectAnalysis) {
  const indexFilename = `${projectAnalysis.slug}-index.md`;
  const indexPath = path.join(INDICES_PATH, indexFilename);
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  // Check if index exists to preserve some data
  let existingData = {};
  if (fs.existsSync(indexPath)) {
    try {
      const existing = fs.readFileSync(indexPath, 'utf8');
      const parsed = matter(existing);
      existingData = parsed.data;
    } catch (error) {
      // Ignore parsing errors, will create fresh
    }
  }

  // Merge with existing data (preserve project_id, date_created, strategic_alignment if present)
  const metadata = {
    project_id: existingData.project_id || `${projectAnalysis.type.split('-')[0]}-${projectAnalysis.slug}`,
    title: existingData.title || projectAnalysis.title,
    project_type: projectAnalysis.type,
    status: existingData.status || projectAnalysis.status,
    date_created: existingData.date_created || projectAnalysis.last_modified,
    date_modified: now.split(' ')[0],
    folder_path: projectAnalysis.folder_path,
    tags: projectAnalysis.tags.length > 0 ? projectAnalysis.tags : (existingData.tags || []),
    strategic_alignment: existingData.strategic_alignment || {
      oobg_relevance: "TBD - requires manual update",
      unique_vehicle_fit: "TBD - requires manual update",
      avatar_targets: ["TBD"]
    },
    last_sync: now
  };

  // Generate index content
  const content = `---
project_id: "${metadata.project_id}"
title: "${metadata.title}"
project_type: "${metadata.project_type}"
status: "${metadata.status}"
date_created: "${metadata.date_created}"
date_modified: "${metadata.date_modified}"
folder_path: "${metadata.folder_path}"
tags: ${JSON.stringify(metadata.tags)}
strategic_alignment:
  oobg_relevance: "${metadata.strategic_alignment.oobg_relevance}"
  unique_vehicle_fit: "${metadata.strategic_alignment.unique_vehicle_fit}"
  avatar_targets: ${JSON.stringify(metadata.strategic_alignment.avatar_targets)}
last_sync: "${metadata.last_sync}"
---

## Current Status

${projectAnalysis.current_status}

**Auto-synced**: ${now}

## Key Deliverables

- [ ] Project setup and structure
- [ ] Core deliverables (update manually)
- [ ] Documentation and guides

## Last Activity

Last modified: ${projectAnalysis.last_modified}

## Quick Access

**Full Project**: [${metadata.folder_path}](../../${metadata.folder_path.replace(/\\/g, '/')}/)
${fs.existsSync(path.join(PROJECT_ROOT, metadata.folder_path, 'README.md')) ? `- [README.md](../../${metadata.folder_path.replace(/\\/g, '/')}/README.md)` : ''}
${fs.existsSync(path.join(PROJECT_ROOT, metadata.folder_path, 'CLAUDE.md')) ? `- [CLAUDE.md](../../${metadata.folder_path.replace(/\\/g, '/')}/CLAUDE.md)` : ''}
`;

  fs.writeFileSync(indexPath, content);
  return { created: !fs.existsSync(indexPath), updated: true };
}

// Main sync function
function syncAllIndices() {
  console.log('\n=== Syncing All Project Indices ===\n');

  const results = {
    active: [],
    incubator: [],
    created: 0,
    updated: 0,
    errors: []
  };

  // Ensure indices directory exists
  if (!fs.existsSync(INDICES_PATH)) {
    fs.mkdirSync(INDICES_PATH, { recursive: true });
  }

  // Scan Active Projects (non-incubator)
  const activeEntries = fs.readdirSync(ACTIVE_PROJECTS, { withFileTypes: true });
  for (const entry of activeEntries) {
    if (entry.isDirectory() && entry.name !== '_Incubator' && !entry.name.startsWith('_')) {
      const projectPath = path.join(ACTIVE_PROJECTS, entry.name);
      try {
        const analysis = analyzeProject(projectPath, entry.name, false);
        const result = syncIndex(analysis);
        results.active.push(analysis.name);
        if (result.created) results.created++;
        if (result.updated) results.updated++;
      } catch (error) {
        results.errors.push(`Error syncing ${entry.name}: ${error.message}`);
      }
    }
  }

  // Scan Incubator Projects
  if (fs.existsSync(INCUBATOR)) {
    const incubatorEntries = fs.readdirSync(INCUBATOR, { withFileTypes: true });
    for (const entry of incubatorEntries) {
      if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.')) {
        const projectPath = path.join(INCUBATOR, entry.name);
        try {
          const analysis = analyzeProject(projectPath, entry.name, true);
          const result = syncIndex(analysis);
          results.incubator.push(analysis.name);
          if (result.created) results.created++;
          if (result.updated) results.updated++;
        } catch (error) {
          results.errors.push(`Error syncing ${entry.name}: ${error.message}`);
        }
      }
    }
  }

  // Generate summary
  console.log(`✓ Synced ${results.active.length} active projects`);
  console.log(`✓ Synced ${results.incubator.length} incubator projects`);
  console.log(`✓ Created ${results.created} new indices`);
  console.log(`✓ Updated ${results.updated} indices`);

  if (results.errors.length > 0) {
    console.log(`\n⚠ Errors:`);
    results.errors.forEach(err => console.log(`  - ${err}`));
  }

  console.log(`\n--- Active Projects ---`);
  results.active.forEach(name => console.log(`  • ${name}`));

  console.log(`\n--- Incubator Projects ---`);
  results.incubator.forEach(name => console.log(`  • ${name}`));

  // Log operation
  const totalProjects = results.active.length + results.incubator.length;
  logOperation(
    'SYNC',
    'all-projects',
    `Synced ${totalProjects} project indices (${results.active.length} active, ${results.incubator.length} incubating)`
  );

  console.log(`\n✓ Operation logged in operations_log.txt\n`);

  return results;
}

// Run if executed directly
if (require.main === module) {
  syncAllIndices();
}

module.exports = { syncAllIndices };
