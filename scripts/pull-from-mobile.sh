#!/bin/bash

# Pull from Mobile Script
# Pulls latest iPhone/Obsidian mobile changes back to Mac (overwrites Mac copy)
# Run this AFTER using iPhone/Obsidian mobile

SOURCE_DIR="/Users/stevegordon/Documents/mdaos/claude-code-os-lgbu/Project Memory"
OBSIDIAN_DIR="/Users/stevegordon/Library/Mobile Documents/iCloud~md~obsidian/Documents/Claude-Code-OS"

echo "📥 Pulling from Mobile..."
echo ""
echo "Direction: Obsidian Mobile → Mac (Project Memory)"
echo ""

# Wait a moment for iCloud to finish syncing
echo "Waiting 5 seconds for iCloud sync to complete..."
sleep 5

# Force sync from Obsidian folder to Project Memory (overwrite)
rsync -av --delete "$OBSIDIAN_DIR/" "$SOURCE_DIR/"

echo ""
echo "✅ Pull complete!"
echo ""
echo "Your iPhone changes are now in Project Memory."
echo "Claude Code can now see and process mobile captures."
