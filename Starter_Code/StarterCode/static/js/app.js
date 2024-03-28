//url variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//fetch JSON data and log it
let data = d3.json(url).then(function(data) {
    console.log(data);
});

//create function to initialize dashboard 
function init () {
    //create dropdown
    let dropdownMenu = d3.select("#selDataset");
    //populate dropdown menu
    d3.json(url).then(function(data) {
        let sampleNames = data.names;
        //iterate through array and append each name
        sampleNames.forEach((name) => {
            //append each value to populate dropdown menu
            dropdownMenu.append("option")
            .text(name)
            .property("value", name);
        });

            //call first sample from list
            let firstEntry = sampleNames[0]
            //console.log(firstSample)

            //Call first plots to initialize
            createBar(firstEntry);
            createBubble(firstEntry);
            createDemographics(firstEntry);
    });

};

//create function to populate bar chart
function createBar (sampleID) {
    d3.json(url).then((data) => {
        let samples = data.samples;

    //apply filter for data 
    let results = samples.filter(sample => sample.id == sampleID);
    let sample = results[0];
    
    
    //assign variables to sample values
    let sample_values = sample.sample_values;
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    
    
    //set trace
    let trace1 = [
        {x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otu_id => "OTU "+otu_id).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h" }
    ];

    let layout = {title: "Top Ten OTUs"};

    Plotly.newPlot("bar", trace1, layout)

    });

};

//create function to populate bubble chart
function createBubble (sampleID) {
    d3.json(url).then((data) => {
        let samples = data.samples;

    //apply filter for data
    let results = samples.filter(sample => sample.id == sampleID);
    let sample = results[0];
    
    //assign variables to sample values
    let sample_values = sample.sample_values
    let otu_ids = sample.otu_ids
    let otu_labels = sample.otu_labels
    
    //set trace
    let trace2 = [
        {x: otu_ids.reverse(),
         y: sample_values.reverse(),
         text: otu_labels.reverse(),
         mode:"markers",
         marker:{
            size: sample_values, 
            color: otu_ids,
            colorscale: "Earth"
         }
         
        }];

    let layout = {
        xaxis: {title:"OTU ID"}
    };
    
    Plotly.newPlot("bubble", trace2, layout)

    });
};

//create function to populate Demographics info
function createDemographics (sampleID) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        //apply filter for data
        let results = metadata.filter(sample => sample.id == sampleID);
        let sample = results[0];

        //select panel from html and set to variable
        let panel = d3.select("#sample-metadata");
        panel.html("");
        //loop through each key and append data to panel
        for (key in sample) {
            panel.append("h6").text(key.toUpperCase()+": "+sample[key])
        }
    })
};



//define function that updates plots when dropdown changes
function optionChanged(sampleID) {
    createBar(sampleID);
    createBubble(sampleID);
    createDemographics(sampleID);
};

init()
