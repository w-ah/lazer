"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lazer=void 0;var Color;(function(i){i.reset="[0m",i.red="[31m",i.green="[32m",i.yellow="[33m",i.blue="[34m",i.magenta="[35m",i.cyan="[36m"})(Color||(Color={}));class Printer{constructor(){if(this.printNext=!0,this.blockEntered=!1,this.bufferString="",this.bufferMode=!1,this.colorMode=!0,this.echoInternal=t=>{try{return Deno.stdout.writeSync(new TextEncoder().encode(t))}catch(e){return process.stdout.write(t)}},this.echo=t=>{this.bufferMode?t&&t.length>0&&(this.bufferString+=String(t)):this.echoInternal(t)},this.if=t=>(this.blockEntered=t,this.printNext=t,this),this.elseif=t=>this.blockEntered?(this.printNext=!1,this):this.if(t),this.else=()=>this.elseif(!0),this.end=()=>(this.printNext=!0,this.blockEntered=!1,this),this.buffer=()=>(this.bufferMode=!0,this),this.return=()=>(this.reset(),this.bufferString),this.store=t=>(this.bufferMode&&Printer.AliasedBufferMap.set(t,this.bufferString),this),this.load=t=>{if(this.bufferMode){const e=Printer.AliasedBufferMap.get(t);e&&(this.bufferString=e)}return this},this.color_on=()=>(this.colorMode=!0,this),this.color_off=()=>(this.colorMode=!1,this),this.print=(...t)=>{if(!this.printNext)return this;const e=t.reduce((s,r,h)=>{const n=typeof r=="object"?JSON.stringify(r,null,4):r;return h>0?`${s} ${n}`:`${s}${n}`},"");return this.echo(e),this},this.print_b=()=>(this.bufferMode=!1,this.print(this.bufferString),this.reset(),this.bufferMode=!0,this),this.print_color=(t,...e)=>this.printNext?(this.colorMode&&this.echo(t),this.print(...e),this.colorMode&&this.echo(Color.reset),this):this,this.print_ln=(...t)=>this.print(...t,`
`),this.print_color_ln=(t,...e)=>this.printNext?(this.print_color(t,...e),this.print_ln()):this,this.print_red=(...t)=>this.print_color(Color.red,...t),this.print_red_ln=(...t)=>this.print_color_ln(Color.red,...t),this.print_green=(...t)=>this.print_color(Color.green,...t),this.print_green_ln=(...t)=>this.print_color_ln(Color.green,...t),this.print_yellow=(...t)=>this.print_color(Color.yellow,...t),this.print_yellow_ln=(...t)=>this.print_color_ln(Color.yellow,...t),this.print_blue=(...t)=>this.print_color(Color.blue,...t),this.print_blue_ln=(...t)=>this.print_color_ln(Color.blue,...t),this.print_magenta=(...t)=>this.print_color(Color.magenta,...t),this.print_magenta_ln=(...t)=>this.print_color_ln(Color.magenta,...t),this.print_cyan=(...t)=>this.print_color(Color.cyan,...t),this.print_cyan_ln=(...t)=>this.print_color_ln(Color.cyan,...t),this.print_space=(t=1)=>this.print(new Array(t+1).join(" ")),this.print_utc_time=()=>this.print(new Date().toUTCString()),this.print_pad_right=(t,e,s=" ")=>{const r=e-String(t).length;return r>0?this.print(t+new Array(r+1).join(s)):r<0?this.print(String(t).slice(0,e-String(r).length)+`+${-r}`):this.print(t)},this.print_pad_left=(t,e,s=" ")=>{const r=e-String(t).length;return r>0?this.print(new Array(r+1).join(s)+t):this.print(t)},this.set_color=t=>this.printNext?(this.colorMode&&this.echo(t),this):this,this.reset=()=>this.set_color(Color.reset),this.set_color_red=()=>this.set_color(Color.red),this.set_color_green=()=>this.set_color(Color.green),this.set_color_yellow=()=>this.set_color(Color.yellow),this.set_color_blue=()=>this.set_color(Color.blue),this.set_color_magenta=()=>this.set_color(Color.magenta),this.set_color_cyan=()=>this.set_color(Color.cyan),!this.echo)throw new Error("Deno or Node.js needs to be installed to use Printer.")}}Printer.AliasedBufferMap=new Map;const lazer=(...i)=>new Printer().reset().print(...i);exports.lazer=lazer;
