# Create VSCode Workspace

Create a VSCode workspace configuration, where subdirectories are separate projects.

## Features

- Creates workspace configuration file in root
- Adds subdirectories to the workspace and creates VSCode configuration
- Ignores subprojects in root project configuration (so files are not duplicated in the workspace)

## Usage

Execute `create-vscode-workspace`, passing a list of subdirectories to add to the workspace:

```bash
npx create-vscode-workspace -- backend frontend infrastructure
open workspace.code-workspace
```
