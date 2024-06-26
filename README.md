# belly-button-challenge

## Background 
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Files
Download the following files to help you get started:
https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/Starter_Code.zip

## Instructions
Complete the following steps:

1. Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

  - Use sample_values as the values for the bar chart.

  - Use otu_ids as the labels for the bar chart.

  - Use otu_labels as the hovertext for the chart.

3. Create a bubble chart that displays each sample.

  - Use otu_ids for the x values.

  - Use sample_values for the y values.

  - Use sample_values for the marker size.

  - Use otu_ids for the marker colors.

  - Use otu_labels for the text values.

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. 

7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

## Submission
To submit your Challenge assignment, click Submit, and then provide the URL of your GitHub repository for grading.


### References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/