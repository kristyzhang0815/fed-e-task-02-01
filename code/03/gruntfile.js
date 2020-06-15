// 这块作业没有认真实现，主要写完作业我还要加班，哭，老师，我后面会补的

const loadGruntTasks=require('load-grunt-tasks')
const sass = require('sass')

module.exports=grunt=>{
  grunt.initConfig({
    sass:{
      options:{
        sourceMap:true,
        implementation:sass
      },
      main:{
        files:{
          'dist/css/main.css':'src/assets/styles/main.scss'
        }
      }
    },
    babel:{
      options:{
        sourceMap:true,
        presets:['@babel/preset-env']
      },
      main:{
        files:{
          'dist/js/main.js':'src/assets/scripts/main.js'
        }
      }
    },
    watch:{
      js:{
        files:['src/assets/scripts/main.js'],
        tasks:['babel']
      },
      css:{
        files:['src/assets/styles/main.scss'],
        tasks:['sass']
      }
    }
  })


  // grunt.loadNpmTask('grunt-sass')
  loadGruntTasks(grunt)

  grunt.registerTask('default',['sass','babel','watch'])
}