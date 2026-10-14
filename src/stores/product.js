import { api } from '@/services/API';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductStore = defineStore("products",()=>{
    const items = ref([]);
    const loading = ref(true);
    const error = ref('');

    async function load(){
        loading.value = true

        try {
            const products = await api.get('products');
             items.value = products
             return products
        } 
        catch (e) {
            error.value = e.message
        }
        finally{
            loading.value = false;
        }
        // items.value = [...products]
    }

    const categories = ref([]);
    const categoryError = ref('');
    const active = computed(()=>items.value.filter((item)=>item.active));

    function upsert(product) {

        const index = items.value.findIndex(()=>item.id === product.id)

        if(index < 0)
        {
            items.value.push(product)
        }
        else
        {
            index.value[index] = product
        }
    }

  async function loadCategories() {
        try {
           const categorie = await api.get('categories');
            categories.value = categorie
        } 
        catch (e) {
            categoryError.value = e.message
        }
    }

    async function init() {
        return Promise.all([load(),loadCategories()])
    }

    return {init , categories , categoryError , loading , error , load , active , upsert , loadCategories , items}
});