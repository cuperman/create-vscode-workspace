#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';

const WORKSPACE_FILENAME = 'workspace.code-workspace';
const SETTINGS_FILENAME = '.vscode/settings.json';
const TAB_WIDTH = 4;

const WORKSPACE_TEMPLATE = {
    folders: [
        {
            path: ''
        }
    ],
    settings: {}
};

const ROOT_SETTINGS_TEMPLATE = {
    'files.exclude': {}
};

const PYTHON_PROJECT_SETTINGS_TEMPLATE = {
    'python.pythonPath': ''
};

function workspaceConfig(dir: string, projects: string[] = []) {
    const folders = [{ path: dir }];

    projects.forEach(project => {
        folders.push({
            path: path.join(dir, project)
        });
    });

    return Object.assign({}, WORKSPACE_TEMPLATE, { folders });
}

function rootSettingsConfig(projects: string[]) {
    const excludes = projects.reduce(
        (excludes: { [subdirectory: string]: boolean }, project) => {
            return Object.assign({}, excludes, { [project]: true });
        },
        {}
    );

    return Object.assign({}, ROOT_SETTINGS_TEMPLATE, {
        'files.exclude': excludes
    });
}

function projectSettingsConfig(project: string) {
    return Object.assign({}, PYTHON_PROJECT_SETTINGS_TEMPLATE);
}

function createJsonFile(file: string, contents: any) {
    const dirname = path.dirname(file);

    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(contents, null, TAB_WIDTH));
}

function run() {
    const pwd = process.env.PWD;
    const projects = process.argv.slice(2);

    createJsonFile(
        path.join(pwd, WORKSPACE_FILENAME),
        workspaceConfig(pwd, projects)
    );

    createJsonFile(
        path.join(pwd, SETTINGS_FILENAME),
        rootSettingsConfig(projects)
    );

    projects.forEach(project => {
        createJsonFile(
            path.join(pwd, project, SETTINGS_FILENAME),
            projectSettingsConfig(project)
        );
    });
}

run();
