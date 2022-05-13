import * as vscode from "vscode";
import { TsTreeNode } from './TsTreeNode';
import { apiManager } from './apiManager';


export class TsTreeDataProvider implements vscode.TreeDataProvider<TsTreeNode> {
    onDidChangeTreeData?: vscode.Event<void | TsTreeNode | TsTreeNode[] | null | undefined> | undefined;
    getTreeItem(element: TsTreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: TsTreeNode): vscode.ProviderResult<TsTreeNode[]> {
        if (element) {//子节点 
            return apiManager.getChildren();
        } else {
            const root = new TsTreeNode("root", vscode.TreeItemCollapsibleState.Collapsed);
            return [root];
        }
    }

}

export const tsTreeDataProvider: TsTreeDataProvider = new TsTreeDataProvider();