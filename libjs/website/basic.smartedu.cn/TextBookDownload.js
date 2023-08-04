async function download(token,bug=0){
    var url;
    if(bug){
        url=bug;
    }else{
        url=`https://r3-ndr-private.ykt.cbern.com.cn/edu_product/esp/assets/${location.href.match(/contentId=[A-z0-9\-]+/g)[0].slice(10)}.pkg/pdf.pdf`
    }
    var alen;
    if(arguments[2]){
        alen=arguments[2]
    }else{alen=await fetch(url, {
        "method": "GET",
        "headers": {
            "X-ND-AUTH": token,
            "Range":"bytes=0-1"
        },
        "mode": "cors",
        "credentials": "same-origin",
        "redirect": "follow"
    }).then(a=>a.headers.get("Content-Range").match(/\/[0-9]+/g)[0].slice(1));}
    fetch(url, {
        "method": "GET",
        "headers": {
            "X-ND-AUTH": token,
            "Range":"bytes=0-"+alen
        },
        "mode": "cors",
        "credentials": "same-origin",
        "redirect": "follow"
    }).then(async (a)=>{
        if(!bug){
            var blob;
            var reader = a.body.getReader()
            let receivedLength = 0
            let chunks = []
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break
                }
                chunks.push(value);
                receivedLength += value.length;
                console.log(`Reveived ${receivedLength} of ${alen}`);
            }
            blob=new Blob(chunks);
        }else{
            blob= await a.blob()
        }
        var ab = document.createElement("a");
        ab.style.display = 'none';
        document.body.append(ab);
        const url = window.URL.createObjectURL(blob);
        ab.href = url;
        ab.download = document.title.replace(" ","-")+".pdf";
        ab.click();
        document.body.removeChild(ab);
        window.URL.revokeObjectURL(url);
    })
}