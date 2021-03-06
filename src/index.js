import React, { useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { search, searchNext, getSrtData } from './utils/subtitle';
import { HashRouter, Route } from 'react-router-dom';
import Video from './components/video';
import { parseSync } from 'subtitle';
import './index.css';

const PlayVideo = () => {
    const [url, setUrl] = useState('');
    const [subs, setSubs] = useState();
    const [stIndex, setStIndex] = useState(0);
    const player = useRef();
    const handleChange = (e) => {
        const files = e.target.files;
        if (files[0]) {
            setUrl(URL.createObjectURL(files[0]));
        }
    }

    const handleSrtChange = (e) => {
        const files = e.target.files;
        if (files[0]) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(files[0]);
            reader.onload = e => {
                const subs = parseSync(new TextDecoder().decode(reader.result) || []);
                if (player.current) {
                    setStIndex(search(subs, player.current.currentTime()));
                }
                setSubs(subs);
            }
        }
    }
    
    const handleNext = (e) => {
        let next = stIndex + 1;
        if (subs && player.current && next < subs.length) {
            player.current.currentTime(getSrtData(subs[next]).start / 1000 - 0.05);
        }
    }

    const handlePrev = (e) => {
        let next = stIndex - 1;
        if (subs && player.current && next > 0) {
            player.current.currentTime(getSrtData(subs[next]).start / 1000 - 0.05);
        }
    }

    useEffect(() => {
        if (player.current && subs) {
            let stIndex = search(subs, player.current.currentTime());
            setStIndex(stIndex);
            player.current.off('timeupdate');
            player.current.on('timeupdate', () => {
                const next = searchNext(subs, player.current.currentTime(), stIndex);
                if (next !== stIndex) {
                    setStIndex((stIndex = next));
                }
            });
        }
    }, [player.current, subs]);
    return (
        <div>
            <div>
                <label>
                    ??????
                    <input type='file' accept={'.mkv, video/*, audio/*'} multiple={false} onChange={handleChange} />
                </label>
                <label>
                    ??????
                    <input type='file' accept={'.srt, .txt'}  multiple={false} onChange={handleSrtChange} />
                </label>
                <label style={{marginRight: '10px'}}>
                    <button onClick={handleNext}>?????????</button>
                </label>
                <label>
                    <button onClick={handlePrev}>?????????</button>
                </label>
            </div>
            { url ? <Video ref={player} url={url}></Video> : null }
            { (subs && subs.length) ? <div>
                <p>{ subs[stIndex - 1] && subs[stIndex - 1].data.text }</p>
                <p>{ subs[stIndex].data.text }</p>
                <p>{ subs[stIndex + 1] && subs[stIndex + 1].data.text }</p>
                <p>{ subs[stIndex + 2] && subs[stIndex + 2].data.text }</p>
                <p>{ subs[stIndex + 3] && subs[stIndex + 3].data.text }</p>
              </div> : null}
        </div>
    )
}

const App = () => {
    return  (
        <HashRouter>
            <Route component={PlayVideo} path="/" exact />
        </HashRouter>
    );
};

render((
    <App />    
), document.querySelector('#root'));