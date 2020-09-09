---
title: Test blog 2
date: 2020-09-07T16:43:49.535Z
description: Test description
# featuredImage: /assets/gatsby.png
---

Hi folks!

**Bold text**

_Italic text_

**_And italic bold_**

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

- Start
- Continue
- Finish

```ts{1-2}
const sum = (firstVariableName: number, secondVariableName: number) => firstVariableName + secondVariableName
console.log(sum(1, 2)) // 3
```

```css
.my-class {
  color: #f00;
  font-weight: 900;
}
```

```js
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

```js
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

```js
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

```js{1,4-6}
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

```bash
cd project-name
yarn
yarn dev
```

Aaaand `console.log('vadyan', x);` image `js>console.log('vadyan', x);`!

![Альтернативный текст](/assets/gatsby.png 'Заголовок, который вы можете лицезреть')
