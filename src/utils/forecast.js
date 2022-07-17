const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='https://samples.openweathermap.org/data/2.5/forecast?appid=b1b15e88fa797225412429c1c50c122a1&lat=-450&lon=54'
request({url,json:true},(error,{body})=>{
if(error){
callback('can not provide the requested service',undefined)
}else{
callback(undefined,body.list[0].weather[0].description+' It is currently '+ body.list[0].main.temp + ' degrees out.')
      }
})}
module.exports= forecast