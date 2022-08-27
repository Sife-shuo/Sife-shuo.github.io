let btn = document.querySelector(".record-btn")

btn.addEventListener("click", async function () {
let stream = await navigator.mediaDevices.getDisplayMedia({
video: true
})

const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
            ? "video/webm; codecs=vp9"
            : "video/webm"
let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
})

let chunks = []
mediaRecorder.addEventListener('dataavailable', function(e) {
    chunks.push(e.data)
})

mediaRecorder.addEventListener('stop', function(){
    blob = new Blob(chunks, {
        type: chunks[0].type
    })
    url = URL.createObjectURL(blob)
    myv=window.open('','','width=622,height=415');
	myv.document.write(" <video src=\""+url+"\" class=\"video\" width=\"600px\" controls></video><button onclick='dow()'>下载</button><script>function dow(){scsc=document.createElement('script');scsc.text='doi()';window.opener.document.head.appendChild(scsc)}</script>");
	myv.focus();
    console.log(url);
})

    mediaRecorder.start()
});
function doi(){
    a=document.createElement('a');
    a.href=url;
    a.download='video.mp4';
    a.click();
}