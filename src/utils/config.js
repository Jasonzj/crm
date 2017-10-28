import React from 'react'
import { Avatar, Popover, Button } from 'antd'
import { Link } from 'react-router-dom'
import DropOption from 'components/DropOption'

// table
const createUserManageColums = (
    uState,
    handleOption
) => {
    const data = [
        {
            title: '头像',
            dataIndex: 'avatar',
            render: url => <Avatar size="small" src={url} />
        },
        {
            title: '姓名',
            dataIndex: 'name',
            render: (text, record) => <Link to={`user/${record.uid}`}>{text}</Link>,
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: '用户名',
            dataIndex: 'user'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render: num => ['男', '女'][num],
            filters: [
                { text: '男', value: 0 },
                { text: '女', value: 1 },
            ],
            onFilter: (value, record) => record.sex == value
        },
        {
            title: '权限',
            dataIndex: 'state',
            render: num => ['管理员', '普通'][num]
        },
        {
            title: '手机号码',
            dataIndex: 'tel'
        }
    ]

    if (uState === 0) {
        data.push({
            title: 'Operation',
            width: 100,
            render: (text, record) => (
                <DropOption
                    onMenuClick={e => handleOption(record, e)}
                    menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]}
                />
            )
        })
    }

    return data
}

const createBusinessColumns = handleOption => ([
    {
        title: '所属人',
        dataIndex: 'eName',
        render: (text, record) => <Link to={`user/${record.uid}`}>{text}</Link>,
        sorter: (a, b) => a.eName.length - b.eName.length
    },
    {
        title: '公司名字',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: '类型',
        dataIndex: 'type',
        render: num => ['经济', '科技', '医药', '物流', '航空'][num],
        filters: [
            { text: '经济', value: 0 },
            { text: '科技', value: 1 },
            { text: '医药', value: 2 },
            { text: '物流', value: 3 },
            { text: '航空', value: 4 },
        ],
        onFilter: (value, record) => record.type == value
    },
    {
        title: '职位',
        dataIndex: 'contactPost'
    },
    {
        title: '联系人',
        dataIndex: 'contact'
    },
    {
        title: '联系电话',
        dataIndex: 'contactTel'
    },
    {
        title: '地址',
        dataIndex: 'address'
    },
    {
        title: '创建时间',
        dataIndex: 'time',
    },
    {
        title: '公司简介',
        dataIndex: 'intro',
        render: (text, record) => (
            <Popover
                content={text}
                title={record.name}
                trigger="hover"
            >
                <Button>查看简介</Button>
            </Popover>
        )
    },
    {
        title: 'Operation',
        width: 100,
        render: (text, record) => (
            <DropOption
                onMenuClick={e => handleOption(record, e)}
                menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]}
            />
        )
    }
])

export const createColumns = ({
    type,
    uState,
    handleOption
}) => {
    switch (type) {
        case 'userDetail':
        case 'business':
            return createBusinessColumns(handleOption)

        case 'userManage':
        default:
            return createUserManageColums(uState, handleOption)
    }
}


// modalForm
const userManageForm = [
    {
        id: 1,
        key: 'name',
        label: '姓名',
        type: 'input',
        rules: [{ required: true, message: '请输入你的姓名!' }]
    },
    {
        id: 2,
        key: 'user',
        label: '用户名',
        disabled: true,
        type: 'input',
        rules: [{ required: true, message: '请输入你的用户名!' }]
    },
    {
        id: 3,
        key: 'age',
        label: '年龄',
        type: 'number',
        min: 18,
        max: 100,
        reles: [{ required: true, message: '请输入你的年龄!' }]
    },
    {
        id: 4,
        key: 'sex',
        label: '性别',
        string: true,
        type: 'select',
        selectVal: {
            0: '男',
            1: '女'
        },
        reles: [{ required: true }]
    },
    {
        id: 5,
        key: 'state',
        label: '权限',
        string: true,
        type: 'select',
        selectVal: {
            0: '管理员',
            1: '普通'
        },
        rules: [{ required: true }]
    },
    {
        id: 6,
        key: 'tel',
        label: '手机号码',
        type: 'input',
        rules: [
            { required: true, message: '手机号码不能为空!' },
            {
                pattern: /^(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
                message: '手机号码格式错误!'
            }
        ]
    }
]

const businessForm = [
    {
        id: 1,
        key: 'eName',
        label: '所属人',
        type: 'input',
        disabled: true,
        rules: [{ required: true }]
    },
    {
        id: 2,
        key: 'name',
        label: '公司名字',
        type: 'input',
        rules: [{ required: true, message: '请输入公司名字!' }]
    },
    {
        id: 3,
        key: 'contact',
        label: '联系人',
        type: 'input',
        reles: [{ required: true, message: '请输入联系人!' }]
    },
    {
        id: 4,
        key: 'contactPost',
        label: '职位',
        type: 'input',
        reles: [{ required: true, message: '请输入职位!' }]
    },
    {
        id: 5,
        key: 'contactTel',
        label: '联系电话',
        type: 'input',
        reles: [
            { required: true, message: '联系电话不能为空!' },
            {
                pattern: /^(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
                message: '联系电话格式错误!'
            }
        ]
    },
    {
        id: 6,
        key: 'time',
        label: '创建时间',
        type: 'input',
        disabled: true,
        rules: [{ required: true }]
    },
    {
        id: 7,
        key: 'address',
        label: '公司地址',
        type: 'address',
        address: true,
        rules: [{ required: true, message: '公司地址不能为空!' }]
    },
    {
        id: 8,
        key: 'intro',
        label: '公司简介',
        type: 'area',
        rules: [
            { required: true, message: '请输入公司简介!' },
            { min: 15, message: '简介最少15个字!' },
            { max: 200, message: '简介最多200个字!' },
        ]
    }
]

export const createForm = (type) => {
    switch (type) {
        case 'userDetail':
        case 'business':
            return businessForm

        case 'userManage':
        default:
            return userManageForm
    }
}