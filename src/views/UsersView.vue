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
        <th class="hover" @click="sort('id')">{{ sortBy === "id" ? "*" : "" }}ID</th>
        <th class="hover" @click="sort('first_name')">{{ sortBy === "first_name" ? "*" : "" }}ФИО</th>
        <th class="hover" @click="sort('email')">{{ sortBy === "email" ? "*" : "" }}Email</th>
        <th>Аватар</th>
      </tr>
      <tr v-if="data.data.length === 0">
        <td class="text-center text-danger" colspan="7">
          <b>Данные не найдены!</b>
        </td>
      </tr>
      <tr v-else v-for="(element, index) in filteredUsers" :key="index">
        <td>{{ element.id }}</td>
        <td>{{ element.first_name + " " + element.last_name }}</td>
        <td>{{ element.email }}</td>
        <td><img :src="element.avatar" alt="" /></td>
      </tr>
    </table>
  </div>
</template>


<style scoped>
.hover:hover{
  cursor: pointer;
}
</style>
<script>
//import $ from "jquery";
export default {
  data: function () {
    return {
      sortBy: "id",
      sortOrder: 1,
      data: null,
      filter_form: {
        name: "",
        email: "",
      },
      //https://lobster.tools/api/v1/categories
    };
  },
  computed: {
    filteredUsers: function () {
      return this.data.data.data
        .filter(
          (user) =>
            (user.first_name.toLowerCase().match(this.filter_form.name) ||
              user.last_name.toLowerCase().match(this.filter_form.name)) &&
            user.email.toLowerCase().match(this.filter_form.email)
        )
        .map((i) => ({ ...i, id: parseFloat(i.id) })) //начало сортировки по возрастанию или убыванию sortBy - это по какому полю назначение поля в функции сорт
        .sort((a, b) => {
          if (a[this.sortBy] >= b[this.sortBy]) {
            return this.sortOrder;
          }
          return -this.sortOrder;
        });
    },
  },
  methods: {
    async getCategories() {
      this.data = await this.axios.get("https://reqres.in/api/users", {
        headers: {
          "Content-Type": "application/json",
          //'Authorization': 'Bearer BT3HK2NpCnyrKiDo'
        },
      });
    },
    sort: function (sortBy) {
      if (this.sortBy === sortBy) {
        this.sortOrder = -this.sortOrder;
      } else {
        this.sortBy = sortBy;
      }
    },
    cleanSearch() {
      this.filter_form.name = "";
      this.filter_form.email = "";
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
