import React, { useState } from 'react';
import { userHome, userUpload } from '../../utils/api';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Button } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: "http://localhost:8080/api/users/chunk",
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('删除的文件', e.dataTransfer.files);
    },
};

const Home: React.FC = () => {

    const chunkSize = 5 * 1024 * 1024;
    const [data, setData] = useState([])
    const [file, setFile] = useState('')
    const [hashProgress, setHashProgress] = useState()

    const onToken = () => {
        const user = localStorage.getItem('user')
        if (user) {
            const { token } = JSON.parse(user)
            userHome('/home', {}).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    console.log(token)
                }
            })
        }
    }

    // 生成文件切片
    const createFileChunk = (file, size = chunkSize) => {
        const fileChunkList = [];
        let cur = 0;
        while (cur < file.size) {
            fileChunkList.push({ file: file.slice(cur, cur + size), })
            cur += size;
        }
        return fileChunkList;
    }


    // 上传切片

    return (
        <>
            <div className="home">
                欢迎来到主页
                <Button onClick={onToken}>按钮调试</Button>
                <Dragger {...props}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">单击或将文件拖动到此区域以上载</p>
                    <p className="ant-upload-hint">
                        支持单个或批量上传。严禁上传公司数据或其他
                        标注栏文件
                    </p>
                </Dragger>
            </div>
        </>
    )
}

export default Home;


