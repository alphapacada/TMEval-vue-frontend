export default {
  bind: function(el, binding, vnode) {
    el.myEventHandler = function(event) {
      vnode.context[binding.expression](event);
    };
    window.addEventListener("resize", el.myEventHandler);
  },
  unbind: function(el) {
    window.removeEventListener("resize", el.myEventHandler);
  },
};
