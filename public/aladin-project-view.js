(function(){
const originalProjectView=window.projectView;
function projectView(p){
  if(p.id!=="aladin-residence") return originalProjectView(p);

  const heroMedia="/ASSETS/ALADIN/photos/web-selected/01-hero-residence.jpg";

  const img=(src,alt,cls="")=>'<img class="'+cls+'" src="'+src+'" alt="'+alt+'" loading="lazy" onerror="this.closest(\'figure,article,div\')?.classList.add(\'media-error\');this.style.display=\'none\';">';
  const interactiveMeta={
"Суть / проблема":["/ASSETS/ALADIN/photos/web-selected/04-suburban-context.jpg","Потребность → требования к проекту","Сначала фиксируется реальная задача покупателя: собственный дом рядом с городом. Затем она переводится в измеримые требования к площади, территории, доступности, инженерии, цене и сроку реализации. Это не описание идеи, а исходная постановка задачи, от которой проверяется весь проект.","На выходе — перечень требований, по которым можно проверить площадку, продукт и экономику."],
"Концепция":["/ASSETS/ALADIN/photos/web-selected/05-construction-process.jpg","Сборка продукта как единой системы","Архитектура определяет пространство, инженерия — эксплуатацию, энергоэффективность — будущие расходы, благоустройство — качество среды, а экономика и продажи проверяют коммерческую жизнеспособность. Все решения рассматриваются вместе, чтобы изменение одного элемента не разрушало остальные.","На выходе — целостная концепция, которую можно переводить в ТЭО и проектирование."],
"Статус":["/ASSETS/ALADIN/photos/web-selected/08-new-build.jpg","Фиксация стадии и степени готовности","ALADIN RESIDENCE — концептуальный проект. На этой странице не выдаётся желаемый результат за построенный объект: реальные параметры появятся после проверки земли, исходных данных, разрешений и бюджета.","На выходе — прозрачная граница между концепцией и подтверждённым девелоперским проектом."],
"Продукт":["/ASSETS/ALADIN/photos/web-selected/03-family-living.jpg","Формирование жилой единицы","Базовый сценарий — таунхаус около 70 м² на двух этажах, пилот 2–4 секции. После выбора участка проверяются ориентация, подъезды, приватность, инсоляция, инженерия, планировки и себестоимость. Поэтому площадь и количество секций остаются ориентиром, а не обещанием.","На выходе — продуктовая конфигурация, согласованная с участком и экономикой."],
"Локация":["/ASSETS/ALADIN/photos/web-selected/04-suburban-context.jpg","Скрининг локации","Локация оценивается не по одному критерию. Сопоставляются время до города, транспорт, окружение, доступность школ и сервисов, характер застройки, конкурентные предложения и потенциальный спрос. Только после такого скрининга место становится кандидатом.","На выходе — ранжированный пул локаций для проверки земельных участков."],
"Требования к площадке":["/ASSETS/ALADIN/photos/web-selected/07-residential-character.jpg","Проверка участка до вложений","Проверяются границы и назначение земли, подъезд, рельеф, коммуникации, ограничения, градостроительный потенциал и возможность разместить продукт без чрезмерного усложнения строительства. Отдельно оценивается стоимость подключения сетей.","На выходе — решение: площадка подходит для ТЭО, требует доработки или исключается."],
"Целевая аудитория":["/ASSETS/ALADIN/photos/web-selected/03-family-living.jpg","Сегментация покупателей","Для каждой группы проверяется не только демография, но и причина покупки: собственный дом, личная территория, близость к городу, эксплуатационные расходы, безопасность и готовность платить. Эти мотивы затем превращаются в продуктовые и маркетинговые сообщения.","На выходе — проверяемые сегменты спроса и гипотезы позиционирования."],
"Покупательская ценность":["/ASSETS/ALADIN/photos/web-selected/02-townhouse-community.jpg","Перевод характеристик в пользу","Площадь сама по себе не является ценностью. Покупатель оценивает сценарий жизни: приватность, двор, планировку, энергоэффективность, доступность города и понятные расходы на эксплуатацию. Каждая характеристика должна отвечать на конкретную потребность.","На выходе — понятное ценностное предложение, которое можно проверять через рынок."],
"Этапы реализации":["/ASSETS/ALADIN/photos/web-selected/05-construction-process.jpg","Управляемая последовательность","Земля → ТЭО → проектирование и разрешения → строительство → маркетинг и продажи → передача. На каждом переходе фиксируются исходные данные, бюджет, сроки, ответственные и критерии продолжения. Если критичный вход не подтверждён, следующий этап не маскирует проблему.","На выходе — управляемый маршрут проекта от площадки до реализации."],
"Источники дохода":["/ASSETS/ALADIN/photos/web-selected/07-residential-character.jpg","Формирование выручки","Базовая выручка возникает от продажи жилых единиц. Дополнительные сервисы или опции допустимы только тогда, когда они имеют понятную ценность для покупателя и не усложняют операционную модель. Выручка сопоставляется со сроками продаж и затратами привлечения.","На выходе — проверяемая модель выручки, связанная с продуктом и спросом."],
"Расходные контуры":["/ASSETS/ALADIN/photos/web-selected/06-energy-solar.jpg","Сбор полной себестоимости","В расчёт включаются земля, проектирование, разрешения, строительство, подключения, благоустройство, маркетинг, продажи и резерв. Каждый контур должен иметь источник расчёта, допущение и ответственное лицо, чтобы итоговая себестоимость не возникала из одной общей оценки.","На выходе — прозрачная структура капитальные затраты и связанных расходов."],
"Контрольные показатели":["/ASSETS/ALADIN/photos/web-selected/01-hero-residence.jpg","Связка затрат, цены и доходности","Себестоимость единицы сопоставляется с ценой реализации, общей выручкой, прибылью, долями инвестора и MMW, точкой безубыточности, ROI и сроком окупаемости. Изменение площади, цены, капитальные затраты или скорости продаж должно быть видно в модели.","На выходе — сценарии, позволяющие понять чувствительность проекта к ключевым параметрам."],
"Инвестиционная структура":["/ASSETS/ALADIN/photos/web-selected/02-townhouse-community.jpg","Распределение капитала и ответственности","В базовом сценарии собственник может предоставить землю, инвестор — капитал на реализацию, а MMW — организовать девелопмент и управление. До согласования сделки отдельно фиксируются вклад каждого участника, порядок финансирования, контроль бюджета, права на результат и механизм выхода.","На выходе — понятная структура участия без подмены концепции готовым инвестиционным предложением."],
"Площадка и среда":["/ASSETS/ALADIN/photos/web-selected/04-suburban-context.jpg","Преддевелоперская проверка среды","Площадка оценивается одновременно как земля и как часть будущего района: подъезды, транспорт, соседняя застройка, инженерная инфраструктура, шум, рельеф и ограничения. Это снижает риск спроектировать продукт, который невозможно или невыгодно реализовать.","На выходе — перечень ограничений и решений до проектирования."],
"Инженерия и реализация":["/ASSETS/ALADIN/photos/web-selected/08-new-build.jpg","Техническая реализуемость","После определения продукта проверяются подключения, мощности, трассы, технические решения и стоимость их реализации. Далее инженерные решения связываются с рабочей документацией, сметой, графиком и контролем фактического выполнения.","На выходе — подтверждённая инженерная схема и её влияние на бюджет и сроки."],
"Ключевые риски":["/ASSETS/ALADIN/photos/web-selected/07-residential-character.jpg","Риск → проверка → решение","Земля, подключения, капитальные затраты, спрос, цена и разрешительные сроки не должны оставаться абстрактным списком. Для каждого риска задаются источник данных, способ проверки, порог допустимости и решение: принять, изменить, заложить резерв или остановить этап.","На выходе — карта рисков, встроенная в процесс принятия решений."],
"Текущий этап":["/ASSETS/ALADIN/photos/web-selected/05-construction-process.jpg","Переход от концепции к исходным данным","Сейчас проект находится до выбора конкретной площадки. Поэтому главная задача — не расширять красивую концепцию, а получить реальные земельные кандидаты, провести первичный скрининг и собрать данные для ТЭО.","На выходе — первый проверяемый набор площадок и исходных параметров."],
"Следующий результат":["/ASSETS/ALADIN/photos/web-selected/06-energy-solar.jpg","От пула земли к короткому списку","Из общего пула выбираются кандидаты, которые проходят юридическую, градостроительную, инженерную и коммерческую первичную проверку. Для 1–3 площадок формируется набор данных, достаточный для предварительного ТЭО.","На выходе — короткий список площадок, по которым имеет смысл продолжать работу."],
"Действие":["/ASSETS/ALADIN/photos/photo-1600607687920-4e2a09cf159d-bf70bc3cf605.jpg","Перевод интереса в рабочий вход","Проект может получить три типа входа: земельное предложение, предложение участия или запрос материалов. Каждый вход должен содержать минимум исходных данных, после чего определяется следующий рабочий шаг и список недостающей информации.","На выходе — конкретный запрос, который можно передать в процесс MMW."],
"Руководитель проекта":["/ASSETS/ALADIN/photos/web-selected/03-family-living.jpg","Стратегический контур","Определяет цели проекта, продуктовую рамку, ключевые решения и границы ответственности. На контрольных точках сопоставляет фактические данные с целями и принимает решение продолжать, изменить конфигурацию или остановить дальнейшие затраты.","На выходе — единый центр принятия стратегических решений."],
"Управление проектом":["/ASSETS/ALADIN/photos/web-selected/05-construction-process.jpg","Сведение проекта в единый график","PM превращает набор функций в последовательность: задачи, сроки, документы, зависимости, ответственные, контрольные точки и отклонения. Его задача — не делать всё самому, а не допускать разрывов между функциями.","На выходе — управляемый план с понятной ответственностью и статусом каждого этапа."],
"Архитектура":["/ASSETS/ALADIN/photos/web-selected/05-construction-process.jpg","Проектирование пространства","Архитектура переводит требования рынка и ограничения участка в посадку, планировки, площади, фасады и сценарии использования. Решения одновременно проверяются по удобству, стоимости строительства и реализуемости инженерии.","На выходе — архитектурная конфигурация, которую можно считать и строить."],
"Инженерия":["/ASSETS/ALADIN/photos/web-selected/01-hero-residence.jpg","Инженерная модель объекта","Определяются сети, мощности, подключения, энергоэффективные решения и эксплуатационные ограничения. Каждое техническое решение оценивается не только по возможности установки, но и по стоимости, срокам и будущим расходам.","На выходе — инженерная схема с понятным влиянием на капитальные затраты и операционные расходы."],
"Строительство":["/ASSETS/ALADIN/photos/web-selected/08-new-build.jpg","Управление строительным производством","Рабочая документация превращается в календарный план, объёмы, закупки и задания подрядчикам. Фактические затраты, сроки и качество сопоставляются с планом, а отклонения фиксируются до того, как становятся системной проблемой.","На выходе — контролируемое выполнение работ по бюджету и графику."],
"Финансы и инвестиции":["/ASSETS/ALADIN/photos/web-selected/02-townhouse-community.jpg","Финансовое управление","Финансовый контур собирает бюджет, источники капитала, график финансирования, выручку и сценарии результата. Модель обновляется по мере появления подтверждённых данных, а не заменяет их предположениями.","На выходе — финансовая модель, пригодная для предметного обсуждения инвестиций."],
"Продажи":["/ASSETS/ALADIN/photos/web-selected/03-family-living.jpg","Проверка спроса и реализация","Продажи проверяют, соответствует ли продукт рынку: предложение, цена, аудитория, каналы, возражения и скорость принятия решения. Обратная связь возвращается в продукт и финансовую модель, пока проект ещё можно изменить.","На выходе — подтверждённые гипотезы спроса и сценарий реализации."],
"Право и бухгалтерия":["/ASSETS/ALADIN/photos/web-selected/07-residential-character.jpg","Документальная и расчётная база","Юридический контур проверяет права, договоры, разрешительные документы и обязательства сторон; бухгалтерский — движение средств и документальное подтверждение операций. Это создаёт доказуемую основу для управления проектом.","На выходе — зафиксированные права, обязательства и финансовые операции."]
};
  const card=(index,title,body,extra="")=>{
    const m=interactiveMeta[title] || [null,"Смысл и процесс","Этот блок раскрывает отдельную часть проектной системы. Здесь показаны подробности процесса, контрольные действия и ожидаемый результат.","Получено более полное понимание роли этого элемента в проекте."];
    return '<article class="card aladin-card aladin-interactive-card" tabindex="0" role="button" data-aladin-card="true" data-title="'+title+'" data-photo="'+m[0]+'" data-process="'+m[1]+'" data-copy="'+m[2]+'" data-result="'+m[3]+'">' + (m[0] ? '<img class="aladin-card-image" src="'+m[0]+'" alt="'+title+'" loading="lazy">' : '') + '<div class="visual-card-body"><h3>'+title+'</h3>'+body+extra+'<div class="aladin-open-hint"><span>СМОТРЕТЬ ДЕТАЛИ</span><strong>Детали процесса</strong></div></div></article>';
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
    '<div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">'+kicker+'</span><h2>'+title+'</h2></div><p>'+copy+'</p></div>';

  return '<div class="wrap page aladin-page">'+
    '<a class="back" href="#/projects">← Все проекты</a>'+
    '<div class="project-hero">'+
      img(heroMedia,"Современный таунхаус ALADIN RESIDENCE","project-hero-image")+
      '<div class="project-hero-copy"><div class="eyebrow">MMW-COMPANY · ПРОЕКТ</div><div class="project-hero-kicker">'+p.type+' <span>·</span> '+p.status+'</div><h1>'+p.name+'</h1><p class="lead">'+p.slogan+'</p><div class="project-hero-meta"><span>Концептуальная стадия</span><span>Преддевелопмент</span><span>Подготовка к поиску площадки</span></div><div class="actions aladin-hero-actions"><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">Обсудить проект</a><a class="button alt" href="#/project/'+p.id+'/economics">Смотреть экономику</a></div></div>'+
    '</div>'+
    '<div class="aladin-project-rail"><span class="eyebrow">ALADIN RESIDENCE</span><span>Проект MMW-COMPANY</span><span class="rail-status">'+p.status.toUpperCase()+'</span></div>'+'<div class="aladin-commercial-strip"><div><span class="eyebrow">СТАТУС ПРОЕКТА</span><strong>Концепция → проверка площадки → ТЭО → реализация</strong></div><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name+' — рабочий запрос')+'">Передать запрос</a></div>'+'<div class="project-nav">'+
      ["overview","product","market","model","economics","team","risks","next"].map((x,i)=>
        '<a href="#/project/'+p.id+'/'+x+'">'+["Обзор","Продукт","Рынок","Модель","Экономика","Команда","Риски","Следующий шаг"][i]+'</a>'
      ).join("")+
    '</div>'+

    '<section id="overview"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">РАМКА ПРОЕКТА</span><h2>Обзор</h2></div><p>Проблема, концепция и статус — единая точка входа в проект.</p></div>'+

      '<div class="grid">'+
        card("01","Суть / проблема",'<p>'+p.problem+'</p>')+
        card("02","Концепция",'<p>'+p.concept+'</p>')+
        card("03","Статус",'<p class="status">'+p.status+'. Проект является концептуальным и не заявляется как запущенный объект.</p>')+
      '</div>'+
    '</section>'+

    '<section id="product"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">ПРОДУКТ И ПЛОЩАДКА</span><h2>Продукт и площадка</h2></div><p>Продуктовая конфигурация неразрывно связана с требованиями к земельному участку.</p></div>'+

      '<div class="grid">'+
        card("01","Продукт",'<p>'+p.product+'</p>'+chips(["≈70 м²","2 этажа","2–4 секции","ЭНЕРГОЭФФЕКТИВНОСТЬ"]))+
        card("02","Локация",'<p>'+p.location+'</p>')+
        card("03","Требования к площадке",'<p>'+p.siteRequirements+'</p>')+
      '</div>'+
    '</section>'+

    '<section id="market"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">MARKET</span><h2>Рынок</h2></div><p>Целевая аудитория и покупательская ценность формируют основу позиционирования и продаж.</p></div>'+

      '<div class="grid">'+
        card("01","Целевая аудитория",chips(p.audience))+
        card("02","Покупательская ценность",'<p>Собственный дом + территория + энергоэффективность + понятная среда жизни.</p>')+
      '</div>'+
    '</section>'+

    '<section id="model"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">МОДЕЛЬ РЕАЛИЗАЦИИ</span><h2>Модель реализации</h2></div><p>Проект проходит последовательную цепочку от площадки и ТЭО до строительства и реализации.</p></div>'+

      '<div class="grid">'+
        card("01","Этапы реализации",'<ol>'+p.model.map(x=>'<li>'+x+'</li>').join("")+'</ol>')+
        card("02","Источники дохода",list(p.revenue),accordion("Дополнительные опции","Сервисы и опции рассматриваются только после подтверждения их ценности для покупателя и экономики конкретного проекта."))+
      '</div>'+
    '</section>'+

    '<section id="economics"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">ECONOMICS</span><h2>Экономика и инвестиции</h2></div><p>Финансовая модель связывает затраты, выручку, капитал, контрольные показатели и результат.</p></div>'+
      '<div class="aladin-infographic aladin-economics-map" data-infographic="economics"><div class="aladin-infographic-head"><span class="eyebrow">ЭКОНОМИКА ПРОЕКТА</span><strong>Экономика проекта как управляемая цепочка</strong><span>Нажмите на этап — откроется тематическое фото процесса и детальная информация о том, что формирует экономику.</span></div><div class="aladin-flow"><button type="button" class="aladin-flow-node" data-title="Земля" data-photo="/ASSETS/ALADIN/photos/web-selected/04-suburban-context.jpg" data-process="Площадка и исходные данные" data-copy="До проектирования необходимо подтвердить границы, назначение, подъезд, окружение, коммуникации и градостроительный потенциал." data-result="Проверенная площадка и набор исходных данных."><span class="visually-hidden">Этап</span><strong>Земля</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Проектирование" data-photo="/ASSETS/ALADIN/photos/web-selected/05-construction-process.jpg" data-process="Концепция, архитектура и инженерия" data-copy="Продукт переводится из идеи в проектную модель: планировки, архитектура, инженерные системы, разрешительные предпосылки и предварительные объёмы." data-result="Согласованная проектная конфигурация и база для расчёта капитальные затраты."><span class="visually-hidden">Этап</span><strong>Проектирование</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Строительство" data-photo="/ASSETS/ALADIN/photos/web-selected/08-new-build.jpg" data-process="капитальные затраты, подрядчики, сроки и качество" data-copy="Формируются строительная стоимость, календарный план, состав работ и контроль подрядчиков. Экономика связывается с фактическим выполнением." data-result="Управляемый строительный контур со стоимостью, сроками и качеством."><span class="visually-hidden">Этап</span><strong>Строительство</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Коммуникации" data-photo="/ASSETS/ALADIN/photos/web-selected/01-hero-residence.jpg" data-process="Подключение инфраструктуры" data-copy="Проверяется техническая возможность и стоимость подключения инженерных сетей. Эти затраты напрямую влияют на капитальные затраты." data-result="Подтверждённые технические условия и бюджет подключения."><span class="visually-hidden">Этап</span><strong>Коммуникации</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Маркетинг" data-photo="/ASSETS/ALADIN/photos/web-selected/03-family-living.jpg" data-process="Упаковка продукта и привлечение спроса" data-copy="Определяются аудитория, позиционирование, каналы продвижения, стоимость привлечения и материалы для продаж." data-result="Система вывода продукта на рынок с контролируемыми расходами."><span class="visually-hidden">Этап</span><strong>Маркетинг</strong></button><span class="aladin-flow-arrow" aria-hidden="true">→</span><button type="button" class="aladin-flow-node" data-title="Продажи" data-photo="/ASSETS/ALADIN/photos/photo-1600607687920-4e2a09cf159d-bf70bc3cf605.jpg" data-process="Цена, скорость реализации и денежный поток" data-copy="Проверяются цена реализации, сценарий продаж, скорость поглощения и влияние сроков на денежный поток. Здесь модель получает фактическую обратную связь." data-result="Сценарий реализации для проверки выручки, прибыли, ROI и срока окупаемости."><span class="visually-hidden">Этап</span><strong>Продажи</strong></button></div><div class="aladin-infographic-detail" aria-live="polite"><span>ВЫБЕРИТЕ ЭТАП</span><strong>Нажмите на любой этап цепочки</strong><div class="aladin-process-media"><span>ВИЗУАЛИЗАЦИЯ ПРОЦЕССА</span></div><div class="aladin-process-copy"><p>После выбора этапа здесь появится тематическое фото процесса и подробное описание.</p></div></div></div>'+
      '</div>'+
      '<div class="grid aladin-commercial-grid">'+
        card("01","Расходные контуры",list(p.costs))+
        card("02","Контрольные показатели",list(p.finance)+'<div class="aladin-metrics">'+metric("Единица","1 таунхаус")+metric("Модель","затраты → продажа")+metric("Контроль","ROI / окупаемость")+'</div>')+
        card("03","Инвестиционная структура",'<p>'+p.investment+'</p>')+
      '</div>'+economicCalculator(p)+
    '</section>'+

    '<section id="team"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">TEAM</span><h2>Команда и компетенции</h2></div><p>Разные функции собираются вокруг одного проекта и единого контура ответственности.</p></div>'+

      '<div class="grid aladin-commercial-grid">'+[
        ["01","Руководитель проекта","<p>Стратегия проекта, ключевые решения и ответственность за общий результат.</p>"],
        ["02","Управление проектом","<p>Координация этапов, сроков, участников и контрольных точек.</p>"],
        ["03","Архитектура","<p>Архитектура продукта, планировочная логика и связь продукта с площадкой.</p>"],
        ["04","Инженерия","<p>Инженерные решения, коммуникации и техническая реализуемость.</p>"],
        ["05","Строительство","<p>Организация реализации, подрядчики, качество, сроки и строительный контроль.</p>"],
        ["06","Финансы и инвестиции","<p>Финансовая модель, капитальные затраты, инвестиционная структура и контроль экономики.</p>"],
        ["07","Продажи","<p>Позиционирование, маркетинг, продажи и обратная связь от рынка.</p>"],
        ["08","Право и бухгалтерия","<p>Документы, договорная база, юридические и финансовые контрольные процедуры.</p>"]
      ].map(x=>card(x[0],x[1],x[2])).join("")+'</div>'+
    '<div class="aladin-commercial-strip aladin-team-strip"><div><span class="eyebrow">ОТВЕТСТВЕННОСТЬ</span><strong>Одна команда — один проект — единый контур контроля</strong></div></div>'+    '<div class="aladin-commercial-strip aladin-risk-strip"><div><span class="eyebrow">КОНТРОЛЬ ПЕРЕХОДА</span><strong>Нет подтверждения критичного входа — нет перехода на следующий этап.</strong></div></div>'+    '</section>'+
    '<section id="risks"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">КОНТРОЛЬ РИСКОВ</span><h2>Риски и ограничения</h2></div><p>Каждое существенное ограничение переводится в проверку и контрольную точку до перехода проекта на следующий этап.</p></div>'+

      '<div class="grid aladin-commercial-grid">'+
        card("01","Площадка и среда",'<p>'+p.risks[0]+'</p>'+chips(["ПЛОЩАДКА","ДОСТУП","ПЛАНИРОВАНИЕ"])+accordion("Что проверяем","Границы участка · подъезд · коммуникации · назначение · градостроительные ограничения · окружение."))+
        card("02","Инженерия и реализация",'<p>'+p.risks[1]+'</p>'+chips(["капитальные затраты","КОММУНИКАЦИИ","КАЧЕСТВО"])+accordion("Контроль","Смета · инженерные решения · календарный план · подрядчики · качество · резерв."))+
        card("03","Ключевые риски",'<p>'+p.risks.slice(2).join(" · ")+'</p>'+chips(["ЗЕМЛЯ","ЗАТРАТЫ","СПРОС","РАЗРЕШЕНИЯ"])+accordion("Принцип контроля","Каждый существенный риск переводится в проверяемый вопрос, подтверждённые исходные данные и решение до перехода к следующему этапу."))+
      '</div>'+
    '</section>'+
    '<section id="next"><div class="aladin-section-head"><div class="aladin-section-title"><span class="eyebrow">СЛЕДУЮЩИЙ ШАГ</span><h2>Этап и следующий шаг</h2></div><p>Переход от концепции к проверяемой площадке, ТЭО и предметному обсуждению.</p></div>'+

      '<div class="grid aladin-commercial-grid">'+
        card("01","Текущий этап",'<p>'+p.stage+'</p>'+chips(["КОНЦЕПЦИЯ","ПЛОЩАДКА SEARCH","ТЭО"])+accordion("Что это означает","Проект ещё не заявляется как запущенный объект: следующий шаг — получить реальные исходные данные по площадке и перейти к проверке."))+
        card("02","Следующий результат",'<p>'+p.next+'</p>'+chips(["ЗЕМЛЯ POOL","ПЕРВИЧНЫЙ ОТБОР","ТЭО"])+accordion("Критерий результата","В работе остаются только площадки, по которым можно перейти к предметной технико-экономической оценке."))+
        card("03","Действие",'<p>Переведите интерес в предметный запрос: площадка, участие или материалы проекта.</p><div class="aladin-action"><span class="eyebrow">СЛЕДУЮЩЕЕ ДЕЙСТВИЕ</span><strong>Перейти к предметному обсуждению</strong><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a></div>')+
      '</div>'+
    '<div class="aladin-commercial-strip aladin-next-strip"><div><span class="eyebrow">ВХОД В ПРОЕКТ</span><strong>Следующий шаг — конкретный вход в проект, а не расширение концепции.</strong><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name+' — рабочий запрос')+'">Передать запрос</a></div></div>'+    '</section>'; 
  }

  window.projectView=projectView;

  const openAladinCard=function(card){
    if(!card || !document.querySelector(".aladin-page")) return;
    const open=document.querySelector(".aladin-interactive-card.is-open");
    if(open && open!==card) {
      const old= open.querySelector(".aladin-card-detail");
      if(old) old.remove();
      open.classList.remove("is-open");
    }
    const existing=card.querySelector(".aladin-card-detail");
    if(existing){
      existing.remove();
      card.classList.remove("is-open");
      return;
    }
    const photo=card.getAttribute("data-photo")||"";
    const process=card.getAttribute("data-process")||"DETAIL";
    const copy=card.getAttribute("data-copy")||"";
    const result=card.getAttribute("data-result")||"";
    card.classList.add("is-open");
    const detail=document.createElement("div");
    detail.className="aladin-card-detail";
    detail.innerHTML='<div class="aladin-detail-kicker"><span>ДЕТАЛИ ПРОЕКТА</span><span>ПРОЦЕСС И РЕЗУЛЬТАТ</span></div><strong class="aladin-detail-title">'+process+'</strong><div class="aladin-detail-grid"><div class="aladin-detail-panel"><span>КАК ЭТО РАБОТАЕТ</span><p>'+copy+'</p></div><div class="aladin-detail-panel aladin-detail-result"><span>РЕЗУЛЬТАТ</span><p>'+result+'</p></div></div>';
    card.appendChild(detail);
  };
  window.__mmwOpenAladinCard=openAladinCard;

  function openAladinFlow(node){
    const root=node && node.closest(".aladin-infographic");
    if(!root) return;
    root.querySelectorAll(".aladin-flow-node.is-active").forEach(x=>x.classList.remove("is-active"));
    node.classList.add("is-active");
    const detail=root.querySelector(".aladin-infographic-detail");
    if(!detail) return;
    const photo=node.getAttribute("data-photo")||"";
    const process=node.getAttribute("data-process")||"";
    const copy=node.getAttribute("data-copy")||"";
    const result=node.getAttribute("data-result")||"";
    detail.innerHTML='<span>'+((node.getAttribute("data-title")||"").toUpperCase())+'</span><strong>'+process+'</strong><div class="aladin-process-media">'+(photo?'<img src="'+photo+'" alt="'+process.replace(/"/g,"&quot;")+'" loading="lazy">':'<span>ВИЗУАЛИЗАЦИЯ ПРОЦЕССА</span>')+'</div><div class="aladin-process-copy"><p>'+copy+'</p><p><strong>Результат:</strong> '+result+'</p></div>';
  }

  if(!window.__mmwAladinInteractiveBound){
    window.__mmwAladinInteractiveBound=true;
    document.addEventListener("click",function(e){
      const target=e.target && e.target.nodeType===1 ? e.target : e.target && e.target.parentElement;
      if(!target) return;
      const card=target.closest(".aladin-interactive-card");
      if(card){
        if(target.closest("a,button,input,select,textarea,summary")) return;
        e.preventDefault();
        e.stopPropagation();
        openAladinCard(card);
        return;
      }
      const node=target.closest(".aladin-flow-node");
      if(node){
        e.preventDefault();
        openAladinFlow(node);
      }
    },true);

    document.addEventListener("keydown",function(e){
      if(e.key!=="Enter"&&e.key!==" ") return;
      const el=document.activeElement;
      if(el && el.classList && el.classList.contains("aladin-interactive-card")){
        e.preventDefault();
        openAladinCard(el);
      }else if(el && el.classList && el.classList.contains("aladin-flow-node")){
        e.preventDefault();
        openAladinFlow(el);
      }
    });
  }

})();
