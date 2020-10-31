---
title: Диагональные лайауты и обратная сторона clip-path
slug: diagonal-layouts-and-another-side-of-clip-path
publishDate: 2020-10-31T16:19:39.283Z
thumbnail: /assets/diagonal-layouts-and-another-side-of-clip-path.jpg
unsplashLink: https://unsplash.com/@dhelentjaris
unsplashAuthor: https://unsplash.com/@dhelentjaris
description: Кроссбраузерные проблемы при использовании clip-path. Рабочая
  реализация диагональной разметки
tags:
  - macOS
  - diagonal layouts
  - browser bugs
  - clip-path
---

Столкнулся с жуткими лагами в блоге при скроллинге.

<video controls>
  <source src="/assets/blog-paint-lag.mp4" type="video/mp4">
</video>

Любопытно, что этой проблемы нет на Windows ни в одном из браузеров. Она проявляется на MacOS в Chrome и Edge. В Firefox при скролле основного содержимого проблема не особо чувствуется, но появляются лаги рядом с промо изображением, и на главной странице при ховере на карточках всё тормозит. В Safari проблема не наблюдается.

Дело, покрытое мраком. Пришлось погрузиться в вопрос -- спешу поделиться своими находками.

## В поиске источника проблемы

### Chrome и Edge

Чередуя отключение фрагментов разметки и их стилей пришёл к тому, что проблема вызвана добавлением CSS правила **clip-path** на основной контейнер. Я использую clip-path для создания диагональных секций -- в шапке, футере, верхней части поста и в карточках превью. Убрав это правило, лайаут порушился, но проблема в Chrome и Edge исчезла. В Firefox лаги остались, но там они происходили не на теле, а на изображении, так что я предположил, что там нужно убрать clip-path с баннера... и действительно, совместимый с жизнью запас FPS вернулся.

Видимо я как-то неправильно использую clip-path. Я отправился на поиски похожих багов в сети Интернет и нашёл записи о проблемах совместимости clip-path и секций со скроллом. Основной посыл: скролл внутри контейнера с повешенным на него clip-path приводит к репэинту всего блока. Получается, что чем нагруженнее блок, тем сложнее отрисовка, и тем больше лаг. В моём случае пост высотой в 15 тысяч пикселей, включающий в себя не только текст, но и изображения и блоки кода, будет полностью отрисовываться на каждый скролл -- GPU попросту не справляется, оставляя нам белый экран. Т.к. новая версия Edge работает на Chromium, то видимо это проблема их имплементации clip-path, и судя [по форуму](https://bugs.chromium.org/p/chromium/issues/detail?id=611257) проблема давно известна. Почему лагов нет на Windows без понятия — отнесу это также к нюансам реализации.

Любопытно, что вместе с моим кейсом с расположением скроллящегося блока внутри контейнера с clip-path, встречаются записи об обратном: использование элемента c clip-path внутри длинного контейнера приводит к аналогичным репэинтам. Особенно эта проблема задела авторов популярных библиотек, предоставляющих утилиту **visually-hidden** (визуальное сокрытие элемента на экране с сохранением доступа для скринридеров) -- классическая версия этого сниппета использует clip-path. По этой причине его реализация была изменена в таких библиотеках как [bootstrap](https://github.com/twbs/bootstrap/issues/24906), [html5-boilerplate](https://github.com/h5bp/html5-boilerplate/issues/2021), [foundation](https://github.com/foundation/foundation-sites/pull/10914), [polished](https://github.com/styled-components/polished/pull/454).

Если из этого всего нужно сделать один вывод, то он будет таков: clip-path и скролл не дружат. Ни в каком виде. Если блок нужно подрезать сверху и снизу, то лучше добавить по вспомогательному элементу с обоих сторон и подрезать их, оставив основное содержимое нетронутым.

### Firefox

Убрав clip-path с основного контейнера, исчезла проблема на главной странице при ховере на карточки. Если включить через Chrome Devtools отображение репэинтов (Rendering → Paint flashing), то можно увидеть, что при ховере перерисовывается весь контейнер, точнее при каждом движении карточки через transform, отчего конкретно Firefox'у становится тяжко. Почему именно ему? Опять же без понятия. Но отрисовка всего блока на каждое движение карточки через легковесный transform -- это ненормально. Так что вывод аналогичный: не оборачиваем в clip-path крупные блоки.

<video controls>
  <source src="/assets/main-page-paint-flashing.mp4" type="video/mp4">
</video>

Что касается clip-path на баннере в посте, то я пришёл к тому, что как Chrome не любит совмещать clip-path со скроллом, Firefox не любит мешать его с фиксированным фоном. У изображения стоит `position: fixed` и на контейнер ставится clip-path -- таким образом достигается занимательный эффект, когда на скролл мы видим движущееся изображение как будто через замочную скважину. Здесь я не нашёл пруфов о существовании такого бага на форумах Firefox, но природа этой проблемы очень схожа со скроллом, так что я не удивлён. В итоге попросту пришлось отказаться от фиксированного фона, сделав баннер статичным -- обидно, но ничего умного мне в голову не пришло.

_Касательно проблем с отрисовкой в MacOS есть ещё такая тема, что когда мы не скроллим, то есть на экране статичная картинка, и вдруг начинаем скроллить, то мы можем увидеть всё те же белые фрагменты экрана, хоть и в гораздо меньшем количестве. Такая проблема есть на современных маках с двумя GPU: на этих системах используются разные GPU в зависимости от нагрузок -- интегрированной менее ресурсозатратной картой и более производительной и тяжеловесной дискретной. Так мак видя на экране статичную картинку переключается на интегрированную, чтобы сэкономить заряд батареи -- мы начинаем скролл, и она уже не справляется, идёт замена на дискретную -- в этот момент переключения мы и видим белые полосы. Убрать эту замену можно через Energy Saver → Automatic graphics switching, что имеет смысл при использовании ноутбука, подключённого к зарядке -- в ином случае это скорее того не стоит, просто стоит иметь в виду._

## В поисках нового решения

Если мы убираем clip-path с основного контейнера, то моя концепция диагональных лайаутов рушится -- нужно придумать альтернативу.

Предположим, что у нас на странице есть 4 раздела: шапка, заголовок, тело и футер. Цель: отделить секции друг от друга диагональными линиями. В процессе поисков я осознал, что создании таких линий через градиенты не особо работает на блоках на 100% ширины, т.к. чтобы эти линии были ровными градиент нужно сопроводить указанием background-size, что мы не можем сделать, т.к. ширина зависит от размера экрана -- без этого линия становится "угловатая". Так что clip-path здесь будет предпочтительнее. Вопрос: как эти правила расположить?

### Старое решение

<iframe width="600" height="600" scrolling="no" title="Diagonal layout (bad solution)" src="https://codepen.io/p1t1ch/embed/preview/gOMeoja?height=600&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/p1t1ch/pen/gOMeoja'>Diagonal layout (bad solution)</a> by p1t1ch
  (<a href='https://codepen.io/p1t1ch'>@p1t1ch</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

В старом решении цвета фона и текста задаются в body, но потом переопределяются во всех диагональных секциях: у контейнера ставится обратный цвет фона, а внутри него цвет фона, аналогичный body. Например, для светлого фона внутренний блок с clip-path будет также светлый, а тёмная линия будет создаваться за счёт фона контейнера -- это разница в отступах между блоками. Таким образом, применяя clip-path, снизу будет оставаться тёмный треугольник, который превращается в линию за счёт отрицательного сдвига следующего за ним блока, если верхняя часть этого блока имеет аналогичный скос. Режем хэдер снизу -- режем заголовок сверху и сдвигаем, режем заголовок снизу и футер сверху -- режем основную секцию и сдвигаем в обе стороны. Как видите, из-за этого появляется необходимость обрезать и сдвигать центральный блок, чтобы закрыть пробелы в соседних блоках -- и здесь начинаются проблемы.

### Новое решение

<iframe width="600" height="600" scrolling="no" title="Diagonal layout (good solution)" src="https://codepen.io/p1t1ch/embed/preview/BazrYgV?height=600&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/p1t1ch/pen/BazrYgV'>Diagonal layout (good solution)</a> by p1t1ch
  (<a href='https://codepen.io/p1t1ch'>@p1t1ch</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

В новом решении цвета фона и текста, заданные в body, не меняются. Здесь линии -- это отдельные элементы, а точнее псевдоэлементы диагональных секций. Эти псевдоэлементы имеют инвертированный фон и через clip-path идёт обрезка чисто линий. Контент раздела между линиями оборачивается в div, который обрезается, чтобы соответствовать форме линий. Линии позиционируются абсолютно, чтобы не влиять на высоту раздела. При таком подходе в заголовок добавляются две линии и в футер одна, хэдер и основной раздел при этом остаются нетронутыми -- значит наша цель достигнута.

Плюсы нового решения:

1. У основного раздела не задаётся clip-path → никаких репэинтов. Мы сделали выводы, и диагональными секциями здесь являются миниатюрные блоки.
1. Цвет фона не переопределяется вне body → решение легче поддерживать. Раньше с этим возникало много путаницы.
1. Никаких отрицательных отступов → разделы более не зависят друг от друга. Это значит, что решение лучше скалируется.

---

Тезисно: обращайте внимание на какие блоки вы вешаете clip-path. Если это крупный блок, то убедитесь, что браузеры под MacOS не взрываются от ваших безобидных игр с формами. Ну и если вам захотелось применить у себя диагональные разделители, то решение из второй демки вполне рабочее.