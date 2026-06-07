/* Capa de simulación TreFoods — datos ficticios, login que entra. Nada se envía a un servidor. */
(function(){
  var exportadores=[{id:1,nombre:"Exportadora del Bajío"},{id:2,nombre:"Frutas Selectas SA"},{id:3,nombre:"AgroTre Internacional"},{id:4,nombre:"Comercializadora Méndez"},{id:5,nombre:"Green Valley Foods"}];
  var productos=[{id:1,nombre:"Aguacate Hass"},{id:2,nombre:"Limón Persa"},{id:3,nombre:"Mango Ataulfo"},{id:4,nombre:"Fresa"},{id:5,nombre:"Brócoli"},{id:6,nombre:"Tomate Saladette"}];
  var pedidos=[{id:1,id_exp:1,fecha:"2026-06-01"},{id:2,id_exp:3,fecha:"2026-06-02"},{id:3,id_exp:2,fecha:"2026-06-02"},{id:4,id_exp:5,fecha:"2026-06-03"},{id:5,id_exp:1,fecha:"2026-06-04"},{id:6,id_exp:4,fecha:"2026-06-04"},{id:7,id_exp:3,fecha:"2026-06-05"},{id:8,id_exp:2,fecha:"2026-06-06"}];
  if(window.jQuery){
    jQuery.ajax = function(opts){ opts=opts||{}; var url=(opts.url||"")+"";
      setTimeout(function(){ try{
        if(/Admin\/login/i.test(url)) opts.success && opts.success({Status:"True",status:"true"},"success",{});
        else if(/Admin\/readData/i.test(url)) opts.success && opts.success({status:"success",pedidos:pedidos,exportador:exportadores,productos:productos},"success",{});
        else opts.success && opts.success({status:"success"},"success",{});
      }catch(e){console.log("mock",e);} },120);
      return {done:function(){return this;},fail:function(){return this;},always:function(){return this;}};
    };
  }
  function hint(){ var loginEl=document.getElementById('usuario'); if(loginEl){ var f=loginEl.closest('form')||loginEl.parentNode;
      var h=document.createElement('div'); h.textContent="Demo: ingresa cualquier usuario y contraseña para entrar.";
      h.style.cssText="margin:10px auto;max-width:340px;font-size:13px;color:#333;background:#fff3cd;border:1px solid #ffe69c;padding:7px 12px;border-radius:8px;text-align:center;"; f.insertBefore(h,f.firstChild); } }
  if(document.readyState!=='loading') hint(); else document.addEventListener('DOMContentLoaded', hint);
})();
