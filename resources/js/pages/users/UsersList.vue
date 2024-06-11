<script setup>
import { ref, onMounted, watch } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import {userService} from "../../services";

DataTable.use(DataTablesCore);

const users = ref([]);
const search = ref('');
const sortField = ref('');
const sortOrder = ref('asc');
const page = ref(1);
const pagination = ref({});

const columns = [
  { data: 'name', title: 'Name' },
  { data: 'email', title: 'Email' },
];

const options = {
  paging: false,
  info: false,
};

const fetchUsers = async () => {
  const response = await userService.fetchUsers({
    search: search.value,
    sort: sortField.value,
    order: sortOrder.value,
    page: page.value,
  });
  users.value = response.data;
  pagination.value = {
    prev_page_url: response.prev_page_url,
    next_page_url: response.next_page_url,
  };
};

const sort = (field) => {
  sortField.value = field;
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  fetchUsers();
};

const nextPage = () => {
  if (pagination.value.next_page_url) {
    page.value++;
    fetchUsers();
  }
};

const prevPage = () => {
  if (pagination.value.prev_page_url) {
    page.value--;
    fetchUsers();
  }
};

watch([search, page], () => {
  fetchUsers();
});

onMounted(() => {
  fetchUsers();
});
</script>
<template>
  <div class="container">
    <DataTable
        :columns="columns"
        :data="users"

        class="table table-hover table-striped"
        width="100%"
    >
      <thead>
      <tr>
        <th @click="sort('name')">Name</th>
        <th @click="sort('email')">Email</th>

      </tr>
      </thead>
      <tfoot>
      </tfoot>
    </DataTable>
  </div>
</template>
<style>
/* Add any custom styles here */
</style>
