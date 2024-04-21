

# 脚手架应用





## 后端应用



### 1.项目构建配置

> 项目引入（自定义项目名称，将后端代码引入即可）

【1】引入noob-backend（通用后台模板）：新建xxx-backend文件夹，引入noob-backend代码文件

【2】File->Settings配置项目依赖仓库（如果出现maven依赖引入错误则确认是否要指定版本号，在[maven官网](https://mvnrepository.com/)中选择一个比较多人下载使用的版本进行配置）

- maven路径配置：C:/custom/develop/CONFIG/maven/apache-maven-3.5.2

- maven仓库配置：E:\workspace\maven-repo\repository\idea-repo\idea-repo-setting.xml、E:\workspace\maven-repo\repository\idea-repo\repo-data

- 配置完成刷新项目maven，检查项目是否正常引入maven配置

​	

【3】修改项目属性为当前要开发的项目

- 重命名项目（原有项目名称为noob-backend，注意全局修改）

- 借助idea对项目进行重命名，随后修改pom.xml文件中的noob-backend关键字为自己的项目名称（ctrl+shift+R全局搜索）

- 如果配置的description属性相应修改为项目介绍或说明
- 配置完成重新刷新maven配置即可



> 插件引入（提升开发效率）

【1】下载markdown插件：通过idea软件提供的方式下载（File->Settings->plugins->输入markdown下载插件）、或者通过外部安装导入（直接安装）

【2】下载mybatis x插件：File->Settings->plugins->输入mybatis x下载插件

【3】下载GenerateAllSetter插件，可以一键生成对象的所有get、set方法，生成一个充满假数据的类、充满假数据的对象（引入完成将光标放在对应实体，随后按快捷键Alt+Enter，选择要生成的代码）

![](http://cos.holic-x.com/full-stack/_post/image-20240312083739834.png)

> 项目配置：mysql数据库配置

【1】idea连接本地数据库（Database选项卡连接本地数据库即可），如果没有配置数据库，则还需进一步配置数据源

![](http://cos.holic-x.com/full-stack/_post/image-20240311205333654.png)



【2】模板默认数据库名称为dada_db_base，选中my_db（按ctrl+shift+R全局搜索，eclipse版快捷键为ctrl+H）替换为自己的数据库名

【3】运行数据库文件，创建数据表

【4】修改数据库配置application.yml



> 项目配置：redis数据库

【1】修改redis配置，在application中配置了redis seesion，如果没有使用到redis需要将session的store-type改为none（即存储会话不用redis存储，如果指定了redis此处需为redis）

​	（使用了redis需要将本地redis开启，在redis安装目录中启动redis-server.exe）



> 项目启动

【1】配置完成启动项目，访问http://localhost:8101/api/doc.html#/home，则可看到swagger构建的后台管理页面

【2】通过接口进行访问测试



### 2.模块开发

#### 构建说明

> 构建思路

【1】数据表设计

【2】基于MyBatisX插件快速生成代码（分层）

【3】代码迁移：将生成的代码依次放入指定业务模块位置：entity、mapper、service、controller

【4】controller构建：基于现有的CRUD模板快速构建一个控制器，完成业务模块的CRUD操作

【5】测试接口（基础骨架构建，具体业务逻辑还需完善）





#### 参考步骤

##### （1）数据表设计





##### （2）业务模块代码生成





##### （3）代码迁移





##### （4）controller构建

​	最简单的嵌入思路就是从controller层进行构建，然后依次跟踪飘红报错信息，补充完善对应分层的代码定义即可，此处以demo示例为参考







##### （5）测试接口
































