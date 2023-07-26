import io from "socket.io-client"

export default function VideoClient(url) {
    this._url = url
    this._src = null
    this.socket = io.connect(url)
    this._videoInfo = {
		currentTime: 0,
		duration: 0,
	};



    this.socket.emit("admin-connected")
    console.log("admin is connected")
}

VideoClient.prototype = {
    play : function () {
        this.socket.emit("play")
    },
    pause : function() {
        this.socket.emit("pause")
    },
    setSrc : function(src) {
        this._src = src;
        this.socket.emit("src", src)
    },
    getSrc : function(src) {
        return this._src;
    },
    updateTime : function(setVideoInfo) {
        this.socket.on('get-info', (videoInfo) =>{
            this._videoInfo = videoInfo;
            setVideoInfo(videoInfo);
        })
    },
    getVideoInfo : function() {
        return this._videoInfo;
    }
}