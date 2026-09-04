// ALADIN FACTORY — COMPACT URBAN only
// Real architectural reference photography. This override intentionally touches only data-set="urban".
(function(){
  const urbanCard=document.querySelector('.tgCard[data-set="urban"] img');
  if(urbanCard){urbanCard.src='https://images.pexels.com/photos/10628470/pexels-photo-10628470.jpeg?auto=compress&cs=tinysrgb&w=1400';urbanCard.alt='Compact urban townhouse architectural reference';}
  if(typeof sets!=='undefined' && sets.urban){
    sets.urban.imgs=[
      {url:'https://images.pexels.com/photos/10628470/pexels-photo-10628470.jpeg?auto=compress&cs=tinysrgb&w=1800',label:'Экстерьер · компактный городской townhouse · архитектурный референс'},
      {url:'https://images.pexels.com/photos/20989867/pexels-photo-20989867.jpeg?auto=compress&cs=tinysrgb&w=1800',label:'Фасад / вход · приватный городской вход · архитектурный референс'},
      {url:'https://images.pexels.com/photos/15576709/pexels-photo-15576709.jpeg?auto=compress&cs=tinysrgb&w=1800',label:'Кухня · компактная функциональная планировка · архитектурный референс'},
      {url:'https://images.pexels.com/photos/19899071/pexels-photo-19899071.jpeg?auto=compress&cs=tinysrgb&w=1800',label:'Гостиная · светлая компактная жилая среда · архитектурный референс'},
      {url:'https://images.pexels.com/photos/19857270/pexels-photo-19857270.jpeg?auto=compress&cs=tinysrgb&w=1800',label:'Ванная · эффективное использование площади · архитектурный референс'},
      {url:'https://images.pexels.com/photos/12008034/pexels-photo-12008034.jpeg?auto=compress&cs=tinysrgb&w=1800',label:'Второй внешний ракурс · городской townhouse · архитектурный референс'}
    ];
  }
})();
