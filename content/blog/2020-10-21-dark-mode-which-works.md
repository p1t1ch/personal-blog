---
title: Dark mode, который работает
slug: dark-mode-which-works
publishDate: 2020-10-21T17:36:41.252Z
thumbnail: /assets/dark-mode-which-works.jpg
unsplashLink: https://unsplash.com/@vlisidis
unsplashAuthor: Terry Vlisidis
description: Реализация dark mode под стек Gatsby + React + Typescript +
  Emotion. С поддержкой предпочтений ОС и без раздражающих морганий
tags:
  - dark mode
  - color scheme
  - Gatsby
---
Напоровшись на грабли при добавлении поддержки тёмной темы в своём блоге, пришлось изучить этот вопрос более детально. В итоге пришёл к совсем иной реализации, нежели изначально -- о ней хотелось бы сегодня и поговорить. Подавляющее число умных мыслей, которые здесь приводятся, взяты из статьи ["The Quest for the Perfect Dark Mode"](https://joshwcomeau.com/gatsby/dark-mode/) авторства Josh Comeau. Я лишь пропустил его умозаключения через линзу собственного восприятия, приправив идеями, агрегированными с разных концов сети Интернет на тему dark модов, и слепив в итоге решение, которое работает для меня, а именно под стек Gatsby + React + Typescript + Emotion.

Исходный код опубликован на [Github](https://github.com/p1t1ch/dark-theme-demo) -- желающих покопаться в исходниках или скопировать себе милости прошу.

## Определяем ориентиры

Как выглядит корректно работающий dark mode? Для меня он должен соответствовать следующим принципам:

1. По умолчанию сайт должен наследовать тему, выбранную пользователем на уровне операционной системы
1. На сайте выводится переключатель, позволяющий переопределить тему на уровне сайта. Это решение сохраняется между сессиями
1. Если что-то пошло не так (не поддерживаются медиавыражения или отключен JS), то отображать сайт в светлой теме

## Настраиваем систему цветов

Предположим, что у нас уже есть работающий сайт. Константы цветов определены в отдельном файле и вместе с другими константами образуют объект темы:

```tsx
const colors = {
  black: '#2b2b2b',
  white: '#fff',
  darkPurple: '#6d4672',
  lightPurple: '#ea9ff4',
}

const theme = {
  colors,
  // ... Прочие параметры темы
}

// Для типизации хука useTheme
export type Theme = typeof theme

// Для типизации styled компонента
export interface ThemeProps {
  theme: Theme
}

export default theme
```

Всё приложение обёрнуто в ThemeProvider, в который передаётся тема. В моём случае эта обёртка оформлена в отдельный компонент RootWrapper, в который также добавлены глобальные стили через компонент Global из emotion и впоследствии могут быть добавлены другие провайдеры:

```tsx
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from '@/components/GlobalStyles'
import theme from '@theme'

interface RootWrapperProps {
  /** Site content */
  children: React.ReactNode
}

const RootWrapper = ({ children }: RootWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default RootWrapper
```

Этот компонент оборачивает Gatsby приложение, Storybook и Jest окружения -- короче, он везде самый верхний и одинаковый. После этого тема становится доступна либо через хук useTheme из emotion-theming, либо через проп theme в @emotion/styled. В результате значения цветов читаются из объекта темы на любом уровне приложения, например в глобальных стилях:

```tsx
import React from 'react'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Theme } from '@theme'

const GlobalStyles = () => {
  const theme = useTheme<Theme>()

  return (
    <Global
      styles={[
        {
          body: {
            backgroundColor: theme.colors.white,
            color: theme.colors.black,
          },
	  // ... Прочие глобальные стили
        },
      ]}
    />
  )
}

export default GlobalStyles
```

В общем стандартный сетап, с которым вы наверняка знакомы.

Добавляя dark mode, цвета перестают быть статичными -- мы должны каким-то образом изменять их при переключении темы. Этого можно добиться разными способами, например, создать свой объект под каждую тему и передавать соответствующий в ThemeProvider, добавив проверку на уровне RootWrapper. Тогда при условии, что наименования полей у этих объектов совпадают, мы сможем оставить все стили проекта неизменными, подменяя только тему. Нужно будет только поменять нейминги на что-то более нейтральное вроде theme.colors.active, т.к. цвета там могут быть совершенно любые.

Мы же однако пойдём по другому пути и используем CSS переменные. Вы можете задать вопрос: "Василич, у нас же тут CSS in JS, зачем нам вообще эти переменные, мы же в JS окружении -- берёшь и используешь JS переменные, не?". Спасибо, что спросили. На самом деле даже с библиотеками наподобие Emotion CSS переменные могут быть полезны. Используя вышеобозначенный метод с 2 объектами, Emotion для каждого элемента, использующего динамические цвета, добавит в head 2 тега style с разными классами, в которых будут захардкожены значения цветовых констант. Используя CSS переменные, Emotion ограничится всего одним тегом, в котором будут записаны переменные по типу `var(—color-active)`. Это означает, что цвета стали действительно динамическими -- мы меняем их, меняя значения этих переменных в :root, что будет очень важно (читайте дальше). Также это уменьшает число стилей, что всегда хорошо. Ну и в целом использование CSS переменных в отличие от темы не требуют импортов, что может быть удобнее, но здесь это не причина -- я использую их только для динамических фрагментов.

Итак, мы определились, что для цветов, которые зависят от темы, мы используем CSS переменные. Для статичных стилей используем тему напрямую, как и раньше. Давайте внесём это изменение. Первым делом, нужно добавить маппинг между темами и константами. Определю его в том же файле с темой наряду с парой полезных типов:

```tsx
export const themeColors = {
  primary: {
    light: colors.black,
    dark: colors.white,
  },
  secondary: {
    light: colors.white,
    dark: colors.black,
  },
  active: {
    light: colors.darkPurple,
    dark: colors.lightPurple,
  },
}

export type ColorSchemeTypes = 'light' | 'dark'
export type ColorSchemeVars = keyof typeof themeColors
```

И чтобы было удобнее пользоваться CSS переменными, добавим хелпер:

```tsx
import { ColorSchemeVars } from '@theme'

const colorVar = (varName: ColorSchemeVars) => `var(--color-${varName})`

export default colorVar
```

Теперь мы можем использовать запись `colorVar('active')`, получая бонусы статической типизации в виде списка переменных темы. Иначе мы бы работали со строками, и там типизации, понятное дело, не было бы.

Наконец, определим переменные в :root значениями из светлой темы, и изменим динамические цвета с использования объекта темы на вызовы colorVar:

```tsx{5,14-18,20-21}
import React from 'react'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Theme } from '@theme'
import colorVar from '@/utils/colorVar'

const GlobalStyles = () => {
  const theme = useTheme<Theme>()

  return (
    <Global
      styles={[
        {
	  ':root': {
            '--color-primary': theme.colors.black,
            '--color-secondary': theme.colors.white,
            '--color-active': theme.colors.darkPurple,
          },
          body: {
            backgroundColor: colorVar('secondary'),
            color: colorVar('primary'),
          },
	  // ... Прочие глобальные стили
        },
      ]}
    />
  )
}

export default GlobalStyles
```

Разумеется, такую замену нужно провести на уровне всего проекта везде, где нужны динамические цвета. После этого всё должно оставаться аналогичным состоянию до рефакторинга, но мы перешли на CSS переменные и готовы добавлять переключение тем.

## Дорабатываем логику на уровне приложения

Основная идея заключается в том, чтобы обернуть приложение в провайдер темы, что позволит получать текущее значение темы и метод для её переключения на любом уровне приложения. При этом метод будет не только менять стейт, но и сохранять значение в Local Storage и менять значения CSS переменных. После этого добавление переключателя будет тривиальным.

### Создаём контекст

От контекста нам нужны 2 вещи: провайдер, который прокинет контекст в приложение, и хук, через который мы этот контекст сможем читать.

Начнём с хука. Создадим контекст через createContext и кастомный хук, использующий внутри useContext:

```tsx
import { createContext, useContext } from 'react'
import { ColorSchemeTypes } from '@theme'

export const ColorSchemeContext = createContext<
  [ColorSchemeTypes | undefined, (value: ColorSchemeTypes) => void] | undefined
>(undefined)

const useColorScheme = () => {
  const context = useContext(ColorSchemeContext)

  if (!context) throw new Error('This component must be used within a <ColorSchemeProvider> component')

  return context
}

export default useColorScheme
```

Определение кастомного хука для контекста —- это классная фишка, которую я уже довольно давно перенял от сильных мира Реакта. Такой подход позволяет запрятать контекст внутри, убирая необходимость его импортировать. И здесь же можно добавлять проверки на попытки получения контекста вне провайдера.

Касательно типа контекста, здесь используется массив `[colorScheme, setColorScheme]`, чтобы сохранить ментальную модель useState. Тип схемы (я назвал всё схемой по аналогии с prefers-color-scheme) -- это в конечном итоге `'light' | 'dark' | undefined`. Зачем нам нужен undefined увидите чуть позже.

Ну и теперь сам провайдер:

```tsx
import React, { useEffect, useState } from 'react'
import { ColorSchemeContext } from './useColorScheme'
import { ColorSchemeTypes, themeColors } from '@theme'
import { COLOR_SCHEME_LC_KEY } from '@/utils/constants'

interface ColorSchemeProviderProps {
  /** Content with access to color scheme */
  children: React.ReactNode
}

const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeTypes | undefined>(undefined)

  const saveColorScheme = (newColorScheme: ColorSchemeTypes) => {
    window.localStorage.setItem(COLOR_SCHEME_LC_KEY, newColorScheme)

    const root = document.documentElement
    Object.entries(themeColors).forEach(([colorVar, valueByTheme]) => {
      root.style.setProperty(`--color-${colorVar}`, valueByTheme[newColorScheme])
    })

    setColorScheme(newColorScheme)
  }

  return <ColorSchemeContext.Provider value={[colorScheme, saveColorScheme]}>{children}</ColorSchemeContext.Provider>
}

export { default as useColorScheme } from './useColorScheme'

export default ColorSchemeProvider
```

В центре всего лежит стейт. Мы бы передали его значение и сеттер напрямую в контекст, если бы нам не нужно было делать при изменении темы дополнительных действий. Но нам нужно! Так что мы определяем функцию saveColorScheme и передаём её в провайдер вместо setColorScheme. Внутри этой функции мы:

1. Сохраняем новое значение в Local Storage. Имя я вынес в константы для удобства
1. Меняем значения CSS переменных. Делаем это программно, используя метод setProperty. Формат объекта themeColors позволяет выполнить подобную ротацию элегантным образом
1. Наконец, меняем стейт контекста

После этого оборачиваем приложение в провайдер, и теперь всё готово для добавления переключателя:

```tsx{5,14,19}
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from '@/components/GlobalStyles'
import theme from '@theme'
import ColorSchemeProvider from '@/components/ColorSchemeProvider'

interface RootWrapperProps {
  /** Site content */
  children: React.ReactNode
}

const RootWrapper = ({ children }: RootWrapperProps) => {
  return (
    <ColorSchemeProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
	{children}
      </ThemeProvider>
    </ColorSchemeProvider>
  )
}

export default RootWrapper
```

### Добавляем переключатель

Переключатель -- обычный React компонент, который использует наш самописный хук для получения значения темы и метода для его изменения. На просторах интернета можно найти сотни модных тогглов -- для демки я ограничусь кнопкой с иконками из модуля react-icons, убедившись, что переключатель доступен для скринридеров, конечно же:

```tsx
import React from 'react'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import { FiMoon, FiSun } from 'react-icons/fi'

const ColorSchemeToggle = () => {
  const [colorScheme, setColorScheme] = useColorScheme()

  return (
    <button
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      aria-label="Dark theme"
      aria-pressed={colorScheme === 'dark'}
    >
      {colorScheme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  )
}

export default ColorSchemeToggle
```

Добавляем новенький переключатель в любое место сайта, неизменное между страницами, например в шапку. И теперь можем подёргать его и убедиться, что тема меняется, а вместе с этим идёт запись в Local Storage.

Однако не хватает главного! После перезагрузки страницы тема всегда слетает на светлую. Действительно, ведь мы же никак не проверяем значение Local Storage, и предпочтения на уровне ОС также не затрагиваем. Пора это исправить. Переходим к магической части.

## Определяем тему при открытии сайта

Теперь тонкий момент. Как определить тему, когда сайт только открывается? Нужно определить функцию, считывающую значение из Local Storage и предпочтение ОС через matchMedia. Но более интересный вопрос: когда мы должны её вызывать? Если пробовать это сделать совсем в лоб, то первой идеей будет передать её в useState внутри контекста — так мы определим начальное значение для стейта. Но если вы воплотите эту идею в реальность на нашем стеке, то увидите, что всё развалилось! Почему так? Потому что Gatsby использует серверный рендер, точнее говоря пререндер -- он генерирует статичные HTML файлы, выполняя рендер React приложения в Node окружении. А там что? Правильно, не доступен window. А он нам нужен и для доступа к Local Storage и для использования matchMedia. Проблемка!

Т.к. первичный рендер не заходит внутрь эффектов, то следующим логичным шагом будет проставить undefined в стейт по умолчанию (мы это уже сделали) и перенести определение стейта внутрь useEffect. И такой подход уже будет будет работать, но при открытии сайта вы увидите "моргание": этот блинк вызван переключение со светлой темы на тёмную. Ведь действительно, на первичном рендере тему определить невозможно, а это значит, что она всегда будет светлой (в соответствии с цветами в :root) и переключится на нужную позже.

Так можем ли мы открывать сайт сразу с нужной темой? Технически, нет, т.к. первичный рендер определяется на сервере, а там мы не узнаем о предпочтениях пользователя. Но мы убрать блинк, отложив рендер приложения. Это делается через вставку скрипта, определяющего тему, наверх body -- этот скрипт блокирует рендер, то есть вся разметка страницы не появится на экране, пока скрипт не выполнится. Обычно это антипаттерн, но в данном случае этого отложенного рендера мы и добиваемся. Да, это влияет на оптимизацию, но здесь идёт трейдофф между оптимизацией и UX, и с учётом размера вставляемого скрипта этот баттл с основательным перевесом берёт участник справа — даже с большим троттлингом эта задержка не чувствуется.

Вставка скрипта зависит от вашего стека: в простейшем случае просто вставляете его в html, при работе с webpack для этого есть лоадеры, в случае с Gatsby мы можем вклиниться в процесс рендера через gatsby-ssr.js:

```jsx
import React from 'react'
import { themeColors } from '@theme'
import { INITIAL_COLOR_SCHEME_CSS_VAR, COLOR_SCHEME_LC_KEY } from '@/utils/constants'

const defineColorScheme = () => {
  const themeColors = '🎨'
  const colorSchemeLCKey = '🔑'
  const initialColorSchemeCSSVar = '✨'

  let colorScheme
  const siteLevelColorScheme = localStorage.getItem(colorSchemeLCKey)
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const osLevelColorScheme = mql.matches ? 'dark' : 'light'

  if (siteLevelColorScheme) {
    colorScheme = siteLevelColorScheme
  } else {
    colorScheme = osLevelColorScheme
  }

  const root = document.documentElement
  root.style.setProperty(initialColorSchemeCSSVar, colorScheme)
  Object.entries(themeColors).forEach(([colorVar, valueByTheme]) => {
    root.style.setProperty(`--color-${colorVar}`, valueByTheme[colorScheme])
  })
}

const ColorSchemeScript = () => {
  const stringifiedFunction = String(defineColorScheme)
    .replace("'🎨'", JSON.stringify(themeColors))
    .replace('🔑', COLOR_SCHEME_LC_KEY)
    .replace('✨', INITIAL_COLOR_SCHEME_CSS_VAR)

  return <script dangerouslySetInnerHTML={{ __html: `(${stringifiedFunction})()` }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ColorSchemeScript />)
}
```

Разберёмся, что в нём происходит. Распутаем этот клубок снизу вверх:

1. Поучавствовать в рендере можно через функцию onRenderBody, предоставляемую Gatsby. Из её аргументов можно получить другую функцию setPreBodyComponents, которая делает именно то, что у неё в названии: вставляет наверх body переданные компоненты. Мы будем передавать туда скрипт
1. Скрипт -- это React компонент. Чтобы прописать содержимое скрипта в JSX мы должны использовать dangerouslySetInnerHTML, то есть наша функция должна быть строкой. Также мы используем старый добрый IIFE, чтобы не засорять глобальный неймспейс
1. Т.к. кодить внутри строки аналогично программированию в блокноте, мы определим нормальную функцию, а потом превратим её в строку. Проблема в том, что если мы будем использовать внутри функции внешние переменные, то при превращении в строку они не превратятся в значения, так что нам нужно произвести эту замену самим. Здесь это делается через замену эмоджи на значения переменных внутри компонента
1. Наконец, сама функция. Определяем тему по следующей логике: в Local Storage лежит значение? Значит пользователь переопределил тему на уровне сайта через тоггл -- берём его. Если пусто, то смотрим предпочтение на уровне ОС. Если и там пусто или такая фича не поддерживается, то используем светлую тему.
1. В конце переопределяем значения CSS переменных и заводим новую переменную для передачи выбранной темы. Мы бы могли передать её и через глобальные переменные и добавив какой-нибудь класс -- это просто один из вариантов.

Теперь при сборке проекта Gatsby добавит скрипт наверх body, который будет исполнен уже в браузере пользователя. При этом мир замрёт на долю секунды, пока он исполняется, но когда на экране появятся элементы, они уже будут раскрашены в цвета выбранной пользователем темы. И в этом и заключается вся магия CSS переменных -- мы изменили их значения на уровне html и весь проект разукрасился в эти цвета, не дожидаясь исполнения скриптов, а именно ререндера, где только можно будет произвести подобное средствами JS.

Остаётся известить контекст о выбранной теме -- мы прописали нужные значения в CSS, но стейт контекста по-прежнему соответствует светлой теме. Здесь уже useEffect отлично подойдёт:

```tsx{4,14-18}
import React, { useEffect, useState } from 'react'
import { ColorSchemeContext } from './useColorScheme'
import { ColorSchemeTypes, themeColors } from '@theme'
import { INITIAL_COLOR_SCHEME_CSS_VAR, COLOR_SCHEME_LC_KEY } from '@/utils/constants'

interface ColorSchemeProviderProps {
  /** Content with access to color scheme */
  children: React.ReactNode
}

const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeTypes | undefined>(undefined)

  useEffect(() => {
    const root = document.documentElement
    const initialColorScheme = root.style.getPropertyValue(INITIAL_COLOR_SCHEME_CSS_VAR) as ColorSchemeTypes
    setColorScheme(initialColorScheme)
  }, [])

  const saveColorScheme = (newColorScheme: ColorSchemeTypes) => {
    window.localStorage.setItem(COLOR_SCHEME_LC_KEY, newColorScheme)

    const root = document.documentElement
    Object.entries(themeColors).forEach(([colorVar, valueByTheme]) => {
      root.style.setProperty(`--color-${colorVar}`, valueByTheme[newColorScheme])
    })

    setColorScheme(newColorScheme)
  }

  return <ColorSchemeContext.Provider value={[colorScheme, saveColorScheme]}>{children}</ColorSchemeContext.Provider>
}

export { default as useColorScheme } from './useColorScheme'

export default ColorSchemeProvider
```

Именно поэтому нам и нужен был undefined в стейте. Ведь до выполнения эффекта мы не знаем какая тема выбрана. А если мы не знаем этого, то как об этом узнает тоггл? Хм, действительно, если вы посмотрите на код нашего переключателя, то увидите, что рендерится всегда иконка луны, то есть переключение на тёмную тему, то есть состояние для светлой темы. И если тема выбрана тёмная, то между серверным рендером и действительным начальным состоянием получается несоответствие. Для подобных динамических составляющих статических сайтов используют отложенный рендер, то есть мы не включаем их в HTML и рендерим, когда у нас для этого будут получены все данные, в данном случае значение темы из контекста -- не показывать элемент куда лучше, чем показывать неправильный, хотя бы с визуальной точки зрения, не говоря уже о багах регидрации... Так что вносим последнее лёгкое изменение:

```tsx{7}
import React from 'react'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import { FiMoon, FiSun } from 'react-icons/fi'

const ColorSchemeToggle = () => {
  const [colorScheme, setColorScheme] = useColorScheme()
  if (!colorScheme) return null

  return (
    <button
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      aria-label="Dark theme"
      aria-pressed={colorScheme === 'dark'}
    >
      {colorScheme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  )
}

export default ColorSchemeToggle 
```

---

Как видите, довольно много тонких моментов для реализации одной кнопочки наверху шапки... Но с такими фичами нужно либо хорошо, либо никак. При первой реализации тёмной темы в этом блоге я допустил ряд ошибок, которые приводили к тому, что текст получал значения для тёмной темы, когда фон оставался светлым, что приводило к тому, что текст переставал быть виден -- думаю это было вызвано отложенным определением темы, что вкупе с сохранением данных в сервис воркере приводило к такому результату. Ещё здесь были переходы, которые этот блинк затягивали на полсекунды... Но теперь всё в порядке -- CSS переменные и ранний body скрипт тащат. Ещё раз выражаю свой респект Джошу и надеюсь, что моя интерпретация происходящего будет кому-то полезна. [Демка](https://dark-theme-demo.netlify.app/) прилагается.