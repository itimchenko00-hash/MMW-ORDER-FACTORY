(function(){
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
if(!m)return window.__mmwOriginalProjectView(p);
const img=(src,alt,cls="")=>'<img class="'+cls+'" src="'+src+'" alt="'+alt+'" loading="lazy">';
const sm=(src,title,desc)=>mediaFigure(src,title,desc);
return '<div class="wrap page"><a class="back" href="#/projects">← Все проекты</a>'+
'<div class="project-hero">'+img(m[0],"Таунхаус ALADIN RESIDENCE","project-hero-image")+'<div class="project-hero-copy"><div class="eyebrow">'+p.type+' · '+p.status+'</div><h1>'+p.name+'</h1><p class="lead">'+p.slogan+'</p></div></div>'+
'<div class="project-nav">'+["overview","product","market","model","economics","team","risks","next"].map((x,i)=>'<a href="#/project/'+p.id+'/'+x+'">'+["Обзор","Продукт","Рынок","Модель","Экономика","Команда","Риски","Следующий шаг"][i]+'</a>').join("")+'</div>'+
'<section id="overview"><h2>Обзор</h2>'+sm(m[1],"Земля и природный контекст ALADIN RESIDENCE","Площадка и окружающая среда задают основу жилого проекта.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Суть / проблема</h3><p>'+p.problem+'</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Концепция</h3><p>'+p.concept+'</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Статус</h3><p class="status">'+p.status+'</p><p>Проект является концептуальным и не заявляется как запущенный объект.</p></div></article></div></section>'+
'<section id="product"><h2>Продукт и площадка</h2>'+sm(m[2],"Архитектурный образ ALADIN RESIDENCE","Таунхаус, фасад и масштаб жилой среды формируют визуальный язык продукта.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Продукт</h3><p>'+p.product+'</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Локация</h3><p>'+p.location+'</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Требования к площадке</h3><p>'+p.siteRequirements+'</p></div></article></div></section>'+
'<section id="market"><h2>Рынок</h2>'+sm(m[3],"Жилая среда и покупательская ценность","Визуальный образ связывает продукт с образом жизни будущего жителя.")+'<div class="media-grid"><article class="card media-card media-wide"><div class="media-copy"><span class="eyebrow">TARGET MARKET</span><h3>Целевая аудитория</h3>'+list(p.audience)+'</div></article></div></section>'+
'<section id="model"><h2>Модель реализации</h2>'+sm(m[4],"Проектирование и реализация ALADIN","Архитектура, проектирование и строительный процесс соединяются в один управляемый цикл.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Этапы реализации</h3><ol>'+p.model.map(x=>'<li>'+x+'</li>').join("")+'</ol></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Источники дохода</h3>'+list(p.revenue)+'</div></article></div></section>'+
'<section id="economics"><h2>Экономика и инвестиции</h2>'+sm(m[5],"Пространство, качество и стоимость продукта ALADIN","Экономика связывает характеристики дома, стоимость создания и будущую модель монетизации.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Расходные контуры</h3>'+list(p.costs)+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Контрольные показатели</h3>'+list(p.finance)+'</div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Инвестиционная структура</h3><p>'+p.investment+'</p></div></article></div>'+economicCalculator(p)+'</section>'+
'<section id="team"><h2>Команда и компетенции</h2>'+sm(m[6],"Жизнь внутри продукта ALADIN","Дом проектируется не только как объект, а как среда повседневной жизни.")+'<div class="card"><div class="visual-card-body"><span class="eyebrow">TEAM &amp; COMPETENCIES</span><h3>Команда проекта</h3>'+list(p.team)+'</div></div></section>'+
'<section id="risks"><h2>Риски и ограничения</h2>'+sm(m[7],"Материалы, строительство и контроль качества","Физическая реализация требует проверки материалов, инженерии, стоимости, сроков и качества.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Площадка и среда</h3><p>Земельные, транспортные, инженерные и средовые ограничения требуют проверки до следующего этапа.</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Инженерия и реализация</h3><p>CAPEX, инженерия, сроки и качество должны подтверждаться исходными данными и контрольными точками.</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Риски проекта</h3>'+list(p.risks)+'</div></article></div></section>'+
'<section id="next"><h2>Этап и следующий шаг</h2>'+sm(m[8],"Дом как итог проекта ALADIN","Финальная визуальная точка возвращает проект к результату: понятному продукту и следующему проверяемому действию.")+'<div class="grid">'+
'<article class="card"><div class="visual-card-body"><div class="card-index">01</div><h3>Текущий этап</h3><p>'+p.stage+'</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">02</div><h3>Следующий шаг</h3><p>'+p.next+'</p></div></article>'+
'<article class="card"><div class="visual-card-body"><div class="card-index">03</div><h3>Действие</h3><a class="button" href="mailto:itimchenko00@gmail.com?subject='+encodeURIComponent(p.name)+'">'+p.action+'</a></div></article></div></section></div>';
}
if(typeof window.__mmwOriginalProjectView!=="function"&&typeof projectView==="function")window.__mmwOriginalProjectView=projectView;
window.projectView=projectView;
if(location.hash.indexOf("#/project/aladin-residence")===0)render();
})();