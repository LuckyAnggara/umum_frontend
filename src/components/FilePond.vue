<template>
  <div id="app">
    <file-pond
      name="test"
      ref="input"
      label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
      :allow-multiple="allowMultiple"
      accepted-file-types="image/jpeg, image/png"
      v-on:init="handleFilePondInit"
      @addfile="filesChange"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
const myFiles = ref([])
const input = ref(null)

function handleFilePondInit() {
  console.log('FilePond has initialized')
}

function filesChange() {
  let files = input.value.getFiles()
  console.info(files[0].file)
  emit('fileChange', files[0].file)
}

const emit = defineEmits(['fileChange'])
const props = defineProps({
  allowMultiple: {
    type: Boolean,
    default: false,
  },
})
</script>
