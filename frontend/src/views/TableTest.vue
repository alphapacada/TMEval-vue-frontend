<template>
    
    <div id="topdiv">
      <v-card id="filter-card">
        <div class="row">
          <div class="col">
            <v-card-title primary-title class="mb-0 pb-0">
              <h2 class="mb-0 pb-0">Filters</h2>
            </v-card-title>
          </div>
          
        </div>
        <div class="row">
          <div class="col">
            <v-card-text>
            Use options below to narrow down results then click "Apply" at the lower left.
            </v-card-text>
          </div>
        </div>
        
      <div id="parameter-container" class="container">
        <div class="row">
          <div class="col-sm-4">
            parameter1: 
            <base-dropdown>    
                <base-button slot="title" type="secondary" class="dropdown-toggle">
                    {{ selectedParameter1Text }}
                </base-button>
                <li style="cursor:pointer" @click="setParameter1(index)" class="dropdown-item" :key=choice.value v-for="(choice,index) in parameter1Choices">{{ choice.text}}</li>
            </base-dropdown>           
          </div>
          <div class="col-sm-4">
              parameter2: 
              <base-dropdown>
                  <base-button slot="title" type="secondary" class="dropdown-toggle">
                      {{ selectedParameter2Text }}
                  </base-button>
                  <li style="cursor:pointer" @click="setParameter2(index)" class="dropdown-item" :key=choice.value v-for="(choice,index) in parameter2Choices">{{ choice.text}}</li>
              </base-dropdown>
            </div>
            <div class="col-sm-4">
              parameter3: 
              <base-dropdown>
                  <base-button slot="title" type="secondary" class="dropdown-toggle">
                      {{ selectedParameter3Text }}
                  </base-button>
                  <li style="cursor:pointer" @click="setParameter3(index)" class="dropdown-item" :key=choice.value v-for="(choice,index) in parameter3Choices">{{ choice.text}}</li>
              </base-dropdown>
            </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            parameter4: 
            <base-dropdown>
                <base-button slot="title" type="secondary" class="dropdown-toggle">
                    {{ selectedParameter4Text }}
                </base-button>
                <li style="cursor:pointer" @click="setParameter4(index)" class="dropdown-item" :key=choice.value v-for="(choice,index) in parameter4Choices">{{ choice.text}}</li>
            </base-dropdown>           
          </div>
          <div class="col-sm-4">
              parameter5: 
              <base-dropdown>
                  <base-button slot="title" type="secondary" class="dropdown-toggle">
                      {{ selectedParameter5Text }}
                  </base-button>
                  <li style="cursor:pointer" @click="setParameter5(index)" class="dropdown-item" :key=choice.value v-for="(choice,index) in parameter5Choices">{{ choice.text}}</li>
              </base-dropdown>
            </div>
            <div class="col-sm-4">
              parameter6: 
              <base-dropdown>
                  <base-button slot="title" type="secondary" class="dropdown-toggle">
                      {{ selectedParameter6Text }}
                  </base-button>
                  <li style="cursor:pointer" @click="setParameter6(index)" class="dropdown-item" :key=choice.value v-for="(choice,index) in parameter6Choices">{{ choice.text}}</li>
              </base-dropdown>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-btn flat color="green" style="font-weight:bold" @click="sendParameters">APPLY</v-btn>
          <v-btn flat color="red" style="font-weight:bold" @click="resetParameters">RESET</v-btn>
        </v-card-actions>
      </v-card>
    <v-card-title>
      <h2 class="pb-0">
        TMeval Results
      </h2>
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
        selectedParameter1Text:'A',
        selectedParameter2Text:'A',
        selectedParameter3Text:'A',
        selectedParameter4Text:'A',
        selectedParameter5Text:'A',
        selectedParameter6Text:'A',
        selectedParameter1Value:'a',
        selectedParameter2Value:'a',
        selectedParameter3Value:'a',
        selectedParameter4Value:'a',
        selectedParameter5Value:'a',
        selectedParameter6Value:'a',
        parameter1Choices:[{text:'A', value:'a'},{text:'B', value:'b'},{text:'C', value:'c'}],
        parameter2Choices:[{text:'A', value:'a'},{text:'B', value:'b'},{text:'C', value:'c'}],
        parameter3Choices:[{text:'A', value:'a'},{text:'B', value:'b'},{text:'C', value:'c'}],
        parameter4Choices:[{text:'A', value:'a'},{text:'B', value:'b'},{text:'C', value:'c'}],
        parameter5Choices:[{text:'A', value:'a'},{text:'B', value:'b'},{text:'C', value:'c'}],
        parameter6Choices:[{text:'A', value:'a'},{text:'B', value:'b'},{text:'C', value:'c'}],
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
    },
    methods: {
      sendParameters(){
        console.log("Parameters sent!");
      },
      resetParameters(){
        this.setParameter1(0);
        this.setParameter2(0);
        this.setParameter3(0);
        this.setParameter4(0);
        this.setParameter5(0);
        this.setParameter6(0);
        console.log("Parameters reset!");
        this.sendParameters();
      },
      setParameter1(index){
        this.selectedParameter1Text = this.parameter1Choices[index].text;
        this.selectedParameter1Value = this.parameter1Choices[index].value;
        console.log('parameter1: '+ this.selectedParameter1Text + ':' + this.selectedParameter1Value);
      },
      setParameter2(index){
        this.selectedParameter2Text = this.parameter2Choices[index].text;
        this.selectedParameter2Value = this.parameter2Choices[index].value;
        console.log('parameter2: '+ this.selectedParameter2Text + ':' + this.selectedParameter2Value);
      },
      setParameter3(index){
        this.selectedParameter3Text = this.parameter3Choices[index].text;
        this.selectedParameter3Value = this.parameter3Choices[index].value;
        console.log('parameter3: '+ this.selectedParameter3Text + ':' + this.selectedParameter3Value);
      },
      setParameter4(index){
        this.selectedParameter4Text = this.parameter4Choices[index].text;
        this.selectedParameter4Value = this.parameter4Choices[index].value;
        console.log('parameter4: '+ this.selectedParameter4Text + ':' + this.selectedParameter4Value);
      },
      setParameter5(index){
        this.selectedParameter5Text = this.parameter5Choices[index].text;
        this.selectedParameter5Value = this.parameter5Choices[index].value;
        console.log('parameter5: '+ this.selectedParameter5Text + ':' + this.selectedParameter5Value);
      },
      setParameter6(index){
        this.selectedParameter6Text = this.parameter6Choices[index].text;
        this.selectedParameter6Value = this.parameter6Choices[index].value;
        console.log('parameter6: '+ this.selectedParameter6Text + ':' + this.selectedParameter6Value);
      }
    }
}
</script>
<style>
#filter-card{
  margin-top:10px;
}
/* @import 'vuetify/dist/vuetify.min.css' */
</style>
