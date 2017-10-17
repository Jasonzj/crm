# CRM系统API文档

## 1. 登入注册s

### POST/注册
post `/register`

接受post参数
- user 用户名 
- pass 密码 
- age 年龄
- sex 性别
- tel 联系方式

请求格式:
```javascript
{
    user: 'zhangsan',   // 员工名 
    pass: '****',       // 密码
    age: 18,            // 年龄
    sex: 0,             // 性别 0(男)/1(女)
    tel: 13417730176    // 手机
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
post `/login`

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
}
```

## 2. 员工管理

get `/userList`

> 默认返回所有列表

参数
- page 页数
- uid 用户ID
### GET/获取列表或详情
#### 示例:
获取所有用户列表和获取单独一页用户列表:

get  `/userList` 或者  get `/userList?page=1`

返回格式:
```javascript
{
    succes: true/false,
    message: '',
    data: [
        {
            id: 111,          // 员工ID
            user: '张三',     // 员工名
            age: 18,         // 员工年龄
            sex: 0,          // 员工性别 0(男)/1(女)
            tel: 12222222,   // 员工电话
            state: 0         // 0(管理员)/1(员工)
        },
        ...
    ]
}
```

获取用户详情：

get `/userList?uid=xxxx`

返回格式:
```javascript
{
    succes: true/false,
    message: '',
    data: {
	    id: 111,          // 员工ID
        user: '张三',      // 员工名
        age: 18,          // 员工年龄
        sex: 0,           // 员工性别 0(男)/1(女)
        tel: 12222222,    // 员工电话
        state: 0,         // 0(管理员)/1(员工)
        business: [       // 商机
            {
                id: xxx,        // 商机ID
                uName: '',      // 员工姓名
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
}
```

### GET/搜索
get `/searchUser`

参数
- userName

示例:

get `/searchUser?userName=张三`

返回格式: 
```javascript
{
    succes: true/false,
    message: '',
    data: [
        {
            id: 111,         // 员工ID
            user: '张三',     // 员工名
            age: 18,         // 员工年龄
            sex: 0,          // 员工性别 0(男)/1(女)
            tel: 12222222,   // 员工电话
            state: 0         // 0(管理员)/1(员工)
        },
        ...
    ]
}
```



### POST/修改用户详情

post `/editUser`

请求格式:
```javascript
{
    uid: xxx,
    user: '张三',
    age: 18,
    sex: xx,
    tel: 12222222
}
```

返回格式:
```javascript
{
    succes: true/false,
    message: ''
}
```

## 3. 商机
get `/business`
> 默认返回所有列表

参数
- page 页数
- id 商机id


### GET/获取列表或详情
#### 示例:
获取所有商机列表和获取单独一页商机列表:
get  `/business` 或 get `/business?page=x`

返回格式:
```javascript
{
    succes: true/false,
    message: '',
    data: [
        {
            id: xxx,        // 商机ID
            uName: '',      // 员工姓名
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

获取商机详情
get `/business?id=x`
```javascript
{
    succes: true/false,
    message: '',
    data: {
        id: xxx,        // 商机ID
        uName: '',      // 员工姓名
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
}
```

### GET/搜索
get `/searchBusiness`

参数
- userName
- companyName

示例:

get `/searchBusiness?userName=张三`    (根据员工名搜索)
get `/searchBusiness?companyName=xxx有限公司` (根据公司名搜索)

返回格式:
```javascript
{
    succes: true/false,
    message: '',
    data: [
        {
            id: xxx,        // 商机ID
            uName: '',      // 员工姓名
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
post `/editBusiness`


请求格式:
```javascript
{
    id: xxx,        // 商机ID
    uName: '',      // 员工姓名
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
    succes: true/false,
    message: ''
}
```

### POST/添加商机

post `/addBusiness`

请求格式:
```javascript
{
    id: xxx,        // 商机ID
    uName: '',      // 员工姓名
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
    succes: true/false,
    message: ''
}
```

## 3. 拜访
get `/visit`
> 默认返回所有记录

参数
- page 页数
- id 拜访id


### GET/获取列表或详情
#### 示例:
获取所有拜访列表和获取单独一页拜访列表:

get  `/visit` 或 get `/visit?page=x`
```javascript
{
    succes: true/false,
    message: '',
    data: [             // 拜访记录列表
        {
            id: xx,        // 拜访记录ID
            name: '',      // 拜访公司名字
            userName: xx,  // 拜访员工名
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
    succes: true/false,
    message: '',
    data: {
        id: xx,        // 拜访记录ID
        name: '',      // 拜访公司名字
        time: xx-xx,   // 拜访时间
        userName: xx,  // 拜访员工名
        result: '',    // 拜访结果
        note: ''       // 拜访备注
        content: ''    // 拜访内容
    }
}
```

### GET/搜索
get `/searchVisit`

参数
- companyName
- userName

示例:

get `/searchVisit?companyName=xxx有限公司` (根据公司名搜索)
get `/searchVisit?userName=xxx有限公司` (根据拜访人搜索)

返回格式:
```javascript
{
    succes: true/false,
    message: '',
    data: [             // 拜访记录列表
        {
            id: xx,        // 拜访记录ID
            name: '',      // 拜访公司名字
            userName: xx,  // 拜访员工名
            time: xx-xx,   // 拜访时间
            result: '',    // 拜访结果
            note: ''       // 拜访备注
        },
        ...
    ]
}
```


### POST/添加拜访

post  `/addVisit`

请求格式:
```javascript
{
    time: xx-xx,       // 拜访时间 (年月日)
    content: 'xxx',    // 拜访内容
    result: 0,         // 拜访结果 (0成功, 1待定，2失败)
    note: ''           // 拜访备注
}
```
返回格式:
```javascript
{
    succes: true/false,
    message: ''
}
```

### POST/修改拜访

post  `/editVisit`

请求格式:
```javascript
{
    id: xx,        // 拜访记录ID
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
    succes: true/false,
    message: ''
}
```

## 4.合同
get  `/contractList`
> 默认返回所有记录

参数
- page 页数
- id 合同id


### GET/获取列表或详情
#### 示例:
获取所有合同列表和获取单独一页合同列表:
get  `/contract` 或 get  `/contract?page=x`
```javascript
{
    succes: true/false,
    message: '',
    data: [         // 合同列表
        {
            id: xx,        // 合同ID
            title: ''      // 合同标题
            name: '',      // 公司名字
            time: xx-xx,   // 合同时间
            state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
        },
        ...
    ]
}
```

get `/contract?id=xx`
```javascript
{
    succes: true/false,
    message: '',
    data: {         // 合同详情
        id: xx,        // 合同ID
        title: ''      // 合同标题
        name: '',      // 公司名字
        time: xx-xx,   // 合同时间
        content: '',   // 合同内容
        result: '',    // 合同结果
        note: ''，     // 合同备注
        state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
    }
}
```

### GET/搜索
get `/searchContract`

参数
- companyName

示例:

get `/searchContract?companyName=xxx有限公司` (根据公司名搜索)

返回格式:
```javascript
{
    succes: true/false,
    message: '',
    data: [         // 合同列表
        {
            id: xx,        // 合同ID
            title: ''      // 合同标题
            name: '',      // 公司名字
            time: xx-xx,   // 合同时间
            state: 0       // 合同状态 (0签订，1进行，2成功，3失败)
        },
        ...
    ]
}
```

### post/添加合同
post `/addContract`

请求格式:
```javascript
{
    id: xx,        // 合同ID (后台生成)
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
    success: true/false
    message: ''
}
```

### post/修改合同
post `/editContract`

请求格式:
```javascript
{
    id: xx,        // 合同ID
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
    success: true/false
    message: ''
}
```