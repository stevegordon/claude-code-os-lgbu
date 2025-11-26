#!/bin/bash

# Push to Mobile Script
# Pushes latest Mac changes to Obsidian mobile folder (overwrites mobile copy)
# Run this BEFORE using iPhone/Obsidian mobile

SOURCE_DIR="/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/Project Memory"
OBSIDIAN_DIR="/Users/stevegordon/Library/Mobile Documents/iCloud~md~obsidian/Documents/Claude-Code-OS"

echo "📤 Pushing to Mobile..."
echo ""
echo "Direction: Mac (Project Memory) → Obsidian Mobile"
echo ""

# Force sync from Project Memory to Obsidian folder (overwrite)
rsync -av --delete "$SOURCE_DIR/" "$OBSIDIAN_DIR/"

echo ""
echo "✅ Push complete!"
echo ""
echo "Next steps:"
echo "  1. Wait 1-2 minutes for iCloud sync"
echo "  2. Open Obsidian on iPhone"
echo "  3. Your latest Mac changes will be available"
echo ""
echo "When done on iPhone, run: bash scripts/pull-from-mobile.sh"
