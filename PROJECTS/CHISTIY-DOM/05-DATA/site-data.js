// CHISTIY DOM — single source of truth for public calculator data.
// Working Factory data; publication remains subject to explicit promotion.
window.CHISTIY_DOM_DATA={
  prices:{
    clean:[
      ['Комплексне прибирання',170,'м²'],['Генеральне прибирання',90,'м²'],['Після ремонту',150,'м²'],
      ['Щоденне прибирання',55,'м²'],['Сухе прибирання',50,'м²'],['Вологе прибирання',60,'м²']
    ],
    care:[['Диван',1350,'шт'],['Крісло',230,'шт'],['Килими',150,'м²'],['Штори',80,'м²'],['Матрац',500,'шт']],
    glass:[['Вікна',90,'м²'],['Висотні роботи',235,'м²'],['Після будівництва',100,'м²'],['Фасади',70,'м²']],
    special:[['Озонування',700,'послуга'],['Після пожежі',200,'м²'],['Після потопу',200,'м²'],['Хімчистка авто',2200,'авто'],['Видалення грибка',200,'м²']]
  },
  quick:{
    'Генеральне':90,'Після ремонту':150,'Комплексне':170,'Щоденне':55
  },
  contacts:{kolomyia:'+380964563546',sniatyn:'+380992823398'}
};

// Interactive HOME / B2B / CARE / OUT navigation.
(()=>{
  const init=()=>{
    document.querySelectorAll('.stat[data-filter-target]').forEach(card=>{
      if(card.dataset.interactiveBound==='1') return;
      card.dataset.interactiveBound='1';
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      const activate=()=>{
        const target=card.dataset.filterTarget;
        document.querySelector('#services')?.scrollIntoView({behavior:'smooth',block:'start'});
        const tab=document.querySelector('.tab[data-filter="'+target+'"]');
        if(tab) tab.click();
      };
      card.addEventListener('click',activate);
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
    });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

// UNIQUE THEMATIC PHOTO LAYER — one meaning-specific image per system block, no repeats.
(()=>{
  const photos={
    s01:{label:'COMMAND CENTER · SERVICE CONTROL',url:'https://images.unsplash.com/photo-1783454832808-9ac0e4ba7181?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s02:{label:'HOME SYSTEM · PROFESSIONAL HOME CARE',url:'https://images.unsplash.com/photo-1759722668767-3f9cb7468b7b?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s03:{label:'BUSINESS SYSTEM · COMMERCIAL SPACE',url:'https://images.unsplash.com/photo-1763191213523-1489179a1088?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s04:{label:'TEXTILE LAB · TEXTILE CARE',url:'https://images.unsplash.com/photo-1763495195143-f3d6650630f9?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s05:{label:'OUTDOOR SYSTEM · WINDOWS & FACADES',url:'https://images.unsplash.com/photo-1760263299313-573f3cdfeb55?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s06:{label:'TECHNOLOGY BASE · PROFESSIONAL EQUIPMENT',url:'https://images.unsplash.com/photo-1782235869333-096a75594e57?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s07:{label:'GEO NETWORK · SERVICE TERRITORY',url:'https://images.unsplash.com/photo-1563558603156-1e0f5d0592a2?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s08:{label:'TRUST SYSTEM · PARTNERSHIP & CONTROL',url:'https://images.unsplash.com/photo-1565688837378-e42543f71ca5?auto=format&fit=crop&fm=jpg&q=82&w=1800'},
    s09:{label:'CONTACT SYSTEM · CLIENT SERVICE',url:'https://images.unsplash.com/photo-1771979788419-84487b12e3a0?auto=format&fit=crop&fm=jpg&q=82&w=1800'}
  };
  const css=document.createElement('style');
  css.textContent=`
    .thematic-photo{position:relative;width:100%;height:300px;margin:0 0 30px;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:#0d1a16}
    .thematic-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.82) contrast(1.02)}
    .thematic-photo:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,16,14,.08),rgba(7,16,14,.78));pointer-events:none}
    .thematic-photo span{position:absolute;z-index:2;left:20px;bottom:17px;color:#f1d28f;font:800 10px Manrope,sans-serif;letter-spacing:.15em;text-transform:uppercase}
    @media(max-width:600px){.thematic-photo{height:210px;margin-bottom:22px;border-radius:14px}.thematic-photo span{left:14px;bottom:13px;font-size:8px}}
  `;
  document.head.appendChild(css);
  const inject=()=>Object.entries(photos).forEach(([id,p])=>{
    const section=document.getElementById(id);
    if(!section||section.querySelector('.thematic-photo')) return;
    const photo=document.createElement('div');
    photo.className='thematic-photo';
    photo.innerHTML='<img loading="lazy" decoding="async" src="'+p.url+'" alt="'+p.label+'"><span>'+p.label+'</span>';
    const wrap=section.querySelector('.wrap');
    if(wrap) wrap.insertBefore(photo,wrap.firstChild);
  });
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',inject,{once:true});
  else inject();
})();
