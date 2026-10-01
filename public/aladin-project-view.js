(function(){
const originalProjectView=window.projectView;
function projectView(p){
  if(p.id!=="aladin-residence") return originalProjectView(p);

  const media=[
    "/ASSETS/ALADIN/photos/photo-1600585154340-be6161a56a0c-7295de861872.jpg",
    "/ASSETS/ALADIN/photos/photo-1500382017468-9049fed747ef-002b586210cb.jpg",
    "/ASSETS/ALADIN/photos/photo-1600585154526-990dced4db0d-02223b5ceb7c.jpg",
    "/ASSETS/ALADIN/photos/photo-1560518883-ce09059eeffa-ed0295d3197c.jpg",
    "/ASSETS/ALADIN/photos/photo-1503387762-592deb58ef4e-a53fab6cda3f.jpg",
    "/ASSETS/ALADIN/photos/photo-1600607687920-4e2a09cf159d-bf70bc3cf605.jpg",
    "/ASSETS/ALADIN/photos/photo-1556912167-f556f1f39fdf-9716a32a85d9.jpg",
    "/ASSETS/ALADIN/photos/photo-1503387762-592deb58ef4e-ee9dea25d3ff.jpg",
    "/ASSETS/ALADIN/photos/photo-1600566753190-17f0baa2a6c3-63dc9b79017a.jpg"
  ];

  const img=(src,alt,cls="")=>'<img class="'+cls+'" src="'+src+'" alt="'+alt+'" loading="lazy">';
  const card=(src,index,title,body,extra="")=>
    '<article class="card visual-card aladin-card">'+
      img(src,title+" — ALADIN RESIDENCE","aladin-card-image")+
      '<div class="visual-card-body"><div class="card-index">'+index+'</div><h3>'+title+'</h3>'+body+extra+'</div>'+
    '</article>';
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
      img(media[0],"Таунхаус ALADIN RESIDENCE","project-hero-image")+
      '<div class="project-hero-copy"><div class="eyebrow">'+p.type+' · '+p.status+'</div><h1>'+p.name+'</h1><p class="lead">'+p.slogan+'</p></div>'+
    '</div>'+
    '<div class="project-nav">'+
      ["overview","product","market","model","economics","team","risks","next"].map((x,i)=>
        '<a href="#/project/'+p.id+'/'+x+'">'+["Обзор","Продукт","Рынок","Модель","Экономика","Команда","Риски","Следующий шаг"][i]+'</a>'
      ).join("")+
    '</div>'+

    '<section id="overview"><h2>Обзор</h2><p class="section-intro">Зачем проект нужен, что он создаёт и на каком этапе находится.</p><div class="grid">'+
      card(media[1],"01","Суть / проблема",'<p>'+p.problem+'</p>',accordion("Что должен решить проект","Собственный дом и территория рядом с городом; понятная экономика; организованное строительство; управляемый путь от земли до продажи."))+
      card(media[2],"02","Концепция",'<p>'+p.concept+'</p>',accordion("Единая система ALADIN","Архитектура → инженерия → энергоэффективность → благоустройство → экономика → продажи.",true))+
      card(media[3],"03","Статус",'<p class="status">'+p.status+'</p>'+chips(["CONCEPT","PRE-DEVELOPMENT","NOT LAUNCHED"]),accordion("Граница текущей версии","Это концепт, а не заявление о запущенном объекте. Финальные параметры определяются после проверки участка, ТЭО и градостроительных условий."))+
    '</div></section>'+

    '<section id="product"><h2>Продукт и площадка</h2><p class="section-intro">Базовые характеристики продукта и критерии, по которым будет отбираться площадка.</p><div class="grid">'+
      card(media[4],"01","Продукт",'<p>'+p.product+'</p>'+chips(["≈70 м²","2 этажа","2–4 секции","ENERGY-EFFICIENT"]))+
      card(media[5],"02","Локация",'<p>'+p.location+'</p>',accordion("Приоритетные зоны","Криховцы · Вовчинец · Угорники · Тысменица и другие подходящие локации после проверки."))+
      card(media[6],"03","Требования к площадке",'<p>'+p.siteRequirements+'</p>',accordion("Проверка участка","Подъезд · коммуникации · назначение · градостроительный потенциал · ограничения · окружение."))+
    '</div></section>'+

    '<section id="market"><h2>Рынок</h2><div class="media-grid"><article class="media-card media-wide">'+
      img(media[7],"Жилая среда ALADIN RESIDENCE")+
      '<div class="media-copy"><span class="eyebrow">TARGET MARKET</span><h3>Целевая аудитория</h3>'+chips(["Молодые семьи","Специалисты и предприниматели","IT / digital","Собственный дом рядом с городом"])+'<p>Продукт ориентирован на покупателя, которому важны собственное пространство, близость к городу и предсказуемое качество среды.</p>'+
      accordion("Покупательская ценность","Дом + территория + энергоэффективность + управляемая среда жизни.")+'</div>'+
    '</article></div></section>'+

    '<section id="model"><h2>Модель реализации</h2><p class="section-intro">Проект проходит последовательные контрольные этапы, а источники дохода привязаны к продукту.</p><div class="grid">'+
      card(media[8],"01","Этапы реализации",'<ol>'+p.model.map(x=>'<li>'+x+'</li>').join("")+'</ol>',accordion("Gate-подход","Участок → ТЭО → проектирование → строительство → продажи. Переход выполняется после проверки результата предыдущего этапа."))+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">02</div><h3>Источники дохода</h3>'+list(p.revenue)+accordion("Дополнительные опции","Сервисы и опции рассматриваются только при подтверждении их ценности для покупателя и экономики конкретного проекта.")+'</div></article>'+
    '</div></section>'+

    '<section id="economics"><h2>Экономика и инвестиции</h2><p class="section-intro">Финансовая часть разделена на затраты, контрольные показатели и роли участников. Значения не подменяются предположениями.</p><div class="grid">'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">01</div><h3>Расходные контуры</h3>'+list(p.costs)+accordion("Полный контур","Земля → проектирование → разрешения → строительство → коммуникации → благоустройство → маркетинг → продажи → резерв.")+'</div></article>'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">02</div><h3>Контрольные показатели</h3>'+list(p.finance)+'<div class="aladin-metrics">'+metric("Единица","1 townhouse")+metric("Модель","CAPEX → продажа")+metric("Контроль","ROI / payback")+'</div></div></article>'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">03</div><h3>Инвестиционная структура</h3><p>'+p.investment+'</p>'+accordion("Роли сторон","Собственник земли → участок. Инвестор → финансирование. ALADIN / MMW → организация, управление и реализация проекта.")+'</div></article>'+
    '</div>'+economicCalculator(p)+'</section>'+

    '<section id="team"><h2>Команда и компетенции</h2><div class="card aladin-team-card"><div class="visual-card-body"><span class="eyebrow">TEAM &amp; COMPETENCIES</span><h3>Команда проекта</h3>'+chips(["Founder / CEO","PM","Architecture","Engineering","Construction","Finance","Sales","Legal / Accounting"])+list(p.team)+accordion("Как работает команда","Ключевые компетенции объединяются вокруг одного проекта; специализированные функции подключаются по мере прохождения этапов.")+'</div></div></section>'+

    '<section id="risks"><h2>Риски и ограничения</h2><p class="section-intro">Неопределённость фиксируется как вопрос для проверки, а не скрывается за обещанием результата.</p><div class="grid">'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">01</div><h3>Площадка и среда</h3><p>Земельные, транспортные, инженерные и средовые ограничения требуют проверки до следующего этапа.</p>'+accordion("Что проверяем","Границы участка · подъезд · коммуникации · назначение · ограничения · окружение.")+'</div></article>'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">02</div><h3>Инженерия и реализация</h3><p>CAPEX, инженерия, сроки и качество должны подтверждаться исходными данными и контрольными точками.</p>'+accordion("Контроль","Смета · инженерные решения · календарный план · подрядчики · качество · резерв.")+'</div></article>'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">03</div><h3>Ключевые риски</h3>'+list(p.risks)+accordion("Принцип ALADIN","Каждый существенный риск переводится в проверяемый вопрос, исходные данные и контрольную точку.")+'</div></article>'+
    '</div></section>'+

    '<section id="next"><h2>Этап и следующий шаг</h2><div class="grid">'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">01</div><h3>Текущий этап</h3><p>'+p.stage+'</p>'+chips(["CONCEPT","SITE SEARCH","FEASIBILITY"])+'</div></article>'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">02</div><h3>Следующий шаг</h3><p>'+p.next+'</p>'+accordion("Результат шага","Пул кандидатов → первичный скрининг → 1–3 площадки для ТЭО.")+'</div></article>'+
      '<article class="card aladin-card aladin-text-card"><div class="visual-card-body"><div class="card-index">03</div><h3>Действие</h3><p>Выберите конкретный способ продолжить работу с проектом.</p><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a></div></article>'+
    '</div></section>'+
  '</div>';
}
window.projectView=projectView;
if(location.hash.indexOf("#/project/aladin-residence")===0) render();
})();