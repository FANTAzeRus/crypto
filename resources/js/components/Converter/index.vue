<template>
  <div class="converter-wrapper">
    <div class="converter">
      <div class="form-line">
        <div class="field-wrapper">
          <div class="label">Сумма к выводу</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.summout"
              @focus="inputFocus($event)"
              @input="calcOut"
            />
          </div>
        </div>

        <div class="field-wrapper currency-select">
          <div class="label">Валюта</div>
          <div class="input-wrapper">
            <select v-model="form.currency" @change="recalc">
              <option
                v-for="item in currency"
                :key="item.name"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="field-wrapper">
          <div class="label">Наша комиссия</div>
          <div class="input-wrapper">
            <input type="text" readonly v-model="form.commission" />
          </div>
        </div>
      </div>

      <div class="form-line">
        <div class="field-wrapper">
          <div class="label">Мы отправляем</div>
          <div class="input-wrapper">
            <input type="text" readonly v-model="form.sending" />
          </div>
        </div>

        <div class="field-wrapper currency-select">
          <div class="label">Криптовалюта</div>
          <div class="input-wrapper">
            <select v-model="form.c_currency" @change="recalc">
              <option
                v-for="item in c_currency"
                :key="item.name"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="field-wrapper">
          <div class="label">Вы получате</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.converted"
              @focus="inputFocusBack($event)"
              @input="calcIn"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, computed, reactive } from "vue";
import { useStore } from "vuex";
let timer = null;

export default {
  setup() {
    const store = useStore();
    const currency = computed(() => store.state.currency);
    const c_currency = computed(() => store.state.c_currency);
    var lastCalc = null;

    const ci = computed(() => {
      let ct = currency.value.find((c) => c.name === form.currency);
      return ct ? ct.icon : "";
    });

    const cci = computed(() => {
      let ct = c_currency.value.find((c) => c.name === form.c_currency);
      return ct ? ct.icon : "";
    });

    const form = reactive({
      summout: 0,
      currency: "EUR",
      commission: 0,
      sending: 0,
      c_currency: "BTC",
      converted: 0,
    });

    const inputFocus = (e) => {
      e.target.value = ci.value;
    };

    const inputFocusBack = (e) => {
      e.target.value = " " + cci.value;
      setTimeout(function () {
        e.target.setSelectionRange(0, 0);
      }, 0);
    };

    const recalc = () => {
      if (lastCalc) {
        if (lastCalc === "straight") {
          calcOut();
        }
        if (lastCalc === "back") {
          calcIn();
        }
      }
    };

    const calculateData = () => {
      let summout = normalizeInput(form.summout);
      let commission = (summout / 100) * 4.5;

      form.commission = ci.value + commission.toFixed(2);
      form.sending = ci.value + (summout - commission).toFixed(2);
    };

    const normalizeInput = (val) => {
      return parseFloat(String(val).replace(/[^.\d]+/g, ""));
    };

    const calcOut = () => {
      calculateData();

      store.dispatch("convert", {
        from: String(form.currency).toLowerCase(),
        to: String(form.c_currency).toLowerCase(),
        summ: normalizeInput(form.sending),

        callback: (data) => {
          form.converted = `${data} ${cci.value}`;
          lastCalc = "straight";
        },
      });
    };

    const calcIn = () => {
      store.dispatch("convert", {
        from: String(form.c_currency).toLowerCase(),
        to: String(form.currency).toLowerCase(),
        summ: normalizeInput(form.converted),

        callback: (data) => {
          form.summout = ci.value + parseFloat(data).toFixed(2);
          lastCalc = "back";
          calculateData();
        },
      });
    };

    return {
      currency,
      c_currency,
      inputFocus,
      inputFocusBack,
      form,
      calcOut,
      calcIn,
      recalc,
    };
  },
};
</script>