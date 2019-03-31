<template>
    
    <div id="topdiv">
    <v-card-title>
      TMeval Results
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
        <v-data-table 
               :headers="mainHeaders"
               :items="mainItems"
               item-key="name"
               expand
               :rows-per-page-items="rows"
               :search="search"
               class="elevation-1">
  <template slot="items" slot-scope="props">
    <tr @click="props.expanded = !props.expanded">
      <td class="text-xs">{{ props.item.name }}</td>
      <td class="text-xs">{{ props.item.age }}</td>
    </tr>
  </template>
  <template slot="expand" slot-scope="props">
    <v-card class="elevation-10">
      <v-card-text>

        <v-data-table :headers="subHeaders"
                      :items="subItems"
                      item-key="color"
                      hide-actions
                      class="elevation-10">
          <template slot="items" slot-scope="props">
            <td class="text-xs">{{ props.item.color }}</td>
            <td class="text-xs">{{ props.item.value }}</td>
          </template>
        </v-data-table>

      </v-card-text>
    </v-card>
  </template>
 </v-data-table>
    </div>
    
</template>
<script>
export default {
    data () {
        return {
        search: '',
        rows: [5],
        mainHeaders: [
            { text: 'Name', value: 'name' },
            { text: 'Age', value: 'age' },
            { text: 'Dream', value:'dream'},
            { text: 'Talent', value: 'talent'},
            { text: 'Weakness', value: 'weakness'}
        ],
        subHeaders: [
            { text: 'Color', value: 'color' },
            { text: 'Value', value: 'value' }
        ],
        mainItems: [
            { name: 'Marc	Moreno', age: '30' },
            { name: 'Wallace	Frank', age: '31' },
            { name: 'Enrique	Sanders', age: '45' },
            { name: 'Alyssa	Butler', age: '23' },
            { name: 'Domingo	Gill', age: '29' },
            { name: 'Felix	May', age: '28' },
            { name: 'Bradford	Powell', age: '15' },
            { name: 'Hattie	Coleman', age: '17' },
            { name: 'Marty	Jordan', age: '23' },
            { name: 'Bobbie	Webb', age: '28' }
        ],
        subItems: [
            { color: 'Red', value: '1' },
            { color: 'Green', value: '2' },
            { color: 'Blue', value: '3' },
            { color: 'Black', value: '4' }
        ],
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
        }
    }
}
</script>
<style scoped>
/* @import 'vuetify/dist/vuetify.min.css' */
</style>
