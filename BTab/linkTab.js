const mlink=(name,icon,host)=>{return  JSON.stringify({
  "name": name,
  "author": "Sife",
  "version": "1.0.0",
  "size": {
    "w1h1": "<body style=\"margin:0;width:60px;height:60px;background-color:white;overflow:hidden\" onclick=\"window.open(\'"+host+"\')\"><img src=\'"+icon+"\' style=\"width:50px;height:50px;margin:5px 5px\"></body>",
    "w1h2": "<body style=\"margin:0;width:60px;height:150px;background-color:white;overflow:hidden\" onclick=\"window.open(\'"+host+"\')\"><img src=\'"+icon+"\' style=\"width:60px;height:60px;margin:45px 0\"></body>",
    "w2h1": "<body style=\"margin:0;width:150px;height:60px;background-color:white;overflow:hidden\" onclick=\"window.open(\'"+host+"\')\"><img src=\'"+icon+"\' style=\"width:60px;height:60px;margin:0 45px\"></body>",
    "w2h2": "<body style=\"margin:0;width:150px;height:150px;background-color:white;overflow:hidden\" onclick=\"window.open(\'"+host+"\')\"><img src=\'"+icon+"\' style=\"width:60px;height:60px;margin:45px 45px\"></body>"}})};export{mlink}