interface user_register_Info {
    username: string;
    password: string;
    gender: string;
    email: string;
    residence: Array<string>
    prefix: string;
    phone: string;
    intro: string;
    agreement: boolean;
}

interface user_login_Info {
    username: string;
    password: string;
}

interface routers {
    id: string;
    text: string;
    path: string;
    icon?: any;
    element?: any;
    children?: Array<routers>;
}


interface ICheckParams {
    fileName: string;
    hash: string;
}
interface ICheckRes {
    fileExist: boolean;
    uploadedChunks: string[];
}
interface IChunk {
    // 切片对象
    chunk: Blob;
    // hash值，用来标识文件的唯一性
    hash: string;
    // 文件名
    fileName: string;
    // 请求进度
    progress: number;
    // 下标，标记哪些分片包已上传完成
    index: number;
    // abort上传请求
    cancel: () => void;
}

declare module 'spark-md5';

