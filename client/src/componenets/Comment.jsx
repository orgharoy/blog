import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip, ConfigProvider } from 'antd';

const Comment = ({comment, onEditComment, deleteComment}) => {
  return (
    <div className="mt-2 mb-4 p-2 bg-slate-100 transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-slate-500">{comment.name}</h3>
          <p className="font-semibold text-2xl text-slate-500">•</p>
          <h3 className="font-semibold text-sm text-slate-500">{comment.email}</h3>
        </div>
        <div className="flex items-center text-slate-500 gap-2">

          <Tooltip placement="topRight" title={"Edit Comment"}>
            <EditOutlined className="cursor-pointer" onClick={() => onEditComment(comment)}/>
          </Tooltip>
          <Tooltip placement="topRight" title={"Delete Comment"}>
            <DeleteOutlined className="cursor-pointer hover:text-red-600" onClick={() => deleteComment(comment.id)}/>
          </Tooltip>
 
        </div>
      </div>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment