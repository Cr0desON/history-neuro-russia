<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from './components/Header.vue'

const activeTab = ref('soviet')

const sections = {
  soviet: 'section-soviet-start',
  transition: 'section-transition-start',
  modern: 'section-modern-start',
  people: 'section-people'
}

function scrollToElement(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleSelectTab(tabId) {
  activeTab.value = tabId
  const sectionId = sections[tabId]
  if (sectionId) scrollToElement(sectionId)
}

// переход к человеку из текста
function scrollToPerson(personId) {
  activeTab.value = 'people'
  // сначала доскроллим к блоку «Ключевые личности», затем к конкретному человеку
  requestAnimationFrame(() => {
    scrollToElement('section-people')
    setTimeout(() => scrollToElement(personId), 300)
  })
}

// карта id секций, которые слушаем, -> вкладка
const observedSectionsMap = {
  'section-soviet-start': 'soviet',
  'card-1948': 'soviet',
  'card-1950-mesm': 'soviet',
  'card-1950-m1': 'soviet',
  'card-1952-m2': 'soviet',
  'card-1952-besm1': 'soviet',
  'card-1958-m20': 'soviet',
  'card-1959-alpha': 'soviet',
  'card-bongard-programs': 'soviet',
  'card-1961-kora': 'soviet',
  'card-1961-1970-komarovo': 'soviet',
  'card-1963-glushkov': 'soviet',
  'card-1965-1980-situation': 'soviet',
  'card-1971-1973-galushkin': 'soviet',
  'card-1974-monograph': 'soviet',
  'card-1980s': 'soviet',

  'section-transition-start': 'transition',
  'card-1992-neurocomputer': 'transition',
  'card-1991-2000-winter': 'transition',
  'card-2000-2010-recovery': 'transition',
  'card-2010-2019-pre-deeplearning': 'transition',

  'section-modern-start': 'modern',
  'card-2017-alice': 'modern',
  'card-2019-strategy': 'modern',
  'card-2020-2023-natasha': 'modern',
  'card-2021-balaboba': 'modern',
  'card-2023-yandexgpt12': 'modern',
  'card-2023-gigachat': 'modern',
  'card-2024-yandexgpt3-neuro': 'modern',
  'card-2025-yandexgpt4': 'modern',

  'section-people': 'people'
}

let observer

onMounted(() => {
  observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          const newTab = observedSectionsMap[id]
          if (newTab && newTab !== activeTab.value) {
            activeTab.value = newTab
          }
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-30% 0px -70% 0px'
      }
  )

  Object.keys(observedSectionsMap).forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// точки таймлайна – только для карточек, помеченных (в таймлайн)
const timelineMarks = [
  { id: 'card-1948', label: '1948', mapTo: 'soviet', position: 6 },
  { id: 'card-1950-mesm', label: '1950', mapTo: 'soviet', position: 13 },
  { id: 'card-1952-m2', label: '1952', mapTo: 'soviet', position: 20 },
  { id: 'card-1958-m20', label: '1958', mapTo: 'soviet', position: 27 },
  { id: 'card-1959-alpha', label: '1959', mapTo: 'soviet', position: 34 },
  { id: 'card-1961-kora', label: '1961', mapTo: 'soviet', position: 41 },
  { id: 'card-1963-glushkov', label: '1963', mapTo: 'soviet', position: 48 },
  { id: 'card-1965-1980-situation', label: '1965–1980', mapTo: 'soviet', position: 55 },
  { id: 'card-1971-1973-galushkin', label: '1971–1973', mapTo: 'soviet', position: 62 },
  { id: 'card-1974-monograph', label: '1974', mapTo: 'soviet', position: 69 },
  { id: 'card-1980s', label: '1980‑е', mapTo: 'soviet', position: 76 },

  { id: 'card-1992-neurocomputer', label: '1992', mapTo: 'transition', position: 83 },
  { id: 'card-2010-2019-pre-deeplearning', label: '2010–2019', mapTo: 'transition', position: 90 },

  { id: 'card-2017-alice', label: '2017', mapTo: 'modern', position: 97 },
  // остальные современные годы будут сменяться по мере прокрутки, но без новых точек,
  // чтобы не перегружать линию
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
              :class="{ 'timeline__item--active': activeTab === item.mapTo && item.id === item.id }"
              :style="{ top: item.position + '%' }"
              @click="scrollToElement(item.id)"
          >
            <span class="timeline__dot"></span>
            <span class="timeline__year">{{ item.label }}</span>
          </li>
        </ul>
      </aside>

      <section class="content">
        <!-- ===== СОВЕТСКИЙ ПЕРИОД ===== -->
        <div id="section-soviet-start"></div>

        <!-- Карточка 1 — 1948 -->
        <section id="card-1948" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1948 — 4 декабря: рождение советской информатики</h2>
              <p>
                Государственный комитет Совета Министров СССР официально зарегистрировал авторское свидетельство на
                изобретение И.&nbsp;С. Бруком и Б.&nbsp;И. Рамеевым автоматической цифровой вычислительной машины.
              </p>
              <p>
                Это событие считается днём рождения советской информатики: без развития вычислительной техники развитие
                нейросетей было бы невозможно.
              </p>
              <p>
                В Лаборатории электросистем Энергетического института АН СССР под руководством
                <button class="person-link" @click="scrollToPerson('person-brook')">И.&nbsp;С. Брука</button>
                инженер Б.&nbsp;И. Рамеев разработал проект цифровой электронной вычислительной машины.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 1</div>
              <p class="block__photo-caption">Рождение советской информатики (1948)</p>
            </div>
          </div>
        </section>

        <!-- Карточка 2 — 1950 МЭСМ -->
        <section id="card-1950-mesm" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1950 — первые советские ЭВМ: МЭСМ</h2>
              <p>
                МЭСМ (Малая электронная счётная машина) разработана
                <button class="person-link" @click="scrollToPerson('person-lebedev')">Сергеем Алексеевичем Лебедевым</button>
                в Киевском институте электротехники АН УССР и стала первой советской ЭВМ и одной из первых в мире.
              </p>
              <ul>
                <li>6000 электронных ламп;</li>
                <li>производительность около 3000 операций в секунду;</li>
                <li>потребление 25&nbsp;кВт и размер около 60&nbsp;м²;</li>
                <li>первые задачи — баллистические расчёты для ракет.</li>
              </ul>
              <p>
                МЭСМ показала, что СССР способен создавать конкурентоспособные вычислительные системы.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 2</div>
              <p class="block__photo-caption">МЭСМ</p>
            </div>
          </div>
        </section>

        <!-- Карточка 4 — М-1 -->
        <section id="card-1950-m1" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">АЦВМ М‑1 — первое поколение отечественных компьютеров</h2>
              <p>
                АЦВМ М‑1 разработана
                <button class="person-link" @click="scrollToPerson('person-brook')">И.&nbsp;С. Бруком</button>
                в Лаборатории электросистем ЭНИН АН СССР в Москве. Работы начались в октябре 1950 года, а ввод в
                эксплуатацию состоялся в январе 1952 года.
              </p>
              <p>
                М‑1 стала первой в мире ЭВМ, логические схемы которой были построены на полупроводниковых приборах
                (купроксные выпрямители вместо радиоламп). По производительности машина была сравнима с МЭСМ и
                использовалась для расчётов в космических программах и ядерных исследованиях.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 3</div>
              <p class="block__photo-caption">АЦВМ М‑1</p>
            </div>
          </div>
        </section>

        <!-- Карточка 5 — 1952 М-2 -->
        <section id="card-1952-m2" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1952 — М‑2: следующее поколение</h2>
              <p>
                М‑2 была разработана М.&nbsp;А. Карцевым под руководством
                <button class="person-link" @click="scrollToPerson('person-brook')">И.&nbsp;С. Брука</button>.
                Работы начались весной 1952 года, а в эксплуатацию машина была введена в 1953 году.
              </p>
              <p>
                Производительность М‑2 составляла около 2000 операций сложения в секунду, что стало значительным ростом
                по сравнению с М‑1. ЭВМ применялась для расчётов в энергетике, ядерной физике и баллистике и стала
                первой машиной, активно используемой в прикладных исследованиях.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 4</div>
              <p class="block__photo-caption">М‑2</p>
            </div>
          </div>
        </section>

        <!-- Карточка 6 — БЭСМ-1 -->
        <section id="card-1952-besm1" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1952 — БЭСМ‑1: первая советская суперЭВМ</h2>
              <p>
                БЭСМ‑1 была разработана
                <button class="person-link" @click="scrollToPerson('person-lebedev')">С.&nbsp;А. Лебедевым</button>
                как первая советская суперЭВМ. Первая модель появилась в 1952 году.
              </p>
              <ul>
                <li>около 2000 электронных ламп;</li>
                <li>производительность до 8000 операций в секунду;</li>
                <li>на момент создания — одна из самых мощных машин в континентальной Европе.</li>
              </ul>
              <p>
                В 1952–1957 годах совершенствовались носители оперативной памяти, а серия БЭСМ развивалась ещё многие годы,
                демонстрируя амбициозность советской науки.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 5</div>
              <p class="block__photo-caption">БЭСМ‑1</p>
            </div>
          </div>
        </section>

        <!-- Карточка 7 — 1958 М-20 -->
        <section id="card-1958-m20" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1958 — М‑20</h2>
              <p>
                К началу 1958 года коллектив под руководством
                <button class="person-link" @click="scrollToPerson('person-lebedev')">С.&nbsp;А. Лебедева</button>
                создал ЭВМ М‑20 с производительностью около 20&nbsp;тысяч операций в секунду.
              </p>
              <p>
                М‑20 применялась в ядерной физике, ракетно‑космической отрасли, метеорологии, а также в образовании.
                Машина была принята с оценкой «самая быстродействующая в мире» и показала, что советская техника может
                конкурировать с западными аналогами при меньшей аппаратной сложности.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 6</div>
              <p class="block__photo-caption">М‑20</p>
            </div>
          </div>
        </section>

        <!-- Карточка 8 — 1959 Ивахненко -->
        <section id="card-1959-alpha" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1959 — Алексей Ивахненко и машина «Альфа»</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-ivakhnenko')">Алексей Григорьевич Ивахненко</button>
                — советский учёный в области автоматического управления и кибернетики. В 1959 году он собрал и испытал
                собственную версию перцептрона — машину «Альфа», названную в честь α‑перцептрона Розенблатта.
              </p>
              <ul>
                <li>одна из первых практических реализаций нейросети в мире;</li>
                <li>создана независимо от западных проектов, таких как «Марк‑1» Розенблатта;</li>
                <li>показала, что в СССР можно получать оригинальные результаты в области ИИ.</li>
              </ul>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 7</div>
              <p class="block__photo-caption">Машина «Альфа»</p>
            </div>
          </div>
        </section>

        <!-- Карточка 9 — программы Бонгарда -->
        <section id="card-bongard-programs" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">Михаил Бонгард и обучающиеся программы</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-bongard')">Михаил Бонгард</button>
                разработал обучающие программы «Арифметика» и «Геометрия», ориентированные на решение арифметических
                задач и распознавание геометрических фигур.
              </p>
              <p>
                Эти программы показали практическое применение нейросетевых идей и способность машин обучаться на
                примерах.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 8</div>
              <p class="block__photo-caption">Программы Бонгарда</p>
            </div>
          </div>
        </section>

        <!-- Карточка 10 — 1961 КОРА -->
        <section id="card-1961-kora" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1961 — алгоритм «КОРА»</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-bongard')">Михаил Бонгард</button>
                создал систему «КОРА» для поиска дискриминантных правил в задачах классификации образов.
              </p>
              <ul>
                <li>система искала дискриминантные правила после построения операторов признаков;</li>
                <li>могла самообучаться на примерах;</li>
                <li>использовала упрощённые математические модели.</li>
              </ul>
              <p>
                «КОРА» успешно применялась в геологии для выявления нефтеносных пластов по сейсмическим данным и
                продемонстрировала, что нейросетевые подходы способны решать реальные промышленные задачи.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 9</div>
              <p class="block__photo-caption">Алгоритм «КОРА»</p>
            </div>
          </div>
        </section>

        <!-- Карточка 11 — школа в Комарово -->
        <section id="card-1961-1970-komarovo" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1961–1970 — научная школа Бонгарда в Комарово</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-bongard')">Михаил Бонгард</button>
                совместно с Михаилом Цетлиным и В.&nbsp;И. Варшавским организовал зимние школы‑семинары в Комарово под
                Ленинградом, которые длились 10–14 дней.
              </p>
              <p>
                Это были первые в СССР зимние школы по теории автоматов и распознаванию образов. Они создали научное
                сообщество по искусственному интеллекту и подготовили новое поколение специалистов.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 10</div>
              <p class="block__photo-caption">Школа в Комарово</p>
            </div>
          </div>
        </section>

        <!-- Карточка 12 — 1963 Глушков -->
        <section id="card-1963-glushkov" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1963 — Виктор Глушков и киевское направление</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-glushkov')">Виктор Михайлович Глушков</button>
                — выдающийся кибернетик и математик, создатель киевской школы кибернетики. В 1963 году
                <button class="person-link" @click="scrollToPerson('person-ivakhnenko')">Алексей Ивахненко</button>
                был переведён под его руководство.
              </p>
              <p>
                В лаборатории Глушкова развивались направления автоматического управления, машинного перевода,
                сетевых технологий, распознавания геометрических фигур, моделирования читающих автоматов и автоматический
                синтез функциональных схем ЭВМ.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 11</div>
              <p class="block__photo-caption">Виктор Глушков</p>
            </div>
          </div>
        </section>

        <!-- Карточка 13 — 1965–1980 Поспелов -->
        <section id="card-1965-1980-situation" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1965–1980 — ситуационное управление</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-pospelov')">Дмитрий Александрович Поспелов</button>
                развивал дисциплину ситуационного управления — метод управления сложными техническими и
                организационными системами на основе идей искусственного интеллекта.
              </p>
              <p>
                Подход опирался на логико‑лингвистические модели, обучение и обобщение и применялся к транспортным
                системам, промышленным комплексам и системам принятия решений в сложных условиях.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 12</div>
              <p class="block__photo-caption">Ситуационное управление</p>
            </div>
          </div>
        </section>

        <!-- Карточка 14 — 1971–1973 Галушкин -->
        <section id="card-1971-1973-galushkin" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1971–1973 — Александр Галушкин и многослойные сети</h2>
              <p>
                <button class="person-link" @click="scrollToPerson('person-galushkin')">Александр Иванович Галушкин</button>
                опубликовал первые работы по созданию и обучению многослойных нейронных сетей. Он хорошо знал западные
                исследования, но развивал собственные методы.
              </p>
              <p>
                Галушкин независимо предложил подходы к обучению многослойных сетей, которые позже будут переоткрыты
                на Западе.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 13</div>
              <p class="block__photo-caption">Александр Галушкин</p>
            </div>
          </div>
        </section>

        <!-- Карточка 15 — 1974 монография -->
        <section id="card-1974-monograph" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1974 — монография «Синтез многослойных систем распознавания образов»</h2>
              <p>
                В августе 1974 года
                <button class="person-link" @click="scrollToPerson('person-galushkin')">А.&nbsp;И. Галушкин</button>
                издал монографию тиражом 8000 экземпляров, где впервые систематизировал свои идеи.
              </p>
              <ul>
                <li>полный обзор теории многослойных нейронных сетей;</li>
                <li>метод группового учёта аргументов (МГУА);</li>
                <li>методы селекции архитектуры и автоматического построения моделей;</li>
                <li>принципы использования шума при обучении.</li>
              </ul>
              <p>
                Книга стала одной из первых в мире работ по глубоким нейросетям и предвосхитила распространение
                обратного распространения ошибки на Западе.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 14</div>
              <p class="block__photo-caption">Монография Галушкина</p>
            </div>
          </div>
        </section>

        <!-- Карточка 16 — 1980-е -->
        <section id="card-1980s" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1980‑е годы — продолжение работ в новых условиях</h2>
              <p>
                В 1980‑е годы исследования по нейросетям продолжались, но при меньшем финансировании.
                <button class="person-link" @click="scrollToPerson('person-ivakhnenko')">А.&nbsp;Г. Ивахненко</button>
                занимался моделями с шумом и шумоустойчивыми сетями и развивал методы автоматического моделирования
                по массивам данных.
              </p>
              <p>
                Нейросети применялись в задачах моделирования и прогнозирования, распознавания образов в экологии
                и гидрометеорологии, а также в экономических приложениях.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 15</div>
              <p class="block__photo-caption">Нейросети 1980‑х</p>
            </div>
          </div>
        </section>

        <!-- ===== ПЕРЕХОДНЫЕ ГОДЫ ===== -->
        <div id="section-transition-start"></div>

        <!-- Карточка 17 — 1992 журнал -->
        <section id="card-1992-neurocomputer" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">1992 — журнал «Нейрокомпьютер»</h2>
              <p>
                В 1992 году
                <button class="person-link" @click="scrollToPerson('person-galushkin')">Александр Галушкин</button>
                основал журнал «Нейрокомпьютер» — платформу для публикации исследований по нейронным сетям и сохранения
                советской традиции.
              </p>
              <p>
                С 1999 года журнал выходит как «Нейрокомпьютеры: разработка, применение» и продолжает издаваться,
                обеспечивая преемственность научной школы.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 16</div>
              <p class="block__photo-caption">Журнал «Нейрокомпьютер»</p>
            </div>
          </div>
        </section>

        <!-- Карточка 18 — 1991–2000 -->
        <section id="card-1991-2000-winter" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">1991–2000 — вторая зима ИИ и экономический кризис</h2>
              <p>
                Распад СССР привёл к резкому сокращению финансирования и тяжёлому экономическому кризису 1990‑х годов.
                Многие исследователи вынуждены были эмигрировать, а работы по ИИ и нейросетям замедлились.
              </p>
              <p>
                При этом сохранилось ядро учёных, продолжавших исследования, началось международное сотрудничество
                и расширился доступ к западным публикациям.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 17</div>
              <p class="block__photo-caption">Вторая зима ИИ</p>
            </div>
          </div>
        </section>

        <!-- Карточка 19 — 2000–2010 -->
        <section id="card-2000-2010-recovery" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">2000–2010 — восстановление и адаптация</h2>
              <p>
                Россия постепенно восстанавливала экономику, а развитие интернета создавало новые возможности.
                Появлялись частные технологические компании и стартапы в области ИИ.
              </p>
              <p>
                Университеты (МФТИ, МГУ, ВШЭ и другие) сохраняли традиции фундаментальных исследований, а также
                возникали открытые проекты по обработке русского языка.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 18</div>
              <p class="block__photo-caption">Восстановление исследований</p>
            </div>
          </div>
        </section>

        <!-- Карточка 20 — 2010–2019 -->
        <section id="card-2010-2019-pre-deeplearning" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">2010–2019 — подготовка к эпохе deep learning</h2>
              <p>
                На глобальной арене успех глубокого обучения (ImageNet&nbsp;2012, AlphaGo, трансформеры) изменил ИИ.
                В России Яндекс развивал поисковые и рекомендательные алгоритмы, а Сбер активно инвестировал в
                технологические проекты.
              </p>
              <p>
                Создавались специализированные лаборатории и центры, а молодые учёные получали образование
                в передовых направлениях машинного обучения.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 19</div>
              <p class="block__photo-caption">Переход к deep learning</p>
            </div>
          </div>
        </section>

        <!-- ===== СОВРЕМЕННЫЙ ПЕРИОД ===== -->
        <div id="section-modern-start"></div>

        <!-- Карточка 21 — 2017 Алиса (краткая выжимка) -->
        <section id="card-2017-alice" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">2017 — Алиса: российский виртуальный ассистент</h2>
              <p>
                В 2017 году Яндекс запустил голосового ассистента Алису — первый массовый виртуальный помощник
                на русском языке, конкурирующий с Siri и другими международными системами.
              </p>
              <p>
                Алиса использует многослойные нейросети, ведёт диалог на естественном языке и интегрирована
                в приложения, навигацию и умные устройства. К середине 2020‑х ею пользуются десятки миллионов людей.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 20</div>
              <p class="block__photo-caption">Алиса</p>
            </div>
          </div>
        </section>

        <!-- Карточка 22 — 2019 стратегия -->
        <section id="card-2019-strategy" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">2019 — национальная стратегия развития ИИ</h2>
              <p>
                19 октября 2019 года президент России подписал указ об утверждении Национальной стратегии развития
                искусственного интеллекта до 2030 года.
              </p>
              <p>
                Документ определил цели ускорения технологического развития, цифровизации экономики и создания
                высокопроизводительного сектора, а также меры поддержки исследований, кадров и инфраструктуры.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 21</div>
              <p class="block__photo-caption">Стратегия развития ИИ</p>
            </div>
          </div>
        </section>

        <!-- Карточка 23 — 2020–2023 Natasha -->
        <section id="card-2020-2023-natasha" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">2020–2023 — библиотека Natasha</h2>
              <p>
                Natasha — библиотека для обработки русского языка (распознавание сущностей, морфология, синтаксис),
                работающая на CPU с компактной моделью около 27&nbsp;МБ.
              </p>
              <p>
                Она показала, что в России возможно создание эффективных и доступных NLP‑инструментов.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 22</div>
              <p class="block__photo-caption">Natasha</p>
            </div>
          </div>
        </section>

        <!-- Карточка 24 — 2021 Балабоба -->
        <section id="card-2021-balaboba" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">2021 — Яндекс Балабоба</h2>
              <p>
                Балабоба — демо‑нейросеть на основе YaLM для продолжения текстов на русском языке. Это первый публичный
                шаг Яндекса в сторону генеративных моделей.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 23</div>
              <p class="block__photo-caption">Балабоба</p>
            </div>
          </div>
        </section>

        <!-- Карточка 25 — 2023 YandexGPT 1/2 -->
        <section id="card-2023-yandexgpt12" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">2023 — YandexGPT&nbsp;1 и 2</h2>
              <p>
                YandexGPT&nbsp;1 и 2 стали первыми российскими альтернативами ChatGPT, оптимизированными для русского языка.
                Вторая версия значительно улучшила качество ответов и работу с контекстом.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 24</div>
              <p class="block__photo-caption">YandexGPT&nbsp;1/2</p>
            </div>
          </div>
        </section>

        <!-- Карточка 26 — 2023 GigaChat -->
        <section id="card-2023-gigachat" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">2023 — GigaChat (Сбер)</h2>
              <p>
                GigaChat — мультимодальная нейросеть Сбера, работающая с текстом, изображениями и кодом.
                С сентября 2023 года модель получила открытый доступ и интеграцию в мессенджеры и умные устройства.
              </p>
              <p>
                Это первый полностью открытый российский генеративный ИИ.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 25</div>
              <p class="block__photo-caption">GigaChat</p>
            </div>
          </div>
        </section>

        <!-- Карточка 27 — 2024 YandexGPT 3 / Нейро -->
        <section id="card-2024-yandexgpt3-neuro" class="block">
          <div class="block__row block__row--reverse">
            <div class="block__text">
              <h2 class="block__title">2024 — YandexGPT&nbsp;3 и сервис «Нейро»</h2>
              <p>
                YandexGPT&nbsp;3 улучшил точность и работу с длинными текстами и стал основой для бизнес‑решений.
                Сервис «Нейро» объединил поиск и генеративный ИИ в одном интерфейсе с явным указанием источников.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 26</div>
              <p class="block__photo-caption">YandexGPT&nbsp;3 и «Нейро»</p>
            </div>
          </div>
        </section>

        <!-- Карточка 28 — 2025 YandexGPT 4 -->
        <section id="card-2025-yandexgpt4" class="block">
          <div class="block__row">
            <div class="block__text">
              <h2 class="block__title">2025 — YandexGPT&nbsp;4</h2>
              <p>
                YandexGPT&nbsp;4 обеспечивает более глубокое понимание контекста, умеет декомпозировать задачи
                и работать с высокой скоростью, что позволяет использовать модель в сложных прикладных сценариях.
              </p>
            </div>

            <div class="block__photo">
              <div class="block__photo-placeholder">Фото 27</div>
              <p class="block__photo-caption">YandexGPT&nbsp;4</p>
            </div>
          </div>
        </section>

        <!-- ===== КЛЮЧЕВЫЕ ЛИЧНОСТИ ===== -->
        <section id="section-people" class="block">
          <h2 class="block__title">Ключевые личности и их вклад</h2>
          <p class="block__lead">
            Учёные, определившие развитие нейросетей и вычислительной техники в России.
          </p>

          <div class="people-grid">
            <article id="person-ivakhnenko" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 28</div>
              </div>
              <h3 class="person-card__name">Алексей Ивахненко</h3>
              <p class="person-card__period">1913–2007</p>
              <p class="person-card__text">
                Автор машины «Альфа» и глубоких восьмислойных сетей, один из создателей метода группового учёта
                аргументов.
              </p>
            </article>

            <article id="person-bongard" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 29</div>
              </div>
              <h3 class="person-card__name">Михаил Бонгард</h3>
              <p class="person-card__period">1916–1998</p>
              <p class="person-card__text">
                Создатель алгоритма «КОРА» и обучающихся программ, пионер применения ЭВМ к биологическим и
                распознающим задачам.
              </p>
            </article>

            <article id="person-glushkov" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 30</div>
              </div>
              <h3 class="person-card__name">Виктор Глушков</h3>
              <p class="person-card__period">1923–1982</p>
              <p class="person-card__text">
                Руководитель киевской школы кибернетики, инициатор проектов ОГАС и исследований по автоматам
                и сетевым технологиям.
              </p>
            </article>

            <article id="person-pospelov" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 31</div>
              </div>
              <h3 class="person-card__name">Дмитрий Поспелов</h3>
              <p class="person-card__period">1931–1998</p>
              <p class="person-card__text">
                Автор концепции ситуационного управления, показавшей, как методы ИИ применимы к управлению
                реальными системами.
              </p>
            </article>

            <article id="person-galushkin" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 32</div>
              </div>
              <h3 class="person-card__name">Александр Галушкин</h3>
              <p class="person-card__period">1940–2016</p>
              <p class="person-card__text">
                Один из основателей теории многослойных сетей, автор монографии 1974 года и основатель журнала
                «Нейрокомпьютер».
              </p>
            </article>

            <article id="person-lebedev" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 33</div>
              </div>
              <h3 class="person-card__name">Сергей Лебедев</h3>
              <p class="person-card__period">1902–1974</p>
              <p class="person-card__text">
                Создатель МЭСМ и БЭСМ, первых советских ЭВМ, которые заложили основу отечественной вычислительной техники.
              </p>
            </article>

            <article id="person-brook" class="person-card">
              <div class="person-card__photo">
                <div class="block__photo-placeholder block__photo-placeholder--person">Фото 34</div>
              </div>
              <h3 class="person-card__name">Игорь Брук</h3>
              <p class="person-card__period">1902–1974</p>
              <p class="person-card__text">
                Один из создателей М‑1, первого отечественного компьютера, и руководитель работ по М‑2.
              </p>
            </article>
          </div>
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

.app {
  min-height: 100vh;
  width: 100%;
  background: #020617;
  color: #e5e7eb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

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
    padding: 12px 8px 20px;
  }

  .block {
    padding: 20px 12px;
    min-height: auto;
  }
}

/* Таймлайн */
.timeline {
  position: sticky;
  top: 80px;
  align-self: flex-start;
  width: 150px;
  height: calc(93vh - 80px);
}

.timeline__line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
      to bottom,
      rgba(59, 130, 246, 0.15),
      rgba(59, 130, 246, 0.95)
  );
}

.timeline__line::after {
  content: '';
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 25px solid rgba(59, 130, 246);
}

.timeline__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline__item {
  position: absolute;
  left: 0;
  padding-left: 36px;
  cursor: pointer;
}

.timeline__dot {
  position: absolute;
  left: 19px;
  top: 50%;
  transform: translateY(-50%);
  width: 11px;
  height: 11px;
  border-radius: 999px;
  background: #3b82f6;
}

.timeline__year {
  font-size: 15px;
  color: #9ca3af;
}

.timeline__item--active .timeline__dot {
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.35);
}

.timeline__item--active .timeline__year {
  color: #e5e7eb;
  font-weight: 600;
}

@media (max-width: 900px) {
  .timeline {
    display: none;
  }
}

/* Контент */
.content {
  width: 100%;
  box-sizing: border-box;
}

.block {
  width: 100%;
  box-sizing: border-box;
  padding: 32px 24px;
  margin-bottom: 24px;
  background:
      radial-gradient(circle at top left, rgba(56, 189, 248, 0.08), transparent 60%),
      radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.1), transparent 55%),
      #020617;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.8);
  min-height: 40vh;
}

.block__title {
  font-size: 22px;
  margin: 0 0 12px;
}

.block__lead {
  margin: 0 0 24px;
  color: #9ca3af;
  font-size: 14px;
}

.block__row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.block__row--reverse {
  flex-direction: row-reverse;
}

.block__text {
  flex: 1;
  font-size: 14px;
  color: #d1d5db;
}

/* Фото‑слоты */
.block__photo {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.block__photo-placeholder {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  border: 1px dashed rgba(148, 163, 184, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
  background: rgba(15, 23, 42, 0.6);
}

.block__photo-placeholder--person {
  aspect-ratio: 3 / 4;
}

.block__photo-caption {
  margin-top: 6px;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}

/* Линки на людей */
.person-link {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #60a5fa;
  font: inherit;
  text-decoration: underline dotted;
}

.person-link:hover {
  color: #a5b4fc;
}

/* Личности */
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.person-card {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.7);
  font-size: 13px;
}

.person-card__photo {
  margin-bottom: 10px;
}

.person-card__name {
  margin: 0 0 4px;
  font-size: 16px;
}

.person-card__period {
  margin: 0 0 8px;
  color: #9ca3af;
  font-size: 12px;
}

.person-card__text {
  margin: 0;
  color: #d1d5db;
}

/* Хедер */
.header__left {
  min-width: 0;
  cursor: pointer;
}

.header__left:hover .header__name {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .block__row,
  .block__row--reverse {
    flex-direction: column;
  }

  .block__photo {
    width: 100%;
  }
}
</style>
