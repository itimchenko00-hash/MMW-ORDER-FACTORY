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
      '<div class="aladin-infographic aladin-economics-map" data-infographic="economics"><div class="aladin-infographic-head"><span class="eyebrow">PROJECT ECONOMICS</span><strong>Экономика проекта как управляемая цепочка</strong><span>Нажмите на этап — откроется тематическое фото процесса и детальная информация о том, что формирует экономику.</span></div><div class="aladin-flow"><button type="button" class="aladin-flow-node" data-title="Земля" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1500534314209-a25ddb2bd429-25cfb8c2dad4.jpg" data-process="Площадка и исходные данные" data-copy="До проектирования необходимо подтвердить границы, назначение, подъезд, окружение, коммуникации и градостроительный потенциал." data-result="Проверенная площадка и набор исходных данных."><span>01</span><strong>Земля</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Проектирование" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1454165804606-c3d57bc86b40-5cb4ffe2d354.jpg" data-process="Концепция, архитектура и инженерия" data-copy="Продукт переводится из идеи в проектную модель: планировки, архитектура, инженерные системы, разрешительные предпосылки и предварительные объёмы." data-result="Согласованная проектная конфигурация и база для расчёта CAPEX."><span>02</span><strong>Проектирование</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Строительство" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1504307651254-35680f356dfd-9750b75b1cb4.jpg" data-process="CAPEX, подрядчики, сроки и качество" data-copy="Формируются строительная стоимость, календарный план, состав работ и контроль подрядчиков. Экономика связывается с фактическим выполнением." data-result="Управляемый строительный контур со стоимостью, сроками и качеством."><span>03</span><strong>Строительство</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Коммуникации" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1504384308090-c894fdcc538d-c3b2c2711ef9.jpg" data-process="Подключение инфраструктуры" data-copy="Проверяется техническая возможность и стоимость подключения инженерных сетей. Эти затраты напрямую влияют на CAPEX." data-result="Подтверждённые технические условия и бюджет подключения."><span>04</span><strong>Коммуникации</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Маркетинг" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1556761175-4b46a572b786-5f0869ca04c5.jpg" data-process="Упаковка продукта и привлечение спроса" data-copy="Определяются аудитория, позиционирование, каналы продвижения, стоимость привлечения и материалы для продаж." data-result="Система вывода продукта на рынок с контролируемыми расходами."><span>05</span><strong>Маркетинг</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Продажи" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1552664730-d307ca884978-8acb77ea6fa1.jpg" data-process="Цена, скорость реализации и денежный поток" data-copy="Проверяются цена реализации, сценарий продаж, скорость поглощения и влияние сроков на денежный поток. Здесь модель получает фактическую обратную связь." data-result="Сценарий реализации для проверки выручки, прибыли, ROI и срока окупаемости."><span>06</span><strong>Продажи</strong></button></div><div class="aladin-infographic-detail" aria-live="polite"><span>ВЫБЕРИТЕ ЭТАП</span><strong>Нажмите на любой этап цепочки</strong><div class="aladin-process-media"><span>PROCESS VISUAL</span></div><div class="aladin-process-copy"><p>После выбора этапа здесь появится тематическое фото процесса и подробное описание.</p></div></div></div>'+
      '</div>'+
      '<div class="grid">'+
        card("01","Расходные контуры",list(p.costs))+
        card("02","Контрольные показатели",list(p.finance)+'<div class="aladin-metrics">'+metric("Единица","1 townhouse")+metric("Модель","CAPEX → продажа")+metric("Контроль","ROI / payback")+'</div>')+
        card("03","Инвестиционная структура",'<p>'+p.investment+'</p>')+
      '</div>'+economicCalculator(p)+
    '</section>'+

    '<section id="team"><h2>Команда и компетенции</h2>'+
      visual(media.interior,"Интерьер современного жилого пространства","COMPETENCIES","Компетенции вокруг одного проекта","Функции подключаются по мере прохождения этапов — от девелопмента и проектирования до строительства, финансов и продаж.")+
      '<div class="card aladin-team-card"><div class="visual-card-body"><span class="eyebrow">TEAM &amp; COMPETENCIES</span><h3>Команда проекта</h3><div class="aladin-role-grid">'+p.team.map((x,i)=>'<div class="aladin-role"><span>0'+(i+1)+'</span><strong>'+x+'</strong><small>Функция проекта</small></div>').join("")+'</div>'+accordion("Принцип взаимодействия","Ключевые функции работают вокруг единого проекта, а специализированные ресурсы подключаются на соответствующих этапах.")+'</div></div>'+
    '</section>'+

    '<section id="risks"><h2>Риски и ограничения</h2>'+
      '<div class="aladin-infographic aladin-risk-map" data-infographic="risks">'+
        '<div class="aladin-infographic-head"><span class="eyebrow">RISK CONTROL</span><strong>Риск → проверка → контрольная точка</strong><span>Интерактивная схема помогает посетителю понять, что риск не просто перечисляется, а переводится в действие.</span></div>'+
        '<div class="aladin-risk-grid">'+
          [['Земля','Границы, назначение, ограничения','SITE'],['Коммуникации','Подключение и CAPEX','UTILITIES'],['Строительство','Смета, сроки, качество','CAPEX'],['Рынок','Спрос и цена реализации','MARKET'],['Разрешения','Сроки и исходные документы','LEGAL']].map((x,i)=>'<button type="button" class="aladin-risk-node" data-title="'+x[0]+'" data-copy="'+x[1]+'"><span>0'+(i+1)+'</span><strong>'+x[0]+'</strong><small>'+x[2]+'</small></button>').join("")+
        '</div>'+
        '<div class="aladin-risk-detail" aria-live="polite"><span>CONTROL LOOP</span><strong>Выберите риск</strong><p>После выбора здесь появляется соответствующая контрольная точка.</p></div>'+
      '</div>'+
      '<div class="grid">'+
        card("01","Площадка и среда",'<p>Земельные, транспортные, инженерные и средовые ограничения требуют проверки до следующего этапа.</p>'+accordion("Что проверяем","Границы участка · подъезд · коммуникации · назначение · ограничения · окружение."))+
        card("02","Инженерия и реализация",'<p>CAPEX, инженерия, сроки и качество должны подтверждаться исходными данными и контрольными точками.</p>'+accordion("Контроль","Смета · инженерные решения · календарный план · подрядчики · качество · резерв."))+
        card("03","Ключевые риски",list(p.risks)+accordion("Принцип ALADIN","Каждый существенный риск переводится в проверяемый вопрос, исходные данные и контрольную точку."))+
      '</div>'+
    '</section>'+

    '<section id="next"><h2>Этап и следующий шаг</h2>'+
      visual(media.result,"Готовый жилой продукт как целевой результат","NEXT STEP","Следующий результат — проверенная площадка","Сейчас задача проекта — перейти от концепции к проверяемой площадке и ТЭО.")+
      '<div class="grid aladin-next-grid">'+
        card("01","Текущий этап",'<p>'+p.stage+'</p>'+chips(["CONCEPT","SITE SEARCH","FEASIBILITY"]))+
        card("02","Следующий результат",'<p>'+p.next+'</p>')+
        card("03","Действие",'<p>Выберите способ продолжить работу с проектом.</p><div class="aladin-action"><span class="eyebrow">NEXT ACTION</span><strong>Перейти к предметному обсуждению</strong><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a></div>')+
      '</div>'+
    '</section>'+
  '</div>';
}
window.projectView=projectView;
function bindAladinInfographics(){
  if(window.__aladinInfographicBound) return;
  window.__aladinInfographicBound=true;
  document.addEventListener('click',function(event){
    const btn=event.target.closest('.aladin-economics-map .aladin-flow-node');
    if(btn){
      document.querySelectorAll('.aladin-economics-map .aladin-flow-node').forEach(x=>x.classList.remove('is-active'));
      btn.classList.add('is-active');
      const box=btn.closest('.aladin-economics-map').querySelector('.aladin-infographic-detail');
      box.innerHTML='<span>PROCESS VISUAL · '+btn.dataset.title+'</span><strong>'+btn.dataset.process+'</strong><div class="aladin-process-media"><img src="'+btn.dataset.photo+'" alt="'+btn.dataset.process+'" loading="lazy"></div><div class="aladin-process-copy"><p>'+btn.dataset.copy+'</p><p><strong>Результат этапа:</strong> '+btn.dataset.result+'</p></div>';
      return;
    }
    const risk=event.target.closest('.aladin-risk-map .aladin-risk-node');
    if(risk){
      document.querySelectorAll('.aladin-risk-map .aladin-risk-node').forEach(x=>x.classList.remove('is-active'));
      risk.classList.add('is-active');
      const box=risk.closest('.aladin-risk-map').querySelector('.aladin-risk-detail');
      box.innerHTML='<span>CONTROL POINT</span><strong>'+risk.dataset.title+'</strong><p>'+risk.dataset.copy+' → проверка исходных данных → решение до перехода к следующему этапу.</p>';
    }
  });
}

bindAladinInfographics();
if(location.hash.indexOf("#/project/aladin-residence")===0) render();
})();