import React, { useRef, useEffect, forwardRef } from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

const Video = forwardRef((props, ref) => {
    const vRef = useRef();
    const player = useRef();
    useEffect(() => {
        player.current = videojs(vRef.current, { autoplay: true, controls: true, sources: [{
            src: props.url,
            type: props.type || 'video/mp4'
        }]});
        if (typeof ref === 'function') {
            ref(player.current);
        } else {
            ref.current = player.current;
        }
        return () => {
            player.current.dispose();    
        }
    }, [props.url]);
    return (
        <div>
            <div data-vjs-player>
                <video ref={vRef} className="video-js"></video>
            </div>
        </div>
    )
});

export default Video;