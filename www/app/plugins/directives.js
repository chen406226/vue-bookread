export default function(Vue){
  Vue.directive("style",{
    inserted(el, binding){
      var a=Object.keys(binding.value)[0];
      var b=Object.keys(binding.value)[1];
      $(el).css({
        [a]:binding.value[a],
        [b]:binding.value[b]
      })
      // el.style.color=binding.value.color;
      // $(el).css('background',binding.value.backgroundColor)
    }
  });
  Vue.directive("height",{
    // 这里的el是指用了v-height指令的那个原生标签,
    // 而binding则是存储了height有关属性的一个对象
    inserted(el, binding){
      el.style.height=binding.value
    }
  });
  Vue.directive('drag',{
    inserted(el, binding){
      el.addEventListener("touchstart",(e)=>{
        const maxwidth = parseInt(getComputedStyle(el.parentNode)['width']);
        var dist = e.changedTouches[0].clientX - el.offsetLeft;
        document.addEventListener("touchmove",(doc)=>{
          var move = doc.changedTouches[0].clientX;
          var dis = parseInt(move-dist);
          var bwidth = dis;
          if (dis<=0) {
            bwidth = 0;
            el.style.left = '0px';
          }else if(dis>maxwidth) {
            bwidth = maxwidth;
            el.style.left = maxwidth+'px';
          }else {
            el.style.left = move - dist +"px";
          }
          console.log(bwidth)
          $(el.parentNode).find("b").width(bwidth);
          $(el.parentNode).find("i").width(maxwidth - bwidth);
        })
      })
    }
  })

}