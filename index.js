
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const month =[];
let monthData = [];
const monthsData = [];

axios.get("https://ncc.gov.ng/accessible/statistics-reports/subscriber-data#monthly-subscriber-technology-data")
.then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const firstRow = $(".subscriberdata_label>tbody tr:first-child").first();
   // const firstElement = firstRow.first()
    const tds = firstRow.find("th").toArray();
   monthData[0] = $(tds).map((i,elem) => {
        if (i >= 0) {
            return $(elem).text();
          }
    }).toArray();
   /* $(tds).each((i,elem) => {
        if (i >= 0) {
            month[i] = $(elem).text();
          }
    })*/
    //console.log(month.join(","));

    const secondRow = $("table.subscriberdata_label:first-child").first().children();
    const trs = $(secondRow).find("tr:gt(0)");
    //console.log(trs);
   
    $(trs).each((i,elem) => {
        const ttds = $(elem).find("td").toArray();
       // console.log(ttds)
      monthData[i+1] =$(ttds).map(
            (j,innerElem) => {
             if (j >= 0) {
             // monthsData[j-1] = 
             
             return '"'+$(innerElem).text()+'"';
          //    return monthsData;
            }
           }
          
        ).toArray();
        
    })
    //console.log(monthData);
    if (monthData.length > 0){
        for (let eachrec of monthData){
            fs.appendFile("mobiledata.csv",eachrec.toString()+"\n","utf8",(err)=>{
                if (err){
                    console.log(err);
                }
            })
        }
        
     
        
    }
    
    
    /*const trs = $(secondRow).find("tr");
    console.log($(trs));
    $(trs).each((i,tds) =>{
       const thetds = $(tds).find("td").toArray();
       
       $(thetds).each((i,elem) => {
        if(i >=1){
            monthData[i-1]=$(elem).text();
        }
       })
    })
    */
   /* for (td of tds){
        console.log($(td).text())
        
    }
    */
   /* $(".subscriberdata_label tr:not(subs-table-gsm):first-child th").each((i,elem)=>{
        if (i >= 2) {
          month[i-2] = $(elem).text();
        }
    });
   
    console.log(month.join(" "));
    */
    
})
.catch((error) =>{
    console.log(error)
})
