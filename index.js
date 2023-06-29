window.onload = function () {
  //获取元素
  let autoInputs = document.getElementsByClassName("auto-input");
  for (let i = 0; i < autoInputs.length; i++) {
    let autoInput = autoInputs[i];
    //获取父元素
    let parentEle = autoInput.parentNode;
    //父元素宽度
    let parentEleWidth = parentEle.clientWidth;
    //使其自适应宽度
    autoInput.style.maxWidth = parentEleWidth + "px";
    // disabled功能
    //是否添加disabled属性
    let disabled = autoInput.hasAttribute("disabled");
    //没添加disabled属性才允许输入
    if (!disabled) {
      let editAttr = document.createAttribute("contenteditable");
      editAttr.value = true;
      autoInput.setAttributeNode(editAttr);
    } else {
      //鼠标禁用状态
      autoInput.style.cursor = "not-allowed";
    }
    //value功能
    let value = autoInput.hasAttribute("disabled");
    if (value) {
      autoInput.textContent = autoInput.getAttribute("value");
    }

    //maxlength功能
    autoInput.addEventListener("input", (e) => {
      let isMax = e.target.hasAttribute("maxlength");
      if (isMax) {
        let max = parseInt(e.target.getAttribute("maxlength"));
        if (e.target.textContent.length > max) {
          e.target.textContent = e.target.textContent.slice(0, max);
          keepFocus(e.target);
        }
      }
    });
  }
};
//bug:解决超出截取后不能聚焦到最后的问题
function keepFocus(element) {
  if (window.getSelection) {
    element.focus();
    let range = window.getSelection();
    range.selectAllChildren(element);
    range.collapseToEnd(); //光标移至最后
  } else if (document.selection) {
    let range = document.selection.createRange();
    range.moveToElementText(element);
    range.collapse(false); //光标移至最后
    range.select();
  }
}
