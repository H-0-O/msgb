import destr from 'destr'
import { defineStore, type StateTree } from 'pinia'
import { ref, type Ref } from 'vue'

interface Editor {
  data: Ref<any>
}

export const useEditorStore = defineStore(
  'editor',
  () => {
    const instances = ref<Record<string, Editor>>({})
    const persistEnable = ref<boolean>(true)

    function createInstance(id: string, initialValue: any = null) {
      if (!instances.value[id]) {
        instances.value[id] = {
          data: ref(initialValue),
        }
      }
      return instances.value[id]
    }

    function getEditor(id: string): Editor {
      const instance = instances.value[id]
      if (!instance) throw new Error(`Editor with this id (${id}) doesn't exists `)
      return instance
    }

    return {
      instances,
      createInstance,
      getEditor,
      persistEnable,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['instances' , 'persistEnable'],
      serializer: {
        serialize: (data) => {

          if (data.persistEnable) {
            return JSON.stringify(data)
          }
          return JSON.stringify({
            persistEnable: data.persistEnable,
          })
        },
        deserialize: (value) => {
          try {
            return destr<{ persistEnable: boolean; instances: {} }>(value, { strict: true })
          } catch (e) {
            return {}
          }
        },
      },
    },
  },
)
