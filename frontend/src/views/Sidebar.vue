<template>

<div id="assessment" class="row">
    <div id="sidebar-container" class="col-md-3">
        <v-navigation-drawer
    stateless
    floating="true"
    value="true"
  >
    <v-list>
      
      <v-list-tile to="/sidebartest/assessment">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Assessment</v-list-tile-title>
      </v-list-tile>

      <v-list-tile to="/sidebartest/table">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Table</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(admin, i) in admins"
            :key="i"
          >
            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Actions</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(crud, i) in cruds"
            :key="i"
          >
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
    </div>
    <div class="col-md-9">
        <div id="page-content" class="col-md-11">
           <fade-transition origin="center" mode="out-in" :duration="100">
            <router-view></router-view>
             </fade-transition>
        </div>
    </div>
  </div>

</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
    components: {
      FadeTransition
    },
    data: () => ({
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]
    })
};
</script>
<style>
#assessment {
  padding: 60px 0px 0px 0px;

}

#sidebar-container{
    display: inline-block;
    padding-bottom: 10px;
}
#page-content{
    display: inline-block;
    padding-bottom: 10px;
}

</style>