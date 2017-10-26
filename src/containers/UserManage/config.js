import React from 'react'
import { Avatar } from 'antd'
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
            render: text => <a href="#">{text}</a>,
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