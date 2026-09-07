from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent
PDF = ROOT / 'PDF'
INDEX = ROOT / 'INDEX'
PDF.mkdir(parents=True, exist_ok=True)
INDEX.mkdir(parents=True, exist_ok=True)

font_candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf',
]
font_bold_candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf',
]
for p in font_candidates:
    if os.path.exists(p):
        pdfmetrics.registerFont(TTFont('MMWSans', p)); break
else:
    raise RuntimeError('Unicode font not found')
for p in font_bold_candidates:
    if os.path.exists(p):
        pdfmetrics.registerFont(TTFont('MMWSansBold', p)); break
else:
    raise RuntimeError('Unicode bold font not found')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='MMWTitle', fontName='MMWSansBold', fontSize=22, leading=27, alignment=TA_CENTER, spaceAfter=18))
styles.add(ParagraphStyle(name='MMWH1', fontName='MMWSansBold', fontSize=15, leading=19, spaceBefore=10, spaceAfter=8))
styles.add(ParagraphStyle(name='MMWH2', fontName='MMWSansBold', fontSize=11.5, leading=15, spaceBefore=7, spaceAfter=5))
styles.add(ParagraphStyle(name='MMWBody', fontName='MMWSans', fontSize=9.3, leading=13, spaceAfter=5))
styles.add(ParagraphStyle(name='MMWSmall', fontName='MMWSans', fontSize=7.7, leading=10))
styles.add(ParagraphStyle(name='MMWNote', fontName='MMWSans', fontSize=8.2, leading=11, leftIndent=8, rightIndent=8, spaceBefore=5, spaceAfter=8))

LEGAL = [
    'Гражданский кодекс Украины — договорные отношения, имущество, обязательства и ответственность; применять в актуальной редакции.',
    'Хозяйственный кодекс Украины — учитывать применимость и актуальную редакцию в части хозяйственных отношений.',
    'Закон Украины «О регулировании градостроительной деятельности» №3038-VI — градостроительная подготовка и строительство.',
    'Закон Украины «Об архитектурной деятельности» №687-XIV — проектирование, авторство и профессиональная деятельность.',
    'Закон Украины «Об охране труда» №2694-XII — система охраны труда и безопасная организация работ.',
    'Кодекс гражданской защиты Украины — пожарная и техногенная безопасность, эвакуация и реагирование.',
    'Закон Украины «О рынке электрической энергии» №2019-VIII — для энергетических проектов и операций с электроэнергией.',
    'Закон Украины «Об автомобильном транспорте» №2344-III — для транспортно-логистической деятельности.',
    'Закон Украины №771/97-ВР о безопасности и качестве пищевых продуктов — для пищевого блока и HoReCa.',
    'При применении HACCP: действующие требования к процедурам, программам-предпосылкам, документации и записям.',
    'Постановление КМУ №681 — учитывать электронные процессы и сведения Единой государственной электронной системы в сфере строительства (ЄДЕССБ), когда применимо.',
    'ДБН, ДСТУ, ПУЭ/ПТЕ и отраслевые нормы — подбираются по конкретному объекту, назначению, классу последствий и технологии.',
]

COMMON = [
    ('1. Статус документа', [
        'Разработано MMW-COMPANY как master-package для READY-TO-SELL BUSINESS PROJECT.',
        'Проект разработан MMW-COMPANY; реализация, строительство, запуск и эксплуатация выполняются покупателем, инвестором, оператором или партнером.',
        'Документ является исходной/организационно-технической основой и не является разрешением на строительство, экспертным заключением, лицензией или рабочей проектной документацией.',
    ]),
    ('2. Паспорт проекта', [
        'Идентификатор проекта; версия; дата; собственник/заказчик; предполагаемая площадка; целевой продукт; модель владения/эксплуатации; ответственные роли.',
        'Зафиксировать исходные допущения, границы проекта, исключения и перечень данных, которые должны быть подтверждены до инвестирования.',
    ]),
    ('3. Юридический контур', [
        'Проверить правовой статус компании/оператора, право на землю/объект, целевое назначение, ограничения, сервитуты, обременения, кадастровые и реестровые сведения.',
        'Определить разрешительный маршрут: проектирование, технические условия, экспертиза/согласования, уведомления/разрешения, ввод/приемка — по фактическим параметрам проекта.',
        'Сформировать реестр разрешений, сроков действия, ответственных лиц и доказательств получения.',
    ]),
    ('4. Техническое задание', [
        'Назначение объекта/системы; производительность; режимы работы; требования к качеству; надежность; энергоэффективность; безопасность; автоматизация; сервисопригодность.',
        'Зафиксировать исходные данные, расчетные нагрузки, интерфейсы, границы поставки и критерии приемки.',
    ]),
    ('5. Проектно-технический состав', [
        'Генплан/планировка и функциональное зонирование — при применимости.',
        'Архитектурные и конструктивные решения — при применимости.',
        'Электроснабжение, освещение, заземление, молниезащита и резервирование — при применимости.',
        'ВК/канализация/горячая вода, отопление, вентиляция, кондиционирование — при применимости.',
        'Слаботочные системы, IT, связь, безопасность, контроль доступа, CCTV, диспетчеризация.',
        'Спецификации оборудования и материалов, ведомости объемов, паспорта и инструкции производителей.',
    ]),
    ('6. Эксплуатационная документация', [
        'Регламенты запуска/остановки, ежедневные/еженедельные/ежемесячные осмотры, планово-предупредительное обслуживание.',
        'Журналы эксплуатации, дефектов, аварий, ТО, поверок/испытаний, обучения персонала и инструктажей.',
        'SOP для ключевых процессов, KPI и контрольных точек.',
    ]),
    ('7. Договорный пакет', [
        'Договор заказчика с проектировщиком/консультантом; техническое задание как приложение.',
        'Договоры проектирования, обследований, строительства/монтажа, поставки, пусконаладки, технического и авторского надзора — по применимости.',
        'Эксплуатационные, сервисные, страховые, транспортные, IT и партнерские договоры — по модели проекта.',
    ]),
    ('8. HSE / пожарная / экологическая безопасность', [
        'Матрица опасностей и рисков; инструкции по охране труда; обучение и допуски.',
        'План эвакуации и реагирования; пожарные системы; аварийное отключение; средства первой помощи.',
        'Отходы, выбросы, вода, шум, химические вещества и другие воздействия — оценить по фактической технологии.',
    ]),
    ('9. Испытания, ввод и передача', [
        'FAT/SAT или иные приемочные испытания для оборудования/систем, если применимо.',
        'Протоколы испытаний инженерных систем, электрики, автоматики, связи и технологической линии — по применимости.',
        'Акт приемки/передачи, исполнительная документация, паспорта, гарантии, инструкции, обучение оператора.',
    ]),
    ('10. Data Room', [
        '01 Corporate; 02 Land/Property; 03 Legal DD; 04 Design; 05 Engineering; 06 Equipment; 07 Contracts; 08 Finance; 09 HSE/Environment; 10 Operations; 11 Sales; 12 Permits; 13 Acceptance.',
        'Каждый файл должен иметь владельца, дату, версию, статус: DRAFT / FOR REVIEW / APPROVED / EXPIRED / SUPERSEDED.',
    ]),
    ('11. Матрица готовности', [
        'Юридический блок — проверен/не проверен; земля/объект — подтвержден/не подтвержден; проектирование — готово/в работе; ТУ — получены/нет; разрешения — получены/нет; HSE — готово/нет; контракты — готовы/нет; приемка — готова/нет.',
        'Критический gate: нельзя считать проект готовым к реализации без подтверждения юридических прав, технической реализуемости, бюджета, разрешительного маршрута и ответственных исполнителей.',
    ]),
    ('12. Лист согласований', [
        'Заказчик/владелец проекта: ____________________',
        'Технический руководитель: ____________________',
        'Юрист/комплаенс: ____________________',
        'Ответственный за HSE: ____________________',
        'Финансовый руководитель: ____________________',
        'Дата/версия: ____________________',
    ]),
]

PROJECTS = {
'ALADIN': {
 'title':'ALADIN — DEVELOPMENT / RESIDENTIAL PROJECT',
 'purpose':'Комплексный девелоперский продукт: анализ земли → продукт → архитектура → инженерия → экономика → строительство → продажи → передача/эксплуатация → масштабирование.',
 'params':['Демонстрационная модель: 1 800 м² продаваемой площади; 52 000 грн/м²; 72% продаж.','Демонстрационные затраты строительства: 36 773 грн/м² плюс земля, инфраструктура, soft costs, маркетинг, финансирование и 7% резерв.','Экономика является демонстрационной feasibility-моделью и не является гарантией доходности.'],
 'tech':['Land Due Diligence: кадастр, право, целевое назначение, ограничения, подъезды, сети.','Генплан, транспорт, вертикальная планировка, дренаж и благоустройство.','Архитектура, конструктив, кровля, фасады, энергоэффективность.','Водоснабжение/канализация, отопление, вентиляция/кондиционирование, электроснабжение.','Низковольтные системы, домофония/контроль доступа, пожарная безопасность, наружные сети.','Матрица отделочных материалов, оборудования и инженерных спецификаций.','Energy concept, расчет нагрузок и эксплуатационных расходов.'],
 'legal':['Корпоративные документы заказчика и модель владения проектом.','Право на земельный участок/объект, кадастровые данные, ограничения и legal DD.','Градостроительные исходные данные, технические условия и проектирование по установленному маршруту.','Определение класса последствий и состава проектной документации; экспертиза/согласования — когда требуются.','Организация авторского/технического надзора, исполнительной документации и ввода/приемки.','Договоры с проектировщиками, изыскателями, подрядчиками, поставщиками, надзором и коммунальными организациями.','Документы продажи/предварительные договоры — только после юридической проверки конкретного объекта.'],
 'ops':['Паспорт объекта и инженерных систем.','O&M manuals, графики ТО, гарантийный учет.','Регламент передачи объекта покупателю/оператору.','Дефектная ведомость, warranty claims и maintenance register.']},
'CARPATHIA': {
 'title':'CARPATHIA — HOSPITALITY & EXPERIENCE PLATFORM',
 'purpose':'Платформа карпатского гостеприимства: размещение + wellness + локальная еда + маршруты + B2B-retreats + события + трансферы + партнерская сеть.',
 'params':['Каталог включает Eco Lodge, Family Lodge, Wellness Day/Retreat, food, routes, events, transfers и corporate retreat.','Цены каталога являются коммерческими предположениями и требуют site-specific validation.','Финансовая модель должна дополнительно подтвердить occupancy, ADR, OPEX, CAPEX и сезонность.'],
 'tech':['Генплан территории, подъезды, парковка, освещение, снег/вода/отходы.','Размещение: архитектура, номера/домики, санузлы, HVAC, электрика, резервное питание.','Пожарная сигнализация, оповещение, эвакуация и аварийное освещение.','Кухня: технологический поток, хранение, холод, мойка, санитарные зоны и оборудование.','Wellness/SPA: бассейн/сауна/процедуры, водоподготовка, вентиляция, санитария.','PMS/booking, Wi-Fi, CCTV, контроль доступа, платежная и персональная data-инфраструктура.','Трансфер: транспорт, стоянка, маршруты и связь.'],
 'legal':['Право на землю/недвижимость и назначение использования.','Правовая модель размещения и обслуживания гостей.','Пищевая безопасность и HACCP для пищевого блока, если применяется.','Пожарная, трудовая, экологическая и санитарная безопасность.','Wellness/SPA требования — по конкретным услугам и оборудованию.','Договоры размещения/booking, поставки еды, трансферов, корпоративных клиентов, туроператоров и партнеров.','Страхование имущества, ответственности и транспорта — по рискам.'],
 'ops':['Housekeeping SOP, check-in/out, maintenance.','Food safety records, sanitation schedules, supplier approval.','Wellness sanitation and equipment logs.','Emergency response, guest incident and complaint register.']},
'AGROHUB': {
 'title':'AGROHUB — AGRO INFRASTRUCTURE & PROCESSING',
 'purpose':'Инфраструктурная платформа: приемка → лабораторный контроль → очистка/сушка → хранение → переработка → упаковка → продажа.',
 'params':['Демонстрация: 800 т/мес сырья; 72% выход; 576 т готового продукта; 14 500 грн/т продажа.','Сырье 6 800 грн/т; переработка 1 800 грн/т; value uplift 1.472 млн грн/мес до прочих расходов.','Это contribution/demo economics, а не EBITDA и не гарантированная прибыль.'],
 'tech':['Схема участка и логистических потоков без пересечения чистых/грязных потоков.','Весовая, лаборатория, приемка, пробоотбор и идентификация партий.','Очистка, сушка, нории/конвейеры, аспирация и хранение.','Технологическая линия переработки, дозирование, упаковка и маркировка.','Электроснабжение, автоматика, PLC/SCADA, аварийный stop.','Вентиляция, пылеулавливание, пожарная/взрывная безопасность по технологии.','Резервное питание критических систем, водоснабжение и канализация.'],
 'legal':['Земля и допустимое промышленное/складское использование.','Проектирование/строительство и ввод — по фактическим параметрам объекта.','Пищевая безопасность, HACCP, прослеживаемость партий и лабораторный контроль, если производится пищевой продукт.','Охрана труда, пожарная и взрывная безопасность, отходы и экологические требования.','Метрология, поверка весов и средств измерений, требования к качеству/маркировке.','Договоры поставки сырья, хранения/переработки, продажи готового продукта, сервис оборудования и вывоза отходов.'],
 'ops':['Process instructions, sanitation and HACCP records.','Incoming raw material acceptance, grading and traceability.','Equipment maintenance and LOTO procedures.','Batch yield/loss/quality dashboard and incident register.']},
'ENERGY-PARK': {
 'title':'ENERGY-PARK — RENEWABLE ENERGY GENERATION',
 'purpose':'Концепция солнечной/возобновляемой генерации с собственным потреблением и реализацией излишков при наличии соответствующей технической и договорной модели.',
 'params':['Демонстрация: 800 kW; 1 050 kWh/kW-year; 840 000 kWh/year.','Self-use 571 200 kWh; surplus 268 800 kWh; demonstration realization 45% at 7.2 грн/kWh.','Gross value demonstration ≈4.98 млн грн/year; не EBITDA, не гарантированная выручка и требует актуальной модели рынка.'],
 'tech':['Топосъемка, инсоляция, затенение и планировочная схема PV.','DC strings, combiner boxes, inverters, AC collection, transformer/substation.','Protection, grounding, lightning protection, cable routes and fire safety.','Commercial and technical metering, monitoring/SCADA and communication.','Grid studies, protection settings and interface with distribution system.','BESS — только если предусмотрена отдельным ТЗ.','O&M access, cleaning, vegetation control and emergency shutdown.'],
 'legal':['Земля и допустимое использование под энергетический объект.','Градостроительные/строительные исходные данные и проектирование.','Технические условия присоединения и договорный grid-connection route.','Электробезопасность, коммерческий учет и режим реализации электроэнергии.','Правила рынка электроэнергии и актуальная договорная модель surplus realization.','EPC/design, equipment supply, grid connection, O&M, insurance and warranty contracts.'],
 'ops':['Plant passport and equipment passports.','O&M manual, inspection schedule and electrical test records.','Generation/outage/curtailment log.','Warranty and spare-parts register.']},
'NEXUS LOGISTICS': {
 'title':'NEXUS LOGISTICS — TRANSPORT & LOGISTICS OPERATIONS',
 'purpose':'Операционная логистическая система: контракт → заказ → маршрут → транспорт/партнер → dispatch → перевозка → POD → счет → контроль utilization и margin.',
 'params':['Демонстрация: 90 маршрутов × 28 000 грн × 78% = 1 965 600 грн revenue.','Variable route cost: 90 × 420 km × 19 грн = 718 200 грн.','Contribution ≈1 247 400 грн; margin ≈63.4%; это contribution economics, не EBITDA.'],
 'tech':['TMS/CRM/ERP интеграция заказов, тарифов, dispatch и billing.','GPS/telematics, электронный POD, контроль ETA и геозон.','Проверка транспорта/перевозчиков, страхования и документов.','Fleet maintenance, fuel control, tire and downtime registers — для собственного парка.','Backup communication and incident escalation.','Dashboard: revenue/route, грн/km, utilization, delay, claim, contribution margin.'],
 'legal':['Модель собственного парка и/или договорных перевозчиков.','Закон Украины «Об автомобильном транспорте» и применимые требования к перевозкам.','Проверка разрешений для конкретных грузов/маршрутов, если требуется.','Документы водителей и транспорта, страхование, ответственность и claims.','Опасные/специальные грузы — отдельная compliance-процедура при применимости.','Договор перевозки, заявка на перевозку, договор перевозчика/экспедирования, SLA B2B, TMS/GPS и страховые договоры.','Персональные данные клиентов/водителей — отдельный privacy/security контур.'],
 'ops':['Dispatcher SOP and order confirmation.','Carrier verification and pre-trip controls.','Delay/accident/loss/damage escalation.','POD closure, invoice release and daily/weekly margin reporting.']},
'NEXUS WORK': {
 'title':'NEXUS WORK — FLEXIBLE WORK / OPERATING SPACE',
 'purpose':'Гибкое рабочее пространство, монетизирующее м² через occupancy, memberships, meeting rooms и сервисное сопровождение.',
 'params':['Демонстрация: 2 500 м² × 650 грн/м² × 72% occupancy × 1.12 uplift ≈1.31 млн грн/мес gross revenue.','OPEX/NOI требуют подтверждения конкретным объектом, арендой, коммунальными расходами и staffing.','Финансовая модель является демонстрационной.'],
 'tech':['Zoning/capacity plan, evacuation routes and occupancy limits.','Electrical load, lighting, HVAC and air-quality monitoring.','Internet/Wi-Fi with backup, network segmentation and UPS for critical equipment.','Access control, CCTV and visitor management.','Meeting-room AV, booking system, service desk and incident logging.','Acoustics, ergonomics, furniture and accessibility — по объекту.'],
 'legal':['Правовой статус объекта, право собственности/аренды и допустимое использование.','Техническое обследование и ограничения по перепланировке/реконструкции.','Пожарная безопасность и эвакуация.','CCTV, access control and personal data/privacy.','Вывески/реклама и локальные требования объекта.','Lease/sublease/management, membership/workspace agreement, meeting room rental, corporate SLA, telecom, security, cleaning and technical maintenance contracts.'],
 'ops':['Opening/closing checklist.','Housekeeping and technical maintenance.','Access and visitor control.','Service desk/SLA, complaints and incidents.','Monthly occupancy, ARPU, churn, utilities and cost control.']},
}

def esc(s):
    return str(s).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def footer(canvas, doc):
    canvas.saveState(); canvas.setFont('MMWSans', 7); canvas.drawString(42, 25, 'MMW-COMPANY | FACTORY | LEGAL & TECHNICAL DOCUMENTATION | 08.09.2026')
    canvas.drawRightString(553, 25, f'стр. {doc.page}')
    canvas.restoreState()

def build_project(key, data):
    fn = PDF / f'MMW_{key.replace(" ","_").replace("-","_")}_LEGAL_TECHNICAL_DOCUMENTATION_2026.pdf'
    doc = SimpleDocTemplate(str(fn), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=44, bottomMargin=38, title=data['title'], author='MMW-COMPANY')
    story=[]
    story += [Spacer(1,55), Paragraph('MMW-COMPANY', styles['MMWTitle']), Paragraph(esc(data['title']), styles['MMWTitle']), Spacer(1,12), Paragraph('ЮРИДИЧЕСКИЙ И ТЕХНИЧЕСКИЙ ПАКЕТ ПРОЕКТА', styles['MMWTitle']), Spacer(1,20), Paragraph('READY-TO-SELL BUSINESS PROJECT • MASTER DOCUMENTATION PACK • VERSION 2026.09', styles['MMWBody']), Spacer(1,25), Paragraph('Проект разработан MMW-COMPANY и предлагается для приобретения/реализации. Реализация выполняется покупателем, инвестором, оператором или партнером.', styles['MMWNote']), Paragraph('Статус: MASTER / TEMPLATE / FOR ADAPTATION. Не является разрешением, экспертным заключением или рабочей проектной документацией.', styles['MMWNote']), PageBreak()]
    story += [Paragraph('0. Назначение и границы', styles['MMWH1']), Paragraph(esc(data['purpose']), styles['MMWBody'])]
    story += [Paragraph('Ключевые исходные параметры', styles['MMWH2'])]
    for x in data['params']: story.append(Paragraph('• '+esc(x), styles['MMWBody']))
    story += [Paragraph('Юридическая оговорка', styles['MMWH2']), Paragraph('Правовой блок сформирован как master-checklist. Перед сделкой/строительством/запуском необходимо провести актуальный legal DD и подтвердить конкретный разрешительный маршрут по месту, объекту, виду деятельности, классу последствий и технологии.', styles['MMWNote'])]
    for title, bullets in COMMON:
        story.append(Paragraph(title, styles['MMWH1']))
        for x in bullets: story.append(Paragraph('• '+esc(x), styles['MMWBody']))
    story += [PageBreak(), Paragraph('13. Проектный юридический пакет', styles['MMWH1'])]
    for x in LEGAL: story.append(Paragraph('□ '+esc(x), styles['MMWBody']))
    story += [Paragraph('14. Проектный технический пакет', styles['MMWH1'])]
    for x in data['tech']: story.append(Paragraph('□ '+esc(x), styles['MMWBody']))
    story += [Paragraph('15. Специальный операционный пакет', styles['MMWH1'])]
    for x in data['ops']: story.append(Paragraph('□ '+esc(x), styles['MMWBody']))
    story += [Paragraph('16. Специальный юридический контур проекта', styles['MMWH1'])]
    for x in data['legal']: story.append(Paragraph('□ '+esc(x), styles['MMWBody']))
    story += [PageBreak(), Paragraph('17. Реестр обязательных документов', styles['MMWH1'])]
    rows=[['№','Документ/артефакт','Владелец','Статус','Проверка']]
    docs=['Corporate / UBO / полномочия','Право на землю/объект и реестры','Legal DD / ограничения','Исходные технические данные','Техническое задание','Проектные решения / рабочая документация','Технические условия / присоединения','Спецификации оборудования','Договоры проектирования/поставки/подряда','HSE / пожарная / экологическая документация','Испытания / протоколы','Исполнительная документация','Паспорта / инструкции / гарантии','Акты приемки/передачи','O&M / SOP / журналы','Страхование / claims','Data Room index']
    for i,d in enumerate(docs,1): rows.append([str(i),d,'Назначается','DRAFT','□'])
    t=Table(rows, colWidths=[28,235,90,65,55], repeatRows=1)
    t.setStyle(TableStyle([('FONTNAME',(0,0),(-1,-1),'MMWSans'),('FONTNAME',(0,0),(-1,0),'MMWSansBold'),('FONTSIZE',(0,0),(-1,-1),7.2),('LEADING',(0,0),(-1,-1),9),('GRID',(0,0),(-1,-1),0.3,colors.grey),('BACKGROUND',(0,0),(-1,0),colors.lightgrey),('VALIGN',(0,0),(-1,-1),'TOP'),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white, colors.whitesmoke])]))
    story += [t, Spacer(1,12), Paragraph('Статусы: DRAFT → FOR REVIEW → APPROVED → ACTIVE. Просроченные или замененные версии должны быть помечены EXPIRED / SUPERSEDED.', styles['MMWNote'])]
    story += [Paragraph('18. Приемка и readiness gate', styles['MMWH1'])]
    gates=['Право на объект подтверждено','Разрешительный маршрут определен','Техническая реализуемость подтверждена','Проектная/рабочая документация определена','Бюджет и источник финансирования подтверждены','Подрядчики/поставщики определены','HSE и пожарные меры определены','Испытания и критерии приемки определены','O&M и ответственные определены','Data Room собран и индексирован']
    for g in gates: story.append(Paragraph('□ '+esc(g)+' — доказательство: ______________________________', styles['MMWBody']))
    story += [Paragraph('19. Матрица передачи', styles['MMWH1'])]
    for g in ['Документы и версии','Паспорта оборудования','Исполнительные схемы','Протоколы испытаний','Гарантии и контакты сервисов','Инструкции оператора','Обучение персонала','Акты и закрывающие документы']:
        story.append(Paragraph('□ '+esc(g)+' — передано: ______ дата: ______ ответственный: ______', styles['MMWBody']))
    story += [Paragraph('20. Лист согласований', styles['MMWH1'])]
    for role in ['Заказчик/владелец','Project Manager','Technical Lead','Юрист/Compliance','HSE','Финансовый руководитель','Оператор']:
        story.append(Paragraph(f'{role}: ______________________________   Дата: __________   Подпись: __________', styles['MMWBody']))
    story += [Spacer(1,12), Paragraph('Источники нормативного направления', styles['MMWH1'])]
    for src in ['https://zakon.rada.gov.ua/laws/show/3038-17','https://zakon.rada.gov.ua/laws/show/687-14','https://zakon.rada.gov.ua/laws/show/2019-19','https://zakon.rada.gov.ua/laws/show/2344-III','https://zakon.rada.gov.ua/laws/show/771/97-вр']:
        story.append(Paragraph(esc(src), styles['MMWSmall']))
    story += [Spacer(1,8), Paragraph('Перед применением проверить текущую редакцию нормативных актов, локальные требования и специальные нормы для конкретного объекта/технологии.', styles['MMWNote'])]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return fn

for key,data in PROJECTS.items(): build_project(key,data)

index_pdf = INDEX / 'MMW_PROJECT_LEGAL_TECHNICAL_DOCUMENTATION_INDEX_2026.pdf'
doc = SimpleDocTemplate(str(index_pdf), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=44, bottomMargin=38, title='MMW-COMPANY Project Legal Technical Documentation Index')
story=[Spacer(1,45),Paragraph('MMW-COMPANY',styles['MMWTitle']),Paragraph('PROJECT LEGAL & TECHNICAL DOCUMENTATION',styles['MMWTitle']),Paragraph('MASTER INDEX • 08.09.2026',styles['MMWBody']),Spacer(1,18)]
rows=[['№','Проект','PDF','Статус']]
for i,key in enumerate(PROJECTS,1):
    fn=f'MMW_{key.replace(" ","_").replace("-","_")}_LEGAL_TECHNICAL_DOCUMENTATION_2026.pdf'
    rows.append([str(i),key,fn,'MASTER / TEMPLATE'])
t=Table(rows,colWidths=[28,115,285,90],repeatRows=1)
t.setStyle(TableStyle([('FONTNAME',(0,0),(-1,-1),'MMWSans'),('FONTNAME',(0,0),(-1,0),'MMWSansBold'),('FONTSIZE',(0,0),(-1,-1),7.2),('GRID',(0,0),(-1,-1),0.3,colors.grey),('BACKGROUND',(0,0),(-1,0),colors.lightgrey),('VALIGN',(0,0),(-1,-1),'TOP')]))
story += [t,Spacer(1,15),Paragraph('Комплект создан отдельной папкой Factory. Визуальные HTML-проекты и защищенные/консервированные репозитории не изменяются.',styles['MMWNote']),Paragraph('Документы предназначены для дальнейшей адаптации под конкретный объект, площадку, технологию, договорную модель и действующее законодательство Украины.',styles['MMWNote'])]
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print('Generated:', len(list(PDF.glob('*.pdf')))+1, 'PDF files')