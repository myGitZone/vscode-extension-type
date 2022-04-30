import * as vscode from 'vscode';

// 树节点
export class EntryItem extends vscode.TreeItem
{
}

//树的内容组织管理
export class EntryList implements vscode.TreeDataProvider<EntryItem>
{
    onDidChangeTreeData?: vscode.Event<void | EntryItem | null | undefined> | undefined;
    getTreeItem(element: EntryItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: EntryItem): vscode.ProviderResult<EntryItem[]> {
        if (element) {//子节点
            var childs = [];
            for (let index = 0; index < 3; index++) {
                let str = index.toString();
                var item = new EntryItem(str,vscode.TreeItemCollapsibleState.None);
                item.command = {command:"api-list.openChild", //命令id
                                title:"标题",
                                arguments:[str+'1222'] //命令接收的参数
								};
                childs[index] = item;
            }
            return childs;
        } else { //根节点
            const root = new EntryItem("root",vscode.TreeItemCollapsibleState.Collapsed);
            root.command = {
                command:"api-list-root.openChild", //命令id
                title: 'root',
                arguments: ['34d']
            };
            return [root];
        }
    }
}