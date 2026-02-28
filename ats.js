
//ats - add to shop - made by Ocelote - Licensable under CC0 - no credit required

//World Code:
ats=(e,t)=>{for(let o=0;o<t.length;o++){let n=t[o],r=[],a=[],m=[];for(let i=0;i<n.length;i++)if("number"==typeof n[i])m.push(n[i]);else if("string"==typeof n[i]){let l=n[i];0===m.length&&(m=[1]);let s=m[0]<0,f=m.map(e=>Math.abs(e)).sort((e,t)=>e-t),g=[];for(let u=0;u<f.length;u+=2)u+1<f.length?g.push([f[u],f[u+1]]):g.push([f[u],f[u]]);s?a.push({item:l,ranges:g}):r.push({item:l,ranges:g}),m=[]}let h=e=>e.map(e=>e[0]===e[1]?e[0]:e[0]+"-"+e[1]).join(" or "),$=r.map(e=>h(e.ranges)+" "+e.item).join(", "),p=a.map(e=>h(e.ranges)+" "+e.item).join(", "),c="";$&&p?c=`Trade ${p} for ${$}`:$?c=`Receive ${$} for free`:p&&(c=`Throw away ${p}`);let d=r.length>0?r[0].item:"",v=a.length>0?a[0].item:"",I="Get";a.length>0?I=r.length>0?[{icon:v},{str:h(a[0].ranges)+" Trade"}]:[{icon:v},{str:h(a[0].ranges)+" Discard"}]:r.length>0&&(I=[{icon:d},{str:" Get"}]),r.length+a.length===0&&(I="Okay",c="Do nothing"),api.createShopItem(e,o+"",{image:d||v||"Unknown",canBuy:!0,amount:1,buyButtonText:I,description:c,onBoughtMessage:[{str:"Loading..."},{str:JSON.stringify({gives:r,takes:a}),style:{fontSize:"0px"}}],sell:!1,sortPriority:0,customTitle:"Trade "+(o+1)})}},onPlayerBoughtShopItem=(e,t,o,n,r)=>{let a;try{a=JSON.parse(n.onBoughtMessage[1].str)}catch(m){return api.sendOverShopInfo(e,"Invalid metadata. Please report to owner.")}let i=e=>{let t=e[Math.floor(Math.random()*e.length)];return Math.floor(Math.random()*(t[1]-t[0]+1))+t[0]},l=e=>Math.max.apply(null,e.flat()),s=a.takes.map(e=>({item:e.item,amount:i(e.ranges),max:l(e.ranges)})).filter(e=>e.max>0),f=a.gives.map(e=>({item:e.item,amount:i(e.ranges)})).filter(e=>e.amount>0);for(let g of s){let u=api.getInventoryItemAmount(e,g.item);if(u<g.max)return api.sendOverShopInfo(e,[{str:"You need "+(g.max-u)+" more"},{icon:g.item},{str:g.item+"."}])}for(let h of s)api.removeItemName(e,h.item,h.amount);let $=[],p=!1;for(let c of f){let d=api.giveItem(e,c.item,c.amount);if(d>0&&$.push({item:c.item,amount:d}),d<c.amount){p=!0;break}}if(p){for(let v of $)api.removeItemName(e,v.item,v.amount);for(let I of s)api.giveItem(e,I.item,I.amount);return api.sendOverShopInfo(e,"Inventory too full!")}api.sendOverShopInfo(e,"Purchase Successful!")};

//Code Block (or also world code):
ats("Shop",[
[1,"Watermelon",-50,"Gold Coin"],
[-1,"Watermelon",50,"Gold Coin"],
[1,3,"Iron Bar"],
[1,10,100,"Coal"],
//in case of differing signs, only the sign of the first number counts (as seen in "Gold Bar"'s amounts):
[1,10,100,1000,10000,100000,"Orange Tulip",-1,-2,"Diamond",-1,2,"Gold Bar"],
["Apple"], //1 is the default number when none are provided
[1,2,3,"Invalid yay"] //will throw an error due to invalid item name to help catch errors early
])

/*
Instructions:
You need to call the ats function once, in world code, so you can set it up.
You can also use this in a Code Block for easier testing.

The first argument is just the category key, which is basically the name of the category
The second argument is an array of "trades"

A "trade" specifies what items are given to the player, and what items are required and taken away.

A positive number indicates that an item will be given to the player, and a negative number indicates it will be taken away.

Two numbers indicate a range. For example, 1, 3, "Iron Bar" means the player will get 1-3 Iron Bars (both inclusive).

Multiple numbers before an item indicate ranges.
For example, 1, 10, 100, 1000, 10000, 100000, "Orange Tulip" means that the player will get 1-10, 100-1000, or 10000-100000 Orange Tulips, with each range having a 1 in 3 chance of being selected.
This means the player can never get, say, 50 Orange Tulips, since that does not fall into one of the ranges.

When an odd number of numbers are provided, the last one will wrap to itself. For example, 1, 10, 100, "Coal" means the player will either get 1-10 Coal, or exactly 100 Coal, both outcomes having a 50/50 probability.
*/
