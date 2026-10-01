(function(){
const originalProjectView=window.projectView;
function projectView(p){
const m=p.id==="aladin-residence"?[
"/ASSETS/ALADIN/photos/photo-1600585154340-be6161a56a0c-7295de861872.jpg",
"/ASSETS/ALADIN/photos/photo-1500382017468-9049fed747ef-002b586210cb.jpg",
"/ASSETS/ALADIN/photos/photo-1600585154526-990dced4db0d-02223b5ceb7c.jpg",
"/ASSETS/ALADIN/photos/photo-1560518883-ce09059eeffa-ed0295d3197c.jpg",
"/ASSETS/ALADIN/photos/photo-1503387762-592deb58ef4e-a53fab6cda3f.jpg",
"/ASSETS/ALADIN/photos/photo-1600607687920-4e2a09cf159d-bf70bc3cf605.jpg",
"/ASSETS/ALADIN/photos/photo-1556912167-f556f1f39fdf-9716a32a85d9.jpg",
"/ASSETS/ALADIN/photos/photo-1503387762-592deb58ef4e-ee9dea25d3ff.jpg",
"/ASSETS/ALADIN/photos/photo-1600566753190-17f0baa2a6c3-63dc9b79017a.jpg"
]:null;
if(!m)return originalProjectView(p);
const img=(src,alt,cls="")=>'<img class="'+cls+'" src="'+src+'" alt="'+alt+'" loading="lazy">';
const sm=(src,title,desc)=>mediaFigure(src,title,desc);
const accordion=(title,body,open=false)=>'<details class="aladin-accordion"'+(open?' open':'')+'><summary>'+title+'<span>+</span></summary><div>'+body+'</div></details>';
const metric=(label,value)=>'<div class="aladin-metric"><span>'+label+'</span><strong>'+value+'</strong></div>';
const chips=(items)=>'<div class="aladin-chips">'+items.map(x=>'<span>'+x+'</span>').join('')+'</div>';
return '<div class="wrap page"><a class="back" href="#/projects">← Все проекты</a>'+
'<div class="project-hero">'+img(m[0],"Таунхаус ALADIN RESIDENCE","project-hero-image")+'<div class="project-hero-copy"><div class="eyebrow">'+p.type+' · '+p.status+'</div><h1>'+p.name+'</h1><p class="lead">'+p.slogan+'</p></div></div>'+
'<div class="project-nav">'+["overview","product","market","model","economics","team","risks","next"].map((x,i)=>'<a href="#/project/'+p.id+'/'+x+'">'+["Обзор","Продукт","Рынок","Модель","Экономика","Команда","Риски","Следующий шаг"][i]+'</a>').join("")+'</div>'+
'<section id="overview"><h2>Обзор</h2>'+sm(m[1],"Земля и природный контекст ALADIN RESIDENCE","Площадка и окружающая среда задают основу жилого проекта.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Суть / проблема</h3><p>'+p.problem+'</p>'+accordion("Что должен решить проект","Собственный дом + территория рядом с городом, понятная экономика, организованное строительство и управляемый путь от земли до продажи.")+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Концепция</h3><p>'+p.concept+'</p>'+accordion("Единая система ALADIN","Архитектура → инженерия → энергоэффективность → благоустройство → экономика → продажи.",true)+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Статус</h3><p class="status">'+p.status+'</p>'+chips(["CONCEPT","PRE-DEVELOPMENT","NOT LAUNCHED"])+accordion("Что это означает","Материалы страницы описывают концепт и рабочую модель. Финальные параметры появляются только после проверки участка, ТЭО и градостроительных условий.")+'</div></article></div></section>'+
'<section id="product"><h2>Продукт и площадка</h2>'+sm(m[2],"Архитектурный образ ALADIN RESIDENCE","Таунхаус, фасад и масштаб жилой среды формируют визуальный язык продукта.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Продукт</h3><p>'+p.product+'</p>'+chips(["≈70 м²","2 этажа","2–4 секции","energy-efficient"])+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Локация</h3><p>'+p.location+'</p>'+accordion("Приоритетные зоны","Криховцы · Вовчинец · Угорники · Тысменица · другие подходящие локации после проверки.",true)+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Требования к площадке</h3><p>'+p.siteRequirements+'</p>'+accordion("Проверка участка","Подъезд · коммуникации · назначение · градостроительный потенциал · ограничения · возможность реализации.")+'</div></article></div></section>'+
'<section id="market"><h2>Рынок</h2>'+sm(m[3],"Жилая среда и покупательская ценность","Визуальный образ связывает продукт с образом жизни будущего жителя.")+'<div class="media-grid"><article class="card media-card media-wide"><div class="media-copy"><span class="eyebrow">TARGET MARKET</span><h3>Целевая аудитория</h3>'+chips(["Молодые семьи","Специалисты","Предприниматели","IT / digital"])+'<p>Покупательский профиль объединяет людей, которым важны собственное пространство, близость к городу и предсказуемое качество продукта.</p>'+accordion("Покупательская ценность","Дом + территория + энергоэффективность + управляемая среда жизни.")+'</div></article></div></section>'+
'<section id="model"><h2>Модель реализации</h2>'+sm(m[4],"Проектирование и реализация ALADIN","Архитектура, проектирование и строительный процесс соединяются в один управляемый цикл.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Этапы реализации</h3><ol>'+p.model.map(x=>'<li>'+x+'</li>').join("")+'</ol>'+accordion("Gate-подход","Каждый следующий этап начинается после проверки результатов предыдущего: участок → ТЭО → проектирование → строительство → продажи.")+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Источники дохода</h3>'+list(p.revenue)+accordion("Дополнительные опции","Сервисы и опции рассматриваются только если они подтверждают ценность продукта и экономику конкретного проекта.")+'</div></article></div></section>'+
'<section id="economics"><h2>Экономика и инвестиции</h2>'+sm(m[5],"Пространство, качество и стоимость продукта ALADIN","Экономика связывает характеристики дома, стоимость создания и будущую модель монетизации.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Расходные контуры</h3>'+list(p.costs)+accordion("Полный контур затрат","Земля → проектирование → разрешения → строительство → коммуникации → благоустройство → маркетинг → продажи → резерв.")+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Контрольные показатели</h3>'+list(p.finance)+ '<div class="aladin-metrics">'+metric("Единица","1 townhouse")+metric("Модель","CAPEX → продажа")+metric("Контроль","ROI / payback")+'</div></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Инвестиционная структура</h3><p>'+p.investment+'</p>'+accordion("Роли сторон","Собственник земли → участок. Инвестор → финансирование. ALADIN / MMW → организация, управление и реализация проекта.")+'</div></article></div>'+economicCalculator(p)+'</section>'+
'<section id="team"><h2>Команда и компетенции</h2>'+sm(m[6],"Жизнь внутри продукта ALADIN","Дом проектируется не только как объект, а как среда повседневной жизни.")+'<div class="card"><div class="visual-card-body"><span class="eyebrow">TEAM &amp; COMPETENCIES</span><h3>Команда проекта</h3>'+chips(["Founder / CEO","PM","Architecture","Engineering","Construction","Finance","Sales","Legal"])+list(p.team)+accordion("Как работает команда","ALADIN объединяет ключевые компетенции вокруг одного проекта; специализированные функции могут подключаться по мере прохождения этапов.")+'</div></div></section>'+
'<section id="risks"><h2>Риски и ограничения</h2>'+sm(m[7],"Материалы, строительство и контроль качества","Физическая реализация требует проверки материалов, инженерии, стоимости, сроков и качества.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Площадка и среда</h3><p>Земельные, транспортные, инженерные и средовые ограничения требуют проверки до следующего этапа.</p>'+accordion("Что проверяем","Границы участка · подъезд · коммуникации · назначение · ограничения · окружение.")+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Инженерия и реализация</h3><p>CAPEX, инженерия, сроки и качество должны подтверждаться исходными данными и контрольными точками.</p>'+accordion("Контроль","Смета · инженерные решения · календарный план · подрядчики · качество · резерв.")+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Риски проекта</h3>'+list(p.risks)+accordion("Принцип ALADIN","Не скрывать неопределённость, а переводить её в проверяемый вопрос и контрольную точку.")+'</div></article></div></section>'+
'<section id="next"><h2>Этап и следующий шаг</h2>'+sm(m[8],"Дом как итог проекта ALADIN","Финальная визуальная точка возвращает проект к результату: понятному продукту и следующему проверяемому действию.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Текущий этап</h3><p>'+p.stage+'</p>'+chips(["CONCEPT","SITE SEARCH","FEASIBILITY"])+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Следующий шаг</h3><p>'+p.next+'</p>'+accordion("Результат шага","Пул кандидатов → первичный скрининг → 1–3 площадки для ТЭО.")+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Действие</h3><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a></div></article></div></section></div>';
}
window.projectView=projectView;
if(location.hash.indexOf("#/project/aladin-residence")===0)render();
})();