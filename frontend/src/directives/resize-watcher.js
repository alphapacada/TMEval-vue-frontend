export default {
  bind: function(el, binding, vnode) {
    // console.log("binddd");
    el.myEventHandler = function(event) {
    //   console.log("window resize desu");
        vnode.context[binding.expression](event);
    };
    window.addEventListener("resize", el.myEventHandler);
  },
  unbind: function(el) {
    window.removeEventListener("resize", el.myEventHandler);
  }
};
