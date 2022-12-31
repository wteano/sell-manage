# git操作规范文档

## 前置条件

```javascript
# 清除掉缓存在git中的用户名和密码  ( 可能之前有人用过这台电脑 )
git credential-manager uninstall

# 记住自己的用户名和密码
git config --global credential.helper store

# 配置提交代码的人的用户名和邮箱
git config --global user.name "小貂蝉"  // 配置用户名
git config --global user.email dc@qq.com // 配置邮箱

# 代码仓库地址
https://gitee.com/beehardy2/fitness-0401.git    // 仓库地址

# 仓库账号和密码
账号: 18181358***
密码: 123456
```



## 第一次下载(克隆)代码

```javascript
git clone 仓库地址 // 例如: git clone https://gitee.com/sine_regina/fitness-app-h50224.git
```



## 第二次以后下载(拉取)代码

```javascript
# 每天进公司第一件事情
git pull 仓库地址 分支名 // 例如: git pull origin develop
```



## 提交代码步骤【重点】

```javascript
git add .           // 纳入到版本控制
git commit -m "描述信息"   // 暂存到本地 

# commit一般是一个功能一次 push是一天一次. 一般是下班之前push
# push之前先pull一次

git push 仓库地址 分支名  // 推送到远程服务器仓库 例如: git push origin develop 
```



## commit 规范【重点】

```javascript
type(scope) : subject

( 1 ) type（必须） : commit 的类别，只允许使用下面几个标识：
    feat : 新功能
    fix : 修复bug
    docs : 文档改变
    style : 代码格式改变
    refactor : 某个已有功能重构
    perf : 性能优化
    test : 增加测试
    build : 改变了build工具 如 grunt换成了 npm
    revert : 撤销上一次的 commit
    chore : 构建过程或辅助工具的变动

( 2 ) scope（可选） : 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

( 3 ) subject（必须） : commit 的简短描述，不超过50个字符。
```



## 其他命令

```javascript
git status  // 查看仓库状态

git branch // 查看当前有哪些分支
git branch 分支名  // 创建分支
git checkout 分支名 // 切换分支
git checkout -b 分支名 // 创建并切换分支

git merge 分支名  // 合并分支

git tag -a v1.1 -m "test_tag"； // 打标签
git push origin --tags // 把tag标签(版本) 推送到服务器
```

























