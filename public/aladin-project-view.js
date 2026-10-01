(function(){
const originalProjectView=window.projectView;
function projectView(p){
  if(p.id!=="aladin-residence") return originalProjectView(p);

  const media={
    hero:"/ASSETS/ALADIN/photos/photo-1600585154340-be6161a56a0c-7295de861872.jpg",
    context:"/ASSETS/ALADIN/photos/photo-1500382017468-9049fed747ef-002b586210cb.jpg",
    product:"/ASSETS/ALADIN/photos/photo-1600585154526-990dced4db0d-02223b5ceb7c.jpg",
    site:"/ASSETS/ALADIN/photos/photo-1560518883-ce09059eeffa-ed0295d3197c.jpg",
    architecture:"/ASSETS/ALADIN/photos/photo-1503387762-592deb58ef4e-a53fab6cda3f.jpg",
    interior:"/ASSETS/ALADIN/photos/photo-1600607687920-4e2a09cf159d-bf70bc3cf605.jpg",
    lifestyle:"/ASSETS/ALADIN/photos/photo-1556912167-f556f1f39fdf-9716a32a85d9.jpg",
    result:"/ASSETS/ALADIN/photos/photo-1600566753190-17f0baa2a6c3-63dc9b79017a.jpg"
  };

  const img=(src,alt,cls="")=>'<img class="'+cls+'" src="'+src+'" alt="'+alt+'" loading="lazy">';
  const visual=(src,alt,kicker,title,copy="")=>
    '<figure class="aladin-section-visual">'+img(src,alt,"aladin-section-visual-image")+
      '<figcaption><span class="eyebrow">'+kicker+'</span><strong>'+title+'</strong>'+(copy?'<p>'+copy+'</p>':"")+'</figcaption></figure>';
  const card=(index,title,body,extra="")=>
    '<article class="card aladin-card"><div class="visual-card-body"><div class="card-index">'+index+'</div><h3>'+title+'</h3>'+body+extra+'</div></article>';
  const accordion=(title,body,open=false)=>
    '<details class="aladin-accordion"'+(open?' open':'')+'><summary>'+title+'</summary><div>'+body+'</div></details>';
  const chips=(items)=>
    '<div class="aladin-chips">'+items.map(x=>'<span>'+x+'</span>').join("")+'</div>';
  const list=(items)=>
    '<ul>'+items.map(x=>'<li>'+x+'</li>').join("")+'</ul>';
  const metric=(label,value)=>
    '<div class="aladin-metric"><span>'+label+'</span><strong>'+value+'</strong></div>';

  return '<div class="wrap page aladin-page">'+
    '<a class="back" href="#/projects">← Все проекты</a>'+
    '<div class="project-hero">'+
      img(media.hero,"Современный таунхаус ALADIN RESIDENCE","project-hero-image")+
      '<div class="project-hero-copy"><div class="eyebrow">'+p.type+' · '+p.status+'</div><h1>'+p.name+'</h1><p class="lead">'+p.slogan+'</p></div>'+
    '</div>'+
    '<div class="project-nav">'+
      ["overview","product","market","model","economics","team","risks","next"].map((x,i)=>
        '<a href="#/project/'+p.id+'/'+x+'">'+["Обзор","Продукт","Рынок","Модель","Экономика","Команда","Риски","Следующий шаг"][i]+'</a>'
      ).join("")+
    '</div>'+

    '<section id="overview"><h2>Обзор</h2>'+
      visual(media.context,"Пригородная среда для малоэтажного жилья","CONTEXT","Среда проекта","Собственный дом рядом с городом начинается с правильного сочетания участка, среды и продукта.")+
      '<div class="grid">'+
        card("01","Суть / проблема",'<p>'+p.problem+'</p>')+
        card("02","Концепция",'<p>'+p.concept+'</p>')+
        card("03","Статус",'<p class="status">'+p.status+'. Проект является концептуальным и не заявляется как запущенный объект.</p>'+chips(["CONCEPT","PRE-DEVELOPMENT","NOT LAUNCHED"]))+
      '</div>'+
    '</section>'+

    '<section id="product"><h2>Продукт и площадка</h2>'+
      visual(media.product,"Современная жилая архитектура ALADIN","PRODUCT","Таунхаус как единый продукт","Архитектура, площадь и сценарий жизни рассматриваются вместе с требованиями к участку.")+
      '<div class="grid">'+
        card("01","Продукт",'<p>'+p.product+'</p>'+chips(["≈70 м²","2 этажа","2–4 секции","ENERGY-EFFICIENT"]))+
        card("02","Локация",'<p>'+p.location+'</p>')+
        card("03","Требования к площадке",'<p>'+p.siteRequirements+'</p>')+
      '</div>'+
    '</section>'+

    '<section id="market"><h2>Рынок</h2>'+
      visual(media.lifestyle,"Жилая среда и интерьер семейного дома","TARGET MARKET","Для кого создаётся продукт","Фокус — покупатели, которым нужен собственный дом, личное пространство и близость к городской инфраструктуре.")+
      '<div class="grid">'+
        card("01","Целевая аудитория",chips(p.audience))+
        card("02","Покупательская ценность",'<p>Собственный дом + территория + энергоэффективность + понятная среда жизни.</p>')+
      '</div>'+
    '</section>'+

    '<section id="model"><h2>Модель реализации</h2>'+
      visual(media.architecture,"Архитектурное проектирование жилого объекта","DELIVERY MODEL","От участка до реализации","Каждый следующий этап опирается на результат предыдущего и подтверждённые исходные данные.")+
      '<div class="grid">'+
        card("01","Этапы реализации",'<ol>'+p.model.map(x=>'<li>'+x+'</li>').join("")+'</ol>')+
        card("02","Источники дохода",list(p.revenue),accordion("Дополнительные опции","Сервисы и опции рассматриваются только после подтверждения их ценности для покупателя и экономики конкретного проекта."))+
      '</div>'+
    '</section>'+

    '<section id="economics"><h2>Экономика и инвестиции</h2>'+
      '<div class="grid">'+
        card("01","Расходные контуры",list(p.costs))+
        card("02","Контрольные показатели",list(p.finance)+'<div class="aladin-metrics">'+metric("Единица","1 townhouse")+metric("Модель","CAPEX → продажа")+metric("Контроль","ROI / payback")+'</div>')+
        card("03","Инвестиционная структура",'<p>'+p.investment+'</p>')+
      '</div>'+economicCalculator(p)+
    '</section>'+

    '<section id="team"><h2>Команда и компетенции</h2>'+
      visual(media.interior,"Интерьер современного жилого пространства","COMPETENCIES","Компетенции вокруг одного проекта","Функции подключаются по мере прохождения этапов — от девелопмента и проектирования до строительства, финансов и продаж.")+
      '<div class="card aladin-team-card"><div class="visual-card-body"><span class="eyebrow">TEAM &amp; COMPETENCIES</span><h3>Команда проекта</h3>'+chips(p.team)+accordion("Принцип взаимодействия","Ключевые функции работают вокруг единого проекта, а специализированные ресурсы подключаются на соответствующих этапах.")+'</div></div>'+
    '</section>'+

    '<section id="risks"><h2>Риски и ограничения</h2>'+
      '<div class="grid">'+
        card("01","Площадка и среда",'<p>Земельные, транспортные, инженерные и средовые ограничения требуют проверки до следующего этапа.</p>'+accordion("Что проверяем","Границы участка · подъезд · коммуникации · назначение · ограничения · окружение."))+
        card("02","Инженерия и реализация",'<p>CAPEX, инженерия, сроки и качество должны подтверждаться исходными данными и контрольными точками.</p>'+accordion("Контроль","Смета · инженерные решения · календарный план · подрядчики · качество · резерв."))+
        card("03","Ключевые риски",list(p.risks)+accordion("Принцип ALADIN","Каждый существенный риск переводится в проверяемый вопрос, исходные данные и контрольную точку."))+
      '</div>'+
    '</section>'+

    '<section id="next"><h2>Этап и следующий шаг</h2>'+
      visual(media.result,"Готовый жилой продукт как целевой результат","NEXT STEP","Следующий результат — проверенная площадка","Сейчас задача проекта — перейти от концепции к проверяемой площадке и ТЭО.")+
      '<div class="grid">'+
        card("01","Текущий этап",'<p>'+p.stage+'</p>'+chips(["CONCEPT","SITE SEARCH","FEASIBILITY"]))+
        card("02","Следующий шаг",'<p>'+p.next+'</p>')+
        card("03","Действие",'<p>Выберите способ продолжить работу с проектом.</p><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a>')+
      '</div>'+
    '</section>'+
  '</div>';
}
window.projectView=projectView;
if(location.hash.indexOf("#/project/aladin-residence")===0) render();
})();