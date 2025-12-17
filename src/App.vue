<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from './components/Header.vue'

const activeTab = ref('soviet')

const sections = {
  soviet: 'section-soviet',
  transition: 'section-transition',
  modern: 'section-modern',
  people: 'section-people'
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleSelectTab(tabId) {
  activeTab.value = tabId
  const sectionId = sections[tabId]
  if (sectionId) scrollToSection(sectionId)
}

const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        const id = entry.target.id
        const map = {
          'section-soviet': 'soviet',
          'section-transition': 'transition',
          'section-modern': 'modern',
          'section-people': 'people'
        }

        const newTab = map[id]
        if (newTab && newTab !== activeTab.value) {
          activeTab.value = newTab
        }
      }
    },
    {
      root: null,
      threshold: 0.0,
      // верх секции считается «активным», когда пересёк линию на 30% от верха
      rootMargin: '-30% 0px -70% 0px'
    }
)
onMounted(() => {
  Object.values(sections).forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  observer.disconnect()
})

const timelineMarks = [
  { id: 'section-soviet', label: '1950–1991', mapTo: 'soviet' },
  { id: 'section-transition', label: '1991–2019', mapTo: 'transition' },
  { id: 'section-modern', label: '2017–2025', mapTo: 'modern' },
  { id: 'section-people', label: 'Личности', mapTo: 'people' }
]

</script>

<template>
  <div class="app">
    <Header :active-tab="activeTab" @select-tab="handleSelectTab" />

    <main class="layout">
      <aside class="timeline">
        <div class="timeline__line"></div>
        <ul class="timeline__list">
          <li
              v-for="item in timelineMarks"
              :key="item.id"
              class="timeline__item"
              :class="{ 'timeline__item--active': activeTab === item.mapTo }"
              @click="scrollToSection(item.id)"
          >
            <span class="timeline__dot"></span>
            <span class="timeline__year">{{ item.label }}</span>
          </li>
        </ul>
      </aside>

      <section class="content">
        <section id="section-soviet" class="block">
          <h2 class="block__title">Советский период (1950–1991)</h2>
          <p class="block__lead">
            Формирование советской школы кибернетики, первые нейросети и работы Ивахненко, Бонгарда, Галушкина.
          </p>
        </section>

        <section id="section-transition" class="block">
          <h2 class="block__title">Переходные годы (1991–2019)</h2>
          <p class="block__lead">
            Экономический кризис, спад финансирования науки и постепенное восстановление с ростом ИТ‑компаний.
          </p>
        </section>

        <section id="section-modern" class="block">
          <h2 class="block__title">Современный этап (2017–2025)</h2>
          <p class="block__lead">
            Эра голосовых ассистентов и больших языковых моделей: Алиса, YandexGPT, GigaChat и другие системы.
          </p>
        </section>

        <section id="section-people" class="block">
          <h2 class="block__title">Ключевые личности</h2>
          <p class="block__lead">
            Учёные и инженеры, которые сформировали российскую традицию исследований в области нейросетей и ИИ.
          </p>
        </section>
      </section>
    </main>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #020617;
}

/* Корневой контейнер: всегда минимум на высоту экрана */
.app {
  min-height: 100vh;
  width: 100%;
  background: #020617;
  color: #e5e7eb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Основная сетка: на десктопе 2 колонки, на мобиле 1 */
.layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 32px;
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 24px 32px 40px;
  box-sizing: border-box;
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 12px 8px 20px;    /* было 16px 12px 24px */
  }

  .block {
    padding: 20px 12px;        /* было 24px 16px */
    min-height: auto;
  }
}

@media (max-width: 900px) {
  .timeline {
    position: static;
    height: auto;
    padding: 8px 0 0;
  }
}

/* Левая колонка с линией времени */
.timeline {
  position: sticky;
  top: 70px;
  align-self: flex-start;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  position: relative;
}

@media (max-width: 900px) {
  .timeline {
    display: none;
  }
}
.timeline.desktop {
  display: flex;
}

.timeline.mobile {
  display: none;
}

/* МОБИЛА: горизонтальная стрелка */
@media (max-width: 900px) {
  .timeline.desktop {
    display: none;
  }

  .timeline.mobile {
    display: block;
    width: 100%;
  }
}

.timeline__line {
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #1f2937;
}

.timeline__list {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.timeline__item {
  position: relative;
  padding-left: 22px;
  cursor: pointer;
}

.timeline__item--active .timeline__dot {
  background: #22c55e;
}

.timeline__item--active .timeline__year {
  color: #e5e7eb;
  font-weight: 600;
}

.timeline__dot {
  position: absolute;
  left: 7px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #3b82f6;
}

.timeline__year {
  font-size: 13px;
  color: #9ca3af;
}

/* Правый контент */
.content {
  width: 100%;
  box-sizing: border-box;
}

/* Блок периода */
.block {
  width: 100%;
  box-sizing: border-box;
  padding: 32px 24px;
  margin-bottom: 24px;
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.08), transparent 60%),
  radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.1), transparent 55%),
  #020617;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.8);
  min-height: 70vh;
}

.block__title {
  font-size: 24px;
  margin: 0 0 8px;
}

.block__lead {
  margin: 0 0 24px;
  color: #9ca3af;
  font-size: 14px;
}

.header__left {
  min-width: 0;
  cursor: pointer;          /* указатель-рука */
}

.header__left:hover .header__name {
  text-decoration: underline;
}

</style>
