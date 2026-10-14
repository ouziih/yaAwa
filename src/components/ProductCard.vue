<script setup>
import { computed } from 'vue';
const props = defineProps({
    product:
    {
        type: Object, 
        required: true,
        validator:(value)=>{
            return value && 
            typeof value.name === 'string' &&
            typeof value.price === 'number' &&
            typeof value.stock === 'number' &&
            typeof value.categoryId === 'string' &&
            typeof value.unit === 'string'
        }
    }
})

const tarif = computed(() => {
  if (props.product.salePrice !== null) {
    return Math.ceil(((props.product.price - props.product.salePrice)*100)/props.product.price) 
  }
});


</script>

<template>
  <article class="product-card">
                    <div class="product-media">
                        <a :aria-label="product.name" href="#">
                            <img :alt="product.name" height="240" loading="lazy" :src="product.image"
                                width="360" />
                        </a>
                        <span v-if="product.salePrice" class="promo-tag">
                            Promo −{{ tarif }} %
                        </span>
                    </div>
                    <div class="product-body">
                        <p class="overline">
                            {{product.origin}}
                        </p>
                        <h3>
                            <a href="#">
                                {{product.name}}
                            </a>
                        </h3>
                        <p class="muted small">
                            {{product.unit}} · {{product.stock}} disponible(s)
                        </p>
                        <span :class="product.stock === 0 ? 'stock empty' : product.stock <= 5 ? 'stock low' : 'stock'">
                            <span aria-hidden="true">
                            </span>
                            {{(product.stock == 0) ? "Rupture" : (product.stock <= 5) ? "Stock faible" : "Disponible"}}
                        </span>
                        <div class="product-bottom">
                            <div>
                                <del v-if="product.salePrice">{{product.price}}</del>
                                <strong>
                                    {{(product.salePrice ? product.salePrice : product.price)}} FCFA
                                </strong>
                            </div>
                            <button aria-label="Ajouter Riz brisé parfumé au panier" class="add-button "
                                data-action="ajouter-panier" type="button" :disabled="product.stock === 0">
                                <svg aria-hidden="true" class="icon" fill="none" height="20" stroke="currentColor"
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" viewbox="0 0 24 24"
                                    width="20">
                                    <path d="M12 5v14M5 12h14">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
</template>

<style scoped>
.product-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 12%);
}
</style>
