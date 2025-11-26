---
description: Create a new project in the Project Memory system
---

1.  **Identify Project Type and Title**:
    *   Ask the user for the project type and title if not provided.
    *   Valid types: `youtube`, `blog`, `social`, `gpt`, `course`, `template`, `tool`, `quarterly-plan`, `business-strategy`, `content-calendar`, `email-campaign`, `launch`, `promotion`, `member-engagement`, `support`, `market-research`, `competitive-analysis`, `technical-learning`.

2.  **Execute Creation Script**:
    *   Run the following command:
        ```bash
        node scripts/project-commands.js new-project [type] "[title]"
        ```

3.  **Verify and Inform**:
    *   The script will output the location of the new file.
    *   Inform the user of the success and the next steps (usually validating alignment).
