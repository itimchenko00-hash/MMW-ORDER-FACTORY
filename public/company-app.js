(() => {
  const app = document.getElementById("app");
  if (!app) return;

  const palette = {
    ink:"#06251F", ink2:"#0A332B", emerald:"#58D6B0", emerald2:"#8EE8CB",
    mint:"#DDF7EE", mist:"#F3FBF7", ivory:"#FAFCF8", line:"#CBE7DC",
    gold:"#C6A85A", white:"#FFFFFF"
  };

  const companyProjects = [
    ["aladin-residence","ALADIN RESIDENCE","Жилая недвижимость"],
    ["nexus-work","NEXUS WORK","Деловая инфраструктура"],
    ["nexus-logistics","NEXUS LOGISTICS","Логистическая инфраструктура"],
    ["carpathia-eco-lodge","CARPATHIA ECO LODGE","Гостеприимство и природный туризм"],
    ["agrohub","AGROHUB","Агропроизводственная инфраструктура"],
    ["energy-park","ENERGY PARK","Энергетическая и промышленная инфраструктура"]
  ];

  const sectors = [
    ["Недвижимость","Жилые проекты, коммерческие пространства, гостиничные и многофункциональные объекты."],
    ["Инфраструктура","Логистика, энергетика, сервисные и индустриальные площадки."],
    ["Производство","Агропромышленность, переработка, пищевые и промышленные проекты."],
    ["Услуги и бизнес","Сервисные бизнесы, цифровые продукты, торговые и предпринимательские концепции."]
  ];

  const stages = [
    ["Возможность","Определяем исходный актив или задачу: земля, объект, бизнес, идея, ресурс, капитал или рыночная потребность."],
    ["Исследование","Проверяем рынок, аудиторию, локацию, конкурентов, ограничения и сценарии развития."],
    ["Продукт","Формируем понятный проект: что создаётся, для кого, как используется и за счёт чего создаёт ценность."],
    ["Экономика","Связываем продукт с инвестициями, затратами, выручкой, маржинальностью, рисками и сроками окупаемости."],
    ["Реализация","Выстраиваем последовательность проектирования, разрешений, финансирования, запуска или строительства и коммерциализации."],
    ["Управление","Координируем участников и развитие проекта после запуска там, где операторский контур необходим."]
  ];

  const audiences = {
    "Собственники":["Есть актив, но нет ясной модели развития.","Формируем варианты использования, проверяем ограничения и определяем коммерческий сценарий."],
    "Инвесторы":["Нужна структурированная проектная модель.","Отдельно рассматриваем продукт, рынок, инвестиционную потребность, экономику и риски."],
    "Предприниматели":["Есть идея, ресурс или бизнес-задача.","Помогаем превратить исходную возможность в понятный проект с последовательностью действий."],
    "Компании":["Нужно создать новое направление или объект.","Организуем проектную модель и соединяем необходимые компетенции, участников и ресурсы."],
    "Партнёры":["Нужен координатор между локальными и международными участниками.","Собираем проектный контур вокруг конкретной задачи и юрисдикции."]
  };

  const newProjects = [
    ["BUSINESS CENTER","Коммерческая недвижимость","Офисы, сервисы и профессиональная среда."],
    ["RETAIL HUB","Торговля и сервисы","Розничный и сервисный объект с комбинированной функцией."],
    ["FOOD PRODUCTION","Производство","Пищевое производство от сырья до упаковки и реализации."],
    ["INDUSTRIAL PARK","Промышленность","Площадка для производственных компаний, складов и сервисов."],
    ["COLD STORAGE","Логистика","Холодильная инфраструктура для хранения и распределения продукции."],
    ["HOTEL & RESORT","Гостеприимство","Гостиничный или курортный проект с сервисным контуром."],
    ["RESIDENTIAL DEVELOPMENT","Недвижимость","Жилое развитие от небольшого объекта до комплексной территории."],
    ["MIXED-USE DEVELOPMENT","Многофункциональные объекты","Жильё, коммерция, сервис, работа и общественные функции."],
    ["SELF-STORAGE","Инфраструктура","Индивидуальное хранение для частных клиентов и бизнеса."],
    ["EV CHARGING HUB","Энергетика","Зарядная инфраструктура с дополнительными сервисами."],
    ["SOLAR ENERGY PROJECT","Энергетика","Солнечная генерация с оценкой площадки и экономики."],
    ["RECYCLING & WASTE","Экология","Сбор, сортировка, переработка и обращение с отходами."],
    ["FARM & FOOD","Агро","Производство, переработка, хранение, упаковка и сбыт."],
    ["EDUCATION & TRAINING HUB","Образование","Обучение, профессиональная подготовка и мероприятия."],
    ["HEALTH & WELLNESS","Здоровье","Wellness, реабилитация и оздоровительные услуги с проверкой требований юрисдикции."],
    ["SPORTS & ACTIVE LIFESTYLE","Спорт","Клуб, тренировочный центр или активная инфраструктура."],
    ["SERVICE HUB","Сервисы","Многофункциональный объект для жителей, бизнеса или сообщества."],
    ["DIGITAL BUSINESS","Digital","Цифровой продукт или технологическая бизнес-модель."],
    ["CUSTOM PROJECT","Собственный проект","Идея или актив клиента, для которого требуется отдельная проектная модель."]
  ];

  function section(id, cls, kicker, title, intro, body=""){
    return `<section id="${id}" class="co-section ${cls}">
      <div class="co-wrap">
        <div class="co-heading"><span class="co-kicker">${kicker}</span><h2>${title}</h2>${intro ? `<p>${intro}</p>`:""}</div>
        ${body}
      </div>
    </section>`;
  }

  function render(){
    if (location.hash && location.hash !== "#/" && location.hash !== "#") return;
    app.innerHTML = `
      <div class="company-site">
        <div class="co-ambient co-a1"></div><div class="co-ambient co-a2"></div>
        <section class="co-hero">
          <div class="co-wrap co-hero-grid">
            <div>
              <span class="co-kicker">MMW-COMPANY · PROJECT DEVELOPMENT</span>
              <h1>Развитие проектов<br><em>от возможности до результата.</em></h1>
              <p class="co-lead">MMW-COMPANY создаёт, структурирует и развивает проекты в недвижимости, инфраструктуре, производстве, услугах и других направлениях бизнеса.</p>
              <p class="co-hero-note">Мы не ограничиваемся заранее определённым перечнем отраслей. Каждый проект начинается с возможности — и получает собственную модель развития.</p>
              <div class="co-actions"><a class="co-btn co-btn-primary" href="#portfolio">Смотреть портфель</a><a class="co-btn co-btn-ghost" href="#contact">Предложить проект</a></div>
            </div>
            <div class="co-opportunity">
              <div class="co-orbit"><span>ВОЗМОЖНОСТЬ</span><i>→</i><span>ПРОЕКТ</span><i>→</i><span>РЕЗУЛЬТАТ</span></div>
              <div class="co-core"><small>MMW</small><strong>PROJECT<br>DEVELOPMENT</strong><b>структура · экономика · реализация</b></div>
              <button class="co-orbit-btn" data-scroll="#method">Исследовать подход</button>
            </div>
          </div>
        </section>

        ${section("scope","co-scope","01 · Сфера работы","Что мы создаём","Каталог показывает диапазон, а не границы. Состав проекта формируется под исходную возможность и задачу клиента.",
          `<div class="co-sector-shell"><div class="co-sector-tabs">${sectors.map((s,i)=>`<button class="co-sector-tab ${i===0?"active":""}" data-sector="${i}">${s[0]}</button>`).join("")}</div><div class="co-sector-display"><div class="co-sector-index">0${1}</div><div><h3 id="sectorTitle">${sectors[0][0]}</h3><p id="sectorText">${sectors[0][1]}</p><div class="co-sector-pulse"><span></span><span></span><span></span><span></span></div></div></div></div>`)}
        `)}

        ${section("method","co-method","02 · Метод","Как мы работаем","Шесть этапов, которые соединяют исходную возможность, продукт, экономику и управляемую реализацию.",
          `<div class="co-method-layout"><div class="co-stage-list">${stages.map((s,i)=>`<button class="co-stage ${i===0?"active":""}" data-stage="${i}"><span>0${i+1}</span><strong>${s[0]}</strong><i>↗</i></button>`).join("")}</div><div class="co-stage-view"><div class="co-stage-photo co-stage-no-photo"><span>ФОТО БУДЕТ ДОБАВЛЕНО ПОСЛЕ МЕДИА-АУДИТА</span></div><div class="co-stage-copy"><span id="stageNo">01</span><h3 id="stageTitle">${stages[0][0]}</h3><p id="stageText">${stages[0][1]}</p><div class="co-stage-line"><b></b></div><small>Каждый следующий этап уточняет предыдущий — без универсального шаблона.</small></div></div></div>`)}

        ${section("audience","co-audience","03 · Партнёры","Для кого мы работаем","Выберите тип задачи — интерфейс покажет, какую роль может занять MMW-COMPANY.",
          `<div class="co-audience-layout"><div class="co-audience-nav">${Object.keys(audiences).map((x,i)=>`<button class="${i===0?"active":""}" data-audience="${x}">${x}</button>`).join("")}</div><div class="co-audience-card"><span class="co-audience-mark">MMW / ${Object.keys(audiences)[0]}</span><h3 id="audTitle">${audiences[Object.keys(audiences)[0]][0]}</h3><p id="audText">${audiences[Object.keys(audiences)[0]][1]}</p><div class="co-audience-arrow">01 <span>→</span> PROJECT MODEL</div></div></div>`)}

        ${section("international","co-international","04 · Принцип","Профессиональный контур","Проекты могут развиваться в разных странах. Юридическая, финансовая, налоговая и регуляторная структура определяется отдельно для каждой юрисдикции.",
          `<div class="co-principles">${["Прозрачность","Ответственность","Документированная экономика","Поэтапная реализация","Проверяемые данные","Разделение ролей","Управление рисками","Локальная экспертиза"].map((x,i)=>`<button class="co-principle" data-principle="${i}"><span>0${i+1}</span><strong>${x}</strong><i>+</i></button>`).join("")}</div><div class="co-principle-detail" id="principleDetail">Выберите принцип, чтобы увидеть его практический смысл для проекта.</div>`)}

        ${section("portfolio","co-portfolio","05 · Портфель","Проекты MMW-COMPANY","Представленные проекты — действующие концептуальные направления портфеля. Концепт не означает запущенный объект или подтверждённую сделку.",
          `<div class="co-portfolio-filter"><button class="active" data-filter="all">Все</button><button data-filter="Недвижимость">Недвижимость</button><button data-filter="Инфраструктура">Инфраструктура</button><button data-filter="Гостеприимство и природный туризм">Гостеприимство</button><button data-filter="Агропроизводственная инфраструктура">Агро</button><button data-filter="Энергетическая и промышленная инфраструктура">Энергетика</button></div><div class="co-project-grid" id="projectGrid">${companyProjects.map((p,i)=>`<a class="co-project-card" data-type="${p[2]}" href="#/project/${p[0]}"><div class="co-project-img" style="background-image:url('${p[3]}')"></div><div class="co-project-body"><span>CONCEPT · 0${i+1}</span><h3>${p[1]}</h3><p>${p[2]}</p><b>Открыть проект <i>↗</i></b></div></a>`).join("")}</div>`)}

        ${section("new-projects","co-catalog","06 · Каталог возможностей","Возможные новые проекты","Выберите направление или сформируйте собственную задачу. Каталог не ограничивает возможности MMW-COMPANY.",
          `<div class="co-catalog-tools"><label><span>Поиск направления</span><input id="catalogSearch" type="search" placeholder="Например: logistics, hotel, energy"></label><div class="co-catalog-count" id="catalogCount">19 направлений</div></div><div class="co-new-grid" id="newGrid">${newProjects.map((p,i)=>`<button class="co-new-card" data-search="${(p[0]+" "+p[1]+" "+p[2]).toLowerCase()}"><span>0${String(i+1).padStart(2,"0")}</span><strong>${p[0]}</strong><em>${p[1]}</em><p>${p[2]}</p><i>Развернуть ↗</i></button>`).join("")}</div><div class="co-custom"><div><span class="co-kicker">CUSTOM PROJECT</span><h3>Есть собственная возможность?</h3><p>Предложите актив, идею, бизнес или ресурс. Мы определим потенциальную структуру и следующий шаг.</p></div><a class="co-btn co-btn-primary" href="#contact">Предложить задачу</a></div>`)}

        ${section("system","co-system","07 · Единый подход","Что объединяет проекты","У каждого проекта своя аудитория, архитектура, экономика и модель реализации. Единым остаётся способ превращать возможность в управляемый проект.",
          `<div class="co-system-chain"><span>ВОЗМОЖНОСТЬ</span><i>→</i><span>ИССЛЕДОВАНИЕ</span><i>→</i><span>ПРОДУКТ</span><i>→</i><span>ЭКОНОМИКА</span><i>→</i><span>РЕАЛИЗАЦИЯ</span><i>→</i><span>УПРАВЛЕНИЕ</span></div><div class="co-system-statement"><strong>Разные проекты.<br><em>Одна дисциплина развития.</em></strong><p>Мы не продаём заранее заданный пакет услуг. Мы собираем проектный контур вокруг конкретной возможности.</p></div>`)}

        <section id="contact" class="co-contact"><div class="co-wrap co-contact-grid"><div><span class="co-kicker">08 · Следующий шаг</span><h2>Если у вас есть<br><em>возможность.</em></h2><p>Земля. Объект. Бизнес. Идея. Инфраструктура. Производственный ресурс. Инвестиционный капитал. Рыночная задача.</p><p class="co-contact-lead">Следующий вопрос — <strong>что из этого можно создать.</strong></p></div><div class="co-contact-card"><span>MMW-COMPANY</span><strong>Развитие проектов<br>от возможности до результата.</strong><a href="mailto:itimchenko00@gmail.com">itimchenko00@gmail.com</a><button class="co-copy" data-copy="itimchenko00@gmail.com">Скопировать email</button></div></div></section>
      </div>`;

    bind();
  }

  function bind(){
    document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>document.querySelector(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"})));
    document.querySelectorAll(".co-sector-tab").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.sector;document.querySelectorAll(".co-sector-tab").forEach(x=>x.classList.toggle("active",x===b));document.querySelector(".co-sector-index").textContent="0"+(i+1);document.getElementById("sectorTitle").textContent=sectors[i][0];document.getElementById("sectorText").textContent=sectors[i][1];}));
    document.querySelectorAll(".co-stage").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.stage;document.querySelectorAll(".co-stage").forEach(x=>x.classList.toggle("active",x===b));document.getElementById("stageNo").textContent="0"+(i+1);document.getElementById("stageTitle").textContent=stages[i][0];document.getElementById("stageText").textContent=stages[i][1];}));
    document.querySelectorAll("[data-audience]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.audience;document.querySelectorAll("[data-audience]").forEach(x=>x.classList.toggle("active",x===b));document.querySelector(".co-audience-mark").textContent="MMW / "+k;document.getElementById("audTitle").textContent=audiences[k][0];document.getElementById("audText").textContent=audiences[k][1];}));
    const principleTexts=["Понятные решения, исходные данные и зоны ответственности внутри проекта.","Ответственность распределяется между участниками по роли и этапу, а не размывается внутри команды.","Ключевые финансовые предпосылки фиксируются и проверяются до принятия решений.","Большой проект разбивается на управляемые этапы с понятными контрольными точками.","Решения опираются на доступные факты, а предположения обозначаются как предположения.","Собственник, инвестор, проектировщик, подрядчик и оператор не подменяют функции друг друга.","Риски выявляются до реализации и сопровождаются мерами контроля.","Международная модель дополняется экспертизой конкретной страны и локации."];
    document.querySelectorAll("[data-principle]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".co-principle").forEach(x=>x.classList.toggle("active",x===b));document.getElementById("principleDetail").textContent=principleTexts[+b.dataset.principle];}));
    document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));const f=b.dataset.filter;document.querySelectorAll(".co-project-card").forEach(c=>c.hidden=f!=="all"&&c.dataset.type!==f);}));
    const search=document.getElementById("catalogSearch"); search?.addEventListener("input",()=>{const q=search.value.toLowerCase().trim();let n=0;document.querySelectorAll(".co-new-card").forEach(c=>{const ok=!q||c.dataset.search.includes(q);c.hidden=!ok;if(ok)n++;});document.getElementById("catalogCount").textContent=n+" "+(n===1?"направление":"направлений");});
    document.querySelectorAll(".co-new-card").forEach(c=>c.addEventListener("click",()=>c.classList.toggle("open")));
    document.querySelectorAll(".co-copy").forEach(b=>b.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent="Email скопирован";setTimeout(()=>b.textContent="Скопировать email",1600)}catch(e){location.href="mailto:"+b.dataset.copy}}));
  }

  window.renderMMWCompany = render;
  if (!location.hash || location.hash==="#" || location.hash==="#/") render();
  window.addEventListener("hashchange",()=>{if(!location.hash||location.hash==="#"||location.hash==="#/") render();});
})();