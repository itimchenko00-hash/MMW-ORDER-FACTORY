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
