/* ЕДИНСТВО — интерактивный клиентский прототип.
 * Данные сохраняются только в localStorage этого браузера.
 * Это не серверная социальная сеть и не система аутентификации.
 */
(function () {
  'use strict';
  const KEY = 'edinstvo.localPrototype.v1';
  const modules = ['Аккаунт', 'Контент', 'Связи', 'Общение', 'Сообщества', 'Безопасность'];
  const icons = {
    'Аккаунт':'Личный профиль и его редактирование',
    'Контент':'Локальная лента, публикации, реакции и комментарии',
    'Связи':'Демо-каталог людей и локальные отметки связей',
    'Общение':'Локальные заметки-переписка для проверки интерфейса',
    'Сообщества':'Каталог и создание сообществ в этом браузере',
    'Безопасность':'Черновые настройки приватности на этом устройстве'
  };
  const seed = {
    profile:{name:'Мой профиль',handle:'@мой-профиль',bio:'Расскажите немного о себе.',visibility:'friends'},
    posts:[{id:'welcome',author:'ЕДИНСТВО',text:'Добро пожаловать в интерактивный прототип. Здесь можно проверить основные сценарии — данные пока хранятся только в этом браузере.',createdAt:new Date().toISOString(),likes:[],comments:[]}],
    connections:[],
    messages:[],
    communities:[
      {id:'ideas',name:'Идеи и инициативы',description:'Обсуждаем полезные идеи и совместные проекты.',members:12,joined:false},
      {id:'culture',name:'Культура и творчество',description:'Книги, искусство, музыка и новые открытия.',members:8,joined:false},
      {id:'neighborhood',name:'Соседи и взаимопомощь',description:'Локальные инициативы и помощь друг другу.',members:15,joined:false}
    ],
    privacy:{profile:'friends',discoverable:true,notifications:true}
  };
  function load(){
    try { const saved=JSON.parse(localStorage.getItem(KEY)); if(saved&&saved.profile&&Array.isArray(saved.posts)) return Object.assign({},structuredClone(seed),saved); } catch(e) {}
    return structuredClone(seed);
  }
  let state=load(), active='Аккаунт';
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){alert('Не удалось сохранить данные в этом браузере.');}};
  const id=()=>Math.random().toString(36).slice(2,10);
  const root=document.createElement('section');
  root.id='unity-app';
  root.hidden=true;
  root.innerHTML='<style>'+
    '#unity-app{position:relative;z-index:10;margin:22px auto 42px;width:min(1160px,calc(100% - 44px));color:var(--ink)}'+
    '#unity-app *{box-sizing:border-box} .ua-shell{border:1px solid var(--line);background:rgba(255,255,255,.34);box-shadow:0 18px 50px rgba(23,45,53,.08)}'+
    '.ua-top{padding:20px 22px;background:var(--ink);color:var(--paper);display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.ua-top h2{font:500 29px Georgia,serif;margin:0 0 5px}.ua-top p{margin:0;color:#c0d6d1;font-size:13px}.ua-close{background:transparent;color:var(--paper);border:1px solid #789195;padding:9px 12px;cursor:pointer;border-radius:9px}'+
    '.ua-warning{padding:12px 22px;background:#fff5dd;border-bottom:1px solid #e5d4a9;font-size:12px;line-height:1.55;color:#574b32}.ua-warning strong{display:block;margin-bottom:2px}'+
    '.ua-tabs{display:flex;gap:7px;padding:14px 18px;border-bottom:1px solid var(--line);overflow-x:auto}.ua-tab{flex:0 0 auto;padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:transparent;color:var(--ink);cursor:pointer;font-size:12px}.ua-tab[aria-selected=true]{background:var(--sea);color:white;border-color:var(--sea)}'+
    '.ua-body{padding:22px;min-height:230px}.ua-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.ua-card{padding:18px;border:1px solid var(--line);background:rgba(255,255,255,.45);min-width:0}.ua-card h3{font:500 21px Georgia,serif;margin:0 0 10px}.ua-muted{color:var(--muted);font-size:13px;line-height:1.6}.ua-form{display:grid;gap:12px}.ua-form label{display:grid;gap:6px;font-size:12px;font-weight:700}.ua-input,.ua-textarea,.ua-select{width:100%;border:1px solid rgba(23,45,53,.23);border-radius:9px;padding:11px 12px;background:#fffdf7;color:var(--ink);font:inherit;font-size:14px}.ua-textarea{min-height:90px;resize:vertical}.ua-btn{border:1px solid var(--ink);background:var(--ink);color:var(--paper);padding:10px 14px;border-radius:9px;cursor:pointer;font-weight:700;font-size:12px}.ua-btn.secondary{background:transparent;color:var(--ink);border-color:var(--line)}.ua-row{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.ua-post{padding:17px 0;border-bottom:1px solid var(--line)}.ua-post:last-child{border-bottom:0}.ua-posthead{display:flex;justify-content:space-between;gap:10px;font-size:12px;margin-bottom:10px}.ua-posttext{white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.65;font-size:14px}.ua-comment{margin:9px 0 0 12px;padding-left:10px;border-left:2px solid var(--gold);font-size:12px;line-height:1.5}.ua-chip{display:inline-block;padding:4px 8px;border-radius:100px;background:rgba(40,107,112,.1);color:var(--sea);font-size:11px}.ua-empty{padding:18px;border:1px dashed var(--line);color:var(--muted);font-size:13px;line-height:1.6}.ua-toggle{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:12px 0;border-bottom:1px solid var(--line);font-size:13px}.ua-toggle input{width:18px;height:18px;accent-color:var(--sea)}.ua-status{font-size:11px;color:var(--muted);margin-top:12px}@media(max-width:680px){#unity-app{width:calc(100% - 24px);margin:14px auto 28px}.ua-body{padding:13px}.ua-top{padding:17px}.ua-grid{grid-template-columns:1fr}.ua-tabs{padding:11px}.ua-warning{padding:11px 16px}}'+
  '</style><div class="ua-shell"><div class="ua-top"><div><h2 id="ua-title">Аккаунт</h2><p id="ua-subtitle"></p></div><button class="ua-close" type="button" data-action="close">Закрыть ×</button></div><div class="ua-warning"><strong>Режим интерактивного прототипа</strong>Изменения сохраняются только в локальном хранилище этого браузера. Другие люди их не увидят. Здесь пока нет регистрации, серверной базы, реальной отправки сообщений или защиты аккаунта.</div><nav class="ua-tabs" aria-label="Разделы приложения">'+modules.map(m=>'<button type="button" class="ua-tab" data-tab="'+m+'" aria-selected="false">'+m+'</button>').join('')+'</nav><div class="ua-body" id="ua-content"></div></div>';
  const header=document.querySelector('header.nav');
  if(header) header.insertAdjacentElement('afterend',root);
  const body=root.querySelector('#ua-content');
  function open(name){active=modules.includes(name)?name:'Аккаунт';root.hidden=false;root.querySelector('#ua-title').textContent=active;root.querySelector('#ua-subtitle').textContent=icons[active];root.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===active)));render();root.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  function close(){root.hidden=true;}
  function empty(msg){return '<div class="ua-empty">'+esc(msg)+'</div>';}
  function render(){
    root.querySelector('#ua-title').textContent=active;
    root.querySelector('#ua-subtitle').textContent=icons[active];
    if(active==='Аккаунт') body.innerHTML='<div class="ua-grid"><div class="ua-card"><h3>Ваш профиль</h3><p class="ua-muted">Черновик профиля, видимый только в этом браузере.</p><form class="ua-form" data-form="profile"><label>Отображаемое имя<input class="ua-input" name="name" maxlength="60" required value="'+esc(state.profile.name)+'"></label><label>Псевдоним<input class="ua-input" name="handle" maxlength="30" value="'+esc(state.profile.handle)+'"></label><label>О себе<textarea class="ua-textarea" name="bio" maxlength="500">'+esc(state.profile.bio)+'</textarea></label><label>Предпочитаемая видимость профиля<select class="ua-select" name="visibility"><option value="public" '+(state.profile.visibility==='public'?'selected':'')+'>Публичный (настройка-пример)</option><option value="friends" '+(state.profile.visibility==='friends'?'selected':'')+'>Только связи (настройка-пример)</option><option value="private" '+(state.profile.visibility==='private'?'selected':'')+'>Приватный (настройка-пример)</option></select></label><button class="ua-btn">Сохранить профиль</button></form></div><div class="ua-card"><h3>Сводка</h3><p><span class="ua-chip">Локальный профиль</span></p><p class="ua-muted">Публикаций: '+state.posts.length+'<br>Отмеченных связей: '+state.connections.length+'<br>Сообществ: '+state.communities.filter(c=>c.joined).length+'</p><p class="ua-muted">Здесь пока нет настоящей регистрации, подтверждения email, входа или восстановления доступа.</p><button class="ua-btn secondary" data-action="reset">Сбросить локальные данные</button></div></div>';
    if(active==='Контент') body.innerHTML='<div class="ua-grid"><div class="ua-card"><h3>Новая публикация</h3><form class="ua-form" data-form="post"><label>Текст публикации<textarea class="ua-textarea" name="text" maxlength="2000" required placeholder="Поделитесь мыслью или идеей…"></textarea></label><button class="ua-btn">Добавить в локальную ленту</button></form><p class="ua-status">Демо: публикация не отправляется в интернет.</p></div><div class="ua-card"><h3>Ваша лента</h3><p class="ua-muted">Публикации этого браузера, новые — сверху.</p></div></div><div class="ua-card" style="margin-top:14px"><h3>Публикации</h3>'+ (state.posts.length?state.posts.slice().reverse().map(p=>'<article class="ua-post"><div class="ua-posthead"><strong>'+esc(p.author)+'</strong><span>'+esc(new Date(p.createdAt).toLocaleString())+'</span></div><div class="ua-posttext">'+esc(p.text)+'</div><div class="ua-row" style="justify-content:flex-start;margin-top:12px"><button class="ua-btn secondary" data-action="like" data-id="'+esc(p.id)+'">♡ '+p.likes.length+'</button><button class="ua-btn secondary" data-action="delete-post" data-id="'+esc(p.id)+'">Удалить</button></div><form class="ua-row" data-form="comment" data-id="'+esc(p.id)+'" style="margin-top:10px"><input class="ua-input" name="text" maxlength="500" required placeholder="Написать комментарий…" style="flex:1;min-width:130px"><button class="ua-btn">Комментировать</button></form>'+(p.comments||[]).map(c=>'<div class="ua-comment"><strong>'+esc(c.author)+':</strong> '+esc(c.text)+'</div>').join('')+'</article>').join(''):empty('Пока нет публикаций. Создайте первую выше.'))+'</div>';
    if(active==='Связи') body.innerHTML='<div class="ua-card"><h3>Люди для знакомства</h3><p class="ua-muted">Это вымышленные карточки для проверки интерфейса, не реальные пользователи.</p><div class="ua-grid">'+[{id:'alex',name:'Александр',bio:'Интересуется технологиями и идеями.'},{id:'maria',name:'Мария',bio:'Любит творчество и совместные инициативы.'},{id:'danylo',name:'Даниил',bio:'Изучает культуру и городские проекты.'}].map(p=>'<article class="ua-card"><h3>'+p.name+'</h3><p class="ua-muted">'+p.bio+'</p><button class="ua-btn '+(state.connections.includes(p.id)?'secondary':'')+'" data-action="connect" data-id="'+p.id+'">'+(state.connections.includes(p.id)?'Отметка добавлена':'Добавить в связи')+'</button></article>').join('')+'</div><p class="ua-status">Связи хранятся локально. Запросы другим людям не отправляются.</p></div>';
    if(active==='Общение') body.innerHTML='<div class="ua-grid"><div class="ua-card"><h3>Локальный диалог</h3><p class="ua-muted">Проверка формы переписки. Сообщения не отправляются адресатам.</p><form class="ua-form" data-form="message"><label>Имя собеседника (демо)<input class="ua-input" name="to" maxlength="60" required placeholder="Например, Мария"></label><label>Сообщение<textarea class="ua-textarea" name="text" maxlength="1000" required placeholder="Введите тестовое сообщение…"></textarea></label><button class="ua-btn">Сохранить в этом браузере</button></form></div><div class="ua-card"><h3>Черновик переписки</h3>'+(state.messages.length?state.messages.slice().reverse().map(m=>'<div class="ua-post"><div class="ua-posthead"><strong>Для: '+esc(m.to)+'</strong><span>'+esc(new Date(m.createdAt).toLocaleString())+'</span></div><div class="ua-posttext">'+esc(m.text)+'</div><button class="ua-btn secondary" data-action="delete-message" data-id="'+esc(m.id)+'">Удалить</button></div>').join(''):empty('Сообщений пока нет. Создайте тестовую запись слева.'))+'</div></div>';
    if(active==='Сообщества') body.innerHTML='<div class="ua-grid"><div class="ua-card"><h3>Создать сообщество</h3><form class="ua-form" data-form="community"><label>Название<input class="ua-input" name="name" maxlength="70" required></label><label>Описание<textarea class="ua-textarea" name="description" maxlength="300" required></textarea></label><button class="ua-btn">Создать локально</button></form></div><div class="ua-card"><h3>Каталог</h3><p class="ua-muted">Примеры и созданные вами сообщества в этом браузере.</p></div></div><div class="ua-grid" style="margin-top:14px">'+state.communities.map(c=>'<article class="ua-card"><h3>'+esc(c.name)+'</h3><p class="ua-muted">'+esc(c.description)+'</p><p class="ua-muted">'+c.members+' участников в демо-карточке</p><button class="ua-btn '+(c.joined?'secondary':'')+'" data-action="join" data-id="'+esc(c.id)+'">'+(c.joined?'Вы отметили участие ✓':'Отметить участие')+'</button></article>').join('')+'</div><p class="ua-status">Участие не создаёт реального членства и не видно другим людям.</p>';
    if(active==='Безопасность') body.innerHTML='<div class="ua-grid"><div class="ua-card"><h3>Черновые настройки</h3><p class="ua-muted">Эти переключатели сохраняются только на устройстве и не защищают серверные данные.</p><label class="ua-toggle"><span>Разрешить показ профиля в демо-поиске</span><input type="checkbox" data-setting="discoverable" '+(state.privacy.discoverable?'checked':'')+'></label><label class="ua-toggle"><span>Показывать демо-уведомления</span><input type="checkbox" data-setting="notifications" '+(state.privacy.notifications?'checked':'')+'></label><label class="ua-form" style="margin-top:14px">Черновая видимость профиля<select class="ua-select" data-setting="profile"><option value="public" '+(state.privacy.profile==='public'?'selected':'')+'>Публичный</option><option value="friends" '+(state.privacy.profile==='friends'?'selected':'')+'>Только связи</option><option value="private" '+(state.privacy.profile==='private'?'selected':'')+'>Приватный</option></select></label></div><div class="ua-card"><h3>Что ещё не реализовано</h3><p class="ua-muted">Настоящая авторизация, управление сессиями, смена/восстановление пароля, блокировки, жалобы, роли модераторов, аудит и серверная проверка доступа.</p><p class="ua-muted">Не вводите здесь пароль, код доступа или другую секретную информацию. У прототипа нет системы аккаунтов.</p></div></div>';
  }
  root.addEventListener('click',function(e){
    const tab=e.target.closest('[data-tab]'); if(tab){open(tab.dataset.tab);return;}
    const action=e.target.closest('[data-action]'); if(!action)return;
    const a=action.dataset.action, item=action.dataset.id;
    if(a==='close'){close();return;}
    if(a==='reset'){if(confirm('Удалить локальные данные прототипа в этом браузере?')){localStorage.removeItem(KEY);state=load();render();}return;}
    if(a==='like'){const p=state.posts.find(x=>x.id===item);if(p){p.likes=p.likes.includes('local-user')?p.likes.filter(x=>x!=='local-user'):p.likes.concat('local-user');save();render();}return;}
    if(a==='delete-post'){state.posts=state.posts.filter(x=>x.id!==item);save();render();return;}
    if(a==='connect'){state.connections=state.connections.includes(item)?state.connections.filter(x=>x!==item):state.connections.concat(item);save();render();return;}
    if(a==='delete-message'){state.messages=state.messages.filter(x=>x.id!==item);save();render();return;}
    if(a==='join'){const c=state.communities.find(x=>x.id===item);if(c){c.joined=!c.joined;save();render();}return;}
  });
  root.addEventListener('change',function(e){const el=e.target;if(!el.dataset.setting)return;state.privacy[el.dataset.setting]=el.type==='checkbox'?el.checked:el.value;save();});
  root.addEventListener('submit',function(e){
    const form=e.target.closest('[data-form]');if(!form)return;e.preventDefault();const d=new FormData(form),type=form.dataset.form;
    if(type==='profile'){state.profile={name:String(d.get('name')).trim(),handle:String(d.get('handle')).trim(),bio:String(d.get('bio')).trim(),visibility:String(d.get('visibility'))};}
    if(type==='post'){state.posts.push({id:id(),author:state.profile.name||'Мой профиль',text:String(d.get('text')).trim(),createdAt:new Date().toISOString(),likes:[],comments:[]});}
    if(type==='comment'){const p=state.posts.find(x=>x.id===form.dataset.id);const text=String(d.get('text')).trim();if(p&&text)p.comments.push({author:state.profile.name||'Мой профиль',text});}
    if(type==='message'){state.messages.push({id:id(),to:String(d.get('to')).trim(),text:String(d.get('text')).trim(),createdAt:new Date().toISOString()});}
    if(type==='community'){state.communities.push({id:id(),name:String(d.get('name')).trim(),description:String(d.get('description')).trim(),members:1,joined:true});}
    save();render();
  });
  document.querySelectorAll('[data-module]').forEach(button=>button.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();open(button.dataset.module);},true));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!root.hidden)close();});
  // Provide a clean way back to the prototype after closing it.
  const openHash=()=>{const m=new URLSearchParams(location.search).get('section');if(modules.includes(m))open(m);};
  openHash();
})();