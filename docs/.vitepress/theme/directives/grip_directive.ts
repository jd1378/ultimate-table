import type {DirectiveBinding} from 'vue';

const evtOpts: AddEventListenerOptions & EventListenerOptions = {passive: true};

type ExtendedHTMLElement = HTMLElement & {
  _destroyGrip?: () => void;
};

function directiveMount(el: ExtendedHTMLElement, binding: DirectiveBinding) {
  directive(el, binding);
} 

function directive(el: ExtendedHTMLElement, binding: DirectiveBinding) {
  el._destroyGrip && el._destroyGrip(); 

  const gripNode = document.createElement("div");
  gripNode.className = "rounded-r absolute right-0 top-0 bottom-0 w-3 cursor-col-resize bg-black items-center justify-center flex z-10 select-none";
  gripNode.innerHTML = '<svg class="absolute size-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.009 80.009"><g transform="translate(-69.358 -67.376)"><circle cx="109.362" cy="107.381" r="40.005"/><g fill="#f9f9f9"><path d="M113.328 86.078h3.924v42.606h-3.924zM101.472 86.078h3.924v42.606h-3.924z"/></g></g></svg>';
  el.classList.add('pe-3')

  let widthModifier = 0;
  let prevX = 0; 

  function onMove(event: TouchEvent | MouseEvent) {  
    let currentX;
    if (event instanceof MouseEvent) {
      currentX = event.clientX; 
    } else {
      currentX = event.touches[0].clientX; 
    }
    const deltaX = currentX - prevX;
    prevX = currentX;
    widthModifier += deltaX;
    el.style.width = `calc(100% + ${widthModifier}px)`
  }

  function touchStart(event: TouchEvent) {
    if (!event.composedPath().includes(gripNode)) return;
    prevX = event.touches[0].clientX;
    window.addEventListener('touchmove', onMove, evtOpts); 
  }

  function mouseDown(event: MouseEvent) {  
    if (!event.composedPath().includes(gripNode)) return;
    prevX = event.clientX;
    window.addEventListener('mousemove', onMove, evtOpts); 
  }

  function touchEnd() {
    window.removeEventListener('touchmove', onMove, evtOpts);
  }

  function mouseUp(event: MouseEvent) { 
    prevX = event.clientX;
    window.removeEventListener('mousemove', onMove, evtOpts); 
  } 

  window.addEventListener('touchstart', touchStart, evtOpts);
  window.addEventListener('mousedown', mouseDown, evtOpts);
  window.addEventListener('touchend', touchEnd, evtOpts);
  window.addEventListener('mouseup', mouseUp, evtOpts); 
  el.appendChild(gripNode);

  el._destroyGrip = () => {
    window.removeEventListener('touchstart', touchStart, evtOpts);
    window.removeEventListener('mousedown', mouseDown, evtOpts);
    window.removeEventListener('touchend', touchEnd, evtOpts);
    window.removeEventListener('mouseup', mouseUp, evtOpts);
    window.removeEventListener('touchmove', onMove, evtOpts);
    window.removeEventListener('mousemove', onMove, evtOpts); 
    el.removeChild(gripNode);
    delete el._destroyGrip;
  };
}

export const gripDirective = {
  mounted: directiveMount,
  updated: directive,
  beforeUnmount(el: ExtendedHTMLElement) {
    if (el._destroyGrip) el._destroyGrip();
  },
  getSSRProps(_: any, __: any) {
    return {};
  },
};

export default gripDirective;
