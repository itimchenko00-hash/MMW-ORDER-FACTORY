# MMW Factory — Canonical Project Media Contract

Дата: 2026-10-07

## Единая цепочка
WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → PROJECT MEDIA MAP → CANONICAL RENDERER → SEMANTIC PLACEMENT → ROUTE → SERVER ASSET DELIVERY → QA → LIVE.

## Правила
- Проект использует локальные assets; runtime-внешние изображения запрещены.
- Каждый проект имеет один канонический SPA route вида #/project/<id>.
- Legacy HTML routes только перенаправляют на канонический route и не содержат отдельную копию страницы.
- Hero и карточки используют media map проекта; renderer не должен ссылаться на несуществующий файл.
- Фото не считаются импортированными до проверки фактического пути, renderer и server delivery.
- QA обязан проверять syntax, наличие локальных файлов, отсутствие runtime external image URLs и наличие renderer/media map для каждого проекта.

## Единый стандарт
Полная обязательная спецификация всех проектов: `MMW-FACTORY/MEDIA-STANDARD-ALL-PROJECTS-2026-10-07.md`.

MMW-COMPANY — эталон рабочей реализации медиапротокола; остальные проекты обязаны использовать тот же технический контракт без проектных исключений.

## Контрольная точка
Backup: BACKUP-MEDIA-ARCHITECTURE-PRE-FIX-2026-10-07
