<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__name">История нейросетей в России</div>
        <div class="header__subtitle">Проект по истории России</div>
      </div>

      <nav class="nav">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav__btn"
            :class="{ 'nav__btn--active': tab.id === activeTab }"
            @click="$emit('select-tab', tab.id)"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: 'soviet'
  }
})

const tabs = [
  { id: 'soviet',      label: 'Советский период' },
  { id: 'transition',  label: 'Переходные годы' },
  { id: 'modern',      label: 'Современность' },
  { id: 'people',      label: 'Ключевые люди' }
]
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(2, 6, 23, 0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(30, 64, 175, 0.5);
}

.header__inner {
  max-width: 100%;
  margin: 0;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header__left {
  min-width: 0;
}

.header__name {
  font-size: 15px;
  font-weight: 600;
}

.header__subtitle {
  font-size: 11px;
  color: #9ca3af;
}

.nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav__btn {
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav__btn:hover {
  border-color: rgba(96, 165, 250, 0.7);
  background: rgba(15, 23, 42, 1);
}

.nav__btn--active {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-color: transparent;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.5);
}

@media (max-width: 768px) {
  .header__inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .header__name {
    font-size: 15px;
  }
}
</style>
