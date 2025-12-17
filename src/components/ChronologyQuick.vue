<template>
  <section class="section">
    <h2 class="section__title">Краткая хронология</h2>
    <p class="section__text">
      Здесь будет краткий обзор ключевых событий: от первых советских ЭВМ до современных нейросетей YandexGPT и GigaChat.
    </p>

    <ul class="timeline">
      <li v-for="item in items" :key="item.year" class="timeline__item">
        <div class="timeline__year">{{ item.year }}</div>
        <div class="timeline__content">
          <h3 class="timeline__title">{{ item.title }}</h3>
          <p class="timeline__desc">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const items = [
  { year: '1948', title: 'Рождение советской информатики', desc: 'Регистрация первого авторского свидетельства на цифровую вычислительную машину.' },
  { year: '1959', title: 'Машина «Альфа»', desc: 'Алексей Ивахненко создаёт одну из первых нейросетей — собственный перцептрон.' },
  { year: '1974', title: 'Книга Галушкина', desc: 'Выходит монография о многослойных системах распознавания образов — фактически ранняя теория глубоких сетей.' },
  { year: '2017', title: 'Появление Алисы', desc: 'Яндекс запускает голосового ассистента на базе нейросетей.' },
  { year: '2023–2025', title: 'Эра больших моделей', desc: 'Появляются YandexGPT, GigaChat и другие крупные российские нейросети.' }
]
</script>

<style scoped>
.section {
  margin-top: 40px;
}

.section__title {
  font-size: 24px;
  margin-bottom: 12px;
}

.section__text {
  color: #9ca3af;
  margin-bottom: 24px;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 2px solid #334155;
}

.timeline__item {
  position: relative;
  padding: 12px 0 12px 20px;
}

.timeline__item::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 16px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #3b82f6;
}

.timeline__year {
  font-weight: 600;
  color: #e5e7eb;
}

.timeline__title {
  margin: 4px 0;
  font-size: 16px;
}

.timeline__desc {
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
}
</style>
