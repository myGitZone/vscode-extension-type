import { Disposable, TreeItemCollapsibleState } from "vscode";
import { TsTreeNode } from './TsTreeNode';
import { getApiList } from '../utils/api';

class ApiManager implements Disposable {
    private explorerNodeArr: Array<TsTreeNode> = new Array<TsTreeNode>();
    public async refresh() {
        this.dispose();
        const res = await getApiList();
        const data = res.data.data.list;
        for (let item of data) {
            const tsTreeNode = new TsTreeNode(item.title, TreeItemCollapsibleState.None);
            tsTreeNode.contextValue = 'typeExplorerInsert';
            tsTreeNode.id = item._id;
            tsTreeNode.command = {
                command: "typeExplorer.check", //命令id
                title: "查看",
                arguments: [item._id] //命令接收的参数
            };
            this.explorerNodeArr.push(tsTreeNode);
        }

    }
    public dispose() {
        this.explorerNodeArr.length = 0;
    }

    public getChildren() {
        return this.explorerNodeArr;
    }

}


export const apiManager: ApiManager = new ApiManager();