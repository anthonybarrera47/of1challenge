import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Validate GitHub Actions Workflow', async () => {
    const workflowPath = path.join(__dirname, '../.github/workflows/playwright.yml');

    // Read and verify the content of the workflow file
    const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
    expect(workflowContent).toContain('name: Playwright Tests');
    expect(workflowContent).toContain('on:');
    expect(workflowContent).toContain('pull_request:');
    expect(workflowContent).toContain('branches:');
    expect(workflowContent).toContain('master');
    expect(workflowContent).toContain('jobs:');
    expect(workflowContent).toContain('runs-on: ubuntu-latest');
    expect(workflowContent).toContain('steps:');
    expect(workflowContent).toContain('actions/checkout@v2');
    expect(workflowContent).toContain('actions/setup-node@v2');
    expect(workflowContent).toContain('npm install');
    expect(workflowContent).toContain('npx playwright install');
    expect(workflowContent).toContain('npx playwright test');
});
