//url variable
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//fetch JSON data and log it
let data = d3.json(url).then(function(data) {
    console.log(data);
});

//create function to initialize dashboard 
function init () {
    //create dropdown
    let dropdownM = d3.select("#selDataset");
    //populate dropdown menu
    d3.json(url).then(function(data) {
        let sample_names = data.names;
        //iterate through array and append each name
        sample_names.forEach((name) => {
            //append to populate dropdown menu
            dropdownM.append("option")
            .text(name)
            .property("value", name);
        });

            //call first sample from list
            let first_Entry = sample_names[0]

            createBar(first_Entry);
            createBubble(first_Entry);
            createDemographics(first_Entry);
    });

};

//create function to populate bar chart
function createBar (sample_ID) {
    d3.json(url).then((data) => {
        let samples = data.samples;

    //apply filter for data 
    let results = samples.filter(sample => sample.id == sample_ID);
    let sample = results[0];
    
    
    //assign var to sample values
    let sample_values = sample.sample_values;
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    
    
    //set trace
    let trace = [
        {x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otu_id => "OTU "+otu_id).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h" }
    ];

    let layout = {title: "Top Ten OTUs"};

    Plotly.newPlot("bar", trace, layout)

    });

};

//create function to populate bubble chart
function createBubble (sample_ID) {
    d3.json(url).then((data) => {
        let samples = data.samples;

    //apply filter for data
    let results = samples.filter(sample => sample.id == sample_ID);
    let sample = results[0];
    
    //assign var to sample values
    let sample_values = sample.sample_values
    let otu_ids = sample.otu_ids
    let otu_labels = sample.otu_labels
    
    //set trace
    let trace = [
        {x: otu_ids.reverse(),
         y: sample_values.reverse(),
         text: otu_labels.reverse(),
         mode:"markers",
         marker:{
            size: sample_values, 
            color: otu_ids,
         }
         
        }];

    let layout = {
        xaxis: {title:"OTU ID"}
    };
    
    Plotly.newPlot("bubble", trace, layout)

    });
};

//create function to populate Demographics info
function createDemographics (sample_ID) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        //apply filter for data
        let results = metadata.filter(sample => sample.id == sample_ID);
        let sample = results[0];

        //panel and set variable
        let panel = d3.select("#sample-metadata");
        panel.html("");
        //loop through key and append 
        for (key in sample) {
            panel.append("h6").text(key.toUpperCase()+": "+sample[key])
        }
    })
};



//define function that updates plots when dropdown changes
function optionChanged(sample_ID) {
    createBar(sample_ID);
    createBubble(sample_ID);
    createDemographics(sample_ID);
};

init()
