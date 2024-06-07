<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <router-link class="nav-link" :class="{ 'collapsed': !$route.path.startsWith('/dashboard')}" to="/dashboard">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </router-link>
      </li><!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link" :class="{ 'collapsed': !$route.path.startsWith('/users')}"   data-bs-target="#users-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="users-nav" class="nav-content" :class="{ 'collapse': !$route.path.startsWith('/users')}" data-bs-parent="#sidebar-nav">
          <li>
            <router-link to="/users" :class="{ 'active': $route.path === '/users'}">
              <i class="bi bi-circle"></i><span>Users</span>
            </router-link>
          </li>
          <li>
            <router-link to="/users/roles" :class="{ 'active': $route.path === '/users/roles'}">
              <i class="bi bi-circle"></i><span>Roles</span>
            </router-link>
          </li>
          <li>
            <router-link to="/users/permissions" :class="{ 'active': $route.path === '/users/permissions'}">
              <i class="bi bi-circle"></i><span>Permissions</span>
            </router-link>
          </li>
        </ul>
      </li><!-- End Components Nav -->

      <li class="nav-item">
        <router-link class="nav-link" :class="{ 'collapsed': $route.path !== '/about'}" to="/about">
          <i class="bi bi-file-earmark"></i>
          <span>About</span>
        </router-link>
      </li><!-- End Blank Page Nav -->

    </ul>

  </aside><!-- End Sidebar-->
</template>