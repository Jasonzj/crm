# 1. 登入注册

## /post 接口

### 1. 注册
post/register

参数
- user 用户名
- pass 密码
- age 年龄
- sex 性别
- tel 联系方式

{
    succes: true,
    message: ''
}

###  2. 登入
post/login

参数
- user 用户名
- pass 密码

# 2. 员工管理

### 1.列表
get/userList

默认返回所有

参数
- page 页数
- uid 用户ID

get/userList?page=1

```javascript
{
    succes: true/error,
    message: '',
    data: [
        {
            user: '张三',
            age: 18,
            sex: xx,
            tel: 12222222,
            state: 0(管理员)/1(员工)
        },
        ...
    ]
}
```

get/userList?uid=xxxx
```javascript
{
    succes: true/error,
    message: '',
    data: {
        user: '张三',
        age: 18,
        sex: xx,
        tel: 12222222,
        state: 0(管理员)/1(员工),
        shangji: {
            {

            },
            ....
        }
    }
}
```

修改
post /editUser

data: {
    uid: xxx,
    user: '张三',
    age: 18,
    sex: xx,
    tel: 12222222
}

返回: {
    succes: true/error,
    message: ''
}

## 商机
get /shangji

```javascript
{
    succes: true/error,
    message: '',
    data: [
        {
            uid: xxx,
            员工: xxxx,
            客户信息: {
                公司名称: xxx,
                公司类型: xxx,
                联系人: 'xxxx',
                联系人职位: 'xxx',
                创建时间: xxx,
            }
        },
        ...
    ]
}
```

get /shangji?id=x
```javascript
{
    succes: true/error,
    message: '',
    data: {
        uid: xxx,
        员工: xxxx,
        客户信息: {
            公司名称: xxx,
            联系人: 'xxxx',
            联系人职位: 'xxx',
            创建时间: xxx,
            公司简介: `xxxxxxxxxx`
            公司地址: 'xxx'
        }
    }
}
```


获取商机列表
get /shangji?page=x


修改商机
post /editShangji 

```javascript
{
    uid: xxx,
    员工: xxxx,
    客户信息: {
        公司名称: xxx,
        联系人: 'xxxx',
        联系人职位: 'xxx',
        创建时间: xxx,
        公司简介: `xxxxxxxxxx`
        公司地址: 'xxx'
    }
}
```

### 拜访
get /visit

```javascript
{
    succes: true/error,
    message: '',
    data(拜访记录): [
        {
            id: xx,
            公司名字: '',
            时间: xx-xx,
            结果: '',
            备注: ''
        },
        ...
    ]
}

get /visit?id=xx
{
    succes: true/error,
    message: '',
    data: {
        id: xx
        时间: xx-xx,
        拜访内容: 'xxx',
        结果: '',
        备注: ''
    }
}
```

添加拜访

post /addVisit
{
    时间: xx-xx, (年月日)
    拜访内容: 'xxx',
    结果: '', (0成功, 1待定，2失败)
    备注: ''
}

## 合同
get /contractList

{
    succes: true/error,
    message: '',
    data(合同列表): [
        {
            id: xx,
            合同标题: ''
            公司名字: '',
            时间: xx-xx,
            状态: (0签订，1进行，2成功，3失败)
        },
        ...
    ]
}

get /contractList?page=1

get /contractList?id=xx

{
    succes: true/error,
    message: '',
    data(合同详情): 
    {
        id: xx,
        合同标题: '',
        公司名字: '',
        时间: xx-xx,
        合同内容: '',
        结果: '',
        备注: ''，
        状态: (0签订，1进行，2成功，3失败)
    }
}

post /添加合同

{
    id: xx,
    合同标题: '',
    公司名字: '',
    时间: xx-xx,
    合同内容: '',
    结果: '',
    备注: ''，
    状态: (0签订，1进行，2成功，3失败)
}

返回 
{
    success: true/err
    message: ''
}

