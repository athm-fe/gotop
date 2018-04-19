# Gotop

该插件只做两件事：
1. 当滚动超出一屏时，显示返顶按钮；否则，隐藏按钮
2. 点击返顶按钮时，滚动到页面顶部

请自行使用样式来给返顶按钮定位。

## Usage

和其他控件类似，通过 `data-toggle="gotop"` 或者 JavaScript 都可以初始化返回顶部控件。

```html
<button type="button" data-toggle="gotop">返回顶部</button>
```

或者

```javascript
$('.js-gotop').gotop();
```

## Options

无

## Methods

### `.gotop()`

初始化

```javascript
$('.js-gotop').gotop();
```

## Events

Event Type | Description
---------- | -----------
show.fe.gotop | 返回顶部按钮显示的时候触发。
hide.fe.gotop | 返回顶部按钮隐藏的时候触发。

```javascript
$('.js-gotop').on('show.fe.gotop', function () {
  // do something...
});
```

# End

Thanks to [Bootstrap](http://getbootstrap.com/)
