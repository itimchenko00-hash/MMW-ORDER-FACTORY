(function(){
  const INFO=[
    ["market","market-audience.svg","Рыночная аудитория","Сегменты аудитории и логика соответствия продукта ALADIN RESIDENCE."],
    ["model","core-flow.svg","Контур реализации","Связка продукта, площадки, команды, реализации и результата."],
    ["team","team-ecosystem.svg","Экосистема команды","Роли и взаимодействие участников проекта."],
    ["risks","risk-control.svg","Контроль рисков","Проверка ограничений и контроль переходов между этапами."]
  ];
  function renderAladinInfographics(){
    document.querySelectorAll(".aladin-infographic").forEach(el=>el.remove());
    const hash=location.hash||"";
    if(!hash.startsWith("#/project/aladin-residence")) return;
    INFO.forEach(([section,file,title,text])=>{
      const target=document.getElementById(section);
      if(!target) return;
      const box=document.createElement("figure");
      box.className="media-strip aladin-infographic";
      box.style.marginTop="24px";
      box.innerHTML=
        '<img src="/ASSETS/ALADIN/infographics/'+file+'" alt="'+title+'" loading="lazy" style="display:block;width:100%;height:auto;border-radius:18px;background:#091219">'+
        '<figcaption><strong>'+title+'</strong><span>'+text+'</span></figcaption>';
      target.appendChild(box);
    });
  }
  window.addEventListener("hashchange",()=>setTimeout(renderAladinInfographics,0));
  setTimeout(renderAladinInfographics,0);
})();
