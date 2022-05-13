import * as vscode from 'vscode';
import axios from "axios";
import * as path from 'path';
import * as fs from 'fs';

const folders = vscode.workspace.workspaceFolders;
const info = require(path.join(folders?.[0]?.uri.path || '', 'package.json'));

export const token = info.typeConfig.token;
export const projectId = info.typeConfig.project_id;
export const host = info.typeConfig.host;

console.log('wwww', token);

export function getApiList() {
    return axios.get(
        `${host}/api/interface/list?project_id=${projectId}&&token=${token}&page=1&limit=999`,
        {
            headers: {
                token,
            },
        },
    );
}

export function getApiById(id: string | undefined) {
    return axios.get(
        `${host}/api/interface/get?id=${id}&token=${token}`,
        {
            headers: {
                token,
            },
        },
    );
}