
function dropdown() {
  let selecter = d3.select("#selDataset");

  d3.json("samples.json").then((data)=>{
    console.log(data);

    var sample_names = data.names;

    sample_names.forEach((myFunction) =>{
      selecter.append("option").text(myFunction).property("value", myFunction);


    });
   
    bar_charts(sample_names[0]);
    demotable(sample_names[0]);
    

  });
}

dropdown();
function demotable(x) {
  

  d3.json("samples.json").then((data)=>{
    // console.log(data);

    var sample_metadata = data.metadata;
    let meta_array = sample_metadata.filter(value => value.id == x);

    let selecter = d3.select("#sample-metadata");

    selecter.html("")

    
Object.entries(meta_array[0]).forEach(entry => {
  const [key, value] = entry;
  selecter.append("h5").text(`${key.toUpperCase()}: ${value}`);


    });
   



  });
}

function optionChanged(y){
  bar_charts(y);
  demotable(y);
  

}
function bar_charts(x){
  console.log(x);
  d3.json("samples.json").then((data)=>{
    console.log(data);

    var sample_array = data.samples;
    let sample_array2 = sample_array.filter(v => v.id == x);

    var ids = sample_array2[0].otu_ids;
    var s_values = sample_array2[0].sample_values;
    var labels = sample_array2[0].otu_labels;

    

    var bar_data = [{
      type: 'bar',
      x: s_values.slice(0,10).reverse(),
      y: ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
      text: labels.slice(0,10).reverse(),
      orientation: 'h'
    }]; 
    
    var bar_layout = {
      title: 'Bar Chart'
      
    };
    
    Plotly.newPlot('bar', bar_data, bar_layout);
  

    });

}
