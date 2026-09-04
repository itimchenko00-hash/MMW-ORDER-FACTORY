const express=require('express');
const originalSend=express.response.send;

const P=id=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
const sets={
  urban:{title:'COMPACT URBAN',className:'BUDGET · STARTER',caption:'EXTERIOR · узкий городской townhouse · эффективный участок',imgs:[P(12008034),P(16059247),P(17274555),P(19026583),P(16880297),P(1530023),P(259588)],captions:['EXTERIOR · общий объём и городской фасад','ENTRY · приватный вход и фасад','KITCHEN · компактная рабочая зона','LIVING · светлая общая зона','BATHROOM · рациональная компактность','INTERIOR · единая логика малого пространства','DETAIL · эффективное использование площади']},
  scandi:{title:'SCANDINAVIAN',className:'STANDARD · COMFORT',caption:'EXTERIOR · дерево · скатная кровля · семейный характер',imgs:[P(35018313),P(31895796),P(8251299),P(6890403),P(33838523),P(2079246),P(1571460)],captions:['EXTERIOR · скандинавский townhouse и скатная кровля','ENTRY · дерево и тёплый приватный вход','KITCHEN · естественный свет и дерево','LIVING · спокойная семейная среда','BATHROOM · натуральные материалы','INTERIOR · скандинавская архитектурная палитра','DETAIL · дерево, свет и функциональность']},
  brick:{title:'CONTEMPORARY BRICK',className:'COMFORT · FAMILY',caption:'EXTERIOR · кирпич · тёмные рамы · терраса',imgs:[P(15522429),P(17463572),P(25857391),P(7028105),P(31057548),P(323780),P(280222)],captions:['EXTERIOR · кирпичная архитектура и общий объём','ENTRY · тёмные рамы и приватный вход','KITCHEN · современная семейная кухня','LIVING · пространство для семьи','BATHROOM · современная отделка','INTERIOR · кирпич как часть характера дома','DETAIL · терраса, рамы и материал фасада']},
  med:{title:'MEDITERRANEAN',className:'BUSINESS · RESORT',caption:'EXTERIOR · штукатурка · террасы · солнцезащита',imgs:[P(10135256),P(38791657),P(5223143),P(37692742),P(23880098),P(221047),P(164077)],captions:['EXTERIOR · светлый объём и террасы','ENTRY · солнцезащита и входная зона','KITCHEN · indoor / outdoor сценарий','LIVING · связь интерьера с террасой','BATHROOM · курортная атмосфера','INTERIOR · средиземноморская пластика','DETAIL · тень, терракота и открытое пространство']},
  modern:{title:'MODERN MINIMAL',className:'PREMIUM · DESIGN',caption:'EXTERIOR · чистая геометрия · стекло · дерево',imgs:[P(30484316),P(30278097),P(19916702),P(11018249),P(6588594),P(1105754),P(186077)],captions:['EXTERIOR · минималистичный общий объём','ENTRY · чистая геометрия и приватность','KITCHEN · строгая функциональная линия','LIVING · открытое пространство и стекло','BATHROOM · минималистичная отделка','INTERIOR · архитектурная сдержанность','DETAIL · стекло, дерево и точность линий']},
  graphite:{title:'PREMIUM GRAPHITE',className:'SIGNATURE · PREMIUM',caption:'EXTERIOR · графит · металл · панорамное остекление',imgs:[P(26654777),P(6538943),P(5883733),P(8142459),P(36030607),P(280229),P(323705)],captions:['EXTERIOR · флагманский графитовый объём','ENTRY · металл и премиальный вход','KITCHEN · premium kitchen environment','LIVING · панорамное остекление','BATHROOM · premium material palette','INTERIOR · luxury character и архитектурный свет','DETAIL · металл, стекло и точность исполнения']}
};

express.response.send=function(body){
  if(typeof body==='string'&&body.includes('ALADIN RESIDENCE')&&body.includes('const sets=')){
    body=body.replace(/const sets=\{[\s\S]*?\};let currentSet/,`const sets=${JSON.stringify(sets)};let currentSet`);
    body=body.replace("caption.textContent=currentSet.caption;","caption.textContent=currentSet.captions[0];");
    body=body.replace("count.textContent=`${currentIndex+1} / ${currentSet.imgs.length}`;","caption.textContent=currentSet.captions[currentIndex]||currentSet.caption;count.textContent=`${currentIndex+1} / ${currentSet.imgs.length}`;");
    body=body.replace('Каждый набор содержит 5 уникальных изображений: фасад, другой ракурс, вход/терраса, среда и интерьер.','Каждый набор содержит 7 уникальных изображений: EXTERIOR, ENTRY, KITCHEN, LIVING, BATHROOM, INTERIOR и DETAIL.');
  }
  return originalSend.call(this,body);
};
