import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from '@/services/api';
export const useProductsStore = defineStore("products", () => {
  const items = ref([]),
    loading = ref(false),
    error = ref("");
  const categories = ref([]),
  categoryError = ref("");
  const active = computed(() => items.value.filter((p) => p.active));
  function upsert(product) {
    const index = items.value.findIndex((p) => p.id === product.id);
    if (index < 0) items.value.push(product);
    else items.value[index] = product;
  }
  async function load(){
        loading.value = true

        try {
            const products = await api.get('/products');
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

  async function loadCategories() {
    try {
      categories.value = await api.get("/categories");
      categoryError.value = "";
    } catch (e) {
      categoryError.value = e.message;
    }
  }
  async function init() {
    await Promise.all([load(), loadCategories()]);
  }
  return {
    items,
    categories,
    active,
    loading,
    error,
    categoryError,
    load,
    loadCategories,
    init,
    upsert,
  };
});