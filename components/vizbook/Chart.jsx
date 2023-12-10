// src/components/AttributeSelector.js
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import dataset from '../../data/csv.json'; // Adjust the path as needed
import Image from 'next/image'
import QnA from './QnA';

const AttributeSelector = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const d3Container = useRef(null);
  const ageVsSurvivalImage = '/violinPlot.png';
  const sibvsSurvivalImage = '/sibvvssip.png'
  const parchVsSurvival = '/ParchvsSurvival.png'
  const questionDataOne = {
    "Q": 1,
    "question": "Based on the provided Gender vs Survival, Which gender has a better survival chance?",
    "options": ["Male", "Female"],
    "incorrect": "Incorrect. Hint: Could you try to find the summary of the Gender vs Survival graph?",
    "correct": "Female",
    "correctFeedback": "Note: Females have better survival chance."
  };
  const questionDataTwo ={
    "Q": 2,
    "question": "Based on the provided Pclass vs Survival Graph, what can be concluded about the relationship between passenger class (Pclass) and survival on the Titanic?",
    "options": ["Higher class passengers have a higher survival chance", "Lower class passengers have a higher survival chance", "There is no clear relationship between Pclass and survival","Pclass does not impact survival"],
    "incorrect": "Incorrect. Hint: Could you try to find out the summary of the Pclass vs Survival graph ?",
    "correct": "Higher class passengers have a higher survival chance",
    "correctFeedback":"Note: Higher class passengers have better survival chance (may be because they are more privileged to be saved). <br>Note: Higher class passengers (low Pclass) have better average survival than the low class (high Pclass) passengers"

  }
  const questionDataThree =  {
    "Q": 3,
    "question": "What can be observed from the catplot showing the relationship between Gender, Survived, and Pclass?",
    "options": ["Women from all Pclasses have almost 100% survival chance", "Women from 1st and 2nd Pclass have almost 100% survival chance", "Men from 1st and 2nd Pclass have almost 100% survival chance","Men from 2nd and 3rd Pclass have almost 100% survival chance"],
    "incorrect": "Incorrect. Another hint for this question. Incorrect. Could you try to find the summary of the Pclass & Gender vs. Survival  graph ?",
    "correct": "Women from 1st and 2nd Pclass have almost 100% survival chance",
    "correctFeedback": "Women from 1st and 2nd Pclass have almost 100% survival chance. <br> Men from 2nd and 3rd Pclass have only around 10% survival chance. "
  }
  const questionDataFour =  {
    "Q": 4,
    "question": "If you are Male, which port should you NOT embark from?",
    "options": ["Cherbourg", "Queenstown", "option C"],
    "incorrect": "Sorry, that's incorrect. Hint: Please Check Pclass, Gender & Embarked vs. Survival graph",
    "correct": "Queenstown",
    "correctFeedback": "Correct! Queenstown is the correct answer."
  }
  const questionDataFive = {
    "Q": 5,
    "question": "What observations can be made from the plots showing the relationship between Pclass, Age, Gender, and Survival?",
    "options": ["1st Pclass has more children compared to other two classes", "2nd Pclass has the highest survival rate among children aged 0 to 10", "Most male children (age 0 to 14) have a higher survival rate","Women from 1st and 2nd Pclass have almost 100% survival chance","Younger people from 1st Pclass have a lower survival rate compared to older people"],
    "incorrect": "Sorry, that's not correct. Please try again.",
    "correct": "Women from 1st and 2nd Pclass have almost 100% survival chance",
    "correctFeedback": "That's correct! Women from 1st and 2nd Pclass indeed have almost 100% survival chance."
  }
  useEffect(() => {
   
  
    if (selectedOption === 'Gender vs. Survival' && d3Container.current) {
      // Clear previous SVG
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      d3.select(d3Container.current).selectAll("*").remove();
  
      // Set the dimensions and margins of the graph
      const containerWidth = d3.select(d3Container.current).node().getBoundingClientRect().width;
      // Append the svg object to the div called 'd3Container'
      const svg = d3.select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left+containerWidth + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${(32+containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);
  
      // Process the data to get survival percentages by gender
      const survivalPercentagesByGender = d3.rollups(
        dataset,
        g => d3.mean(g, d => d.Survived) * 100,
        d => d.Gender
      ).map(([key, value]) => ({
        Gender: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
        SurvivalPercentage: value
      }));
  
      // X axis
      const x = d3.scaleBand()
        .range([0, width])
        .domain(survivalPercentagesByGender.map(d => d.Gender))
        .padding(0.4);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle")
        .style("font-size", "14px"); // Increase font size
  
      // Y axis
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "14px"); // Increase font size
  
      // Bars
      svg.selectAll("rect")
        .data(survivalPercentagesByGender)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Gender))
        .attr("y", d => y(d.SurvivalPercentage))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.SurvivalPercentage))
        .attr("fill", d => d.Gender === 'Male' ? "#69b3a2" : "#f4a261"); // Color by gender
  
      // Text labels for the percentages
      svg.selectAll(".label")        
        .data(survivalPercentagesByGender)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d => x(d.Gender) + x.bandwidth() / 2))
        .attr("y", d => y(d.SurvivalPercentage) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px") // Increase font size
        .text(d => `${d.SurvivalPercentage.toFixed(1)}`); // Remove percentage sign
  
      // Y Axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px") // Increase font size
        .text("Survival Percentage"); 
  
      // X Axis label
      svg.append("text")             
        .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
        .style("text-anchor", "middle")
        .style("font-size", "14px") // Increase font size
        .text("Gender");
        const nonSurvivalPercentagesByGender = d3.rollups(
  dataset,
  g => (1 - d3.mean(g, d => d.Survived)) * 100, // Calculate non-survival rate
  d => d.Gender
).map(([key, value]) => ({
  Gender: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
  NonSurvivalPercentage: value
}));



    // Create a separate SVG for the non-survival chart
    const svgNonSurvived = d3.select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left+containerWidth + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${(containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);
    // X axis for the non-survival chart
    const xNonSurvived = d3.scaleBand()
      .range([0, width])
      .domain(nonSurvivalPercentagesByGender.map(d => d.Gender))
      .padding(0.4);

    svgNonSurvived.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xNonSurvived))
      .style("font-size", "14px")
    // Y axis for the non-survival chart
    const yNonSurvived = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    svgNonSurvived.append("g")
      .call(d3.axisLeft(yNonSurvived));

    // Bars for the non-survival chart
    svgNonSurvived.selectAll(".bar")
      .data(nonSurvivalPercentagesByGender)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xNonSurvived(d.Gender))
      .attr("y", d => yNonSurvived(d.NonSurvivalPercentage))
      .attr("width", xNonSurvived.bandwidth())
      .attr("height", d => height - yNonSurvived(d.NonSurvivalPercentage))
      .attr("fill", d => d.Gender === 'Male' ? "#69b3a2" : "#f4a261"); // Color for non-survival, different from survival chart

    // Labels for non-survival percentages
    svgNonSurvived.selectAll(".label")
      .data(nonSurvivalPercentagesByGender)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => xNonSurvived(d.Gender) + xNonSurvived.bandwidth() / 2)
      .attr("y", d => yNonSurvived(d.NonSurvivalPercentage) - 5)
      .attr("text-anchor", "middle")
      .text(d => `${d.NonSurvivalPercentage.toFixed(1)}`);
      // Y Axis label
      svgNonSurvived.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px") // Increase font size
      .text("Not Survived Passenger Percentage"); 
    // Add title to non-survival chart
    svgNonSurvived.append("text")
      .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Gender");

      const processedData = d3.rollups(
        dataset,
        group => ({
          Survived: group.filter(d => d.Survived === "1").length,
          NotSurvived: group.filter(d => d.Survived === "0").length
        }),
        d => d.Gender
      ).map(([Gender, values]) => ({
        Gender: Gender.charAt(0).toUpperCase() + Gender.slice(1),
        Survived: values.Survived,
        NotSurvived: values.NotSurvived,
        Total: values.Survived + values.NotSurvived
      }));
      
      // Calculate percentages
      processedData.forEach(d => {
        d.SurvivedPercent = (d.Survived / d.Total) * 100;
        d.NotSurvivedPercent = (d.NotSurvived / d.Total) * 100;
      });
      
      // Set the dimensions and margins of the graph

   
      // Calculate space needed for the next chas

    }
    if (selectedOption === 'Pclass vs. Survival' && d3Container.current) {
      // Clear any existing content
      d3.select(d3Container.current).selectAll("*").remove();
      const containerWidth = d3.select(d3Container.current).node().getBoundingClientRect().width;
      // Margin conventions
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
    
      // Append SVG to the container
      const svg = d3.select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + containerWidth + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${(32 + containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);
    
      // Compute survival rates by Pclass and sort by Pclass
      const survivalRatesByPclass = d3.rollup(dataset,
        v => ({
          Survived: d3.sum(v, d => d.Survived == "1") / v.length * 100,
          NotSurvived: d3.sum(v, d => d.Survived == "0") / v.length * 100
        }),
        d => d.Pclass
      );
    
      // Sort Pclasses and convert map to array
      const orderedPclasses = Array.from(survivalRatesByPclass.keys()).sort(d3.ascending);
      const survivalData = orderedPclasses.map(Pclass => ({
        Pclass: `Class ${Pclass}`,
        ...survivalRatesByPclass.get(Pclass)
      }));
    
      // Scales
      const x0 = d3.scaleBand()
        .domain(survivalData.map(d => d.Pclass))
        .rangeRound([0, width])
        .paddingInner(0.1);
    
      const x1 = d3.scaleBand()
        .domain(["Survived", "NotSurvived"])
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);
    
      const y = d3.scaleLinear()
        .domain([0, 100])
        .rangeRound([height, 0]);
    
      // Axes
      const xAxis = g => g
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0));
    
      const yAxis = g => g
        .call(d3.axisLeft(y));
    
      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
    
      // Grouped bar chart
      const barGroups = svg.selectAll("g.bar-group")
        .data(survivalData)
        .enter()
        .append("g")
        .attr("class", "bar-group")
        .attr("transform", d => `translate(${x0(d.Pclass)},0)`);
    
      barGroups.selectAll("rect")
        .data(d => ["Survived", "NotSurvived"].map(key => ({ key, value: d[key] })))
        .enter()
        .append("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => d.key === "Survived" ? "#69b3a2" : "#f4a261");
    
      // Add percentage labels above each bar
      barGroups.selectAll("text")
        .data(d => ["Survived", "NotSurvived"].map(key => ({ key, value: d[key] })))
        .enter()
        .append("text")
        .attr("x", d => x1(d.key) + x1.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => `${d.value.toFixed(1)}%`);
    
      // Add labels
      svg.append("g")
        .attr("transform", `translate(-40,${height / 2})`)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Percentage");
    
      svg.append("g")
        .attr("transform", `translate(${width / 2},${height + 35})`)
        .append("text")
        .attr("text-anchor", "middle")
        .text("Pclass");
    
      // Title
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height+ 52)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Survived Passengers by Pclass");



    
      // Calculate the starting position for the next chart
// Assuming 'dataset' is an array of objects structured as in your example

// Process the dataset to calculate average survival rate by Pclass
const pclassSurvivalAverage = d3.rollups(
  dataset,
  group => d3.mean(group, d => +d.Survived) , // Convert Survived to number and calculate the mean
  d => d.Pclass // Group by Pclass
).map(([Pclass, avgSurvival]) => ({
  Pclass: Pclass == 1 ? 'First Class' : Pclass == 2 ? 'Second Class' : 'Third Class', // Map Pclass to readable format
  AverageSurvival: avgSurvival // The average is already in percentage
}));

// Append a new SVG element for the second chart
const svg2 = d3.select(d3Container.current)
  .append("svg")
  .attr("width", width + margin.left+containerWidth + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${(32+containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);

// X scale for the second chart
const xScale2 = d3.scaleBand()
  .domain(pclassSurvivalAverage.map(d => d.Pclass))
  .range([0, width])
  .padding(0.2);

// Y scale for the second chart
const yScale2 = d3.scaleLinear()
  .domain([0, 1]) // Assuming the rate is in percentage
  .range([height, 0]);

// Append X-axis for the second chart
svg2.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale2));

// Append Y-axis for the second chart
svg2.append("g")
  .call(d3.axisLeft(yScale2).ticks(null, "%"));

// Create bars for the second chart
svg2.selectAll(".bar")
  .data(pclassSurvivalAverage)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale2(d.Pclass))
  .attr("y", d => yScale2(d.AverageSurvival))
  .attr("width", xScale2.bandwidth())
  .attr("height", d => height - yScale2(d.AverageSurvival))
  .attr("fill", "#69b3a2")
  .append("text")
  .attr("class", "bar")
  .attr("x", d => xScale2(d.Pclass) + xScale2.bandwidth() / 2)
  .attr("y", d => yScale2(d.AverageSurvival) - 5)
  .attr("text-anchor", "middle")
  .text(d => `${d.AverageSurvival.toFixed(1)}%`); 
  svg2.append("text")
  .attr("x", width / 2)
  .attr("y", height+ 52)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Pclass");
   // Add labels
   svg2.append("g")
   .attr("transform", `translate(-40,${height / 2})`)
   .append("text")
   .attr("transform", "rotate(-90)")
   .attr("text-anchor", "middle")
   .text("Avg. Survived Percentage");

  
  
}
    
if (selectedOption === 'Pclass & Gender vs. Survival' && d3Container.current) {
  // Clear any existing content
  d3.select(d3Container.current).selectAll("*").remove();
  const containerWidth = d3.select(d3Container.current).node().getBoundingClientRect().width;
  // Margin conventions
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  // Process and aggregate data
  const sortedDataset = dataset.sort((a, b) => d3.ascending(a.Pclass, b.Pclass));

  const pclassGenderData = d3.rollups(sortedDataset,
    v => ({
      MaleSurvived: d3.sum(v, d => d.Gender == 'male' && d.Survived == "1") / d3.sum(v, d => d.Gender == 'male'),
      FemaleSurvived: d3.sum(v, d => d.Gender == 'female' && d.Survived == "1") / d3.sum(v, d => d.Gender == 'female'),
    }),
    d => d.Pclass
  ).map(([Pclass, rates]) => ({
    Pclass: `Class ${Pclass}`,
    MaleSurvived: rates.MaleSurvived,
    FemaleSurvived: rates.FemaleSurvived,
  }));

  // Scales
  const xScale = d3.scaleBand()
    .domain(pclassGenderData.map(d => d.Pclass))
    .rangeRound([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([height, 0]);

  // Axes
  const xAxis = g => g
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  const yAxis = g => g
    .call(d3.axisLeft(yScale).ticks(null, "%"));

  const svg = d3.select(d3Container.current)
    .append("svg")
    .attr("width", width + margin.left + containerWidth + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${(32 + containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.append("text")
  .attr("transform", `translate(${width / 2},${height + 35})`)
  .style("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Pclass");
  // Add bars for male and female survival rates
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-size", "14px") // Increase font size
  .text("Percentage (%)");

  
  
  svg.append("text")
        .attr("x", width / 2)
        .attr("y", height+ 52)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Survived Passengers by Pclass");
        const legendColors = {
          'Male': '#69b3a2',
          'Female': '#f4a261',
         
        };
        
        const legend = svg.append('g')
          .attr('transform', `translate(${width - margin.right},${10-margin.top})`);
        
        Object.entries(legendColors).forEach(([key, value], index) => {
          const legendRow = legend.append('g')
            .attr('transform', `translate(0, ${index * 20})`);
          
          legendRow.append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', value);
          
          legendRow.append('text')
            .attr('x', -10)
            .attr('y', 9)
            .attr('dy', '0.32em')
            .attr('text-anchor', 'end')
            .style('font-size', '12px')
            .text(key);})
  pclassGenderData.forEach(d => {
    svg.append("rect")
      .attr("x", xScale(d.Pclass))
      .attr("y", yScale(d.MaleSurvived))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", height - yScale(d.MaleSurvived))
      .attr("fill", "#69b3a2");

    svg.append("rect")
      .attr("x", xScale(d.Pclass) + xScale.bandwidth() / 2)
      .attr("y", yScale(d.FemaleSurvived))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", height - yScale(d.FemaleSurvived))
      .attr("fill", "#f4a261");


      
  });













  

  // ...rest of the code for adding labels, title, and legend
}


    if (selectedOption === 'Pclass, Gender & Embarked vs. Survival' && d3Container.current) {
  // Clear any existing content
  d3.select(d3Container.current).selectAll("*").remove();
  const containerWidth = d3.select(d3Container.current).node().getBoundingClientRect().width;
  // Margin conventions
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  // Process the data to group by Embarked, then by Pclass, and calculate survival percentages
  const dataGroupedByEmbarked = d3.groups(dataset, d => d.Embarked);

  dataGroupedByEmbarked.forEach(([embarked, data]) => {
    // Skip the chart for 'C' embarked and 'Class 1'
    if (embarked == '') return;

    const svg = d3.select(d3Container.current)
    .append("svg")
    .attr("width", width + margin.left + containerWidth + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${(32 + containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);

  // Group data by Pclass and calculate survival rates
  let embarkedData = d3.rollups(data,
    v => ({
      Survived: d3.sum(v, d => d.Survived == "1") / v.length * 100,
      NotSurvived: d3.sum(v, d => d.Survived == "0") / v.length * 100,
    }),
    d => d.Pclass
  );

  // Sort embarkedData by Pclass
  embarkedData = embarkedData.sort((a, b) => d3.ascending(a[0], b[0])).map(([Pclass, rates]) => ({
    Pclass: `Class ${Pclass}`,
    Survived: rates.Survived,
    NotSurvived: rates.NotSurvived,
  }));

  // Scales
  const xScale = d3.scaleBand()
    .domain(embarkedData.map(d => d.Pclass))
    .rangeRound([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([height, 0]);

  // Axes
  const xAxis = g => g
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));

  const yAxis = g => g
    .call(d3.axisLeft(yScale).ticks(null, "s"));

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  // Add bars for Survived and NotSurvived
  embarkedData.forEach(d => {
    svg.append("rect")
      .attr("x", xScale(d.Pclass))
      .attr("y", yScale(d.Survived))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", height - yScale(d.Survived))
      .attr("fill", "#69b3a2");

    svg.append("rect")
      .attr("x", xScale(d.Pclass) + xScale.bandwidth() / 2)
      .attr("y", yScale(d.NotSurvived))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", height - yScale(d.NotSurvived))
      .attr("fill", "#f4a261");
  });

    // Add bars for Survived and NotSurvived
    embarkedData.forEach(d => {
      svg.append("rect")
        .attr("x", xScale(d.Pclass))
        .attr("y", yScale(d.Survived))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", height - yScale(d.Survived))
        .attr("fill", "#69b3a2");

      svg.append("rect")
        .attr("x", xScale(d.Pclass) + xScale.bandwidth() / 2)
        .attr("y", yScale(d.NotSurvived))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", height - yScale(d.NotSurvived))
        .attr("fill", "#f4a261");
    });

    // Increase font size for x-axis labels
    svg.selectAll(".x.axis text")
      .style("font-size", "16px");

    // Move x-axis title below the axis
    svg.append("text")
      .attr("transform", `translate(${width / 2},${height + 35})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Pclass");
              // Legend setup
const legendColors = {
  'Male': '#69b3a2',
  'Female': '#f4a261',
 
};

const legend = svg.append('g')
  .attr('transform', `translate(${width - margin.right},${10-margin.top})`);

Object.entries(legendColors).forEach(([key, value], index) => {
  const legendRow = legend.append('g')
    .attr('transform', `translate(0, ${index * 20})`);
  
  legendRow.append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', value);
  
  legendRow.append('text')
    .attr('x', -10)
    .attr('y', 9)
    .attr('dy', '0.32em')
    .attr('text-anchor', 'end')
    .style('font-size', '12px')
    .text(key);
}); 


    // Title for the Embarked category
    let fullEmbarkedName = embarked === 'S' ? 'Southampton' : embarked === 'Q' ? 'Queenstown' : 'Cherbourg';
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(`${fullEmbarkedName}`);
  });

    




}
   

if (selectedOption === 'Embarked vs. Survival' && d3Container.current) {
  // Clear any existing content
  d3.select(d3Container.current).selectAll("*").remove();

  // Margin conventions
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
  const containerWidth = d3.select(d3Container.current).node().getBoundingClientRect().width;

  // Append SVG to the container
  const svg = d3.select(d3Container.current)
    .append("svg")
    .attr("width", width + margin.left + containerWidth + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${(32 + containerWidth - (width + margin.left + margin.right)) / 2},${margin.top})`);

  // Compute survival rates by Embarked
  const survivalRatesByEmbarked = d3.rollups(dataset,
    v => ({
      Survived: d3.sum(v, d => d.Survived == "1") / v.length * 100,
      NotSurvived: d3.sum(v, d => d.Survived == "0") / v.length * 100,
    }),
    d => d.Embarked
  ).filter(([Embarked, rates]) => Embarked); // Filter out undefined or null Embarked values

  const survivalData = Array.from(survivalRatesByEmbarked, ([Embarked, rates]) => ({
    Embarked,
    ...rates
  }));

  // Scales
  const xScale = d3.scaleBand()
    .domain(survivalData.map(d => d.Embarked))
    .rangeRound([0, width])
    .padding(0.1);

  const x1 = d3.scaleBand()
    .domain(['Survived', 'NotSurvived'])
    .rangeRound([0, xScale.bandwidth()])
    .padding(0.05);

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  // Axes
  const xAxis = g => g
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));

  const yAxis = g => g
    .call(d3.axisLeft(yScale));

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  // Group for each Embarked category
  const barGroups = svg.selectAll(".bar-group")
    .data(survivalData)
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .attr("transform", d => `translate(${xScale(d.Embarked)},0)`);

  // Bars for Survived and NotSurvived
  barGroups.selectAll("rect")
    .data(d => ['Survived', 'NotSurvived'].map(key => ({ key, value: d[key], Embarked: d.Embarked })))
    .enter()
    .append("rect")
    .attr("x", d => x1(d.key))
    .attr("y", d => yScale(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", d => height - yScale(d.value))
    .attr("fill", d => d.key === 'Survived' ? "#69b3a2" : "#f4a261");

  // Percentage labels on bars
  barGroups.selectAll("text")
    .data(d => ['Survived', 'NotSurvived'].map(key => ({ key, value: d[key], Embarked: d.Embarked })))
    .enter()
    .append("text")
    .attr("x", d => x1(d.key) + x1.bandwidth() / 2)
    .attr("y", d => yScale(d.value) - 5)
    .attr("text-anchor", "middle")
    .text(d => `${d.value.toFixed(1)}%`);

  // Add X axis label
  svg.append("text")
    .attr("transform", `translate(${width / 2},${height + 32})`)
    .style("text-anchor", "middle")
    .text("Embarked");

  // Add Y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Percentage");

  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 + margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Survived Passengers by Embarked");


    
}

















    

  }, [selectedOption, dataset]);
  
  
  const [showAgeVsSurvivalImage, setShowAgeVsSurvivalImage] = useState(false);

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setShowAgeVsSurvivalImage(selected === 'Age vs Survival');
  };
  
  const renderDataTable = () => {
    // Assuming that 'Parch' is the attribute for which the data should be displayed
    const filteredData = dataset.filter(item => item.Parch !== undefined);

    return (
      <TableContainer component={Paper} sx={{ maxWidth: 300, margin: 'auto' }}>
        <Table size="small" aria-label="parch table">
          <TableHead>
            <TableRow>
              <TableCell align="center">PassengerId</TableCell>
              <TableCell align="center">Parch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(0, 5).map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.PassengerId}</TableCell>
                <TableCell align="center">{row.Parch}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="visualization-select-label">Choose a visualization</InputLabel>
      <Select
        labelId="visualization-select-label"
        id="visualization-select"
        value={selectedOption}
        label="Choose a visualization"
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        
        <MenuItem value="Gender vs. Survival">Gender vs. Survival</MenuItem>
        <MenuItem value="Pclass vs. Survival">Pclass vs. Survival</MenuItem>
        <MenuItem value="Pclass, Gender & Embarked vs. Survival">Pclass, Gender & Embarked vs. Survival</MenuItem>
        <MenuItem value="Embarked vs. Survival">Embarked vs. Survival</MenuItem>
        <MenuItem value="Pclass & Gender vs. Survival">Pclass & Gender vs. Survival</MenuItem>
        <MenuItem value="Parch vs Survival">Parch vs Survival</MenuItem>
        <MenuItem value="Age vs Survival">Age vs Survival</MenuItem>
        <MenuItem value="SibSp vs. Survival">SibSp vs. Survival</MenuItem>
        {/* Add other options as needed */}
      </Select>

      {selectedOption === 'Gender vs. Survival' && (
       <> <div ref={d3Container} />
        <QnA questionData={questionDataOne} />
      </>
      )}
        {selectedOption === 'Pclass vs. Survival' && (
        <><div ref={d3Container} />
        <QnA questionData={questionDataTwo}></QnA>
        </>
      )}
      {selectedOption === 'Age vs Survival' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img src={ageVsSurvivalImage} alt="Age vs Survival" style={{ maxWidth: '100%', maxHeight: '400px' }} />
         <QnA questionData={questionDataThree}              ></QnA>
        </div>
      )}
      {selectedOption === 'SibSp vs. Survival' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img src={sibvsSurvivalImage} alt="SibSp vs. Survival" style={{ maxWidth: '100%', maxHeight: '400px' }} />
             
        </div>
      )}
      {selectedOption === 'Pclass, Gender & Embarked vs. Survival' && (
        <><div ref={d3Container} />
        <QnA questionData={questionDataFour}></QnA>
        </>
      )}
       {selectedOption === 'Pclass & Gender vs. Survival' && (
        <><div ref={d3Container} />
        <QnA questionData={questionDataFive}></QnA>
        </>
      )}
      {selectedOption === 'Embarked vs. Survival' && (
              <><div ref={d3Container} />
              
              </>
            )}
      {selectedOption === 'Parch vs Survival' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img src={parchVsSurvival} alt="Parch vs. Survival" style={{ maxWidth: '100%', maxHeight: '400px' }} />
             
        </div>
      )}
    </FormControl>
  );
};
  


export default AttributeSelector;
