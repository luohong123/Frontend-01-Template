/*
 * @Author: lh
 * @Date: 2020-05-27 21:33:23
 * @LastEditors: lh
 * @LastEditTime: 2020-06-02 13:54:51
 * @Description: 
 * @email: 3300536651@qq.com
 */
function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }
  for (let prop in element.computedStyle) {
    var p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}

function layout(element) {
  if (!element.computedStyle) {
    return;
  }
  var elementStyle = getStyle(element);
  if (elementStyle.display !== 'flex') {
    return;
  }
  var items = element.children.filter(e => e.type === 'element');
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  });
  var style = elementStyle;
  ['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  });
  if (!style.flexDirection || style.flexDirection === 'auto') {
    // 默认方向为 横向
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    // 伸缩柔性项目，以使该项目的边距框的交叉尺寸与该行相同，同时注意宽度和高度限制。
    style.alignItems = 'stretch';
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    // 默认方向为 
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    // 默认方向为 
    style.flexWrap = 'nowrap';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    // 默认方向为 
    style.alignContent = 'stretch';
  }
  // 主轴 交叉轴
  var mainSize, // 主轴大小
    mainStart, // 主轴的开始位置
    mainEnd, // 主轴的结束位置
    mainSign,
    mainBase, // 主轴基线
    crossSize, // 交叉轴大小
    crossStart, // 交叉轴的开始位置
    crossEnd, // 交叉轴的结束位置
    crossSign,
    crossBase; // 交叉轴基线
  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  // 纵向 反转
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexWrap === 'wrap-reverse') {
    let temp = crossStart;
    crossStart = crossEnd;
    crossEnd = temp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }
  
  var isAutoMainSize = false;
  if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      var item = items[i];
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }
  var flexLine = [];
  flexLines = [flexLine];

  var mainSpace = elementStyle[mainSize];
  var crossSpace = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Max.max(crossSpace, itemStyle[crossSize]);
        flexLine.push(item);
      }
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossBase = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;
  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }
  if (mainSpace < 0) {
    // overflow (happens only if container is single line),scale every item
    var scale = style[mainSize] / (style[mainSize] - mainSpace);
    var currentMain = mainBase;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);
      
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }
      
      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    // process each flex line
    flexLines.forEach(function (items) {
      var mainSpace = items.mainSpace;
      var flexTotal = 0;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);
        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }
      if (flexTotal > 0) {
        // There is flexible flex items
        var currentMain = mainBase;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle(item);
          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // There is *NO* flexible flex items, which means, justifyContent should work
        // 开始位置对齐
        if (style.justifyContent === 'flex-start') {
          var currentMain = mainBase;
          var step = 0;
        }
        // 结束位置对齐
        if (style.justifyContent === 'flex-end') {
          var currentMain = mainSpace * mainSign + mainBase;
          var step = 0;
        }
        // 中间对齐
        if (style.justifyContent === 'center') {
          var currentMain = mainSpace / 2 * mainSign + mainBase;
          var step = 0;
        }
        // 两端对齐
        if (style.justifyContent === 'space-between') {
          var step = mainSpace / (items.length - 1) * mainSign;
          var currentMain = mainBase;
        }
        // 这些物品沿着主轴均匀地分布在对齐容器内。每对相邻项目之间的间距是相同的。
        // 第一个项目之前和最后一个项目之后的空白空间等于每对相邻项目之间的空白空间的一半。
        if (style.justifyContent === 'space-around') {
          var step = mainSpace / items.length * mainSign;
          var currentMain = step / 2 + mainBase;
        }
        for (let i = 0; i < items.length; i++) {
          // var item = items[i];
          itemStyle[mainStart, currentMain];
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    })
  }
  // copute the cross axis sizes
  // align-items, align-self
  var crossSpace;

  if (!style[crossSize]) { // auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }
  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }
  var lineSize = style[crossSize] / flexLines.length;
  var step;
  if (style.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / (flexLines.length);
    crossBase += crossSign * step / 2;
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach(function (items) {
    var lineCrossSize = style.alignContent === 'stretch' ?
      items.crossSpace + crossSpace / flexLines.length :
      items.crossSpace;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);
      var align = itemStyle.alignSelf || style.alignItems;

      if (item === null) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
      }
      // if (itemStyle[crossSize] === null) {
      //     itemStyle[crossSize] = (align === 'stretch') ?
      //         lineCrossSize : 0;
      // }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }
      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ?
          itemStyle[crossSize] : lineCrossSize);

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
}
module.exports = layout;