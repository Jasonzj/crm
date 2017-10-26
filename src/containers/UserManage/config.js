import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import DropOption from 'components/DropOption'

export const createPagination = (
    total,
    onChange
) => ({
    total,
    onChange,
    showQuickJumper: true,
})

export const createColumns = (
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

export const createBusinessColumns = (
    handleOption
) => {
    const data = [
        {
            title: '所属人',
            dataIndex: 'eName'
        },
        {
            title: '公司名字',
            dataIndex: 'name'
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
            title: '联系人职位',
            dataIndex: 'contactPost'
        },
        {
            title: '创建时间',
            dataIndex: 'time'
        },
        {
            title: 'Operation',
            width: 100,
            render: (text, record) => (
                <DropOption
                    onMenuClick={e => console.log(e)}
                    menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]}
                />
            )
        }
    ]
    return data
}
