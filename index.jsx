import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, interpolate, registerRoot, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import scenes from './piloto.json';

function Scene({scene, teaser}) {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const vertical = height > width;
  const progress = frame / scene.frames;
  const cue = scene.cues?.findLast((entry) => entry.at <= frame);
  const radar = ['DOS RADARES', 'SIN ESPACIO', 'ORDEN DE PRIORIDAD'].includes(scene.title);
  return <AbsoluteFill style={{backgroundColor:'#0b101c',color:'#f5f0df',fontFamily:'Arial',overflow:'hidden'}}>
    <div style={{position:'absolute',width:width*1.28,height:width*1.28,left:-width*.14,top:height*(.40-progress*.045),borderRadius:'50%',background:'radial-gradient(circle at 38% 20%, #94919a, #383b4a 42%, #141827 66%)',boxShadow:'0 -4px 55px #72788b55'}}/>
    <div style={{position:'absolute',top:vertical?'43%':'32%',left:vertical?'40%':'53%',width:'49%',height:'32%',opacity:.73}}>
      <svg viewBox="0 0 500 290" width="100%" height="100%" aria-hidden="true">
        {radar ? <g transform="translate(250 148)" fill="none" stroke="#ffc779">
          {[48, 88, 128].map((radius) => <circle key={radius} r={radius} opacity=".55"/>)}
          <path d="M-128 0H128M0 -128V128" opacity=".35"/>
          <path d="M0 0H125" transform={`rotate(${progress*320-60})`} strokeWidth="4"/>
          <circle cx="56" cy="-39" r="7" fill="#ffc779"/>
        </g> : <g fill="none" stroke="#ffc779">
          <path d="M32 32 Q183 154 461 246" strokeDasharray="7 12" strokeWidth="4"/>
          <path d="M26 259 Q209 206 479 261" opacity=".6" strokeWidth="3"/>
          <circle cx={32+429*progress} cy={32+214*progress} r="8" fill="#ffc779"/>
        </g>}
      </svg>
    </div>
    <div style={{position:'absolute',left:'8%',top:'9%',fontFamily:'monospace',fontSize:vertical?31:33,letterSpacing:5,color:'#ffc779'}}>FUERADEGUION / APOLO 11</div>
    <div style={{position:'absolute',left:'8%',right:'8%',top:vertical?'29%':'23%',fontWeight:800,fontSize:vertical?86:104,lineHeight:.96,opacity:interpolate(frame,[0,9],[0,1],{extrapolateRight:'clamp'})}}>{scene.title}</div>
    <div style={{position:'absolute',left:'8%',right:'8%',bottom:vertical?'25%':'17%',fontSize:vertical?57:57,fontWeight:700,lineHeight:1.16,textShadow:'0 3px 12px #000'}}>
      {teaser ? teaser : cue?.text}
    </div>
    <div style={{position:'absolute',left:'8%',right:'8%',bottom:vertical?'20%':'9%',height:5,background:'#ffffff44'}}><div style={{width:`${progress*100}%`,height:'100%',background:'#ffc779'}}/></div>
    {!teaser && <Audio src={staticFile(scene.src)}/>}
  </AbsoluteFill>;
}

const clips = [0, 14, 17];
const questions = ['¿Qué significaba el código?', '¿Qué les respondió Houston?', '¿Dónde pudo aterrizar el Eagle?'];

function Film({clip}) {
  let start=0;
  const vertical = clip !== undefined;
  const selected = vertical ? [scenes[clips[clip]]] : scenes;
  return <AbsoluteFill>{selected.map((scene)=>{
    const from=start;
    start+=scene.frames;
    return <Sequence key={scene.src} from={from} durationInFrames={scene.frames}><Scene scene={scene}/></Sequence>;
  })}{vertical && <Sequence from={start} durationInFrames={90}><Scene scene={{title:'ALARMA 1202',line:'',frames:90}} teaser={questions[clip]}/></Sequence>}</AbsoluteFill>;
}

const length = items => items.reduce((frames,scene)=>frames+scene.frames,0);
registerRoot(()=> <>
  <Composition id="Apolo11" component={Film} durationInFrames={length(scenes)} fps={30} width={1920} height={1080}/>
  {clips.map((sceneIndex, clip) => <Composition key={clip} id={`Apolo11Clip${clip + 1}`} component={Film} defaultProps={{clip}} durationInFrames={scenes[sceneIndex].frames + 90} fps={30} width={1080} height={1920}/>)}
</>);
