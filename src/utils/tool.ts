import * as vscode from 'vscode';
import { getApiById } from './api';

function getType(data: any) {
    const r = Object.prototype.toString.call(data);

    return r.replace(/\[object (.*?)\]/, '$1').toLowerCase();
}

enum Type {
    basic,
    quote
}

// 基本类型
interface IBasicData {
    type: string; 
    description: string;
}

// 引用类型
interface IArrayQuoteData {
    type: string;
    items: IApiDetail;
    description: string;
}

type Properties = Record<string, IBasicData | IArrayQuoteData | IApiDetail>;

interface IApiDetail {
    type: string; 
    properties: Properties;
    required: string[];
    description: string;
}

export async function openTab(id: string | undefined) {
    console.log(222222, id);
}

/**
 * 插入类型
 * @param id 
 */
export async function insertType(id: string | undefined) {
    const res = await getApiById(id);
    const resBody = JSON.parse(res.data.data.res_body || '{}') as IApiDetail;

    vscode.window.activeTextEditor?.edit(() => {
        // 从开始到结束，全量替换
        const activeTextEditor = vscode.window.activeTextEditor;
        const info = analysisData(resBody);
        const len = info.len;
        const content = info.result;
        const start = activeTextEditor!.selection.start;
        const end = new vscode.Position(start.line + content.length + len + 3, 0);
        const selection = new vscode.Selection(start, end);
        const insertStr = `
    interface ITemplate {
        ${info.type === Type.quote ? (content as string[]).join('') : content}}`;
        activeTextEditor?.insertSnippet(new vscode.SnippetString(insertStr));
        activeTextEditor!.selection = selection;
        vscode.commands.executeCommand('editor.action.formatSelection');
    });
}

interface IResult {
    len: number;
    type: Type;
    result: string[] | string;
}

function analysisData(data: IApiDetail) {
    let len = 0;
    let result;
    let type = Type.quote;
    if(data.type === 'object') {
        type = Type.quote;
        result = Object.entries(data.properties).reduce((result, [key, value]) => {
            let item;
            if(value.type === 'array') {
                const newValue = value as IArrayQuoteData;
                const info = analysisData(newValue.items);
                if(info.type === Type.quote) {
                    len = len + info.len + info.result.length;
                    const res = info.result as string[];
                    item = `${key}: {${res.join('')}}[]; ${newValue.description ? '// ' + newValue.description : ''} \n`;
                } else {
                    len = len + info.len;
                    const res = info.result;
                    item = `${key}: ${res}[]; ${newValue.description ? '// ' + newValue.description : ''} \n`;
                }
            } else if(value.type === 'object') {
                const info = analysisData(value as IApiDetail);
                if(info.type === Type.quote) {
                    len = len + info.len + info.result.length;
                    const res = info.result as string[];
                    item = `${key}: {${res.join('')}}; ${value.description ? '// ' + value.description : ''} \n`;
                } else {
                    len = len + info.len;
                    const res = info.result;
                    item = `${key}: ${res}; ${value.description ? '// ' + value.description : ''} \n`;
                }
            }else {
                item = `${key}: ${value.type}; ${value.description ? '// ' + value.description : ''} \n`;
            }
           
            result.push(item);
            return result;
        }, [] as string[]);
    }else {
        type = Type.basic;
        result = data.type;
    }
    return {
        len,
        result,
        type
    };
}