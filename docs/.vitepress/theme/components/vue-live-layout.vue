<template>
  <div class="preview-code relative rounded">
    <div class="preview block overflow-hidden rounded-t">
      <slot name="preview"></slot> 
    </div>
    <div :class="`language-${lang} editor block`" class="rounded-b">
      <slot name="editor"></slot>
    </div>
  </div>
</template>

<script setup> 
import "vue-live/style.css";
import "prismjs/themes/prism.min.css";

defineProps({
  lang: String
})
</script>

<style>

.preview-code ol {
  padding: 0;
}
.preview-code {
  border: 1px solid #888888;
}
.vp-doc .preview-code .block {
  margin:0;
  min-height: 300px;
}

.preview-code .editor pre {
  margin: 0;
  box-sizing: border-box;
  height: 100%; 
  white-space: pre-wrap;
}
.preview-code .preview {
  box-sizing: border-box;
  padding: 12px;
}

.preview-code .prism-editor-wrapper { 
  padding: 0;
}

.preview-code .prism-editor-wrapper .prism-editor__textarea,
.preview-code .prism-editor-wrapper .prism-editor__editor {
  padding: 20px;
}

@media only screen and (max-width: 568px) {
  .preview-code {
    display: block;
  }
  .preview-code .block {
    width: auto;
  }
}
@media only screen and (max-width: 419px) {
  .preview-code {
    margin: 0.85rem -1.5rem;
    border-radius: 0;
  }
}
</style>