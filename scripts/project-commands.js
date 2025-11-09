#!/usr/bin/env node

/**
 * CCGG Project Memory - Command Handler
 *
 * Handles all project management commands:
 * - new-project
 * - find-projects
 * - validate-alignment
 * - complete-project
 * - dashboard
 * - analyze-patterns
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const matter = require('gray-matter');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PROJECT_MEMORY = path.join(PROJECT_ROOT, 'Project Memory');
const TEMPLATES_DIR = path.join(PROJECT_MEMORY, '_Templates');
const INDEX_DIR = path.join(PROJECT_MEMORY, '_Index');
const KB_PATH = path.join(PROJECT_ROOT, 'AI Growth Engine', 'Knowledge Base');
const OPERATIONS_LOG = path.join(PROJECT_ROOT, 'operations_log.txt');

// Project type to folder mapping
const PROJECT_FOLDERS = {
  youtube: 'Content Projects',
  blog: 'Content Projects',
  social: 'Content Projects',
  gpt: 'Product Builds',
  course: 'Product Builds',
  template: 'Product Builds',
  tool: 'Product Builds',
  'quarterly-plan': 'Strategic Planning',
  'business-strategy': 'Strategic Planning',
  'content-calendar': 'Strategic Planning',
  'email-campaign': 'Marketing Campaigns',
  launch: 'Marketing Campaigns',
  promotion: 'Marketing Campaigns',
  'member-engagement': 'Community Management',
  support: 'Community Management',
  'market-research': 'Research & Learning',
  'competitive-analysis': 'Research & Learning',
  'technical-learning': 'Research & Learning'
};

// Template mapping
const TEMPLATE_MAP = {
  youtube: 'youtube-content-template.md',
  blog: 'youtube-content-template.md', // Reuse content template
  social: 'youtube-content-template.md',
  gpt: 'product-build-template.md',
  course: 'product-build-template.md',
  template: 'product-build-template.md',
  tool: 'product-build-template.md',
  'quarterly-plan': 'strategic-planning-template.md',
  'business-strategy': 'strategic-planning-template.md',
  'content-calendar': 'strategic-planning-template.md',
  'email-campaign': 'marketing-campaign-template.md',
  launch: 'marketing-campaign-template.md',
  promotion: 'marketing-campaign-template.md'
};

// Utility: Log operation
function logOperation(action, projectId, details) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] - [${action}] - [${projectId}] - [${details}]\n`;
  fs.appendFileSync(OPERATIONS_LOG, logEntry);
}

// Utility: Parse YAML frontmatter using gray-matter
function parseFrontmatter(content) {
  try {
    const parsed = matter(content);
    return { frontmatter: parsed.data, body: parsed.content };
  } catch (error) {
    console.error('Error parsing frontmatter:', error.message);
    return { frontmatter: {}, body: content };
  }
}

// Utility: Serialize frontmatter back to YAML using gray-matter
function serializeFrontmatter(frontmatter, body) {
  return matter.stringify(body, frontmatter);
}

// Command: new-project
function newProject(type, title) {
  if (!type || !title) {
    console.error('Usage: new-project <type> <title>');
    console.error('Example: new-project youtube "AI automation for coaches"');
    return;
  }

  const folder = PROJECT_FOLDERS[type];
  if (!folder) {
    console.error(`Unknown project type: ${type}`);
    console.error(`Available types: ${Object.keys(PROJECT_FOLDERS).join(', ')}`);
    return;
  }

  const templateFile = TEMPLATE_MAP[type];
  if (!templateFile) {
    console.error(`No template available for type: ${type}`);
    return;
  }

  const templatePath = path.join(TEMPLATES_DIR, templateFile);
  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`);
    return;
  }

  // Generate project file
  const projectId = uuidv4();
  const today = new Date().toISOString().split('T')[0];
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = `${today}_${type}_${slug}.md`;
  const targetPath = path.join(PROJECT_MEMORY, folder, filename);

  // Read template and populate metadata
  let content = fs.readFileSync(templatePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  frontmatter.project_id = projectId;
  frontmatter.title = title;
  frontmatter.date_created = today;
  frontmatter.date_modified = today;

  // Write new project file
  const newContent = serializeFrontmatter(frontmatter, body);
  fs.writeFileSync(targetPath, newContent);

  // Log operation
  logOperation('CREATE', projectId, `Type: ${type}, Title: ${title}`);

  console.log(`✓ Project created: ${filename}`);
  console.log(`  Location: ${targetPath}`);
  console.log(`  Project ID: ${projectId}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Open the file and complete strategic_alignment section`);
  console.log(`  2. Run: validate-alignment "${projectId}" to check alignment`);
  console.log(`  3. Fill in project details as you work`);
}

// Command: find-projects (basic implementation)
function findProjects(query, options = {}) {
  const results = [];

  function searchDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        searchDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { frontmatter } = parseFrontmatter(content);

        // Simple search logic
        let matches = true;

        if (query && !content.toLowerCase().includes(query.toLowerCase())) {
          matches = false;
        }

        if (options.type && frontmatter.project_type !== options.type) {
          matches = false;
        }

        if (options.status && frontmatter.status !== options.status) {
          matches = false;
        }

        if (options.avatar && (!frontmatter.strategic_alignment ||
            !frontmatter.strategic_alignment.avatar_targets?.includes(options.avatar))) {
          matches = false;
        }

        if (matches) {
          results.push({
            path: fullPath,
            filename: entry.name,
            ...frontmatter
          });
        }
      }
    }
  }

  searchDirectory(PROJECT_MEMORY);

  // Sort by date_modified descending
  results.sort((a, b) => {
    const dateA = new Date(a.date_modified || a.date_created || 0);
    const dateB = new Date(b.date_modified || b.date_created || 0);
    return dateB - dateA;
  });

  if (options.recent) {
    return results.slice(0, options.recent);
  }

  return results;
}

// Command: validate-alignment
function validateAlignment(projectIdOrPath) {
  // Load strategy KB to get current priorities
  const strategyPath = path.join(KB_PATH, 'Strategy_for_CCGG_AI_Leaders_Business.md');
  const avatarsPath = path.join(KB_PATH, 'Target_Avatars_Complete_Profiles.md');

  if (!fs.existsSync(strategyPath)) {
    console.error('Cannot access Strategy KB file');
    return;
  }

  // Find project file
  let projectPath;
  if (fs.existsSync(projectIdOrPath)) {
    projectPath = projectIdOrPath;
  } else {
    // Search by project_id
    const results = findProjects('', {});
    const project = results.find(p => p.project_id === projectIdOrPath);
    if (!project) {
      console.error(`Project not found: ${projectIdOrPath}`);
      return;
    }
    projectPath = project.path;
  }

  const content = fs.readFileSync(projectPath, 'utf8');
  const { frontmatter } = parseFrontmatter(content);

  console.log(`\n=== Strategic Alignment Validation ===`);
  console.log(`Project: ${frontmatter.title || 'Untitled'}`);
  console.log(`Type: ${frontmatter.project_type}`);
  console.log(`\nAlignment Scores:`);
  console.log(`  OOBG Relevance: ${frontmatter.strategic_alignment?.oobg_relevance || 0}/100`);
  console.log(`  Unique Vehicle Fit: ${frontmatter.strategic_alignment?.unique_vehicle_fit || 0}/100`);
  console.log(`  Avatar Targets: ${frontmatter.strategic_alignment?.avatar_targets?.join(', ') || 'None specified'}`);

  // Provide recommendations
  const oobg = parseInt(frontmatter.strategic_alignment?.oobg_relevance) || 0;
  const uv = parseInt(frontmatter.strategic_alignment?.unique_vehicle_fit) || 0;

  console.log(`\n=== Recommendations ===`);
  if (oobg < 60) {
    console.log(`⚠ OOBG Relevance is low (<60). Consider:`);
    console.log(`  - How does this help coaches/consultants monetize with AI?`);
    console.log(`  - Does this drive CCGG growth directly?`);
    console.log(`  - Could you pivot this to be more business-outcome focused?`);
  }

  if (uv < 60) {
    console.log(`⚠ Unique Vehicle Fit is low (<60). Consider:`);
    console.log(`  - How does this leverage YouTube for traffic?`);
    console.log(`  - Does this drive CCGG paid subscriptions?`);
    console.log(`  - Could this encourage annual upgrades?`);
  }

  if (!frontmatter.strategic_alignment?.avatar_targets?.length) {
    console.log(`⚠ No avatar targets specified. Consider:`);
    console.log(`  - Which specific customer avatar does this serve?`);
    console.log(`  - Review: Target_Avatars_Complete_Profiles.md`);
  }

  if (oobg >= 60 && uv >= 60 && frontmatter.strategic_alignment?.avatar_targets?.length) {
    console.log(`✓ Strong strategic alignment! This project serves the OOBG well.`);
  }

  logOperation('VALIDATE', frontmatter.project_id, `OOBG: ${oobg}, UV: ${uv}`);
}

// Command: complete-project
function completeProject(projectIdOrTitle) {
  const results = findProjects(projectIdOrTitle, {});

  if (results.length === 0) {
    console.error(`Project not found: ${projectIdOrTitle}`);
    return;
  }

  if (results.length > 1) {
    console.log('Multiple projects found. Please be more specific:');
    results.forEach(p => console.log(`  - ${p.title} (${p.project_id})`));
    return;
  }

  const project = results[0];
  const content = fs.readFileSync(project.path, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Update status
  frontmatter.status = 'completed';
  frontmatter.date_modified = new Date().toISOString().split('T')[0];

  const newContent = serializeFrontmatter(frontmatter, body);
  fs.writeFileSync(project.path, newContent);

  console.log(`✓ Project marked as completed: ${frontmatter.title}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Fill in actual_outcome in business_metrics`);
  console.log(`  2. Document learnings in the "Learnings" section`);
  console.log(`  3. Identify reusable components for future projects`);

  logOperation('COMPLETE', frontmatter.project_id, `Title: ${frontmatter.title}`);
}

// Command: dashboard
function dashboard() {
  const allProjects = findProjects('', {});

  const active = allProjects.filter(p => p.status === 'in-progress');
  const planning = allProjects.filter(p => p.status === 'planning');
  const completed = allProjects.filter(p => p.status === 'completed');

  console.log(`\n=== CCGG Project Memory Dashboard ===\n`);
  console.log(`Total Projects: ${allProjects.length}`);
  console.log(`  In Progress: ${active.length}`);
  console.log(`  Planning: ${planning.length}`);
  console.log(`  Completed: ${completed.length}`);

  if (active.length > 0) {
    console.log(`\n--- Active Projects ---`);
    active.slice(0, 5).forEach(p => {
      console.log(`  • ${p.title || 'Untitled'} (${p.project_type})`);
      console.log(`    Modified: ${p.date_modified || p.date_created}`);
      console.log(`    Alignment: OOBG ${p.strategic_alignment?.oobg_relevance || 0}/100, UV ${p.strategic_alignment?.unique_vehicle_fit || 0}/100`);
    });
  }

  if (completed.length > 0) {
    console.log(`\n--- Recently Completed ---`);
    completed.slice(0, 3).forEach(p => {
      console.log(`  • ${p.title || 'Untitled'} (${p.project_type})`);
      console.log(`    Completed: ${p.date_modified || 'Date unknown'}`);
    });
  }

  // Calculate average alignment
  const projectsWithScores = allProjects.filter(p => p.strategic_alignment?.oobg_relevance);
  if (projectsWithScores.length > 0) {
    const avgOOBG = projectsWithScores.reduce((sum, p) =>
      sum + parseInt(p.strategic_alignment.oobg_relevance), 0) / projectsWithScores.length;
    const avgUV = projectsWithScores.reduce((sum, p) =>
      sum + parseInt(p.strategic_alignment.unique_vehicle_fit || 0), 0) / projectsWithScores.length;

    console.log(`\n--- Strategic Alignment Trends ---`);
    console.log(`  Average OOBG Relevance: ${avgOOBG.toFixed(1)}/100`);
    console.log(`  Average UV Fit: ${avgUV.toFixed(1)}/100`);
  }
}

// Command: graduate-project
function graduateProject(projectName) {
  if (!projectName) {
    console.error('Usage: graduate-project <project-name>');
    console.error('Example: graduate-project magnetic-content-os');
    return;
  }

  const ACTIVE_PROJECTS = path.join(PROJECT_ROOT, 'Active Projects');
  const INCUBATOR = path.join(ACTIVE_PROJECTS, '_Incubator');
  const sourcePath = path.join(INCUBATOR, projectName);

  // Validate project exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Project '${projectName}' not found in Active Projects/_Incubator/`);
    console.error(`\nCheck:`);
    console.error(`- Exact folder name (case-sensitive)`);
    console.error(`- Project exists in _Incubator/`);
    console.error(`- Not already in Active Projects/`);

    // List available incubator projects
    if (fs.existsSync(INCUBATOR)) {
      const incubatorProjects = fs.readdirSync(INCUBATOR, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);

      if (incubatorProjects.length > 0) {
        console.error(`\nAvailable incubator projects:`);
        incubatorProjects.forEach(name => console.error(`  - ${name}`));
      }
    }
    return;
  }

  // Check if folder is empty
  const contents = fs.readdirSync(sourcePath);
  if (contents.length === 0) {
    console.error(`❌ Project '${projectName}' folder is empty`);
    console.error(`\nCannot graduate empty project. Add content first:`);
    console.error(`- Documents, sequences, frameworks, etc.`);
    console.error(`- At least a basic structure before graduating`);
    return;
  }

  // Convert project name to Title Case
  const titleCaseName = projectName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const destinationPath = path.join(ACTIVE_PROJECTS, titleCaseName);

  // Check if destination already exists
  if (fs.existsSync(destinationPath)) {
    console.error(`❌ Active project '${titleCaseName}' already exists`);
    console.error(`\nThis project may have been graduated already.`);
    console.error(`Check: Active Projects/${titleCaseName}/`);
    console.error(`\nTo re-graduate: Delete existing folder first or choose different name.`);
    return;
  }

  console.log(`\n🔄 Graduating project: ${projectName} → ${titleCaseName}\n`);

  // Analyze project content
  console.log(`📊 Analyzing project content...`);
  const projectType = analyzeProjectType(sourcePath);
  console.log(`   Detected type: ${projectType}\n`);

  // Create destination directory
  fs.mkdirSync(destinationPath, { recursive: true });

  // Copy all content
  console.log(`📁 Migrating content...`);
  copyDirectory(sourcePath, destinationPath);
  console.log(`   ✓ Content migrated\n`);

  // Generate CLAUDE.md if it doesn't exist
  const claudeMdPath = path.join(destinationPath, 'CLAUDE.md');
  if (!fs.existsSync(claudeMdPath)) {
    console.log(`📝 Generating project-specific CLAUDE.md...`);
    const claudeMdContent = generateClaudeMd(titleCaseName, projectType, sourcePath);
    fs.writeFileSync(claudeMdPath, claudeMdContent);
    console.log(`   ✓ CLAUDE.md generated\n`);
  } else {
    console.log(`   ✓ Existing CLAUDE.md preserved\n`);
  }

  // Generate README.md
  console.log(`📄 Creating README.md...`);
  const readmeContent = generateReadme(titleCaseName, projectType, destinationPath);
  fs.writeFileSync(path.join(destinationPath, 'README.md'), readmeContent);
  console.log(`   ✓ README.md created\n`);

  // Log operation
  const projectId = `active-${projectName}`;
  logOperation('GRADUATE', projectId, `${projectName} → ${titleCaseName}`);
  console.log(`   ✓ Operations log updated\n`);

  // Update Asset Registry (if update-asset-registry.js exists)
  const registryScriptPath = path.join(__dirname, 'update-asset-registry.js');
  if (fs.existsSync(registryScriptPath)) {
    try {
      console.log(`📋 Updating System Asset Registry...`);
      const { updateAsset } = require('./update-asset-registry.js');

      // Update project status from incubating → active
      const assetId = `project-${projectName}`;
      updateAsset(assetId, {
        status: 'active',
        location: `Active Projects/${titleCaseName}/`
      });

      console.log(`   ✓ Asset Registry updated (incubating → active)\n`);
    } catch (error) {
      console.log(`   ⚠️  Asset Registry update skipped (asset may not exist yet)\n`);
    }
  }

  // Success report
  console.log(`✅ PROJECT GRADUATED SUCCESSFULLY\n`);
  console.log(`**New Location**: Active Projects/${titleCaseName}/\n`);
  console.log(`**What was created**:`);
  console.log(`- ✅ Project folder structure migrated`);
  console.log(`- ✅ CLAUDE.md ${fs.existsSync(claudeMdPath) && fs.readFileSync(claudeMdPath, 'utf8').includes('PROJECT MISSION') ? 'generated' : 'preserved'}`);
  console.log(`- ✅ README.md created`);
  console.log(`- ✅ Operations log updated\n`);
  console.log(`**Next Steps**:`);
  console.log(`1. Review generated CLAUDE.md and customize if needed`);
  console.log(`2. Open "Active Projects/${titleCaseName}/" for focused work`);
  console.log(`3. Or continue at root level for cross-project intelligence\n`);
  console.log(`**Project is now an Active Project in CCGG Business Operations!**\n`);
}

// Helper: Analyze project type from content
function analyzeProjectType(projectPath) {
  const contentKeywords = {
    content: ['content', 'magnetic', 'pipeline', 'video', 'article', 'youtube'],
    onboarding: ['onboarding', 'member', 'retention', 'engagement', 'sequence'],
    capture: ['capture', 'thought', 'knowledge', 'principle', 'database'],
    affiliation: ['affiliate', 'partner', 'enablement', 'commission'],
    course: ['course', 'module', 'curriculum', 'lesson', 'learning'],
    automation: ['automation', 'pipeline', 'workflow', 'agent', 'process']
  };

  let allContent = '';

  function readAllFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isFile() && (entry.name.endsWith('.txt') || entry.name.endsWith('.md'))) {
        allContent += fs.readFileSync(fullPath, 'utf8').toLowerCase() + ' ';
      } else if (entry.isDirectory()) {
        readAllFiles(fullPath);
      }
    });
  }

  readAllFiles(projectPath);

  // Score each type
  const scores = {};
  for (const [type, keywords] of Object.entries(contentKeywords)) {
    scores[type] = keywords.reduce((score, keyword) => {
      const matches = (allContent.match(new RegExp(keyword, 'g')) || []).length;
      return score + matches;
    }, 0);
  }

  // Return highest scoring type
  const detectedType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  return detectedType || 'general';
}

// Helper: Copy directory recursively
function copyDirectory(source, destination) {
  const entries = fs.readdirSync(source, { withFileTypes: true });

  entries.forEach(entry => {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Helper: Generate CLAUDE.md
function generateClaudeMd(projectName, projectType, sourcePath) {
  const typeConfigs = {
    content: {
      purpose: 'automated content creation pipeline for AI Magnetic Content',
      capabilities: [
        'Execute content creation workflows with AI subagents',
        'Coordinate multi-step content generation pipelines',
        'Collect and incorporate feedback iteratively',
        'Refine content guidelines based on outcomes'
      ],
      commands: [
        'create-pipeline [topic] - Set up new content creation workflow',
        'execute-workflow [pipeline-name] - Run automated content generation',
        'refine-feedback [content-id] - Incorporate feedback into guidelines'
      ],
      kbFiles: ['Attractive_Character_Daron_Vener.md', 'CCGG-Product-Information.md', 'Strategy_for_CCGG_AI_Leaders_Business.md']
    },
    onboarding: {
      purpose: 'automated member onboarding and retention system',
      capabilities: [
        'Design and manage member engagement sequences',
        'Track member consumption and activity',
        'Optimize touchpoints for retention',
        'Integrate with CCGG community platform'
      ],
      commands: [
        'create-sequence [sequence-name] - Design new onboarding sequence',
        'track-engagement [member-id] - Monitor member activity',
        'optimize-retention - Analyze and improve retention metrics'
      ],
      kbFiles: ['Target_Avatars_Complete_Profiles.md', 'CCGG-Product-Information.md', 'Daron_Veners_Offer_and_Funnel.md']
    },
    capture: {
      purpose: 'systematic thought capture and knowledge capitalization',
      capabilities: [
        'Capture thoughts from multiple sources',
        'Structure and clarify captured thoughts',
        'Store in searchable knowledge base',
        'Connect related principles and insights'
      ],
      commands: [
        'capture-thought [source] - Record new thought or insight',
        'structure-thought [thought-id] - Clarify and organize thought',
        'find-related [topic] - Discover connected thoughts and principles'
      ],
      kbFiles: ['Strategy_for_CCGG_AI_Leaders_Business.md', 'Unique_Selling_Proposition_USP.md', 'CCGG_Play_Bigger_Framework_Clean.md']
    },
    general: {
      purpose: 'ongoing CCGG business initiative',
      capabilities: [
        'Manage project-specific workflows',
        'Coordinate with other Active Projects',
        'Track progress and outcomes',
        'Integrate with AI Growth Engine knowledge base'
      ],
      commands: [
        'add-task [description] - Add new project task',
        'track-progress - View current project status',
        'analyze-outcomes - Review project results'
      ],
      kbFiles: ['Strategy_for_CCGG_AI_Leaders_Business.md', 'Target_Avatars_Complete_Profiles.md']
    }
  };

  const config = typeConfigs[projectType] || typeConfigs.general;

  return `# CLAUDE.md - ${projectName}

## PROJECT MISSION & IDENTITY

You are Claude Code working on the **${projectName}** project - ${config.purpose}.

This is an **active project** within CCGG Business Operations. For overall business operations work, open the parent folder. For focused work on this specific program, you're in the right place.

---

## CORE CAPABILITIES

${config.capabilities.map((cap, i) => `${i + 1}. ${cap}`).join('\n')}

---

## AI GROWTH ENGINE KNOWLEDGE BASE ACCESS

**Location**: \`../../AI Growth Engine/Knowledge Base/\` (via junction from root)
**Access Type**: **READ-ONLY**

### Relevant Knowledge Files for This Project:
${config.kbFiles.map(file => `- **${file}**`).join('\n')}

### Usage Guidelines:
- Reference knowledge base for strategic alignment
- Apply Daron's voice and positioning consistently
- Validate all work against OOBG and Unique Vehicle
- Target appropriate customer avatars

---

## PROJECT-SPECIFIC COMMANDS

${config.commands.map(cmd => `### ${cmd.split(' - ')[0]}\n${cmd.split(' - ')[1] || 'Execute project-specific operation'}`).join('\n\n')}

---

## CONTENT CREATION GUIDELINES

### Strategic Alignment
- **OOBG Relevance**: Does this help coaches/consultants monetize with AI?
- **Unique Vehicle Fit**: Does this leverage YouTube and CCGG paid community?
- **Avatar Targeting**: Which specific avatars does this serve?

### Voice Consistency
- Apply Daron Vener's Attractive Character patterns
- Use conversational, direct, business-outcome focused language
- Emphasize practical implementation over theory

---

## INTEGRATION WITH CCGG BUSINESS OPERATIONS

**This project is part of CCGG Business Operations**:
- Can work here for focused attention
- Or work at root level for cross-project intelligence
- Shares AI Growth Engine knowledge base with all CCGG work
- Contributes to unified business analytics and patterns

**Related Active Projects**:
- Check root CLAUDE.md for full list of Active Projects
- Look for cross-project synergies and reusable patterns

---

**Your role**: ${projectType.charAt(0).toUpperCase() + projectType.slice(1)} specialist supporting this specific CCGG business initiative while maintaining strategic alignment with overall business operations.
`;
}

// Helper: Generate README.md
function generateReadme(projectName, projectType, projectPath) {
  const contents = fs.readdirSync(projectPath);
  const today = new Date().toISOString().split('T')[0];

  return `# ${projectName}

## Overview
${projectType.charAt(0).toUpperCase() + projectType.slice(1)} project - part of CCGG Business Operations Active Projects portfolio.

## Purpose
Part of CCGG Business Operations - Active Projects portfolio

## Structure
${contents.filter(name => name !== 'README.md').map(name => `- ${name}`).join('\n')}

## Getting Started
- Open this folder in Claude Code for focused work on ${projectName}
- Or open parent \`CCGG Business Operations/\` for cross-project view
- Refer to CLAUDE.md for project-specific commands and workflows

## Integration
- **AI Growth Engine Access**: Via \`../../AI Growth Engine/\` (junction)
- **Knowledge Base**: Read-only access to all 9 core business files
- **Cross-Project**: Visible when working at CCGG Business Operations root level

## Last Updated
${today}
`;
}

// Main CLI handler
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'new-project':
    newProject(args[0], args.slice(1).join(' '));
    break;
  case 'find-projects':
    const results = findProjects(args[0] || '', {});
    console.log(`Found ${results.length} projects:`);
    results.forEach(p => {
      console.log(`  • ${p.title || 'Untitled'} (${p.project_type}) - ${p.date_modified || p.date_created}`);
      console.log(`    ${p.path}`);
    });
    break;
  case 'validate-alignment':
    validateAlignment(args[0]);
    break;
  case 'complete-project':
    completeProject(args.join(' '));
    break;
  case 'dashboard':
    dashboard();
    break;
  case 'graduate-project':
    graduateProject(args[0]);
    break;
  default:
    console.log('CCGG Project Memory Commands:');
    console.log('  new-project <type> <title>');
    console.log('  find-projects [query]');
    console.log('  validate-alignment <project-id>');
    console.log('  complete-project <project-id-or-title>');
    console.log('  dashboard');
    console.log('  graduate-project <project-name>');
}
