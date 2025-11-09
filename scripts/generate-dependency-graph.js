/**
 * DEPENDENCY GRAPH GENERATOR
 *
 * Reads all Active Projects Index YAML frontmatter, extracts dependency data,
 * and generates a Mermaid diagram visualizing project dependencies.
 *
 * Usage: node scripts/generate-dependency-graph.js
 * Output: System Documentation/PROJECT_DEPENDENCY_GRAPH.md
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// ASCII markers (Windows-compatible)
const markers = {
  ok: '[OK]',
  info: '[INFO]',
  warning: '[WARNING]',
  error: '[ERROR]'
};

const rootDir = path.join(__dirname, '..');
const indexDir = path.join(rootDir, 'Project Memory', 'Active Projects Index');
const outputFile = path.join(rootDir, 'System Documentation', 'PROJECT_DEPENDENCY_GRAPH.md');

// Read all project index files
function readProjectIndices() {
  console.log(`${colors.cyan}${markers.info}${colors.reset} Reading project indices from: ${indexDir}`);

  const files = fs.readdirSync(indexDir).filter(f => f.endsWith('-index.md'));
  console.log(`${colors.cyan}${markers.info}${colors.reset} Found ${files.length} project index files`);

  const projects = [];

  for (const file of files) {
    const filePath = path.join(indexDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract YAML frontmatter (handle both Unix \n and Windows \r\n line endings)
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
      console.log(`${colors.yellow}${markers.warning}${colors.reset} No YAML frontmatter found in ${file}`);
      continue;
    }

    try {
      const metadata = yaml.load(match[1]);

      // Extract project slug from filename (remove -index.md suffix)
      const slug = file.replace('-index.md', '');

      projects.push({
        slug,
        id: metadata.project_id,
        title: metadata.title,
        status: metadata.status,
        type: metadata.project_type,
        dependencies: metadata.dependencies || { blocks: [], blocked_by: [], related_parallel: [] },
        dependency_status: metadata.dependency_status || { is_blocked: false, blocking_count: 0, ready_to_start: true }
      });

      console.log(`${colors.green}${markers.ok}${colors.reset} Loaded: ${metadata.title} (${slug})`);
    } catch (err) {
      console.log(`${colors.red}${markers.error}${colors.reset} Failed to parse YAML in ${file}: ${err.message}`);
    }
  }

  return projects;
}

// Generate Mermaid diagram syntax
function generateMermaidDiagram(projects) {
  console.log(`\n${colors.cyan}${markers.info}${colors.reset} Generating Mermaid diagram...`);

  let mermaid = 'graph TD\n\n';

  // Define nodes (all projects)
  mermaid += '  %% PROJECT NODES\n';
  for (const project of projects) {
    const nodeId = project.slug;
    const label = project.title;

    // Node style based on status
    let nodeStyle = '';
    if (project.dependency_status.is_blocked) {
      nodeStyle = `[${label}<br/>BLOCKED]`;
      mermaid += `  ${nodeId}${nodeStyle}\n`;
      mermaid += `  style ${nodeId} fill:#ffcccc,stroke:#cc0000,stroke-width:2px\n`;
    } else if (project.dependency_status.blocking_count > 0) {
      nodeStyle = `[${label}<br/>BLOCKING ${project.dependency_status.blocking_count}]`;
      mermaid += `  ${nodeId}${nodeStyle}\n`;
      mermaid += `  style ${nodeId} fill:#ccffcc,stroke:#00cc00,stroke-width:2px\n`;
    } else if (project.status === 'active') {
      nodeStyle = `[${label}<br/>ACTIVE]`;
      mermaid += `  ${nodeId}${nodeStyle}\n`;
      mermaid += `  style ${nodeId} fill:#cce5ff,stroke:#0066cc,stroke-width:2px\n`;
    } else {
      nodeStyle = `[${label}<br/>INCUBATING]`;
      mermaid += `  ${nodeId}${nodeStyle}\n`;
      mermaid += `  style ${nodeId} fill:#f0f0f0,stroke:#666666,stroke-width:1px\n`;
    }
  }

  // Define edges (blocking dependencies)
  mermaid += '\n  %% BLOCKING DEPENDENCIES (must complete first)\n';
  for (const project of projects) {
    if (project.dependencies.blocks && project.dependencies.blocks.length > 0) {
      for (const blockSlug of project.dependencies.blocks) {
        mermaid += `  ${blockSlug} -->|BLOCKS| ${project.slug}\n`;
      }
    }
  }

  // Define edges (related parallel work - dashed lines)
  mermaid += '\n  %% RELATED PARALLEL WORK (connected themes)\n';
  const addedRelations = new Set(); // Avoid duplicate bi-directional arrows
  for (const project of projects) {
    if (project.dependencies.related_parallel && project.dependencies.related_parallel.length > 0) {
      for (const relatedSlug of project.dependencies.related_parallel) {
        // Create sorted pair to detect duplicates
        const pair = [project.slug, relatedSlug].sort().join('--');
        if (!addedRelations.has(pair)) {
          mermaid += `  ${project.slug} -.->|RELATED| ${relatedSlug}\n`;
          addedRelations.add(pair);
        }
      }
    }
  }

  return mermaid;
}

// Generate statistics
function generateStatistics(projects) {
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    incubating: projects.filter(p => p.status === 'incubating').length,
    blocked: projects.filter(p => p.dependency_status.is_blocked).length,
    blocking: projects.filter(p => p.dependency_status.blocking_count > 0).length,
    ready: projects.filter(p => p.dependency_status.ready_to_start).length,
    standalone: projects.filter(p =>
      (!p.dependencies.blocks || p.dependencies.blocks.length === 0) &&
      (!p.dependencies.blocked_by || p.dependencies.blocked_by.length === 0) &&
      (!p.dependencies.related_parallel || p.dependencies.related_parallel.length === 0)
    ).length
  };

  let statsMarkdown = '## Statistics\n\n';
  statsMarkdown += `- **Total Projects**: ${stats.total}\n`;
  statsMarkdown += `- **Active Projects**: ${stats.active}\n`;
  statsMarkdown += `- **Incubating Projects**: ${stats.incubating}\n`;
  statsMarkdown += `- **Blocked Projects**: ${stats.blocked}\n`;
  statsMarkdown += `- **Projects Blocking Others**: ${stats.blocking}\n`;
  statsMarkdown += `- **Ready to Start**: ${stats.ready}\n`;
  statsMarkdown += `- **Standalone Projects** (no dependencies): ${stats.standalone}\n\n`;

  // Critical path analysis
  statsMarkdown += '### Critical Path\n\n';
  const blockingProjects = projects.filter(p => p.dependency_status.blocking_count > 0);
  if (blockingProjects.length > 0) {
    statsMarkdown += 'Projects blocking the most downstream work:\n\n';
    blockingProjects.sort((a, b) => b.dependency_status.blocking_count - a.dependency_status.blocking_count);
    for (const project of blockingProjects) {
      statsMarkdown += `- **${project.title}**: Blocks ${project.dependency_status.blocking_count} project(s)\n`;
      if (project.dependencies.blocked_by && project.dependencies.blocked_by.length > 0) {
        statsMarkdown += `  - Downstream: ${project.dependencies.blocked_by.join(', ')}\n`;
      }
    }
  } else {
    statsMarkdown += 'No critical path dependencies detected.\n';
  }

  statsMarkdown += '\n';

  return statsMarkdown;
}

// Main execution
function main() {
  console.log(`\n${colors.bright}${colors.blue}========================================${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  DEPENDENCY GRAPH GENERATOR${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}========================================${colors.reset}\n`);

  // Read projects
  const projects = readProjectIndices();

  if (projects.length === 0) {
    console.log(`\n${colors.red}${markers.error}${colors.reset} No projects found. Exiting.`);
    process.exit(1);
  }

  console.log(`\n${colors.green}${markers.ok}${colors.reset} Successfully loaded ${projects.length} projects`);

  // Generate Mermaid diagram
  const mermaidDiagram = generateMermaidDiagram(projects);

  // Generate statistics
  const statistics = generateStatistics(projects);

  // Create output document
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  let outputMarkdown = '# Project Dependency Graph\n\n';
  outputMarkdown += `**Generated**: ${timestamp}\n`;
  outputMarkdown += `**Source**: All Active Projects Index files\n`;
  outputMarkdown += `**Total Projects**: ${projects.length}\n\n`;
  outputMarkdown += '---\n\n';

  outputMarkdown += statistics;

  outputMarkdown += '---\n\n';
  outputMarkdown += '## Dependency Graph\n\n';
  outputMarkdown += '```mermaid\n';
  outputMarkdown += mermaidDiagram;
  outputMarkdown += '```\n\n';

  outputMarkdown += '---\n\n';
  outputMarkdown += '## Legend\n\n';
  outputMarkdown += '- **Solid Arrow (-->)**: BLOCKS relationship (must complete first)\n';
  outputMarkdown += '- **Dashed Arrow (-.->)**: RELATED PARALLEL (connected themes, can run simultaneously)\n';
  outputMarkdown += '- **Red Node**: BLOCKED (waiting on dependencies)\n';
  outputMarkdown += '- **Green Node**: BLOCKING (other projects waiting on this)\n';
  outputMarkdown += '- **Blue Node**: ACTIVE (production status)\n';
  outputMarkdown += '- **Gray Node**: INCUBATING (exploratory status)\n\n';

  outputMarkdown += '---\n\n';
  outputMarkdown += '## How to Use This Graph\n\n';
  outputMarkdown += '1. **Identify Critical Path**: Focus on green nodes (blocking projects) to unblock maximum downstream work\n';
  outputMarkdown += '2. **Parallel Opportunities**: Follow dashed lines to find related work that can run simultaneously\n';
  outputMarkdown += '3. **Bottleneck Detection**: Red nodes indicate blocked work (complete blockers to unblock)\n';
  outputMarkdown += '4. **Strategic Sequencing**: Follow solid arrows to understand optimal task ordering\n\n';

  outputMarkdown += '---\n\n';
  outputMarkdown += '*Auto-generated by `scripts/generate-dependency-graph.js`*\n';

  // Write output file
  fs.writeFileSync(outputFile, outputMarkdown, 'utf8');

  console.log(`\n${colors.green}${markers.ok}${colors.reset} Dependency graph generated successfully!`);
  console.log(`${colors.cyan}${markers.info}${colors.reset} Output: ${outputFile}`);
  console.log(`\n${colors.bright}${colors.blue}========================================${colors.reset}\n`);
}

// Run main
try {
  main();
} catch (error) {
  console.error(`\n${colors.red}${markers.error}${colors.reset} Script failed: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
}
