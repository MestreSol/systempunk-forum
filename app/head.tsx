export default function Head() {
  // This inline script runs very early (in <head>) to ensure the React DevTools
  // global hook exists and that any renderer entries have a valid version string.
  // It mirrors the runtime guard but executes before extensions initialize.
  const script = `(function(){try{var w=window; if(!w.__REACT_DEVTOOLS_GLOBAL_HOOK__){w.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:new Map(),rendererInterfaces:new Map(),supportsFiber:true,inject:function(){},on:function(){},off:function(){},emit:function(){}};} else { if(!w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers) w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers = new Map(); if(!w.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces) w.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces = new Map(); } var r = w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers; if(r && typeof r.forEach === 'function'){ r.forEach(function(val){ try{ if(!val || !val.version) val.version = '0.0.0'; }catch(e){} }); } try{ var wrapMapSet=function(map){ if(!map) return; var orig=map.set; if(orig && orig._wrapped) return; var wrapped=function(k,v){ try{ if(v && typeof v==='object' && (!v.version || v.version==='')) v.version='0.0.0'; }catch(e){} return orig.call(this,k,v); }; wrapped._wrapped=true; map.set=wrapped; }; wrapMapSet(w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers); wrapMapSet(w.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces); }catch(e){} })();`

  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  )
}
