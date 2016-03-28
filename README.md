# generator-ewnd9-npm

[![Build Status](https://travis-ci.org/ewnd9/generator-ewnd9-npm.svg?branch=master)](https://travis-ci.org/ewnd9/generator-ewnd9-npm)

yo generator for node projects

Templates:

- `lib`
- `cli`

## Install

```
$ git clone git@github.com:ewnd9/generator-ewnd9-npm.git && cd generator-ewnd9-npm
$ npm link

# reusing npm init values

$ npm set init-author-name ewnd9
$ npm set init-author-email ewndnine@gmail.com
$ npm set init-license MIT
```

## Usage

### Standalone

```
$ yo ewnd9-npm
```

### Complete Pipeline

- Create files via ([`generator-ewnd9-npm`](https://github.com/ewnd9/cached-npm-repo))
- Setup lint dependencies and git hooks ([`generator-ewnd9-eslint`](https://github.com/ewnd9/generator-ewnd9-eslint))
- Replace npm install with copying cached previous installation based on dependencies hashsum ([`cached-npm-install`](https://github.com/ewnd9/cached-npm-repo))


```bash
# ~/.zshrc
alias glib="yo ewnd9-npm && yo ewnd9-eslint && cached-npm-install && atom ."
```

### Output regeneration

```
$ npm run generate-output
```

## License

MIT © [ewnd9](http://ewnd9.com)
