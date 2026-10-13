import { products } from '@/services/API';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductStore = defineStore("products",()=>{
    const items = ref([]);
    const loading = ref(true);
    const error = ref('');

    function load(){
        setTimeout(()=>{items.value = [...products]},3000)
        // items.value = [...products]
    }

    const categiries = ref([]);
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

    function loadCategories() {
        return [];
    }

    function init() {
        load();
        loadCategories();
    }

    return {init , categiries , categoryError , loading , error , load , active , upsert , loadCategories , items}
});