const request=require('request')
const geocode=(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=2cfda8308bdae7a23c589b74b956179e&query='+encodeURIComponent(address)
    request({url,json:true},(error,{body})=>{
        if(error){
        callback('can not retrive the location',undefined)
        }else if(body.error){
           callback('incorrect api request',undefined)
        }else{
        callback(undefined,{
            latitude:body.data[0].latitude,
            longitude:body.data[0].longitude,
             location:body.data[0].name
        })
        }
    
    })}
    
    module.exports= geocode