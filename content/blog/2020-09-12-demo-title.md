---
title: Тестовая статья
slug: demo-title
date: 09/12/2020
thumbnail: /assets/keyboard.jpg
description: Тестовая статья для всякого рода тестов тестового происхождения по
  своей природе
tags:
  - демка тесты
  - тестовая
  - демо
---
[Inner link](/test-blog/)

[Inner link 2](/)

[Outer link](https://www.google.com/)

Hi folks!

**Bold text**

*Italic text*

***And italic bold***

`Thats going on? Insert gatsby-node.js in your codebase, ok?`

Look 👀 [new Gatsby website](https://www.gatsbyjs.com/)

# Heading 1

text

## Heading 2

text

### Heading 3

text

#### Heading 4

text

##### Heading 5

text

###### Heading 6

text

> I think this is the beginning of a beautiful friendship

3 steps to something:

1. Fight
2. Cool
3. Deploy

Also here another possible way:

* Start
* Continue
* Finish

<iframe width="560" height="315" src="https://www.youtube.com/embed/eMx5ZCkIwfQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Test text

<iframe height="600" style="width: 100%;" scrolling="no" title="DrawSvg test" src="https://codepen.io/p1t1ch/embed/preview/gJKQWQ?height=323&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/p1t1ch/pen/gJKQWQ'>DrawSvg test</a> by p1t1ch
  (<a href='https://codepen.io/p1t1ch'>@p1t1ch</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Test text

```typescript
const sum = (firstVariableName: number, secondVariableName: number) => firstVariableName + secondVariableName
console.log(sum(1, 2)) // df
```

```css
.my-class {
  color: #f00;
  font-weight: 900;
}
```

```js{3-4}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
]
```

```jsx
class FlavorForm extends React.Component { // highlight-line
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // highlight-next-line
    this.setState({value: event.target.value});
  }

  // highlight-start
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  // highlight-end

  render() {
    return (
      { /* highlight-range{1,4-9,12} */ }
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

```bash
cd project-name
yarn
yarn dev
```

Aaaand `console.log('vadyan', x);` image `js>console.log('vadyan', x);`!

![Альтернативный текст](/assets/gatsby.png "Текст для figcaption")

![svg не обрабатывается через remark плагин](/assets/github.svg)