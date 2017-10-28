# CRM系统API文档V1

> 以下 api 路径均以 api/v1 为前缀

> 测试接口的default属性请无视

[测试接口地址](https://www.easy-mock.com/mock/59e6fb7d750b1a6a0b9ad955/api/v1)

权限:

|管理员(0)|普通用户(1)|
|:---:|:---:|
|删除/修改所有用户|修改自己用户信息|
|删除/修改所有商机|删除/修改/添加自己的商机|
|删除/修改所有拜访|删除/修改/添加自己的拜访|
|删除/修改所有合同|删除/修改/添加自己的合同|

## 1. 登入注册 

### POST/注册
post `/api/v1/register`

接受post参数
- user 用户名 
- pass 密码 
- age 年龄
- sex 性别
- tel 联系方式

请求格式:
```javascript
{
    user: 'zhangsan',   // 员工用户名
    name: '张三',       // 员工真实姓名
    pass: '****',       // 密码
    age: 18,            // 年龄
    sex: 0,             // 性别 0(男)/1(女)
    tel: '13417730176'  // 手机
}
```

返回格式:
```javascript
{
    success: true/false,    // true为成功，false失败
    message: ''             // 成功或失败信息
}
```

###  POST/登入
post `/api/v1/login`

参数
- user 用户名
- pass 密码

请求格式:
```javascript
{
    user: 'zhangsan',
    pass: '********'
}
```

返回格式:
```javascript
{
    success: true/false,    // true为成功，false失败
    message: ''             // 成功或失败信息
    data: {
        uid: xxx,           // 员工id
        user: 'zhangsan',   // 员工用户名
        name: '张三',       // 员工真实姓名
        age: 18,            // 年龄
        sex: 0,             // 性别 0(男)/1(女)
        tel: '13417730176'  // 手机
    }
}
```

## 2. 员工管理

get  `/api/v1/userList` 

> 默认返回所有列表

参数
- page 页数
- uid 用户ID
### GET/获取列表或详情
#### 示例:
获取所有用户列表和获取单独一页用户列表:

get [/api/v1/userList](https://www.easy-mock.com/mock/59e6fb7d750b1a6a0b9ad955/api/v1/userList) 或者  get [/api/v1/userList?page=1](https://www.easy-mock.com/mock/59e6fb7d750b1a6a0b9ad955/api/v1/userList?page=1)

> 默认10条一个分页

返回格式:
```javascript
{
    success: true/false,
    message: '',
    total: 133,   // 员工总数
    data: [
        {
            uid: 111,        // 员工ID
            user: 'zs',      // 员工账号
            name: '张三',    // 员工真实姓名
            age: 18,         // 员工年龄
            sex: 0,          // 员工性别 0(男)/1(女)
            tel: '12222222', // 员工电话
            state: 0，       // 0(管理员)/1(员工)
            avatar: "http://dummyimage.com/'100x100'/f2d479/#757575'&text='png"  // 头像
        },
        ...
    ]
}
```

获取用户详情：

get [/api/v1/userList?uid=1](https://www.easy-mock.com/mock/59e6fb7d750b1a6a0b9ad955/api/v1/userList?uid=1)

返回格式:
```javascript
{
    success: true/false,
    message: '',
    data: {
        uid: 111,         // 员工ID
        user: 'zsss',     // 员工账号
        name: '张三',     // 员工真实姓名
        age: 18,          // 员工年龄
        sex: 0,           // 员工性别 0(男)/1(女)
        tel: 12222222,    // 员工电话
        state: 0，        // 0(管理员)/1(员工)
        avatar: "http://dummyimage.com/'100x100'/f2d479/#757575'&text='png"  // 头像
    }
}
```

### GET/搜索
get `/api/v1/searchUser`

参数
- eName

示例:

get [/api/v1/searchUser?eName=张三](https://www.easy-mock.com/mock/59e6fb7d750b1a6a0b9ad955/api/v1/searchUser?eName=张三)

返回格式: 
```javascript
{
    success: true/false,
    message: '',
    total: 4,       // 员工总数
    data: [
        {
            uid: 111,        // 员工ID
            user: 'zss',     // 员工账户名
            name: '张三',    // 员工真实姓名
            age: 18,         // 员工年龄
            sex: 0,          // 员工性别 0(男)/1(女)
            tel: '12222222', // 员工电话
            state: 0,        // 0(管理员)/1(员工)
            avatar: "http://dummyimage.com/'100x100'/f2d479/#757575'&text='png"  // 头像
        },
        ...
    ]
}
```



### POST/修改用户详情

post `/api/v1/editUser`

请求格式:
```javascript
{
    uid: xxx,  // 被修改员工的ID
    eid: xxx,  // 修改人ID(只能用户本人或管理员修改)
    user: 'zss',
    name: '张三',
    age: 18,
    sex: xx,
    tel: '12222222'
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```

### POST/删除用户
post `/api/v1/deleteUser`

请求格式:
```javascript
{
    uid: xxx,  // 当前操作用户ID 用于权限认证 (只能管理员删除)
    deleteId: ['xxx', 'xxxx']       // 需要删除的ID数组 (可以单个或多个)
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```


## 3. 商机
get `/api/v1/business`
> 默认返回所有列表

参数
- page 页数
- id 商机id


### GET/获取列表或详情
#### 示例:
获取所有商机列表和获取单独一页商机列表:
get  `/api/v1/business` 或 get `/api/v1/business?page=x`

返回格式:
```javascript
{
    success: true/false,
    message: '',
    total: 133,     // 商机总数
    data: [
        {
            id: xxx,        // 商机ID
            uid: '',        // 员工id
            eName: '',      // 员工真实姓名
            client: {       // 客户信息
                name: xxx,           // 公司名称
                type: xxx,           // 公司类型
                contact: 'xxxx',     // 联系人
                contactTel: 111,     // 联系人电话
                contactPost: 'xxx',  // 联系人职位
                time: xxx,           // 创建时间
                intro: `xxxxxxxxxx`  // 公司简介
                address: 'xxx'       // 公司地址
            }
        },
        ...
    ]
}
```

### GET/搜索
get `/api/v1/searchBusiness`

参数
- eName
- companyName

示例:

get `/api/v1/searchBusiness?eName=张三`    (根据员工真实姓名搜索)
get `/api/v1/searchBusiness?companyName=xxx有限公司` (根据公司名搜索)

返回格式:
```javascript
{
    success: true/false,
    message: '',
    total: 4,     // 商机总数
    data: [
        {
            id: xxx,        // 商机ID
            uid: '',        // 员工id
            eName: '',      // 员工真实姓名
            client: {       // 客户信息
                name: xxx,           // 公司名称
                type: xxx,           // 公司类型
                contact: 'xxxx',     // 联系人
                contactTel: 111,     // 联系人电话
                contactPost: 'xxx',  // 联系人职位
                time: xxx            // 创建时间
            }
        },
        ...
    ]
}
```

### POST/修改商机
post `/api/v1/editBusiness`


请求格式:
```javascript
{
    id: xxx,        // 商机ID
    uid: '',        // 员工的id
    eid: ''，       // 修改人的ID  (用于权限检验，只能本人或管理员)
    client: {
        name: xxx,           // 公司名称
        type: xxx,           // 公司类型
        contact: 'xxxx',     // 联系人
        contactTel: 111,     // 联系人电话
        contactPost: 'xxx',  // 联系人职位
        time: xxx,           // 创建时间
        intro: `xxxxxxxxxx`  // 公司简介
        address: 'xxx'       // 公司地址
    }
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```

### POST/添加商机

post `/api/v1/addBusiness`

请求格式:
```javascript
{
    uid: '',        // 员工id (添加人的id)
    client: {
        name: xxx,           // 公司名称
        type: xxx,           // 公司类型
        contact: 'xxxx',     // 联系人
        contactTel: 111,     // 联系人电话
        contactPost: 'xxx',  // 联系人职位
        time: xxx,           // 创建时间
        intro: `xxxxxxxxxx`  // 公司简介
        address: 'xxx'       // 公司地址
    }
}
```

返回格式:
```javascript
{
    success: true/false,
    message: '',
}
```

### POST/删除商机
post `/api/v1/deleteBusiness`

请求格式:
```javascript
{
    uid: xxx,  // 当前操作用户ID 用于权限认证 (管理员都能删除， 员工只能删除自己的商机)
    deleteId: ['xxx', 'xxxx']       // 需要删除的ID数组 (可以单个或多个)
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```

## 3. 拜访
get `/api/v1/visit`
> 默认返回所有记录

参数
- page 页数
- id 拜访id


### GET/获取列表或详情
#### 示例:
获取所有拜访列表和获取单独一页拜访列表:

get  `/api/v1/visit` 或 get `/api/v1/visit?page=x`
```javascript
{
    success: true/false,
    message: '',
    total: 133,         // 总拜访数
    data: [             // 拜访记录列表
        {
            id: xx,        // 拜访记录ID
            name: '',      // 拜访公司名字
            uid: '',       // 拜访员工id
            eName: xx,     // 拜访员工真实姓名
            time: xx-xx,   // 拜访时间
            result: '',    // 拜访结果
            note: ''       // 拜访备注
        },
        ...
    ]
}
```

获取拜访详情:
get ` /visit?id=xx`

```javascript
{
    success: true/false,
    message: '',
    data: {
        id: xx,        // 拜访记录ID
        name: '',      // 拜访公司名字
        time: xx-xx,   // 拜访时间
        uid: xx,       // 拜访员工id
        uName: xx,     // 拜访员工名
        eName: xx,     // 拜访员工真实姓名
        result: '',    // 拜访结果
        note: ''       // 拜访备注
        content: ''    // 拜访内容
    }
}
```

### GET/搜索
get `/api/v1/searchVisit`

参数
- companyName
- eName

示例:

get `/api/v1/searchVisit?companyName=xxx有限公司` (根据公司名搜索)
get `/api/v1/searchVisit?eName=xxx` (根据拜访人搜索)

返回格式:
```javascript
{
    success: true/false,
    message: '',
    total: 4,           // 总拜访数
    data: [             // 拜访记录列表
        {
            id: xx,        // 拜访记录ID
            name: '',      // 拜访公司名字
            uid: xx,       // 拜访员工id
            eName: xx,     // 拜访员工真实姓名
            time: xx-xx,   // 拜访时间
            result: '',    // 拜访结果
            note: ''       // 拜访备注
        },
        ...
    ]
}
```


### POST/添加拜访

post  `/api/v1/addVisit`

请求格式:
```javascript
{
    uid: xx,           // 拜访员工ID
    time: xx-xx,       // 拜访时间 (年月日)
    content: 'xxx',    // 拜访内容
    result: 0,         // 拜访结果 (0成功, 1待定，2失败)
    note: ''           // 拜访备注
}
```
返回格式:
```javascript
{
    success: true/false,
    message: ''，
}
```

### POST/修改拜访

post  `/api/v1/editVisit`

请求格式:
```javascript
{
    id: xx,        // 拜访记录ID
    uid: xx,       // 拜访员工id
    eid: xx,       // 修改人的id(用于权限检验，只能本人或管理员)
    name: '',      // 拜访公司名字
    time: xx-xx,   // 拜访时间
    result: '',    // 拜访结果
    note: ''       // 拜访备注
    content: ''    // 拜访内容
}
```
返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```

### POST/删除拜访
post `/api/v1/deleteVisit`

请求格式:
```javascript
{
    uid: xxx,  // 当前操作用户ID 用于权限认证 (管理员都能删除， 员工只能删除自己的拜访)
    deleteId: ['xxx', 'xxxx']       // 需要删除的ID数组 (可以单个或多个)
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```

## 4.合同
get  `/api/v1/contractList`
> 默认返回所有记录

参数
- page 页数
- id 合同id


### GET/获取列表或详情
#### 示例:
获取所有合同列表和获取单独一页合同列表:
get  `/api/v1/contract` 或 get  `/api/v1/contract?page=x`
```javascript
{
    success: true/false,
    message: '',
    total: 133,         // 合同总数
    data: [             // 合同列表
        {
            id: xx,        // 合同ID
            title: ''      // 合同标题
            name: '',      // 公司名字
            uid: xx,       // 合同跟进人id
            eName: '',     // 合同跟进人真实姓名
            time: xx-xx,   // 合同时间
            state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
        },
        ...
    ]
}
```

get `/api/v1/contract?id=xx`
```javascript
{
    success: true/false,
    message: '',
    data: {         // 合同详情
        id: xx,        // 合同ID
        uid: xx,       // 合同跟进人id
        title: ''      // 合同标题
        name: '',      // 公司名字
        uName: '',     // 合同跟进人账户
        eName: '',     // 合同跟进人真实姓名
        time: xx-xx,   // 合同时间
        content: '',   // 合同内容
        result: '',    // 合同结果
        note: ''，     // 合同备注
        state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
    }
}
```

### GET/搜索
get `/api/v1/searchContract`

参数
- companyName
- eName

示例:

get `/api/v1/searchContract?companyName=xxx有限公司` (根据公司名搜索)
get `/api/v1/searchContract?eName=xxx` (根据合同跟进人搜索)

返回格式:
```javascript
{
    success: true/false,
    message: '',
    total: 4,       // 合同总数
    data: [         // 合同列表
        {
            id: xx,        // 合同ID
            title: ''      // 合同标题
            name: '',      // 公司名字
            uid: xx,       // 合同跟进人id
            eName: '',     // 合同跟进人真实姓名
            time: xx-xx,   // 合同时间
            state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
        },
        ...
    ]
}
```

### post/添加合同
post `/api/v1/addContract`

请求格式:
```javascript
{
    uid: xx,       // 合同跟进人id(添加人)
    title: ''      // 合同标题
    name: '',      // 公司名字
    time: xx-xx,   // 合同时间
    content: '',   // 合同内容
    result: '',    // 合同结果
    note: ''，     // 合同备注
    state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
}
```

返回格式:
```javascript
{
    success: true/false,
    message: '',
}
```

### post/修改合同
post `/api/v1/editContract`

请求格式:
```javascript
{
    id: xx,        // 合同ID
    uid: xx,       // 合同跟进人id(添加人)  
    eid: xx,       // 修改人ID (用于权限验证，只能添加人人或管理员)
    title: ''      // 合同标题
    name: '',      // 公司名字
    time: xx-xx,   // 合同时间
    content: '',   // 合同内容
    result: '',    // 合同结果
    note: ''，     // 合同备注
    state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```

### POST/删除拜访
post `/api/v1/deleteContract`

请求格式:
```javascript
{
    uid: xxx,  // 当前操作用户ID 用于权限认证 (管理员都能删除， 员工只能删除自己的合同)
    deleteId: ['xxx', 'xxxx']       // 需要删除的ID数组 (可以单个或多个)
}
```

返回格式:
```javascript
{
    success: true/false,
    message: ''
}
```