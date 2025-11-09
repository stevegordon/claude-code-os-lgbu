# Active Projects

This is where **ongoing programs and initiatives** live - multi-file projects that need dedicated folder structure.

## Purpose

- House complex projects requiring multiple files
- Separate exploratory work (_Incubator) from validated programs
- Enable focused work (open sub-project folder in Claude Code)
- Track active work via Project Memory indices

## Folder Structure

### _Incubator/
Exploratory work-in-progress:
- Testing new ideas
- Building proof-of-concept
- Experimenting with frameworks
- Validating hypotheses

**When to use**: Early-stage projects, unclear if they'll graduate

### [Graduated Programs]/
Active ongoing programs that have been validated:
- Proven value
- Clear deliverables
- Ongoing maintenance required
- Part of core business operations

**When to use**: After incubation proves viability

## Project Lifecycle

### Stage 1: Incubation

Create in `_Incubator/[project-name]/`:
```
_Incubator/
└── my-new-program/
    ├── CLAUDE.md           # Project-specific guidance
    ├── README.md           # Project overview
    ├── deliverables/       # Project outputs
    └── research/           # Project research
```

Work with full context, test viability.

### Stage 2: Graduation

When project proves valuable, graduate:

Ask Claude:
```
"Graduate project [project-name]"
```

Claude will:
- Move from `_Incubator/` to `Active Projects/[Project Name]/`
- Generate project-specific CLAUDE.md
- Create project documentation
- Update Active Projects Index

### Stage 3: Active Maintenance

Work in `Active Projects/[Project Name]/`:
- Ongoing improvements
- Feature additions
- Bug fixes
- Documentation updates

Can open sub-project folder for focused work OR work from root for cross-project intelligence.

### Stage 4: Completion

When project complete or no longer active:

Ask Claude:
```
"Archive project [project-name]"
```

Claude will:
- Extract reusable components → Project Memory
- Archive full project folder
- Keep learnings searchable

## When to Open Sub-Project vs Root

### Open Root (CCGG Business Operations Style):
- See ALL work (Project Memory + Active Projects)
- Cross-project analysis
- Pattern recognition
- Unified business intelligence

### Open Sub-Project:
- Focused view of single program
- Project-specific commands
- Reduced context (faster Claude responses)
- Deep work on one initiative

**No conflicts** - Each workspace reads only its CLAUDE.md

## Best Practices

1. **Start in Incubator**: Don't graduate prematurely
2. **Create CLAUDE.md per project**: Project-specific guidance
3. **Sync indices weekly**: Keep Project Memory/Active Projects Index/ updated
4. **Graduate when valuable**: Proven business value = graduate
5. **Archive completed work**: Don't let inactive projects clutter Active

## Templates

See `_Templates/` folder for example project structures.

## Questions?

See CLAUDE.md for full documentation on Active Projects architecture.
