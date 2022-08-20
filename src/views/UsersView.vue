<template>
  <div class="container">
    <!-- <div class="text-center"><h3>Контентная модель</h3></div> -->
    <div class="row mt-4">
      <div class="header-block row">
        <div class="search-form col-6">
          <div class="form">
            <form>
              <div class="form-group row">
                <div class="col-4">
                  <input
                    autocomplete="off"
                    type="text"
                    name="name"
                    placeholder="Наименование"
                    id="name"
                    class="form-control"
                    v-model="filter_form.name"
                  />
                </div>
                <div class="col-4">
                  <input
                    autocomplete="off"
                    type="text"
                    name="name"
                    placeholder="Email"
                    id="name"
                    class="form-control"
                    v-model="filter_form.email"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="create col-6 text-right">
          <button
            class="btn btn-outline-primary btn-unbordered"
            id="clear-btn"
            @click="cleanSearch()"
          >
            <span class="fa fa-paint-brush fa-lg"></span> Очистить
          </button>
        </div>
      </div>
    </div>

    <table class="table table-bordered table-hover mt-4">
      <tr>
        <th>ID</th>
        <th>ФИО</th>
        <th>Email</th>
        <th>Avatar</th>
      </tr>
      <tr v-if="data.data.length === 0">
        <td class="text-center text-danger" colspan="7">
          <b>Данные не найдены!</b>
        </td>
      </tr>
      <tr v-else v-for="(element, index) in data.data.data" :key="index">
        <td>{{ element.id }}</td>
        <td>{{ element.first_name + " " + element.last_name }}</td>
        <td>{{ element.email }}</td>
        <td><img :src="element.avatar" alt="" /></td>
      </tr>
    </table>
  </div>
</template>



<script>
import $ from 'jquery'
export default {
  data: function () {
    return {
      data: null,
      filter_form: {
        status: "",
        name: "",
        active_from: "",
        active_after: "",
      },
      //https://lobster.tools/api/v1/categories
    };
  },
  computed: {},
  methods: {
    async getCategories() {
      this.data = await this.axios.get("https://reqres.in/api/users", {
        headers: {
          "Content-Type": "application/json",
          //'Authorization': 'Bearer BT3HK2NpCnyrKiDo'
        },
      });
    },
    cleanSearch() {
      $("form").each(function () {
        this.reset();
      });
    },
  },
  filters: {
    fio: function (element) {
      return element.first_name + " " + element.last_name;
    },
  },
  async created() {
    this.getCategories();
  },
};
</script>
