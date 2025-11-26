#!/bin/bash

# Obsidian Mobile Sync Script
# Bidirectional sync between Project Memory and Obsidian mobile folder
# Uses rsync with --update flag to only sync newer files (prevents overwriting recent changes)

SOURCE_DIR="/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/Project Memory"
OBSIDIAN_DIR="/Users/stevegordon/Library/Mobile Documents/iCloud~md~obsidian/Documents/Claude-Code-OS"

echo "🔄 Starting Obsidian Mobile Sync..."
echo ""

# Sync both directions using --update (only copy if source is newer)
# This prevents overwriting recent changes in either location

echo "📱 Syncing mobile changes → Project Memory (if newer)..."
rsync -av --update "$OBSIDIAN_DIR/" "$SOURCE_DIR/"

echo "💻 Syncing Mac changes → Obsidian mobile (if newer)..."
rsync -av --update "$SOURCE_DIR/" "$OBSIDIAN_DIR/"

echo ""
echo "✅ Sync complete!"
echo ""
echo "Both folders are now in sync (newer files preserved):"
echo "  - Project Memory: $SOURCE_DIR"
echo "  - Obsidian Mobile: $OBSIDIAN_DIR"
