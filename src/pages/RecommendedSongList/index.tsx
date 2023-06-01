import React, { useState, useEffect } from 'react'
import './songlist.scss'
import { everyDay_song } from '../../utils/api';

function recommendedSongList() {

    const [data, setData] = useState(false);
    // 获取歌曲
    const getEveryDay_song = () => {
        everyDay_song('/personalized/newsong', { limit: 16 }, 'STREAM').then((res) => {
            setData(res.data.result)
           // console.log(res.data.result)
        })
    }

    useEffect(() => {
        getEveryDay_song()
        data && console.log(data)
    }, [])
    return (
        <div className="song_list">
            {
                data && data.map(item => {
                    return (
                        <div className="song-cold" key={item.id}>
                            <img src={item.picUrl}></img>
                            <div className="song-text">
                                <h1>{item.name}</h1>
                                <p>{item.song.alias[0]}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default recommendedSongList