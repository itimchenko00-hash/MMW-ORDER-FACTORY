const express=require('express');
const originalSend=express.response.send;

const PRODUCT_IDS={
  'BUSINESS CONCEPT':'business-concept',
  'BUSINESS PROJECT':'business-project',
  'BUSINESS SYSTEM':'business-system',
  'INVESTMENT PROJECT':'investment-project',
  'BUSINESS RESTART':'business-restart',
  'BUSINESS SALE':'business-sale',
  'BUSINESS + INVESTOR':'business-investor',
  'CUSTOM BUSINESS PROJECT':'custom-business-project',
  'LARGE SCALE':'large-scale'
};
const ORDER_URL='https://mmw-order.onrender.com/';
const LOCAL='/assets/MMW-COMPANY/photos/';

function restoreMissingProductImages(html){
  const swaps={
    'photo-1516321318423-f06f85e504b3-ee521ae19cba.jpg':'photo-1454165804606-c3d57bc86b40-ee521ae19cba.jpg',
    'photo-1497366811353-6870744d04b2-74dfa9521c9f.jpg':'photo-1497366811353-6870744d04b2-52aaa4b902a1.jpg',
    'photo-1504384308090-c894fdcc538d-9505e743aa3e.jpg':'photo-1504384308090-c894fdcc538d-c3b2c2711ef9.jpg',
    'photo-1551836022-d5d88e9218df-bbc5585e098a.jpg':'photo-1554224155-6726b3ff858f-bbc5585e098a.jpg'
  };
  for(const [broken,good] of Object.entries(swaps)) html=html.split(LOCAL+broken).join(LOCAL+good);
  return html;
}

function localizeProcessImages(html){
  const swaps={
    'photo-1522071820081-009f0129c71c':'photo-1497366754035-f200968a6e72-e27ad949c922',
    'photo-1517245386807-bb43f82c33c4':'photo-1517245386807-bb43f82c33c4-4681ea60bfa2',
    'photo-1542744173-8e7e53415bb0':'photo-1556761175-b413da4baf72-54886b3aabbb',
    'photo-1521791136064-7986c2920216':'photo-1554224155-6726b3ff858f-600c3f7500f5',
    'photo-1553484771-047a44eee27b':'photo-1553877522-43269d4ea984-efaae09e4491',
    'photo-1551434678-e076c223a692':'photo-1450101499163-c8848c66ca85-a1683e4494b0',
    'photo-1522202176988-66273c2fd55f':'photo-1556761175-5973dc0f32e7-f6d4c58e7202'
  };
  for(const [external,local] of Object.entries(swaps)) html=html.split('https://images.unsplash.com/'+external).join(LOCAL+local+'.jpg');
  return html;
}

function addOrderLinks(html){
  for(const [name,id] of Object.entries(PRODUCT_IDS)){
    const cardRe=new RegExp('(<(?:article|div)[^>]*class="[^"]*(?:product|card)[^"]*"[^>]*>[\\s\\S]*?<h3[^>]*>\\s*)'+name.replace(/[+]/g,'\\+')+'([\\s\\S]*?<a[^>]*class="btn(?: primary)?"[^>]*)(?:href="#package-request"|href="#vacancies"|href="[^"]*")([^>]*>)','i');
    html=html.replace(cardRe,(m,pre,button,tail)=>pre+name+button+'href="'+ORDER_URL+'?add='+encodeURIComponent(id)+'"'+tail.replace(/data-product-id="[^"]*"/g,'')+'');
  }
  html=html.replace(/href="#package-request">Получить расчёт/g,'href="'+ORDER_URL+'">Оформить заявку');
  html=html.replace(/href="#vacancies">Связаться с MMW-COMPANY/g,'href="'+ORDER_URL+'">Оформить заявку через MMW-ORDER');
  return html;
}

function vacanciesSection(){
  return `<section id="vacancies"><div class="wrap"><div class="head"><div><div class="eyebrow">Коммуникация</div><h2>Работаем вместе. <em>Строим проекты.</em></h2></div><p>Если вы хотите работать с MMW-COMPANY, присоединиться к проекту или предложить свою экспертизу — расскажите о себе.</p></div><div class="contact"><div class="panel"><div class="eyebrow">MMW-COMPANY</div><h3>Вакансии и партнёрство</h3><p class="notice">Мы формируем проектные команды под конкретные задачи: управление, финансы, строительство, девелопмент, продажи, маркетинг, IT, логистика и другие направления.</p><div class="noticeBox">Открытые позиции, требования и условия сотрудничества будут опубликованы здесь отдельно.</div></div><div class="panel"><form class="form" action="mailto:itimchenko00@gmail.com" method="post" enctype="text/plain"><input name="Имя" placeholder="Ваше имя" required><input name="Контакт" placeholder="Телефон / мессенджер" required><input name="Email" type="email" placeholder="Email"><input name="Направление" placeholder="Специализация / желаемая позиция"><textarea name="Сообщение" placeholder="Расскажите о себе, опыте и чем вы можете быть полезны проектам MMW-COMPANY"></textarea><button class="btn primary full" type="submit">Связаться с MMW-COMPANY →</button></form></div></div></div></section>`;
}

express.response.send=function(body){
  if(typeof body==='string' && body.includes('</body>') && body.includes('MMW-COMPANY')){
    body=restoreMissingProductImages(body);
    body=localizeProcessImages(body);
    body=addOrderLinks(body);
    body=body.replace(/<section id="package-request">[\s\S]*?<\/section>/g,vacanciesSection());
  }
  return originalSend.call(this,body);
};
