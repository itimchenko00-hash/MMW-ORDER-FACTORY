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

  const img=(src,alt,cls="")=>'<img class="'+cls+'" src="'+src+'" alt="'+alt+'" loading="lazy" onerror="this.closest(\'figure,article,div\')?.classList.add(\'media-error\');this.style.display=\'none\';">';
  const visual=(src,alt,kicker,title,copy="")=>
    '<figure class="aladin-section-visual">'+img(src,alt,"aladin-section-visual-image")+
      '<figcaption><span class="eyebrow">'+kicker+'</span><strong>'+title+'</strong>'+(copy?'<p>'+copy+'</p>':"")+'</figcaption></figure>';
  const interactiveMeta={
    "Суть / проблема":[FACTORY_MEDIA.landscape,"Проблема продукта","Покупателю нужен собственный дом и территория рядом с городом, а проекту нужна понятная экономика, организация строительства и управляемый путь от земли до продажи.","Проблема переводится в требования к продукту, площадке и экономике."],
    "Концепция":[FACTORY_MEDIA.concept,"Единая продуктовая система","Архитектура, инженерия, энергоэффективность, благоустройство, экономика и продажи рассматриваются как единая система.","Сформирована целостная концепция продукта для дальнейшей проверки."],
    "Статус":[FACTORY_MEDIA.governance,"Статус проекта","ALADIN RESIDENCE находится на концептуальной стадии. Материалы показывают модель проекта, а не действующий объект.","Следующий уровень подтверждения — площадка, ТЭО и исходные данные."],
    "Продукт":[media.site,"Жилой продукт","Базовый пилот — таунхаусы ориентировочно 70 м², 2 этажа, 2–4 секции. Точные параметры определяются после проверки участка и градостроительных условий.","Параметры продукта фиксируются после проверки конкретной площадки."],
    "Локация":[FACTORY_MEDIA.residential,"Поиск подходящей среды","Приоритет — пригород Ивано-Франковска и близлежащие населённые пункты. Локация оценивается по доступности, среде, спросу и возможности реализации.","Получаем пул локаций, пригодных для предметного скрининга."],
    "Требования к площадке":[FACTORY_MEDIA.architecture,"Проверка земельного участка","Участок должен иметь понятный подъезд, допустимое назначение, градостроительный потенциал и реалистичную возможность подключения коммуникаций.","На выходе — проверенный кандидат для ТЭО или обоснованное исключение."],
    "Целевая аудитория":[FACTORY_MEDIA.team,"Профиль покупателя","Продукт ориентирован на молодые семьи, специалистов, предпринимателей и digital-аудиторию, которым нужен собственный дом рядом с городом.","Определён профиль спроса, под который проверяются продукт и цена."],
    "Покупательская ценность":[FACTORY_MEDIA.workspace,"Ценность продукта","Покупатель получает не отдельные квадратные метры, а сценарий жизни: дом, территория, энергоэффективность и близость к городской инфраструктуре.","Ценность переводится в конкретные характеристики продукта и коммуникацию продаж."],
    "Этапы реализации":[FACTORY_MEDIA.planning,"Последовательность реализации","Путь проекта начинается с земли и проверки, затем проходит через концепцию, проектирование, строительство, маркетинг, продажи и передачу.","Каждый этап имеет входные данные, контроль и измеримый результат."],
    "Источники дохода":[FACTORY_MEDIA.partnership,"Монетизация проекта","Основной источник — продажа жилых единиц. Дополнительные сервисы и опции рассматриваются только после подтверждения их ценности и экономической целесообразности.","Сформирована модель выручки, которую можно проверить на конкретном проекте."],
    "Расходные контуры":[FACTORY_MEDIA.finance,"Полная структура затрат","В модель входят земля, проектирование, разрешения, строительство, коммуникации, благоустройство, маркетинг, продажи и резерв. Каждый контур получает собственный бюджет и контроль.","Получаем прозрачный CAPEX/OPEX-контур для расчёта себестоимости."],
    "Контрольные показатели":[FACTORY_MEDIA.financeAlt,"Финансовая модель","Контролируются себестоимость единицы, цена продажи, выручка, прибыль, доход инвестора и MMW, точка безубыточности, ROI и срок окупаемости.","Финансовая модель позволяет принимать решения на основе проверяемых параметров."],
    "Инвестиционная структура":[FACTORY_MEDIA.financeAlt2,"Распределение ролей","Собственник земли может предоставить участок, инвестор — финансировать строительство, а MMW — организовать проект и управление. Конкретная структура определяется после проверки объекта.","Зафиксирована понятная схема ролей, источников капитала и ответственности."],
    "Площадка и среда":[FACTORY_MEDIA.logistics,"Контроль площадки","Земельные, транспортные, инженерные и средовые ограничения требуют проверки до следующего этапа.","Каждое ограничение переводится в проверяемый вопрос до принятия решения."],
    "Инженерия и реализация":[FACTORY_MEDIA.construction,"Контроль реализации","CAPEX, инженерия, сроки и качество должны подтверждаться исходными данными, сметой, календарным планом и контрольными точками.","Получаем управляемый строительный контур."],
    "Ключевые риски":[FACTORY_MEDIA.technology,"Карта ключевых рисков","Земля, коммуникации, строительный CAPEX, спрос, цена реализации и разрешительные сроки должны контролироваться до перехода между этапами.","Риск становится конкретным контрольным действием."],
    "Текущий этап":[FACTORY_MEDIA.management,"Где находится проект сейчас","Проект находится на стадии концепции и подготовки к поиску площадки. Следующая задача — перейти от идеи к проверяемым исходным данным.","Сформирован конкретный переход от концепции к поиску и скринингу земли."],
    "Следующий результат":[FACTORY_MEDIA.planningAlt,"Переход к ТЭО","Нужно сформировать пул земельных кандидатов, провести первичный скрининг и выбрать 1–3 площадки для технико-экономической оценки.","Результат — короткий список площадок, готовых к предметному ТЭО."],
    "Действие":[FACTORY_MEDIA.teamAlt,"Предметное продолжение","Есть три практических сценария: предложить участок, обсудить участие или запросить презентацию. Контакт переводит концепцию в предметный разговор.","Следующий шаг — получить конкретный входящий запрос и определить формат дальнейшей работы."]
  };
  const card=(index,title,body,extra="")=>{
    const m=interactiveMeta[title];
    if(!m) return '<article class="card aladin-card"><div class="visual-card-body"><div class="card-index">'+index+'</div><h3>'+title+'</h3>'+body+extra+'</div></article>';
    return '<article class="card aladin-card aladin-interactive-card" tabindex="0" role="button" data-title="'+title+'" data-photo="'+m[0]+'" data-process="'+m[1]+'" data-copy="'+m[2]+'" data-result="'+m[3]+'"><div class="visual-card-body"><div class="card-index">'+index+'</div><h3>'+title+'</h3>'+body+extra+'<div class="aladin-open-hint"><span>OPEN DETAIL</span><strong>Фото + содержание</strong></div></div></article>';
  };
  const accordion=(title,body,open=false)=>
    '<details class="aladin-accordion"'+(open?' open':'')+'><summary>'+title+'</summary><div>'+body+'</div></details>';
  const chips=(items)=>
    '<div class="aladin-chips">'+items.map(x=>'<span>'+x+'</span>').join("")+'</div>';
  const list=(items)=>
    '<ul>'+items.map(x=>'<li>'+x+'</li>').join("")+'</ul>';
  const metric=(label,value)=>
    '<div class="aladin-metric"><span>'+label+'</span><strong>'+value+'</strong></div>';
  const sectionHead=(index,kicker,title,copy)=>
    '<div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">'+index+'</span><span class="eyebrow">'+kicker+'</span><h2>'+title+'</h2></div><p>'+copy+'</p></div>';

  return '<div class="wrap page aladin-page">'+
    '<a class="back" href="#/projects">← Все проекты</a>'+
    '<div class="project-hero">'+
      img(media.hero,"Современный таунхаус ALADIN RESIDENCE","project-hero-image")+
      '<div class="project-hero-copy"><div class="eyebrow">MMW-COMPANY / PROJECT CONCEPT</div><div class="project-hero-kicker">'+p.type+' <span>·</span> '+p.status+'</div><h1>'+p.name+'</h1><p class="lead">'+p.slogan+'</p><div class="project-hero-meta"><span><b>01</b> Концептуальная стадия</span><span><b>02</b> Преддевелопмент</span><span><b>03</b> Подготовка к поиску площадки</span></div></div>'+
    '</div>'+
    '<div class="aladin-project-rail"><span class="eyebrow">ALADIN RESIDENCE</span><span>MMW-COMPANY PROJECT SYSTEM</span><span class="rail-status">'+p.status.toUpperCase()+'</span></div>'+'<div class="project-nav">'+
      ["overview","product","market","model","economics","team","risks","next"].map((x,i)=>
        '<a href="#/project/'+p.id+'/'+x+'">'+["Обзор","Продукт","Рынок","Модель","Экономика","Команда","Риски","Следующий шаг"][i]+'</a>'
      ).join("")+
    '</div>'+

    '<section id="overview"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">01</span><span class="eyebrow">PROJECT FRAME</span><h2>Обзор</h2></div><p>Проблема, концепция и статус — единая точка входа в проект.</p></div>'+
      visual(media.context,"Пригородная среда для малоэтажного жилья","CONTEXT","Среда проекта","Собственный дом рядом с городом начинается с правильного сочетания участка, среды и продукта.")+
      '<div class="grid">'+
        card("01","Суть / проблема",'<p>'+p.problem+'</p>')+
        card("02","Концепция",'<p>'+p.concept+'</p>')+
        card("03","Статус",'<p class="status">'+p.status+'. Проект является концептуальным и не заявляется как запущенный объект.</p>'+chips(["CONCEPT","PRE-DEVELOPMENT","NOT LAUNCHED"]))+
      '</div>'+
    '</section>'+

    '<section id="product"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">02</span><span class="eyebrow">PRODUCT / SITE</span><h2>Продукт и площадка</h2></div><p>Продуктовая конфигурация неразрывно связана с требованиями к земельному участку.</p></div>'+
      visual(media.product,"Современная жилая архитектура ALADIN","PRODUCT","Таунхаус как единый продукт","Архитектура, площадь и сценарий жизни рассматриваются вместе с требованиями к участку.")+
      '<div class="grid">'+
        card("01","Продукт",'<p>'+p.product+'</p>'+chips(["≈70 м²","2 этажа","2–4 секции","ENERGY-EFFICIENT"]))+
        card("02","Локация",'<p>'+p.location+'</p>')+
        card("03","Требования к площадке",'<p>'+p.siteRequirements+'</p>')+
      '</div>'+
    '</section>'+

    '<section id="market"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">03</span><span class="eyebrow">MARKET</span><h2>Рынок</h2></div><p>Целевая аудитория и покупательская ценность формируют основу позиционирования и продаж.</p></div>'+
      visual(media.lifestyle,"Жилая среда и интерьер семейного дома","TARGET MARKET","Для кого создаётся продукт","Фокус — покупатели, которым нужен собственный дом, личное пространство и близость к городской инфраструктуре.")+
      '<div class="grid">'+
        card("01","Целевая аудитория",chips(p.audience))+
        card("02","Покупательская ценность",'<p>Собственный дом + территория + энергоэффективность + понятная среда жизни.</p>')+
      '</div>'+
    '</section>'+

    '<section id="model"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">04</span><span class="eyebrow">DELIVERY MODEL</span><h2>Модель реализации</h2></div><p>Проект проходит последовательную цепочку от площадки и ТЭО до строительства и реализации.</p></div>'+
      visual(media.architecture,"Архитектурное проектирование жилого объекта","DELIVERY MODEL","От участка до реализации","Каждый следующий этап опирается на результат предыдущего и подтверждённые исходные данные.")+
      '<div class="grid">'+
        card("01","Этапы реализации",'<ol>'+p.model.map(x=>'<li>'+x+'</li>').join("")+'</ol>')+
        card("02","Источники дохода",list(p.revenue),accordion("Дополнительные опции","Сервисы и опции рассматриваются только после подтверждения их ценности для покупателя и экономики конкретного проекта."))+
      '</div>'+
    '</section>'+

    '<section id="economics"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">05</span><span class="eyebrow">ECONOMICS</span><h2>Экономика и инвестиции</h2></div><p>Финансовая модель связывает затраты, выручку, капитал, контрольные показатели и результат.</p></div>'+
      '<div class="aladin-infographic aladin-economics-map" data-infographic="economics"><div class="aladin-infographic-head"><span class="eyebrow">PROJECT ECONOMICS</span><strong>Экономика проекта как управляемая цепочка</strong><span>Нажмите на этап — откроется тематическое фото процесса и детальная информация о том, что формирует экономику.</span></div><div class="aladin-flow"><button type="button" class="aladin-flow-node" data-title="Земля" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1500534314209-a25ddb2bd429-25cfb8c2dad4.jpg" data-process="Площадка и исходные данные" data-copy="До проектирования необходимо подтвердить границы, назначение, подъезд, окружение, коммуникации и градостроительный потенциал." data-result="Проверенная площадка и набор исходных данных."><span>01</span><strong>Земля</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Проектирование" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1454165804606-c3d57bc86b40-5cb4ffe2d354.jpg" data-process="Концепция, архитектура и инженерия" data-copy="Продукт переводится из идеи в проектную модель: планировки, архитектура, инженерные системы, разрешительные предпосылки и предварительные объёмы." data-result="Согласованная проектная конфигурация и база для расчёта CAPEX."><span>02</span><strong>Проектирование</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Строительство" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1504307651254-35680f356dfd-9750b75b1cb4.jpg" data-process="CAPEX, подрядчики, сроки и качество" data-copy="Формируются строительная стоимость, календарный план, состав работ и контроль подрядчиков. Экономика связывается с фактическим выполнением." data-result="Управляемый строительный контур со стоимостью, сроками и качеством."><span>03</span><strong>Строительство</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Коммуникации" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1504384308090-c894fdcc538d-c3b2c2711ef9.jpg" data-process="Подключение инфраструктуры" data-copy="Проверяется техническая возможность и стоимость подключения инженерных сетей. Эти затраты напрямую влияют на CAPEX." data-result="Подтверждённые технические условия и бюджет подключения."><span>04</span><strong>Коммуникации</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Маркетинг" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1556761175-4b46a572b786-5f0869ca04c5.jpg" data-process="Упаковка продукта и привлечение спроса" data-copy="Определяются аудитория, позиционирование, каналы продвижения, стоимость привлечения и материалы для продаж." data-result="Система вывода продукта на рынок с контролируемыми расходами."><span>05</span><strong>Маркетинг</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Продажи" data-photo="/ASSETS/MMW-COMPANY/photos/photo-1552664730-d307ca884978-8acb77ea6fa1.jpg" data-process="Цена, скорость реализации и денежный поток" data-copy="Проверяются цена реализации, сценарий продаж, скорость поглощения и влияние сроков на денежный поток. Здесь модель получает фактическую обратную связь." data-result="Сценарий реализации для проверки выручки, прибыли, ROI и срока окупаемости."><span>06</span><strong>Продажи</strong></button></div><div class="aladin-infographic-detail" aria-live="polite"><span>ВЫБЕРИТЕ ЭТАП</span><strong>Нажмите на любой этап цепочки</strong><div class="aladin-process-media"><span>PROCESS VISUAL</span></div><div class="aladin-process-copy"><p>После выбора этапа здесь появится тематическое фото процесса и подробное описание.</p></div></div></div>'+
      '</div>'+
      '<div class="grid">'+
        card("01","Расходные контуры",list(p.costs))+
        card("02","Контрольные показатели",list(p.finance)+'<div class="aladin-metrics">'+metric("Единица","1 townhouse")+metric("Модель","CAPEX → продажа")+metric("Контроль","ROI / payback")+'</div>')+
        card("03","Инвестиционная структура",'<p>'+p.investment+'</p>')+
      '</div>'+economicCalculator(p)+
    '</section>'+

    '<section id="team"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">06</span><span class="eyebrow">TEAM</span><h2>Команда и компетенции</h2></div><p>Разные функции собираются вокруг одного проекта и единого контура ответственности.</p></div>'+
      visual(media.interior,"Интерьер современного жилого пространства","COMPETENCIES","Компетенции вокруг одного проекта","Функции подключаются по мере прохождения этапов — от девелопмента и проектирования до строительства, финансов и продаж.")+
      '<div class="card aladin-team-card"><div class="visual-card-body"><span class="eyebrow">TEAM &amp; COMPETENCIES</span><h3>Команда проекта</h3><div class="aladin-role-grid">'+p.team.map((x,i)=>'<div class="aladin-role"><span>0'+(i+1)+'</span><strong>'+x+'</strong><small>Функция проекта</small></div>').join("")+'</div>'+accordion("Принцип взаимодействия","Ключевые функции работают вокруг единого проекта, а специализированные ресурсы подключаются на соответствующих этапах.")+'</div></div>'+
    '</section>'+

    '<section id="risks"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">07</span><span class="eyebrow">RISK CONTROL</span><h2>Риски и ограничения</h2></div><p>Каждое существенное ограничение переводится в проверку и контрольную точку до перехода проекта на следующий этап.</p></div>visual(media.context,"Контроль площадки и среды проекта","RISK CONTROL","Проверка до принятия решения","Риски не просто перечисляются: для каждого определяется предмет проверки, исходные данные и контрольная точка.")<div class="grid">card("01","Площадка и среда",'<p>'+p.risks[0]+'</p>'+chips(["SITE","ACCESS","PLANNING"])+accordion("Что проверяем","Границы участка · подъезд · коммуникации · назначение · градостроительные ограничения · окружение."))+card("02","Инженерия и реализация",'<p>'+p.risks[1]+'</p>'+chips(["CAPEX","UTILITIES","QUALITY"])+accordion("Контроль","Смета · инженерные решения · календарный план · подрядчики · качество · резерв."))+card("03","Ключевые риски",'<p>'+p.risks.slice(2).join(" · ")+'</p>'+chips(["LAND","COST","DEMAND","PERMITS"])+accordion("Принцип контроля","Каждый существенный риск переводится в проверяемый вопрос, подтверждённые исходные данные и решение до перехода к следующему этапу."))+</div></section><section id="next"><div class="aladin-section-head"><div class="aladin-section-title"><span class="aladin-section-index">08</span><span class="eyebrow">NEXT STEP</span><h2>Этап и следующий шаг</h2></div><p>Переход от концепции к проверяемой площадке, ТЭО и предметному обсуждению.</p></div>visual(media.result,"Готовый жилой продукт как целевой результат","NEXT STEP","Следующий результат — проверенная площадка","Сейчас задача проекта — перейти от концепции к проверяемой площадке и ТЭО.")<div class="grid aladin-next-grid">card("01","Текущий этап",'<p>'+p.stage+'</p>'+chips(["CONCEPT","SITE SEARCH","FEASIBILITY"])+accordion("Что это означает","Проект ещё не заявляется как запущенный объект: следующий шаг — получить реальные исходные данные по площадке и перейти к проверке."))+card("02","Следующий результат",'<p>'+p.next+'</p>'+chips(["LAND POOL","SCREENING","TEO"])+accordion("Критерий результата","В работе остаются только площадки, по которым можно перейти к предметной технико-экономической оценке."))+card("03","Действие",'<p>Переведите интерес в предметный запрос: площадка, участие или материалы проекта.</p><div class="aladin-action"><span class="eyebrow">NEXT ACTION</span><strong>Перейти к предметному обсуждению</strong><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a></div>')+</div></section>
}
window.projectView=projectView;
function bindAladinInfographics(){
  if(window.__aladinInfographicBound) return;
  window.__aladinInfographicBound=true;
  function openInteractive(card){
    const page=card.closest('.aladin-page');
    page.querySelectorAll('.aladin-interactive-card.is-open').forEach(x=>{if(x!==card)x.classList.remove('is-open')});
    card.classList.toggle('is-open');
    let box=card.querySelector('.aladin-card-detail');
    if(!box){
      box=document.createElement('div');
      box.className='aladin-card-detail';
      box.setAttribute('aria-live','polite');
      box.innerHTML='<span>CONTENT DETAIL</span><strong>'+card.dataset.process+'</strong><div class="aladin-process-media"><img src="'+card.dataset.photo+'" alt="'+card.dataset.process+'" loading="lazy"></div><div class="aladin-process-copy"><p>'+card.dataset.copy+'</p><p><strong>Результат:</strong> '+card.dataset.result+'</p></div>';
      card.appendChild(box);
    }
  }
  document.addEventListener('click',function(event){
    const interactive=event.target.closest('.aladin-interactive-card');
    if(interactive && !event.target.closest('a,button,summary')){
      openInteractive(interactive);
      return;
    }
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
      box.innerHTML='<span>CONTROL POINT</span><strong>'+risk.dataset.title+'</strong><div class="aladin-process-media"><img src="'+risk.dataset.photo+'" alt="'+risk.dataset.title+'" loading="lazy"></div><div class="aladin-process-copy"><p>'+risk.dataset.copy+' → проверка исходных данных → решение до перехода к следующему этапу.</p></div>';
    }
  });
  document.addEventListener('keydown',function(event){
    const interactive=document.activeElement;
    if((event.key==='Enter'||event.key===' ') && interactive?.classList.contains('aladin-interactive-card')){
      event.preventDefault();
      openInteractive(interactive);
    }
  });
}

bindAladinInfographics();
if(location.hash.indexOf("#/project/aladin-residence")===0) render();
})();